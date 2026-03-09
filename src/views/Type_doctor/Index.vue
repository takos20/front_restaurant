<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.type_doctor.list.title") }}
    </div>
    <surgery color="black"></surgery>
  </div>
</template>

<script>
import Surgery from "./../../components/type_doctor/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.type_doctor.title"),
    };
  },
  data: () => ({}),
  components: {
    Surgery,
  },
};
</script>
