<template>
  <div>
    <div class="title mb-5">
      {{ $vuetify.lang.t("$vuetify.dashboard.title") }}
    </div>
    <dashboard></dashboard>
  </div>
</template>

<script>
import Dashboard from "./../components/dashboard/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.dashboard.title"),
    };
  },
  data: () => ({
    urlItems: "users/stat_user",
  }),
  components: {
    Dashboard,
  },
};
</script>
