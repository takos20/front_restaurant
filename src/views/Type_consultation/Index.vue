<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.type_consultation.list.title") }}
    </div>
    <checkup color="black"></checkup>
  </div>
</template>

<script>
import Checkup from "./../../components/type_consultation/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.type_consultation.title"),
    };
  },
  data: () => ({}),
  components: {
    Checkup,
  },
};
</script>
