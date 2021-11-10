
<template>
  <div id="metric-chart">
    <apexchart
      v-if="data !== null"
      class="w-100"
      :height="height"
      type="line"
      :options="chartOptions"
      :series="data"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { timeFormat } from "d3-time-format";

export default {
  name: "OnTimeChart",
  components: { apexchart: VueApexCharts },
  props: [
    "data",
    "dates",
    "colors",
    "yaxis",
    "legendShow",
    "height",
    "tooltipFormatter",
    "markerSize",
  ],
  computed: {
    chartOptions() {
      return {
        legend: {
          show: this.legendShow,
          position: "top",
          fontSize: "16px",
          showForSingleSeries: true,
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
          zoom: {
            type: "x",
            enabled: false,
          },
        },
        stroke: {
          curve: "straight",
          width: 5,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        grid: { padding: { left: 40, right: 40, top: 10 } },
        colors: this.colors,
        markers: {
          size: this.markerSize,
          colors: new Array(this.colors.length).fill(["#fff"]).flat(),
          strokeColors: this.colors,
          strokeWidth: 3,
          hover: { sizeOffset: 2 },
        },
        xaxis: {
          tooltip: { enabled: false },
          categories: this.dates,
          type: "datetime",
          tickAmount: 4,
          labels: {
            style: { fontSize: "16px" },
            formatter: function (val) {
              let dt = new Date(val);
              return timeFormat("%Y")(dt);
            },
          },
        },
        yaxis: this.yaxis,
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
          shared: true,
          style: { fontSize: "16px" },
          x: {
            formatter: (val) => {
              let dt = new Date(val);
              return this.tooltipFormatter(dt);
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
#metric-chart {
  margin: auto;
  position: relative;
  min-height: 300px !important;
}

@media only screen and (max-width: 600px) {
  #metric-chart {
    padding-right: 0px;
    padding-left: 0px;
  }
}
</style>

