<template>
  <div>
    <div
      v-if="_.includes(this.$auth.user().permissions, 'view_items_movements')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <template>
            <v-form>
              <v-row wrap>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-menu
                    v-model="menu"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.start_date"
                        color="primary"
                        class="font-weight-bold my-2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.item_movements.cols.period_of.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formData.start_date"
                      :max="maxDate"
                      color="primary"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-menu
                    v-model="menu2"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.end_date"
                        color="primary"
                        class="font-weight-bold my-2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.item_movements.cols.period_of.title2'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="formData.end_date"
                      :min="getMinStartDate"
                      :max="maxDate"
                      color="primary"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="formData.product"
                    :items="itemsProduct"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    return-object
                    item-text="product_name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.supplies.cols.product_name.title'
                      )
                    "
                    class="font-weight-bold my-2"
                    outlined
                    dense
                    clearable
                    @change="getItemBills"
                  ></v-autocomplete>
                </v-col>
                <!--                <v-col cols="12" sm="1" class="mb-0 py-0">-->
                <!--                <v-chip-->
                <!--                  class="subtitle-1 font-weight-bold my-3"-->
                <!--                  text-color="black"-->
                <!--                  color="#f1f5fc"-->
                <!--                  medium-->
                <!--                  label-->
                <!--                >-->
                <!--                  {{-->
                <!--                    $vuetify.lang.t(-->
                <!--                      "$vuetify.item_movements.cols.period_of.title"-->
                <!--                    )-->
                <!--                  }}-->
                <!--                  :-->
                <!--                  &lt;!&ndash;{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}&ndash;&gt;-->
                <!--                </v-chip>-->
                <!--                </v-col>-->

                <!--                <v-col cols="12" sm="2" class="mb-0 py-0">-->
                <!--                  <v-select-->
                <!--                      v-model="formData.optionExport"-->
                <!--                      color="primary"-->
                <!--                      :items="optionsExport.type_Export"-->
                <!--                      prepend-inner-icon="mdi-file mdi-dark mdi-18px"-->
                <!--                      class="font-weight-bold my-2"-->
                <!--                      outlined-->
                <!--                      dense-->
                <!--                      :disabled="-->
                <!--                      formData.product === null ||-->
                <!--                        formData.start_date === null ||-->
                <!--                        formData.end_date === null-->
                <!--                    "-->
                <!--                  ></v-select>-->
                <!--                </v-col>-->
                <v-col cols="12" sm="1" class="mb-0 py-0"
                  ><v-btn
                    class="font-weight-bold my-2 white--text"
                    @click="exportItemMovement()"
                    color="teal darken-1"
                    light
                    :loading="loadingBtn"
                    :disabled="
                      formData.product === null ||
                      formData.start_date === null ||
                      formData.end_date === null
                    "
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.item_movements.cols.period_of.title4"
                      )
                    }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </template>
          <v-spacer></v-spacer>
        </div>
      </v-card>

      <v-card class="pb-4">
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersItemBills"
          :items="itemsItemBills"
          :items-per-page="itemPerPage"
          :loading="loadingItemBills.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.type_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.date_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.stock_initial="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.quantity_used="{ header }">
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

          <template v-slot:body="{ items }">
            <v-hover>
              <tbody>
                <tr :key="key" v-for="(item, key) in items">
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.bills.code }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.supplies.code }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.stock_movement.code }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ $vuetify.lang.t("$vuetify.bills.bills") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ $vuetify.lang.t("$vuetify.supplies.title") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ $vuetify.lang.t("$vuetify.stock_movement.title") }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.bills.patient.name }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.supplies.suppliers.name }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="item.stock_movement.type_movement === 'ENTRY'"
                      >
                        <v-icon
                          color="teal darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.stock_movement.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                      <template v-slot:activator="{ on }" v-else>
                        <v-icon
                          color="red accent-4"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.stock_movement.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ $moment(item.bills.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ $moment(item.supplies.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{
                      $moment(item.stock_movement.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>

                  <td class="subtitle-2">
                    {{ item.stock_initial }}
                  </td>

                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.stock_initial - item.quantity_served }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.stock_initial + item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.stock_initial + item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
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
      </v-card>
    </div>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
// import FormUser from "./Form";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
// import VueJsonToCsv from "vue-json-to-csv";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  mixins: [ListMixin],
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      start_date: null,
      end_date: null,
      product: null,
      productAvailable: null,
      date: null,
      optionExport: null,
    },
    itemsItemBills: [],
    headersItemBills: [],
    itemsProduct: [],
    urlItemsCash: "cashs/isOpen",
    showItem_movements: false,
    urlProduct: "products",
    urlProductPlus: "details_stocks/specify",
    urlItemsBills: "details_bills/get_items",
    urlItemsSupplies: "details_supplies/get_items",
    urlItems: "details_stock_movement/get_items",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    loadingBtn: false,
    search: null,
    isLoading: false,
    menu: false,
    optionsExport: {
      type_Export: [],
    },
    loadingItemBills: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    json_fields: {
      Code: "product.code",
      Name: "product.name",
      DCI: "product.dci1.name",
      Forme: "product.shape.name",
      Categorie: "product.category.name",
      Conditionnement: "product.conditioning",
      Quantite: "qte_stock",
      CMUP: "cmup",
      MontantT: "total",
    },
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    exports: {
      id: null,
      type_movement: null,
      email: null,
      code: null,
      password: null,
      role: null,
      is_active: null,
    },
    form: {
      type_movement: null,
      role: null,
    },
    filter: {
      type_movement: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.storage_depots.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus + "?storage_depots=" + this.$route.params.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  created() {
    this.setHeadersItemBills();
    this.setHeadersItemSupplies();
    // this.getOptionsExport();
    // this.getOptionsMovement();

    //this.setItemRoles();
  },
  methods: {
    currentInventory() {
      this.dialogFormInv.show = true;
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsCash,
          })
          .then((response) => {
            let data = response.data;
            self.isInventory = data.content.is_inventory;
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    // searchBarcode() {
    //   axios
    //       .get('api/Products/SearchProductBarcode/' + this.code)
    //       .then(function(response) {
    //         this.addDetail(response.data)
    //       })
    //       .catch(function(error) {
    //         console.log(error)
    //       })
    // },
    resetDate() {
      this.formData.date = null;
      this.menu5 = false;
      this.$refs.menu5.save(this.formData.date);
    },
    itemMovement() {
      // let self = this;
      // this.getItemBills();
      // this.getItemStock_movement();
      // this.getItemSupplies();
      this.loadingItemBills.refresh = true;
      this.getItemBills()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingItemBills.refresh = false;
        });
      // this.loadingItemSupplies.refresh = true;
      // this.getItemSupplies()
      //   .then(() => {})
      //   .catch(() => {})
      //   .then(() => {
      //     self.loadingItemSupplies.refresh = false;
      //   });
      // this.loadingItemStock_movement.refresh = true;
      // this.getItemStock_movement()
      //   .then(() => {})
      //   .catch(() => {})
      //   .then(() => {
      //     self.loadingItemStock_movement.refresh = false;
      //   });
    },
    exportItemMovement() {
      let self = this;
      self.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "/" +
            "export_items" +
            "?product=" +
            this.formData.product.product.id +
            "&start_date=" +
            this.formData.start_date +
            "&end_date=" +
            this.formData.end_date +
            "&id=" +
            this.$route.params.id,
          //   +
          // "&optionExport=" +
          // this.formData.optionExport,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Historique des sessions";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
        });
    },
    getDataForm() {
      let data = {
        product: this.formData.product.product["id"],
        end_date: this.formData.end_date,
        storage_depots: this.$route.params.id,
        start_date: this.formData.start_date,
      };
      return data;
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getItemBills() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      params["storage_depots"] = this.$route.params.id;
      if (self.formData.start_date !== null) {
        params["start_date"] = self.formData.start_date;
      }
      if (self.formData.end_date !== null) {
        params["end_date"] = self.formData.end_date;
      }
      if (self.formData.product !== null) {
        params["product"] = self.formData.product.product.id;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingItemBills.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            method: "GET",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsItemBills = data.content.bills;
            // self.itemsItemSupplies = data.content.supplies;
            // self.itemsItemStock_movement = data.content.stock;
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
            self.loadingItemBills.list = false;
            resolve();
          });
      });
    },

    setHeadersItemBills() {
      this.headersItemBills = [
        {
          text: "$vuetify.bills.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "80",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.title",
          value: "type_movement",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.stock_initial.title",
          value: "stock_initial",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.quantity_used.title",
          value: "quantity_used",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.bills.cols.pub.title",
        //   value: "pub",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.delivery.title",
        //   value: "delivery",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.pun.title",
        //   value: "pun",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.amount_gross.title",
        //   value: "amount_gross",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.amount_net.title",
        //   value: "amount_net",
        //   align: "start",
        //   sortable: true,
        //   width: "60",
        //   class: "grey--text text--darken-3"
        // }

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    setHeadersItemSupplies() {
      this.headersItemSupplies = [
        {
          text: "$vuetify.supplies.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "80",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.supplier.title",
          value: "suppliers",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.created.title",
          value: "createdAt",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.stock_initial.title",
          value: "stock_initial",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.arrival_price.title",
          value: "arrival_price",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    showFilterMovement() {
      this.dialogFormFilterMov.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self
        .getItems()
        .then(() => {
          self.$refs.filterForm.closeDialog();
        })
        .finally(() => {
          self.$refs.filterForm.stopLoadingBtn();
        });
    },
    performFilterMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getStockMovement();
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  computed: {
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.formData.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    get_product_code() {
      let product_code = "";
      product_code =
        this.formData.product === null
          ? ""
          : this.formData.product?.product.code;
      return product_code;
    },
  },
  mounted() {
    this.getOpenCash();
    this.getItemBills();
  },
  components: {
    DeleteItem,
  },
};
</script>

<style scoped></style>
