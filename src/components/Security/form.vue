<template>
  <v-card flat>
    <v-form @submit.prevent="savep">
      <v-container>
        <!-- alert -->
        <!-- avatar -->
        <!-- name -->
        <v-divider class="mx-0"></v-divider>
        <v-row wrap style="margin-top: 25px">
          <v-col cols="12" sm="12" class="mb-0 py-0">
            <v-text-field
              v-model="form.username"
              color="primary"
              :label="$vuetify.lang.t('$vuetify.users.cols.username.title')"
              outlined
              prepend-inner-icon="mdi-text-short"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider class="mx-0 mt-3"></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            dark
            @click="home"
            v-if="this.$route.params.idD == null"
          >
            <v-icon color="white" left>mdi-logout</v-icon>
            {{ $vuetify.lang.t("$vuetify.menu.home") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t("$vuetify.btn.update") }}
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
// import {
//   required,
//   requiredIf,
//   sameAs
// } from "vuelidate/lib/validators";
// // import { phoneR } from "../../helpers/Validator";
import FormMixin from "./../../mixins/Common/Form.vue";
import { required } from "vuelidate/lib/validators";

export default {
  name: "UpdateProfile",
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: this.$auth.user().id,
          username: this.$auth.user().username,
        };
      },
    },
  },
  data: () => ({
    isLoading: false,
    loading: false,
    search: null,
    menu2: false,
    menu: false,
    urlItems: "/users",
  }),
  watch: {},
  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        username: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    home() {
      this.$router.push({
        name: "home",
      });
    },
    reloadPage() {
      window.location.reload();
    },

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataFormP() {
      let data = {
        username: this.form.username,
      };
      return data;
    },
    setForm() {
      // Données envoyées lors de la modification
      this.form.id = this.$auth.user().id;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;

      !this.$v.form.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );

      !this.$v.form.username.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.minLength",
            this.$v.form.username.$params.minLength.min
          )
        );

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.maxLength",
            this.$v.form.username.$params.maxLength.max
          )
        );
      !this.$v.form.username.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.unique")
        );
      return errors;
    },
    lastnameErrors() {
      let errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.last_name.required")
        );

      !this.$v.form.lastName.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.last_name.maxLength",
            this.$v.form.lastName.$params.maxLength.max
          )
        );
      return errors;
    },
  },
};
</script>
