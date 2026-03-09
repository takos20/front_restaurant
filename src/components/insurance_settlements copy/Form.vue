<template>
  <v-dialog v-model="dialog.show" persistent max-width="950px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form>
        <v-card-text max-width="1500px">
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="form.code"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.code.title'
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
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-menu
                  v-model="menu3"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.date"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.patients_settlements.cols.date.title'
                        )
                      "
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      class="font-weight-bold"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <!--                  <v-date-picker-->
                  <!--                    v-model="form.date"-->
                  <!--                    :max="maxDate"-->
                  <!--                    color="primary"-->
                  <!--                    @input="menu3 = false"-->
                  <!--                  ></v-date-picker>-->
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-select
                  v-model="form.payment_method"
                  color="primary"
                  :items="optionPayment.type_Payment"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                  "
                  prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="form.payment === 0"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="$auth.user().username"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.cashier.title'
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
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.code_patient.title')
                  "
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="get_patient_code"
                  filled
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.patient"
                  :items="itemsPatient"
                  :loading="isLoadingPatient"
                  :search-input.sync="searchPatient"
                  return-object
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.patient_name.title'
                    )
                  "
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                  @change="getItemsDetails()"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  v-model="get_total_insurance"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.patient_balance.title'
                    )
                  "
                  prepend-inner-icon="mdi-scale-balance mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  suffix="FCFA"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  v-model="form.payment"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.payment.title'
                    )
                  "
                  prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  suffix="FCFA"
                  type="number"
                  min="0"
                  :rules="[numberRule]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :value="get_advances"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.sum_remaining.title'
                    )
                  "
                  prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  suffix="FCFA"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="get_refund"
                  :value="get_refund"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.refund.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  disabled
                  min="0"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.wordings"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patients_settlements.cols.wordings.title'
                    )
                  "
                  prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="supply"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-card-actions style="margin-top: -30px">
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="primary"
            @click="save()"
            :loading="loadingBtn"
            :disabled="
              this.form.payment === 0 || this.form.payment_method === null
            "
          >
            {{ $vuetify.lang.t("$vuetify.btn.save") }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="loadingBtn"
            dark
            @click="save_print_bills()"
            :disabled="
              this.form.payment === 0 || this.form.payment_method === null
            "
          >
            {{ $vuetify.lang.t("$vuetify.bills.new.save_print") }}
          </v-btn>
          <!--          <v-btn-->
          <!--            color="primary"-->
          <!--            :loading="loadingBtn"-->
          <!--            dark-->
          <!--            @click="print_bills()"-->
          <!--            :disabled="this.get_bills_amount === 0"-->
          <!--          >-->
          <!--            {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}-->
          <!--          </v-btn>-->
        </v-card-actions>
        <v-divider class="mx-4"></v-divider>
      </v-form>
      <v-card-text>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headers"
          :items="items"
          :items-per-page="itemPerPage"
          :loading="loadingDetails.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.bill_N="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.arrival_date="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.bill_type="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.date_bill="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.net_payable="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.insurance="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <!--            <template v-slot:header.null="{ header }">-->
          <!--              <tr>-->
          <!--                {{-->
          <!--                  $vuetify.lang.t(header.text)-->
          <!--                }}-->
          <!--              </tr>-->
          <!--            </template>-->
          <template v-slot:body="{ items }">
            <v-hover>
              <tbody>
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">{{ item.code }}</td>
                  <td class="subtitle-2">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.bill_type." + item.bill_type
                      )
                    }}
                  </td>
                  <td class="subtitle-2">
                    {{ $moment(item.bills_date).format("YYYY-MM-DD") }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.net_payable }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.insurance }}
                  </td>
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItemsDetails="getItemsDetails"
        ></delete-item>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          patient: null,
          patient_name: null,
          payment_method: "CASH",
          patient_balance: null,
          refund: null,
          payment: 0,
          date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10),
          wordings: null,
          sum_remaining: null,
          code: null,
          bills: null,
          cashier: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      id: null,
      name: null,
      coefficient: null,
      number_account: null,
      quote_internal: null,
      quote_external: null,
    },
    numberRule: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    optionPayment: {
      type_Payment: [],
    },
    headers: [],
    items: [],
    meta: {},
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
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
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    isLoadingPatient: false,
    isLoading: false,
    search: null,
    searchPatient: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDetails: {
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
    itemsPatient: [],
    urlPatient: "patients/allPatients",
    urlItems: "insurance_settlements",
    urlItemsDetails_patients_settlements:
      "insurance_settlements/details_insurance_settlements",
  }),
  watch: {
    pagination: {
      // handler() {
      //   this.getItemsDetails();
      // },
      deep: true,
    },
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoading = false));
    },
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingPatient = true;
      this.$store
        .dispatch("request", {
          url: self.urlPatient,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
  },
  created() {
    this.setHeaders();
    this.getOptionsPayment();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
            // FileSaver.saveAs(blob, fileName);
            const dataUrl = window.URL.createObjectURL(blob);
            // Open the window
            const pdfWindow = window.open(dataUrl);

            // Call print on it
            pdfWindow.print();
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
    getOptionsPayment() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.payment, (type_Payment) => {
        self.optionPayment.type_Payment.push({
          text: self.$vuetify.lang.t(type_Payment.text),
          value: type_Payment.value,
        });
      });
    },
    editBills(item) {
      this.form.patient_balance = item.balance;
      this.form.net_payable = item.net_payable;
      this.form.bills = item.id;
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    deleteItem(item) {
      this.urlDeleteItems =
        this.urlItemsDetails_patients_settlements + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.bill_N.title",
          value: "bill_N",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.bill_type.title",
          value: "bill_type",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.date_bill.title",
          value: "date_bill",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.net_payable.title",
          value: "net_payable",
          align: "start",
          sortable: false,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.title",
          value: "insurance",
          align: "start",
          sortable: false,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.supplies.cols.actions.title",
        //   value: null,
        //   align: "start",
        //   sortable: false,
        //   width: "20"
        // }
      ];
    },

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient_balance: this.get_advances,
        payment: this.form.payment,
        payment_method: this.form.payment_method,
        date: this.form.date,
        wordings: this.form.wordings,
        bills: this.form.bills,
        patient: this.form.patient["id"],
        cashier: this.$auth.user().id,
        refund: this.get_refund,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.patient = item.id;
      this.form.payment = item.payment;
      this.form.wordings = item.wordings;
      this.form.payment_method = item.payment_method;
      this.form.date = item.date;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      // console.log("cul", this.form.supplies);
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    refreshItemsDetail() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
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
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.resetDataForm();
            self.$emit("getItems");
            this.form.patients_settlements = response.data["id"];

            // this.form.code = response.data["code"];
            // console.log(this.form.id_supplies);
            this.supply = true;
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
    resetDataForm() {
      this.items = [];
      this.form.patient = null;
      this.form.payment = 0;
      this.form.wordings = null;
    },
    getItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_patients_settlements +
              "?patient=" +
              this.form.patient["id"],
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data;
            self.meta = { totalElements: data.totalElements };
            resolve(response);
          })
          .catch((err) => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                const fields = err.response.data;
                self.setFormErrors(fields);

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message,
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
  },
  computed: {
    get_total_insurance() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.insurance;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_patient_code() {
      let patient_code = "";
      patient_code = this.form.patient === null ? "" : this.form.patient?.code;
      return patient_code;
    },
    get_advances() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.payment === undefined) {
        return 0;
      } else {
        let balances;
        balances = this.get_total_insurance - this.form.payment;
        if (balances < 0) {
          balances = 0;
        }
        return balances;
      }
    },
    get_refund() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.payment === undefined) {
        return this.get_bills_amount_net;
      } else {
        let refund = "";
        refund = this.form.payment - this.get_total_insurance;
        if (refund < 0) {
          refund = 0;
        }
        return refund;
      }
    },
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
  components: {
    DeleteItem,
  },
};
</script>
