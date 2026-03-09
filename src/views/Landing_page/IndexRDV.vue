<template>
  <div>
    <!--<div-->
    <!--class="title mb-5 black&#45;&#45;text blue lighten-5 text-right"-->
    <!--style="height: 30px; margin-top: 30px"-->
    <!--&gt;-->
    <!--{{ $vuetify.lang.t("$vuetify.appointment.list.title") }}-->
    <!--</div>-->
    <medical color="black"></medical>
  </div>
</template>

<script>
import Medical from "./../../components/appointment/IndexRDV";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.appointment.title"),
    };
  },
  data: () => ({}),
  components: {
    Medical,
  },
};
</script>
