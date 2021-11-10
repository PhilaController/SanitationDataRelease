
<template>
  <div id="historical-chart">
    <!-- Overlay a loader -->
    <v-overlay :value="data === null" absolute opacity="1.0" color="#fff">
      <v-progress-circular indeterminate size="64" color="#2176d2" />
    </v-overlay>

    <!-- Charts -->
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      v-if="data !== null"
    >
      <div class="chart-title">
        Historical Sanitation Performance Metrics by Fiscal Year
      </div>

      <!-- On-time collection rate chart -->
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          w-100
          mt-5
        "
      >
        <div class="chart-subtitle">On-Time Trash Collection Rate</div>
        <apexchart
          class="w-100"
          height="350"
          type="line"
          :options="ontimeOptions"
          :series="ontime"
        />
      </div>

      <!-- Tonnage chart -->
      <div
        class="
          d-flex
          flex-column
          justify-content-center
          align-items-center
          w-100
        "
      >
        <div class="chart-subtitle">Tons of Curbside Trash Collected</div>
        <apexchart
          class="w-100"
          height="350"
          type="line"
          :options="tonnageOptions"
          :series="tonnage"
        />
      </div>

      <div class="chart-footnote">
        Source: Streets Department and Five Year Financial Plans
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { fetchAWS } from "@/tools";

export default {
  name: "HistoricalChart",
  components: { apexchart: VueApexCharts },
  data() {
    return { data: null };
  },
  async created() {
    this.data = await fetchAWS("citywide-fiscal-year-data.json");
  },
  computed: {
    categories() {
      if (this.data) return this.data.map((d) => d.fiscal_year);
      else return [];
    },
    ontime() {
      return [
        {
          name: "Target Rate",
          data: this.data.map((d) => d.ontime_target),
        },
        {
          name: "On-Time Trash Collection Rate",
          data: this.data.map((d) => d.ontime_actual),
        },
      ];
    },
    tonnage() {
      return [
        {
          name: "Tons of Curbside Trash Collected",
          data: this.data.map((d) => d.trash_tonnage),
        },
      ];
    },
    tonnageOptions() {
      return {
        legend: {
          show: false,
        },
        chart: {
          selection: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        stroke: {
          width: 5,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        annotations: {
          points: [
            {
              x: 12.5,
              y: 710e3,
              label: {
                borderWidth: 0,
                text: ["COVID-19", "Pandemic"],
                style: { fontSize: "16px", color: "#666", fontWeight: "bold" },
              },
              marker: {
                size: 0,
              },
            },
          ],
          xaxis: [
            {
              x: 2020,
              x2: 2021,
              borderColor: "#000",
              fillColor: "#a1a1a1",
              opacity: 0.2,
            },
          ],
        },
        grid: { padding: { left: 40, right: 40, top: 15 } },
        colors: ["#2176d2"],
        markers: {
          size: 6,
          colors: "#fff",
          strokeColors: "#2176d2",
          strokeWidth: 4,
        },
        xaxis: {
          tooltip: { enabled: false },
          categories: this.categories,
          labels: {
            style: { fontSize: "16px" },
          },
          tickAmount: this.$vuetify.breakpoint.mobile
            ? 4
            : this.categories.length,
        },
        yaxis: {
          min: 450e3,
          max: 700e3,
          tickAmount: 5,
          labels: {
            style: { fontSize: "16px" },
            formatter: function (y) {
              return `${(y / 1000).toFixed(0)}k`;
            },
          },
        },
        dataLabels: {
          enabled: !this.$vuetify.breakpoint.mobile,
          formatter: function (y) {
            return `${(y / 1000).toFixed(0)}k`;
          },
          background: {
            foreColor: "#000",
            opacity: 0.5,
          },
          style: { colors: ["#fff"], fontSize: "16px" },
          offsetY: 13,
        },
        tooltip: {
          enabled: this.$vuetify.breakpoint.mobile,
        },
      };
    },
    ontimeOptions() {
      return {
        legend: {
          show: false,
        },
        chart: {
          selection: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
        },
        stroke: {
          curve: ["stepline", "straight"],
          width: [4, 5],
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        annotations: {
          points: [
            {
              x: 9,
              y: 0.94,
              label: {
                borderWidth: 0,
                text: "Target Goal",
                style: { fontSize: "16px", color: "#666", fontWeight: "bold" },
              },
              marker: {
                size: 0,
              },
            },
            {
              x: 12.5,
              y: 1.03,
              label: {
                borderWidth: 0,
                text: ["COVID-19", "Pandemic"],
                style: { fontSize: "16px", color: "#666", fontWeight: "bold" },
              },
              marker: {
                size: 0,
              },
            },
          ],
          xaxis: [
            {
              x: 2020,
              x2: 2021,
              borderColor: "#000",
              fillColor: "#a1a1a1",
              opacity: 0.2,
            },
          ],
        },
        grid: { padding: { left: 40, right: 40, top: 15 } },
        colors: ["#666666", "#f40000"],
        markers: {
          size: [0, 6],
          colors: "#fff",
          strokeColors: "#f40000",
          strokeWidth: 4,
        },
        xaxis: {
          tooltip: { enabled: false },
          categories: this.categories,
          labels: {
            style: { fontSize: "16px" },
          },
          tickAmount: this.$vuetify.breakpoint.mobile
            ? 4
            : this.categories.length,
        },
        yaxis: {
          min: 0.4,
          max: 1.0,
          tickAmount: 6,
          labels: {
            style: { fontSize: "16px" },
            formatter: function (y) {
              return `${(y * 100).toFixed(0)}%`;
            },
          },
        },
        dataLabels: {
          enabled: !this.$vuetify.breakpoint.mobile,
          enabledOnSeries: [1],
          formatter: function (y) {
            return `${(y * 100).toFixed(1)}%`;
          },
          background: {
            foreColor: "#000",
            opacity: 0,
          },
          style: { colors: ["#fff"], fontSize: "16px" },
          offsetY: 13,
        },
        tooltip: {
          enabled: this.$vuetify.breakpoint.mobile,
        },
      };
    },
  },
};
</script>

<style scoped>
#historical-chart {
  margin: auto;
  position: relative;
  max-width: 800px !important;
  min-height: 300px !important;
}
.chart-title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.3;
}
.chart-subtitle {
  font-size: 1.3rem;
  font-weight: bold;
}
.chart-footnote {
  font-style: italic;
}

@media only screen and (max-width: 600px) {
  #historical-chart {
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>

