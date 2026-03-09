<template>
  <div>
    <v-card class="pb-4 elevation-2 transition-slow">
      <div class="mt-5 mx-5">
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'view_bills_analysis')
          "
        >
          <v-form>
            <v-row wrap>
              <v-btn
                :loading="loading.refresh"
                @click="bills_analysis()"
                class="mr-2 my-5 font-weight-bold hover-chip"
                depressed
                color="#f1f5fc"
              >
                <v-icon left color="primary">mdi-refresh</v-icon>
                {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
              </v-btn>
              <transition-group
                name="fade-slide"
                tag="div"
                class="d-flex flex-wrap"
              >
                <v-chip
                  v-for="chip in chips"
                  :key="chip.id"
                  :text-color="chip.textColor"
                  :color="chip.bgColor"
                  class="subtitle-1 font-weight-bold my-6 mx-1 hover-chip"
                  label
                  medium
                >
                  {{ $vuetify.lang.t(chip.label) }} :
                  {{ Intl.NumberFormat().format(chip.value) }}
                </v-chip>
              </transition-group>
            </v-row>
          </v-form>
        </template>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.bills.filter") }}
        </div>
      </v-card-title>
      <v-card-actions style="margin-top: -20px">
        <v-btn
          dark
          color="primary"
          class="subtitle-1 font-weight-bold hover-chip"
          @click="bills((typeBills = 'paid'))"
          style="margin-left: 7px"
        >
          {{ $vuetify.lang.t("$vuetify.bills.type.normalBills") }}
        </v-btn>
        <v-btn
          depressed
          color="#FF9E80"
          @click="bills((typeBills = 'unpaid'))"
          class="subtitle-1 font-weight-bold hover-chip"
        >
          {{ $vuetify.lang.t("$vuetify.bills.type.balanceBills") }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="2">
            <v-menu
              v-model="menu"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.start_date"
                  color="primary"
                  class="font-weight-bold subtitle-1"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                  "
                  v-bind="attrs"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  v-on="on"
                  dense
                  clearable
                  readonly
                ></v-text-field>
              </template>
              <transition name="fade-slide">
                <v-date-picker
                  v-model="filter.start_date"
                  color="primary"
                  elevation="2"
                  class="rounded-picker"
                  @change="performFilter"
                  @input="menu = false"
                ></v-date-picker>
              </transition>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2" class="mb-0 py-0">
            <v-menu
              v-model="menu2"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.end_date"
                  color="primary"
                  clearable
                  class="font-weight-bold subtitle-1"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.endDate.title')"
                  v-bind="attrs"
                  v-on="on"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </template>
              <transition name="fade-slide">
                <v-date-picker
                  v-model="filter.end_date"
                  :min="minDate"
                  elevation="2"
                  class="rounded-picker"
                  color="primary"
                  @change="performFilter"
                  @input="menu2 = false"
                ></v-date-picker>
              </transition>
            </v-menu>
          </v-col>
          <!-- <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-autocomplete
              v-model="filter.cashier"
              :items="itemsCashier"
              :loading="isLoadingCashier"
              :search-input.sync="searchCashier"
              color="primary"
              return-object
              item-text="username"
              @change="performFilter"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
              class="font-weight-bold subtitle-1"
              dense
              clearable
              outlined
              prepend-inner-icon="mdi-account-outline"
            ></v-autocomplete>
          </v-col> -->
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-autocomplete
              v-model="filter.cash"
              :items="itemsCash"
              :loading="isLoadingCash"
              :search-input.sync="searchCash"
              color="primary"
              item-text="code"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.cash.title')"
              class="font-weight-bold subtitle-1"
              dense
              clearable
              @change="performFilter"
              outlined
              prepend-inner-icon="mdi-credit-card"
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.code }} - {{ data.item.user.username }}
              </template>
              <template v-slot:item="data">
                {{ data.item.code }} - {{ data.item.user.username }}
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions style="margin-top: -25px">
        <v-spacer></v-spacer>
        <!--        <v-btn dark color="primary" @click="exportPrint()">-->
        <!--          <v-icon color="white" left>mdi-printer</v-icon>-->
        <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}-->
        <!--        </v-btn>-->
        <v-btn
          dark
          color="primary"
          @click="exportPDF()"
          class="subtitle-1 font-weight-bold hover-chip"
        >
          <v-icon color="white" left>mdi-file</v-icon>
          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
        </v-btn>
        <v-btn
          dark
          color="primary"
          @click="performExport"
          class="subtitle-1 font-weight-bold hover-chip"
        >
          {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="pb-4">
      <v-data-table
        :footer-props="{ 'items-per-page-options': itemPerPageOptions }"
        :headers="headers"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loading.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="name"
        class="mt-5 custom-data-table"
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

        <!-- <template v-slot:header.bill_type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
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

        <!--<template v-slot:header.is_active="{ header }">-->
        <!--<tr>-->
        <!--{{-->
        <!--$vuetify.lang.t(header.text)-->
        <!--}}-->
        <!--</tr>-->
        <!--</template>-->
        <template v-slot:header.cashier="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.cash="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.net_payable="{ header }">
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
        <template v-slot:header.balance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.is_accounted="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.null="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:body="{ items }">
          <v-hover v-slot="{ hover }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                :class="{ 'row-hover': hover }"
              >
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">{{ item.patient.name || "-" }}</td>
                <td class="subtitle-2">{{ item.cash.user.username || "-" }}</td>
                <td class="subtitle-2">{{ item.cash.code || "-" }}</td>
                <td class="subtitle-2">{{ item.bills_amount }}</td>
                <td class="subtitle-2">{{ item.amount_paid }}</td>
                <td class="subtitle-2">{{ item.balance }}</td>
                <td class="subtitle-2 actions-cell">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="editBills(item)"
                        color="secondary"
                        icon
                        text
                        v-on="on"
                        v-show="$vuetify.breakpoint.smAndDown || hover"
                        class="action-btn"
                      >
                        <v-icon>mdi-update</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $vuetify.lang.t("$vuetify.btn.detail") }}</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        @click="deleteItem(item)"
                        color="red"
                        icon
                        text
                        v-on="on"
                        v-show="$vuetify.breakpoint.smAndDown || hover"
                        dark
                        class="action-btn"
                      >
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>
                  </v-tooltip>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-enable
        :dialog="dialogForm"
        ref="accountedBills"
        :messages="messages"
        @getItems="getBills_analysis"
      ></form-enable>
      <form-bills
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getBills_analysis"
        ref="billsForm"
      ></form-bills>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getBills_analysis"
      ></delete-item>
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    </v-card>
  </div>
</template>

<script>
import FormEnable from "./../bills/accountedBills";
import FormBills from "./Form";
import FormPdf from "./../bills/Pdf";
import DeleteItem from "./Validate_bill_delete";
// import moment from "moment/moment";
const FileSaver = require("file-saver");
export default {
  data: () => ({
    menu4: false,
    menu3: false,
    maxDate: new Date().toISOString().substr(0, 10),
    minDate: new Date().toISOString().substr(0, 10),
    headers: [],
    events: [],
    items: [],
    meta: {},
    supply: false,
    sum_ca: null,
    sum_unpaid: null,
    sum_paid: null,
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    sum_current_search: null,
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlItemsGet: "",
    urlItemsDetails: "",
    urlDeleteItems: "",
    deleteItems: "/bills",
    sortDesc: true,
    dialogFormExport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isLoadingCashier: false,
    searchCashier: null,
    itemsCashier: [],
    urlCashier: "users",
    isLoadingCash: false,
    searchCash: null,
    itemsCash: [],
    urlCash: "cashs/all",
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    menu2: false,
    isClick: false,
    search: null,
    menu: false,
    loadingBtn: false,
    urlItems: "bills/bills_analysis",
    urlItemsCompta: "cashs/bills_compta",
    sortBy: ["id"],
    pagination: {},
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    json_fields: {
      Code: "code",
      Type: "bill_type",
      Date: "createdAt",
      Patient: "patient.name",
      PatientType: "patient_type",
      Caissier: "cash.user.username",
      SessionCaisse: "cash.code",
      Montant: "bills_amount",
      Avance: "amount_paid",
      Solde: "balance",
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    filter: { start_date: null, end_date: null, cashier: null, cash: null },
    form: { start_date: null, end_date: null, product: null },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.bills.delete.success",
    },
  }),
  created() {
    this.setHeaders();

    //this.setItemRoles();
  },
  watch: {
    pagination: {
      handler() {
        this.getBills_analysis();
      },
      deep: true,
    },
    searchCashier(value) {
      if (value === null) return;
      const params = { username: value };
      let self = this;
      this.isLoadingCashier = true;
      this.$store
        .dispatch("request", {
          url: self.urlCashier,
          params: params,
        })
        .then((response) => {
          self.itemsCashier = response.data.content;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoadingCashier = false));
    },
    searchCash(value) {
      // console.log(this.$auth.user().storage_depots === 'null')
      if (value === null) return;
      const params = { code: value };
      let self = this;
      this.isLoadingCash = true;
      this.$store
        .dispatch("request", {
          url: self.urlCash,
          params: params,
        })
        .then((response) => {
          self.itemsCash = response.data.content;
        })
        .finally(() => (this.isLoadingCash = false));
    },
  },

  methods: {
    bills(val) {
      this.performFilter(val);
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.filter.cashier !== null) {
        params["cashier"] = self.filter.cashier;
      }
      if (
        self.filter.start_date !== null &&
        self.filter.start_date !== undefined
      ) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
      if (self.filter.cash !== null) {
        params["cash"] = self.filter.cash;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          // let fileName = "Listes des Porduits";
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          // FileSaver.saveAs(blob, fileName);
          this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    exportPDF() {
      let self = this;
      const params = {};
      if (self.filter.cashier !== null) {
        params["cashier"] = self.filter.cashier;
      }
      if (
        self.filter.start_date !== null &&
        self.filter.start_date !== undefined
      ) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
      if (self.filter.cash !== null) {
        params["cash"] = self.filter.cash;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des factures";
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
    performExport() {
      let self = this;
      let params = {};
      if (self.filter.cashier !== null) {
        params["cashier"] = self.filter.cashier;
      }
      if (
        self.filter.start_date !== null &&
        self.filter.start_date !== undefined
      ) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
      if (self.filter.cash !== null) {
        params["cash"] = self.filter.cash;
      }
      //console.log("FILTRE", this._search);
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des factures";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExport.shows.showFilter = false;
        });
      // .then(() => {
      //   self.$refs.exportForm.closeDialog();
      // })
      // .finally(() => {
      //   self.$refs.exportForm.stopLoadingBtn();
      // });
    },
    getItemsExport() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des factures";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExport.shows.showFilter = false;
        });
    },
    deleteItem(item) {
      this.urlDeleteItems = this.deleteItems + "/" + item.id;
      this.dialogDelete.show = true;
    },
    enabled(item) {
      this.dialogForm.shows.showInfo = true;
      this.$refs.accountedBills.setForm(item);
    },
    bills_analysis() {
      let self = this;
      this.loading.refresh = true;
      this.getBills_analysis()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    bills_compta_analysis() {
      let self = this;
      this.getBills_compta();
      this.loading.refresh = true;
      this.getBills_compta()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    getBills_analysis() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.sum_ca = data.sum_ca;
            self.sum_unpaid = data.sum_unpaid;
            self.sum_paid = data.sum_paid;
            self.sum_current_search = data.sum_current_search;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
    getBills_compta() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsCompta +
              "?start_date=" +
              this.form.start_date +
              "&end_date=" +
              this.form.end_date,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
        // {
        //   text: "$vuetify.bills.cols.bill_type.title",
        //   value: "bill_type",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
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
          text: "$vuetify.bills.cols.cashier.title",
          value: "cashier",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.title",
          value: "cash",
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
          text: "$vuetify.bills.cols.amount_paid.title",
          value: "amount_paid",
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
        //   text: "$vuetify.supplies.cols.is_accounted.title",
        //   value: "is_accounted",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3"
        // },
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
          width: "100",
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
        amount_paid: null,
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

    performFilter(val) {
      var moment = require("moment");
      // this.filter.end_date = null;

      // let lastDate;
      const lastDateOfMonth = (date = new Date()) =>
        new Date(date.getFullYear(), date.getMonth() + 1, 0);
      // if (this.filter.start_date){
      //   console.log(this.filter.start_date.split("-").slice(1)[0])
      this.minDate = this.filter.start_date;
      this.maxDate = moment(
        lastDateOfMonth(new Date(this.filter.start_date))
      ).format("YYYY-MM-DD");
      // }else{
      //   lastDate = new Date().toISOString().substr(0, 10)
      // }
      let self = this;
      self.loading.list = true;
      let params = {};
      if (val === "unpaid") {
        params["balance"] = 0;
      } else if (val === "paid") {
        if ("balance" in params) {
          delete params["balance"];
        }
      }

      if (
        self.filter.start_date !== null &&
        self.filter.start_date !== undefined
      ) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
      if (self.filter.cash !== null) {
        params["cash"] = self.filter.cash;
      }
      if (self.filter.cashier !== null) {
        params["cashier_name"] = self.filter.cashier["username"];
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getBills_analysis();
    },
  },
  computed: {
    chips() {
      return [
        {
          id: "total", // ✅ Unique key
          label: "$vuetify.bills.title3",
          value: this.sum_ca,
          textColor: "blue darken-1",
          bgColor: "#f1f5fc",
        },
        {
          id: "paid",
          label: "$vuetify.bills.titlePaid",
          value: this.sum_paid,
          textColor: "teal darken-1",
          bgColor: "#f1f5fc",
        },
        {
          id: "unpaid",
          label: "$vuetify.bills.titleUnpaid",
          value: this.sum_unpaid,
          textColor: "red darken-1",
          bgColor: "#f1f5fc",
        },
      ];
    },
    get_permissions() {
      let result = "";
      result = this._.includes(this.$auth.user().permissions, "change_bills");
      return result;
    },
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    get_total_bills_amount() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.net_payable;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
  },
  components: {
    FormEnable,
    FormBills,
    FormPdf,
    DeleteItem,
  },
};
</script>

<style scoped>
.custom-data-table thead th {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #424242;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.custom-data-table thead th:hover {
  background-color: #e0e0e0;
}

.custom-data-table tbody tr {
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.custom-data-table tbody tr.row-hover {
  background-color: #f0f7ff;
  box-shadow: inset 4px 0 0 0 #1976d2;
}

.action-btn {
  transition: transform 0.2s ease;
}

.action-btn:hover {
  transform: scale(1.15);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .custom-data-table tbody tr {
    font-size: 0.9rem;
  }
  .actions-cell {
    display: flex;
    gap: 8px;
  }
}
.hover-chip {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.hover-chip:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transform: scale(1.03);
}

/* Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.transition-slow {
  transition: all 0.4s ease-in-out;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.hover-glow:hover {
  box-shadow: 0 0 5px rgba(33, 150, 243, 0.6); /* soft blue */
  transition: box-shadow 0.2s ease;
}
.rounded-picker {
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}
.mdi-calendar {
  transition: transform 0.3s ease;
}
.v-text-field:hover .mdi-calendar {
  transform: scale(1.2);
}
</style>
