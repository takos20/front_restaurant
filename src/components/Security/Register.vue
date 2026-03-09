<template>
  <v-app id="security">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-card-text class="text-center mb-0">
            <span class="text-center font-weight-bold black--text display-1">
              {{ $vuetify.lang.t("$vuetify.security.creer") }}
            </span>
          </v-card-text>
          <v-card class="pt-3 mx-auto" elevation="5">
            <v-form @submit.prevent="save">
              <v-card-text class="text-center mb-0" style="margin-top: -25px">
                <span
                  class="text-center font-weight-bold body-2 black--text text--d ken-1"
                >
                  {{ $vuetify.lang.t("$vuetify.security.title2") }}
                </span>
              </v-card-text>
              <v-card-text>
                <v-container style="margin-top: -15px">
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        autofocus
                        v-model="form.firstName"
                        color="#1FA055"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.users.cols.first_name.title'
                          )
                        "
                        @blur="$v.form.firstName.$touch()"
                        @input="$v.form.firstName.$touch()"
                        :error-messages="firstnameErrors"
                        prepend-inner-icon="mdi-account"
                        class="font-weight-bold"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.lastName"
                        color="#1FA055"
                        :label="
                          $vuetify.lang.t('$vuetify.users.cols.last_name.title')
                        "
                        @blur="$v.form.lastName.$touch()"
                        @input="$v.form.lastName.$touch()"
                        :error-messages="lastnameErrors"
                        prepend-inner-icon="mdi-account"
                        class="font-weight-bold"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="form.email"
                    color="#1FA055"
                    :label="$vuetify.lang.t('$vuetify.users.cols.email.title')"
                    @blur="$v.form.email.$touch()"
                    @input="$v.form.email.$touch()"
                    :error-messages="emailErrors"
                    prepend-inner-icon="mdi-at"
                    class="font-weight-bold"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="form.phone"
                    color="#1FA055"
                    :label="$vuetify.lang.t('$vuetify.users.cols.phone.title')"
                    @blur="$v.form.phone.$touch()"
                    @input="$v.form.phone.$touch()"
                    :error-messages="phoneErrors"
                    prepend-inner-icon="mdi-phone"
                    class="font-weight-bold"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    v-model="form.password"
                    color="#1FA055"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.password.title')
                    "
                    @blur="$v.form.password.$touch()"
                    @input="$v.form.password.$touch()"
                    :error-messages="passwordErrors"
                    prepend-inner-icon="mdi-lock"
                    class="font-weight-bold"
                    type="password"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="form.re_password"
                    color="#1FA055"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.re_password.title')
                    "
                    @blur="$v.form.re_password.$touch()"
                    @input="$v.form.re_password.$touch()"
                    :error-messages="passwordErrors"
                    prepend-inner-icon="mdi-lock"
                    class="font-weight-bold"
                    type="password"
                    outlined
                  ></v-text-field>

                  <v-checkbox
                    v-model="form.conditions"
                    :input-value="true"
                    color="#1FA055"
                    style="margin-top: -15px"
                  >
                    <template v-slot:label class="text-center mt-3">
                      <span class="text-no-wrap">{{
                        $vuetify.lang.t("$vuetify.security.terms")
                      }}</span>
                    </template>
                  </v-checkbox>
                  <div class="text-center mt-3" style="margin-top: -25px">
                    <v-btn
                      block
                      color="#1FA055"
                      width="150"
                      elevation="9"
                      type="submit"
                      :loading="loading"
                      dark
                    >
                      {{ $vuetify.lang.t("$vuetify.security.inscrire") }}
                    </v-btn>
                  </div>
                  <v-card-text class="text-center mb-0">
                    <span
                      class="text-center font-weight-bold body-2 black--text text--d ken-1"
                    >
                      {{
                        $vuetify.lang.t("$vuetify.security.cols.name.title3")
                      }}
                    </span>

                    <router-link
                      style="text-decoration: none; color: inherit"
                      class="font-weight-bold body-2 green--text text--d text--darken-4"
                      :to="{ name: 'Login' }"
                    >
                      {{ $vuetify.lang.t("$vuetify.security.identifier") }}
                    </router-link>
                  </v-card-text>
                </v-container>
              </v-card-text>
              <v-card-text class="text-right mb-0" style="margin-top: -65px">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon @click="changeLanguage()" v-on="on">
                      {{ $vuetify.lang.current.toUpperCase() }}
                    </v-btn>
                  </template>
                  <span
                    class="text-center font-weight-bold body-2 black--text text--d ken-1"
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.change_language") }}
                  </span>
                </v-tooltip>
              </v-card-text>
            </v-form>
          </v-card>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { mapGetters } from "vuex";
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import { existEmail, phoneR } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          phone: null,
          firstName: null,
          email: null,
          lastName: null,
          role: "ROLE_FOLDER",
          username: null,
          password: null,
          re_password: null,
          is_active: true,
          conditions: false,
        };
      },
    },
  },
  data: () => ({
    urlItems: "users",
  }),
  validations() {
    let validators = {
      form: {
        firstName: {
          required,
          maxLength: maxLength(100),
        },
        phone: {
          required,
          phoneR,
        },
        email: {
          required,
          email,
          maxLength: maxLength(100),
          unique: existEmail,
        },
        lastName: {
          required,
          maxLength: maxLength(10),
          minLength: minLength(3),
        },
        password: {
          required: requiredIf((component) => {
            return !component["id"];
          }),
        },
        role: {
          required,
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
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PATCH" : "POST";
    },
    save() {
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
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.users.new.success"),
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
    changeLanguage() {
      let lang;
      if (this.$vuetify.lang.current === "fr") {
        lang = "en";
      } else {
        lang = "fr";
      }
      window.localStorage.setItem("lang", lang);
      this.$vuetify.lang.current = lang;
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        phone: this.form.phone,
        email: this.form.email,
        role: this.form.role,
        username: this.form.firstName,
        re_password: this.form.re_password,
        is_active: this.form.is_active,
        conditions: this.form.conditions,
        tag: this.form.tag,
      };
      if (
        !this._.isEmpty(this.form.password) ||
        !this._.isNull(this.form.password)
      ) {
        data.password = this.form.password;
      }
      return data;
    },
  },
  computed: {
    ...mapGetters(["notification"]),
    // Gestion des erreurs du formulaire
    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.first_name.required")
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

      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));
      return errors;
    },
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));
      return errors;
    },
  },
};
</script>
<style scoped>
.hello {
  /*background-image: url(./../../assets/fermer-focus.jpg);*/
  background-repeat: no-repeat;
  background-size: cover;
}

.v-content {
  background-color: ghostwhite;
}
</style>
