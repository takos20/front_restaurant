<template>
  <v-card flat>
    <v-form @submit.prevent="updatePassword">
      <v-container>
        <v-divider class="mx-0"></v-divider>
        <v-text-field
          autofocus
          v-model="form.old_password"
          color="primary"
          @blur="$v.form.old_password.$touch()"
          @input="$v.form.old_password.$touch()"
          :error-messages="oldpasswordErrors"
          :label="$vuetify.lang.t('$vuetify.users.cols.current_password.title')"
          outlined
          dense
          prepend-inner-icon="mdi-lock"
          style="margin-top: 25px"
        ></v-text-field>
        <v-text-field
          v-model="form.new_password"
          color="primary"
          @blur="$v.form.new_password.$touch()"
          @input="$v.form.new_password.$touch()"
          :label="$vuetify.lang.t('$vuetify.users.cols.password.title')"
          :error-messages="passwordErrors"
          outlined
          :append-icon="toggle.icon"
          :type="toggle.type"
          autocomplete="on"
          @click:append="show = !show"
          dense
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="form.re_password"
          color="primary"
          @blur="$v.form.re_password.$touch()"
          @input="$v.form.re_password.$touch()"
          :label="$vuetify.lang.t('$vuetify.users.cols.re_password.title')"
          :error-messages="rePasswordErrors"
          :append-icon="toggle2.icon"
          :type="toggle2.type"
          autocomplete="on"
          @click:append="show2 = !show2"
          outlined
          dense
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-divider class="mx-0"></v-divider>
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
// import {mapGetters} from "vuex";
import { required, requiredIf, sameAs } from "vuelidate/lib/validators";
// import { phoneR } from "../../helpers/Validator";
import FormMixin from "./../../mixins/Common/Form.vue";

export default {
  name: "ChangePassword",
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          old_password: null,
          new_password: null,
          departments: null,
          re_password: null,
        };
      },
    },
  },
  data: () => ({
    isLoading: false,
    loading: false,
    show: false,
    show2: false,
    urlItemsPassword: "/users/change_password",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  validations() {
    let validators = {
      form: {
        old_password: {
          required,
        },
        new_password: {
          required: requiredIf((component) => {
            return !component["id"];
          }),
        },
        re_password: {
          sameAsPassword: sameAs("new_password"),
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
    getDataFormPassword() {
      let data = {};
      if (
        !this._.isEmpty(this.form.new_password) ||
        !this._.isNull(this.form.new_password)
      ) {
        data.new_password = this.form.new_password;
      }
      if (
        !this._.isEmpty(this.form.old_password) ||
        !this._.isNull(this.form.old_password)
      ) {
        data.old_password = this.form.old_password;
      }
      return data;
    },
    setForm() {
      // Données envoyées lors de la modification
      this.form.id = this.$auth.user().id;
    },
  },
  computed: {
    toggle() {
      const icon = this.show ? "mdi-eye" : "mdi-eye-off";
      const type = this.show ? "text" : "password";
      return { icon, type };
    },
    toggle2() {
      const icon = this.show2 ? "mdi-eye" : "mdi-eye-off";
      const type = this.show2 ? "text" : "password";
      return { icon, type };
    },
    oldpasswordErrors() {
      let errors = [];
      if (!this.$v.form.old_password.$dirty) return errors;

      !this.$v.form.old_password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.current_password.required")
        );

      return errors;
    },
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.new_password.$dirty) return errors;

      !this.$v.form.new_password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
    rePasswordErrors() {
      let errors = [];
      if (!this.$v.form.re_password.$dirty) return errors;

      !this.$v.form.re_password.sameAsPassword &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
        );
      return errors;
    },
    // Gestion des erreurs du formulaire
  },
};
</script>
