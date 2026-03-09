<template>
  <div>
    <v-card class="pb-4" height="60">
      <div class="mt-5 mx-5">
        <!--        <template>-->
        <!--          &lt;!&ndash;          v-if="_.includes(this.$auth.user().permissions, 'add_ordinance')"&ndash;&gt;-->

        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            @click="create()"-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            v-if="-->
        <!--              _.includes(this.$auth.user().permissions, 'add_laboratorypatient')-->
        <!--            "-->
        <!--          >-->
        <!--            <v-icon left>mdi-medical-bag</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-btn
          :loading="loading.refresh"
          @click="bills_analysis()"
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
    <br />
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template>
          <v-form>
            <v-row wrap>
              <!--              <v-col cols="12" sm="2">-->
              <!--                <v-menu-->
              <!--                  v-model="menu"-->
              <!--                  color="primary"-->
              <!--                  :close-on-content-click="false"-->
              <!--                  :nudge-right="40"-->
              <!--                  transition="scale-transition"-->
              <!--                  offset-y-->
              <!--                  min-width="auto"-->
              <!--                >-->
              <!--                  <template v-slot:activator="{ on, attrs }">-->
              <!--                    <v-text-field-->
              <!--                      v-model="form.start_date"-->
              <!--                      color="primary"-->
              <!--                      class="font-weight-bold my-2"-->
              <!--                      outlined-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.item_movements.cols.period_of.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      v-bind="attrs"-->
              <!--                      v-on="on"-->
              <!--                      dense-->
              <!--                    ></v-text-field>-->
              <!--                  </template>-->
              <!--                  <v-date-picker-->
              <!--                    v-model="form.start_date"-->
              <!--                    :max="maxDate"-->
              <!--                    color="primary"-->
              <!--                    @input="menu = false"-->
              <!--                  ></v-date-picker>-->
              <!--                </v-menu>-->
              <!--              </v-col>-->
              <!--              <v-col cols="12" sm="2">-->
              <!--                <v-menu-->
              <!--                  v-model="menu2"-->
              <!--                  color="primary"-->
              <!--                  :close-on-content-click="false"-->
              <!--                  :nudge-right="40"-->
              <!--                  transition="scale-transition"-->
              <!--                  offset-y-->
              <!--                  min-width="auto"-->
              <!--                >-->
              <!--                  <template v-slot:activator="{ on, attrs }">-->
              <!--                    <v-text-field-->
              <!--                      v-model="form.end_date"-->
              <!--                      color="primary"-->
              <!--                      class="font-weight-bold my-2"-->
              <!--                      outlined-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.item_movements.cols.period_of.title2'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      v-bind="attrs"-->
              <!--                      v-on="on"-->
              <!--                      dense-->
              <!--                    ></v-text-field>-->
              <!--                  </template>-->
              <!--                  <v-date-picker-->
              <!--                    v-model="form.end_date"-->
              <!--                    :min="getMinStartDate"-->
              <!--                    :max="maxDate"-->
              <!--                    color="primary"-->
              <!--                    @input="menu2 = false"-->
              <!--                  ></v-date-picker>-->
              <!--                </v-menu>-->
              <!--              </v-col>-->
              <!--              <v-col cols="12" sm="2">-->
              <!--                <v-btn-->
              <!--                  class="mr-2 my-2 white&#45;&#45;text"-->
              <!--                  @click="bills_analysis()"-->
              <!--                  color="teal darken-1"-->
              <!--                  light-->
              <!--                  :loading="loadingBtn"-->
              <!--                  :disabled="form.start_date === null || form.end_date === null"-->
              <!--                >-->
              <!--                  {{ $vuetify.lang.t("$vuetify.cash.titleBtn_Bills_analysis") }}-->
              <!--                </v-btn>-->
              <!--              </v-col>-->
              <v-chip
                class="subtitle-1 font-weight-bold my-6"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                style="margin-left: 7px"
                label
              >
                {{ $vuetify.lang.t("$vuetify.bills.title3") }}
                : {{ Intl.NumberFormat().format(this.sum_ca) }}
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
              <v-chip
                class="subtitle-1 font-weight-bold my-6"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                style="margin-left: 7px"
                label
              >
                {{ $vuetify.lang.t("$vuetify.insurance.title") }}
                : {{ Intl.NumberFormat().format(this.sum_insurance) }}
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
              <v-chip
                class="subtitle-1 font-weight-bold my-6"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                style="margin-left: 7px"
                label
              >
                {{ $vuetify.lang.t("$vuetify.insurance.title_patient") }}
                : {{ Intl.NumberFormat().format(this.sum_patient) }}
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>

              <!--              <v-chip-->
              <!--                class="subtitle-1 font-weight-bold my-6 "-->
              <!--                text-color="teal darken-1"-->
              <!--                color="#f1f5fc"-->
              <!--                medium-->
              <!--                label-->
              <!--              >-->
              <!--                {{ $vuetify.lang.t("$vuetify.bills.title4") }}-->
              <!--                : {{ Intl.NumberFormat().format(this.sum_current_search) }}-->
              <!--                &lt;!&ndash;{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}&ndash;&gt;-->
              <!--              </v-chip>-->
              <!-- <v-col cols="12" sm="2">
                <v-btn
                  class="mr-2 my-2 white--text"
                  @click="bills_compta_analysis()"
                  color="teal darken-1"
                  light
                  :loading="loadingBtn"
                  disabled
                >
                  {{
                    $vuetify.lang.t("$vuetify.cash.titleCompta_Bills_analysis")
                  }}
                </v-btn>
              </v-col> -->
              <!--             <v-col cols="12" sm="3">-->
              <!--              <download-excel-->
              <!--                  class="btn btn-default"-->
              <!--                  :data="items"-->
              <!--                  :fields="json_fields"-->
              <!--                  worksheet="My Worksheet"-->
              <!--                  name="Liste des factures.xls"-->
              <!--              >-->
              <!--                <v-btn color="teal darken-1" class="mt-2 white&#45;&#45;text">-->
              <!--                  Export xls-->
              <!--                  <i class="mdi mdi-export-variant" aria-hidden="true"></i>-->
              <!--                </v-btn>-->
              <!--              </download-excel>-->
              <!--            </v-col>-->
              <!--                <v-btn-->
              <!--                  class="font-weight-bold mr-2 my-2 ml-10"-->
              <!--                  @click="exportBills_analysis()"-->
              <!--                  color="teal darken-1"-->
              <!--                  light-->
              <!--                  :loading="loadingBtn"-->
              <!--                  style="margin-left: 15px"-->
              <!--                  :disabled="-->
              <!--                    formData.start_date === null || formData.end_date === null-->
              <!--                  "-->
              <!--                >-->
              <!--                  {{-->
              <!--                    $vuetify.lang.t(-->
              <!--                      "$vuetify.item_movements.cols.period_of.title4"-->
              <!--                    )-->
              <!--                  }}-->
              <!--                </v-btn>-->
            </v-row>
          </v-form>
        </template>
      </div>
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.bills.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="2">
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
                  class="font-weight-bold"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title'
                    )
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
              <v-date-picker
                v-model="filter.start_date"
                color="primary"
                @change="performFilter"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-menu
              v-model="menu2"
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
                  clearable
                  class="font-weight-bold"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title2'
                    )
                  "
                  v-bind="attrs"
                  v-on="on"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.end_date"
                :min="minDate"
                :max="maxDate"
                color="primary"
                @change="performFilter"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.patient"
              :items="itemsPatient"
              :loading="isLoadingPatient"
              :search-input.sync="searchPatient"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.patient.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.doctor"
              :items="itemsDoctor"
              :loading="isLoadingDoctor"
              :search-input.sync="searchDoctor"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <br />
      <v-card-actions style="margin-top: -45px">
        <!--          <v-btn-->
        <!--              :loading="loading.refresh"-->
        <!--              @click="refreshItemsDetail()"-->
        <!--              class="mr-2 my-2"-->
        <!--              depressed-->
        <!--              color="#f1f5fc"-->
        <!--          >-->
        <!--            <v-icon left color="primary">mdi-refresh</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
        <!--          </v-btn>-->
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="print()"
          class="mr-2 my-2"
          depressed
          dark
          :loading="loadingBtn"
        >
          <v-icon left>mdi-printer</v-icon>
          {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="pb-4">
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

        <template v-slot:header.net_payable="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.insurance="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.insurance_patient="{ header }">
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
          <v-hover>
            <tbody slot-scope="{ hover }">
              <tr :key="item.id" v-for="item in items">
                <td class="subtitle-2">{{ item.code }}</td>
                <!-- <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.bill_type." + item.bill_type
                    )
                  }}
                </td> -->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  <!--                  {{ item.timeAt }}-->
                </td>
                <td class="subtitle-2">
                  {{ item.patient_name ? item.patient_name : "-" }}
                </td>

                <td class="subtitle-2">
                  {{ item.bills_amount }}
                </td>
                <td class="subtitle-2">
                  {{ item.insurance }}
                </td>
                <td class="subtitle-2">
                  {{ item.insurance_patient }}
                </td>
                <td class="subtitle-2">
                  {{ item.amount_paid }}
                </td>
                <td class="subtitle-2">
                  {{ item.balance }}
                </td>
                <!-- <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_accounted === true">
                        <v-icon
                          color="green"
                          class="pointer"
                          dark
                          :disabled="!get_permissions"
                        >
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          @click="enabled(item)"
                          class="pointer"
                          light
                          :disabled="!get_permissions"
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
                    <template>
                      <span v-if="item.is_accounted === false">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.bills.cols.is_accounted.title"
                          )
                        }}
                      </span>
                      <span v-else>
                        {{
                          $vuetify.lang.t(
                            "$vuetify.bills.cols.is_accounted.title"
                          )
                        }}
                      </span>
                    </template>
                  </v-tooltip>
                </td> -->
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
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
                      <span>{{ $vuetify.lang.t("$vuetify.btn.detail") }}</span>
                    </v-tooltip>
                  </template>
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
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    </v-card>
  </div>
</template>

<script>
import FormEnable from "./../bills/accountedBills";
import FormBills from "./FormDetails";
import FormPdf from "./../bills/Pdf";
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
    sum_insurance: null,
    sum_patient: null,
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
    urlCash: "cashs/allMyCashs",
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
    filter: { start_date: null, end_date: null, patient: null, doctor: null },
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
    this.getBills_analysis();
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
      const params = { name: value, role: "CAISSIER" };
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
      const params = { code: value, user: this.filter.cashier["id"] };
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
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
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
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
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
      this.getBills_analysis();
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
            url: self.urlItems + "?insurance=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.sum_ca = data.sum_ca;
            self.sum_patient = data.sum_patient;
            self.sum_insurance = data.sum_insurance;
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
          text: "$vuetify.bills.cols.net_payable.title",
          value: "net_payable",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.title",
          value: "insurance",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.title_patient",
          value: "insurance_patient",
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
        params["cash_id"] = self.filter.cash;
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
  },
};
</script>

<style scoped></style>
