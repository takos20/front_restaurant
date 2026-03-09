<template>
  <div>
    <div
      class="title mb-5"
      v-if="
        $auth.check(['SUPER_ADMINISTRATOR', 'ADMINISTRATOR', 'RESPONSIBLE'])
      "
    >
      {{ $vuetify.lang.t("$vuetify.dashboard.title") }}
    </div>
    <dashboard></dashboard>
  </div>
</template>

<script>
import Dashboard from "./../components/home/Index";
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
