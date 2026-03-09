<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.promotion.list.title") }}
    </div>
    <room color="black"></room>
  </div>
</template>

<script>
import Room from "../../components/promotion/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.promotion.title"),
    };
  },
  data: () => ({}),
  components: {
    Room,
  },
};
</script>
