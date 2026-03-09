<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.ordinance.list.title") }}
    </div>
    <ordinance color="black"></ordinance>
  </div>
</template>

<script>
import Ordinance from "./../../components/ordinance/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.ordinance.title"),
    };
  },
  data: () => ({}),
  components: {
    Ordinance,
  },
  methods: {},
};
</script>
