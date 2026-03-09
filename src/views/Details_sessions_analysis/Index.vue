<template>
  <div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/details_sessions_analysis/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.cash_movement.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
