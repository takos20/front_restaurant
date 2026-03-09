<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!-- <template
          v-if="_.includes(this.$auth.user().permissions, 'add_internalnote')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-note-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.add") }}
          </v-btn>
        </template> -->
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
        item-key="title"
        class="mt-5"
      >
        <template v-slot:header.title="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.description="{ header }">
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
        <!-- <template v-slot:header.null="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr>
      </template> -->
        <template v-slot:body="{ items }">
          <v-hover>
            <tbody>
              <tr :key="elt.id" v-for="elt in items">
                <td class="subtitle-2">
                  {{ elt.note.title }}
                </td>
                <td class="subtitle-2">
                  {{ elt.note.description }}
                </td>

                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <!-- <td class="subtitle-2">
                <template>
                  <v-tooltip bottom>
                    <template
                      v-slot:activator="{ on }"
                      v-if="
                        _.includes(
                          $auth.user().permissions,
                          'view_comment'
                        )
                      "
                    >
                      <v-btn
                        color="secondary"
                        icon
                        @click="add_comment(item)"
                        text
                        v-on="on"
                        v-show="$vuetify.breakpoint.smAndDown || hover"
                      >
                        <v-icon>mdi-details</v-icon>
                      </v-btn>
                    </template>
                    <span>{{
                      $vuetify.lang.t(
                        "$vuetify.comment.title"
                      )
                    }}</span>
                  </v-tooltip>
                </template>
              </td> -->
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-comment
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="commentForm"
      ></form-comment>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
import FormComment from "./Form";

export default {
  mixins: [ListMixin, FormMixin],
  data: () => ({
    urlItems: "/userNotes/myNote",
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
    filter: {
      name: null,
      billable: null,
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
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
    add_comment(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.comment.new.title",
        submit: "$vuetify.comment.new.submit",
        success: "$vuetify.comment.new.success",
      };
      this.$refs.commentForm.setForm(item);
    },
    forceRefresh() {
      this.dialog.show = false;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.getItems();
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
            url: self.urlItems + "?id=" + this.$auth.user().id,
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
          text: "$vuetify.internalnote.cols.title.title",
          value: "title",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.internalnote.cols.description.title",
          value: "description",
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
    editmeeting(elt) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.meeting.update.title",
        submit: "$vuetify.meeting.update.submit",
        success: "$vuetify.meeting.update.success",
      };
      this.$refs.actionForm.setForm(elt);
      // console.log(this._.includes(this.$auth.user().permissions,"add_category"))
    },
    enabled(elt) {
      this.$refs.isPresent.setForm(elt);

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
    FormComment,
  },
  computed: {},
};
</script>

<style scoped></style>
