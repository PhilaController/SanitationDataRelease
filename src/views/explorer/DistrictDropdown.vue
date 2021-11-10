<template>
  <div id="district-dropdown-wrapper">
    <v-select
      :items="allowedDistricts"
      v-model="selectedDistricts"
      item-text="value"
      item-value="text"
      label="Choose districts to view"
      chips
      multiple
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="removeDistrict(item.id)"
          :color="getColor(item.text)"
          :text-color="getTextColor(item.text)"
          label
        >
          {{ item.value }}
        </v-chip>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "DistrictDropdown",
  props: ["districtNames", "colors", "whiteDistricts"],
  data() {
    return { selectedDistricts: ["2B"] };
  },
  computed: {
    allowedDistricts() {
      return this.districtNames.map((d, i) => {
        return { value: `District ${d}`, text: d, id: i };
      });
    },
  },
  methods: {
    getColor(district) {
      let i = this.districtNames.indexOf(district);
      return this.colors[i];
    },
    getTextColor(district) {
      let i = this.whiteDistricts.indexOf(district);
      return i == -1 ? "#000" : "#fff";
    },
    removeDistrict(item) {
      this.selectedDistricts.splice(this.selectedDistricts.indexOf(item), 1);
      this.selectedDistricts = [...this.selectedDistricts];
    },
  },
  watch: {
    selectedDistricts(newVal) {
      this.$emit("change", newVal);
    },
  },
};
</script>

<style>
#district-dropdown-wrapper {
  max-width: 400px;
}
</style>