<template>
  <v-dialog v-model="dialog.show" persistent max-width="1300px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <!--        <v-spacer></v-spacer>-->
        <!--        <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])">-->
        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            color="#4E342E"-->
        <!--            @click="createD()"-->
        <!--            dark-->
        <!--            dense-->
        <!--            small-->
        <!--          >-->
        <!--            <v-icon dark>-->
        <!--              mdi-plus-->
        <!--            </v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="#4E342E"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_N.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-menu
                v-model="menu3"
                color="#4E342E"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.bills_date"
                    color="#4E342E"
                    :label="
                      $vuetify.lang.t('$vuetify.bills.cols.date_bill.title')
                    "
                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    dense
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.bills_date"
                  color="#4E342E"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-select
                v-model="form.bill_type"
                color="primary"
                :items="optionBills.type_bills"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_type.title')"
                :placeholder="
                  $vuetify.lang.t('$vuetify.bills.cols.bill_type.title')
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                @change="resetAll()"
                dense
              ></v-select>
            </v-col>
            <!-- <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_delivery') ||
                form.bill_type === 'DELIVERY'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createDelivery()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_catering') ||
                form.bill_type === 'CATERING'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createCatering()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_event') ||
                form.bill_type === 'EVENT'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createEvent()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col> -->
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="$auth.user().username"
                color="#4E342E"
                :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: -15px">
              <v-autocomplete
                v-model="form.patient"
                :items="itemsPatient"
                :loading="isLoadingPatient"
                :search-input.sync="searchPatient"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_name.title')
                "
                prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                autofocus
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="margin-top: -15px">
              <v-btn
                class="mr-8 white--text"
                :disabled="
                  !_.includes(this.$auth.user().permissions, 'add_patient')
                "
                dense
                @click="createPatient()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="#4E342E" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4"></v-divider>
      </v-form>

      <v-form :disabled="this.get_bills_amount == 0">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.net_payable.title')
                "
                class="font-weight-bold"
                outlined
                :value="get_bills_amount"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.tva.title')"
                class="font-weight-bold"
                outlined
                :value="get_bills_tva"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.ttc.title')"
                class="font-weight-bold"
                outlined
                :value="get_bills_ttc"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.net_payable.title2')
                "
                class="font-weight-bold"
                outlined
                :value="get_bills_amount_net"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                v-model="form.amount_received"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.amount_received.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRuleamount_received]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                :value="get_bills_amount_paid"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.amount_paid.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRuleamount_paid]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="get_balance"
                :value="get_balance"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.balance.title')"
                class="font-weight-bold"
                outlined
                dense
                readonly
                min="0"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="get_refund"
                :value="get_refund"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.refund.title')"
                class="font-weight-bold"
                outlined
                dense
                disabled
                min="0"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: -15px">
              <v-select
                v-model="form.payment_method"
                color="primary"
                :items="optionPayment.type_Payment"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                "
                prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO'
              "
            >
              <v-text-field
                v-model="form.phone_number"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.phone_number.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRulephone_number]"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="this.form.payment_method === 'BANK_CARD'"
            >
              <v-text-field
                v-model="form.bank_card_number"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.bank_card_number.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRulebank_card_number]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO' ||
                this.form.payment_method === 'BANK_CARD'
              "
            >
              <v-text-field
                v-model="form.transaction_ref"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.transaction_ref.title')
                "
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions style="margin-top: -25px">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItemsCat()"
            class="ml-2 my-1"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="#4E342E">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-spacer></v-spacer>
          <!-- <v-btn dark color="#4E342E" @click="save()" :loading="loadingBtn">
            {{ $vuetify.lang.t("$vuetify.bills.new.save_bills") }}
          </v-btn> -->
          <v-btn
            color="#4E342E"
            :loading="loadingBtn"
            class="white--text"
            light
            @click="save_print_bills()"
            :disabled="
              form.amount_received == null ||
              form.payment_method == 'NO_PAY' ||
              !form.patient
            "
          >
            {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-3"></v-divider>
      </v-form>
      <v-card-text style="margin-top: -20px">
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

          <template v-slot:header.amount_gross="{ header }">
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
          <template v-slot:header.pun="{ header }">
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
                  <td class="subtitle-2">
                    {{ item.dish ? item.dish.name : "-" }}
                  </td>
                  <td class="subtitle-2">
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
                  </td>
                  <td class="subtitle-2" width="50px">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editDetails(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-grease-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            dark
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-delete-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{
                          $vuetify.lang.t("$vuetify.btn.remove")
                        }}</span>
                      </v-tooltip>
                    </template>
                  </td>
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItemsDetails="getItemsDetails"
        ></delete-item>
      </v-card-text>
    </v-card>

    <!-- <form-cmv :dialog="dialogFormCMV"></form-cmv> -->
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    <form-patient :dialog="dialogForm" :messages="messages"></form-patient>
    <form-delivery
      :dialog="dialogFormDelivery"
      :messages="messages"
    ></form-delivery>
    <form-catering
      :dialog="dialogFormCatering"
      :messages="messages"
    ></form-catering>
    <form-event :dialog="dialogFormEvent" :messages="messages"></form-event>
  </v-dialog>
</template>

<script>
// import FormCmv from "./../bills/FormCashMovement";
import FormPdf from "./../bills/Pdf";
import FormPatient from "./../patient/Form";
import FormCatering from "./../catering/Form";
import FormEvent from "./../event/Form";
import FormDelivery from "./../delivery/Form";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
// const FileSaver = require("file-saver");

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          bills_date: null,
          pub: null,
          tva: null,
          payment_method: null,
          bill_type: null,
          transaction_ref: null,
          phone_number: null,
          bank_card_number: null,
          had_been_paid: false,
          total_amount: null,
          quantity_served: null,
          product: null,
          subtotal: null,
          total: null,
          bills: null,
          bills_amount: null,
          code: null,
          cashier: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
      coefficient: null,
      number_account: null,
      quote_internal: null,
      quote_external: null,
    },
    optionPayment: {
      type_Payment: [],
    },
    headers: [],
    items: [],
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    urlPatient: "patients/allPatients",
    itemsCategory: [],
    itemsProducts: [],
    meta: {},
    sum: "",
    urlProducts: "dishes",
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 6,
    // pageCat: 1,
    itemsPerPageProd: 6,
    tva_collected: null,
    sortByCat: "id",
    sortByProd: "id",
    //itemPerPages: 3,
    itemPerPageOptionsProd: [6, 10, 30],
    itemPerPageOptions: [1000],
    urlDeleteItems: "",
    sortDesc: true,
    had_paid: false,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingProduct: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    paginationCategory: {},
    paginationProduct: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    urlItemsCash: "cashs/isOpen",
    urlItemsHospital: "hospitals",
    isLoading: false,
    search: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    dialogFormCMV: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDelivery: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isActive: false,
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionBills: {
      type_bills: [],
    },
    optionShape: {
      type_shape: [],
    },
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
    },
    dialogFormEvent: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormCatering: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_received: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_paid: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulephone_number: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulebank_card_number: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    itemsProduct: [],
    urlProduct: "products",
    urlItemsCategory: "categories",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsDetails();
        this.getItemsCategory();
        this.getItemsProduct();
      },
      deep: true,
    },
    paginationProduct: {
      handler() {
        this.getItemsProduct();
      },
      deep: true,
    },
    searchPatient(value) {
      if (value === null) return;
      this.isLoadingPatient = true;
      const params = { name: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlPatient,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getItemsCategory();
    this.setHeaders();
    this.getOptionsBill();
    this.getOptionsPayment();
    this.resetItemsDetails();

    //this.setItemRoles();
  },
  mounted() {
    this.getOpenCash();
    this.getHospital();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    getHospital() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.tva_collected = data.content[0].VAT_collected;
            resolve(response);
          });
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
    refreshItemsCat() {
      let self = this;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    // updateItemsPerPage (number) {
    //   this.itemsPerPage = number;
    // },
    goToNextPage2() {
      this.e1 = 2;
    },
    createPatient() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patient.new.title",
        submit: "$vuetify.patient.new.submit",
        success: "$vuetify.patient.new.success",
      };
    },
    createEvent() {
      this.dialogFormEvent.show = true;
      this.messages = {
        title: "$vuetify.event.new.title",
        submit: "$vuetify.event.new.submit",
        success: "$vuetify.event.new.success",
      };
    },
    createCatering() {
      this.dialogFormCatering.show = true;
      this.messages = {
        title: "$vuetify.catering.new.title",
        submit: "$vuetify.catering.new.submit",
        success: "$vuetify.catering.new.success",
      };
    },
    createDelivery() {
      this.dialogFormDelivery.show = true;
      this.messages = {
        title: "$vuetify.delivery.new.title",
        submit: "$vuetify.delivery.new.submit",
        success: "$vuetify.delivery.new.success",
      };
    },
    backTo() {
      this.e1 = 1;
      this.page = 1;
      this.idCategory = null;
      this.itemsProducts = [];
    },
    backTo2() {
      this.e1 = 2;
    },
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
    getOptionsBill() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_bills, (type_bills) => {
        self.optionBills.type_bills.push({
          text: self.$vuetify.lang.t(type_bills.text),
          value: type_bills.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
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
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
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
    createD() {
      this.dialogFormCMV.show = true;
      this.formData = {
        id: null,
        name: null,
        coefficient: null,
        number_account: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    createP() {
      this.dialogFormSet.show = true;
      this.formData = {
        id: null,
        name: null,
        coefficient: null,
        number_account: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        cashier: this.form.cash
          ? this.form.cash["user"]["id"]
          : this.$auth.user().id,
        patient: this.form.patient["id"],
        bills_date: this.form.bills_date,
        bill_type: this.form.bill_type,
        transaction_ref: this.form.transaction_ref,
        phone_number: this.form.phone_number,
        bank_card_number: this.form.bank_card_number,
        cash:
          this.form.cash === undefined || this.form.cash === null
            ? null
            : this.form.cash["id"],
        payment_method:
          this.form.amount_received === 0
            ? "NO_PAY"
            : this.defaultPaymentMethod,
        bills_amount: this.get_bills_amount,
        amount_paid: this.get_bills_amount_paid,
        net_payable: this.get_bills_amount_net,
        tva: this.get_bills_tva,
        ttc: this.get_bills_ttc,
        amount_received:
          this.form.amount_received === null ? 0 : this.form.amount_received,
        balance: this.get_balance,
        refund: this.get_refund,
      };
      return data;
    },
    resetDataFormDetails(itemProd) {
      itemProd.qte_served_fake = 0;
    },
    resetDataForm() {
      this.form.id = null;
      this.form.product = null;
      this.itemsProducts = [];
      this.e1 = 1;
      this.had_paid = false;
      this.items = [];
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
      this.resetItemsDetails();
    },
    resetItemsDetails() {
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
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills + "?bills=reset",
            params: params,
          })
          .then((response) => {
            let data = response.data;
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
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },

    getDataFormdetails(itemProd) {
      let data = {
        quantity_served: itemProd.qte_served_fake,
        cash:
          this.form.cash === undefined || this.form.cash === null
            ? null
            : this.form.cash["id"],
        dish: itemProd.id,
        pub: itemProd.price,
        pun: itemProd.price,
        bills: this.form.bills,
        bill_type: this.form.bill_type,
        medical_act: null,
        room: null,
        ordinance: null,
        laboratory: null,
        surgery: null,
        insurance: 0,
        patient: this.form.patient["id"],
        insurance_patient: 0,
        type_consultation: null,
        checkup: null,
        radiography: null,
        exam_investigation: null,
        diagnostic: null,
        amount_gross: this.get_subtotal(itemProd),
        amount_net: this.get_subtotal(itemProd),
        storage_depots: null,
        tva: itemProd.qte_served_fake
          ? parseInt(itemProd.price * this.tva_collected) / 100
          : parseInt(this.tva_collected * itemProd.price) / 100,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.cash = item.cash;
      this.form.code = item.code;
      this.form.patient = item.patient;
      this.itemsPatient.push(item.patient);
      this.form.patient = item.patient;
      this.form.bank_card_number = item.bank_card_number;
      this.form.amount_received = item.amount_received;
      this.form.amount_paid = item.amount_paid;
      this.form.phone_number = item.phone_number;
      this.form.bills_date = item.createdAt;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      // this.form.bill_shape = item.bill_shape;
      this.form.refund = item.refund;
      this.form.tva = item.tva;
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    refreshItemsDetail() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            if (self.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            // FileSaver.saveAs(blob, fileName);
            // const dataUrl = window.URL.createObjectURL(blob);
            //
            // // Open the window
            // const pdfWindow = window.open(dataUrl);
            //
            // // Call print on it
            // pdfWindow.print();
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },

    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    getItemsDetails() {
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
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills + "?bills=" + this.form.bills,
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
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    getItemsCategory() {
      let self = this;
      const { page, itemsPerPageCat } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPageCat,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsCategory,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsCategory = data.content;
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
    getItemsProduct(itemCategory) {
      this.e1 = 2;
      let self = this;
      if (this.idCategory === null) {
        this.idCategory = itemCategory?.id;
      }
      const { page, itemsPerPage } = this.paginationProduct;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingProduct.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlProducts + "?category=" + this.idCategory,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsProducts = data.content;
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
            self.loadingProduct.list = false;
            resolve();
          });
      });
    },

    editDetails(item) {
      this.itemsProduct = item.product;
      this.form.quantity_served = item.quantity_served;
    },
    get_subtotal(itemProd) {
      // console.log("hum",this.form.product.purchase_price);
      if (itemProd.qte_served_fake === undefined) {
        return 0;
      } else {
        let subtotal = "";
        subtotal = itemProd.qte_served_fake * itemProd.price;
        return subtotal;
      }
    },
    saveDetails(itemProd) {
      console.log("this.getDataFormdetails()");
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: self.getMethod(),
            data: self.getDataFormdetails(itemProd),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            this.resetDataFormDetails(itemProd);
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
  },
  computed: {
    defaultPaymentMethod: {
      get() {
        return "CASH";
      },
      set(newValue) {
        this.form.payment_method = newValue;
      },
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemPerPageCat);
    },
    numberOfPagesProd() {
      return Math.ceil(this.items.length / this.itemsPerPageProd);
    },
    get_bills_amount() {
      let total = 0; // Ensure the total starts at 0 before the loop

      this.items.forEach((d) => {
        total += d.amount_net; // Sum up the amount_net for each item
      });
      // console.log("hum",total);

      return total;
    },
    get_bills_tva() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.tva;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);

      return total;
    },
    get_bills_ttc() {
      let total = this.get_bills_tva + this.get_bills_amount;
      return total;
    },
    get_tva() {
      let tva = 0;
      tva = this.formData.unit_price
        ? parseInt(this.formData.unit_price * this.tva_collected) / 100
        : parseInt(this.tva_collected * this.get_price_patient) / 100;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.simple_tva = tva;
      return tva;
    },
    get_bills_amount_net() {
      let insurance = 0;
      let total = 0;
      total = this.get_bills_amount;
      insurance =
        parseInt(total) + parseInt(this.simple_tva ? this.simple_tva : 0);
      return insurance;
    },
    get_amount_gross() {
      let amount_gross = 0;
      amount_gross =
        this.itemProd.qte_served_fake * this.formData.unit_price
          ? this.formData.unit_price
          : this.itemProd.qte_served_fake * this.get_price_patient;
      return amount_gross;
    },
    // get_amount_net() {
    //   if (this.itemProd.qte_served_fake === undefined) {
    //     return this.get_subtotal;
    //   } else {
    //     let amount_net = "";
    //     amount_net = this.get_pu_net * itemProd.qte_served_fake;
    //     return amount_net;
    //   }
    // },
    get_bills_amount_paid() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received > this.get_bills_amount_net) {
        return this.get_bills_amount_net;
      } else {
        return this.form.amount_received;
      }
    },

    get_balance() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received === undefined) {
        return this.get_bills_amount_net;
      } else {
        let balance = "";
        balance = this.get_bills_amount_net - this.form.amount_received;
        if (balance < 0) {
          balance = 0;
        }
        return balance;
      }
    },
    get_refund() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received === undefined) {
        return this.get_bills_amount_net;
      } else {
        let refund = "";
        refund = this.form.amount_received - this.get_bills_amount_net;
        if (refund < 0) {
          refund = 0;
        }
        return refund;
      }
    },
    get_product_code() {
      let product_code = "";
      product_code =
        this.form.product === null || this.form.product === undefined
          ? ""
          : this.form.product?.code;
      let product_stock = "";
      product_stock =
        this.form.product === null || this.form.product === undefined
          ? ""
          : this.form.product?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      return code_stock;
    },
    get_product_public_price() {
      let product_public_price = "";
      product_public_price =
        this.form.product === null ? "" : this.form.product?.public_price;
      return product_public_price;
    },
    get_product_price() {
      let product_price = "";
      product_price =
        this.form.product === null ? "" : this.form.product?.purchase_price;
      return product_price;
    },

    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.total_amount.required")
        );
      return errors;
    },
  },
  components: {
    FormPdf,
    DeleteItem,
    FormPatient,
    FormEvent,
    FormCatering,
    FormDelivery,
  },
};
</script>
<style>
/* .v-card:hover {
  transform: scale(1.02);
  transition: 0.2s;
} */
</style>
