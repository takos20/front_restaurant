<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.internalnote.list.title") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/internal_note/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.internalnote.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
