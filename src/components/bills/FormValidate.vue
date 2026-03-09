<template>
  <v-dialog v-model="dialog.show" max-width="680px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          <!-- {{ $vuetify.lang.t(messages.title) }} -->
        </div>
        <!--        <v-spacer></v-spacer>-->
        <!--        <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])">-->
        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            color="#4E342E"-->
        <!--            @click="createD()"-->
        <!--            dark-->
        <!--            dense-->
        <!--            small-->
        <!--          >-->
        <!--            <v-icon dark>-->
        <!--              mdi-plus-->
        <!--            </v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.bills.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <!-- <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </v-toolbar>

      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="savePermission">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.username.title')
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.password.title')
                    "
                    prepend-inner-icon="mdi-shield-account mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="password"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeModals">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t("$vuetify.btn.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { required } from "vuelidate/lib/validators";
// import {mapGetters} from "vuex";
// import {
//   required,
//   maxLength,
//   minLength,
// } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          username: null,
          password: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    is_active: true,
    isLoading: false,
    urlItems: "bills/verify_permission",
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
        password: {
          required,
        },
        // wording: {
        //   required,
        //   maxLength: maxLength(10),
        //   minLength: minLength(3),
        // }
      },
    };
    return validators;
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
    },
    closeModals() {
      this.dialog.show = false;
      console.log("dialog");
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        password: this.form.password,
        username: this.form.username,
      };
      return data;
    },
    //     save() {
    //   let self = this;
    //   let badCredential = this.$vuetify.lang.t(
    //     "$vuetify.security.form.bad_credentials"
    //   );
    //   self.$v.$touch();
    //   if (!self.$v.$invalid) {
    //     this.loading = true;
    //     const credentials = {
    //       password: this.form.password,
    //       username: this.form.username,
    //     };

    //     this.$store
    //       .dispatch("request", {
    //         url: this.urlItems ,
    //         method: 'POST',
    //         data: credentials,
    //       })
    //       .then(() => {
    //         console.log("user");
    //       })
    //       .catch((error) => {
    //         if (error.response.status === 401) {
    //           const datas = error.response.data.detail;
    //           //console.log("datas", datas);
    //           self.errors["username"] = datas;
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: datas,
    //             color: "#B71C1C",
    //           });
    //           //self.$forceUpdate();
    //           //console.log("eerreur");
    //         } else {
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: badCredential,
    //             color: "#B71C1C",
    //           });
    //         }
    //         self.loading = false;
    //       })
    //       .finally(() => {
    //         self.loading = false;
    //       });
    //   }
    // },
  },
  computed: {
    // Gestion des erreurs du formulaire
    usernameErrors() {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      !this.$v.form.username.required &&
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
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
