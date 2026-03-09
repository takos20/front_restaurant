<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.purchase.list.title") }}
    </div>
    <purchase color="black"></purchase>
  </div>
</template>

<script>
import Purchase from "./../../components/purchase_order/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.purchase.title"),
    };
  },
  data: () => ({}),
  components: {
    Purchase,
  },
};
</script>
