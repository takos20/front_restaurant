<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">{{ $vuetify.lang.t("$vuetify.bills.filter") }}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-autocomplete
                  v-model="filter.cashier"
                  :items="itemsCashier"
                  :loading="isLoadingCashier"
                  :search-input.sync="searchCashier"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                  class="font-weight-bold"
                  dense
                  clearable
                  prepend-icon="mdi-account-outline"
                ></v-autocomplete>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-autocomplete
                  v-model="filter.cash"
                  :items="itemsCash"
                  :loading="isLoadingCash"
                  :search-input.sync="searchCash"
                  color="primary"
                  item-text="code"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.cash.title')"
                  class="font-weight-bold"
                  dense
                  clearable
                  prepend-icon="mdi-credit-card"
                >
                  <!--                  <template slot="selection" slot-scope="data">-->
                  <!--                    {{ data.item.code }} - {{ data.item.user.username }}-->
                  <!--                  </template>-->
                  <!--                  <template v-slot:item="data">-->
                  <!--                    {{ data.item.code }} - {{ data.item.user.username }}-->
                  <!--                  </template>-->
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filter.start_date"
                      color="primary"
                      class="font-weight-bold my-2"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.item_movements.cols.period_of.title'
                        )
                      "
                      v-bind="attrs"
                      prepend-icon="mdi-calendar"
                      v-on="on"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filter.start_date"
                    :max="maxDate"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  v-model="menu2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filter.end_date"
                      color="primary"
                      class="font-weight-bold my-2"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.item_movements.cols.period_of.title2'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      prepend-icon="mdi-calendar"
                      dense
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filter.end_date"
                    :max="maxDate"
                    color="primary"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.shows.showFilter = false" text>
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn @click="resetForm" text>
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn :loading="loadingBtn" color="secondary" text type="submit">
            {{ $vuetify.lang.t("$vuetify.btn.validate") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FilterMixin from "../../mixins/Common/Filters";
export default {
  mixins: [FilterMixin],
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showFilter: false,
          },
        };
      },
    },
    filter: {
      type: Object,
      default: function () {
        return {
          cashier: null,
          start_date: null,
          end_date: null,
          cash: null,
        };
      },
    },
  },
  watch: {
    searchCashier(value) {
      if (value === null) return;
      const params = { username: value, role: "CAISSIER" };
      let self = this;
      this.isLoadingCashier = true;
      this.$store
        .dispatch("request", {
          url: self.urlCashier,
          params: params,
        })
        .then((response) => {
          self.itemsCashier = response.data.content;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoadingCashier = false));
    },
    searchCash(value) {
      // console.log(this.$auth.user().storage_depots === 'null')
      if (value === null) return;
      const params = { code: value, user: this.filter.cashier };
      let self = this;
      this.isLoadingCash = true;
      this.$store
        .dispatch("request", {
          url: self.urlCash,
          params: params,
        })
        .then((response) => {
          self.itemsCash = response.data.content;
        })
        .finally(() => (this.isLoadingCash = false));
    },
  },
  created() {},
  data: () => ({
    menu2: false,
    menu: false,
    maxDate: new Date().toISOString().substr(0, 10),
    loadingBtn: false,
    isLoadingCashier: false,
    searchCashier: null,
    itemsCashier: [],
    urlCashier: "users",
    isLoadingCash: false,
    searchCash: null,
    itemsCash: [],
    urlCash: "cashs",
  }),
  methods: {
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.filter.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.cahsier = null;
      this.filter.cash = null;
      this.filter.start_date = null;
      this.filter.end_date = null;
      this.itemsCash = [];
      this.itemsCashier = [];
    },
  },
};
</script>
