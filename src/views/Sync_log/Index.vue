<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.sync_log.list.title") }}
    </div>
    <room color="black"></room>
  </div>
</template>

<script>
import Room from "../../components/sync_log/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.sync_log.title"),
    };
  },
  data: () => ({}),
  components: {
    Room,
  },
};
</script>
