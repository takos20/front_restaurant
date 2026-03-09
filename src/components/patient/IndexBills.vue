<template>
  <div>
    <v-card>
      <v-row class="px-5 my-4">
        <v-col cols="12" sm="3">
          <h3 class="my-4">
            {{ $vuetify.lang.t("$vuetify.dish.list.title") }}
          </h3>
        </v-col>

        <v-col cols="12" sm="2">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItems()"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
        </v-col>
        <v-col cols="12" sm="2">
          <v-menu
            v-model="menu4"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.start_date"
                color="primary"
                class="font-weight-bold"
                clearable
                prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                outlined
                :label="
                  $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
                "
                v-bind="attrs"
                v-on="on"
                dense
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.start_date"
              @change="getItems"
              :max="maxDate"
              color="primary"
              @input="menu4 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="2">
          <v-menu
            v-model="menu5"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.end_date"
                color="primary"
                class="font-weight-bold"
                clearable
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
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.end_date"
              :max="maxDate"
              :min="getminDateBestSell"
              @change="getItems"
              color="primary"
              @input="menu5 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
        </v-col>
      </v-row>
      <!-- BALANCES -->
      <v-row class="px-5" dense>
        <v-col cols="12" md="6">
          <v-chip
            block
            label
            color="#f1f5fc"
            class="subtitle-1 font-weight-bold d-flex justify-space-between"
          >
            <span>
              {{
                $vuetify.lang.t(
                  "$vuetify.patientaccount.cols.type_account.PRIVATE"
                )
              }}
              :
            </span>
            <span>{{ formatMoney(itemsSup.balance_private) }} FCFA</span>
          </v-chip>
        </v-col>

        <v-col cols="12" md="6">
          <v-chip
            block
            label
            color="#f1f5fc"
            text-color="teal darken-1"
            class="subtitle-1 font-weight-bold d-flex justify-space-between"
          >
            <span>
              {{
                $vuetify.lang.t(
                  "$vuetify.bills.cols.amount_payment.titleBalance"
                )
              }}
              {{
                $vuetify.lang.t(
                  "$vuetify.patientaccount.cols.type_account.PREPAID"
                )
              }}
              :
            </span>
            <span>{{ formatMoney(itemsSup.balance_prepaid) }} FCFA</span>
          </v-chip>
        </v-col>
      </v-row>

      <!-- PAYMENTS -->
      <v-row class="px-5 mt-3" dense>
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="item in paymentSummary"
          :key="item.key"
        >
          <v-chip
            block
            label
            color="#f1f5fc"
            :text-color="item.color"
            class="subtitle-1 font-weight-bold text-center"
          >
            {{ item.label }} : {{ formatMoney(item.amount) }} FCFA
          </v-chip>
        </v-col>
      </v-row>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headers"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loadingDetails.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="name"
        class="mt-5"
      >
        <template v-slot:header.product_name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.quantity_served="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.pub="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.pun="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.delivery="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.amount_net="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.cost_production="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.margin="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.tva="{ header }">
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
          <tbody>
            <tr :key="item.id" v-for="item in items">
              <td class="text-h6">
                {{ item.dish ? item.dish.name : "-" }}
              </td>
              <!-- <td class="subtitle-2">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pub }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_gross }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.delivery }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pun }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.amount_net }}
                  </td> -->
              <!-- Editable Quantity -->
              <td class="text-h6">
                <div>
                  {{ item.quantity_served }}
                </div>
              </td>
              <td class="text-h6">
                {{ item.delivery }}
              </td>
              <!-- Editable Delivery -->

              <!-- Editable Pun -->
              <td class="text-h6">
                <div>
                  {{ item.pun }}
                </div>
              </td>

              <!-- Repeat for other fields -->
              <td class="text-h6">
                <div>
                  {{ item.amount_net }}
                </div>
              </td>
              <td class="text-h6">
                <div>
                  {{ item.cost_production }}
                </div>
              </td>
              <td class="text-h6">
                <div>
                  {{ item.margin }}
                </div>
              </td>
              <td class="text-h6">
                <div>
                  {{ item.tva }}
                </div>
              </td>
              <!-- Action Buttons -->
              <td class="subtitle-2">
                <template>
                  <!-- <v-btn icon color="secondary" @click="editDetails(item)">
                      <v-icon>mdi-update</v-icon>
                    </v-btn> -->
                  <v-btn icon color="orange" @click="addIngredient(item)">
                    <v-icon>mdi-food-variant</v-icon>
                  </v-btn>
                  <!-- <v-btn icon color="red" @click="deleteItem(item)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn> -->
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>

      <!--      <form-enable-->
      <!--        :dialog="dialogForm"-->
      <!--        ref="accountedBills"-->
      <!--        :messages="messages"-->
      <!--        @getItems="getItems"-->
      <!--      ></form-enable>-->
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <form-ingredient
        :dialog="dialogFormIngredient"
        :messages="messages"
        @getItems="getItems"
        ref="ingredientForm"
      ></form-ingredient>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormIngredient from "./FormIngredient";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  props: {
    id: Number,
  },
  data: () => ({
    urlItemsCash: "cashs/isOpen",
    urlItems: "details_bills",
    urlItemsBills: "bills",
    sortBy: ["createdAt"],
    maxDate: new Date().toISOString().substr(0, 10),
    maxDateStatMonth: new Date().toISOString().substr(0, 7),
    dialogFormIngredient: {
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
    menu4: false,
    menu5: false,
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
      start_date: null,
      end_date: null,
    },
    itemsSup: [],
    filter: {
      name: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.bills.delete.success",
    },
  }),
  mounted() {
    this.getItems();
    this.getItemsBills();
  },
  computed: {
    paymentSummary() {
      return [
        {
          key: "cash",
          label: this.$vuetify.lang.t(
            "$vuetify.bills.cols.amount_payment.titleCash"
          ),
          amount: this.itemsSup.amount_cash,
          color: "black",
        },
        {
          key: "om",
          label: this.$vuetify.lang.t(
            "$vuetify.bills.cols.amount_payment.titleOm"
          ),
          amount: this.itemsSup.amount_om,
          color: "teal darken-1",
        },
        {
          key: "momo",
          label: this.$vuetify.lang.t(
            "$vuetify.bills.cols.amount_payment.titleMomo"
          ),
          amount: this.itemsSup.amount_momo,
          color: "blue accent-4",
        },
        {
          key: "bank",
          label: this.$vuetify.lang.t(
            "$vuetify.bills.cols.amount_payment.titleBank"
          ),
          amount: this.itemsSup.amount_bank_card,
          color: "teal darken-1",
        },
        {
          key: "prepaid",
          label: this.$vuetify.lang.t(
            "$vuetify.bills.cols.amount_payment.titlePrepaid"
          ),
          amount: this.itemsSup.amount_prepaid,
          color: "blue accent-4",
        },
      ];
    },
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
    get_sum_entry_settlement() {
      let sum = this._.sumBy(this.items, (t) => {
        return t.payment;
      });
      return sum;
    },
  },
  methods: {
    formatMoney(value) {
      return new Intl.NumberFormat("fr-FR").format(value || 0);
    },
    addIngredient(item) {
      this.dialogFormIngredient.show = true;
      this.messages = {
        title: "$vuetify.ingredient.list.title",
        submit: "$vuetify.dish.update.submit",
        success: "$vuetify.dish.update.success",
      };
      this.$refs.ingredientForm.setForm(item);
      // console.log(this._.includes(this.$auth.user().permissions,"add_event"))
    },
    exportPDF() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url:
            self.urlItemsBills +
            "/details_client" +
            "?patient=" +
            this.$route.params.id +
            "&type=pdf",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Details client par produits";
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
    getItemsBills() {
      let self = this;
      let params = {};
      if (self.form.start_date !== null) {
        params["start_date"] = self.form.start_date;
      }
      if (self.form.end_date !== null) {
        params["end_date"] = self.form.end_date;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsBills + "/details_client" + "?patient=" + this.id,
            method: "get",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsSup = data.content;

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
    getItems() {
      let self = this;
      let params = {};
      if (self.form.start_date !== null) {
        params["start_date"] = self.form.start_date;
      }
      if (self.form.end_date !== null) {
        params["end_date"] = self.form.end_date;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      this.getItemsBills();
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?patient=" + this.id,
            method: "get",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;

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
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "140",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.cost_production.title",
          value: "cost_production",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.margin.title",
          value: "margin",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.tva.title",
          value: "tva",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "90",
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
    FormIngredient,
    DeleteItem,
  },
};
</script>

<style scoped></style>
