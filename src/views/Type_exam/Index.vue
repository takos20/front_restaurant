<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.type_exam.list.title") }}
    </div>
    <exam color="black"></exam>
  </div>
</template>

<script>
import Exam from "./../../components/type_exam/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.type_exam.title"),
    };
  },
  data: () => ({}),
  components: {
    Exam,
  },
};
</script>
