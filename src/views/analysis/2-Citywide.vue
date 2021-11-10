<template>
  <div id="citywide" class="section">
    <h2>Citywide Performance</h2>
    <hr class="titlebar" />

    <p>
      The figure below shows the citywide on-time trash collection rate and
      total trash tonnage for each fiscal year since FY09. In FY21, the on-time
      rate declined sharply to just 53%, well below the Streets Department’s
      target goal of 80%. This drop coincided with an unprecedented 21%
      year-over-year increase in trash tonnage. The historical on-time rates
      show a sharp break beginning in FY14 when a compactor vehicle shortage,
      the result of years of inadequate fleet purchases, had a significant
      impact on sanitation operations. According to the Streets Department, the
      City began purchasing between 30 and 35 new compactors each year to
      resolve the shortage. While the Streets Department was able to reach a
      sufficient level of compactors in late FY19, curbside tonnage also
      increased during this time.<sup><a href="#fn2" id="ref2">[2]</a></sup> As
      a result, the on-time rate has never fully recovered to the level from
      earlier years, when the Streets Department consistently achieved an
      on-time rate of about 95%. Instead, the target goal was lowered from 96%
      to 90% in FY18, changed to 91% during FY19, and then lowered again to 80%
      during the pandemic.<sup><a href="#fn3" id="ref3">[3]</a></sup>
    </p>

    <!-- Figure -->
    <HistoricalChart />
  </div>
</template>

<script>
import HistoricalChart from "./charts/HistoricalChart";

export default { name: "Citywide", components: { HistoricalChart } };
</script>

<style>
</style>