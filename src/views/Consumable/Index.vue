<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.consumable.list.title") }}
    </div>
    <consumable color="black"></consumable>
  </div>
</template>

<script>
import Consumable from "../../components/consumable/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.consumable.title"),
    };
  },
  data: () => ({}),
  components: {
    Consumable,
  },
};
</script>
