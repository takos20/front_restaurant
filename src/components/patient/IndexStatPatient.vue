<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.patient.title") }} :
      {{ this.$route.params.name }}
    </div>
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
      <v-col cols="12" sm="12" class="mt-5">
        <bills color="black" :id="this.$route.params.id"></bills>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Bills from "./../../components/patient/IndexBills";
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
    this.stat_best_selling_products(); // this.sell_month_stat();
  },
  components: {
    Bills,
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
