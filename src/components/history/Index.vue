<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!--        <template-->
        <!--          v-if="_.includes($auth.user().permissions, 'add_history')"-->
        <!--        >-->
        <!--          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>-->
        <!--            <v-icon left>mdi-key-variant</v-icon>-->
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
        <template v-slot:header.user="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.action="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.content_type="{ header }">
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
                <td class="subtitle-2">
                  {{ item.user.username }}
                </td>
                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.history.cols.method." + item.action
                    )
                  }}
                </td>
                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.history.cols.content_type." + item.table_name
                    )
                  }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.created_at).format("YYYY-MM-DD HH:mm:ss") }}
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
        ref="groupForm"
      ></form-user>
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
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "users/history",
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
      success: "$vuetify.history.delete_role",
    },
  }),
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.history.cols.user.title",
          value: "user",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.history.cols.action_done.title",
          value: "action",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.history.cols.content_type.title",
          value: "content_type",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.history.cols.create_date.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.permission.new.title",
        submit: "$vuetify.permission.new.submit",
        success: "$vuetify.permission.new.success",
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
    editGroup(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.permission.update.title",
        submit: "$vuetify.permission.update.submit",
        success: "$vuetify.permission.update.success",
      };
      this.$refs.groupForm.setForm(item);
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
        .then(() => {})
        .finally(() => {});
    },
  },
  components: {
    FormUser,
    DeleteItem,
  },
};
</script>

<style scoped></style>
