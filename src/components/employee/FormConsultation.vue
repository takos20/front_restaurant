<template>
  <v-dialog v-model="dialog.show" persistent max-width="1000px">
    <v-card class="pb-4">
      <v-card-title dark color="white" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t("$vuetify.bills.list.title2") }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text readonly>
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
          <template v-slot:header.bill_type="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.product_name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.product_code="{ header }">
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
          <template v-slot:header.amount_gross="{ header }">
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
          <!--          <template v-slot:header.null="{ header }">-->
          <!--            <tr>-->
          <!--              {{-->
          <!--                $vuetify.lang.t(header.text)-->
          <!--              }}-->
          <!--            </tr>-->
          <!--          </template>-->
          <template v-slot:body="{ items }">
            <v-hover>
              <tbody>
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.bill_type." + item.bills.bill_type
                      )
                    }}
                  </td>
                  <td class="subtitle-2">
                    {{
                      item.details_stock
                        ? item.details_stock.product.name
                        : item.medical_act
                        ? item.medical_act.name
                        : "-"
                    }}
                  </td>
                  <td class="subtitle-2">
                    {{
                      item.details_stock
                        ? item.details_stock.product.code
                        : item.medical_act
                        ? item.medical_act.code
                        : "-"
                    }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pub }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.delivery }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pun }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_gross }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_net }}
                  </td>
                  <!--                <td class="subtitle-2" width="50px">-->
                  <!--                  <template>-->
                  <!--                    <v-tooltip bottom>-->
                  <!--                      <template v-slot:activator="{ on }">-->
                  <!--                        <v-btn-->
                  <!--                            @click="editDetails(item)"-->
                  <!--                            color="secondary"-->
                  <!--                            icon-->
                  <!--                            text-->
                  <!--                            v-on="on"-->
                  <!--                            v-show="$vuetify.breakpoint.smAndDown || hover"-->
                  <!--                        >-->
                  <!--                          <v-icon mdi-18px>mdi-grease-pencil</v-icon>-->
                  <!--                        </v-btn>-->
                  <!--                      </template>-->
                  <!--                      <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>-->
                  <!--                    </v-tooltip>-->
                  <!--                    <v-tooltip bottom>-->
                  <!--                      <template v-slot:activator="{ on }">-->
                  <!--                        <v-btn-->
                  <!--                            @click="deleteItem(item)"-->
                  <!--                            color="red"-->
                  <!--                            icon-->
                  <!--                            text-->
                  <!--                            v-on="on"-->
                  <!--                            dark-->
                  <!--                            v-show="$vuetify.breakpoint.smAndDown || hover"-->
                  <!--                        >-->
                  <!--                          <v-icon mdi-18px>mdi-delete-outline</v-icon>-->
                  <!--                        </v-btn>-->
                  <!--                      </template>-->
                  <!--                      <span>{{-->
                  <!--                          $vuetify.lang.t("$vuetify.btn.remove")-->
                  <!--                        }}</span>-->
                  <!--                    </v-tooltip>-->
                  <!--                  </template>-->
                  <!--                </td>-->
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
  <!--    <pdf :src="pdfsrc"></pdf>-->
</template>

<script>
// import axios from "axios";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
// const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          patient: null,
          doctor: null,
          medical_act: null,
          patient_name: null,
          patient_balance: null,
          net_payable: null,
          patient_type: null,
          bills_date: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          pub: null,
          pun: null,
          amount_gross: null,
          payment_method: "CASH",
          quantity_ordered: null,
          amount_net: null,
          total_amount: null,
          quantity_served: null,
          details_stock: null,
          delivery: null,
          balance: null,
          bills: null,
          reference_no: null,
          additional_info: "R.A.S",
          bills_amount: null,
          code: null,
          cashier: null,
          bill_type: "pharmacy",
          advances: 0,
          bill_shape: "CLASSIC",
        };
      },
    },
  },
  data: () => ({
    pdfsrc: null,
    headers: [],
    headers_act: [],
    items: [],
    items_act: [],
    meta: {},
    sum: "",
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,

    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },

    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
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
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsDetails();
      },
      deep: true,
    },
  },
  created() {
    this.setHeaders();
    this.setHeadersAct();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.bill_type.title",
          value: "bill_type",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: true,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: true,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.supplies.cols.actions.title",
        //   value: null,
        //   align: "start",
        //   sortable: true,
        //   width: "80"
        // }
      ];
    },
    setHeadersAct() {
      this.headers_act = [
        {
          text: "$vuetify.medical_act.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: true,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.supplies.cols.actions.title",
        //   value: null,
        //   align: "start",
        //   sortable: true,
        //   width: "80"
        // }
      ];
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataFormdetails() {
      let data = {
        quantity_served: this.formData.quantity_served,
        bill_type: this.form.bill_type,
        details_stock:
          this.formData.details_stock === undefined ||
          this.formData.details_stock === null
            ? ""
            : this.formData.details_stock["id"],
        quantity_ordered:
          this.formData.quantity_ordered === null
            ? 0
            : this.formData.quantity_ordered,
        pub:
          this.form.bill_type === "pharmacy"
            ? this.get_product_public_price
            : this.get_product_public_price_act,
        pun:
          this.form.bill_type === "pharmacy"
            ? this.get_pu_net
            : this.get_pu_net_act,
        delivery:
          this.formData.delivery === null || this.formData.delivery === ""
            ? 0
            : this.formData.delivery,
        amount_gross:
          this.form.bill_type === "pharmacy"
            ? this.get_amount_gross
            : this.get_amount_gross_act,
        amount_net:
          this.form.bill_type === "pharmacy"
            ? this.get_amount_net
            : this.get_amount_net_act,
        createdAt: this.form.bills_date,
        product: this.form.patient["id"],
        medical_act:
          this.formData.medical_act === undefined ||
          this.formData.medical_act === null
            ? ""
            : this.formData.medical_act["id"],
        // pub:this.get_product_public_price,0
        // pub_act:this.get_product_public_price_act,
        // pun:this.get_pu_net,
        // pun_act:this.get_pu_net_act,
        // delivery:
        //     this.formData.delivery === null || this.formData.delivery === ""
        //         ? 0
        //         : this.formData.delivery,
        // amount_gross:this.get_amount_gross,
        // amount_gross_act:this.get_amount_gross_act,
        // amount_net:this.get_amount_net,
        // amount_net_act:this.get_amount_net_act,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.patient_name = item.patient["name"];
      this.form.patient_type = item.patient["shape"];
      this.form.is_accounted = item.is_accounted;
      this.form.details_stock = item.details_stock;
      this.form.advances = item.advances;
      this.form.bills_date = item.createdAt;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      this.form.bill_shape = item.bill_shape;
      this.form.additional_info = item.additional_info;
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
            if (data.content[0]?.details_stock === null) {
              self.items_act = data.content;
            } else {
              self.items = data.content;
            }

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
  },
  computed: {},
  mounted() {},
  components: {},
};
</script>
