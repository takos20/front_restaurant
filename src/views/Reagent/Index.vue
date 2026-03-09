<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.reagent.list.title") }}
    </div>
    <reagent color="black"></reagent>
  </div>
</template>

<script>
import Reagent from "./../../components/reagent/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.reagent.title"),
    };
  },
  data: () => ({}),
  components: {
    Reagent,
  },
};
</script>
