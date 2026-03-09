<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.medical_act.list.title") }}
    </div>
    <medical color="black"></medical>
  </div>
</template>

<script>
import Medical from "./../../components/medical_act/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.medical_act.title"),
    };
  },
  data: () => ({}),
  components: {
    Medical,
  },
};
</script>
