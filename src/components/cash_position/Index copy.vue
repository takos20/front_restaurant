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
            this.isActive === 'false'
          "
        >
          <v-btn class="mr-2 my-2" @click="createCash()" color="primary" dark>
            {{ $vuetify.lang.t("$vuetify.cash.new.title") }}
          </v-btn>
        </template>
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'add_cash_movement') &&
            this.isActive === 'true'
          "
        >
          <v-btn
            class="my-2 mr-2"
            @click="createCashMovement()"
            color="primary"
            dark
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}
          </v-btn>
        </template>
        <template
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'add_patientsettlement'
            ) && this.isActive === 'true'
          "
        >
          <v-btn
            class="my-2 mr-2"
            @click="createPatientSettlement()"
            color="primary"
            dark
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.patients_settlements.title") }}
          </v-btn>
        </template>
        <template>
          <v-btn
            class="mr-2 my-2"
            @click="close(cash)"
            color="teal darken-1"
            dark
            v-if="
              _.includes(this.$auth.user().permissions, 'close_cash') &&
              this.isActive === 'true'
            "
          >
            {{ $vuetify.lang.t("$vuetify.cash.cols.status.titleClose") }}
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
            <v-col cols="12" sm="2">
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
        :sort-desc="sortAsc"
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
        <template v-slot:header.type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.motive="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.name_movement="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.amount_movement="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.create_date="{ header }">
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
                  <v-tooltip top>
                    <template
                      v-slot:activator="{ on }"
                      v-if="item.type === 'ENTRY'"
                    >
                      <v-icon
                        color="teal darken-1"
                        class="pointer"
                        dark
                        v-on="on"
                        style="font-size: 15px"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.cash_movement.cols.type." + item.type
                          )
                        }}
                      </v-icon>
                    </template>
                    <template v-slot:activator="{ on }" v-else>
                      <v-icon
                        color="red accent-4"
                        class="pointer"
                        dark
                        v-on="on"
                        style="font-size: 15px"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.cash_movement.cols.type." + item.type
                          )
                        }}
                      </v-icon>
                    </template>
                  </v-tooltip>
                </td>
                <td class="subtitle-2">
                  {{ item.cash.user.username }}
                </td>
                <td class="subtitle-2">
                  {{ item.motive }}
                </td>
                <td class="subtitle-2">
                  {{ item.name_movement.name }}
                </td>
                <td class="subtitle-2">
                  <template v-if="item.type === 'ENTRY'">
                    <v-chip
                      class="ma-2"
                      color="teal darken-1"
                      text-color="white"
                      small
                    >
                      {{ item.amount_movement }} FCFA
                    </v-chip>
                  </template>
                  <template v-else>
                    <v-chip
                      class="ma-2"
                      color="red accent-4"
                      text-color="white"
                      small
                    >
                      {{ item.amount_movement }} FCFA
                    </v-chip>
                  </template>
                </td>
                <!--<td class="subtitle-2">-->
                <!--<v-tooltip top>-->
                <!--<template-->
                <!--v-slot:activator="{ on }"-->
                <!--v-if="item.type === 'ENTRY'"-->
                <!--&gt;-->
                <!--<v-icon-->
                <!--color="teal darken-1"-->
                <!--class="pointer"-->
                <!--dark-->
                <!--v-on="on"-->
                <!--style="font-size: 15px"-->
                <!--&gt;-->
                <!--{{ item.amount_movement }} FCFA-->
                <!--</v-icon>-->
                <!--</template>-->
                <!--<template v-slot:activator="{ on }" v-else>-->
                <!--<v-icon-->
                <!--color="red accent-4"-->
                <!--class="pointer"-->
                <!--dark-->
                <!--v-on="on"-->
                <!--style="font-size: 15px"-->
                <!--&gt;-->
                <!--{{ item.amount_movement }} FCFA-->
                <!--</v-icon>-->
                <!--</template>-->
                <!--</v-tooltip>-->
                <!--</td>-->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_cash_movement'
                          )
                        "
                      >
                        <v-btn
                          @click="editCash_movement(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-account-edit</v-icon>
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
                            'delete_cash_movement'
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
        @getItems="getOpenCash"
      ></form-cash>
      <cash-close
        :dialog="dialogFormClose"
        ref="closeCash"
        :messages="messages"
        @getItems="getItems"
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
      <form-movement
        :dialog="dialogFormMovement"
        :messages="messages"
        @getItems="getItems"
        ref="cash_movementForm"
      ></form-movement>
      <form-settlement
        :dialog="dialogFormPatientSettlement"
        :messages="messages"
        @getItems="getItems"
      ></form-settlement>
    </v-card>
    <div>
      <div
        class="title mb-5 black--text lighten-5 text-center"
        style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      >
        {{ $vuetify.lang.t("$vuetify.patients_settlements.list.title") }}
      </div>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersSettlement"
          :items="itemsSettlement"
          :items-per-page="itemPerPage"
          :loading="loading.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortAsc"
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

          <template v-slot:header.code_patient="{ header }">
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
          <template v-slot:header.payment_method="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.payment="{ header }">
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
            </tr>
          </template>
          <template v-slot:body="{ items }">
            <v-hover>
              <tbody>
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">{{ item.code }}</td>

                  <td class="subtitle-2">
                    {{ item.patient.code }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.patient.name }}
                  </td>
                  <td class="subtitle-2" v-if="item.payment_method === 'CASH'">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.payment_method." +
                          item.payment_method
                      )
                    }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-else-if="item.payment_method === 'OM'"
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.payment_method." +
                          item.payment_method
                      )
                    }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-else-if="item.payment_method === 'BANK_CARD'"
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.payment_method." +
                          item.payment_method
                      )
                    }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-else-if="item.payment_method === 'MOMO'"
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.payment_method." +
                          item.payment_method
                      )
                    }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-else-if="item.payment_method === 'NO_PAY'"
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.payment_method." +
                          item.payment_method
                      )
                    }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2">
                    <v-chip
                      class="ma-2"
                      color="teal darken-1"
                      text-color="white"
                      small
                    >
                      {{ item.payment }} FCFA
                    </v-chip>
                  </td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
        <!--        <form-cash-->
        <!--            :dialog="dialogFormCash"-->
        <!--            ref="cashForm"-->
        <!--            :messages="messages"-->
        <!--            @getItems="getOpenCash"-->
        <!--        ></form-cash>-->
      </v-card>
    </div>
  </div>
</template>

<script>
import CashClose from "./../cash/EnableCash";
import OpenCash from "./../cash/OpenCash";
import ListMixin from "./../../mixins/Common/List.vue";
import FormUser from "./Form";
import FormCash from "./../cash/Form";
import FormMovement from "./../cash_movement/Form";
// import FormMovement from "./FormCash_movement";
import DeleteItem from "./../Common/Delete";
import FormSettlement from "./../patients_settlements/Form";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/cash_movements",
    urlItemsGet: "/bills/cash_movements",
    urlItemsCash: "cashs/isOpen",
    sortBy: ["-id"],
    items: [],
    isActive: null,
    cash: null,
    cashs: [],
    itemsSettlement: [],
    headersSettlement: [],
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
    dialogFormMovement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPatientSettlement: {
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
      console.log(this.cashs);
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
        return t.payment;
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
      let total_sum = this.get_sum_entry_settlement + sum;
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
    this.setHeaders;
    this.setHeadersSettlement();
    //this.setItemRoles();
  },
  mounted() {
    this.getOpenCash();
    this.getItems();
  },
  methods: {
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
            if (self.isActive === "false") {
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
            self.isActive = data.content.is_active;
            this.cash = data.content.cash;
            self.cashs = data.content.cash;
            self.items = data.content.cash_movement;
            self.itemsSettlement = data.content.settlement;
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
    setHeadersSettlement() {
      this.headersSettlement = [
        {
          text: "$vuetify.patients_settlements.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.code_patient.title",
          value: "code_patient",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.patient_name.title",
          value: "patient_name",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.payment_method.title",
          value: "payment_method",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patients_settlements.cols.payment.title",
          value: "payment",
          align: "start",
          sortable: false,
          width: "6",
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
        // {
        //   text: "$vuetify.patients_settlements.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: false,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.cash_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.type.title",
          value: "type",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.motive.title",
          value: "motive",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.expenses_nature.title",
          value: "name_movement",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.amount_movement.title",
          value: "amount_movement",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "140",
        },
      ];
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

    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
      this.form = {
        id: null,
        type: null,
        name: null,
        motive: null,
        name_movement: null,
        code: null,
        is_active: false,
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },

    // createCash() {
    //   this.dialogFormCash.show = true;
    // },
    createCashMovement() {
      this.dialogFormMovement.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
    },
    createPatientSettlement() {
      this.dialogFormPatientSettlement.show = true;
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
    editCash_movement(item) {
      this.dialogFormMovement.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.update.title",
        submit: "$vuetify.cash_movement.update.submit",
        success: "$vuetify.cash_movement.update.success",
      };
      this.$refs.cash_movementForm.setForm(item);
    },
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
    FormSettlement,
    FormMovement,
    FormUser,
    OpenCash,
    DeleteItem,
    CashClose,
    FormCash,
  },
};
</script>

<style scoped></style>
