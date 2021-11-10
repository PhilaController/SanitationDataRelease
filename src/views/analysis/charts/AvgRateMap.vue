<template>
  <!-- Charts -->
  <div
    id="avg-rate-map"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <div class="chart-title">
      Average On-Time Trash Collection Rate by District from Jan. 2017 to Feb.
      2020
    </div>
    <div class="chart-subtitle">
      Data is shown relative to the citywide average, 82%
    </div>

    <Legend class="mt-5 mb-1" />

    <div id="mapContainer" style="position: relative" class="w-100">
      <!-- Overlay a loader -->
      <v-overlay :value="data === null" absolute opacity="1.0" color="#fff">
        <v-progress-circular indeterminate size="64" color="#2176d2" />
      </v-overlay>
      <!-- Base map -->
      <l-map
        :options="mapOptions"
        :zoom="zoom"
        :center="center"
        ref="map"
        class="map-pane"
      />
    </div>
    <div class="chart-footnote w-100 text-left mt-1">
      <span class="font-weight-bold">Source</span>: Streets Department
    </div>
  </div>
</template>

<script>
import Legend from "./Legend";
import { scaleLinear } from "d3-scale";
import { interpolateRdBu } from "d3-scale-chromatic";
import { fetchAWS } from "@/tools";
import L from "leaflet";
import * as Vue2Leaflet from "vue2-leaflet";
const esri = require("esri-leaflet");

export default {
  name: "AvgRateMap",
  components: {
    "l-map": Vue2Leaflet.LMap,
    "l-geo-json": Vue2Leaflet.LGeoJson,
    Legend,
  },
  data() {
    return {
      data: null,
      ontimeMap: null,
      districts: null,
      mapOptions: {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
      },
      zoom: 11,
      center: [40.0, -75.12],
      layers: {},
      panes: {},
    };
  },
  computed: {
    mapObject() {
      return this.$refs.map.mapObject;
    },
    scale() {
      return scaleLinear().domain([-0.25, 0.25]).range([0, 1]);
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        // Bind the popup to the layer
        layer.bindTooltip(this.getTooltipText(feature), {
          permanent: false,
          sticky: true,
          opacity: 1.0,
        });

        // Highlight on mouseover
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
        });
      };
    },
  },
  async created() {
    this.districts = await fetchAWS("districts.json");
    this.data = await fetchAWS("average-ontime-by-district.json");
  },
  mounted() {
    this.$nextTick(() => {
      // the leaflet basemap
      let map = this.mapObject;

      // Add ArcGIS Online basemap
      esri
        .basemapLayer("Gray", {
          detectRetina: false,
        })
        .addTo(map);

      // Add city limits
      this.layers.cityLimits = esri
        .featureLayer({
          url: "https://services.arcgis.com/fLeGjb7u4uXqeF9q/arcgis/rest/services/City_Limits/FeatureServer/0",
          style: () => {
            return { fill: false, color: "#000", weight: 2 };
          },
        })
        .addTo(map);
    });
  },
  methods: {
    getColor(value) {
      return interpolateRdBu(this.scale(value));
    },
    /* Tooltip text for bubbles */
    getTooltipText(feature) {
      // District name
      let text = `<div class="tooltip-title">District ${feature.properties.district}</div>`;

      // Add the number of projects
      let value = this.ontimeMap.get(feature.properties.district)[1];
      value = (100 * value).toFixed(1);
      text += `<div class="tooltip-line text-center">On-Time Rate: ${value}%</div>`;

      return text;
    },
    /* Style function for bubble chart */
    styleFunction(feature) {
      let ontime_normalized = this.ontimeMap.get(
        feature.properties.district
      )[0];
      let color = this.getColor(ontime_normalized);

      return {
        fillColor: color,
        color: "#000",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
      };
    },
    /* Style function for highlighting */
    highlightFeature(e) {
      let layer = e.target;

      layer.setStyle({
        color: "#000",
        weight: 5,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },

    /* Reset on mouseout */
    resetHighlight(e) {
      let layer = e.target;
      layer.setStyle(this.styleFunction(layer.feature));
    },
  },
  watch: {
    data(nextValue) {
      if (nextValue) {
        // Make the ontime map
        this.ontimeMap = new Map(
          nextValue.map((d) => [d.district, [d.ontime_normalized, d.ontime]])
        );

        //   Add the layer
        this.layers.districts = L.geoJSON(this.districts, {
          style: this.styleFunction,
          onEachFeature: this.onEachFeatureFunction,
        }).addTo(this.mapObject);
      }
    },
  },
};
</script>

<style>
#avg-rate-map {
  min-height: 400px;
  max-width: 500px;
  margin-bottom: 40px !important;
  margin: auto;
}
#mapContainer {
  flex: 1 1;
  display: flex;
  border: #a1a1a1 solid 4px !important;
  max-width: 500px;
  margin: auto;
}
.map-pane {
  flex: 1;
  height: 500px !important;
  z-index: 1 !important;
}

@media only screen and (max-width: 767px) {
  .map-pane {
    height: 500px !important;
  }
}

/* tooltip */
.tooltip-line {
  border-bottom: 1px solid #f0f0f0;
}
.tooltip-line td {
  padding: 0 7px 0 7px;
  text-align: center;
}
.leaflet-tooltip {
  padding: 10px;
  font: 1rem sans-serif;
  background: #ffffff;
  border-radius: 8px;
  pointer-events: none;
  border: 1px solid #cdcdcd;
  opacity: 1;
  display: block;
  max-width: 400px;
  min-width: 200px;
}
.tooltip-title {
  margin-bottom: 5px;
  border-bottom: 1px solid #cdcdcd;
  text-align: center;
  font-weight: bold;
  padding-bottom: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
}
.leaflet-tooltip-pane {
  z-index: 1500 !important;
}

#avg-rate-map .chart-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.3;
}

#avg-rate-map .chart-subtitle {
  font-size: 1.2rem;
  font-weight: normal;
  font-style: italic;
}

#avg-rate-map .chart-footnote {
  font-style: italic;
  font-size: 0.9rem;
}
</style>