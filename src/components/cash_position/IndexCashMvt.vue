<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 ml-5">
        <template
          v-if="_.includes($auth.user().permissions, 'view_cash_control')"
        >
          <v-row>
            <v-col cols="12" sm="3"> </v-col>
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
            <v-col cols="12" sm="3"> </v-col>
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
      <div class="mt-5 mx-5">
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
        <template>
          <v-btn
            class="my-2 mr-2 white--text"
            @click="createCashMovement()"
            color="primary"
            v-if="
              _.includes(this.$auth.user().permissions, 'add_cash_movement')
            "
          >
            <v-icon left>mdi-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}
          </v-btn>
        </template>
        <v-spacer></v-spacer>
      </div>
      <div>
        <v-card-title>
          <div class="title">
            {{ $vuetify.lang.t("$vuetify.cash_movement.filter") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0"> </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-select
                v-model="filter.type"
                color="primary"
                :items="optionMovement.type_Movement"
                @change="performFilter"
                :label="
                  $vuetify.lang.t('$vuetify.expenses_nature.cols.type.title')
                "
                clearable
                dense
                prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark mdi-18px"
                outlined
                class="font-weight-bold"
                ><template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.expenses_nature.cols.type.title")
                  }}
                </template></v-select
              >
            </v-col>
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
            <v-col cols="12" sm="2" class="mb-0 py-0">
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
                  :min="this.filter.start_date"
                  color="primary"
                  @change="performFilter"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="margin-top: -25px">
          <v-spacer></v-spacer>
          <!--        <v-btn dark color="primary" @click="exportPrint()">-->
          <!--          <v-icon color="white" left>mdi-printer</v-icon>-->
          <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}-->
          <!--        </v-btn>-->
          <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <!-- <v-btn dark color="primary" @click="performExport">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn> -->
        </v-card-actions>
      </div>
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
        <template v-slot:header.balance_before="{ header }">
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
        <template v-slot:header.balance_after="{ header }">
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
                  {{ item.expenses_nature.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.balance_before }}
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
                <td class="subtitle-2">
                  {{ item.balance_after }}
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
        @getItems="getItems"
      ></delete-item>
      <form-movement
        :dialog="dialogFormMovement"
        :messages="messages"
        @getItems="getItems"
        ref="cash_movementForm"
      ></form-movement>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
import FormMovement from "./../cash_movement/Form";
// import FormMovement from "./FormCash_movement";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "cash_movements",
    urlItemsAll: "/bills/cash_movements",
    urlItemsGet: "/cashs/current",
    urlItemsCash: "cashs/isOpen",
    sortBy: ["-id"],
    items: [],
    cashs: [],
    isActive: null,
    current_cash: null,
    menu2: false,
    menu: false,
    cash: null,
    maxDate: new Date().toISOString().substr(0, 10),
    minDate: new Date().toISOString().substr(0, 10),
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
    dialogFormMovement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
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
      type: null,
      start_date: null,
      end_date: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    optionMovement: {
      type_Movement: [],
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
    get_sum_entry() {
      let sum_entry = this._.filter(this.items, (t) => {
        return t.type === "ENTRY";
      });
      let sum = this._.sumBy(sum_entry, (t) => {
        return t.amount_movement;
      });
      return sum;
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
    this.getOptionsMovement();
  },
  mounted() {
    this.getItems();
  },
  methods: {
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    createCashMovement() {
      this.dialogFormMovement.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
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
    getItemsOpen() {
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
            self.cashs = data.content.cash;
            this.current_cash = self.cashs.id;
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
            url: self.urlItemsAll,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
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
    exportPDF() {
      let self = this;
      const params = {};
      if (self.filter.type !== null) {
        params["type"] = self.filter.type;
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
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsAll + "?export=pdf",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des mouvements";
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
          text: "$vuetify.cash_movement.cols.balance_before.title",
          value: "balance_before",
          align: "start",
          sortable: false,
          width: "50",
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
          text: "$vuetify.cash_movement.cols.balance_after.title",
          value: "balance_after",
          align: "start",
          sortable: false,
          width: "50",
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

    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.type !== null) {
        params["type"] = self.filter.type;
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
  },
  components: {
    DeleteItem,
    FormMovement,
  },
};
</script>

<style scoped></style>
