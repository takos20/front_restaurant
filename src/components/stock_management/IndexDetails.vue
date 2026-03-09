<template>
  <div>
    <v-container class="mt-6">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8">
          <div
            class="text-h6 text-sm-h5 text-md-h4 font-weight-bold green lighten-5 py-3 px-4 text-center rounded"
          >
            {{ $vuetify.lang.t("$vuetify.storage_depots.title") }} :
            {{ $route.params.name }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <div class="mt-5 mx-3 mx-sm-5">
      <v-row justify="center">
        <!-- Example button (Stock Available) -->
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="_.includes($auth.user().permissions, 'view_stock_available')"
        >
          <v-btn
            class="my-2 pa-3"
            @click="showAvailable()"
            color="primary"
            dark
            block
            height="100"
            style="font-size: 13px"
          >
            <!-- Responsive content layout -->
            <div
              class="d-flex flex-column flex-md-row align-center justify-center text-center w-100"
            >
              <!-- Icon -->
              <v-list-item-avatar
                tile
                size="45"
                class="mb-2 mb-md-0 mr-0 mr-md-4"
                dark
              >
                <v-img
                  :src="require('./../../assets/ready-stock2.png')"
                ></v-img>
              </v-list-item-avatar>

              <!-- Label -->
              <span>
                {{
                  $vuetify.lang.t(
                    "$vuetify.stock_management.title_stocks_available"
                  )
                }}
              </span>
            </div>
          </v-btn>
        </v-col>

        <!-- Stock Movements -->
        <!-- Example button (Stock Available) -->
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="_.includes($auth.user().permissions, 'view_stock_available')"
        >
          <v-btn
            class="my-2 pa-3"
            @click="showStock_movements()"
            color="primary"
            dark
            block
            height="100"
            style="font-size: 13px"
          >
            <!-- Responsive content layout -->
            <div
              class="d-flex flex-column flex-md-row align-center justify-center text-center w-100"
            >
              <!-- Icon -->
              <v-list-item-avatar
                tile
                size="45"
                class="mb-2 mb-md-0 mr-0 mr-md-4"
                dark
              >
                <v-img :src="require('./../../assets/docs_stock.png')"></v-img>
              </v-list-item-avatar>

              <!-- Label -->
              <span>
                {{
                  $vuetify.lang.t(
                    "$vuetify.stock_management.title_stocks_movements"
                  )
                }}
              </span>
            </div>
          </v-btn>
        </v-col>

        <!-- Inventory -->
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="_.includes($auth.user().permissions, 'view_inventory')"
        >
          <v-btn
            class="my-2 pa-3"
            @click="showInventory()"
            color="primary"
            dark
            block
            height="100"
            style="font-size: 13px"
          >
            <!-- Responsive content layout -->
            <div
              class="d-flex flex-column flex-md-row align-center justify-center text-center w-100"
            >
              <!-- Icon -->
              <v-list-item-avatar
                tile
                size="45"
                class="mb-2 mb-md-0 mr-0 mr-md-4"
                dark
              >
                <v-img :src="require('./../../assets/track.png')"></v-img>
              </v-list-item-avatar>

              <!-- Label -->
              <span>
                {{
                  $vuetify.lang.t("$vuetify.stock_management.title_inventories")
                }}
              </span>
            </div>
          </v-btn>
        </v-col>
        <!-- Item Movements -->

        <v-col
          cols="12"
          sm="6"
          md="3"
          v-if="_.includes($auth.user().permissions, 'view_items_movements')"
        >
          <v-btn
            class="my-2 pa-3"
            @click="showItemMovements()"
            color="primary"
            dark
            block
            height="100"
            style="font-size: 13px"
          >
            <!-- Responsive content layout -->
            <div
              class="d-flex flex-column flex-md-row align-center justify-center text-center w-100"
            >
              <!-- Icon -->
              <v-list-item-avatar
                tile
                size="45"
                class="mb-2 mb-md-0 mr-0 mr-md-4"
                dark
              >
                <v-img
                  :src="require('./../../assets/stock-rotation.png')"
                ></v-img>
              </v-list-item-avatar>

              <!-- Label -->
              <span>
                {{
                  $vuetify.lang.t(
                    "$vuetify.stock_management.title_item_movements"
                  )
                }}
              </span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showStock_available"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_available')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_stocks_available") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="show_stocks_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_movement')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_stocks_movements") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showInventories"
      v-if="_.includes(this.$auth.user().permissions, 'view_inventory')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_inventories") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showItem_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_items_movements')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_item_movements") }}
    </div>
    <div
      v-show="showStock_available"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_available')"
    >
      <form-available ref="form_available" color="black"></form-available>
    </div>
    <div
      v-show="show_stocks_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_movement')"
    >
      <form-movement ref="form_movement" color="black"></form-movement>
    </div>
    <div
      v-show="showInventories"
      v-if="_.includes(this.$auth.user().permissions, 'view_inventory')"
    >
      <form-inventory ref="form_inventory" color="black"></form-inventory>
    </div>
    <div
      v-show="showItem_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_items_movements')"
    >
      <form-items color="black"></form-items>
    </div>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
// import FormUser from "./Form";
import FormMovement from "./IndexDetailsStockMvt";
import FormItems from "./IndexDetailsItemsMvt";
import FormAvailable from "./IndexDetailsAvailable";
import FormInventory from "./IndexDetailsInv";
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
    optionMovement: {
      type_Movement: [],
    },
    itemsStock_movement: [],
    itemsItemBills: [],
    itemsItemSupplies: [],
    itemsItemStock_movement: [],
    headersItemStock_movement: [],
    headersItemSupplies: [],
    headersItemBills: [],
    headersStock_movement: [],
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
    urlItemsCash: "cashs/isOpen",
    showStock_available: false,
    show_stocks_movements: false,
    showInventories: false,
    showItem_movements: false,
    urlProduct: "products",
    urlItems: "/cash_movements",
    urlProductPlus: "details_stocks/specify",
    urlItemsBills: "details_bills/get_items",
    urlItemsSupplies: "details_supplies/get_items",
    urlItemsStock_movement: "details_stock_movement/get_items",
    urlItemsExportStock_movement: "stock_movements",
    urlItemsStock: "details_stocks/stock_available",
    urlStock_movement: "stock_movements",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    search: null,
    isLoading: false,
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

    loadingBtn: false,
    loadingItemStock_movement: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingItemSupplies: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingItemBills: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingStockMovement: {
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
  },
  created() {
    this.setHeadersItemBills();
    this.setHeadersItemSupplies();
    this.setHeadersItemStock_movement();
    this.getOptionsExport();
    this.getOptionsMovement();

    //this.setItemRoles();
  },
  methods: {
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement_stock, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
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
    showExportMovement() {
      this.dialogFormExportMovement.shows.showFilter = true;
    },
    performExportMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItemsExportMovement();

      // .then(() => {
      //   self.$refs.exportForm.closeDialog();
      // })
      // .finally(() => {
      //   self.$refs.exportForm.stopLoadingBtn();
      // });
    },
    getItemsExportMovement() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des mouvements de stock";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExportMovement.shows.showFilter = false;
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
            url: self.urlItemsStock_movement,
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
    setHeadersItemStock_movement() {
      this.headersItemStock_movement = [
        {
          text: "$vuetify.stock_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
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
          text: "$vuetify.stock_movement.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.unit_price.title",
          value: "unit_price",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.stock_movement.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    // refreshItemsAvailable() {
    //   let self = this;
    //   this.loadingStockAvailable.refresh = true;
    //   this.getItemsStock()
    //     .then(() => {})
    //     .catch(() => {})
    //     .then(() => {
    //       self.loadingStockAvailable.refresh = false;
    //     });
    // },
    refreshStockMovement() {
      let self = this;
      this.loadingStockMovement.refresh = true;
      this.getStockMovement()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingStockMovement.refresh = false;
        });
    },
    showAvailable() {
      this.showStock_available = true;
      this.showItem_movements = false;
      this.show_stocks_movements = false;
      this.showInventories = false;

      // attendre que le composant soit affiché
      this.$nextTick(() => {
        this.$refs.form_available?.getItemsStock();
      });
    },
    showStock_movements() {
      this.show_stocks_movements = true;
      this.showStock_available = false;
      this.showItem_movements = false;
      this.showInventories = false;

      this.$nextTick(() => {
        this.$refs.form_movement?.get_stock_movement();
      });
      // this.getItemsMovement();
    },
    showInventory() {
      this.showInventories = true;
      this.showStock_available = false;
      this.showItem_movements = false;
      this.show_stocks_movements = false;

      this.$nextTick(() => {
        this.$refs.form_inventory?.get_inventory();
      });
    },
    createInv() {
      this.dialogFormInv.show = true;
      this.messagesInv = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    showItemMovements() {
      this.showItem_movements = true;
      this.showStock_available = false;
      this.show_stocks_movements = false;
      this.showInventories = false;
    },
    setHeadersStock_movement() {
      this.headersStock_movement = [
        {
          text: "$vuetify.stock_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.type_movement.title",
          value: "type_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.reason_movement.title",
          value: "reason_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.movement_value.title",
          value: "movement_value",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "12",
        },
      ];
    },
    createMovement() {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.new.title",
        submit: "$vuetify.stock_movement.new.submit",
        success: "$vuetify.stock_movement.new.success",
      };
    },
    editStock_movement(item) {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.update.title",
        submit: "$vuetify.stock_movement.update.submit",
        success: "$vuetify.stock_movement.update.success",
      };
      this.$refs.stock_movementForm.setForm(item);
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
  },
  components: {
    FormItems,
    FormMovement,
    FormAvailable,
    FormInventory,
  },
};
</script>

<style scoped></style>
