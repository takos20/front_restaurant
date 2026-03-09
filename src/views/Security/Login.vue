<template>
  <login></login>
</template>

<script>
import Login from "./../../components/Security/Login.vue";
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
    Login,
  },
};
</script>
