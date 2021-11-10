<template>
  <div id="explorer">
    <!-- Overlay a loader -->
    <v-overlay :value="isLoading" absolute opacity="1.0" color="#fff">
      <v-progress-circular indeterminate size="64" color="#2176d2" />
    </v-overlay>

    <!-- Controls -->
    <v-row id="explorer-controls" class="mb-5">
      <!-- Inputs -->
      <v-col cols="12" sm="12" md="6">
        <!-- District dropdown -->
        <DistrictDropdown
          class="w-100"
          ref="dropdown"
          :whiteDistricts="whiteDistricts"
          :colors="colorList.slice(0, -1)"
          :districtNames="districtNames.slice(0, -1)"
          @change="(value) => (selectedDistricts = value)"
        />

        <!-- Address search bar -->
        <AddressSearch
          id="adddress-search-wrapper"
          class="w-100"
          @change="handleAddressSearch"
        />
      </v-col>

      <!-- Radio -->
      <v-col cols="12" sm="12" md="6">
        <!-- Data frequency -->
        <v-radio-group v-model="frequency" row :ripple="false">
          <template v-slot:label>
            <div>Data Frequency</div>
          </template>
          <v-radio value="annual">
            <template v-slot:label>
              <div>Annual</div>
            </template>
          </v-radio>
          <v-radio value="quarterly">
            <template v-slot:label>
              <div>Quarterly</div>
            </template>
          </v-radio>
          <v-radio value="monthly">
            <template v-slot:label>
              <div>Monthly</div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row id="explorer-controls" class="mb-5 mt-5">
      <!-- District map -->
      <v-col cols="12" sm="12" md="6" class="pr-5">
        <DistrictMap
          :districts="districts"
          :colorMap="colorMap"
          :selectedDistricts="selectedDistricts"
          @district-click="handleMapClick"
        />
      </v-col>

      <!-- Charts -->
      <v-col cols="12" sm="12" md="6" class="pl-5">
        <div class="chart-subtitle text-center">
          Average On-Time Trash Collection Rate
        </div>
        <MetricChart
          v-if="metrics.ontime !== null"
          class="w-100"
          :data="selectDistrict(metrics.ontime)"
          :dates="dates"
          :colors="selectDistrict(colorList)"
          :yaxis="yaxisOntime"
          :legendShow="true"
          :height="300"
          :tooltipFormatter="tooltipFormatter"
          :markerSize="markerSize"
        />

        <div class="chart-subtitle text-center">
          <span v-if="frequency !== 'monthly'">Average</span> Monthly Curbside
          Trash Tonnage
        </div>
        <MetricChart
          class="w-100"
          v-if="metrics.tonnage !== null"
          :data="selectDistrict(metrics.tonnage)"
          :dates="dates"
          :colors="selectDistrict(colorList)"
          :yaxis="yaxisTonnage"
          :legendShow="false"
          :height="300"
          :tooltipFormatter="tooltipFormatter"
          :markerSize="markerSize"
        />
      </v-col>
    </v-row>
    <div class="chart-footnote mt-2">
      <div>
        <span class="font-weight-bold">Note:</span> 2021 includes data through
        June 2021<span v-if="frequency !== 'monthly'"
          >; Data represents a calendar year average of monthly data</span
        >
      </div>
      <div>
        <span class="font-weight-bold">Source:</span> Controller's Office
        analysis of data provided by the Streets Department
      </div>
    </div>
  </div>
</template>

<script>
import DistrictMap from "./DistrictMap";
import MetricChart from "./MetricChart";
import DistrictDropdown from "./DistrictDropdown";
import AddressSearch from "./AddressSearch";
import { fetchAWS } from "@/tools";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

export default {
  name: "Explorer",
  components: { DistrictMap, MetricChart, DistrictDropdown, AddressSearch },
  data() {
    return {
      data: {},
      dates: [],
      isLoading: true,
      metrics: {},
      selectedDistricts: ["2B"],
      districts: null,
      frequency: "annual",
      whiteDistricts: ["1A", "4G", "6A"],
      colors: [
        { key: "1A", value: "#1f77b4" },
        { key: "1B", value: "#aec7e8" },
        { key: "2B", value: "#ff7f0e" },
        { key: "2D", value: "#ffbb78" },
        { key: "3C", value: "#2ca02c" },
        { key: "3F", value: "#98df8a" },
        { key: "4G", value: "#d62728" },
        { key: "4M", value: "#ff9896" },
        { key: "5F", value: "#9467bd" },
        { key: "5L", value: "#c5b0d5" },
        { key: "6A", value: "#8c564b" },
        { key: "6B", value: "#c49c94" },
        { key: "6L", value: "#e377c2" },
        { key: "Citywide", value: "#353d42" },
      ],
    };
  },
  async created() {
    // District GeoJSON
    this.districts = await fetchAWS("districts.json");

    // Fetch the data
    await this.fetchData();

    // Set loading state
    this.isLoading = false;
  },
  computed: {
    markerSize() {
      if (this.$vuetify.breakpoint.mobile) return 0;
      if (this.frequency === "annual") {
        return 5;
      } else if (this.frequency === "quarterly") return 4;
      else {
        return 4;
      }
    },
    tooltipFormatter() {
      if (this.frequency === "annual") {
        return timeFormat("%Y");
      } else if (this.frequency === "quarterly")
        return (dt) => {
          let quarter = Math.floor((dt.getMonth() + 3) / 3);
          let year = timeFormat("%Y")(dt);
          return `${year} Q${quarter}`;
        };
      else {
        return timeFormat("%b %Y");
      }
    },
    colorList() {
      return this.districtNames.map((d) => this.colorMap.get(d));
    },
    colorMap() {
      return new Map(this.colors.map((d) => [d.key, d.value]));
    },
    districtNames() {
      if (this.districts)
        return this.districts.features
          .map((d) => d.properties.district)
          .concat(["Citywide"]);
      else return [];
    },
    yaxisTonnage() {
      return {
        min: 1e3,
        max: this.frequency == "annual" ? 6e3 : 7e3,
        tickAmount: this.frequency == "annual" ? 5 : 6,
        forceNiceScale: true,
        labels: {
          style: { fontSize: "16px" },
          formatter: function (y) {
            return format(",.0f")(y);
          },
        },
      };
    },
    yaxisOntime() {
      return {
        min: 0,
        max: 1.0,
        tickAmount: 5,
        labels: {
          style: { fontSize: "16px" },
          formatter: function (y) {
            return format(".0%")(y);
          },
        },
      };
    },
  },
  methods: {
    async fetchData() {
      // Aggregated data
      let data = this.data[this.frequency];
      if (!data) {
        this.data[this.frequency] = await fetchAWS(
          `aggregated-data-${this.frequency}.json`
        );
      }

      this.dates = this.data[this.frequency]
        .filter((d) => d.district == "Citywide")
        .map((d) => d.date);

      // Calculate metrics
      this.metrics.ontime = this.extractMetricData("ontime");
      this.metrics.tonnage = this.extractMetricData("trash_tonnage");
    },
    handleAddressSearch(districts) {
      this.selectedDistricts = districts;
      this.$refs.dropdown.selectedDistricts = districts;
    },
    handleMapClick(district) {
      let index = this.selectedDistricts.indexOf(district);
      if (index === -1) this.selectedDistricts.push(district);
      else {
        this.selectedDistricts.splice(index, 1);
        this.selectedDistricts = [...this.selectedDistricts];
      }

      this.$refs.dropdown.selectedDistricts = this.selectedDistricts;
    },
    selectDistrict(data) {
      if (!data) return [];

      // The citywide data is last
      let out = [data[data.length - 1]];

      // Get the selected district's data
      if (this.selectedDistricts.length > 0) {
        for (let i = 0; i < this.selectedDistricts.length; i++) {
          let index = this.districtNames.indexOf(this.selectedDistricts[i]);
          out.push(data[index]);
        }
      }
      return out;
    },
    extractMetricData(column) {
      let out = [];
      for (let i = 0; i < this.districtNames.length; i++) {
        let districtName = this.districtNames[i];
        let name =
          districtName == "Citywide"
            ? districtName
            : `District ${districtName}`;

        out.push({
          name: name,
          data: this.data[this.frequency]
            .filter((d) => d.district == districtName)
            .map((d) => d[column]),
        });
      }
      return out;
    },
  },
  watch: {
    async frequency() {
      this.isLoading = true;
      await this.fetchData();
      this.isLoading = false;
    },
  },
};
</script>

<style>
#explorer .chart-subtitle {
  font-size: 1.4rem;
  font-weight: bold;
  margin: auto;
}
#explorer .chart-footnote {
  font-style: italic;
  font-size: 0.9rem;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 600000s 0s, color 600000s 0s;
}
</style>