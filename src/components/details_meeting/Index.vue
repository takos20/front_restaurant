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
        <template v-slot:header.guests="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_present="{ header }">
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
                  {{ item.user.profile.name }}
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_present">
                        <v-icon
                          color="#49c5b6"
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
                    <span v-if="!item.is_present">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.meeting.cols.is_present.present"
                        )
                      }}
                    </span>
                    <span v-else>
                      {{
                        $vuetify.lang.t(
                          "$vuetify.meeting.cols.is_present.absent"
                        )
                      }}
                    </span>
                  </v-tooltip>
                </td>
                <td class="subtitle-2">
                  {{
                    $moment(item.meeting.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-component
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="actionForm"
      ></form-component>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <is-present
        :dialog="dialogForm"
        ref="isPresent"
        :messages="messages"
        @getItems="getItems"
      ></is-present>
    </v-card>
  </div>
</template>

<script>
import IsPresent from "./is_present";
import ListMixin from "./../../mixins/Common/List.vue";
import FormComponent from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/meetings/present",
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
      code: null,
      medical_areas: null,
      name: null,
      billable: null,
      is_active: null,
    },
    filter: {
      name: null,
      billable: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.meeting.delete.success",
    },
  }),
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
            url: self.urlItems + "?id=" + this.$route.params.id,
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
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.meeting.cols.guests.title",
          value: "guests",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.meeting.cols.is_present.title",
          value: "is_present",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.meeting.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: false,
          width: "105",
          class: "grey--text text--darken-3",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.meeting.new.title",
        submit: "$vuetify.meeting.new.submit",
        success: "$vuetify.meeting.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        billable: null,
        is_active: false,
      };
    },
    editmeeting(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.meeting.update.title",
        submit: "$vuetify.meeting.update.submit",
        success: "$vuetify.meeting.update.success",
      };
      this.$refs.actionForm.setForm(item);
      // console.log(this._.includes(this.$auth.user().permissions,"add_category"))
    },
    enabled(item) {
      this.$refs.isPresent.setForm(item);

      this.dialogForm.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.meeting.update.submit",
        submit: "$vuetify.meeting.update.submit",
        success: "$vuetify.meeting.update.success",
      };
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
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
    FormComponent,
    IsPresent,
    DeleteItem,
  },
  computed: {},
};
</script>

<style scoped></style>
