<template>
  <div id="meeting-goal-chart">
    <!-- Overlay a loader -->
    <v-overlay :value="data === null" absolute opacity="1.0" color="#fff">
      <v-progress-circular indeterminate size="64" color="#2176d2" />
    </v-overlay>

    <!-- Chart -->
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      v-if="data !== null"
    >
      <div class="chart-title text-center">
        Number of Districts Meeting Target Goal for On-Time Trash Collection
        Rate Each Month Since January 2017
      </div>
      <div class="chart-subtitle">
        Months with no districts meeting target goal are highlighted in yellow
      </div>

      <!-- Chart -->
      <apexchart
        class="w-100 mt-5"
        height="350"
        type="bar"
        :options="chartOptions"
        :series="series"
      />

      <div class="chart-footnote w-100">
        <div class="text-left">
          <span class="font-weight-bold">Source</span>: Controller's Office
          analysis of Streets Department data
        </div>
        <div class="text-left">
          <span class="font-weight-bold">Note</span>: Target rates were 96% from
          Jan. 2017 to Jun. 2018, 90% from Jul. 2017 to Jun. 2019, 91% from Jul.
          2019 to Jun. 2020, and 80% afterwards.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { fetchAWS } from "@/tools";

export default {
  name: "DistrictsMeetingGoalChart",
  components: { apexchart: VueApexCharts },
  data() {
    return { data: null };
  },
  async created() {
    this.data = await fetchAWS("districts-meeting-target.json");
  },
  computed: {
    dates() {
      if (this.data) return this.data.map((d) => d.date);
      else return [];
    },
    series() {
      return [
        { name: "Districts Meeting Goal", data: this.data.map((d) => d.N) },
      ];
    },
    chartOptions() {
      return {
        chart: {
          animations: {
            enabled: false,
          },
          type: "bar",
          height: 350,
          selection: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          zoom: {
            type: "x",
            enabled: false,
          },
        },
        colors: ["#2176d2"],
        plotOptions: {
          bar: {
            columnWidth: "100%",
          },
        },
        states: {
          active: {
            filter: {
              type: "none",
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          min: 0,
          max: 13,
          tickAmount: 5,
          forceNiceScale: true,
          labels: {
            style: { fontSize: "16px" },
            formatter: function (y) {
              if (y < 13) return y.toFixed(0) + " of 13";
              else return "";
            },
            minWidth: this.$vuetify.breakpoint.mobile ? 50 : 100,
            maxWidth: this.$vuetify.breakpoint.mobile ? 50 : 100,
          },
        },
        xaxis: {
          crosshairs: { show: false },
          type: "datetime",
          categories: this.dates,
          labels: {
            rotate: -90,
          },
        },
        tooltip: {
          style: { fontSize: "16px" },
          y: {
            formatter: function (y) {
              return y.toFixed(0) + " of 13";
            },
          },
          x: {
            format: "MMM yyyy",
          },
        },
        annotations: {
          position: "back",
          xaxis: [
            {
              x: new Date("12/15/2017").getTime(),
              x2: new Date("1/15/2018").getTime(),
              borderColor: "#ffefa2",
              fillColor: "#ffefa2",
              opacity: 0.5,
              strokeDashArray: 0,
            },
            {
              x: new Date("3/15/2020").getTime(),
              x2: new Date("8/15/2020").getTime(),
              borderColor: "#ffefa2",
              fillColor: "#ffefa2",
              opacity: 0.5,
              strokeDashArray: 0,
            },
            {
              x: new Date("4/15/2021").getTime(),
              x2: new Date("6/1/2021").getTime(),
              borderColor: "#ffefa2",
              fillColor: "#ffefa2",
              opacity: 0.5,
              strokeDashArray: 0,
            },
            {
              x: new Date("3/15/2020").getTime(),
              x2: new Date("3/20/2020").getTime(),
              borderColor: "#666",
              fillColor: "#666",
              opacity: 1.0,
              strokeDashArray: 0,
            },
          ],
          yaxis: [
            {
              y: 13,
              y2: 12.9,
              borderColor: "#666",
              fillColor: "#666",
              strokeDashArray: 0,
            },
          ],
          points: [
            {
              x: new Date("01/01/2019").getTime(),
              y: 12.6,
              marker: { size: 0 },
              label: {
                borderWidth: 0,
                offsetY: 0,
                text: "All Districts Meeting Goal",
                style: { fontSize: "16px", color: "#666", fontWeight: 700 },
              },
            },
            {
              x: new Date("03/15/2020").getTime(),
              y: 14.5,
              label: {
                textAnchor: "start",
                borderWidth: 0,
                text: this.$vuetify.breakpoint.mobile
                  ? "Pandemic"
                  : "Pandemic Begins",
                style: { fontSize: "16px", color: "#666", fontWeight: "bold" },
              },
              marker: {
                size: 0,
              },
            },
          ],
        },
      };
    },
  },
};
</script>

<style scoped>
#meeting-goal-chart {
  margin: auto;
  position: relative;
  max-width: 900px !important;
  min-height: 300px !important;
  margin-bottom: 30px;
}
.chart-title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.3;
}
.chart-subtitle {
  font-size: 1.25rem;
  font-weight: normal;
  font-style: italic;
}
.chart-footnote {
  font-style: italic;
  font-size: 0.9rem;
}
</style>