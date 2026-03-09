<template>
  <div class="exception-403">
    <exception
      :title="403"
      :statut="$vuetify.lang.t('$vuetify.exception.pages.403')"
    ></exception>
  </div>
</template>

<script>
import Exception from "../../components/exception/Index";
export default {
  name: "Forbidden",
  components: {
    exception: Exception,
  },
};
</script>

<style scoped></style>
