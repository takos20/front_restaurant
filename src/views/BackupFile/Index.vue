<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.backupfile.list.title") }}
    </div>
    <files color="black"></files>
  </div>
</template>

<script>
import Files from "./../../components/backupFile/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.backupfile.title"),
    };
  },
  data: () => ({}),
  components: {
    Files,
  },
};
</script>
