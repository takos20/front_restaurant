<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template>
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-account-plus-outline</v-icon>
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
        item-key="username"
        class="mt-5"
      >
        <template v-slot:header.username="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.code_user="{ header }">
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
        <template v-slot:header.role="{ header }">
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
                <td class="subtitle-2">{{ item.username }}</td>
                <td class="subtitle-2">
                  {{ item.code }}
                </td>

                <td class="subtitle-2">
                  <template v-if="item.is_active">
                    <v-chip
                      class="ma-2"
                      color="primary"
                      text-color="white"
                      small
                    >
                      {{
                        $vuetify.lang.t("$vuetify.users.cols.role." + item.role)
                      }}
                    </v-chip>
                  </template>
                  <template v-else>
                    <v-chip
                      class="ma-2"
                      color="primary"
                      text-color="white"
                      small
                    >
                      {{
                        $vuetify.lang.t("$vuetify.users.cols.role." + item.role)
                      }}
                    </v-chip>
                  </template>
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_active">
                        <v-icon
                          color="primary"
                          class="pointer"
                          dark
                          @click="enabled(item)"
                          v-on="on"
                        >
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          class="pointer"
                          dark
                          @click="enabled(item)"
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
                    <span v-if="!item.is_active">
                      {{
                        $vuetify.lang.t("$vuetify.users.cols.status.enabled")
                      }}
                    </span>
                    <span v-else>
                      {{
                        $vuetify.lang.t("$vuetify.users.cols.status.disabled")
                      }}
                    </span>
                  </v-tooltip>
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
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
                          (item.role === 'COMMERCIAL' ||
                            item.role === 'TELEOPERATOR') &&
                          $auth.check([
                            'SUPER_ADMINISTRATOR',
                            'SUPERVISOR',
                            'ADMINISTRATOR',
                          ])
                        "
                      >
                        <v-icon
                          @click="assignEnterprise(item)"
                          color="secondary"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-plus-circle-outline
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.btn.assign") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
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
                <td class="subtitle-2" v-else></td>
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
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <filter-form
        ref="filterForm"
        :dialog="dialogForm"
        :filter="filter"
        @performFilter="performFilter"
      ></filter-form>
      <form-enable
        :dialog="dialogForm"
        ref="enableUser"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
    </v-card>
  </div>
</template>

<script>
import FormEnable from "./EnableUser";

import ListMixin from "./../../mixins/Common/List.vue";
import FormUser from "./Form";
import FilterForm from "./Filter";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/users",
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
      code_user: null,
      email: null,
      username: null,
      password: null,
      role: null,
      is_active: null,
    },
    filter: {
      username: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.users.delete.success",
    },
  }),
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.users.cols.username.title",
          value: "username",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.users.cols.code_user.title",
          value: "code_user",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: this.$vuetify.lang.t("$vuetify.users.cols.role.title"),
          value: "role",
          align: "start",
          sortable: false,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.users.cols.status.title",
          value: "is_active",
          align: "start",
          sortable: false,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.users.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: false,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.users.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.users.new.title",
        submit: "$vuetify.users.new.submit",
        success: "$vuetify.users.new.success",
      };
      this.form = {
        id: null,
        code_user: null,
        position_held: null,
        doctor: null,
        patient: null,
        username: null,
        password: null,
        re_password: null,
        role: null,
        is_active: false,
      };
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.users.update.title",
        submit: "$vuetify.users.update.submit",
        success: "$vuetify.users.update.success",
      };
      this.$refs.userForm.setForm(item);
    },
    enabled(user) {
      this.$refs.enableUser.setForm(user);
      if (!user.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.users.cols.status.enabled",
          submit: "$vuetify.users.update.submit",
          success: "$vuetify.users.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.users.cols.status.desabled",
          submit: "$vuetify.users.update.submit",
          success: "$vuetify.users.update.success",
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
      if (self.filter.username !== null) {
        params["username"] = self.filter.username;
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
    FormUser,
    FormEnable,
    DeleteItem,
    FilterForm,
  },
};
</script>

<style scoped></style>
