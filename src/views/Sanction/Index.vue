<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.sanction.list.title") }}
    </div>
    <sanction color="black"></sanction>
  </div>
</template>

<script>
import Sanction from "./../../components/sanction/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.sanction.title"),
    };
  },
  data: () => ({}),
  components: {
    Sanction,
  },
};
</script>
