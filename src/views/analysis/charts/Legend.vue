<template>
  <div class="d-flex justify-content-center" id="map-legend">
    <div class="d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-between">
        <div class="legend-label">
          <span class="font-weight-bold font-italic">Better</span> than the
          citywide average
        </div>
        <div class="legend-label">
          <span class="font-weight-bold font-italic">Worse</span> than the
          citywide average
        </div>
      </div>
      <svg :width="width" :height="height">
        <g id="map-legend-canvas"></g>
      </svg>
    </div>
  </div>
</template>

<script>
import { scaleSequential, scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";
import { interpolateRdBu } from "d3-scale-chromatic";
import { select } from "d3-selection";

export default {
  data() {
    return {
      margin: { right: 40, bottom: 30, left: 40 },
      barHeight: 20,
      height: 50,
      width: null,
    };
  },
  computed: {
    colorScale() {
      return scaleSequential(interpolateRdBu).domain([0, 1]);
    },
    axisScale() {
      return scaleLinear()
        .domain(this.colorScale.domain())
        .range([this.margin.left, this.width - this.margin.right]);
    },
  },
  mounted() {
    let svg = select("#map-legend-canvas");
    const defs = svg.append("defs");

    // set the width
    this.width = Math.min($("#map-legend").parent().width(), 1000);

    const linearGradient = defs
      .append("linearGradient")
      .attr("id", "linear-gradient");

    linearGradient
      .selectAll("stop")
      .data(
        this.colorScale.ticks().map((t, i, n) => ({
          offset: `${(100 * i) / n.length}%`,
          color: this.colorScale(1 - t),
        }))
      )
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0,${this.height - this.margin.bottom - this.barHeight})`
      )
      .append("rect")
      .attr("transform", `translate(${this.margin.left}, 0)`)
      .attr("width", this.width - this.margin.right - this.margin.left)
      .attr("height", this.barHeight)
      .style("fill", "url(#linear-gradient)");

    svg.append("g").call(this.axisBottom);

    // Adjust tick sizes
    svg.selectAll("g.tick line").attr("y2", (d) => {
      if (d == 0.5) return this.barHeight / 2;
      else return 0;
    });
  },
  methods: {
    axisBottom(g) {
      return g
        .attr("class", `x-axis`)
        .attr("transform", `translate(0,${this.height - this.margin.bottom})`)
        .call(
          axisBottom(this.axisScale)
            .ticks(10)
            .tickSize(this.barHeight / 2)
            .tickSizeOuter(0)
            .tickFormat((d) => (d == 0.5 ? "Citywide average" : ""))
        );
    },
  },
};
</script>

<style>
.tick text {
  font-size: 1rem;
}

.legend-label {
  font-size: 1rem;
  text-align: center;
}
</style>
