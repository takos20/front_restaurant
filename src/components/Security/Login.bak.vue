<template>
  <template>
    <v-app>
      <!--    <v-img-->
      <!--        :src="require('../../assets/GHim.png')"-->
      <!--        class="center"-->
      <!--    ></v-img>-->
      <v-main>
        <!--    <v-img-->
        <!--        :src="require('../../assets/GHim.png')"-->
        <!--        class="center"-->
        <!--    ></v-img>-->
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-form @submit.prevent="login" id="login-form" autocomplete="off">
              <v-card
                class="pt-3 mx-auto"
                style="background-color: #4e342e"
                width="340"
                elevation="15"
              >
                <v-card-text
                  class="text-center body-1 white--text text--darken-1"
                >
                  <h3 class="display-0">
                    {{ $vuetify.lang.t("$vuetify.security.titleLogin") }}
                  </h3>
                </v-card-text>
                <v-card
                  class="pt-2 mx-auto"
                  max-width="340"
                  elevation="15"
                  color="login2card"
                >
                  <v-card-text
                    class="text-center body-2 grey--text text--darken-1"
                  >
                    <span class="text-center body-2 grey--text text--darken-1">
                      {{ $vuetify.lang.t("$vuetify.security.title") }}
                    </span>
                  </v-card-text>
                  <v-card-text class="text-center mb-0">
                    <v-text-field
                      autofocus
                      id="username"
                      :label="
                        $vuetify.lang.t('$vuetify.security.cols.username.title')
                      "
                      @blur="$v.username.$touch()"
                      @input="$v.username.$touch()"
                      :error-messages="usernameErrors"
                      name="login"
                      v-model="username"
                      color="primary"
                      autocomplete="off"
                      type="text"
                      class="font-weight-bold"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      :label="
                        $vuetify.lang.t('$vuetify.security.cols.password.title')
                      "
                      @blur="$v.password.$touch()"
                      @input="$v.password.$touch()"
                      :error-messages="passwordErrors"
                      name="password"
                      prepend-inner-icon="mdi-lock"
                      outlined
                      dense
                      :append-icon="toggle.icon"
                      :type="toggle.type"
                      autocomplete="on"
                      @click:append="show = !show"
                      v-model="password"
                      color="primary"
                      class="font-weight-bold"
                    ></v-text-field>
                    <router-link
                      style="text-decoration: none; color: #4e342e"
                      class="font-weight-bold body-2 text--d text--darken-4"
                      :to="{ name: 'reset' }"
                    >
                      {{
                        $vuetify.lang.t(
                          "$vuetify.security.cols.password.title2"
                        )
                      }}
                    </router-link>
                    <v-btn
                      color="primary"
                      block
                      elevation="9"
                      type="submit"
                      :disabled="this.username === '' || this.password === ''"
                      :loading="loading"
                      class="mt-2 white--text"
                    >
                      {{ $vuetify.lang.t("$vuetify.btn.login") }}
                    </v-btn>
                  </v-card-text>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon @click="changeLanguage()" v-on="on">
                        {{ $vuetify.lang.current.toUpperCase() }}
                      </v-btn>
                    </template>
                    <span
                      class="text-center font-weight-bold body-2 white--text text--d ken-1"
                    >
                      {{ $vuetify.lang.t("$vuetify.btn.change_language") }}
                    </span>
                  </v-tooltip>
                </v-card>
              </v-card>
            </v-form>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  <v-app>
    <!--    <v-img-->
    <!--        :src="require('../../assets/GHim.png')"-->
    <!--        class="center"-->
    <!--    ></v-img>-->
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-form @submit.prevent="login" id="login-form" autocomplete="off">
              <v-card
                class="pt-3 mx-auto"
                style="background-color: primary"
                max-width="310"
                elevation="15"
              >
                <v-card
                  class="pt-2 mx-auto"
                  max-width="330"
                  elevation="15"
                  color="#F5F5F5"
                >
                  <v-card-text
                    class="text-center body-2 grey--text text--darken-1"
                  >
                    <div class="text-center mb-0">
                      <img
                        :src="require('./../../assets/logo-masys.png')"
                        style="width: 250px"
                      />
                    </div>
                    <span class="text-center body-2 grey--text text--darken-1">
                      {{ $vuetify.lang.t("$vuetify.security.title") }}
                    </span>
                  </v-card-text>
                  <v-card-text class="text-center mb-0">
                    <v-text-field
                      autofocus
                      id="username"
                      :label="
                        $vuetify.lang.t('$vuetify.security.cols.username.title')
                      "
                      @blur="$v.username.$touch()"
                      @input="$v.username.$touch()"
                      :error-messages="usernameErrors"
                      name="login"
                      v-model="username"
                      color="primary"
                      autocomplete="off"
                      type="text"
                      class="font-weight-bold"
                      outlined
                      dense
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field
                      id="password"
                      :label="
                        $vuetify.lang.t('$vuetify.security.cols.password.title')
                      "
                      @blur="$v.password.$touch()"
                      @input="$v.password.$touch()"
                      :error-messages="passwordErrors"
                      name="password"
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      outlined
                      dense
                      v-model="password"
                      color="primary"
                      autocomplete="off"
                      class="font-weight-bold"
                    ></v-text-field>
                    <router-link
                      style="text-decoration: none; color: primary"
                      class="font-weight-bold body-2 text--d text--darken-4"
                      :to="{ name: 'reset' }"
                    >
                      {{
                        $vuetify.lang.t(
                          "$vuetify.security.cols.password.title2"
                        )
                      }}
                    </router-link>
                    <v-btn
                      color="primary"
                      block
                      elevation="9"
                      type="submit"
                      :loading="loading"
                      dark
                      class="mt-2"
                    >
                      {{ $vuetify.lang.t("$vuetify.btn.login") }}
                    </v-btn>
                  </v-card-text>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn icon @click="changeLanguage()" v-on="on">
                        {{ $vuetify.lang.current.toUpperCase() }}
                      </v-btn>
                    </template>
                    <span
                      class="text-center font-weight-bold body-2 white--text text--d ken-1"
                    >
                      {{ $vuetify.lang.t("$vuetify.btn.change_language") }}
                    </span>
                  </v-tooltip>
                </v-card>
              </v-card>
            </v-form>
          </v-col>
        </v-row>
        <v-card-text
          class="text-center body-2 grey--text text--darken-1"
          style="margin-top: -120px"
        >
          <div>
            <span class="text-center body-2 grey--text text--darken-1">
              2023 &copy; MASYS-HOSPITAL version 1.0, tout droit réservé.
            </span>
          </div>
          <!--                    <div><span class="text-center body-2 grey&#45;&#45;text text&#45;&#45;darken-1">-->
          <!--                      Made By Ngoho.-->
          <!--                    </span></div>-->
          <!--                    <div><span class="text-center body-2 grey&#45;&#45;text text&#45;&#45;darken-1">-->
          <!--                      Contact : dimitri_ngoho@yahoo.fr +237 690 438 500-->
          <!--                    </span></div>-->
        </v-card-text>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { minLength, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      loading: false,
    };
  },
  // _.hasIn(errors, 'username')? errors['username'] : usernameErrors"
  created() {
    this.$store.dispatch("showNotification", { statut: false });
  },
  validations: {
    username: {
      required,
      minLength: minLength(2),
    },
    password: {
      required,
    },
  },
  methods: {
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
    login() {
      let self = this;
      let badCredential = this.$vuetify.lang.t(
        "$vuetify.security.form.bad_credentials"
      );
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        const credentials = {
          username: this.username,
          password: this.password,
        };

        //console.log("$auth: ", this.$auth);
        const redirect = this.$auth.redirect();
        this.$auth
          .login({
            data: credentials,
            redirect: {
              name:
                redirect && redirect.from !== undefined
                  ? redirect.from.name
                  : "dashboard",
            },
            fetchUser: true,
          })
          .then(() => {
            //console.log("user", res);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              const datas = error.response.data.detail;
              //console.log("datas", datas);
              self.errors["username"] = datas;
              self.$store.dispatch("showNotification", {
                statut: true,
                text: datas,
                color: "#B71C1C",
              });
              //self.$forceUpdate();
              //console.log("eerreur");
            } else {
              self.$store.dispatch("showNotification", {
                statut: true,
                text: badCredential,
                color: "#B71C1C",
              });
            }
            self.loading = false;
          })
          .finally(() => {
            self.loading = false;
          });
      }
    },
  },
  computed: {
    ...mapGetters(["notification"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );
      return errors;
    },
  },
};
</script>
<style scoped>
.fill-height {
  background-image: url(../../assets/doc.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}
</style>
