<template>
  <div id="sanitation-data-release" data-vuetify>
    <v-app>
      <v-main>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#2176d2"
          centered
          class="tab-bar"
        >
          <v-tab key="analysis" to="/" :ripple="false"> Analysis </v-tab>
          <v-tab key="explorer" to="/explorer" :ripple="false">
            Data Explorer
          </v-tab>
        </v-tabs>

        <!-- Router view -->
        <router-view :key="$route.path" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "SanitationDataRelease",
  data() {
    return { tab: null };
  },
};
</script>

<style>
.section:nth-child(n + 2) {
  margin-top: 2.5rem;
}
.tab-bar {
  margin-bottom: 50px;
}
#sanitation-data-release {
  overflow-x: hidden !important;
}

#sanitation-data-release h2,
h3 {
  margin-top: 2rem !important;
  margin-bottom: 1rem !important;
}

.aligncenter {
  margin: 2em auto !important;
  padding: 6px !important;
}
</style>
