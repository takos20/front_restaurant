<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.nature_code.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" class="mb-0 py-0"></v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    :value="$auth.user().username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash.cols.cashier_name.title')
                    "
                    prepend-inner-icon="mdi-account-alert mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.cash_fund"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash.cols.cash_fund.title')
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
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
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
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
          code: null,
          cashier: null,
          password: null,
          type_cash: null,
          cash_fund: null,
          open_date: null,
          close_date: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    isLoadingD: false,
    isLoadingCashier: false,
    search: null,
    menu2: false,
    is_active: true,
    menu3: false,
    menu4: false,
    menu: false,
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    formData: {
      id: null,
      name: null,
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    // formR: {
    //   id: null,
    //   name: null
    // },
    loading: false,
    optionRole: {
      type_Role: [],
    },
    optionRoleR: {
      type_RoleR: [],
    },
    urlItems: "cashs",
    urlDoctors: "doctors",
    urlCashier: "users",
    types: {
      role: [],
    },
    itemsRoles: [],
    itemsDoctors: [],
    itemsCashier: [],
  }),
  watch: {},

  created() {
    this.getOptionsRoleR();
    this.getOptionsRole();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        // session: {
        //   required,
        //   maxLength: maxLength(100)
        // },
        // cash_fund: {
        //   required,
        //   maxLength: maxLength(100)
        // },
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
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
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
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
              this.dialog.show = false;
            } else {
              self.$emit("getItems");
              self.resetDataForm();
              this.dialog.show = false;
            }
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
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store
    getOptionsRole() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.roles, (type_Role) => {
        self.optionRole.type_Role.push({
          text: self.$vuetify.lang.t(type_Role.text),
          value: type_Role.value,
        });
      });
    },
    getOptionsRoleR() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.rolesR, (type_RoleR) => {
        self.optionRoleR.type_RoleR.push({
          text: self.$vuetify.lang.t(type_RoleR.text),
          value: type_RoleR.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        password: this.form.password,
        cash_fund: this.form.cash_fund,
        type_cash: "CASH_COUNTERS",
        open_date: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        cashier: this.$auth.user().id,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash_fund = item.cash_fund;
      this.form.type_cash = item.type_cash;
      this.form.open_date = item.open_date;
      this.form.close_date = item.close_date;
      this.is_active = item.is_active;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    wordingErrors() {
      let errors = [];
      if (!this.$v.form.wording.$dirty) return errors;

      !this.$v.form.wording.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.cash.cols.wording.required")
        );

      !this.$v.form.wording.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash.cols.wording.minLength",
            this.$v.form.wording.$params.minLength.min
          )
        );

      !this.$v.form.wording.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash.cols.wording.maxLength",
            this.$v.form.wording.$params.maxLength.max
          )
        );
      !this.$v.form.wording.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.cash.cols.wording.unique"));
      return errors;
    },
  },
  components: {},
};
</script>
