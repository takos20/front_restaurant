<template>
  <reset></reset>
</template>

<script>
import Reset from "./../../components/Security/Reset.vue";
export default {
  data: () => ({}),
  created() {},
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.security.title"),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$auth.check()) {
        vm.$router.push({ name: "dashboard" });
      }
    });
  },
  components: {
    Reset,
  },
};
</script>
