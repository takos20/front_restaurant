<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.taxeContribution.list.title") }}
    </div>
    <performance color="black"></performance>
  </div>
</template>

<script>
import Performance from "./../../components/taxeContribution/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.taxeContribution.title"),
    };
  },
  data: () => ({}),
  components: {
    Performance,
  },
};
</script>
