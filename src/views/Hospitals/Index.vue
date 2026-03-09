<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
    >
      {{ $vuetify.lang.t("$vuetify.hospitals.title") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-else
    >
      {{ $vuetify.lang.t("$vuetify.hospitals.retail") }}
    </div>
    <hospital color="black"></hospital>
  </div>
</template>

<script>
import Hospital from "./../../components/hospitals/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.hospitals.title"),
    };
  },
  data: () => ({}),
  components: {
    Hospital,
  },
};
</script>
