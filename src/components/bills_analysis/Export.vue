<template>
  <v-dialog max-width="500" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">{{ $vuetify.lang.t("$vuetify.bills.export") }}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performExport()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-autocomplete
                  v-model="exports.cashier"
                  :items="itemsCashier"
                  :loading="isLoadingCashier"
                  :search-input.sync="searchCashier"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                  class="font-weight-bold"
                  dense
                  clearable
                  prepend-icon="mdi-account-outline"
                ></v-autocomplete>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-autocomplete
                  v-model="exports.cash"
                  :items="itemsCash"
                  :loading="isLoadingCash"
                  :search-input.sync="searchCash"
                  color="primary"
                  item-text="code"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.cash.title')"
                  class="font-weight-bold"
                  dense
                  clearable
                  prepend-icon="mdi-credit-card"
                >
                  <!--                  <template slot="selection" slot-scope="data">-->
                  <!--                    {{ data.item.code }} - {{ data.item.user.username }}-->
                  <!--                  </template>-->
                  <!--                  <template v-slot:item="data">-->
                  <!--                    {{ data.item.code }} - {{ data.item.user.username }}-->
                  <!--                  </template>-->
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="exports.start_date"
                      color="primary"
                      class="font-weight-bold my-2"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.item_movements.cols.period_of.title'
                        )
                      "
                      v-bind="attrs"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="exports.start_date"
                    :max="maxDate"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="menu2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="exports.end_date"
                      color="primary"
                      class="font-weight-bold my-2"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.item_movements.cols.period_of.title2'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="exports.end_date"
                    :max="maxDate"
                    color="primary"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.shows.showFilter = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn @click="resetForm">
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPrint()">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPDF()">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <v-btn dark color="primary" type="submit">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>

<script>
import FilterMixin from "../../mixins/Common/Filters";
import FormPdf from "./../bills/Pdf";
const FileSaver = require("file-saver");
export default {
  mixins: [FilterMixin],
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showFilter: false,
          },
        };
      },
    },
    exports: {
      type: Object,
      default: function () {
        return {
          cashier: null,
          start_date: null,
          end_date: null,
          cash: null,
        };
      },
    },
  },
  watch: {
    searchCashier(value) {
      if (value === null) return;
      const params = { username: value, role: "CAISSIER" };
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
      const params = { code: value, user: this.exports.cashier };
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
  created() {},
  data: () => ({
    menu2: false,
    menu: false,
    maxDate: new Date().toISOString().substr(0, 10),
    loadingBtn: false,
    isLoadingCashier: false,
    searchCashier: null,
    itemsCashier: [],
    urlCashier: "users",
    urlItems: "bills/bills_analysis",
    isLoadingCash: false,
    searchCash: null,
    itemsCash: [],
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlCash: "cashs",
  }),
  methods: {
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.exports.cashier !== null) {
        params["cashier"] = self.exports.cashier;
      }
      if (
        self.exports.start_date !== null &&
        self.exports.start_date !== undefined
      ) {
        params["start_date"] = self.exports.start_date;
      }
      if (self.exports.end_date !== null) {
        params["end_date"] = self.exports.end_date;
      }
      if (self.exports.cash !== null) {
        params["cash"] = self.exports.cash;
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
      if (self.exports.cashier !== null) {
        params["cashier"] = self.exports.cashier;
      }
      if (
        self.exports.start_date !== null &&
        self.exports.start_date !== undefined
      ) {
        params["start_date"] = self.exports.start_date;
      }
      if (self.exports.end_date !== null) {
        params["end_date"] = self.exports.end_date;
      }
      if (self.exports.cash !== null) {
        params["cash"] = self.exports.cash;
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
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.exports.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.exports.cahsier = null;
      this.exports.cash = null;
      this.exports.start_date = null;
      this.exports.end_date = null;
      this.itemsCash = [];
      this.itemsCashier = [];
    },
  },
  components: {
    FormPdf,
  },
};
</script>
