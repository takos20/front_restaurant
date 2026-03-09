<template>
  <div>
    {{ this.cashs["name"] }}
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.cash.title") }}: {{ this.cashs_code }} /
      {{ $vuetify.lang.t("$vuetify.cash.cols.cashier_name.title") }}:
      <span v-if="cashs && cashs.user">
        {{ cashs.user.username }}
      </span>
    </div>
    <!--    <div-->
    <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
    <!--      style="height: 30px; margin-top: 30px"-->
    <!--      v-if="this.isActive === false"-->
    <!--    >-->
    <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
    <!--    </div>-->
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!--                <template-->
        <!--                  v-if="$auth.check(['ADMIN','RESPONSIBLE' , 'CASHIER']) && this.items.length !== 0"-->
        <!--                >-->
        <!--                  <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>-->
        <!--                    <v-icon left>mdi-account-plus-outline</v-icon>-->
        <!--                    {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
        <!--                  </v-btn>-->
        <!--                </template>-->
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'add_cash') &&
            this.isActive === false
          "
        >
          <v-btn class="mr-2 my-2" @click="createCash()" color="primary" dark>
            {{ $vuetify.lang.t("$vuetify.cash.new.title") }}
          </v-btn>
        </template>

        <template>
          <v-btn
            class="mr-2 my-2 white--text"
            @click="close(cashs)"
            color="red darken-5"
            :disabled="
              _.includes(this.$auth.user().permissions, 'close_cash') &&
              this.isActive === false
            "
          >
            {{ $vuetify.lang.t("$vuetify.cash.cols.status.titleClose") }}
          </v-btn>
        </template>
        <!-- export_days_state -->
        <template>
          <v-btn
            class="mr-2 my-2 white--text"
            @click="exportPDF()"
            color="primary"
            dark
            :disabled="
              _.includes(this.$auth.user().permissions, 'export_days_state') ||
              this.isActive === false
            "
          >
            {{ $vuetify.lang.t("$vuetify.cash.cols.status.export_days_state") }}
          </v-btn>
        </template>
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
    </v-card>
    <v-card class="pb-4">
      <div class="mt-5 ml-5">
        <template
          v-if="_.includes($auth.user().permissions, 'view_cash_control')"
        >
          <v-row>
            <v-col cols="12" sm="3">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="black"
                color="#f1f5fc"
                medium
                label
              >
                {{ $vuetify.lang.t("$vuetify.cash.cols.cash_fund.title") }} :
                {{ Intl.NumberFormat().format(get_cash_fund) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="3">
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
                : {{ Intl.NumberFormat().format(get_sum_entry) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="3">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="red accent-4"
                color="#f1f5fc"
                medium
                label
              >
                {{ $vuetify.lang.t("$vuetify.cash_movement.cols.type.EXITS") }}
                : {{ Intl.NumberFormat().format(get_sum_exit) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="3">
              <v-chip
                class="subtitle-1 font-weight-bold"
                text-color="black"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t(
                    "$vuetify.cash_movement.cols.account_end.title"
                  )
                }}
                : {{ Intl.NumberFormat().format(get_solde) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="2"> </v-col>
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
    <div>
      <div
        class="title mb-5 black--text lighten-5 text-center"
        style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      >
        {{ $vuetify.lang.t("$vuetify.cash_movement.list.title") }}
      </div>
      <form-movements
        color="black"
        v-if="
          _.includes(this.$auth.user().permissions, 'view_cash_movement') &&
          this.isActive === true
        "
      ></form-movements>
    </div>
    <div
      v-if="
        _.includes(this.$auth.user().permissions, 'view_patientsettlement') &&
        this.isActive === true
      "
    >
      <div
        class="title mb-5 black--text lighten-5 text-center"
        style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      >
        {{ $vuetify.lang.t("$vuetify.patients_settlements.list.title") }}
      </div>
      <form-settlements color="black"></form-settlements>
    </div>

    <form-user
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="userForm"
    ></form-user>
    <form-cash
      :dialog="dialogFormCash"
      ref="cashForm"
      :messages="messages"
      @getItems="getItems"
    ></form-cash>
    <cash-close
      :dialog="dialogFormClose"
      ref="closeCash"
      :messages="messages"
      @getItems="getOpenCash"
    ></cash-close>
    <open-cash
      :dialog="dialogFormOpen"
      ref="openCash"
      :messages="messages"
      @getItems="getItems"
    ></open-cash>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItems="getItems"
    ></delete-item>
  </div>
</template>

<script>
import CashClose from "./../cash/EnableCash";
import OpenCash from "./../cash/OpenCash";
import ListMixin from "./../../mixins/Common/List.vue";
import FormUser from "./Form";
import FormCash from "./../cash/Form";
// import FormMovement from "./FormCash_movement";
import DeleteItem from "./../Common/Delete";
import FormMovements from "./IndexCashMvt";
import FormSettlements from "./IndexPatientSetlement";
// import FormInsurances from "./IndexInsurance";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/cash_movements",
    urlItemsGet: "/bills/all_cash_movements",
    urlItemsCash: "cashs/isOpen",
    urlItemsAll: "cashs/days_state",
    sortBy: ["-id"],
    items: [],
    itemsSettlement: [],
    itemsInsurance: [],
    isActive: null,
    cash: null,
    cashs_code: null,
    cashs: [],
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
    get_sum_entry_insurance() {
      let sum = this._.sumBy(this.itemsInsurance, (t) => {
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
      let total_sum =
        this.get_sum_entry_insurance + this.get_sum_entry_settlement + sum;
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
    //this.setItemRoles();
  },
  mounted() {
    this.getOpenCash();
    this.getItems();
  },
  methods: {
    exportPDF() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsAll + "?id=" + this.cashs.id,
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Etat du jour";
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
            if (self.isActive === false) {
              this.createCash();
            } else {
              self.isActive = data.content.is_active;
              this.getItems();
            }

            // console.log("meta", data);
            resolve(response);
          });
      });
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
            url: self.urlItemsGet,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.cashs = data.content.cash;
            self.cashs_code = self.cashs.code;
            self.itemsInsurance = data.content.insurance;
            self.items = data.content.cashs;
            self.itemsSettlement = data.content.settlement;
            // if (self.cashs.is_active === false) {
            //   this.createCash();
            // } else {
            //   self.isActive = self.cashs.is_active;
            //   // this.getItems();
            // }
            self.items = data.content.cashs;
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

    createCash() {
      this.dialogFormCash.show = true;
      this.messages = {
        title: "$vuetify.cash.new.title",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },

    // createCash() {
    //   this.dialogFormCash.show = true;
    // },
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
  components: {
    FormUser,
    OpenCash,
    DeleteItem,
    CashClose,
    FormMovements,
    FormSettlements,
    FormCash,
  },
};
</script>

<style scoped></style>
