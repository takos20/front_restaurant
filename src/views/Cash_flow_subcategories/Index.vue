<template>
  <div>
    <div
      class="title mb-5 black--text blue lighten-5 text-right"
      style="height: 30px; margin-top: 30px"
    >
      {{ $vuetify.lang.t("$vuetify.subcategory.list.title") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/cash_flow_subcategories/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.expenses_nature.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
