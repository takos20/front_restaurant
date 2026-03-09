<template>
  <v-container fluid>
    <!-- Graphique de tendance -->
    <v-row dense>
      <!-- Graphique Catégories -->
      <v-col cols="12" sm="12" class="mt-4">
        <v-card class="pa-4 rounded-lg elevation-1" color="#FAFAFA">
          <v-card-title class="justify-center">
            <span class="text-subtitle-1 font-weight-medium">
              {{ $vuetify.lang.t("$vuetify.dish.title_stat") }}
            </span>
          </v-card-title>
          <v-card-text class="pa-0">
            <canvas id="category_chart" style="max-height: 300px"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Graphique Formes -->
      <!-- <v-col cols="12" sm="6" class="mt-4">
        <v-card class="pa-4 rounded-lg elevation-1" color="#FAFAFA">
          <v-card-title class="justify-center">
            <span class="text-subtitle-1 font-weight-medium">
              {{ $vuetify.lang.t("$vuetify.statistics.product_shape") }}
            </span>
          </v-card-title>
          <v-card-text class="pa-0">
            <canvas id="shape_chart" style="max-height: 300px"></canvas>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
    <!-- Liste des produits -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- Barre supérieure sticky -->
          <div
            class="sticky-bar px-4 py-3 d-flex flex-column flex-sm-row align-center justify-space-between elevation-2"
          >
            <div class="d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-package-variant</v-icon>
              <span class="text-subtitle-1 font-weight-medium">
                {{ $vuetify.lang.t("$vuetify.dish.title_stock") }}
              </span>
            </div>
            <!-- <div class="text-h5 font-weight-bold text--primary mt-2 mt-sm-0">
              {{ total }}
            </div> -->
          </div>
          <br />
          <v-data-table
            :footer-props="{
              'items-per-page-options': itemPerPageOptions,
            }"
            :headers="headersStock_available"
            :items="items"
            :items-per-page="itemPerPage"
            :loading="loadingStockAvailable.list"
            :options.sync="pagination"
            :server-items-length="meta.totalElements"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            item-key="name"
            class="elevation-1"
          >
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
                <tbody>
                  <tr :key="item.id" v-for="item in items">
                    <td class="subtitle-2">{{ item.name }}</td>

                    <td class="subtitle-2">
                      {{ item.stock }}
                    </td>

                    <!-- <td class="subtitle-2">
                  {{ item.cmup.toFixed(2) }}
                </td>
                <td class="subtitle-2">
                  {{ item.subtotal }}
                </td> -->
                  </tr>
                </tbody>
              </v-hover>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js/auto";
import ListMixin from "./../../mixins/Common/List.vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  name: "Dashboard",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          productAvailable: null,
          start_date_cat: null,
          start_date_month: null,
          end_date_month: null,
          date_month: null,
          start_date_best_selling: null,
          end_date_cat: null,
          end_date_best_selling: null,
        };
      },
    },
  },
  data() {
    return {
      urlItems: "/ingredients",
      urlItemsProduct: "/dishes/statistics",
      loading: {
        list: false,
        refresh: false,
        filter: false,
      },
      sortBy: "turnover",
      items: [],
      itemsProducts: [],
      headersStock_available: [],
      meta: {},
      pagination: {},
      supply: false,
      sortDesc: true,
      itemPerPage: 5,
      //itemPerPages: 3,
      itemPerPageOptions: [5, 10, 30],
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 10),
      loadingBtn: false,
      itemsDays: [],
      json_fields: {
        Date: "days",
        CA: "turnover",
      },
      json_fields_dom: {
        Domaine: "category",
        CA: "turnover",
      },
      loadingStockAvailable: {
        list: false,
        refresh: false,
        filter: false,
      },
      total: 0,
      labelsShape: [],
      valuesShape: [],
      labelsCategory: [],
      valuesCategory: [],
      chartOptions: {},
    };
  },
  mounted() {
    this.getItems();
    this.getItemsProducts();
    // this.timer = setInterval(this.getItems, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
    // this.timer = setInterval(this.stat_best_selling_products, 30000);
  },
  components: {},
  created() {
    this.setHeaders();

    //this.setItemRoles();
  },
  watch: {
    searchAvailable(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingAvailable = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus,
          params: params,
        })
        .then((response) => {
          self.itemsProductAvailable = response.data.content;
        })
        .finally(() => (this.isLoadingAvailable = false));
    },
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    refreshItems() {
      this.stat_best_selling_products();
      // this.sell_month_stat();
    },
    setHeaders() {
      this.headersStock_available = [
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.quantity.title",
          value: "quantity",
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
        // {
        //   text: "$vuetify.bills.cols.actions.title",
        //   value: null,
        //   align: "start",
        //   sortable: true,
        //   width: "140"
        // }
      ];
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    // getItems() {
    //   let self = this;
    //   let params = {};
    //   if (!this._.isEmpty(this._search)) {
    //     this._search = this._.merge(params, this._search);
    //   }
    //   return new Promise((resolve, reject) => {
    //     this.loading.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItems,
    //         params: params,
    //       })
    //       .then((response) => {
    //         let data = response.data;
    //         self.items = data.content;
    //         this.total = data.total;
    //         // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
    //         // let statP = Object.entries(self.items?.stat_product);
    //         // self.chartData =
    //         //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
    //         self.meta = { totalElements: data.totalElements };
    //         // console.log("meta", data.content[0]);
    //         resolve(response);
    //       })
    //       .catch((err) => {
    //         let message = this.$vuetify.lang.t("$vuetify.error_occured");
    //         if (err.response) {
    //           if (err.response.status === 400) {
    //             self.setApiFormErrors(err.response.data.data);
    //             message = self.$vuetify.lang.t("$vuetify.error_form");
    //           } else if (err.response.status === 403) {
    //             message = self.$vuetify.lang.t("$vuetify.error_denied");
    //           } else if (err.response.status === 500) {
    //             message = self.$vuetify.lang.t("$vuetify.error_server");
    //           }
    //         }
    //         self.$store.dispatch("showNotification", {
    //           status: true,
    //           text: message,
    //         });
    //         reject(err);
    //       })
    //       .then(() => {
    //         self.loading.list = false;
    //         resolve();
    //       });
    //   });
    // },
    getItemsProducts() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsProduct,
          })
          .then((response) => {
            let data = response.data;
            // let chartShape = Chart.getChart("shape_chart");
            // if (chartShape !== undefined) {
            //   chartShape.destroy();
            // }
            // this.labelsShape = [];
            // this.valuesShape = [];
            // for (const prop of data.content.shape) {
            //   this.labelsShape.push(prop.shape_product);
            //   this.valuesShape.push(prop.total);
            // }
            // new Chart(document.getElementById("shape_chart"), {
            //   // type:'radar',
            //   type: "doughnut",
            //   plugins: [ChartDataLabels],
            //   options: {
            //     plugins: {
            //       datalabels: {
            //         display: true,
            //         align: "middle",
            //         color: "white",
            //         font: {
            //           size: 15,
            //         },
            //       },
            //     },
            //   },
            //   data: {
            //     labels: this.labelsShape,
            //     datasets: [
            //       {
            //         label: "Total",
            //         backgroundColor: [
            //           "#3a90cd",
            //           "#add8e6",
            //           "#848482",
            //           "#b38b6d",
            //           "#ffd1dc",
            //           "#fc8eac",
            //           "#fffe7a",
            //         ],
            //         borderColor: ["#E9EEF4"],
            //         data: this.valuesShape,
            //         borderWidth: 3,
            //       },
            //     ],
            //   },
            // });

            let chartCategory = Chart.getChart("category_chart");
            if (chartCategory !== undefined) {
              chartCategory.destroy();
            }
            this.labelsCategory = [];
            this.valuesCategory = [];

            for (const prop of data.content) {
              this.labelsCategory.push(prop.type);
              this.valuesCategory.push(prop.total);
            }
            new Chart(document.getElementById("category_chart"), {
              // type:'radar',
              type: "doughnut",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      boxWidth: 12,
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${context.raw}`,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsCategory,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: [
                      "#3a90cd",
                      "#add8e6",
                      "#848482",
                      "#b38b6d",
                      "#ffd1dc",
                      "#fc8eac",
                      "#fffe7a",
                    ],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesCategory,
                    borderWidth: 3,
                  },
                ],
              },
            });
            // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
            // let statP = Object.entries(self.items?.stat_product);
            // self.chartData =
            //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
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
    getDataForm() {
      let data = {
        start_date_month: this.form.start_date_month,
        end_date_month: this.form.end_date_month,
        date_month: this.form.date_month,
        start_date_dom: this.form.start_date_cat,
        product_available: this.form.productAvailable,
        start_date_best_selling: this.form.start_date_best_selling,
        end_date_best_selling: this.form.end_date_best_selling,
        end_date_dom: this.form.end_date_cat,
      };
      return data;
    },
    // sell_month_stat() {
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     this.loading.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItems,
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         let data = response.data;
    //         let statP = Object.entries(data.content.stat_category);
    //         this.barChart =
    //           statP.length === 1
    //             ? []
    //             : Object.entries(data.content.stat_category);
    //         resolve(response);
    //       })
    //       .catch(err => {
    //         let message = this.$vuetify.lang.t("$vuetify.error_occured");
    //         if (err.response) {
    //           if (err.response.status === 400) {
    //             self.setApiFormErrors(err.response.data.data);
    //             message = self.$vuetify.lang.t("$vuetify.error_form");
    //           } else if (err.response.status === 403) {
    //             message = self.$vuetify.lang.t("$vuetify.error_denied");
    //           } else if (err.response.status === 500) {
    //             message = self.$vuetify.lang.t("$vuetify.error_server");
    //           }
    //         }
    //         self.$store.dispatch("showNotification", {
    //           status: true,
    //           text: message
    //         });
    //         reject(err);
    //       })
    //       .then(() => {
    //         self.loading.list = false;
    //         resolve();
    //       });
    //   });
    // },
    export_month_day() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDays,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
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
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
.legend-scroll {
  max-height: 200px;
  overflow-y: auto;
}
</style>
