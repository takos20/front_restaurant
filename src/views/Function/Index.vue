<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.function.list.title") }}
    </div>
    <function color="black"></function>
  </div>
</template>

<script>
import Function from "./../../components/function/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.function.title"),
    };
  },
  data: () => ({}),
  components: {
    Function,
  },
};
</script>
