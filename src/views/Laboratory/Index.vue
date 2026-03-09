<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.laboratory.list.title") }}
    </div>
    <laboratory color="black"></laboratory>
  </div>
</template>

<script>
import Laboratory from "./../../components/laboratory/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.laboratory.title"),
    };
  },
  data: () => ({}),
  components: {
    Laboratory,
  },
};
</script>
