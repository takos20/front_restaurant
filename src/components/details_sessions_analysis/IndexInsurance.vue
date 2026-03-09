<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 ml-5">
        <template
          v-if="_.includes($auth.user().permissions, 'view_cash_control')"
        >
          <v-row>
            <v-col cols="12" sm="4"> </v-col>
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
            <v-col cols="12" sm="4"> </v-col>
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

        <v-spacer></v-spacer>
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

        <template v-slot:header.code_patient="{ header }">
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
        <template v-slot:header.payment_method="{ header }">
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
        <template v-slot:header.date="{ header }">
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
                <td class="subtitle-2">{{ item.code }}</td>

                <td class="subtitle-2">
                  {{ item.patient.code }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2" v-if="item.payment_method === 'CASH'">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td class="subtitle-2" v-else-if="item.payment_method === 'OM'">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.payment_method === 'BANK_CARD'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.payment_method === 'MOMO'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.payment_method === 'NO_PAY'"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td class="subtitle-2" v-else>/</td>
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
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>

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

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/bills/cash_movements",
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
      code: null,
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
    this.setHeaders;
    this.setHeadersSettlement();
    //this.setItemRoles();
  },
  mounted() {
    this.getItems();
  },
  methods: {
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
            url:
              self.urlItems +
              "?type=insurance" +
              "&id=" +
              this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsSettlement = data.content;
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
          text: "$vuetify.patients_settlements.cols.code_patient.title",
          value: "code_patient",
          align: "start",
          sortable: false,
          width: "50",
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
          text: "$vuetify.bills.cols.payment_method.title",
          value: "payment_method",
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
          text: "$vuetify.patients_settlements.cols.date.title",
          value: "date",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patients_settlements.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: false,
        //   width: "1",
        //   class: "grey--text text--darken-3"
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
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
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
  components: {},
};
</script>

<style scoped></style>
