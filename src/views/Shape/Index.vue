<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.shape.list.title") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/shape/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.shape.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
