<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.cash_movement.list.title") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/cash_movement/Index";
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
