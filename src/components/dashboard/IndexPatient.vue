<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
    v-if="_.includes($auth.user().permissions, 'view_dashboard_doctor')"
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
            {{ $vuetify.lang.t("$vuetify.statistics.patient_gender") }}
          </h3>
          <canvas height="1vh" id="patient_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.doctor_type") }}
          </h3>
          <canvas height="1vh" id="doctor_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{
              $vuetify.lang.t("$vuetify.statistics.appointment_state_patient")
            }}
          </h3>
          <canvas height="1vh" id="app_shape_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.appointment_status") }}
          </h3>
          <canvas height="1vh" id="status_chart"></canvas>
        </v-card>
      </v-col>
    </v-row>
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
                  @click="sell_month_day() + appointment_month_day()"
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
      <v-col cols="12" sm="12" class="mb-0 py-0">
        <v-card height="" flat color="#FAFAFA">
          <v-card-text style="margin-left: -15px">
            <v-row wrap>
              <v-col cols="12" sm="11" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-1">
                  {{ $vuetify.lang.t("$vuetify.statistics.appointments") }}
                </h3>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text style="margin-top: -15px">
            <v-row class="fill-height">
              <v-col>
                <v-sheet height="64">
                  <v-toolbar flat>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                      <v-icon small> mdi-chevron-left </v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                      <v-icon small> mdi-chevron-right </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                      {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <template> </template>
                    <v-btn
                      :loading="loading.refresh"
                      @click="refreshItemsEvents()"
                      class="mr-2 my-2"
                      depressed
                      color="#f1f5fc"
                    >
                      <v-icon left color="primary">mdi-refresh</v-icon>
                      {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
                    </v-btn>
                    <v-menu bottom right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          outlined
                          color="grey darken-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <span>{{ typeToLabel[type] }}</span>
                          <v-icon right> mdi-menu-down </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item @click="type = 'day'">
                          <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                          <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                          <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                          <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                  <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :type="type"
                    :loading="loading.list"
                    @click:more="viewDay"
                    @click:date="viewDay"
                  ></v-calendar>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="11" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{ $vuetify.lang.t("$vuetify.statistics.appointment_days") }}
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
                        @click="export_appointment_month_day()"
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
                        @click="export_image_appointment_month_day()"
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
                id="appointment_chart"
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
import ListMixin from "./../../mixins/Common/List.vue";
const FileSaver = require("file-saver");
// import Table from "./Table";
// import History from "./History";
// import Appointment from "./Appointment";
export default {
  mixins: [ListMixin],
  name: "Home",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          date_month: null,
        };
      },
    },
  },
  data: () => ({
    urlItemsStatSecretariat: "/bills/stat_secretariat",
    urlItemsDays: "/patients/days_patients",
    urlItemsDaysAppointment: "/appointments/days_appointment",
    urlItems: "appointments",
    urlItemsAll: "appointments/all",
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    items: [],
    itemsDays: [],
    itemsDaysAppointment: [],
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
    loadingAppointment: {
      list: false,
      refresh: false,
      filter: false,
    },
    menu7: false,
    menu6: false,
    labelsPatient: [],
    valuesPatient: [],
    labelsShape: [],
    valuesShape: [],
    labelsDoctor: [],
    valuesDoctor: [],
    labelsDays: [],
    valuesDays: [],
  }),
  mounted() {
    this.getItems();
    this.sell_month_day();
    this.appointment_month_day(), this.$refs.calendar.checkChange();
    this.getItemsEvents();
    // this.timer = setInterval(this.getItems, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
    // this.timer = setInterval(this.appointment_month_day, 30000);
    // if (window.location.reload()){
    // }
  },
  methods: {
    refreshItems() {
      this.getItems();
      this.sell_month_day();
      this.appointment_month_day();
      this.getItemsEvents();
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getItemsEvents() {
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
            url: self.urlItemsAll + "?patient=" + this.$auth.user().patient.id,
            params: params,
          })
          .then((response) => {
            this.events = [];
            let data = response.data;
            self.items = data.content;
            const events = response.data.content;
            for (const item of events) {
              const department = item.department;
              const appointment_status = item.appointment_status;
              const appointment_type = item.appointment_type;
              const patient_shape = item.patient_shape;

              const problem = item.problem;
              const start_appointment_date = item.start_appointment_date;
              const end_appointment_date = item.end_appointment_date;
              const start_appointment_hour = item.start_appointment_hour;
              const end_appointment_hour = item.end_appointment_hour;
              const patient = item.patient;
              const doctor = item.doctor;
              const id = item.id;

              const start =
                item.start_appointment_date + " " + item.start_appointment_hour;
              const end =
                item.end_appointment_date + " " + item.end_appointment_hour;
              const color = item.color;
              const name = item.patient.name + " / " + item.doctor.name;
              this.events.push({
                department,
                appointment_status,
                appointment_type,
                patient_shape,
                problem,
                start_appointment_date,
                start_appointment_hour,
                end_appointment_hour,
                patient,
                doctor,
                end_appointment_date,
                id,
                name,
                start,
                end,
                color,
              });
            }
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
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_image_appointment_month_day() {
      let canvas = document
        .getElementById("appointment_chart")
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
    export_appointment_month_day() {
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
        date_month: this.form.date_month,
        type: "patient",
        doctor: this.$auth.user().patient.id,
      };
      return data;
    },
    appointment_month_day() {
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingAppointment.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDaysAppointment,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDaysAppointment = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("appointment_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDaysAppointment = [];
            this.valuesDaysAppointment = [];
            for (const prop of data.content) {
              this.labelsDaysAppointment.push(prop.days);
              this.valuesDaysAppointment.push(prop.turnover);
            }
            new Chart(document.getElementById("appointment_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  // Change options for ALL labels of THIS CHART
                  datalabels: {
                    anchor: "end",
                    align: "top",
                    color: "black",
                    backgroundColor: "#ccc",
                    borderRadius: 4,
                    offset: 10,
                    formatter: (value) => {
                      return value;
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDaysAppointment,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDaysAppointment,
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
            self.loadingAppointment.list = false;
            resolve();
          });
      });
    },
    sell_month_day() {
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDays,
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
                  // Change options for ALL labels of THIS CHART
                  datalabels: {
                    anchor: "end",
                    align: "top",
                    color: "black",
                    backgroundColor: "#ccc",
                    borderRadius: 4,
                    offset: 10,
                    formatter: (value) => {
                      return value;
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDays,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#3a90cd"],
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
    getItems() {
      let self = this;
      this.$refs.menu7.save(this.form.date_month);
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsStatSecretariat,
            method: self.getMethod(),
            data: self.getDataForm(),
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
            let chartPatient = Chart.getChart("patient_chart");
            if (chartPatient !== undefined) {
              chartPatient.destroy();
            }
            this.labelsPatient = [];
            this.valuesPatient = [];

            let chartShape = Chart.getChart("app_shape_chart");
            if (chartShape !== undefined) {
              chartShape.destroy();
            }
            this.labelsShape = [];
            this.valuesShape = [];

            let chartDoctor = Chart.getChart("doctor_chart");
            if (chartDoctor !== undefined) {
              chartDoctor.destroy();
            }
            this.labelsDoctor = [];
            this.valuesDoctor = [];
            for (const prop of data.content.appointments_status) {
              this.labels.push(
                this.$vuetify.lang.t(
                  "$vuetify.appointment.cols.appointment_status." + prop.status
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
            for (const prop of data.content.patients) {
              this.labelsPatient.push(
                this.$vuetify.lang.t("$vuetify.users.cols.gender." + prop.type)
              );
              this.valuesPatient.push(prop.total);
            }
            new Chart(document.getElementById("patient_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsPatient,
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
                    data: this.valuesPatient,
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
            for (const prop of data.content.appointments_shape) {
              this.labelsShape.push(
                this.$vuetify.lang.t(
                  "$vuetify.patient.cols.patient_shape." + prop.shape
                )
              );
              this.valuesShape.push(prop.total);
            }
            new Chart(document.getElementById("app_shape_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsShape,
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
                    data: this.valuesShape,
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

            for (const prop of data.content.doctors) {
              this.labelsDoctor.push(
                this.$vuetify.lang.t(
                  "$vuetify.patient.cols.appointment_type." + prop.types
                )
              );
              this.valuesDoctor.push(prop.total);
            }
            new Chart(document.getElementById("doctor_chart"), {
              // type:'radar',
              type: "doughnut",
              data: {
                labels: this.labelsDoctor,
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
                    data: this.valuesDoctor,
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
