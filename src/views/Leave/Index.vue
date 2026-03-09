<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.leave.list.title") }}
    </div>
    <leave color="black"></leave>
  </div>
</template>

<script>
import Leave from "./../../components/leave/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.leave.title"),
    };
  },
  data: () => ({}),
  components: {
    Leave,
  },
};
</script>
