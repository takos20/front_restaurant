<template>
  <div
    v-if="_.includes($auth.user().permissions, 'view_dashboard_consultation')"
  >
    <br />
    <!--    <v-btn-->
    <!--        :loading="loading.refresh"-->
    <!--        @click="getItems()"-->
    <!--        class="mr-2 my-2"-->
    <!--        depressed-->
    <!--        color="#f1f5fc"-->
    <!--    >-->
    <!--      <v-icon left color="primary">mdi-refresh</v-icon>-->
    <!--      {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
    <!--    </v-btn>-->
    <v-card height="50px" flat color="#FAFAFA">
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="2" style="margin-top: -10px">
            <v-btn
              @click="refreshItems()"
              depressed
              class="font-weight-bold white--text"
              color="btn_logout"
            >
              <v-icon left color="white">mdi-refresh</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
            </v-btn>
          </v-col>
          <v-col cols="12" sm="10" class="mb-0 py-0"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <v-row wrap>
      <v-container fluid>
        <v-row>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.sale_of_the_day")
                    }}</strong>
                    <br />
                    <br />
                    <span style="color: white; font-size: 18px">{{
                      items.sale_of_the_day_product === null
                        ? 0
                        : Intl.NumberFormat().format(
                            Math.round(items.sale_of_the_day_product * 100) /
                              100
                          )
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_sale_of_the_day_product >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_day_product * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_day_product * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.sale_of_the_month")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month_product === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.sale_of_the_month_product * 100
                              ) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_month_product >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_month_product * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(
                            items.back_sale_of_the_month_product * 100
                          ) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.consultation.titleNbrDays")
                    }}</strong>
                    <br />
                    <br />
                    <span style="color: white; font-size: 18px">{{
                      items.nbr_of_the_day_product === null
                        ? 0
                        : Intl.NumberFormat().format(
                            Math.round(items.nbr_of_the_day_product * 100) / 100
                          )
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_nbr_of_the_day_product >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_nbr_of_the_day_product * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_nbr_of_the_day_product * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.consultation.titleNbrMonth")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month_product === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.nbr_of_the_month_product * 100) /
                                100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_nbr_of_the_month_product >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_nbr_of_the_month_product * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(
                            items.back_nbr_of_the_month_product * 100
                          ) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <br />
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_day") }}
                </h3>
              </v-col>
              <v-col cols="12" sm="5">
                <v-menu
                  ref="menu7"
                  v-model="menu7"
                  :close-on-content-click="false"
                  :return-value.sync="form.date_month"
                  transition="scale-transition"
                  offset-y
                  class="white--text"
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.date_month"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      :label="
                        $vuetify.lang.t('$vuetify.statistics.cols.month.title')
                      "
                      dense
                      background-color="white"
                      style="width: 200px; margin-top: -10px"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date_month"
                    type="month"
                    no-title
                    :max="maxDate"
                    class="white--text"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu7 = false">
                      {{ $vuetify.lang.t("$vuetify.btn.cancel") }}
                    </v-btn>
                    <v-btn text color="primary" @click="sell_month_day()">
                      {{ $vuetify.lang.t("$vuetify.ok") }}
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-menu right transition="scale-transition">
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    class="ml-3"
                    style="margin-top: -30px"
                    fab
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsDays.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn dark color="primary" @click="export_month_day()">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_day()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="day_chart"
                style="margin-top: -70px"
              ></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--                        <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--                          <v-progress-circular-->
            <!--                              size="50"-->
            <!--                              indeterminate-->
            <!--                              color="primary"-->
            <!--                          ></v-progress-circular>-->
            <!--                        </v-card-text>-->
          </v-card-text>
        </v-card>
        <br />
      </v-container>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
const FileSaver = require("file-saver");
export default {
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
          end_date_cat: null,
        };
      },
    },
  },
  data() {
    return {
      urlItemsStat_day_month: "/bills/stat_day_month",
      urlItems: "/bills/statistic_product",
      urlItemsDays: "/bills/statistic_product_days",
      loading: {
        list: false,
        refresh: false,
        filter: false,
      },
      sortBy: "turnover",
      headers: [],
      events: [],
      items: [],
      meta: {},
      turnover: null,
      gross_margin: null,
      searchAvailable: null,
      isLoadingAvailable: false,
      itemsProductAvailable: [],
      urlProductPlus: "products",
      pagination: {},
      supply: false,
      sortDesc: true,
      itemPerPage: 5,
      //itemPerPages: 3,
      itemPerPageOptions: [5, 10, 30],
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 10),
      loadingBtn: false,
      chartData: [],
      barChart: [],
      itemsDays: [],
      itemsDomaine: [],
      json_fields: {
        Date: "days",
        CA: "turnover",
      },
      json_fields_dom: {
        Domaine: "category",
        CA: "turnover",
      },
      items_best_selling: [],
      menu: false,
      labels: [],
      values: [],
      menu3: false,
      menu2: false,
      menu4: false,
      menu5: false,
      menu6: false,
      labelsDays: [],
      valuesDays: [],
      menu7: false,
      chartOptions: {},
    };
  },
  mounted() {
    // this.getItems();
    this.getItems();
    // this.sell_month_stat();
    this.sell_month_day();
    // this.timer = setInterval(this.getItems, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
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
  computed: {
    get_ca_total() {
      let total = 0;
      this.items_best_selling.forEach((d) => {
        total += d.turnover;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_gross_margin_total() {
      let total = 0;
      this.items_best_selling.forEach((d) => {
        total += d.gross_margin;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_pourcent_ca_total() {
      let total = 0;
      this.items_best_selling.forEach((d) => {
        total += d.turnover / this.get_ca_total;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    getMinStatDate() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_cat)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonth() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_best_selling)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    refreshItems() {
      this.getItems();
      this.sell_month_day();
      this.appointment_month_day();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.category.title",
          value: "category",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.turnover",
          value: "turnover",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.gross_margin",
          value: "gross_margin",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.percent_turnover",
          value: "percent_turnover",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getItems() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_day_month + "?type=consultation",
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
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
    sell_month_day() {
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDays + "?type=consultation",
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDays = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("day_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDays = [];
            this.valuesDays = [];
            for (const prop of data.content) {
              this.labelsDays.push(prop.days);
              this.valuesDays.push(prop.turnover);
            }
            new Chart(document.getElementById("day_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDays,
                datasets: [
                  {
                    label: "Chiffre d'affaires",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDays,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
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
    export_domaine() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDom,
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
</style>
