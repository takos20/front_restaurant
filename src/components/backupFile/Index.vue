<template>
  <div>
    <v-card class="pb-1">
      <v-row wrap>
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="2">
              <v-btn
                :loading="loading.refresh"
                @click="refreshItems()"
                class="mr-2 my-2"
                depressed
                color="secondary"
              >
                <v-icon left color="#secondary darken-3">mdi-refresh</v-icon>
                {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn
                @click="saveBackup()"
                class="mr-2 my-2"
                depressed
                color="secondary"
                :loading="loadingImport"
              >
                >
                <v-icon left color="#secondary darken-3"
                  >mdi-database-plus</v-icon
                >
                {{ $vuetify.lang.t("$vuetify.btn.backup") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-row>
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
        item-key="id"
        class="mt-5"
      >
        <template v-slot:header.user="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.created="{ header }">
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
                <td class="subtitle-2">
                  {{ item.user.username }}
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
                            'change_backupfile'
                          )
                        "
                      >
                        <v-btn
                          @click="saveRestore(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-database-minus</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.backupfile.titleRestore")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_backupfile'
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
    </v-card>
    <br />
  </div>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import ListMixin from "./../../mixins/Common/List.vue";
import DeleteItem from "./../Common/Delete";
export default {
  mixins: [FormMixin, ListMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          date_month: null,
        };
      },
    },
  },
  data: () => ({
    urlItems: "/backupfiles",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingImport: false,
    loadingSave: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingRestore: {
      list: false,
      refresh: false,
      filter: false,
    },
    maxDate: new Date().toISOString().substr(0, 10),
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },

    currentFile: undefined,
    progress: 0,
    menu7: false,
    message: "",
    filter: {
      type: Object,
      default: function () {
        return {
          name: null,
          category: null,
          code: null,
        };
      },
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.backupfile.delete.success",
    },
  }),
  watch: {},
  created() {
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
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
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
    getDataForm() {
      let data = {
        date_month: this.form.date_month,
      };
      return data;
    },
    saveBackup() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.loadingImport = true;
      return new Promise((resolve, reject) => {
        this.loadingSave.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.backupfile.new.success"),
            });
            this.getItems();
            let data = response.data;
            self.items = data.content;
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
            self.loadingImport = false;
            resolve();
          });
      });
    },
    saveRestore(item) {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingRestore.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "/" + item.id,
            method: "PUT",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.backupfile.restore.success"),
            });
            this.getItems();
            let data = response.data;
            self.items = data.content;
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
            self.loadingRestore.list = false;
            resolve();
          });
      });
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.archive.cols.user.title",
          value: "user",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.archive.cols.created.title",
          value: "created",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.archive.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "10",
        },
      ];
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItemsGet();
    },
  },
  components: {
    DeleteItem,
  },
};
</script>

<style scoped></style>
