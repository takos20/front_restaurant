<template>
  <v-card>
    <v-card-title>
      <div class="title">
        {{ $vuetify.lang.t("$vuetify.security.password2") }}
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-form @submit.prevent="updatePassword">
      <v-container>
        <v-text-field
          autofocus
          v-model="form.oldPassword"
          color="primary"
          @blur="$v.form.oldPassword.$touch()"
          @input="$v.form.oldPassword.$touch()"
          :error-messages="oldpasswordErrors"
          :label="$vuetify.lang.t('$vuetify.users.cols.current_password.title')"
          outlined
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          color="primary"
          @blur="$v.form.password.$touch()"
          @input="$v.form.password.$touch()"
          :label="$vuetify.lang.t('$vuetify.users.cols.password.title')"
          :error-messages="passwordErrors"
          type="password"
          outlined
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="form.re_password"
          color="primary"
          @blur="$v.form.re_password.$touch()"
          @input="$v.form.re_password.$touch()"
          :label="$vuetify.lang.t('$vuetify.users.cols.re_password.title')"
          :error-messages="passwordErrors"
          type="password"
          outlined
          prepend-inner-icon="mdi-lock"
        ></v-text-field>
        <v-row justify="center">
          <v-btn
            color="primary"
            :loading="loading"
            class="mr-2 my-2"
            dark
            type="submit"
          >
            {{ $vuetify.lang.t("$vuetify.btn.save") }}
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, requiredIf, sameAs } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: this.$auth.user().id,
          oldPassword: null,
          password: null,
          re_password: null,
        };
      },
    },
  },
  data: () => ({
    urlItems: "/users/change-password",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  created() {
    this.getTypesRole();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        oldPassword: {
          required,
        },
        password: {
          required: requiredIf((component) => {
            return !component["id"];
          }),
        },
        re_password: {
          sameAsPassword: sameAs("password"),
        },
      },
    };
    return validators;
  },
  methods: {
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    updatePassword() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: "PATCH",
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.users.cols.password.success"
              ),
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        oldPassword: this.form.oldPassword,
        re_password: this.form.re_password,
      };
      if (!this._.isNull(this.form.password)) {
        data.password = this.form.password;
      }
      if (!this._.isNull(this.form.re_password)) {
        data.re_password = this.form.re_password;
      }
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    roleErrors() {
      let errors = [];
      if (!this.$v.form.role.$dirty) return errors;
      !this.$v.form.role.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.role.required"));
      return errors;
    },
    oldpasswordErrors() {
      let errors = [];
      if (!this.$v.form.oldPassword.$dirty) return errors;

      !this.$v.form.oldPassword.required &&
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
  },
};
</script>
