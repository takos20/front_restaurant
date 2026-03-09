<template>
  <v-dialog v-model="dialog.show" persistent max-width="900px">
    <v-card class="rounded-xl">
      <!-- HEADER -->
      <v-card-title class="d-flex align-center py-4 px-6">
        <v-icon large color="primary" class="mr-3"> mdi-warehouse </v-icon>

        <div class="text-h6 font-weight-bold">
          {{ $vuetify.lang.t("$vuetify.ingredient.list.title") }}
        </div>

        <v-spacer></v-spacer>

        <v-btn icon @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <!-- ACTION BAR -->
      <v-card-text class="px-6 pt-4 pb-2">
        <v-btn
          :loading="loading.refresh"
          @click="refreshItems()"
          depressed
          color="primary"
          class="rounded-lg"
        >
          <v-icon left>mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn>
      </v-card-text>

      <!-- TABLE -->
      <v-data-table
        :footer-props="{ 'items-per-page-options': itemPerPageOptions }"
        :headers="headers"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loadingDate.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="name"
      >
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.qte_stock="{ header }">
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
                <td class="text-sm-subtitle-2">
                  {{ item.ingredient ? item.ingredient.name : item.ingredient }}
                </td>
                <td class="subtitle-2">
                  <v-btn
                    small
                    class="white--text"
                    :color="item.quantity < 0 ? 'red' : 'green'"
                  >
                    {{ parseFloat(item.quantity).toFixed(2) }}
                  </v-btn>
                </td>
                <td class="subtitle-2 actions-cell">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="editBills(item)"
                        color="secondary"
                        icon
                        text
                        v-on="on"
                        v-show="$vuetify.breakpoint.smAndDown || hover"
                        class="action-btn"
                      >
                        <v-icon>mdi-update</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $vuetify.lang.t("$vuetify.btn.detail") }}</span>
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
                        class="action-btn"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FilterMixin from "../../mixins/Common/Filters";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin, FilterMixin],
  data: () => ({
    urlItemsIngredient: "details_stocks",
    urlItems: "details_stocks",
    urlItemsGet: "/products/get_all_products",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    filter: {
      type: Object,
      default: function () {
        return {
          name: null,
          category: null,
          code: null,
        };
      },
    },
    urlCategory: "categories",
    itemsCategory: [],
    itemsDate: [],
    items: [],
    search: null,
    isLoading: false,
    currentFile: undefined,
    progress: 0,
    message: "",
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    pagination: {},
    loadingDate: {
      list: false,
      submit: "",
      success: "",
    },
  }),
  watch: {
    pagination: {
      handler() {
        this.getBills_analysis();
      },
      deep: true,
    },
    "dialog.show"(val) {
      if (val) {
        this.getItemsIngredient();
      }
    },
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlCategory,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCategory = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  // created() {
  //   this.getItems();
  // },
  methods: {
    stockColor(qty) {
      if (qty < 0) return "red darken-2";
      if (qty === 0) return "orange darken-2";
      return "green darken-2";
    },
    stockIcon(qty) {
      if (qty < 0) return "mdi-alert-circle";
      if (qty === 0) return "mdi-alert";
      return "mdi-check-circle";
    },
    exportPDF() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "?export=qty",
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
    exportPDFDate() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "?export=date",
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
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.category.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.quantity.title",
          value: "qte_stock",
          align: "start",
          sortable: false,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "100",
        },
      ];
      this.headersDate = [
        {
          text: "$vuetify.category.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.expiry_date.title",
          value: "expiry_date",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
      ];
    },
    forceRefresh() {
      this.dialog.show = false;
      this.itemsQty = [];
      this.itemsDate = [];
      this.active = false;
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsIngredient + "?quantity__lt=0",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            this.items = data.content;
            // self.itemsQty = data.content.qty;
            // self.itemsDate = data.content.date;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
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
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.product.new.title",
        submit: "$vuetify.product.new.submit",
        success: "$vuetify.product.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        is_active: false,
      };
    },
    editProduct(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.product.update.title",
        submit: "$vuetify.product.update.submit",
        success: "$vuetify.product.update.success",
      };
      this.$refs.productForm.setForm(item);
    },
    enabled(item) {
      this.$refs.enableProduct.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.product.cols.status.enabled",
          submit: "$vuetify.product.update.submit",
          success: "$vuetify.product.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.product.cols.status.desabled",
          submit: "$vuetify.product.update.submit",
          success: "$vuetify.product.update.success",
        };
      }
    },
    // performFilter() {
    //   let self = this;
    //   self.loading.list = true;
    //   let params = {};
    //   if (self.filter.name !== null) {
    //     params["name"] = self.filter.name;
    //   }
    //   if (self.filter.code !== null) {
    //     params["code"] = self.filter.code;
    //   }
    //   if (self.filter.category !== null) {
    //     params["category"] = self.filter.category;
    //   }
    //   self._search = params;
    //   //console.log("FILTRE", this._search);
    //   self
    //     .getItems()
    //     .then(() => {
    //       self.$refs.filterForm.closeDialog();
    //     })
    //     .finally(() => {
    //       self.$refs.filterForm.stopLoadingBtn();
    //     });
    // },
  },
  components: {},
};
</script>

<style scoped>
.v-data-table tbody tr:hover {
  background-color: #f5f7fb;
  transition: background-color 0.2s ease;
}
</style>
