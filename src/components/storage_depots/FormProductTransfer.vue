<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="780px"
    transition="dialog-bottom-transition"
  >
    <v-card class="pb-4" v-if="this.isActive === 'true'">
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-toolbar>
      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.storage_depots"
                :items="itemsDepot"
                :loading="isLoadingDepot"
                :search-input.sync="searchDepot"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.storage_depot.title')
                "
                prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
                :readonly="supply"
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="mb-0 py-0"
              v-if="this.form.bill_type === 'pharmacy'"
            >
              <v-autocomplete
                v-model="formData.details_stock"
                :items="itemsProduct"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="product_name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
                style="max-width: 250px"
                :readonly="form.storage_depots === null"
                v-if="this.form.bill_type === 'pharmacy'"
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="mb-0 py-0"
              v-if="this.form.bill_type === 'pharmacy'"
            >
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                style="max-width: 180px"
                :value="get_product_code"
                readonly
                filled
                v-if="this.form.bill_type === 'pharmacy'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
      </v-form>
    </v-card>
  </v-dialog>
  <!--    <pdf :src="pdfsrc"></pdf>-->
</template>

<script>
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
// const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          details_stock: null,
          details_stock2: null,
          product: null,
          product2: null,
          storage_depots: null,
          storage_depots2: null,
        };
      },
    },
  },
  data: () => ({
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},

    isLoadingDepot: false,
    isLoadingDepot2: false,
    isLoading: false,
    isLoading2: false,
    search: null,
    search2: null,
    searchDepot: null,
    searchDepot2: null,
    numberRuleDelivery: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteOrdered: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    isActive: null,
    menu2: false,
    supply: false,
    active: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    itemsDepot: [],
    itemsDepot2: [],
    itemsProduct: [],
    itemsProduct2: [],
    urlDepot: "storage_depots",
    product_public_price: "",
    urlProduct: "details_stocks/all",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsDetails();
      },
      deep: true,
    },

    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct + "?storage_depots=" + this.form.storage_depots,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    search2(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading2 = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct + "?storage_depots=" + this.form.storage_depots2,
          params: params,
        })
        .then((response) => {
          self.itemsProduct2 = response.data.content;
        })
        .finally(() => (this.isLoading2 = false));
    },
    searchDepot(value) {
      if (value === null) return;
      const params = { name: value, default_depot: true };
      let self = this;
      this.isLoadingDepot = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot = response.data.content;
        })
        .finally(() => (this.isLoadingDepot = false));
    },
    searchDepot2(value) {
      if (value === null) return;
      const params = { name: value, default_depot: true };
      let self = this;
      this.isLoadingDepot2 = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot2 = response.data.content;
        })
        .finally(() => (this.isLoadingDepot2 = false));
    },
  },
  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    get_qte_stock() {
      if (
        this.formData.details_stock?.qte_stock === 0 ||
        this.formData.quantity_served > this.formData.details_stock?.qte_stock
      ) {
        this.dialogFormWarning.show = true;
      } else {
        this.dialogFormWarning.show = false;
      }
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        doctor:
          this.form.id === null ? this.form.doctor["id"] : this.form.doctor,
        patient:
          this.form.id === null ? this.form.patient["id"] : this.form.patient,
        cashier: this.$auth.user().id,
        patient_type: this.form.patient_type,
        createdAt: this.form.bills_date,
        bill_type: this.form.bill_type,
        bill_shape: this.form.bill_shape,
        additional_info: this.form.additional_info,
        storage_depots: this.form.storage_depots,
        payment_method:
          this.form.advances === 0 ? "NO_PAY" : this.form.payment_method,
        net_payable: this.get_bills_amount,
        advances: this.form.advances === null ? 0 : this.form.advances,
        balance: this.get_balance,
      };
      return data;
    },
    resetDataForm() {
      this.form.id = null;
      this.formData.details_stock = null;
      this.form.patient = null;
      this.patient_solde == null;
      this.form.medical_act = null;
      this.form.doctor = null;
      this.items = [];
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
      this.form.bills_date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.resetItemsDetails();
      this.form.bill_type = "pharmacy";
      this.form.bill_shape = "CLASSIC";
      this.form.additional_info = "R.A.S";
      this.form.payment_method = "NO_PAY";
      this.patient_solde == null;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.code = item.code;
      this.form.storage_depots = item.storage_depots["id"];
      this.itemsDepot.push(item.storage_depots);
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.patient_name = item.patient["name"];
      this.form.patient_type = item.patient["shape"];
      this.form.is_accounted = item.is_accounted;
      this.form.details_stock = item.details_stock;
      this.form.advances = item.advances;
      this.form.bills_date = item.createdAt;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      this.form.bill_shape = item.bill_shape;
      this.form.additional_info = item.additional_info;
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
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
            } else {
              self.$emit("getItems");
              self.resetDataForm();
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
  },
  computed: {
    get_product_code() {
      let product_code = "";
      product_code =
        this.form.details_stock === null ||
        this.form.details_stock === undefined
          ? ""
          : this.form.details_stock?.product.code;
      let product_stock = "";
      product_stock =
        this.form.details_stock === null ||
        this.form.details_stock === undefined
          ? ""
          : this.form.details_stock?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      return code_stock;
    },
    get_product_code2() {
      let product_code = "";
      product_code =
        this.form.details_stock2 === null ||
        this.form.details_stock2 === undefined
          ? ""
          : this.form.details_stock2?.product.code;
      let product_stock = "";
      product_stock =
        this.form.details_stock2 === null ||
        this.form.details_stock2 === undefined
          ? ""
          : this.form.details_stock2?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      return code_stock;
    },

    // Gestion des erreurs du formulaire

    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.total_amount.required")
        );
      return errors;
    },
  },
  mounted() {},
  components: {},
};
</script>
