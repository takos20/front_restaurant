<template>
  <div>
    <div
      class="title mb-5 white--text teal darken-1 text-center"
      style="height: 30px; margin-top: 30px"
    >
      {{ $vuetify.lang.t("$vuetify.patient.title") }}:{{
        this.$route.params.name
      }}
    </div>
    <br />
    <v-card class="pb-4">
      <div class="mt-5 ml-5">
        <template
          v-if="_.includes($auth.user().permissions, 'view_cash_control')"
        >
          <v-row>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="black"
                color="#f1f5fc"
                medium
                label
              >
                {{ $vuetify.lang.t("$vuetify.patient.cols.balance.title") }} :
                {{ Intl.NumberFormat().format(this.itemsInfoSup["solde"]) }}
                FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                label
              >
                {{ $vuetify.lang.t("$vuetify.patient.cols.total_bills.title") }}
                :
                {{
                  Intl.NumberFormat().format(this.itemsInfoSup["total_bills"])
                }}
                FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="red accent-4"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t("$vuetify.patient.cols.total_payment.title")
                }}
                :
                {{
                  Intl.NumberFormat().format(this.itemsInfoSup["total_payment"])
                }}
                FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
          </v-row>
        </template>

        <!--        <template-->

        <!--        >-->
        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            @click="open(cash)"-->
        <!--            color="teal darken-1"-->
        <!--            dark-->
        <!--            v-if="$auth.check(['ADMIN','RESPONSIBLE' , 'CASHIER']) && this.isActive ==='false'"-->
        <!--          >-->
        <!--            {{ $vuetify.lang.t("$vuetify.cash.cols.status.titleOpen") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
      </div>
    </v-card>
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
      <v-col cols="12" sm="12" class="mt-5">
        <bills color="black" :id="this.$route.params.id"></bills>
      </v-col>
      <v-col cols="12" sm="12" class="mt-5">
        <consultation color="black" :id="this.$route.params.id"></consultation>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <ordinance color="black" :id="this.$route.params.id"></ordinance>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <surgery color="black" :id="this.$route.params.id"></surgery>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <laboratory color="black" :id="this.$route.params.id"></laboratory>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <radiography color="black" :id="this.$route.params.id"></radiography>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <diagnostic color="black" :id="this.$route.params.id"></diagnostic>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <examinvest color="black" :id="this.$route.params.id"></examinvest>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Bills from "./../../components/patient/IndexBills";
import Consultation from "./../../components/patient/IndexConsultation";
import Ordinance from "./../../components/patient/IndexOrdinance";
import Surgery from "./../../components/patient/IndexSurgery";
import Laboratory from "./../../components/patient/IndexLabo";
import Radiography from "./../../components/patient/IndexRadio";
import Diagnostic from "./../../components/patient/IndexDiagnostic";
import Examinvest from "./../../components/patient/IndexExamInvest";
export default {
  name: "Dashboard",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          start_date: null,
          end_date: null,
        };
      },
    },
  },
  data() {
    return {
      urlItemsStat_best_selling_products: "/bills/stat_act_patient",
      urlItemsInfoSup: "/patients/infoSup",
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
      pagination: {},
      supply: false,
      sortDesc: true,
      itemPerPage: 5,
      //itemPerPages: 3,
      itemPerPageOptions: [5, 10, 30],
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 7),
      loadingBtn: false,
      chartData: [],
      barChart: [],
      items_best_selling: [],
      itemsInfoSup: [],
      menu: false,
      menu3: false,
      menu2: false,
      menu4: false,
      menu5: false,
      dialogForm: {
        show: false,
        shows: {
          showFilter: false,
          showInfo: false,
        },
      },
      chartOptions: {},
    };
  },
  mounted() {
    this.stat_best_selling_products();
    this.infoSup();
    // this.sell_month_stat();
  },
  components: {
    Bills,
    Consultation,
    Ordinance,
    Surgery,
    Laboratory,
    Diagnostic,
    Examinvest,
    Radiography,
  },
  created() {
    this.setHeaders();
    //this.setItemRoles();
  },
  watch: {
    pagination: {
      handler() {
        this.stat_best_selling_products();
      },
      deep: true,
    },
  },
  computed: {
    getMinStatDate() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date)?.toISOString().substr(0, 10);
      return minDateStat;
    },
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    editBills(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.bills.update.title",
        submit: "$vuetify.bills.update.submit",
        success: "$vuetify.bills.update.success",
      };
      this.$refs.billsForm.setForm(item);
      // this.getItemsDetails();
      // this.refreshItemsDetails();
    },
    // sendId() {
    //   let id = this.$route.params.id;
    //   this.$refs.billForm.setformOther(id);
    //   // this.getItemsDetails();
    //   // this.refreshItemsDetails();
    // },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.bill_N.title",
          value: "bill_N",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.bill_type.title",
          value: "bill_type",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.doctor_name.title",
          value: "doctor_name",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.cashier.title",
          value: "cashier",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.net_payable.title2",
          value: "net_payable",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.bills.cols.advance.title",
        //   value: "advance",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.balance.title",
          value: "balance",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.date_bill.title",
          value: "date_bill",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.bills.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "6",
        },
      ];
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getDataForm() {
      let data = {
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        patient: this.$route.params.id,
      };
      return data;
    },
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
            if (data.content > 50) {
              data.content = 50;
              self.items_best_selling = data.content;
            } else {
              self.items_best_selling = data.content;
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
    infoSup() {
      let self = this;
      let params = {};
      let url;
      url =
        this.$auth.user.type == "DOCTOR"
          ? self.urlItemsInfoSup + "?doctor=" + this.$auth.user.doctor.id
          : this.$auth.user.type == "PATIENT"
          ? self.urlItemsInfoSup + "?patient=" + this.$auth.user.patient.id
          : self.urlItemsInfoSup;
      params["patient"] = this.$route.params.id;
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: url,
            method: "get",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsInfoSup = data.content;

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
