<template>
  <div>
    <v-card class="pb-4">
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
        <v-btn
          color="#f1f5fc"
          @click="showFilter()"
          class="mr-2 my-2"
          depressed
        >
          <v-icon color="primary" left>mdi-filter-outline</v-icon>
          {{ $vuetify.lang.t("$vuetify.storage_depots.btn.filter.title") }}
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
        <template v-slot:header.name_responsible="{ header }">
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
                <td class="subtitle-2" v-if="item.name_responsible">
                  {{ item.name_responsible }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <!--<v-tooltip bottom>-->
                    <!--<template-->
                    <!--v-slot:activator="{ on }"-->
                    <!--v-if="$auth.check(['ADMIN', 'RESPONSIBLE']) "-->
                    <!--&gt;-->
                    <!--<v-btn-->
                    <!--@click="editUser(item)"-->
                    <!--color="secondary"-->
                    <!--icon-->
                    <!--text-->
                    <!--v-on="on"-->
                    <!--v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--&gt;-->
                    <!--<v-icon>mdi-account-edit</v-icon>-->
                    <!--</v-btn>-->
                    <!--</template>-->
                    <!--<span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>-->
                    <!--</v-tooltip>-->
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
    urlItems: "/storage_depots",
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
      success: "$vuetify.storage_depots.delete.success",
    },
  }),
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
          text: "$vuetify.storage_depots.cols.name_responsible.title",
          value: "name_responsible",
          align: "start",
          sortable: true,
          width: "20",
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
          width: "6",
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
    DeleteItem,
  },
};
</script>

<style scoped></style>
