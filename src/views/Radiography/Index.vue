<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.radiography.list.title") }}
    </div>
    <radiography color="black"></radiography>
  </div>
</template>

<script>
import Radiography from "./../../components/radiography/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.radiography.title"),
    };
  },
  data: () => ({}),
  components: {
    Radiography,
  },
};
</script>
