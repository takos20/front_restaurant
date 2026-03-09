<template>
  <div v-if="_.includes($auth.user().permissions, 'view_dashboard_pharmacy')">
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
              <v-card color="cyan darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.margin_of_the_month"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.month_margin_product === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.month_margin_product * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_month_margin_product >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_month_margin_product * 100) /
                            100
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
                          Math.round(items.back_month_margin_product * 100) /
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
              <v-card color="pink darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.cumulative_unpaid")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cumulative_unpaid_product === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.cumulative_unpaid_product * 100
                              ) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.cumulative_month_unpaid"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cumulative_unpaid_month_product === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.cumulative_unpaid_month_product * 100
                              ) / 100
                            )
                      }}</strong></span
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
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_cat") }}
                </h3>
              </v-col>

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.start_appointment_date.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.start_date_month"
                    :max="maxDateStatMonth"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-menu
                  v-model="menu6"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.end_appointment_date.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.end_date_month"
                    :max="maxDateStatMonth"
                    :min="getminDateMonth"
                    color="primary"
                    @input="menu6 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-btn
                  class="font-weight-bold my-2 white--text"
                  @click="sell_month_dom()"
                  color="primary"
                  light
                  :loading="loadingBtn"
                  :disabled="
                    form.start_date_month === null ||
                    form.end_date_month === null
                  "
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.sell_month_stat_launch"
                    )
                  }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas height="110vh" id="domaine_chart"></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--            <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--              <v-progress-circular-->
            <!--                  size="50"-->
            <!--                  indeterminate-->
            <!--                  color="primary"-->
            <!--              ></v-progress-circular>-->
            <!--            </v-card-text>-->
          </v-card-text>
        </v-card>
        <br />
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.titlestat_best_selling_products"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.productAvailable"
                  :items="itemsProductAvailable"
                  :loading="isLoadingAvailable"
                  :search-input.sync="searchAvailable"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold my-2"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu4"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_best_selling"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.start_appointment_date.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.start_date_best_selling"
                    :max="maxDate"
                    color="primary"
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu5"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_best_selling"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.end_appointment_date.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.end_date_best_selling"
                    :max="maxDate"
                    :min="getminDateBestSell"
                    color="primary"
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-btn
                  class="font-weight-bold my-2 white--text"
                  @click="stat_best_selling_products()"
                  color="primary"
                  light
                  :loading="loadingBtn"
                  :disabled="
                    form.start_date_best_selling === null ||
                    form.end_date_best_selling === null
                  "
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.sell_month_stat_launch"
                    )
                  }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row wrap style="margin-top: -25px">
              <v-spacer></v-spacer>
              <v-col cols="12" sm="3">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{
                    $vuetify.lang.t("$vuetify.statistics.total_gross_margin")
                  }}
                  : {{ Intl.NumberFormat().format(this.gross_margin) }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.statistics.total_ca") }}
                  : {{ Intl.NumberFormat().format(this.turnover) }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.statistics.total_pourcent_ca") }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_pourcent_ca_total * 100) / 100
                    )
                  }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
          <br />
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions,
              }"
              :headers="headers"
              :items="items_best_selling"
              :items-per-page="itemPerPage"
              :loading="loading.list"
              :options.sync="pagination"
              :server-items-length="meta.totalElements"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              item-key="name"
              class="mb-15"
              style="margin-top: -25px"
            >
              <template v-slot:header.name="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.category="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.quantity_served="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr> </template
              ><template v-slot:header.turnover="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.gross_margin="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.percent_turnover="{ header }">
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
                      <td class="subtitle-2">{{ item.name }}</td>
                      <td class="subtitle-2" v-if="item.category === null"></td>
                      <td class="subtitle-2" v-else>
                        {{ item.category }}
                      </td>
                      <td class="subtitle-2">{{ item.quantity_served }}</td>
                      <td class="subtitle-2">{{ item.turnover }}</td>
                      <td class="subtitle-2">{{ item.gross_margin }}</td>
                      <td class="subtitle-2">
                        {{ (item.turnover / get_ca_total).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
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
          start_date_best_selling: null,
          end_date_cat: null,
          end_date_best_selling: null,
        };
      },
    },
  },
  data() {
    return {
      urlItemsStat_best_selling_products: "/bills/stat_best_selling_products",
      urlItemsStat_day_month: "/bills/stat_day_month",
      urlItems: "/bills/statistic_product",
      urlItemsDom: "/bills/statistic_product",
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
      items_best_selling: [],
      menu: false,
      labels: [],
      values: [],
      menu3: false,
      menu2: false,
      menu4: false,
      menu5: false,
      menu6: false,
      chartOptions: {},
    };
  },
  mounted() {
    this.getItems();
    this.stat_best_selling_products();
    // this.sell_month_stat();
    this.sell_month_dom();
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
            url: self.urlItemsStat_day_month,
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
    stat_best_selling_products() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_best_selling_products,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            if (data.content.product.length > 20) {
              data.content.product.length = 20;
              self.items_best_selling = data.content.product;
              self.turnover = data.content.turnover;
              self.gross_margin = data.content.gross_margin;
            } else {
              self.items_best_selling = data.content.product;
              self.turnover = data.content.turnover;
              self.gross_margin = data.content.gross_margin;
            }

            // let statP = Object.entries(data.content)
            // this.chartData=statP.length===1? []:Object.entries(data.content);
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
    sell_month_dom() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDom,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            let chart;
            // let statP = Object.entries(data.content.stat_category);
            this.labels = data.labels;
            this.values = data.values;
            if (chart) {
              chart.destroy();
              chart = new Chart(document.getElementById("domaine_chart"), {
                type: "bar",
                data: {
                  labels: this.labels,
                  datasets: [
                    {
                      label: "Chiffre d'affaires",
                      backgroundColor: ["#006B98"],
                      borderColor: ["#E9EEF4"],
                      data: this.values,
                      borderWidth: 3,
                    },
                  ],
                },
              });
            } else {
              chart = new Chart(document.getElementById("domaine_chart"), {
                type: "bar",
                data: {
                  labels: this.labels,
                  datasets: [
                    {
                      label: "Chiffre d'affaires",
                      backgroundColor: ["#006B98"],
                      borderColor: ["#E9EEF4"],
                      data: this.values,
                      borderWidth: 3,
                    },
                  ],
                },
              });
            }

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
