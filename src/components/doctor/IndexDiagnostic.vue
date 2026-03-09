<template>
  <div>
    <v-row wrap>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <h3 style="padding-left: 15px" class="my-4">
          {{
            $vuetify.lang.t("$vuetify.permission.cols.model.diagnosticpatient")
          }}
        </h3>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="diagnostic"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date_diagnostic"
              color="primary"
              class="font-weight-bold my-2"
              prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
              outlined
              :label="$vuetify.lang.t('$vuetify.meeting.cols.startDate.title')"
              v-bind="attrs"
              v-on="on"
              dense
              readonly
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.start_date_diagnostic"
            :max="maxDatePatient"
            color="primary"
            @change="getItems"
            @input="diagnostic = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="diagnostic2"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date_diagnostic"
              color="primary"
              class="font-weight-bold my-2"
              prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
              outlined
              :label="$vuetify.lang.t('$vuetify.meeting.cols.endDate.title')"
              v-bind="attrs"
              v-on="on"
              dense
              readonly
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.end_date_diagnostic"
            :max="maxDatePatient"
            :min="getminDatePatient"
            color="primary"
            @change="getItems"
            @input="diagnostic2 = false"
          ></v-date-picker>
        </v-menu>
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
      <template v-slot:header.patient="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr>
      </template>
      <template v-slot:header.diagnostic="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr>
      </template>
      <!--        <template v-slot:header.results="{ header }">-->
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
                {{ item.patient.name }}
              </td>

              <!--                                <td class="subtitle-2">-->
              <!--                                  {{ item.diagnostic?item.diagnostic.title:'-' }}-->
              <!--                                </td>-->
              <!--                                <td class="subtitle-2">-->
              <!--                                  {{-->
              <!--                                    item.results-->
              <!--                                  }}-->
              <!--                                </td>-->
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
                          'change_diagnosticpatient'
                        )
                      "
                    >
                      <v-btn
                        @click="editRadioPatient(item)"
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
                      $vuetify.lang.t("$vuetify.radiography.cols.results.title")
                    }}</span>
                  </v-tooltip>
                </template>
              </td>
            </tr>
          </tbody>
        </v-hover>
      </template>
    </v-data-table>
    <form-attachment
      :dialog="dialogFormAttachment"
      ref="attachmentForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
    ></form-attachment>
    <form-diagnostic
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="diagnostic_patientForm"
    ></form-diagnostic>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItems="getItems"
    ></delete-item>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormDiagnostic from "./../diagnostic_patient/Formbills";
import DeleteItem from "./../Common/Delete";
import FormAttachment from "./../diagnostic_patient/attachmentAlert";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/diagnostic_patients",
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
    dialogFormAttachment: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    items: [],
    diagnostic2: false,
    diagnostic: false,
    form: {
      id: null,
      code: null,
      medication: null,
      patient: null,
      start_date_diagnostic: null,
      end_date_diagnostic: null,
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
    maxDatePatient: new Date().toISOString().substr(0, 10),
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.diagnostic_patient.delete.success",
    },
  }),
  created() {
    this.getItems();
  },
  computed: {
    getminDatePatient() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_diagnostic)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    editCertificate(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.diagnostic_patient.update.title",
        submit: "$vuetify.diagnostic_patient.update.submit",
        success: "$vuetify.diagnostic_patient.update.success",
      };
      this.$refs.certificateForm.setForm(item);
      // this.getItemsDetails();
      // this.refreshItemsDetails();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.certificate.cols.patient.title",
          value: "patient",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.diagnostic.title",
        //   value: "diagnostic",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.radiography.cols.results.title",
        //   value: "results",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
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
        title: "$vuetify.diagnostic_patient.new.title",
        submit: "$vuetify.diagnostic_patient.new.submit",
        success: "$vuetify.diagnostic_patient.new.success",
      };
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (self.form.start_date_diagnostic !== null) {
        params["start_date_diagnostic"] = self.form.start_date_diagnostic;
      }
      if (self.form.end_date_diagnostic !== null) {
        params["end_date_diagnostic"] = self.form.end_date_diagnostic;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?doctor=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
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
    showAttachment(item) {
      this.dialogFormAttachment.show = true;
      this.$refs.attachmentForm.setForm(item);
      // this.$router.push({
      //   name: "notification",
      //   params: { id: item.id }
      // });
    },
    editRadioPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.diagnostic.update.title",
        submit: "$vuetify.diagnostic.update.submit",
        success: "$vuetify.diagnostic.update.success",
      };
      this.$refs.diagnostic_patientForm.setForm(item);
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
    FormDiagnostic,
    DeleteItem,
    FormAttachment,
  },
};
</script>

<style scoped></style>
