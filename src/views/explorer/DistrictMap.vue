<template>
  <div class="map-wrapper d-flex flex-column w-100">
    <div class="data-map-subtitle">Sanitation Districts</div>

    <div id="districtMapContainer" style="position: relative">
      <l-map
        :options="mapOptions"
        :zoom="zoom"
        :center="center"
        ref="districtMap"
        class="map-pane"
      />
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import * as Vue2Leaflet from "vue2-leaflet";
const esri = require("esri-leaflet");

export default {
  name: "DistrictMap",
  components: {
    "l-map": Vue2Leaflet.LMap,
    "l-geo-json": Vue2Leaflet.LGeoJson,
  },
  props: ["districts", "colorMap", "selectedDistricts"],
  data() {
    return {
      info: null,
      homeBounds: null,
      mapOptions: {
        zoomControl: true,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
      },
      zoom: 11,
      center: [40.0, -75.115],
      layers: {},
    };
  },
  computed: {
    mapObject() {
      return this.$refs.districtMap.mapObject;
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // Bind the popup to the layer
        layer.bindTooltip(this.getTooltipText(feature), {
          permanent: false,
          sticky: true,
          opacity: 1.0,
        });

        // Select on click
        layer.on({
          click: this.handleDistrictClick,
        });
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      // the leaflet basemap
      let map = this.mapObject;

      // set zoom home bounds
      this.homeBounds = map.getBounds();

      // Add ArcGIS Online basemap
      esri
        .basemapLayer("Gray", {
          detectRetina: false,
        })
        .addTo(map);
    });
  },
  methods: {
    zoomHome() {
      this.mapObject.flyToBounds(this.homeBounds);
    },
    getTooltipText(feature) {
      let text = `<div class="tooltip-title">District ${feature.properties.district}</div>`;
      return text;
    },
    zoomToFeature(e) {
      let layer = e.target;
      this.selectedDistrict = layer.feature.properties.district;
      this.$emit("district-change", this.selectedDistrict);

      this.mapObject.fitBounds(e.target.getBounds());
    },
    /* Style function for bubble chart */
    styleFunction(feature) {
      let name = feature.properties.district;
      let color = this.colorMap.get(name);

      return {
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6,
      };
    },
    /* Style function for highlighting */
    handleDistrictClick(e) {
      let layer = e.target;

      //  Get the selected district
      let district = layer.feature.properties.district;
      this.$emit("district-click", district);
    },

    highlightSelectedDistrict() {
      this.layers.districts.eachLayer((layer) => {
        let name = layer.feature.properties.district;
        let index = this.selectedDistricts.indexOf(name);

        if (index === -1) {
          layer.setStyle(this.styleFunction(layer.feature));
        } else {
          //   Set the style
          layer.setStyle({
            color: "#000",
            weight: 5,
          });

          // Bring to front
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
          }
        }
      });
    },
  },
  watch: {
    districts(nextValue) {
      if (nextValue) {
        //   Add the layer
        this.layers.districts = L.geoJSON(this.districts, {
          style: this.styleFunction,
          onEachFeature: this.onEachFeatureFunction,
        }).addTo(this.mapObject);

        if (this.selectedDistricts.length) this.highlightSelectedDistrict();
      }
    },
    selectedDistricts(nextValue) {
      this.highlightSelectedDistrict();
    },
  },
};
</script>

<style>
#districtMapContainer {
  flex: 1 1;
  display: flex;
  border: #a1a1a1 solid 4px !important;
  height: 100% !important;
}
.data-map-subtitle {
  font-size: 1.4rem;
  font-weight: bold;
  margin: auto;
}
</style>