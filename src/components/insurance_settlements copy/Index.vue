<template>
  <div>
    <div
      class="title mb-5 black--text red lighten-5 text-right"
      style="height: 30px; margin-top: 30px"
      v-if="this.isActive === false"
    >
      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}
    </div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template>
          <v-btn
            class="mr-2 my-2"
            @click="create()"
            color="primary"
            dark
            v-if="this.isActive === true"
          >
            <v-icon left>mdi-account-star</v-icon>
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
        <v-btn
          color="#f1f5fc"
          @click="showFilter()"
          class="mr-2 my-2"
          depressed
        >
          <v-icon color="primary" left>mdi-filter-outline</v-icon>
          {{
            $vuetify.lang.t("$vuetify.patients_settlements.btn.filter.title")
          }}
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
        <template v-slot:header.code="{ header }">
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
          </tr> </template
        ><template v-slot:header.code_patient="{ header }">
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
          </tr> </template
        ><template v-slot:header.payment="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.payment_method="{ header }">
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
                  {{ $moment(item.date).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.code }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.payment }}
                </td>
                <td class="subtitle-2">
                  {{ item.payment_method }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'edit_patient_settlement'
                          )
                        "
                      >
                        <v-btn
                          @click="editPatients_settlements(item)"
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
                    <!--<v-tooltip bottom>-->
                    <!--<template-->
                    <!--v-slot:activator="{ on }"-->
                    <!--v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])"-->
                    <!--&gt;-->
                    <!--<v-btn-->
                    <!--@click="deleteItem(item)"-->
                    <!--color="red"-->
                    <!--icon-->
                    <!--text-->
                    <!--v-on="on"-->
                    <!--v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--dark-->
                    <!--&gt;-->
                    <!--<v-icon>mdi-delete-outline</v-icon>-->
                    <!--</v-btn>-->
                    <!--</template>-->
                    <!--<span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>-->
                    <!--</v-tooltip>-->
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-settlements
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="patients_settlementsForm"
      ></form-settlements>
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
import FormSettlements from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "patients_settlements",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isActive: false,
    dialogDelete: {
      show: false,
    },
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
      patients_settlements: null,
      reference_no: null,
      additional_info: null,
      patients_settlements_amount: null,
      code: null,
      cashier: null,
      bill_type: null,
      advances: null,
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
      success: "$vuetify.patients_settlements.delete.success",
    },
  }),
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
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            if (self.items.length !== 0) {
              this.isActive = true;
            } else {
              this.isActive = false;
            }
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
          text: "$vuetify.patients_settlements.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
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
        {
          text: "$vuetify.patients_settlements.cols.code_patient.title",
          value: "code_patient",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.patient_name.title",
          value: "patient_name",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.payment.title",
          value: "payment",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.payment_method.title",
          value: "payment_method",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patients_settlements.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.patients_settlements.cols.actions.title",
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
        title: "$vuetify.patients_settlements.new.title",
        submit: "$vuetify.patients_settlements.new.submit",
        success: "$vuetify.patients_settlements.new.success",
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
        patients_settlements: null,
        reference_no: null,
        additional_info: null,
        patients_settlements_amount: null,
        code: null,
        cashier: null,
        bill_type: null,
        advances: null,
        bill_shape: null,
        storage_depots: null,
      };
    },
    editPatients_settlements(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patients_settlements.update.title",
        submit: "$vuetify.patients_settlements.update.submit",
        success: "$vuetify.patients_settlements.update.success",
      };
      this.$refs.patients_settlementsForm.setForm(item);
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
      if (self.filter.patients_settlementsname !== null) {
        params["patients_settlementsname"] =
          self.filter.patients_settlementsname;
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
    FormSettlements,
    DeleteItem,
  },
};
</script>

<style scoped></style>
