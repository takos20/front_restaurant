<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template v-if="_.includes(this.$auth.user().permissions, 'add_cash')">
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-cash</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.users.btn.filter.title") }}
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
        item-key="wording"
        class="mt-5"
      >
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.cash_fund="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.open_date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.close_date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_active="{ header }">
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
                  {{ item.cash_fund }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.open_date).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.close_date).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <v-tooltip top>
                    <template v-slot:activator="{ on }" v-if="item.is_active">
                      <v-icon
                        color="teal darken-1"
                        class="pointer"
                        dark
                        v-on="on"
                        style="font-size: 15px"
                      >
                        {{
                          $vuetify.lang.t("$vuetify.cash.cols.status.titleO")
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
                          $vuetify.lang.t("$vuetify.cash.cols.status.titleF")
                        }}
                      </v-icon>
                    </template>
                  </v-tooltip>
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
                          _.includes($auth.user().permissions, 'change_cash')
                        "
                      >
                        <v-btn
                          @click="editCash(item)"
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
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="_.includes($auth.user().permissions, 'view_cash')"
                      >
                        <v-icon
                          @click="detailsCash(item)"
                          color="details"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-details
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.cash_position.title") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'delete_cash')
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
      <form-cash
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="cashForm"
      ></form-cash>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <cash-close
        :dialog="dialogForm"
        ref="closeCash"
        :messages="messages"
        @getItems="getItems"
      ></cash-close>
    </v-card>
  </div>
</template>

<script>
import CashClose from "./EnableCash";

import ListMixin from "./../../mixins/Common/List.vue";
import FormCash from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/cashs",
    sortBy: ["id"],
    dialogForm: {
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
      session: null,
      email: null,
      wording: null,
      password: null,
      role: null,
      is_active: null,
    },
    filter: {
      wording: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.cash.delete.success",
    },
  }),
  methods: {
    detailsCash(item) {
      this.$router.push({
        name: "cash_position",
        params: { id: item.id },
      });
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.expenses_nature.cols.nature_code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.cash_fund.title",
          value: "cash_fund",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.open_date.title",
          value: "open_date",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.close_date.title",
          value: "close_date",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.status.title",
          value: "is_active",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.cash.cols.actions.title",
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
        title: "$vuetify.cash.new.title",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
      this.form = {
        id: null,
        session: null,
        cash_fund: null,
        doctor: null,
        patient: null,
        wording: null,
        password: null,
        re_password: null,
        role: null,
        is_active: false,
      };
    },
    editCash(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.cash.update.title",
        submit: "$vuetify.cash.update.submit",
        success: "$vuetify.cash.update.success",
      };
      this.$refs.cashForm.setForm(item);
    },
    close(item) {
      this.$refs.closeCash.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.cash.cols.status.enabled",
          submit: "$vuetify.cash.update.submit",
          success: "$vuetify.cash.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.cash.cols.status.desabled",
          submit: "$vuetify.cash.update.submit",
          success: "$vuetify.cash.update.success",
        };
      }
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.wording !== null) {
        params["wording"] = self.filter.wording;
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
  components: {
    FormCash,
    CashClose,
    DeleteItem,
  },
};
</script>

<style scoped></style>
