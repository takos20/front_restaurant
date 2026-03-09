<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.presence.list.title") }}
    </div>
    <discipline color="black"></discipline>
  </div>
</template>

<script>
import Discipline from "./../../components/presence/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.presence.title"),
    };
  },
  data: () => ({}),
  components: {
    Discipline,
  },
};
</script>
