<template>
  <div>
    <v-card>
      <v-form>
        <v-row wrap>
          <v-col cols="12" sm="3"> </v-col>
          <v-col cols="12" sm="3">
            <v-menu
              v-model="menu3"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.start_date"
                  color="primary"
                  class="font-weight-bold"
                  outlined
                  v-bind="attrs"
                  v-on="on"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title'
                    )
                  "
                  dense
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.start_date"
                :max="maxDate"
                color="primary"
                @input="menu3 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <!--                <v-col cols="12" sm="1">-->
          <!--                <v-chip-->
          <!--                  class="subtitle-1 font-weight-bold my-3"-->
          <!--                  text-color="black"-->
          <!--                  color="#f1f5fc"-->
          <!--                  medium-->
          <!--                  label-->
          <!--                  style="margin-left: 10px"-->
          <!--                >-->
          <!--                  {{-->
          <!--                    $vuetify.lang.t(-->
          <!--                      "$vuetify.item_movements.cols.period_of.title2"-->
          <!--                    )-->
          <!--                  }}-->
          <!--                  :-->

          <!--                  &lt;!&ndash;{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}&ndash;&gt;-->
          <!--                </v-chip>-->
          <!--                </v-col>-->
          <v-col cols="12" sm="3">
            <v-menu
              v-model="menu4"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.end_date"
                  color="primary"
                  class="font-weight-bold"
                  outlined
                  v-bind="attrs"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title2'
                    )
                  "
                  v-on="on"
                  dense
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.end_date"
                :min="getMinStartDate"
                :max="maxDate"
                @change="movement_analysis()"
                color="primary"
                @input="menu4 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3"> </v-col>
        </v-row>
      </v-form>
    </v-card>
    <v-card>
      <div class="mt-5 mx-5 ml-10">
        <v-form>
          <v-row wrap>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold my-3"
                text-color="teal darken-1"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t("$vuetify.cash_movement.cols.type.ENTRIES")
                }}
                :
                {{ Intl.NumberFormat().format(get_sum_entry_movement) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold my-3"
                text-color="red accent-4"
                color="#f1f5fc"
                medium
                label
              >
                {{ $vuetify.lang.t("$vuetify.cash_movement.cols.type.EXITS") }}
                : {{ Intl.NumberFormat().format(get_sum_exit_movement) }} FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
            <v-col cols="12" sm="4">
              <v-chip
                class="subtitle-1 font-weight-bold my-3"
                text-color="blue accent-4"
                color="#f1f5fc"
                medium
                label
              >
                {{
                  $vuetify.lang.t(
                    "$vuetify.cash_movement.cols.account_end.title"
                  )
                }}
                :
                {{
                  Intl.NumberFormat().format(
                    get_sum_entry_movement - get_sum_exit_movement
                  )
                }}
                FCFA
                <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
              </v-chip>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </v-card>

    <v-card>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headersCash_movement"
        :items="itemsCash_movement"
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
        <!-- <template v-slot:header.null="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:body="{ items }">
          <v-hover>
            <tbody>
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
                <td class="subtitle-2" v-if="item.cash">
                  {{ item.cash.user.username }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2">
                  {{ item.motive }}
                </td>
                <td class="subtitle-2" v-if="item.expenses_nature">
                  {{ item.expenses_nature.name }}
                </td>
                <td class="subtitle-2" v-else>-</td>
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
                <!-- <td class="subtitle-2">
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
                </td> -->
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
    </v-card>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.patients_settlements.list.title") }}
    </div>
    <v-card>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptionsSettlement,
        }"
        :headers="headersSettlement"
        :items="itemsSettlement"
        :items-per-page="itemPerPageSettlement"
        :loading="loadingSettlement.list"
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

        <template v-slot:header.patient_name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.patient_balance="{ header }">
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
        <template v-slot:header.amount_received="{ header }">
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
        <template v-slot:header.new_balance="{ header }">
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
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">
                  <v-chip class="ma-2" color="primary" text-color="white" small>
                    {{ item.current_balance }} FCFA
                  </v-chip>
                </td>

                <td class="subtitle-2" v-if="item.payment_method === 'CASH'">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.payment_method." +
                        item.payment_method
                    )
                  }}
                </td>
                <td class="subtitle-2" v-else-if="item.payment_method === 'OM'">
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
                  {{ item.amount_received }}
                </td>
                <td class="subtitle-2">
                  <v-chip
                    class="ma-2"
                    color="teal darken-1"
                    text-color="white"
                    small
                  >
                    {{ item.amount_paid }} FCFA
                  </v-chip>
                </td>
                <td class="subtitle-2">
                  <v-chip
                    class="ma-2"
                    color="red accent-4"
                    text-color="white"
                    small
                  >
                    {{ item.new_balance }} FCFA
                  </v-chip>
                </td>

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
                            'change_patientsettlement'
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
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
export default {
  mixins: [ListMixin],
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    menu4: false,
    menu3: false,
    menu2: false,
    search: null,
    menu: false,
    itemsSettlement: [],
    itemsCash_movement: [],
    headersSettlement: [],
    headersCash_movement: [],
    loadingBtn: false,
    urlItems: "cashs/movements_analysis",

    sortBy: ["id"],
    dialogForm: {
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
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    form: { start_date: null, end_date: null, product: null },
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
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    get_sum_entry_settlement() {
      let sum = this._.sumBy(this.itemsSettlement, (t) => {
        return t.amount_paid;
      });
      return sum;
    },
    get_sum_entry_movement() {
      let sum_entry = this._.filter(this.itemsCash_movement, (t) => {
        return t.type === "ENTRY";
      });
      let sum = this._.sumBy(sum_entry, (t) => {
        return t.amount_movement;
      });
      let total_sum = this.get_sum_entry_settlement + sum;
      return total_sum;
    },
    get_sum_exit_movement() {
      let sum_exit = this._.filter(this.itemsCash_movement, (t) => {
        return t.type === "EXIT";
      });
      // console.log(sum_entry);
      let sum = this._.sumBy(sum_exit, (t) => {
        return t.amount_movement;
      });
      return sum;
    },
  },
  created() {
    this.setHeadersCash_movement();
    this.setHeadersSettlement();
    //this.setItemRoles();
  },
  methods: {
    movement_analysis() {
      let self = this;
      this.getMovement_analysis();
      this.loading.refresh = true;
      this.getMovement_analysis()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    getMovement_analysis() {
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
              self.urlItems +
              "?start_date=" +
              this.form.start_date +
              "&end_date=" +
              this.form.end_date,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsCash_movement = data.content.cash_movement;
            self.itemsSettlement = data.content.settlement;
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

    setHeadersCash_movement() {
      this.headersCash_movement = [
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
      ];
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
          text: "$vuetify.patients_settlements.cols.patient_name.title",
          value: "patient_name",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patients_settlements.cols.current_balance.title",
          value: "patient_balance",
          align: "start",
          sortable: false,
          width: "50",
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
          text: "$vuetify.bills.cols.amount_received.title",
          value: "amount_received",
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
          text: "$vuetify.patients_settlements.cols.new_balance.title",
          value: "new_balance",
          align: "start",
          sortable: true,
          width: "50",
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
          text: "$vuetify.patients_settlements.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "140",
        },
      ];
    },
    close() {
      // console.log(this.items[0].cash);
      this.dialogForm.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.cash.cols.status.enabled",
        submit: "$vuetify.cash.update.submit",
        success: "$vuetify.cash.update.success",
      };
      this.$refs.closeCash.setForm(this.items[0].cash);
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
        expenses_nature: null,
        code: null,
        is_active: false,
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.update.title",
        submit: "$vuetify.cash_movement.update.submit",
        success: "$vuetify.cash_movement.update.success",
      };
      this.$refs.userForm.setForm(item);
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
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {},
};
</script>

<style scoped></style>
