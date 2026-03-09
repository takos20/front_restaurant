<template>
  <v-app>
    <v-main class="login-main">
      <!-- Background Pattern -->
      <div class="background-pattern"></div>

      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-form @submit.prevent="login" id="login-form" autocomplete="off">
              <!-- Main Card with Glassmorphism Effect -->
              <v-card class="login-card mx-auto" elevation="24" shaped>
                <!-- Header Section -->
                <div class="login-header">
                  <v-avatar size="60" class="mb-1 elevation-6">
                    <v-img
                      :src="require('../../assets/logo.png')"
                      alt="Logo"
                    ></v-img>
                  </v-avatar>

                  <h2
                    class="white--text font-weight-bold mb-1"
                    style="font-size: 19px"
                  >
                    {{ $vuetify.lang.t("$vuetify.security.titleLogin") }}
                  </h2>

                  <p class="white--text text--lighten-3 body-2 mb-0">
                    {{ $vuetify.lang.t("$vuetify.security.title") }}
                  </p>
                </div>

                <!-- Form Section -->
                <v-card-text class="pa-6">
                  <!-- Username Field -->
                  <v-text-field
                    autofocus
                    id="username"
                    :label="
                      $vuetify.lang.t('$vuetify.security.cols.username.title')
                    "
                    @blur="$v.username.$touch()"
                    @input="$v.username.$touch()"
                    :error-messages="usernameErrors"
                    v-model="username"
                    color="primary"
                    autocomplete="off"
                    type="text"
                    dense
                    outlined
                    class="mb-3"
                    prepend-inner-icon="mdi-account-circle"
                    hide-details="auto"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary">mdi-account-circle</v-icon>
                    </template>
                  </v-text-field>

                  <!-- Password Field -->
                  <v-text-field
                    id="password"
                    :label="
                      $vuetify.lang.t('$vuetify.security.cols.password.title')
                    "
                    @blur="$v.password.$touch()"
                    @input="$v.password.$touch()"
                    :error-messages="passwordErrors"
                    v-model="password"
                    color="primary"
                    outlined
                    dense
                    class="mb-2"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    autocomplete="current-password"
                    @click:append="show = !show"
                    hide-details="auto"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary">mdi-lock</v-icon>
                    </template>
                  </v-text-field>

                  <!-- Forgot Password Link -->
                  <!-- <div class="text-right mb-4">
                    <router-link
                      :to="{ name: 'reset' }"
                      class="text-decoration-none primary--text font-weight-medium body-2"
                    >
                      {{ $vuetify.lang.t("$vuetify.security.cols.password.title2") }}
                    </router-link>
                  </div> -->

                  <!-- Login Button -->
                  <v-btn
                    color="primary"
                    block
                    large
                    dense
                    elevation="8"
                    type="submit"
                    :disabled="!isFormValid"
                    :loading="loading"
                    class="white--text font-weight-bold text-capitalize rounded-lg"
                  >
                    <v-icon left>mdi-login</v-icon>
                    {{ $vuetify.lang.t("$vuetify.btn.login") }}
                  </v-btn>

                  <!-- Divider -->
                  <v-divider class="my-2"></v-divider>

                  <!-- Additional Actions -->
                  <div class="d-flex justify-space-between align-center">
                    <!-- Language Switcher -->
                    <v-menu offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          color="primary"
                          v-bind="attrs"
                          v-on="on"
                          class="text-capitalize mb-0"
                        >
                          <v-icon left small>mdi-translate</v-icon>
                          {{ $vuetify.lang.current.toUpperCase() }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="setLanguage('fr')">
                          <v-list-item-title>Français</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="setLanguage('en')">
                          <v-list-item-title>English</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>

                    <!-- Help/Support -->
                    <v-btn
                      text
                      color="grey darken-1"
                      class="text-capitalize mb-0"
                      small
                    >
                      <v-icon left small>mdi-help-circle</v-icon>
                      Aide
                    </v-btn>
                  </div>
                </v-card-text>

                <!-- Footer -->
                <v-card-actions
                  class="px-8 pb-6 pt-0"
                  style="margin-top: -20px"
                >
                  <v-spacer></v-spacer>
                  <span class="caption grey--text">
                    © 2026 MATRIIX ERP 2.0
                  </span>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>

              <!-- Additional Info Cards (Optional) -->
              <v-row class="mt-4" no-gutters>
                <v-col cols="12" class="text-center">
                  <v-chip class="ma-2" color="white" text-color="primary" small>
                    <v-icon left small>mdi-shield-check</v-icon>
                    {{ $vuetify.lang.t("$vuetify.security.connexion_secure") }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { minLength, required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  mixins: [FormMixin],
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
      show: false,
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
      const currentLang = this.$vuetify.lang.current;
      const newLang = currentLang === "fr" ? "en" : "fr";
      this.$vuetify.lang.current = newLang;
    },
    setLanguage(lang) {
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

    isFormValid() {
      return this.username !== "" && this.password !== "";
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );
      return errors;
    },
    toggle() {
      const icon = this.show ? "mdi-eye" : "mdi-eye-off";
      const type = this.show ? "text" : "password";
      return { icon, type };
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
.login-main {
  background: primary;
  overflow: hidden;
}

/* Animated Background Pattern */
.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 35px,
    rgba(255, 255, 255, 0.03) 35px,
    rgba(255, 255, 255, 0.03) 70px
  );
  animation: slide 20s linear infinite;
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(70px);
  }
}

/* Main Login Card */
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px !important;
  max-width: 380px;
  margin: auto;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
}

/* Header Section */
.login-header {
  background: linear-gradient(135deg, #4e342e 0%, #6d4c41 100%);
  padding: 30px 15px 20px;
  text-align: center;
  position: relative;
}

.login-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')
    no-repeat bottom;
  background-size: cover;
  opacity: 0.5;
}

/* Form Fields Enhanced */
.v-text-field--outlined >>> fieldset {
  border-color: rgba(0, 0, 0, 0.12);
  transition: border-color 0.3s ease;
}

.v-text-field--outlined:hover >>> fieldset {
  border-color: rgba(0, 0, 0, 0.3);
}

.v-text-field--outlined.v-input--is-focused >>> fieldset {
  border-width: 2px;
}

/* Button Enhancement */
.v-btn {
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.v-btn:not(.v-btn--disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

/* Link Styling */
a {
  position: relative;
  transition: all 0.3s ease;
}

a::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}

/* Responsive Adjustments */
@media (max-width: 600px) {
  .login-header {
    padding: 30px 15px 25px;
  }

  .v-card-text {
    padding: 24px !important;
  }

  .login-card {
    border-radius: 16px !important;
  }
}

/* Dark Theme Support */
.theme--dark .login-card {
  background: rgba(30, 30, 30, 0.95);
}

.theme--dark .login-main {
  background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
}

/* Loading State */
.v-btn--loading {
  pointer-events: none;
}

/* Chip Enhancement */
.v-chip {
  backdrop-filter: blur(10px);
}

/* Avatar Enhancement */
.v-avatar {
  border: 3px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.login-card:hover .v-avatar {
  transform: scale(1.05) rotate(5deg);
}
</style>
