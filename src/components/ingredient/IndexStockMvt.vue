<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.stock_movement.list.title") }}
    </div>
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
        <v-spacer></v-spacer>
      </div>
      <div>
        <v-card-title>
          <div class="title">
            {{ $vuetify.lang.t("$vuetify.stock_movement.filter") }}
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
                  :max="maxDate"
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
                  :max="maxDate"
                  :min="getMinDate"
                  color="primary"
                  @change="performFilter"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <v-card-actions style="margin-top: -25px"> -->
        <!-- <v-spacer></v-spacer> -->
        <!--        <v-btn dark color="primary" @click="exportPrint()">-->
        <!--          <v-icon color="white" left>mdi-printer</v-icon>-->
        <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}-->
        <!--        </v-btn>-->
        <!-- <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn> -->
        <!-- <v-btn dark color="primary" @click="performExport">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn> -->
        <!-- </v-card-actions> -->
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
        <template v-slot:header.ingredient="{ header }">
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
        <template v-slot:header.source="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.quantity="{ header }">
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
          <tbody>
            <tr :key="item.id" v-for="item in items">
              <td class="subtitle-2">
                {{ item.ingredient.name }}
              </td>
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
                          "$vuetify.stock_movement.cols.type." + item.type
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
                          "$vuetify.stock_movement.cols.type." + item.type
                        )
                      }}
                    </v-icon>
                  </template>
                </v-tooltip>
              </td>
              <td class="subtitle-2">
                {{ item.quantity }}
              </td>
              <td class="subtitle-2">
                {{
                  $vuetify.lang.t(
                    "$vuetify.stock_movement.cols.source." + item.source
                  )
                }}
              </td>
              <td class="subtitle-2">
                {{ $moment(item.createdAt).format("YYYY-MM-DD H:mm:ss") }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "../../mixins/Common/List.vue";
// import FormMovement from "./FormCash_movement";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "movement_stocks",
    urlItemsAll: "cash_movements/all",
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
      success: "$vuetify.stock_movement.delete.success",
    },
  }),
  computed: {
    getMinDate() {
      let minDateStat = "";
      minDateStat = new Date(this.filter.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
  },
  created() {
    this.setHeaders;
    this.getOptionsMovement();
  },
  mounted() {
    // this.getItems();
  },
  methods: {
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
      let sum_entry = this._.filter(this.items, (t) => {
        return t.type === "EXIT";
      });
      let sum = this._.sumBy(sum_entry, (t) => {
        return t.amount_movement;
      });
      return sum;
    },
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
          text: "$vuetify.ingredient.title",
          value: "type",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.type.title",
          value: "type",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.recipe.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.source.title",
          value: "source",
          align: "start",
          sortable: false,
          width: "20",
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
  components: {},
};
</script>

<style scoped></style>
