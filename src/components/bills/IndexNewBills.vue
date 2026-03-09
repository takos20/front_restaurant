<template>
  <div>
    <bills color="black"></bills>
  </div>
</template>

<script>
import Bills from "./../../components/bills/Form";

export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.bills.title"),
    };
  },
  data: () => ({}),
  components: {
    Bills,
  },
};
</script>
