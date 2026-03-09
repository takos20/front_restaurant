<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.dosage.list.title") }}
    </div>
    <dosage color="black"></dosage>
  </div>
</template>

<script>
import Dosage from "./../../components/dosage/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.dosage.title"),
    };
  },
  data: () => ({}),
  components: {
    Dosage,
  },
};
</script>
