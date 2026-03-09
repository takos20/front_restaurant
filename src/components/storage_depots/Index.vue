<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_storage_depots')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-basket-fill</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.add") }}
          </v-btn>
        </template>
        <!--        <template-->
        <!--          v-if="_.includes(this.$auth.user().permissions, 'add_storage_depots')"-->
        <!--        >-->
        <!--          <v-btn class="mr-2 my-2" @click="createTransfer()" color="primary" dark>-->
        <!--            <v-icon left>mdi-archive</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
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
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.storage_depots.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-text-field
              v-model="filter.code"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.storage_depots.cols.code.title')
              "
              prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.username"
              :items="itemsUsers"
              :loading="isLoading"
              :search-input.sync="search"
              color="primary"
              item-text="username"
              @change="performFilter"
              item-value="id"
              :label="
                $vuetify.lang.t('$vuetify.storage_depots.cols.username.title')
              "
              prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-text-field
              v-model="filter.name"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.storage_depots.cols.name.title')
              "
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
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
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_default="{ header }">
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
                  {{ item.name }}
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_default">
                        <v-icon color="primary" class="pointer" dark v-on="on">
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          class="pointer"
                          dark
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
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
                          _.includes(
                            $auth.user().permissions,
                            'change_storage_depots'
                          )
                        "
                      >
                        <v-btn
                          @click="editUser(item)"
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
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'view_stock_management'
                          )
                        "
                      >
                        <v-icon
                          @click="detailsStock(item)"
                          color="secondary"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-clipboard-outline
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.stock_management.title") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_storage_depots'
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
      <form-transfer
        :dialog="dialogFormTransfer"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="transferForm"
      ></form-transfer>
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
import FormUser from "./Form";
import FormTransfer from "./FormTransfer";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/storage_depots",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormTransfer: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
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
      success: "$vuetify.storage_depots.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { username: value, role: "RESPONSIBLE" };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlUsers,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsUsers = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.storage_depots.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.storage_depots.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.storage_depots.cols.is_default.title",
          value: "is_default",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.storage_depots.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.storage_depots.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "40",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.storage_depots.new.title",
        submit: "$vuetify.storage_depots.new.submit",
        success: "$vuetify.storage_depots.new.success",
      };
      this.form = {
        id: null,
        name: null,
        name_responsible: null,
        username: null,
        code: null,
        is_active: false,
      };
    },
    createTransfer() {
      this.dialogFormTransfer.show = true;
      this.messages = {
        title: "$vuetify.storage_depots.new.title",
        submit: "$vuetify.storage_depots.new.submit",
        success: "$vuetify.storage_depots.new.success",
      };
      this.form = {
        id: null,
        name: null,
        name_responsible: null,
        username: null,
        code: null,
        is_active: false,
      };
    },
    detailsStock(item) {
      this.$router.push({
        name: "details_stock_management",
        params: { id: item.id, name: item.name },
      });
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.storage_depots.update.title",
        submit: "$vuetify.storage_depots.update.submit",
        success: "$vuetify.storage_depots.update.success",
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
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.username !== null) {
        params["username"] = self.filter.username;
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
    FormUser,
    FormTransfer,
    DeleteItem,
  },
};
</script>

<style scoped></style>
