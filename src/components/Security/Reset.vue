<template>
  <v-app id="security">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-form @submit.prevent="save" id="login-form" autocomplete="off">
              <!--<div class="text-center mb-0">-->
              <!--<img-->
              <!--:src="require('./../../assets/logo.png')"-->
              <!--style="width: 150px"-->
              <!--/>-->
              <!--</div>-->
              <v-card
                class="pt-3 mx-auto"
                max-width="400"
                elevation="15"
                style="margin-top: -25px"
              >
                <v-card-text class="text-center mb-0">
                  <span
                    class="text-center font-weight-bold body-2 --text text--d lighten-4"
                  >
                    {{
                      $vuetify.lang.t("$vuetify.security.cols.password.title2")
                    }}
                  </span>
                </v-card-text>
                <v-card-text
                  class="text-center body-2 grey--text text--darken-1"
                  style="margin-top: -25px"
                >
                  <span
                    class="text-center font-weight-bold body-2 light-black--text text--d ken-1"
                  >
                    {{ $vuetify.lang.t("$vuetify.security.description") }}
                  </span>
                </v-card-text>
                <v-card-text class="text-center mb-0">
                  <v-text-field
                    v-model="form.email"
                    autofocus
                    color="#0984e3"
                    :label="$vuetify.lang.t('$vuetify.users.cols.email.title')"
                    @blur="$v.form.email.$touch()"
                    @input="$v.form.email.$touch()"
                    :error-messages="emailErrors"
                    prepend-inner-icon="mdi-at"
                    class="font-weight-bold"
                    outlined
                  ></v-text-field>
                  <v-card-text
                    class="text-center mb-0"
                    style="margin-top: -25px"
                  >
                    <router-link
                      style="text-decoration: none; color: #0984e3"
                      class="font-weight-bold body-2 text--d text--darken-4"
                      :to="{ name: 'Login' }"
                    >
                      {{ $vuetify.lang.t("$vuetify.security.personal") }}
                    </router-link>
                  </v-card-text>
                  <v-btn
                    block
                    color="#0984e3"
                    width="100"
                    elevation="9"
                    type="submit"
                    :loading="loading"
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.security.send") }}
                  </v-btn>
                </v-card-text>

                <v-card-text class="text-right mb-0" style="margin-top: -25px">
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
              </v-card>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { mapGetters } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          email: null,
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
        email: {
          required,
          email,
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
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));
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
  background-color: lightblue;
}
</style>
