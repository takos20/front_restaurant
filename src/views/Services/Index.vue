<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.services.list.title") }}
    </div>
    <departments color="black"></departments>
  </div>
</template>

<script>
import Departments from "./../../components/services/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.services.title"),
    };
  },
  data: () => ({}),
  components: {
    Departments,
  },
};
</script>
