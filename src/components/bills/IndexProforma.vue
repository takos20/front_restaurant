<template>
  <div>
    <!--    <div-->
    <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
    <!--      style="height: 30px; margin-top: 30px"-->
    <!--      v-if="this.isActive === 'false'"-->
    <!--    >-->
    <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
    <!--    </div>-->
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_proforma')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-content-paste</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.add") }}
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
        <!-- <template v-slot:header.patient_type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
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
        <!-- <template v-slot:header.insurance="{ header }">
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
        </template> -->
        <template v-slot:header.is_proforma_valid="{ header }">
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
                <!-- <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.bill_type." + item.bill_type
                    )
                  }}
                </td> -->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <!-- <td class="subtitle-2" v-if="item.patient.shape === 'NORMAL'">
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

                <td class="subtitle-2" v-else>
                  /
                </td> -->
                <td class="subtitle-2">
                  {{ item.bills_amount }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.insurance }}
                </td>
                <td class="subtitle-2">
                  {{ item.insurance_patient }}
                </td> -->

                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_proforma_valid">
                        <v-icon
                          color="primary"
                          class="pointer"
                          dark
                          @click="enabled(item)"
                          v-on="on"
                        >
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          class="pointer"
                          dark
                          @click="enabled(item)"
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
                    <span v-if="!item.is_proforma_valid">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.bills.cols.is_proforma_valid.validate"
                        )
                      }}
                    </span>
                    <span v-else>
                      {{
                        $vuetify.lang.t(
                          "$vuetify.bills.cols.is_proforma_valid.failed"
                        )
                      }}
                    </span>
                  </v-tooltip>
                </td>

                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_proforma'
                          )
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
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_proforma'
                          )
                        "
                      >
                        <v-btn
                          @click="deleteItem(item)"
                          color="red"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                          dark
                        >
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>
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
        ref="proformaForm"
      ></form-bills>
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
      <form-cash
        :dialog="dialogFormCash"
        ref="cashForm"
        :messages="messages"
        @getItems="getOpenCash"
      ></form-cash>
      <form-inv :dialog="dialogFormInv" ref="invForm"></form-inv>
      <form-enable
        :dialog="dialogFormProforma"
        ref="validateProforma"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
import FormEnable from "./validateProforma";
import FormBills from "./FormProforma";
import DeleteItem from "./../bills_analysis/Validate_bill_delete";
import FormCash from "./../cash/Form";
import FormInv from "./IsInventory";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItemsCash: "cashs/isOpen",
    urlItems: "bills/current",
    urlDeleteItems: "",
    deleteItems: "/bills",
    sortBy: ["createdAt"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormProforma: {
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
      amount_paid: null,
      bill_shape: null,
      storage_depots: null,
    },
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
    // this.getOpenCash();
    this.getItems();
  },
  methods: {
    enabled(item) {
      this.$refs.validateProforma.setForm(item);
      if (!item.is_active) {
        this.dialogFormProforma.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.bills.cols.is_proforma_valid.validate",
          submit: "$vuetify.bills.update.submit",
          success: "$vuetify.bills.update.success",
        };
      } else {
        this.dialogFormProforma.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.bills.cols.is_proforma_valid.failed",
          submit: "$vuetify.bills.update.submit",
          success: "$vuetify.bills.update.success",
        };
      }
    },
    deleteItem(item) {
      this.urlDeleteItems = this.deleteItems + "/" + item.id;
      this.dialogDelete.show = true;
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
        title: "$vuetify.cash.new.title",
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
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?is_proforma=true",
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
          width: "50",
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

        // {
        //   text: "$vuetify.bills.cols.patient_type.title",
        //   value: "patient_type",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3"
        // },

        {
          text: "$vuetify.bills.cols.net_payable.title",
          value: "net_payable",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.insurance.title",
        //   value: "insurance",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.insurance.title_patient",
        //   value: "insurance_patient",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.is_proforma_valid.title",
          value: "is_proforma_valid",
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
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.proforma.new.title",
        submit: "$vuetify.proforma.new.submit",
        success: "$vuetify.proforma.new.success",
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
        title: "$vuetify.proforma.update.title",
        submit: "$vuetify.proforma.update.submit",
        success: "$vuetify.proforma.update.success",
      };
      this.$refs.proformaForm.setForm(item);
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
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
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
    FormCash,
    FormBills,
    FormInv,
    FormEnable,
    DeleteItem,
  },
};
</script>

<style scoped></style>
