<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.prices.list.title") }}
    </div>
    <surgery color="black"></surgery>
  </div>
</template>

<script>
import Surgery from "./../../components/pricesAll/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.prices.title"),
    };
  },
  data: () => ({}),
  components: {
    Surgery,
  },
};
</script>
