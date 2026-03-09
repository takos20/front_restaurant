<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.hospitalization.list.title") }}
    </div>
    <hospitalization color="black"></hospitalization>
  </div>
</template>

<script>
import Hospitalization from "./../../components/hospitalization/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.hospitalization.title"),
    };
  },
  data: () => ({}),
  components: {
    Hospitalization,
  },
};
</script>
