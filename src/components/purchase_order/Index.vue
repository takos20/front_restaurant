<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_purchase_order')"
        >
          <!-- <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])"></template> -->
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-briefcase-plus</v-icon>
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
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.supplies.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="6">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.category.cols.code.title')"
              prepend-inner-icon="mdi-code-array"
              v-model="filter.code"
              clearable
              dense
              outlined
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.suppliers"
              :items="itemsSuppliers"
              :loading="isLoadingSuppliers"
              :search-input.sync="searchSuppliers"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.supplies.cols.supplier.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              autofocus
              @change="performFilter"
              dense
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
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
        <template v-slot:header.code="{ header }">
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
          </tr> </template
        ><template v-slot:header.suppliers="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.purchase_amount="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_received="{ header }">
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

                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ item.suppliers.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.purchase_amount }}
                </td>

                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_received === true">
                        <v-icon color="green" class="pointer" dark>
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          @click="enabled(item)"
                          class="pointer"
                          dark
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
                    <template>
                      <span v-if="item.is_received === false">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.purchase_order.cols.is_received.title"
                          )
                        }}
                      </span>
                      <span v-else>
                        {{
                          $vuetify.lang.t(
                            "$vuetify.purchase_order.cols.is_received.title"
                          )
                        }}
                      </span>
                    </template>
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
                            'change_purchase_order'
                          )
                        "
                      >
                        <v-btn
                          @click="editPurchase_order(item)"
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
                            'view_complaints'
                          )
                        "
                      >
                        <v-btn
                          @click="viewComplaints(item)"
                          color="btn_logout"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-note-text</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.complaints.title")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_purchase_order'
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
      <form-purchase
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="purchase_orderForm"
      ></form-purchase>
      <form-complaints
        :dialog="dialogFormComplaints"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="complaintsForm"
      ></form-complaints>
      <form-enable
        :dialog="dialogForm"
        ref="accountedSupplies"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormPurchase from "./Form";
import FormComplaints from "./../complaints/Form";
import DeleteItem from "./../Common/Delete";
import FormEnable from "./accountedSupplies";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "purchase_orders",
    sortBy: ["createdAt"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormComplaints: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    form: {
      id: null,
      supplies: null,
      total_amount: null,
      quantity: null,
      product: null,
      type_product: null,
      consumable: null,
      reagent: null,
      arrival_price: null,
      arrival_date: null,
      suppliers: null,
      purchase_order: null,
      is_received: null,
      code: null,
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
    urlSuppliers: "suppliers",
    itemsSuppliers: [],
    searchSuppliers: null,
    isLoadingSuppliers: false,
    filter: {
      code: null,
      storage_depots: null,
      suppliers: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.purchase_order.delete.success",
    },
  }),
  watch: {
    searchSuppliers(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingSuppliers = true;
      this.$store
        .dispatch("request", {
          url: self.urlSuppliers,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsSuppliers = response.data.content;
        })
        .finally(() => (this.isLoadingSuppliers = false));
    },
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
            url: self.urlItems + "?type_order=" + this.$route.params.idD,
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
    enabled(item) {
      this.dialogForm.shows.showInfo = true;
      this.$refs.accountedSupplies.setForm(item);
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.supplies.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.purchase_order.cols.order_date.title",
          value: "arrival_date",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.supplier.title",
          value: "suppliers",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.purchase_order.cols.purchase_amount.title",
          value: "purchase_amount",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.purchase_order.cols.is_received.title",
          value: "is_received",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "6",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.purchase.new.title",
        submit: "$vuetify.purchase.new.submit",
        success: "$vuetify.purchase.new.success",
      };
      this.form = {
        id: null,
        pasysto: null,
        padiasto: null,
        temperature: null,
        bpm: null,
        size: null,
        electrophoresis: null,
        weight: null,
        blood_group: null,
        allergies: null,
        pathologies: null,
        name: null,
        religion: null,
        type_id: null,
        mother_name: null,
        emergency_name: null,
        emergency_contact: null,
        maritalStatus: null,
        number_id: null,
        email: null,
        date_id: null,
        child: null,
        dateNaiss: null,
        reference_no: null,
        other_phone: null,
        phone: null,
        insurance_name: null,
        insurance_number: null,
        code: null,
        age: null,
        gender: null,
        shape: null,
      };
    },
    editPurchase_order(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.purchase.update.title",
        submit: "$vuetify.purchase.update.submit",
        success: "$vuetify.purchase.update.success",
      };
      this.$refs.purchase_orderForm.setForm(item);
    },
    viewComplaints(item) {
      this.dialogFormComplaints.show = true;
      this.messages = {
        title: "$vuetify.complaints.update.title",
        submit: "$vuetify.complaints.update.submit",
        success: "$vuetify.complaints.update.success",
      };
      this.$refs.complaintsForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.suppliers !== null) {
        params["suppliers"] = self.filter.suppliers;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
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
  mounted() {},
  components: {
    FormPurchase,
    FormComplaints,
    DeleteItem,
    FormEnable,
  },
};
</script>

<style scoped></style>
