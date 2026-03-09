<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.suppliers.list.title") }}
    </div>
    <suppliers color="black"></suppliers>
  </div>
</template>

<script>
import Suppliers from "./../../components/suppliers/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.suppliers.title"),
    };
  },
  data: () => ({}),
  components: {
    Suppliers,
  },
};
</script>
