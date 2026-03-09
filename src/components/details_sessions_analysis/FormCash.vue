<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.cash.new.title") }}
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
                    prepend-inner-icon="mdi-code-array"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.cashier"
                    :items="itemsCashier"
                    :loading="isLoadingCashier"
                    :search-input.sync="searchCashier"
                    color="primary"
                    item-text="username"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.cash.cols.cashier_name.title')
                    "
                    prepend-inner-icon="mdi-account-alert"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.cash_fund"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash.cols.cash_fund.title')
                    "
                    prepend-inner-icon="mdi-cash"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.password.title')
                    "
                    prepend-inner-icon="mdi-shield-account"
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
          cash_fund: null,
          open_date: null,
          close_date: null,
          is_active: false,
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
    menu3: false,
    menu4: false,
    menu: false,
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
    searchCashier: null,
  }),
  watch: {
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctors,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDoctors = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchCashier(value) {
      if (value === null) return;
      const params = { username: value, role: "CASHIER" };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlCashier,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsCashier = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

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
        cashier: this.form.cashier,
        is_active: this.form.is_active ? this.form.is_active : true,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash_fund = item.cash_fund;
      this.form.cashier = item.cashier["id"];
      this.itemsCashier.push(item.cashier);
      this.form.open_date = item.open_date;
      this.form.close_date = item.close_date;
      this.form.is_active = item.is_active;
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
