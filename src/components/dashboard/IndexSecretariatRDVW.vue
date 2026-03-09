<template>
  <v-card height="" flat color="#FAFAFA">
    <v-card-text>
      <v-row wrap>
        <v-col cols="12" sm="11" class="mb-0 py-0">
          <h3 style="padding-left: 15px" class="my-4">
            {{ $vuetify.lang.t("$vuetify.statistics.patient_waiting_room") }}
          </h3>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headersWaiting"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loading.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="patient"
        class="mt-5"
      >
        <template v-slot:header.name_patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.age="{ header }">
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
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.age }}
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
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
    urlItems: null,
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
    menu7: false,
    menu6: false,
  }),
  mounted() {
    // this.getItemsRDV();
    this.timer = setInterval(this.getItemsRDV(), 20000);
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
      this.getItemsRDV();
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getDataForm() {
      let data = {
        date_month: this.form.date_month,
      };
      return data;
    },
    getItemsRDV() {
      let self = this;
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      self.urlItems =
        this.$auth.user().type == "DOCTOR"
          ? self.urlItemsAppointments + "?doctor=" + this.$auth.user().doctor.id
          : this.$auth.user().type == "PATIENT"
          ? self.urlItemsAppointments +
            "?patient=" +
            this.$auth.user().patient.id
          : self.urlItemsAppointments +
            "?start_appointment_date=" +
            currentDate +
            "&&appointment_status=PENDING";
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
            self.items = data.content.filter(
              (r) =>
                r.appointment_status == "WAITING" &&
                r.start_appointment_date ==
                  new Date().toISOString().substr(0, 10)
            );
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
