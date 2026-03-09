<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ this.$route.params.name }}
    </div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!--        <template v-if="$auth.check(['ADMIN', 'CASHIER'])">-->
        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            @click="create()"-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            v-if="this.isActive === 'true'"-->
        <!--          >-->
        <!--            <v-icon left>mdi-receipt</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <v-row wrap>
          <v-col cols="12" sm="8" class="mb-0 py-0"> </v-col>

          <v-col cols="12" sm="2" class="mb-0 py-0">
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
                  v-model="filter.start_date"
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
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.start_date"
                :max="maxDateStat"
                color="primary"
                @change="getItems"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2" class="mb-0 py-0">
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
                  v-model="filter.end_date"
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
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.end_date"
                :max="maxDateStat"
                :min="getminDate"
                color="primary"
                @change="getItems"
                @input="menu6 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <!--              <v-col cols="12" sm="2" class="mb-0 py-0">-->
          <!--                <v-btn-->
          <!--                  class="font-weight-bold my-2 white&#45;&#45;text"-->
          <!--                  @click="sell_month_dom()"-->
          <!--                  color="primary"-->
          <!--                  light-->
          <!--                  :loading="loadingBtn"-->
          <!--                  :disabled="-->
          <!--                    form.start_date_month === null ||-->
          <!--                      form.end_date_month === null-->
          <!--                  "-->
          <!--                >-->
          <!--                  {{-->
          <!--                    $vuetify.lang.t(-->
          <!--                      "$vuetify.statistics.sell_month_stat_launch"-->
          <!--                    )-->
          <!--                  }}-->
          <!--                </v-btn>-->
          <!--              </v-col>-->
        </v-row>
      </div>
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
        class="mt-5"
        v-if="this.isActive === true && this.isInventory === false"
      >
        <template v-slot:header.bill_N="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.arrival_date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.date_bill="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.patient_name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.patient_type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.cashier="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--<template v-slot:header.is_active="{ header }">-->
        <!--<tr>-->
        <!--{{-->
        <!--$vuetify.lang.t(header.text)-->
        <!--}}-->
        <!--</tr>-->
        <!--</template>-->
        <template v-slot:header.net_payable="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.advance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.balance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.null="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:body="{ items }">
          <v-hover>
            <tbody slot-scope="{ hover }">
              <tr :key="item.id" v-for="item in items">
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2" v-if="item.patient.shape === 'NORMAL'">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.patient.cols.patient_shape." +
                        item.patient.shape
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.patient.shape === 'COVERED'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.patient.cols.patient_shape." +
                        item.patient.shape
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.patient.shape === 'EMPLOYEE'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.patient.cols.patient_shape." +
                        item.patient.shape
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.patient.shape === 'INDIGENT'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.patient.cols.patient_shape." +
                        item.patient.shape
                    )
                  }}
                </td>

                <td class="subtitle-2" v-else>/</td>
                <td class="subtitle-2">
                  {{ item.cash.user.username }}
                </td>
                <td class="subtitle-2">
                  {{ item.net_payable }}
                </td>
                <td class="subtitle-2">
                  {{ item.advances }}
                </td>
                <td class="subtitle-2">
                  {{ item.balance.toFixed(2) }}
                </td>

                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'change_bills')
                        "
                      >
                        <v-btn
                          @click="editBills(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-update</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                    </v-tooltip>
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-bills
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="billsForm"
      ></form-bills>
      <!--      <form-enable-->
      <!--        :dialog="dialogForm"-->
      <!--        ref="accountedBills"-->
      <!--        :messages="messages"-->
      <!--        @getItems="getItems"-->
      <!--      ></form-enable>-->
    </v-card>
  </div>
</template>

<script>
import FormBills from "./FormBills";
import ListMixin from "./../../mixins/Common/List.vue";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItemsCash: "cashs/isOpen",
    urlItems: "details_bills/bills_medical_act",
    sortBy: ["createdAt"],
    menu: false,
    menu6: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormCash: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    isActive: false,
    isInventory: false,
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    form: {
      id: null,
      patient: null,
      doctor: null,
      patient_name: null,
      patient_balance: null,
      net_payable: null,
      patient_type: null,
      pub: null,
      pun: null,
      amount_gross: null,
      quantity_ordered: null,
      amount_net: null,
      total_amount: null,
      quantity_served: null,
      product: null,
      delivery: null,
      bills: null,
      reference_no: null,
      additional_info: null,
      bills_amount: null,
      code: null,
      cashier: null,
      bill_type: null,
      advances: null,
      bill_shape: null,
      storage_depots: null,
    },
    maxDateStat: new Date().toISOString().substr(0, 10),
    filter: {
      start_date: null,
      end_date: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.bills.delete.success",
    },
  }),
  computed: {
    getminDate() {
      let minDateStat = "";
      minDateStat = new Date(this.filter.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
  },
  mounted() {
    this.getOpenCash();
    this.getItems();
  },
  methods: {
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsCash,
          })
          .then((response) => {
            let data = response.data;
            self.isActive = data.content.is_active;
            self.isInventory = data.content.is_inventory;
            if (self.isActive === false) {
              if (self.isInventory === false) {
                this.createCash();
              } else {
                this.currentInventory();
              }
            } else {
              self.isActive = data.content.is_active;
              if (self.isInventory === true) {
                this.currentInventory();
              }
            }

            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    createCash() {
      this.dialogFormCash.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    currentInventory() {
      this.dialogFormInv.show = true;
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };

      params["medical_act"] = this.$route.params.id;
      if (self.filter.start_date !== null) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
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
          text: "$vuetify.bills.cols.date_bill.title",
          value: "date_bill",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.patient_name.title",
          value: "patient_name",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.patient_type.title",
          value: "patient_type",
          align: "start",
          sortable: true,
          width: "6",
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
          text: "$vuetify.bills.cols.net_payable.title",
          value: "net_payable",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.advance.title",
          value: "advance",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.balance.title",
          value: "balance",
          align: "start",
          sortable: true,
          width: "6",
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
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.bills.new.title",
        submit: "$vuetify.bills.new.submit",
        success: "$vuetify.bills.new.success",
      };
      this.form = {
        id: null,
        patient: null,
        doctor: null,
        patient_name: null,
        patient_balance: null,
        net_payable: null,
        patient_type: null,
        pub: null,
        pun: null,
        amount_gross: null,
        quantity_ordered: null,
        amount_net: null,
        total_amount: null,
        quantity_served: null,
        product: null,
        delivery: null,
        bills: null,
        reference_no: null,
        additional_info: null,
        bills_amount: null,
        code: null,
        cashier: null,
        bill_type: null,
        advances: null,
        bill_shape: null,
        storage_depots: null,
      };
    },
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

    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.billsname !== null) {
        params["billsname"] = self.filter.billsname;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
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
  components: {
    FormBills,
  },
};
</script>

<style scoped></style>
