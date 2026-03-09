<template>
  <div>
    <div class="title mb-5">
      {{ $vuetify.lang.t("$vuetify.security.title3") }}
    </div>
    <parameter></parameter>
  </div>
</template>

<script>
import Parameter from "./../../components/Parameter/Index";
export default {
  data: () => ({}),
  components: {
    Parameter,
  },
};
</script>
