<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ this.$route.params.name }}
    </div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!--        <template-->
        <!--          v-if="$auth.check(['ADMIN', 'CASHIER'])"-->
        <!--        >-->
        <!--          <v-btn class="mr-2 my-2" @click="createCash()" color="primary" dark>-->
        <!--            <v-icon left>mdi-account-plus-outline</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.cash.new.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
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
        <!-- 
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" class="mb-0 py-0">
          <v-text-field
            v-model="filter.search"
            color="primary"
            :label="$vuetify.lang.t('$vuetify.search')"
            prepend-inner-icon="mdi-search mdi-dark mdi-18px"
            class="font-weight-bold"
            outlined
            dense
            clearable
            @input="performFilter"
          ></v-text-field>
        </v-col> -->
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
        <template v-slot:body="{ items }">
          <v-hover>
            <tbody>
              <tr :key="item.id" v-for="item in items">
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{ item.cash.user.username }}
                </td>
                <td class="subtitle-2">
                  {{ item.motive }}
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
    urlItems: "cash_movements/specific",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isActive: false,
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
    form: {
      id: null,
      type: null,
      email: null,
      code: null,
      password: null,
      role: null,
      is_active: null,
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    filter: {
      search: null,
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
      if (this.items[0] !== undefined) {
        return this.items[0].cash.cash_fund;
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
      // console.log(sum_entry);
      let sum = this._.sumBy(sum_exit, (t) => {
        return t.amount_movement;
      });
      return sum;
    },
  },
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
            url: self.urlItems + "?expenses_nature=" + this.$route.params.id,
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
          text: "$vuetify.cash_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.motive.title",
          value: "motive",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash_movement.cols.amount_movement.title",
          value: "amount_movement",
          align: "start",
          sortable: true,
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
        name_movement: null,
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
      if (self.filter.search !== null) {
        params["search"] = self.filter.search;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItems();
    },
    stopLoadingBtn() {
      this.loadingBtn = false;
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
