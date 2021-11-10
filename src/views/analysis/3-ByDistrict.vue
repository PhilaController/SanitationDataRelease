<template>
  <div id="by-district" class="section">
    <h2>Performance by Sanitation District</h2>
    <hr class="titlebar" />

    <p>
      The pandemic’s impact on sanitation operations has varied across the
      city’s 13 sanitation districts. The figure below shows the number of
      districts meeting the target goal for on-time collection for each month
      since January 2017. Notably, zero districts have met the on-time goal in 7
      of the 15 months since the pandemic began. This is in stark contrast to
      the three-year period prior to the pandemic when this occurred just once.
      While performance has been worse during the pandemic, clear performance
      issues also existed prior to it. Between January 2017 and the start of the
      pandemic, every sanitation district met the on-time goal just twice. The
      median number of districts to meet the on-time goal in any given month was
      just 3 out of 13.
    </p>

    <!-- Figure -->
    <DistrictsMeetingGoalChart />

    <p>
      Prior to the pandemic, from January 2017 to February 2020, on-time
      collection rates varied significantly between districts. The citywide
      average over this period was 82%, below the average target goal of 93%.
      Districts 2B in Center City and 6A in the Northeast were the only
      districts to meet this goal, significantly outperforming other districts
      with average rates of 95% and 93%, respectively. On the other hand, the
      worst performing districts were 4G in Northwest Philadelphia (65%), 2D in
      South Philadelphia (73%), and 1B in West Philadelphia (76%).
    </p>

    <!-- Figure -->
    <AvgRateMap />

    <div id="key-takeaways">
      <p>
        The figures below present the on-time collection rate and the average
        monthly trash tonnage for each of the city’s 13 sanitation districts.
        The charts show the annual average of these metrics using data from 2017
        through the first half of 2021. The data for each district is shown in
        color with the citywide value shown as a dark gray line. The figures
        highlight which districts are performing better or worse than the
        citywide average. From this data, several key takeaways are apparent:
      </p>

      <ul aria-labelledby="key-takeaways">
        <li>
          On-time collection has declined each calendar year since 2017, with
          the largest decreases in 2020 and 2021 during the pandemic.
        </li>
        <li>
          Trash tonnage has increased in nearly all districts since the pandemic
          began, although the size of the increase varies from district to
          district. For example, district 6L in the lower Northeast had the
          highest tonnage total prior to the pandemic and one of the largest
          increases during the pandemic. On the other hand, areas like district
          2B in Center City have had only a marginal increase in tonnage.
        </li>
        <li>
          Some areas of the city have consistently better on-time rates, while
          others have consistently worse. For example, Center City (district 2B)
          is among the top performers in terms of on-time rate each month, while
          districts such as 4G in Northwest Philadelphia and 2D in South
          Philadelphia have collection rates consistently worse than the
          citywide average.
        </li>
        <li>
          Since 2017, district 2D’s (South Philadelphia) on-time collection rate
          is worse than the citywide average despite having one of the lowest
          tonnage totals in the city. Similarly, district 4G (Northwest
          Philadelphia) has one of the lowest on-time rates in the city despite
          tonnage levels similar to the citywide average.
        </li>
        <li>
          Districts 2B (Center City) and 3F (Northern
          Liberties/Fishtown/Kensington) have lower-than-average tonnage totals
          and among the highest on-time rates in the city since the pandemic.
        </li>
        <li>
          The pandemic worsened pre-existing trends around on-time collection
          rates, with the gap between the worst-performing and best-performing
          districts widening. In 2017, the district with the best average rate
          (6A) was 31 percentage points better than the district with the lowest
          rate (4G). In the first half of 2021, that gap widened to 45
          percentage points, with district 6L having an on-time rate of 30% and
          district 3F having a rate of 75%.
        </li>
      </ul>

      <!-- District maps -->
      <img
        loading="lazy"
        class="aligncenter"
        src="https://controller.phila.gov/wp-content/uploads/2021/11/ontime-tonnage-by-district-1.png"
        alt=""
        width="800"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      <img
        loading="lazy"
        class="aligncenter"
        src="https://controller.phila.gov/wp-content/uploads/2021/11/ontime-tonnage-by-district-2.png"
        alt=""
        width="800"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      <img
        loading="lazy"
        class="aligncenter"
        src="https://controller.phila.gov/wp-content/uploads/2021/11/ontime-tonnage-by-district-3.png"
        alt=""
        width="800"
        sizes="(max-width: 800px) 100vw, 800px"
      />
    </div>
  </div>
</template>

<script>
import DistrictsMeetingGoalChart from "./charts/DistrictsMeetingGoalChart";
import AvgRateMap from "./charts/AvgRateMap";

export default {
  name: "ByDistrict",
  components: { DistrictsMeetingGoalChart, AvgRateMap },
};
</script>

<style>
</style>