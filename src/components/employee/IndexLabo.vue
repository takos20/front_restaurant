<template>
  <div>
    <v-card class="pb-4">
      <v-row>
        <v-col cols="12" sm="8" class="mb-0 py-0">
          <h3 style="padding-left: 15px" class="my-4">
            {{ $vuetify.lang.t("$vuetify.laboratory.title") }}
          </h3>
        </v-col>
        <v-col cols="12" sm="4" class="mb-0 py-0">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItems()"
            depressed
            style="padding-left: 15px"
            class="my-3"
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
        </v-col>
      </v-row>
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
        item-key="patient"
        class="mt-5"
      >
        <template v-slot:header.doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--        <template v-slot:header.laboratory="{ header }">-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <template v-slot:header.createdAt="{ header }">
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
                  {{ item.doctor.name }}
                </td>
                <!--                <td class="subtitle-2">-->
                <!--                  {{ item.laboratory ? item.laboratory.title : "-" }}-->
                <!--                </td>-->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <!--                      v-if="_.includes($auth.user().permissions, 'change_ordinance')"-->
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_laboratorypatient'
                          )
                        "
                      >
                        <v-btn
                          @click="editLaboratoryPatient(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t(
                          "$vuetify.radiography.cols.results.title"
                        )
                      }}</span>
                    </v-tooltip>
                    <!--                    <v-tooltip bottom>-->
                    <!--                      <template-->
                    <!--                        v-slot:activator="{ on }"-->
                    <!--                        v-if="-->
                    <!--                          _.includes(-->
                    <!--                            $auth.user().permissions,-->
                    <!--                            'delete_laboratorypatient'-->
                    <!--                          )-->
                    <!--                        "-->
                    <!--                      >-->
                    <!--                        <v-btn-->
                    <!--                          @click="deleteItem(item)"-->
                    <!--                          color="red"-->
                    <!--                          icon-->
                    <!--                          text-->
                    <!--                          v-on="on"-->
                    <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                          dark-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-delete-outline</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>-->
                    <!--                    </v-tooltip>-->
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>

      <form-laboratory
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="laboratoryPatientForm"
      ></form-laboratory>
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
import FormLaboratory from "../../components/laboratory_patient/Formbills";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  props: {
    id: Number,
  },
  data: () => ({
    urlItems: "/laboratory_patients",
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
      medication: null,
      patient: null,
      consultation: null,
    },
    filter: {
      userpatient: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.laboratoryPatient.delete.success",
    },
  }),
  methods: {
    getItems() {
      let self = this;
      let url;
      url =
        this.$auth.user().type == "DOCTOR"
          ? self.urlItems +
            "?doctor=" +
            this.$auth.user().doctor.id +
            "&&patient=" +
            this.id
          : self.urlItems + "?patient=" + this.id;
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
            url: url,
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
          text: "$vuetify.certificate.cols.doctor.title",
          value: "doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.laboratory.title",
        //   value: "laboratory",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.consultation.cols.createdAt.title",
          value: "createdAt",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.consultation.cols.actions.title",
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
        title: "$vuetify.laboratory.new.title",
        submit: "$vuetify.laboratory.new.submit",
        success: "$vuetify.laboratory.new.success",
      };
    },
    editLaboratoryPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.laboratory.update.title",
        submit: "$vuetify.laboratory.update.submit",
        success: "$vuetify.laboratory.update.success",
      };
      this.$refs.laboratoryPatientForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.userpatient !== null) {
        params["userpatient"] = self.filter.userpatient;
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
  },
  components: {
    FormLaboratory,
    DeleteItem,
  },
};
</script>

<style scoped></style>
