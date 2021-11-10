<template>
  <div id="analysis">
    <Intro />
    <Citywide />
    <ByDistrict />
    <Conclusion />
    <Footnotes />
  </div>
</template>

<script>
import Intro from "./1-Intro";
import Citywide from "./2-Citywide";
import ByDistrict from "./3-ByDistrict";
import Conclusion from "./4-Conclusion";
import Footnotes from "./5-Footnotes";

export default {
  components: { Intro, Citywide, ByDistrict, Conclusion, Footnotes },
};
</script>
