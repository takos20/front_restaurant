<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
    v-if="_.includes($auth.user().permissions, 'view_dashboard_secretariat')"
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
          <v-col cols="12" sm="5" style="margin-top: -10px" class="mb-0 py-0">
          </v-col>
          <v-col cols="12" sm="5" style="margin-top: 5px" class="mb-0 py-0">
            <v-btn
              depressed
              class="font-weight-bold white--text"
              color="btn_logout"
            >
              {{ $vuetify.lang.t("$vuetify.statistics.employee_number") }}:
              {{ this.employee_number }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <v-row>
      <v-col cols="12" sm="4" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.employee_gender") }}
          </h3>
          <canvas height="1vh" id="employee_gender_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.employee_department") }}
          </h3>
          <canvas height="1vh" id="employee_department_chart"></canvas>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.employee_type_contract") }}
          </h3>
          <canvas height="1vh" id="employee_type_chart"></canvas>
        </v-card>
      </v-col>
      <!-- <v-col cols="12" sm="3" class="mb-0 py-0 mt-2">
        <v-card height="" flat color="#FAFAFA">
          <h3 align="center">
            {{ $vuetify.lang.t("$vuetify.statistics.appointment_status") }}
          </h3>
          <canvas height="1vh" id="status_chart"></canvas>
        </v-card>
      </v-col> -->
    </v-row>
  </v-app>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
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
    urlItemsStatEmployee: "/employees/statistics",
    urlItemsDays: "/patients/days_patients",
    urlItemsDaysAppointment: "/appointments/days_appointment",
    items: [],
    itemsDays: [],
    itemsDaysAppointment: [],
    json_fields: {
      Date: "days",
      CA: "turnover",
    },
    labels: [],
    values: [],
    urlItemsAppointments: "/appointments",
    sortBy: ["id"],
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
    employee_number: null,
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
    // this.timer = setInterval(this.getItems, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
    // this.timer = setInterval(this.appointment_month_day, 30000);
    // if (window.location.reload()){
    // }
  },
  methods: {
    setHeadersWaiting() {
      this.headersWaiting = [
        {
          text: "$vuetify.prescription.cols.patient.title",
          value: "name_patient",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.age.title",
          value: "age",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
      ];
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.prescription.cols.patient.title",
          value: "name_patient",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.patient_shape.title",
          value: "patient_shape",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patient.cols.appointment_type.title",
        //   value: "appointment_type",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.dealing_with.title",
          value: "name_doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.appointment.cols.appointment_status.title",
          value: "appointment_status",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.appointment.cols.appointment_hour.title",
          value: "appointment_hour",
          align: "start",
          sortable: true,
          width: "130",
          class: "grey--text text--darken-3",
        },
      ];
    },
    refreshItems() {
      this.getItems();
    },
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
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
    getDataForm() {
      let data = {
        date_month: this.form.date_month,
      };
      return data;
    },
    getItems() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsStatEmployee,
            method: "GET",
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.employee_number = data.content.employee;
            // let chartStatus = Chart.getChart("status_chart");
            // if (chartStatus !== undefined) {
            //   chartStatus.destroy();
            // }
            this.labels = [];
            this.values = [];
            let chartPatient = Chart.getChart("employee_gender_chart");
            if (chartPatient !== undefined) {
              chartPatient.destroy();
            }
            this.labelsPatient = [];
            this.valuesPatient = [];

            let chartShape = Chart.getChart("employee_type_chart");
            if (chartShape !== undefined) {
              chartShape.destroy();
            }
            this.labelsShape = [];
            this.valuesShape = [];

            let chartDoctor = Chart.getChart("employee_department_chart");
            if (chartDoctor !== undefined) {
              chartDoctor.destroy();
            }
            this.labelsDoctor = [];
            this.valuesDoctor = [];
            // for (const prop of data.content.appointments_status) {
            //   this.labels.push(
            //     this.$vuetify.lang.t(
            //       "$vuetify.appointment.cols.appointment_status." + prop.status
            //     )
            //   );
            //   this.values.push(prop.total);
            // }
            // new Chart(document.getElementById("status_chart"), {
            //   // type:'radar',
            //   type: "doughnut",
            //   data: {
            //     labels: this.labels,
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
            //           "#fffe7a"
            //         ],
            //         borderColor: ["#E9EEF4"],
            //         data: this.values,
            //         borderWidth: 3
            //       }
            //     ]
            //   },
            //   options: {
            //     plugins: {
            //       datalabels: {
            //         display: true,
            //         align: "middle",
            //         color: "white",
            //         font: {
            //           size: 15
            //         }
            //       }
            //     }
            //   }
            // });
            for (const prop of data.content.employee_gender) {
              this.labelsPatient.push(
                this.$vuetify.lang.t("$vuetify.users.cols.gender." + prop.type)
              );
              this.valuesPatient.push(prop.total);
            }
            new Chart(document.getElementById("employee_gender_chart"), {
              // type:'radar',
              type: "pie",
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
            });
            for (const prop of data.content.employee_type_contract) {
              this.labelsShape.push(prop.type);
              this.valuesShape.push(prop.total);
            }
            new Chart(document.getElementById("employee_type_chart"), {
              // type:'radar',
              type: "pie",
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
            });

            for (const prop of data.content.employee_service) {
              this.labelsDoctor.push(prop.service_name);
              this.valuesDoctor.push(prop.total);
            }
            new Chart(document.getElementById("employee_department_chart"), {
              // type:'radar',
              type: "pie",
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
