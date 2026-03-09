<template>
  <v-dialog v-model="dialog.show" persistent max-width="840px">
    <v-card class="pb-4">
      <v-card-title dark color="white" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t("$vuetify.bills.list.titlePeremption") }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card class="pb-4">
        <div class="mx-5">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItems()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
        </div>

        <v-tabs horizontal centered dense fixed-tabs background-color="#E9EEF4">
          <v-tab class="black--text font-weight-bold">
            <!-- <v-icon left>
              mdi-account
            </v-icon> -->
            {{ $vuetify.lang.t("$vuetify.hospitals.out_of_stock") }}
          </v-tab>
          <v-tab class="black--text font-weight-bold">
            <!-- <v-icon left color="black">
              mdi-lock
            </v-icon> -->
            {{ $vuetify.lang.t("$vuetify.hospitals.expiration_date") }}
          </v-tab>

          <v-tab-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="primary" @click="exportPDF()">
                <v-icon color="white" left>mdi-file</v-icon>
                {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
              </v-btn>
            </v-card-actions>
            <v-card>
              <v-data-table
                :footer-props="{
                  'items-per-page-options': itemPerPageOptions,
                }"
                :headers="headers"
                :items="itemsQty"
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
                <template v-slot:header.code="{ header }">
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
                <template v-slot:header.storage_depots="{ header }">
                  <tr>
                    {{
                      $vuetify.lang.t(header.text)
                    }}
                  </tr>
                </template>

                <template v-slot:body="{ items }">
                  <v-hover>
                    <tbody>
                      <tr :key="item.id" v-for="item in items">
                        <td class="text-sm-subtitle-2">
                          {{ item.product_name }}
                        </td>
                        <td class="subtitle-2" v-if="item.qte_stock == 0">
                          <v-btn
                            class="mr-2 my-2 white--text"
                            color="red"
                            small
                          >
                            {{ item.qte_stock }}
                          </v-btn>
                        </td>
                        <td class="subtitle-2" v-else>
                          <v-btn
                            class="mr-2 my-2 white--text"
                            color="teal"
                            small
                          >
                            {{ item.qte_stock }}
                          </v-btn>
                        </td>
                        <td class="subtitle-2">
                          {{ item.storage_depots.name }}
                        </td>
                      </tr>
                    </tbody>
                  </v-hover>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="primary" @click="exportPDFDate()">
                <v-icon color="white" left>mdi-file</v-icon>
                {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
              </v-btn>
            </v-card-actions>
            <v-card>
              <v-data-table
                :footer-props="{
                  'items-per-page-options': itemPerPageOptions,
                }"
                :headers="headersDate"
                :items="itemsDate"
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
                <template v-slot:header.code="{ header }">
                  <tr>
                    {{
                      $vuetify.lang.t(header.text)
                    }}
                  </tr>
                </template>
                <template v-slot:header.expiry_date="{ header }">
                  <tr>
                    {{
                      $vuetify.lang.t(header.text)
                    }}
                  </tr>
                </template>
                <template v-slot:body="{ items }">
                  <v-hover>
                    <tbody>
                      <tr :key="item.id" v-for="item in items">
                        <td class="text-sm-subtitle-2">{{ item.name }}</td>
                        <td class="subtitle-2">
                          {{ item.code }}
                        </td>
                        <!--                <td class="subtitle-2">-->
                        <!--                  {{ item.medical_areas.name }}-->
                        <!--                </td>-->
                        <!--                  <td class="subtitle-2">{{ item.qte_stock }}</td>-->
                        <td class="subtitle-2">
                          <v-btn
                            class="mr-2 my-2 white--text"
                            color="red"
                            small
                          >
                            {{ item.expiry_date }}
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </v-hover>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
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
    urlItems: "details_stocks/peremption",
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
    itemsQty: [],
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
    loadingDate: {
      list: false,
      submit: "",
      success: "",
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
  created() {
    this.getItems();
  },
  methods: {
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
          text: "$vuetify.supplies.cols.storage_depot.title",
          value: "storage_depots",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
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
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsQty = data.content.qty;
            self.itemsDate = data.content.date;
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
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
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
  components: {},
};
</script>

<style scoped></style>
