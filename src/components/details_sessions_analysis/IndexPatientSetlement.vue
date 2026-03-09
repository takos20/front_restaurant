<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 ml-5">
        <template>
          <v-row>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t("$vuetify.cash_movement.cols.type.ENTRIES")
                }}
                :
                {{ Intl.NumberFormat().format(get_sum_entry_settlement) }} FCFA
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
                {{
                  $vuetify.lang.t(
                    "$vuetify.bills.cols.amount_payment.titleCash"
                  )
                }}
                :
                {{ Intl.NumberFormat().format(this.statistics.CASH) }} FCFA
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
                {{
                  $vuetify.lang.t("$vuetify.bills.cols.amount_payment.titleOm")
                }}
                :
                {{ Intl.NumberFormat().format(this.statistics.OM) }} FCFA
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
                {{
                  $vuetify.lang.t(
                    "$vuetify.bills.cols.amount_payment.titleMomo"
                  )
                }}
                :
                {{ Intl.NumberFormat().format(this.statistics.MOMO) }} FCFA
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
                {{
                  $vuetify.lang.t(
                    "$vuetify.bills.cols.amount_payment.titleBank"
                  )
                }}
                :
                {{ Intl.NumberFormat().format(this.statistics.BANK_CARD) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip> </v-col
            ><v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t(
                    "$vuetify.bills.cols.amount_payment.titlePrepaid"
                  )
                }}
                :
                {{ Intl.NumberFormat().format(this.statistics.PREPAID) }} FCFA
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
    <v-card>
      <div class="mt-5 mx-5">
        <v-btn
          :loading="loading.refresh"
          @click="refreshItems()"
          class="mr-2 my-2"
          depressed
          color="#f1f5fc"
        >
          <v-icon left color="primary">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn>
        <!-- <template>
          <v-btn
            class="my-2 mr-2 white--text"
            @click="createPatientSettlement()"
            color="primary"
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.patients_settlements.title") }}
          </v-btn>
        </template> -->
        <v-spacer></v-spacer>
        <v-select
          v-model="filter.payment_method"
          color="primary"
          :items="optionPayment.type_Payment"
          :label="$vuetify.lang.t('$vuetify.bills.cols.payment_method.title')"
          prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
          class="text-h7 font-weight-bold"
          item-text="text"
          item-value="value"
          @change="performFilter"
          outlined
          dense
        ></v-select>
      </div>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headersSettlement"
        :items="itemsSettlement"
        :items-per-page="itemPerPage"
        :loading="loading.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        item-key="name"
        class="mt-5"
      >
        <template v-slot:header.code="{ header }">
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
        <template v-slot:header.patient_balance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_cash="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_om="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_momo="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_bank_card="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_prepaid="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_received="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_paid="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.new_balance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.null="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:body="{ items }">
          <tbody>
            <tr :key="item.id" v-for="item in items">
              <td class="subtitle-2">{{ item.code }}</td>
              <td class="subtitle-2">
                {{ item.patient.name }}
              </td>
              <td class="subtitle-2">
                <v-chip class="ma-2" color="primary" text-color="white" small>
                  {{ item.current_balance }} FCFA
                </v-chip>
              </td>

              <td class="subtitle-2">
                {{ item.amount_cash }}
              </td>
              <td class="subtitle-2">
                {{ item.amount_om }}
              </td>
              <td class="subtitle-2">
                {{ item.amount_momo }}
              </td>
              <td class="subtitle-2">
                {{ item.amount_bank_card }}
              </td>
              <td class="subtitle-2">
                {{ item.amount_prepaid }}
              </td>

              <td class="subtitle-2">
                {{ item.amount_received }}
              </td>
              <td class="subtitle-2">
                <v-chip
                  class="ma-2"
                  color="teal darken-1"
                  text-color="white"
                  small
                >
                  {{ item.amount_paid }} FCFA
                </v-chip>
              </td>
              <td class="subtitle-2">
                <v-chip
                  class="ma-2"
                  color="red accent-4"
                  text-color="white"
                  small
                >
                  {{ item.new_balance }} FCFA
                </v-chip>
              </td>

              <td class="subtitle-2">
                {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
              </td>
              <!-- <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_patientsettlement'
                          )
                        "
                      >
                        <v-btn
                          @click="editPatients_settlements(item)"
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
                    </v-tooltip> -->
              <!--<v-tooltip bottom>-->
              <!--<template-->
              <!--v-slot:activator="{ on }"-->
              <!--v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])"-->
              <!--&gt;-->
              <!--<v-btn-->
              <!--@click="deleteItem(item)"-->
              <!--color="red"-->
              <!--icon-->
              <!--text-->
              <!--v-on="on"-->
              <!--v-show="$vuetify.breakpoint.smAndDown || hover"-->
              <!--dark-->
              <!--&gt;-->
              <!--<v-icon>mdi-delete-outline</v-icon>-->
              <!--</v-btn>-->
              <!--</template>-->
              <!--<span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>-->
              <!--</v-tooltip>-->
              <!-- </template>
                </td> -->
            </tr>
          </tbody>
        </template>
      </v-data-table>
      <form-settlement
        :dialog="dialogFormPatientSettlement"
        :messages="messages"
        @getItems="getItems"
        ref="patients_settlementsForm"
      ></form-settlement>
      <!--        <form-cash-->
      <!--            :dialog="dialogFormCash"-->
      <!--            ref="cashForm"-->
      <!--            :messages="messages"-->
      <!--            @getItems="getOpenCash"-->
      <!--        ></form-cash>-->
    </v-card>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
import FormSettlement from "./../patients_settlements/Form";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/patients_settlements/all",
    urlItemsCash: "cashs/isOpen",
    sortBy: ["-id"],
    items: [],
    isActive: null,
    cash: null,
    cashs: [],
    itemsSettlement: [],
    headersSettlement: [],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormOpen: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormClose: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionPayment: {
      type_Payment: [],
    },
    dialogFormCash: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormMovement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPatientSettlement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    statistics: {},
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    form: {
      id: null,
      type: null,
      email: null,
      code: null,
      password: null,
      role: null,
      is_active: null,
    },
    filter: {
      payment_method: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.cash_movement.delete.success",
    },
  }),
  computed: {
    get_cash_fund() {
      console.log(this.cashs);
      if (this.cashs !== undefined) {
        if (this.cashs !== []) {
          return this.cashs.cash_fund;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    get_solde() {
      let solde = this.get_cash_fund + this.get_sum_entry - this.get_sum_exit;
      return solde;
    },
    get_sum_entry_settlement() {
      let sum = this._.sumBy(this.itemsSettlement, (t) => {
        return t.amount_paid;
      });
      return sum;
    },
    get_sum_entry() {
      let sum_entry = this._.filter(this.items, (t) => {
        return t.type === "ENTRY";
      });
      let sum = this._.sumBy(sum_entry, (t) => {
        return t.amount_movement;
      });
      let total_sum = this.get_sum_entry_settlement + sum;
      return total_sum;
    },
    get_sum_exit() {
      let sum_exit = this._.filter(this.items, (t) => {
        return t.type === "EXIT";
      });
      let sum = this._.sumBy(sum_exit, (t) => {
        return t.amount_movement;
      });
      return sum;
    },
  },
  created() {
    this.setHeadersSettlement();
    this.getOptionsPayment();
    //this.setItemRoles();
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getOptionsPayment() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.payment, (type_Payment) => {
        self.optionPayment.type_Payment.push({
          text: self.$vuetify.lang.t(type_Payment.text),
          value: type_Payment.value,
        });
      });
    },
    editPatients_settlements(item) {
      this.dialogFormPatientSettlement.show = true;
      this.messages = {
        title: "$vuetify.patients_settlements.update.title",
        submit: "$vuetify.patients_settlements.update.submit",
        success: "$vuetify.patients_settlements.update.success",
      };
      this.$refs.patients_settlementsForm.setForm(item);
      // this.getItemsDetails();
      // this.refreshItemsDetails();
    },

    getItems() {
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
            url: self.urlItems + "?cash=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsSettlement = data.content;
            self.statistics = data.statistics;
            self.meta = { totalElements: data.totalElements };
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
    setHeadersSettlement() {
      this.headersSettlement = [
        {
          text: "$vuetify.patients_settlements.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.patient_name.title",
          value: "patient_name",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patients_settlements.cols.current_balance.title",
          value: "patient_balance",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_payment.titleCash",
          value: "amount_cash",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_payment.titleOm",
          value: "amount_om",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_payment.titleMomo",
          value: "amount_momo",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_payment.titleBank",
          value: "amount_bank_card",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_payment.titlePrepaid",
          value: "amount_prepaid",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.amount_received.title",
          value: "amount_received",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_paid.title",
          value: "amount_paid",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patients_settlements.cols.new_balance.title",
          value: "new_balance",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patients_settlements.cols.date.title",
          value: "date",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patients_settlements.cols.actions.title",
        //   value: null,
        //   align: "start",
        //   sortable: true,
        //   width: "140",
        // },
      ];
    },
    close(val) {
      this.dialogFormClose.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.cash.cols.status.enabled",
        submit: "$vuetify.cash.update.submit",
        success: "$vuetify.cash.update.success",
      };
      this.$refs.closeCash.setForm(val);
    },
    open(val) {
      this.dialogFormOpen.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.cash.cols.status.opened",
        submit: "$vuetify.cash.update.submit",
        success: "$vuetify.cash.update.success",
      };
      this.$refs.openCash.setForm(val);
    },

    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
      this.form = {
        id: null,
        type: null,
        name: null,
        motive: null,
        name_movement: null,
        code: null,
        is_active: false,
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },

    // createCash() {
    //   this.dialogFormCash.show = true;
    // },
    createCashMovement() {
      this.dialogFormMovement.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
    },
    createPatientSettlement() {
      this.dialogFormPatientSettlement.show = true;
      this.messages = {
        title: "$vuetify.patients_settlements.new.title",
        submit: "$vuetify.patients_settlements.new.submit",
        success: "$vuetify.patients_settlements.new.success",
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
        patients_settlements: null,
        reference_no: null,
        additional_info: null,
        patients_settlements_amount: null,
        code: null,
        cashier: null,
        bill_type: null,
        advances: null,
        bill_shape: null,
        storage_depots: null,
      };
    },
    editCash_movement(item) {
      this.dialogFormMovement.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.update.title",
        submit: "$vuetify.cash_movement.update.submit",
        success: "$vuetify.cash_movement.update.success",
      };
      this.$refs.cash_movementForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      console.log();
      if (self.filter.payment_method === "CASH") {
        params["amount_cash_gt"] = 0;
      }
      if (self.filter.payment_method === "OM") {
        params["amount_om_gt"] = 0;
      }
      if (self.filter.payment_method === "MOMO") {
        params["amount_momo_gt"] = 0;
      }
      if (self.filter.payment_method === "BANK_CARD") {
        params["amount_bank_card_gt"] = 0;
      }
      if (self.filter.payment_method === "PREPAID") {
        params["amount_prepaid_gt"] = 0;
      }
      self._search = params;
      self
        .getItems()
        .then(() => {
          self.$refs.filterForm.closeDialog();
        })
        .finally(() => {
          self.$refs.filterForm.stopLoadingBtn();
        });
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: { FormSettlement },
};
</script>

<style scoped></style>
