<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="880px"
    transition="dialog-bottom-transition"
  >
    <v-toolbar dark color="white" dense max-width="880px">
      <div class="title" style="color: black">
        {{ $vuetify.lang.t(messages.title) }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon light @click="forceRefresh()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="margin-top: 1px">
      <!--    <div-->
      <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
      <!--      style="height: 30px; margin-top: 30px"-->
      <!--      v-if="this.isActive === 'false'"-->
      <!--    >-->
      <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
      <!--    </div>-->
      <v-card class="pb-1">
        <br />

        <v-form @submit.prevent="saveDetails" :disabled="form.dish === null">
          <br />
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="12"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.recipe.cols.cost.titleT')"
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_amount"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>

        <v-card-text style="margin-top: -35px">
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
            hide-default-footer
          >
            <template v-slot:header.name="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.type_action="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.quantity="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr> </template
            ><template v-slot:header.impact_price="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr> </template
            ><template v-slot:header.total_amount="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>

            <template v-slot:body="{ items }">
              <tbody>
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">
                    {{ item.ingredient ? item.ingredient.name : "-" }}
                  </td>
                  <td class="subtitle-2">
                    <div v-if="editedRowId === item.id">
                      <v-text-field
                        v-model="editedRow.quantity"
                        dense
                        hide-details
                        type="number"
                        style="max-width: 80px"
                      />
                    </div>
                    <div v-else>
                      {{ item.quantity }}
                    </div>
                  </td>

                  <td class="subtitle-2" v-if="item.action">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.ingredient.cols.type_action." + item.action
                      )
                    }}
                  </td>
                  <td class="subtitle-2" v-else>-</td>

                  <!-- Editable Quantity -->
                  <td class="subtitle-2">
                    {{ item.impact_price }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.total_amount }}
                  </td>

                  <!-- Action Buttons -->

                  <!-- <td class="subtitle-2" width="50px">
                      <template>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              @click="editDetails(item)"
                              color="secondary"
                              icon
                              text
                              v-on="on"
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-update</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.edit")
                          }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              @click="deleteItem(item)"
                              color="red"
                              icon
                              text
                              v-on="on"
                              dark
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-delete-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.remove")
                          }}</span>
                        </v-tooltip>
                      </template>
                    </td> -->
                </tr>
              </tbody>
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
      <form-dish :dialog="dialogForm" :messages="messages"></form-dish>
      <!--    <pdf :src="pdfsrc"></pdf>-->
    </div>
  </v-dialog>
</template>

<script>
import FormDish from "./../dish/Form";

// import axios from "axios";c
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
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
          patient: null,
          doctor: null,
          medical_act: null,
          patient_name: null,
          patient_balance: null,
          net_payable: null,
          patient_type: null,
          action: null,
          amount_net: null,
          total_amount: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      action: null,
      net_payable: null,
      amount_net: null,
      total_amount: null,
      quantity: null,
      delivery: null,
      balance: null,
      impact_price: null,
      bills: null,
      reference_no: null,
      additional_info: null,
      bills_amount: null,
      code: null,
    },
    editedRowId: null,
    editedRow: {},
    maxDate: new Date().toISOString().substr(0, 10),
    optionPayment: {
      type_Payment: [],
    },
    optionIngredient: {
      type_action: [],
    },
    optionType: {
      type_accommodation: [],
    },
    pdfsrc: null,
    headers: [],
    headers_act: [],
    items: [],
    meta: {},
    sum: "",
    simple_tva: null,
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 30,
    //itemPerPages: 3,
    itemPerPageOptions: [30, 40, 50],
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
    numberRuleDelivery: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleDeliveryCash: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteOrdered: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";

      if (this.formData.action === "REMOVE") {
        return (
          val <= this.form.quantity_served ||
          `La quantité ne peut pas dépasser ${this.form.quantity_served}`
        );
      }

      return true;
    },
    numberRuleamount_received: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_paid: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulephone_number: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulebank_card_number: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.recipe.delete.success",
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
    loadingPrice: {
      list: false,
      refresh: false,
      filter: false,
    },

    urlIngredient: "ingredients",
    itemsIngredient: [],
    product_public_price: "",
    isLoadingDish: false,
    isLoading: false,
    searchDish: null,
    search: null,
    itemsDish: [],
    urlDish: "dishes",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills_ingredients",
    urlItemsDetails: "details_bills/reload",
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
          url: self.urlIngredient,
          params: params,
        })
        .then((response) => {
          self.itemsIngredient = response.data.content;
          // this.formData.quantity_served = 1;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoading = false));
    },
    searchDish(value) {
      if (value === null) return;
      this.isLoadingDish = true;
      const params = { name: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlDish,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoadingDish = false));
    },
  },
  created() {
    this.setHeaders();
    this.getOptionsIngredient();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    getOptionsIngredient() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_action, (type_action) => {
        self.optionIngredient.type_action.push({
          text: self.$vuetify.lang.t(type_action.text),
          value: type_action.value,
        });
      });
    },
    resetFormPro() {
      this.formData.details_stock = null;
      this.formData.quantity_served = null;
    },
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    forceRefresh() {
      this.items = [];
      this.form.ingredient = null;
      this.form.quantity = null;
      this.form.impact_price = null;
      this.dialog.show = false;
    },
    resetDataForm() {
      this.form.intervention_days = null;
      this.form.medical_areas = null;
      this.form.id = null;
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
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.ingredient.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.recipe.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.ingredient.cols.type_action.title",
          value: "type_action",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.dish.cols.price.title",
          value: "impact_price",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.net_payable.title",
          value: "total_amount",
          align: "start",
          sortable: false,
          width: "100",
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
        //   width: "100",
        // },
      ];
    },
    createDish() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patient.new.title",
        submit: "$vuetify.patient.new.submit",
        success: "$vuetify.patient.new.success",
      };
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataFormdetails() {
      let data = {
        details_bills: this.form.id,
        quantity: this.formData.quantity,
        impact_price: this.formData.impact_price,
        total_amount: this.get_total_amount(),
        action: this.formData.action,
        ingredient: this.formData.ingredient,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.dish = item.dish;
      this.form.quantity = item.quantity;
      this.form.impact_price = item.impact_price;
      this.itemsDish.push(item.dish);
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    getDetailsRoute() {
      if (this.form.id) {
        return this.urlItemsDetails_bills + "?details_bills=" + this.form.id;
      } else {
        return this.urlItemsDetails_bills + "?details_bills=" + this.form.id;
      }
    },
    getMethodDetails() {
      //this.reset = this.form.id === undefined
      return "POST";
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
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
    getHospital() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.tva_collected = data.content[0].VAT_collected;
            resolve(response);
          });
      });
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
            url: self.getDetailsRoute(),
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
    editDetails(item) {
      this.editedRowId = item.id;
      this.editedRow = { ...item }; // clone to prevent direct mutations
    },
    saveRowEdit() {
      // emit or update item in-place or via API
      if (this.editedRow.ingredient) {
        this.editedRow.ingredient = this.editedRow.ingredient["id"];
      }
      if (this.editedRow.details_bills) {
        this.editedRow.details_bills = this.editedRow.details_bills["id"];
      }
      if (this.editedRow.hospital) {
        this.editedRow.hospital = this.editedRow.hospital["id"];
      }
      if (this.editedRow.dish) {
        this.editedRow.dish = this.editedRow.dish["id"];
      }
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails() + "/" + this.editedRow.id,
            method: "PATCH",
            data: this.editedRow,
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      // this.$emit("update-item", this.editedRow); // or call API directly
      const index = this.items.findIndex((i) => i.id === this.editedRow.id);
      if (index !== -1) {
        this.items.splice(index, 1, { ...this.editedRow });
      }
      this.editedRowId = null;
      this.editedRow = {};
    },
    cancelRowEdit() {
      this.editedRowId = null;
      this.editedRow = {};
    },
    saveDetails() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: self.getMethodDetails(),
            data: self.getDataFormdetails(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    reloadDetailsBills() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetails + "?details_bills=" + this.form.id,
            method: "PATCH",
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    get_total_amount() {
      let total = 0; // Ensure the total starts at 0 before the loop

      total = this.formData.quantity * this.formData.impact_price;
      // console.log("hum",total);

      return total;
    },

    setFormData(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.editedRow.pun -
        ((this.editedRow.pun || 0) * (this.editedRow.delivery || 0)) / 100;
    },
    setFormDataAmount(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.editedRow.pun -
        ((this.editedRow.pun || 0) * (this.editedRow.delivery || 0)) / 100;
    },
  },
  computed: {
    calculatedPuNet() {
      return this.editedRow.pun;
    },
    calculatedAmountNet() {
      return (this.editedRow.pun || 0) * (this.editedRow.quantity_served || 0);
    },

    get_bills_amount() {
      let total = 0; // Ensure the total starts at 0 before the loop

      this.items.forEach((d) => {
        total += d.impact_price; // Sum up the amount_net for each item
      });
      // console.log("hum",total);

      return total;
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
  mounted() {
    this.getHospital();
  },
  // mounted() {
  //   window.addEventListener("keydown", function(event) {
  //     if (
  //         (event.metaKey || event.ctrlKey) &&
  //         event.keyCode === "r".charCodeAt(0)
  //     ) {
  //       event.preventDefault();
  //       this.resetFormBills();
  //     }
  //   });
  // },
  components: {
    DeleteItem,
    FormDish,
  },
};
</script>
