<template>
  <v-layout wrap row>
    <div class="text-xs-center">
      <v-progress-circular
        :size="80"
        color="secondary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.security.logout.title"),
    };
  },
  created() {
    this.logout();
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
