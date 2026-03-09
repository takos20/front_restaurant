<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.consultation.list.title") }}
    </div>
    <medical color="black"></medical>
  </div>
</template>

<script>
import Medical from "./../../components/ophtamological_consultation/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.consultation.titleO"),
    };
  },
  data: () => ({}),
  components: {
    Medical,
  },
  methods: {
    doctors() {
      this.$router.push({
        name: "doctor",
      });
    },
    patients() {
      this.$router.push({
        name: "patient",
      });
    },
    prescriptions() {
      this.$router.push({
        name: "prescription",
      });
    },
    appointments() {
      this.$router.push({
        name: "appointment",
      });
    },
  },
};
</script>
