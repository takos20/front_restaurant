<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.employeeLeave.list.title") }}
    </div>
    <bonus color="black"></bonus>
  </div>
</template>

<script>
import Bonus from "./../../components/employeeLeave/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.employeeLeave.title"),
    };
  },
  data: () => ({}),
  components: {
    Bonus,
  },
};
</script>
