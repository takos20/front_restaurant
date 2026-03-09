<template>
  <div>
    <div class="title mb-5">
      {{ $vuetify.lang.t("$vuetify.packages.title2") }}
    </div>
    <security></security>
  </div>
</template>

<script>
import Security from "./../../components/Security/Profile";

export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.packages.title"),
    };
  },
  data: () => ({}),
  components: {
    Security,
  },
};
</script>
