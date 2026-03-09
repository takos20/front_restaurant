<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
    v-if="
      _.includes($auth.user().permissions, 'view_dashboard_hospitalization')
    "
  >
    <br />
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
    <v-row>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.room.titleStat") }}
          </h3>
          <canvas height="1vh" id="room_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.room.cols.book.title") }}
          </h3>
          <canvas height="1vh" id="room_book_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.bed.titleStat") }}
          </h3>
          <canvas height="1vh" id="bed_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.hospitalization.titleStat") }}
          </h3>
          <canvas height="1vh" id="status_chart"></canvas>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <br />
    <v-card height="50px" flat color="#FAFAFA">
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="2">
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
                  style="margin-top: -10px"
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
                <v-btn
                  text
                  color="primary"
                  @click="sell_month_day() + sell_accommodation_month_day()"
                >
                  {{ $vuetify.lang.t("$vuetify.ok") }}
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="10" class="mb-0 py-0"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <v-row>
      <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="11" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_day") }}
                </h3>
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
          <br />
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="day_chart"
                style="margin-top: -70px"
              ></canvas>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="11" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.hospitalization.cols.type_accommodation.title"
                    )
                  }}
                </h3>
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
                      <v-btn
                        dark
                        color="primary"
                        @click="export_accommodation_month_day()"
                      >
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
                        @click="export_image_accommodation_month_day()"
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
          <br />
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="accommodation_chart"
                style="margin-top: -70px"
              ></canvas>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
const FileSaver = require("file-saver");
// import Table from "./Table";
// import History from "./History";
// import Appointment from "./Appointment";
export default {
  name: "Home",
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
          date_month_accommodation: null,
          end_date_cat: null,
        };
      },
    },
  },
  data: () => ({
    urlItemsStatSecretariat: "/rooms/stat_room",
    urlItemsStatHospitalization: "/hospitalizations/statistics",
    urlItemsDays: "/bills/statistic_product_days",
    urlItemsDaysAccommodation: "/bills/statistic_accommodation",
    items: [],
    itemsDays: [],
    itemsDaysAccommodation: [],
    json_fields: {
      Date: "days",
      CA: "turnover",
    },
    labels: [],
    values: [],
    maxDate: new Date().toISOString().substr(0, 10),
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingAccommodation: {
      list: false,
      refresh: false,
      filter: false,
    },
    menu7: false,
    menu6: false,
    labelsRoomTakes: [],
    valuesRoomTakes: [],
    labelsBedTakes: [],
    valuesBedTakes: [],
    labelsRoomBook: [],
    valuesRoomBook: [],
    labelsDaysAccommodation: [],
    valuesDaysAccommodationk: [],
    labelsDays: [],
    valuesDays: [],
  }),
  mounted() {
    this.getItems();
    this.sell_month_day();
    this.sell_accommodation_month_day();
    // this.timer = setInterval(this.getItems, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
    // this.timer = setInterval(this.sell_accommodation_month_day, 30000);
    // if (window.location.reload()){
    // }
  },
  methods: {
    refreshItems() {
      this.getItems();
      this.sell_month_day();
      this.sell_accommodation_month_day();
    },
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_image_accommodation_month_day() {
      let canvas = document
        .getElementById("accommodation_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
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
    export_accommodation_month_day() {
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
    getDataForm() {
      let data = {
        date_month_accommodation: this.form.date_month,
        date_month: this.form.date_month,
        start_date_dom: this.form.start_date_cat,
        product_available: this.form.productAvailable,
        start_date_best_selling: this.form.start_date_best_selling,
        end_date_best_selling: this.form.end_date_best_selling,
        end_date_dom: this.form.end_date_cat,
      };
      return data;
    },
    sell_month_day() {
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDays + "?type=hospitalization",
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
    sell_accommodation_month_day() {
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingAccommodation.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDaysAccommodation,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDaysAccommodation = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("accommodation_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDaysAccommodation = [];
            this.valuesDaysAccommodation = [];
            for (const prop of data.content) {
              this.labelsDaysAccommodation.push(
                this.$vuetify.lang.t(
                  "$vuetify.hospitalization.cols.type_accommodation." +
                    prop.accommodation
                )
              );
              this.valuesDaysAccommodation.push(prop.turnover);
            }
            new Chart(document.getElementById("accommodation_chart"), {
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
                labels: this.labelsDaysAccommodation,
                datasets: [
                  {
                    label: "Chiffre d'affaires",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDaysAccommodation,
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
            self.loadingAccommodation.list = false;
            resolve();
          });
      });
    },
    getItems() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsStatHospitalization,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            let chartStatus = Chart.getChart("status_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labels = [];
            this.values = [];
            let chartRoomTakes = Chart.getChart("room_chart");
            if (chartRoomTakes !== undefined) {
              chartRoomTakes.destroy();
            }
            this.labelsRoomTakes = [];
            this.valuesRoomTakes = [];

            let chartBedTakes = Chart.getChart("bed_chart");
            if (chartBedTakes !== undefined) {
              chartBedTakes.destroy();
            }
            this.labelsBedTakes = [];
            this.valuesBedTakes = [];

            let chartRoomBook = Chart.getChart("room_book_chart");
            if (chartRoomBook !== undefined) {
              chartRoomBook.destroy();
            }
            this.labelsRoomBook = [];
            this.valuesRoomBook = [];
            for (const prop of data.content.status_occupation) {
              this.labels.push(
                this.$vuetify.lang.t(
                  "$vuetify.hospitalization.cols.status_occupation." +
                    prop.statut
                )
              );
              this.values.push(prop.total);
            }
            new Chart(document.getElementById("status_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labels,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#3a90cd", "#8e5ea2"],
                    borderColor: ["#E9EEF4"],
                    data: this.values,
                    borderWidth: 3,
                  },
                ],
              },
              options: {
                plugins: {
                  doughnutlabel: {
                    labels: [
                      { text: "550", font: { size: 20 } },
                      { text: "total" },
                    ],
                  },
                },
              },
            });
            for (const prop of data.content.room_take) {
              this.labelsRoomTakes.push(
                this.$vuetify.lang.t("$vuetify.room.cols.takes." + prop.isTakes)
              );
              this.valuesRoomTakes.push(prop.total);
            }
            new Chart(document.getElementById("room_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsRoomTakes,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#3a90cd", "#8e5ea2"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesRoomTakes,
                    borderWidth: 3,
                  },
                ],
              },
              options: {
                plugins: {
                  doughnutlabel: {
                    labels: [
                      { text: "550", font: { size: 20 } },
                      { text: "total" },
                    ],
                  },
                },
              },
            });

            for (const prop of data.content.bed_take) {
              this.labelsBedTakes.push(
                this.$vuetify.lang.t("$vuetify.bed.cols.takes." + prop.isTakes)
              );
              this.valuesBedTakes.push(prop.total);
            }
            new Chart(document.getElementById("bed_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsBedTakes,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#3a90cd", "#8e5ea2"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesBedTakes,
                    borderWidth: 3,
                  },
                ],
              },
              options: {
                plugins: {
                  doughnutlabel: {
                    labels: [
                      { text: "550", font: { size: 20 } },
                      { text: "total" },
                    ],
                  },
                },
              },
            });

            for (const prop of data.content.room_book) {
              this.labelsRoomBook.push(
                this.$vuetify.lang.t("$vuetify.room.cols.book." + prop.isBook)
              );
              this.valuesRoomBook.push(prop.total);
            }
            new Chart(document.getElementById("room_book_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsRoomBook,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#3a90cd", "#8e5ea2"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesRoomBook,
                    borderWidth: 3,
                  },
                ],
              },
              options: {
                plugins: {
                  doughnutlabel: {
                    labels: [
                      { text: "550", font: { size: 20 } },
                      { text: "total" },
                    ],
                  },
                },
              },
            });
            // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
            // let statP = Object.entries(self.items?.stat_product);
            // self.chartData =
            //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
            // console.log("meta", data.content[0]);
            resolve(response);
          });
      });
    },
  },
  components: {
    // History,
    // Appointment,
    // Table
  },
};
</script>
<style scoped>
.border {
  border: 2px solid #2ebfaf !important;
}
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top {
  top: 65px !important;
}
.v-btn--absolute.v-btn--left,
.v-btn--fixed.v-btn--left {
  left: -26px !important;
}
</style>
