<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.complaints.list.title") }}
    </div>
    <claim color="black"></claim>
  </div>
</template>

<script>
import Claim from "./../../components/complaints/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.complaints.title"),
    };
  },
  data: () => ({}),
  components: {
    Claim,
  },
};
</script>
