<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.certificate.list.title") }}
    </div>
    <certificate color="black"></certificate>
  </div>
</template>

<script>
import Certificate from "./../../components/certificate/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.certificate.title"),
    };
  },
  data: () => ({}),
  components: {
    Certificate,
  },
  methods: {},
};
</script>
