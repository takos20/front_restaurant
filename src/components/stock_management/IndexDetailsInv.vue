<template>
  <div>
    <div v-if="_.includes(this.$auth.user().permissions, 'view_inventory')">
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_inventory')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="createInventory()"
              color="primary"
              dark
            >
              <v-icon> mdi-plus </v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loadingInventory.refresh"
            @click="refreshInventory()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-spacer></v-spacer>
        </div>
      </v-card>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersInventory"
          :items="itemsInventory"
          :items-per-page="itemPerPage"
          :loading="loadingInventory.list"
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
          <template v-slot:header.date_inventory="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.reason_inventory="{ header }">
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
                  <td class="subtitle-2">{{ item.code }}</td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.reason_inventory }}
                  </td>

                  <td class="subtitle-2">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editInventory(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon>mdi-update</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
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
        <form-inventory
          :dialog="dialogFormInventory"
          :form="form"
          :messages="messages"
          @getItems="get_inventory"
          ref="inventoryForm"
        ></form-inventory>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItems"
        ></delete-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
// import FormUser from "./Form";
import DeleteItem from "./../Common/Delete";
import FormInventory from "./FormInventory";
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
    itemsInventory: [],
    itemsItemBills: [],
    headersInventory: [],
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
    showInventories: false,
    showItem_movements: false,
    urlProduct: "products",
    urlItems: "inventories",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    search: null,
    isLoading: false,
    menu: false,
    optionsExport: {
      type_Export: [],
    },
    loadingStockAvailable: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingBtn: false,
    loadingInventory: {
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
    dialogFormInventory: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
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
        this.get_inventory();
      },
      deep: true,
    },
  },
  created() {
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
    refreshInventory() {
      let self = this;
      this.loadingInventory.refresh = true;
      this.get_inventory()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingInventory.refresh = false;
        });
    },
    get_inventory() {
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
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?storage_depots=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            // if (this.isInventory == true) {
            // } else {
            //   this.createInv();
            // }
            self.itemsInventory = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content);
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

    setHeadersInventory() {
      this.headersInventory = [
        {
          text: "$vuetify.inventory.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.date_inventory.title",
          value: "date_inventory",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.reason_inventory.title",
          value: "reason_inventory",
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
    createInventory() {
      this.dialogFormInventory.show = true;
      this.messages = {
        title: "$vuetify.inventory.new.title",
        submit: "$vuetify.inventory.new.submit",
        success: "$vuetify.inventory.new.success",
      };
      this.$refs.inventoryForm.setForm();
    },
    editInventory(item) {
      this.dialogFormInventory.show = true;
      this.messages = {
        title: "$vuetify.inventory.update.title",
        submit: "$vuetify.inventory.update.submit",
        success: "$vuetify.inventory.update.success",
      };
      this.$refs.inventoryForm.setForm(item);
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
    this.get_inventory();
  },
  components: {
    FormInventory,
    DeleteItem,
  },
};
</script>

<style scoped></style>
