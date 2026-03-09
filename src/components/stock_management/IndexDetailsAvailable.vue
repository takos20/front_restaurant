<template>
  <div>
    <div
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_available')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <v-form>
            <v-row wrap>
              <!--              <v-col cols="12" sm="2" class="mb-0 py-0">-->
              <!--                <v-btn-->
              <!--                  :loading="loadingStockAvailable.refresh"-->
              <!--                  @click="refreshItemsAvailable()"-->
              <!--                  class="mr-2 my-2"-->
              <!--                  depressed-->
              <!--                  color="#f1f5fc"-->
              <!--                >-->
              <!--                  <v-icon left color="primary">mdi-refresh</v-icon>-->
              <!--                  {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
              <!--                </v-btn>-->
              <!--              </v-col>-->
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="formData.productAvailable"
                  :items="itemsProductAvailable"
                  :loading="isLoadingAvailable"
                  :search-input.sync="searchAvailable"
                  color="primary"
                  return-object
                  item-text="ingredient"
                  item-value="id"
                  @change="getItemsStock"
                  :label="$vuetify.lang.t('$vuetify.ingredient.title')"
                  class="font-weight-bold my-2"
                  outlined
                  dense
                  clearable
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.ingredient.name }}
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.ingredient.name }}
                  </template>
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.ingredient.title") }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu5"
                  color="primary"
                  ::close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.date"
                      color="primary"
                      class="font-weight-bold my-2"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.statistics.sell_month_stat_date'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      clearable
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.date"
                    :max="maxDate"
                    color="primary"
                    @change="getItemsStock"
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!--              <v-menu bottom right transition="scale-transition" style="margin-left: 450px">-->
              <!--                <template v-slot:activator="{ on }">-->
              <!--                  <v-btn icon v-on="on">-->
              <!--                    <v-icon size="30">mdi-menu</v-icon>-->
              <!--                  </v-btn>-->
              <!--                </template>-->
              <!--                <v-list class="menu-app-bar">-->
              <!--                <v-list-item>-->
              <!--                  <download-excel-->
              <!--                      class="btn btn-default"-->
              <!--                      :data="itemsStock_available"-->
              <!--                      :fields="json_fields"-->
              <!--                      worksheet="My Worksheet"-->
              <!--                      name="Liste des categories.xls"-->
              <!--                  >-->
              <!--                    <v-btn color="success" class="mr-6">-->
              <!--                      Export xls <i class="mdi mdi-export-variant" aria-hidden="true"></i>-->
              <!--                    </v-btn>-->
              <!--                  </download-excel>-->
              <!--                </v-list-item>-->
              <!--              </v-list><v-list class="menu-app-bar">-->
              <!--                <v-list-item>-->
              <!--                  <vue-json-to-csv-->
              <!--                      :json-data="itemsStock_available"-->
              <!--                      :labels="{ code: { title: 'Code' },name: { title: 'Name' },billable: { title: 'Facturable' } }"-->
              <!--                      :csv-title="'Liste des categories'"-->
              <!--                  >-->
              <!--                    <v-btn color="success" class="mr-6">-->
              <!--                      Export csv <i class="mdi mdi-export-variant" aria-hidden="true"></i>-->
              <!--                    </v-btn>-->
              <!--                  </vue-json-to-csv>-->

              <!--                </v-list-item>-->
              <!--              </v-list>-->
              <!--              </v-menu>-->

              <!--              <v-col cols="12" sm="3" class="mb-0 py-0">-->
              <!--                <v-btn-->
              <!--                  class="my-2 white&#45;&#45;text"-->
              <!--                  @click="getItemsStock()"-->
              <!--                  color="teal darken-1"-->
              <!--                  light-->
              <!--                  :loading="loadingBtn"-->
              <!--                >-->
              <!--                  {{-->
              <!--                    $vuetify.lang.t(-->
              <!--                      "$vuetify.item_movements.cols.period_of.title5"-->
              <!--                    )-->
              <!--                  }}-->
              <!--                </v-btn> </v-col-->
              <!--              >-->
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <download-excel
                  class="btn btn-default"
                  :data="stockAvailableWithTotal"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  name="Liste des produits.xls"
                >
                  <v-btn color="teal darken-1" class="mt-2 white--text">
                    Export xls
                    <i class="mdi mdi-export-variant" aria-hidden="true"></i>
                  </v-btn>
                </download-excel>
              </v-col>
            </v-row>
            <!-- <v-row wrap>
              <v-col cols="12" sm="6">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.product.cols.quantity.titleT") }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_quantity_total * 100) / 100
                    )
                  }} -->
            <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
            <!-- </v-chip>
              </v-col> -->
            <!-- <v-col cols="12" sm="6">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{
                    $vuetify.lang.t("$vuetify.product.cols.quantity.amountT")
                  }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_amount_total * 100) / 100
                    )
                  }} -->
            <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
            <!-- </v-chip> -->
            <!-- </v-col> -->
            <!-- </v-row> -->
          </v-form>
          <v-spacer></v-spacer>
        </div>
      </v-card>

      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersStock_available"
          :items="stockAvailableWithTotal"
          :items-per-page="itemPerPage"
          :loading="loadingStockAvailable.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
          v-show="showStock_available"
        >
          <template v-slot:header.code="{ header }">
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
          <template v-slot:header.quantity="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_two="{ header }">
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
          <!-- <template v-slot:header.cmup="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template> -->
          <template v-slot:body="{ items }">
            <v-hover>
              <tbody slot-scope="{ hover }">
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2" v-if="item.ingredient">
                    {{ item.ingredient.code }}
                  </td>
                  <td class="subtitle-2" v-else>
                    {{ item.code }}
                  </td>
                  <td class="subtitle-2" v-if="item.ingredient">
                    {{ item.ingredient.name }}
                  </td>
                  <td class="subtitle-2" v-else>{{ item.name }}</td>

                  <td class="subtitle-2">
                    {{ item.quantity }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.quantity_two }}
                  </td>

                  <!-- <td class="subtitle-2">
                  {{ item.cmup.toFixed(2) }}
                </td>
                <td class="subtitle-2">
                  {{ item.subtotal }}
                </td> -->
                  <td class="subtitle-2">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                            dark
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
        <form-update
          :dialog="dialogForm"
          ref="updateExpiryDate"
          :messages="messages"
          @getItemsStock="getItemsStock"
        ></form-update>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItemsStock="getItemsStock"
        ></delete-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import FormUpdate from "./updateExpiryDate";
import ListMixin from "../../mixins/Common/List.vue";
// import FormUser from "./Form";
import DeleteItem from "./../Common/DeleteDetailsAvailable";
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
    itemsStock_available: [],
    headersStock_available: [],
    itemsProduct: [],
    messagesInv: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    isInventory: false,
    dialogFormInvent: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItemsCash: "cashs/isOpen",
    showStock_available: false,
    urlProduct: "products",
    urlItems: "details_stocks",
    urlProductPlus: "details_stocks/specify",
    urlItemsStock: "details_stocks/stock_available",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    search: null,
    isLoading: false,
    searchAvailable: null,
    isLoadingAvailable: false,
    itemsProductAvailable: [],
    menu: false,
    optionsExport: {
      type_Export: [],
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingStockAvailable: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingBtn: false,
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
      Date_expiration: "expiry_date",
      Quantite: "qte_stock",
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
    "$route.params.id": {
      immediate: true,
      handler() {
        this.getItemsStock();
      },
    },
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
    searchAvailable(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingAvailable = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus + "?storage_depots=" + this.$route.params.id,
          params: params,
        })
        .then((response) => {
          self.itemsProductAvailable = response.data.content;
        })
        .finally(() => (this.isLoadingAvailable = false));
    },
    pagination: {
      handler() {
        this.getItemsStock();
      },
      deep: true,
    },
  },
  created() {
    this.setHeaders();
    //this.setItemRoles();
  },
  methods: {
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          // let fileName = "Listes des Porduits";
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          // FileSaver.saveAs(blob, fileName);
          this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    exportPDF() {
      let self = this;
      const params = {};
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des produits";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
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
    getOptionsExport() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.export, (type_Export) => {
        self.optionsExport.type_Export.push({
          text: self.$vuetify.lang.t(type_Export.text),
          value: type_Export.value,
        });
      });
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
    getItemsStock() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (self.formData.date !== null) {
        params["date"] = self.formData.date;
      }
      if (self.formData.productAvailable !== null) {
        params["ingredient"] = self.formData.productAvailable.ingredient.id;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItems +
              "/specify" +
              "?storage_depots=" +
              this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsStock_available = data.content;
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
            self.loading.list = false;
            resolve();
          });
      });
    },
    showAvailable() {
      this.showStock_available = true;
      this.showItem_movements = false;
      this.showStocks_movements = false;
      this.showInventories = false;
    },
    updateExpiry(item) {
      this.$refs.updateExpiryDate.setForm(item);
      this.dialogForm.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.product.update.title",
        submit: "$vuetify.product.update.submit",
        success: "$vuetify.product.update.success",
      };
    },
    setHeaders() {
      this.headersStock_available = [
        {
          text: "$vuetify.product.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.quantity_gramme.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.quantity.title",
          value: "quantity_two",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.product.cols.cmup.title",
        //   value: "cmup",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.inventory.cols.amount.title",
        //   value: "amount",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // }
        {
          text: "$vuetify.bills.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "140",
        },
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
    stockAvailableWithTotal() {
      // Each new added detail, updates the stockAvailableWithTotal
      // computed property, so you have the total calc in
      // each stockAvailable
      return this.itemsStock_available.map((stockAvailable) => ({
        ...stockAvailable,
        total: stockAvailable.qte_stock * stockAvailable.cmup,
      }));
    },
    get_amount_total() {
      let total = 0;
      this.itemsStock_available.forEach((d) => {
        total += d.qte_stock * d.cmup;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_quantity_total() {
      let total = 0;
      this.itemsStock_available.forEach((d) => {
        total += d.qte_stock;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
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
    this.showAvailable();
    this.getItemsStock();
  },
  components: {
    DeleteItem,
    FormUpdate,
  },
};
</script>

<style scoped></style>
