<template>
  <div class="address-search-wrapper d-flex">
    <!-- Loading -->
    <v-overlay :value="isLoading" opacity="1.0" color="#fff">
      <v-progress-circular indeterminate size="64" color="#2176d2" />
    </v-overlay>

    <v-text-field
      class="address-search-input"
      v-model="search"
      label="Show data for a specific address"
      clearable
      hint="Example: 1234 Market St"
      persistent-hint
      :error-messages="errors"
    />
    <div class="ml-2 search-btn-wrapper">
      <v-btn
        class=""
        small
        outlined
        title="Search for an address"
        @click="searchAddress"
      >
        <i class="fas fa-search"></i>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { safeFetch } from "@/tools";

export default {
  name: "AddressSearch",
  data() {
    return { search: "", isLoading: false, errors: [] };
  },
  methods: {
    async searchAddress() {
      this.isLoading = true;
      let url = `https://api.phila.gov/ais/v1/search/${this.search}?gatekeeperKey=c9c8f288dd8ece82a5b870d6dad470a0`;

      let response = await safeFetch(url);

      if (response.status === 404) {
        this.errors = ["Could not find any addresses matching query."];
        this.isLoading = false;
      } else {
        this.errors = [];
        this.search = response.normalized;

        let district = response.features[0].properties.sanitation_district;
        this.$emit("change", [district]);
        this.isLoading = false;
      }
    },
  },
  watch: {
    search(newVal) {
      if (newVal === "" || newVal === null) this.errors = [];
    },
  },
};
</script>

<style>
.address-search-input {
  max-width: 400px !important;
}
.search-btn-wrapper {
  padding-top: 12px;
  margin-top: 8px;
}
</style>