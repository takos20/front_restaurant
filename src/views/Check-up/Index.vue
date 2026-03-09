<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.checkup.list.title") }}
    </div>
    <checkup color="black"></checkup>
  </div>
</template>

<script>
import Checkup from "./../../components/check-up/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.checkup.title"),
    };
  },
  data: () => ({}),
  components: {
    Checkup,
  },
};
</script>
