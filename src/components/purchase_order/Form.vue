<template>
  <v-dialog v-model="dialog.show" persistent max-width="1100px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <!--        <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])">-->
        <!--          <v-btn-->
        <!--            class="mr-1 my-2"-->
        <!--            color="primary"-->
        <!--            @click="createD()"-->
        <!--            dark-->
        <!--            dense-->
        <!--            small-->
        <!--            style="margin-left: -150px"-->
        <!--          >-->
        <!--            <v-icon dark>-->
        <!--              mdi-plus-->
        <!--            </v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.product.new.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card>
        <br />
        <v-form>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="form.code"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.supplies.cols.code.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.purchase_order.cols.purchase_amount.title'
                    )
                  "
                  prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :value="get_purchase_amount"
                  readonly
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.purchase_order.cols.order_date.title'
                    )
                  "
                  prepend-inner-icon="mdi-calendar mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="form.order_date"
                  readonly
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.suppliers"
                  :items="itemsSuppliers"
                  :loading="isLoadingSuppliers"
                  :search-input.sync="searchSuppliers"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.supplier.title')
                  "
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  autofocus
                  dense
                  clearable
                  :readonly="supply"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0" v-if="this.form.id">
                <v-switch
                  v-model="form.is_received"
                  color="primary"
                  style="margin-top: -1px; margin-right: -25px"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.purchase_order.cols.is_received.title'
                    )
                  "
                  outlined
                  dense
                ></v-switch>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                v-if="this.form.is_received == true"
              >
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  dense
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.date_received"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.purchase_order.cols.date_received.title'
                        )
                      "
                      prepend-inner-icon="mdi-clock-start"
                      class="font-weight-bold"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date_received"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                v-if="this.form.is_received == true"
              >
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.purchase_order.cols.delivery_number.title'
                    )
                  "
                  prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="form.delivery_number"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                style="margin-top: -15px"
                v-if="this.$route.params.idD === 'laboratory'"
              >
                <v-select
                  v-model="formData.type_product"
                  color="primary"
                  :items="optionType.type_product"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.type_product.title')
                  "
                  :placeholder="
                    $vuetify.lang.t('$vuetify.supplies.cols.type_product.title')
                  "
                  prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t(
                        "$vuetify.supplies.cols.type_product.title"
                      )
                    }}
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -10px"></v-divider>
        </v-form>
        <v-form @submit.prevent="saveDetails" style="margin-top: 10px">
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="this.$route.params.idD === 'pharmacy'"
              >
                <v-autocomplete
                  v-model="formData.product"
                  :items="itemsProduct"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="
                  this.$route.params.idD === 'laboratory' &&
                  this.formData.type_product === 'REAGENT'
                "
              >
                <v-autocomplete
                  v-model="formData.reagent"
                  :items="itemsReagent"
                  :loading="isLoadingReagent"
                  :search-input.sync="searchReagent"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$vuetify.lang.t('$vuetify.reagent.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                v-if="
                  this.$route.params.idD === 'laboratory' &&
                  this.formData.type_product === 'CONSUMABLE'
                "
              >
                <v-autocomplete
                  v-model="formData.consumable"
                  :items="itemsConsumable"
                  :loading="isLoadingConsumable"
                  :search-input.sync="searchConsumable"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="$vuetify.lang.t('$vuetify.consumable.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="1"
                class="mb-0 py-0"
                v-if="this.$route.params.idD === 'pharmacy'"
              >
                <v-btn
                  class="mx-2"
                  dark
                  dense
                  @click="createD()"
                  color="primary"
                  max-width="2px"
                  v-if="
                    _.includes(this.$auth.user().permissions, 'add_product')
                  "
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-col> -->
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="get_product_code"
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.quantity"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.quantity.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :readonly="this.form.id !== null"
                  :rules="[numberRule]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.arrival_price.title'
                    ) +
                    ' : ' +
                    get_product_price
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRuleArrivalPrice]"
                  v-model="formData.arrival_price"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="get_total_amount"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.total_amount.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_total_amount"
                  dense
                  readonly
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="1" class="mb-0 py-0">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <template>
                      <v-btn
                        color="primary"
                        :loading="loadingBtn"
                        dark
                        type="submit"
                        dense
                        v-on="on"
                        max-width="2px"
                        style="margin-top: 3px"
                        :disabled="form.suppliers === null"
                      >
                        <v-icon dark> mdi-content-save </v-icon>
                        <!--{{ $vuetify.lang.t(messages.submit) }}-->
                      </v-btn>
                    </template>
                  </template>
                  <span
                    class="text-center font-weight-bold body-2 withe--text text--d ken-1"
                  >
                    {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading.refresh"
              @click="refreshItemsDetail()"
              class="mr-2"
              style="margin-top: -30px"
              depressed
              color="#f1f5fc"
            >
              <v-icon left color="primary">mdi-refresh</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
            </v-btn>
            <v-btn
              color="primary"
              @click="save_print_bills()"
              class="mr-2"
              dark
              :loading="loadingBtn"
              style="margin-top: -30px"
              :disabled="form.suppliers === null || get_purchase_amount === 0"
            >
              <v-icon> mdi-content-save </v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.save") }}
            </v-btn>
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
            <template v-slot:header.product_name="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.product_code="{ header }">
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
              </tr>
            </template>
            <template v-slot:header.arrival_price="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.total_amount="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.null="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:body="{ items }">
              <v-hover>
                <tbody slot-scope="{ hover }">
                  <tr :key="item.id" v-for="item in items">
                    <td class="subtitle-2">
                      {{
                        item.product
                          ? item.product.name
                          : item.reagent
                          ? item.reagent.name
                          : item.consumable
                          ? item.consumable.name
                          : "-"
                      }}
                    </td>
                    <td class="subtitle-2">
                      {{
                        item.product
                          ? item.product.code
                          : item.reagent
                          ? item.reagent.code
                          : item.consumable
                          ? item.consumable.code
                          : "-"
                      }}
                    </td>

                    <td class="subtitle-2">
                      {{ item.quantity }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.arrival_price }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.total_amount }}
                    </td>
                    <td class="subtitle-2" width="50px">
                      <template>
                        <v-tooltip bottom>
                          <template
                            v-slot:activator="{ on }"
                            v-if="
                              _.includes(
                                $auth.user().permissions,
                                'change_detailspurchase_order'
                              )
                            "
                          >
                            <v-btn
                              @click="editDetails(item)"
                              color="secondary"
                              icon
                              text
                              v-on="on"
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon>mdi-grease-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.edit")
                          }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template
                            v-slot:activator="{ on }"
                            v-if="
                              _.includes(
                                $auth.user().permissions,
                                'delete_detailspurchase_order'
                              )
                            "
                          >
                            <v-btn
                              @click="deleteItem(item)"
                              color="red"
                              icon
                              text
                              v-on="on"
                              dark
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon>mdi-delete-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.remove")
                          }}</span>
                        </v-tooltip>
                      </template>
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
          <form-details
            :dialog="dialogFormDetails"
            :form="form"
            :messages="messages"
            @getItems="getItemsDetails"
            ref="detailsForm"
          ></form-details>
        </v-card-text>
      </v-card>
      <form-product :dialog="dialogForm" :messages="messages"></form-product>
      <form-suppliers
        :dialog="dialogFormSupplies"
        :messages="messages"
      ></form-suppliers>
    </v-card>
  </v-dialog>
</template>

<script>
import FormDetails from "./FormProductUpdate";
import FormProduct from "./../product/Form";
import FormSuppliers from "./../suppliers/Form";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
const FileSaver = require("file-saver");
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
          supplies: null,
          total_amount: null,
          quantity: null,
          product: null,
          arrival_price: null,
          order_date: null,
          suppliers: null,
          purchase_order: null,
          is_received: null,
          date_received: new Date().toISOString().substr(0, 10),
          delivery_number: null,
          code: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      id: null,
      supplies: null,
      total_amount: null,
      quantity: null,
      product: null,
      type_product: null,
      consumable: null,
      reagent: null,
      arrival_price: null,
      arrival_date: null,
      suppliers: null,
      purchase_order: null,
      is_received: null,
      code: null,
    },
    isInventory: false,
    urlItemsNonePurchase: "details_purchase_orders/nonePurchase",
    headers: [],
    items: [],
    numberRule: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleArrivalPrice: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
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
    dialogFormSupplies: {
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
      success: "$vuetify.purchase.delete.success",
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

    itemsProduct: [],
    isLoading: false,
    search: null,
    optionType: {
      type_product: [],
    },
    urlProduct: "products",
    urlSuppliers: "suppliers",
    itemsSuppliers: [],
    searchSuppliers: null,
    isLoadingSuppliers: false,
    urlReagent: "reagents",
    itemsReagent: [],
    searchReagent: null,
    isLoadingReagent: false,
    urlConsumable: "consumables",
    itemsConsumable: [],
    searchConsumable: null,
    isLoadingConsumable: false,
    urlItems: "purchase_orders",
    urlItemsDetails_purchase: "details_purchase_orders",
  }),
  watch: {
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
        })
        .finally(() => (this.isLoading = false));
    },
    searchReagent(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingReagent = true;
      this.$store
        .dispatch("request", {
          url: self.urlReagent,
          params: params,
        })
        .then((response) => {
          self.itemsReagent = response.data.content;
        })
        .finally(() => (this.isLoadingReagent = false));
    },
    searchConsumable(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingConsumable = true;
      this.$store
        .dispatch("request", {
          url: self.urlConsumable,
          params: params,
        })
        .then((response) => {
          self.itemsConsumable = response.data.content;
        })
        .finally(() => (this.isLoadingConsumable = false));
    },
    searchSuppliers(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingSuppliers = true;
      this.$store
        .dispatch("request", {
          url: self.urlSuppliers,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsSuppliers = response.data.content;
        })
        .finally(() => (this.isLoadingSuppliers = false));
    },
  },
  created() {
    this.setHeaders();
    this.getOptionsType();
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
            let fileName =
              "Bon_commande_" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
            FileSaver.saveAs(blob, fileName);
            // const dataUrl = window.URL.createObjectURL(blob);
            //
            // // Open the window
            // const pdfWindow = window.open(dataUrl);
            //
            // // Call print on it
            // pdfWindow.print();
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
    getOptionsType() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_product, (type_product) => {
        self.optionType.type_product.push({
          text: self.$vuetify.lang.t(type_product.text),
          value: type_product.value,
        });
      });
    },
    getNonePurchase() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsNonePurchase,
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_purchase + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.supplies.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "140",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.supplies.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.arrival_price.title",
          value: "arrival_price",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: false,
          width: "50",
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
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "70",
        },
      ];
    },
    createD() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.product.new.title",
        submit: "$vuetify.product.new.submit",
        success: "$vuetify.product.new.success",
      };
    },
    createS() {
      this.dialogFormSupplies.show = true;
      this.messages = {
        title: "$vuetify.suppliers.new.title",
        submit: "$vuetify.suppliers.new.submit",
        success: "$vuetify.suppliers.new.success",
      };
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        suppliers: this.form.suppliers,
        date_received: this.form.date_received,
        delivery_number: this.form.delivery_number,
        type_order: this.$route.params.idD,
        is_received: this.form.is_received ? this.form.is_received : false,
        purchase_amount: this.get_purchase_amount,
      };
      return data;
    },
    resetDataFormProduct() {
      this.formData.product = null;
      this.formData.quantity = null;
      this.formData.arrival_price = null;
      this.formData.total_amount = null;
    },
    resetDataForm() {
      this.form.product = null;
      this.form.id = null;
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
      this.resetItemsDetails();
    },

    getDataFormdetails() {
      let data = {
        type_product: this.formData.type_product,
        product: this.formData.product
          ? this.formData.product["id"]
          : this.formData.product,
        total_amount: this.get_total_amount,
        quantity: this.formData.quantity,
        consumable: this.formData.consumable
          ? this.formData.consumable["id"]
          : this.formData.consumable,
        reagent: this.formData.reagent
          ? this.formData.reagent["id"]
          : this.formData.reagent,
        arrival_price: this.formData.arrival_price
          ? this.formData.arrival_price
          : this.get_product_price,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.is_received = item.is_received;
      this.form.date_received = item.date_received;
      this.form.delivery_number = item.delivery_number;
      this.form.purchase_order = item.id;
      this.getItemsDetails();
      this.form.arrival_date = item.createdAt + " " + item.timeAt;
      this.form.purchase_amount = item.purchase_amount;
      this.form.additional_info = item.additional_info;
      this.form.code = item.code;
      this.form.order_date = item.createdAt;
      this.form.suppliers = item.suppliers["id"];
      this.itemsSuppliers.push(item.suppliers);
      this.form.consumable = item.consumable["id"];
      this.itemsConsumable.push(item.consumable);
      this.form.reagent = item.reagent["id"];
      this.itemsReagent.push(item.reagent);
      this.form.type_product = item.type_product;

      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_purchase + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_purchase;
      }
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
              self.urlItemsDetails_purchase +
              "/all" +
              "?purchase_order=" +
              this.form.purchase_order,
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
    resetItemsDetails() {
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
            url: self.urlItemsDetails_purchase + "?supplies=reset",
            params: params,
          })
          .then((response) => {
            let data = response.data;
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
      this.formData.product = item.product;
      this.formData.quantity = this.form.id === null ? item.quantity : 0;
      this.formData.arrival_price = item.arrival_price;
    },
    saveDetails() {
      console.log(this.getDataFormdetails());
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
            method: self.getMethod(),
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
  },
  computed: {
    get_product_code() {
      let product_code = "";
      product_code =
        this.formData.product === null ? "" : this.formData.product?.code;
      return product_code;
    },
    get_product_price() {
      let product_price = "";
      product_price = this.formData.product
        ? this.formData.product.purchase_price
        : this.formData.reagent
        ? this.formData.reagent.purchase_price
        : this.formData.consumable
        ? this.formData.consumable.purchase_price
        : this.formData.consumable;
      return product_price;
    },
    get_purchase_amount() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.total_amount;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_total_amount() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.formData.quantity) {
        if (this.formData.arrival_price) {
          return this.formData.quantity * this.formData.arrival_price;
        } else {
          return this.formData.quantity * this.get_product_price;
        }
      } else if (this.formData.total_amount != null) {
        return this.formData.total_amount;
      } else {
        return 0;
      }
    },
    // get_storage_depot() {
    //   if (this.form.arrival_date) {
    //     const today = new Date();
    //     const date_year = today.getFullYear();
    //     return (
    //       date_year - moment(String(this.form.arrival_date)).format("YYYY")
    //     );
    //   } else {
    //     return 0;
    //   }
    // },
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
    product_codeErrors() {
      let errors = [];
      if (!this.$v.form.product_code.$dirty) return errors;

      // !this.$v.form.product_code.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.required")
      //   );

      !this.$v.form.product_code.product_code &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.invalid")
        );

      !this.$v.form.product_code.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.unique")
        );
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
    this.getNonePurchase();
  },
  components: {
    DeleteItem,
    FormProduct,
    FormSuppliers,
    FormDetails,
  },
};
</script>
