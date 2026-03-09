<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template v-if="_.includes($auth.user().permissions, 'add_meeting')">
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-alpha-s-circle-outline</v-icon>
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

        <template v-slot:header.startDate="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.endDate="{ header }">
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
                <td class="subtitle-2">
                  <div style="display: inline">
                    <v-chip v-for="content in item.members" :key="content.id"
                      >{{ content.username }}
                    </v-chip>
                  </div>
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.startDate).format("YYYY-MM-DD") }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.endDate).format("YYYY-MM-DD") }}
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
                          _.includes($auth.user().permissions, 'change_meeting')
                        "
                      >
                        <v-btn
                          @click="editmeeting(item)"
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
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'view_guestsmeeting'
                          )
                        "
                      >
                        <v-btn
                          color="secondary"
                          icon
                          @click="details_meeting(item)"
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.meeting.list.is_here")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="editReport(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon mdi-18px>mdi-content-paste</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.report.title")
                      }}</span>
                    </v-tooltip>
                    <!-- <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'view_notification'
                          )
                        "
                      >
                        <v-btn
                          color="secondary"
                          icon
                          @click="showNotification(item)"
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-bell</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.notification.title")
                      }}</span>
                    </v-tooltip> -->
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'delete_meeting')
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
      <form-component
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="actionForm"
      ></form-component>
      <form-present
        :dialog="dialogFormPresent"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="presentForm"
      ></form-present>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <form-enable
        :dialog="dialogForm"
        ref="enableCategory"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
      <form-report
        :dialog="dialogFormReport"
        :form="form"
        :messages="messages"
        @getItemsDetails="getItemsDetails"
        ref="reportForm"
      ></form-report>
      <!-- <form-notification
        :dialog="dialogFormNotification"
        ref="notificationForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
      ></form-notification> -->
    </v-card>
  </div>
</template>

<script>
import FormEnable from "./EnableCategory";
// import FormNotification from "./../notification/Index";
import ListMixin from "./../../mixins/Common/List.vue";
import FormComponent from "./Form";
import FormReport from "./FormReport";
import FormPresent from "./IndexPresent";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/meetings",
    urlDelete: "/meetings",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPresent: {
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
    dialogFormNotification: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormReport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.meeting.delete.success",
    },
  }),
  created() {
    this.getItems();
  },
  methods: {
    editReport(item) {
      this.dialogFormReport.show = true;
      this.messages = {
        title: "$vuetify.report.update.title",
        submit: "$vuetify.report.update.submit",
        success: "$vuetify.report.update.success",
      };
      this.$refs.reportForm.setForm(item);
    },

    showNotification(item) {
      this.dialogFormNotification.show = true;
      this.$refs.notificationForm.setForm(item);
      // this.$router.push({
      //   name: "notification",
      //   params: { id: item.id }
      // });
    },
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
          text: "$vuetify.meeting.cols.startDate.title",
          value: "startDate",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.meeting.cols.endDate.title",
          value: "endDate",
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
        {
          text: "$vuetify.meeting.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "90",
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
    details_meeting(item) {
      this.dialogFormPresent.show = true;
      this.$refs.presentForm.setForm(item);
      // this.$router.push({
      //   name: "details_meeting",
      //   params: { id: item.id, wording: item.wording}
      // });
    },
    enabled(item) {
      this.$refs.enableCategory.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.category.cols.status.enabled",
          submit: "$vuetify.category.update.submit",
          success: "$vuetify.category.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.category.cols.status.desabled",
          submit: "$vuetify.category.update.submit",
          success: "$vuetify.category.update.success",
        };
      }
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
    FormPresent,
    FormEnable,
    DeleteItem,
    FormReport,
  },
  computed: {},
};
</script>

<style scoped></style>
