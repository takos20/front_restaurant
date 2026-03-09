<template>
  <div>
    <div
      class="title mb-5 black--text blue lighten-5 text-right"
      style="height: 30px; margin-top: 30px"
    >
      {{ $vuetify.lang.t("$vuetify.menu.settings_account") }}
    </div>

    <v-card class="mx-auto my-12" max-width="680px">
      <!--<v-toolbar color="#F8F8FF">-->
      <!--<v-toolbar-title>{{-->
      <!--$vuetify.lang.t("$vuetify.menu.settings_account")-->
      <!--}}</v-toolbar-title>-->
      <!--</v-toolbar>-->
      <v-col cols="12" class="mb-0 py-0">
        <v-card-text> </v-card-text>
        <v-tabs horizontal centered dense>
          <v-tab>
            <v-icon left> mdi-account </v-icon>
            {{ $vuetify.lang.t("$vuetify.security.profile2") }}
          </v-tab>
          <v-tab>
            <v-icon left> mdi-lock </v-icon>
            {{ $vuetify.lang.t("$vuetify.security.password2") }}
          </v-tab>

          <v-tab-item>
            <update-profile></update-profile>
          </v-tab-item>
          <v-tab-item>
            <change-password></change-password>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-card>
  </div>
</template>

<script>
import ChangePassword from "./ChangePassword.vue";
import UpdateProfile from "./form.vue";
import { requiredIf, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    tab: null,
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          password: null,
          re_password: null,
          username: null,
        };
      },
    },
  }),
  validations() {
    let validators = {
      form: {
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
    home() {
      this.$router.push({
        name: "home",
      });
    },
  },
  components: {
    ChangePassword,
    UpdateProfile,
  },
};
</script>
