<template>
  <div>
    <div
      class="title mb-5 white--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #224b8d"
    >
      {{ $vuetify.lang.t("$vuetify.meeting.list.is_here") }}
    </div>
    <user color="black"></user>
  </div>
</template>

<script>
import User from "./../../components/details_meeting/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.meeting.title"),
    };
  },
  data: () => ({}),
  components: {
    User,
  },
};
</script>
