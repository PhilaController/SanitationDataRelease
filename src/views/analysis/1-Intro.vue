<template>
  <div id="introduction" class="section">
    <p>
      Under the leadership of City Controller Rebecca Rhynhart, the Controller’s
      Office is committed to increasing transparency around city services to
      help ensure services reach all Philadelphians equally. To that end, the
      Controller’s Office releases datasets and interactive reports to inform
      residents about areas of interest and public concern.
    </p>
    <p>
      Since the COVID-19 pandemic began in March 2020, Philadelphians across the
      city have experienced recurring delays for trash collection. As such, the
      Controller’s Office is releasing data about the on-time collection rate
      for trash pickup<sup><a href="#fn1" id="ref1">[1]</a></sup> as well as the
      total trash tonnage collected curbside by the Streets Department. The
      data, provided to the Controller’s Office by the Streets Department,
      includes historical data since fiscal year 2009 (FY09) as well as data
      since 2017 for each of the city’s 13 sanitation districts. The 13
      sanitation districts are neighborhood-sized regions created by the Streets
      Department to assist with trash removal operations. This more granular
      data provides important insight into how the pandemic has affected trash
      collection in different areas of the city.
    </p>

    <p>
      The data shows what many Philadelphians have experienced firsthand since
      the pandemic began — on-time trash collection declined sharply in the
      early months of pandemic and remained below the Streets Department’s
      target goal for nearly every month since. During the same period, curbside
      trash tonnage rose sharply, increasing by about 25% relative to
      pre-pandemic levels. This increase in tonnage, combined with the
      pandemic’s impact on staffing levels, created significant challenges for
      the Streets Department.
    </p>
    <p>
      The on-time rate also varies significantly by sanitation district. From
      January 2017 to the start of the pandemic, all sanitation districts only
      met the on-time target rate twice. Certain districts, such as 4G in
      Northwest Philadelphia and 2D in South Philadelphia, had collection rates
      consistently worse than the citywide average prior the pandemic. On the
      other hand, districts like 2B in Center City and 6A in the Northeast fared
      consistently better than the citywide average. For the most part, these
      trends have continued since the pandemic’s start, with areas of the city
      with better pre-pandemic performance able to maintain their relative
      success during the pandemic. The goal of this analysis is to provide the
      Streets Department with a resource to improve service delivery for
      Philadelphians and address the unequal nature of sanitation operations
      across the city.
    </p>

    <!-- Link -->
    <p class="font-italic mt-5">
      <i class="fas fa-long-arrow-alt-right fa-2x my-arrow mr-1"></i>
      <span
        >Explore the sanitation data for your neighborhood using the
        <router-link to="/explorer">Data Explorer</router-link>.</span
      >
    </p>
  </div>
</template>

<script>
export default { name: "Intro" };
</script>

<style>
.my-arrow {
  vertical-align: -0.6rem !important;
  color: #2176d2;
}
</style>