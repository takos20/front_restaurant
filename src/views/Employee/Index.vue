<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.employee.list.title") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/employee/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.employee.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
