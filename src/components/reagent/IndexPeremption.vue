<template>
  <v-dialog v-model="dialog.show" persistent max-width="1000px">
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
        <v-card-title>
          <div class="title">
            {{ $vuetify.lang.t("$vuetify.product.filter") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row wrap>
            <v-col class="mb-0 py-0" cols="12" sm="4">
              <v-text-field
                outlined
                dense
                :label="$vuetify.lang.t('$vuetify.product.cols.code.title')"
                prepend-inner-icon="mdi-code-array"
                v-model="filter.code"
                @input="performFilter()"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                v-model="filter.category"
                :items="itemsCategory"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="name"
                item-value="id"
                @change="performFilter()"
                :label="$vuetify.lang.t('$vuetify.product.cols.category.title')"
                prepend-inner-icon="mdi-alpha-c-circle-outline mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-text-field
                v-model="filter.name"
                outlined
                dense
                color="primary"
                @input="performFilter()"
                prepend-inner-icon="mdi-code-array"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                "
                class="font-weight-bold"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="margin-top: -30px">
          <v-spacer></v-spacer>
          <v-btn dark color="primary" @click="exportPrint()">
            <v-icon color="white" left>mdi-printer</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <v-btn dark color="primary" @click="performExport">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headers"
          :items="items"
          :items-per-page="itemPerPage"
          :loading="loading.list"
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
                  <td class="text-sm-subtitle-2">{{ item.product.name }}</td>
                  <td class="subtitle-2">
                    {{ item.product.code }}
                  </td>
                  <!--                <td class="subtitle-2">-->
                  <!--                  {{ item.medical_areas.name }}-->
                  <!--                </td>-->
                  <!--                  <td class="subtitle-2">{{ item.qte_stock }}</td>-->
                  <td class="subtitle-2" v-if="item.qte_stock == 0">
                    <v-btn class="mr-2 my-2 white--text" color="red" small>
                      {{ item.qte_stock }}
                    </v-btn>
                  </td>
                  <td class="subtitle-2" v-else>
                    <v-btn class="mr-2 my-2 white--text" color="teal" small>
                      {{ item.qte_stock }}
                    </v-btn>
                  </td>
                  <td class="subtitle-2">{{ item.storage_depots.name }}</td>
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FilterMixin from "../../mixins/Common/Filters";
export default {
  mixins: [ListMixin, FilterMixin],
  data: () => ({
    urlItems: "details_stocks/all",
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
  }),
  watch: {
    pagination: {
      handler() {
        this.getItems();
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
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.category.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.quantity.title",
          value: "qte_stock",
          align: "start",
          sortable: false,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.storage_depot.title",
          value: "storage_depots",
          align: "start",
          sortable: false,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
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
            self.items = data.content;
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
