<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title class="subtitle-1 font-weight-bold">
        Mon profil
      </v-card-title>
      <app-form :form="form"></app-form>
    </v-card>
  </div>
</template>

<script>
import AppForm from "./Profile";

export default {
  name: "Index",
  data: () => ({
    form: {
      type: Object,
      default: function () {
        return {
          lastName: null,
          firstName: null,
          phone: null,
          email: null,
          role: null,
          password: null,
        };
      },
    },
    components: {
      AppForm,
    },
  }),
};
</script>
<style scoped></style>
