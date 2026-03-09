<template>
  <div>
    <v-row wrap>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <h3 style="padding-left: 15px" class="my-4">
          {{ $vuetify.lang.t("$vuetify.permission.cols.model.pregnancyvisit") }}
        </h3>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="pregnant"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date_pregnant"
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
            v-model="form.start_date_pregnant"
            :max="maxDatePatient"
            color="primary"
            @change="getItems"
            @input="pregnant = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="pregnant2"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date_pregnant"
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
            v-model="form.end_date_pregnant"
            :max="maxDatePatient"
            :min="getminDatePatient"
            color="primary"
            @change="getItems"
            @input="pregnant2 = false"
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
      <!--        <template v-slot:header.code="{ header }">-->
      <!--          <tr>-->
      <!--            {{-->
      <!--              $vuetify.lang.t(header.text)-->
      <!--            }}-->
      <!--          </tr> </template-->
      <!--        >-->
      <template v-slot:header.name_patient="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr>
      </template>
      <!--        <template v-slot:header.reason="{ header }">-->
      <!--          <tr>-->
      <!--            {{-->
      <!--              $vuetify.lang.t(header.text)-->
      <!--            }}-->
      <!--          </tr>-->
      <!--        </template>-->
      <!--        <template v-slot:header.diagnostic="{ header }">-->
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
              <!--                <td class="subtitle-2">-->
              <!--                  {{ item.code }}-->
              <!--                </td>-->
              <td class="subtitle-2">
                {{ item.patient.name }}
              </td>
              <!--                <td class="subtitle-2">-->
              <!--                  {{ item.reason }}-->
              <!--                </td>-->
              <!--                <td class="subtitle-2">-->
              <!--                  {{ item.diagnostic }}-->
              <!--                </td>-->
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
                          this.$auth.user().permissions,
                          'change_pregnancyvisit'
                        )
                      "
                    >
                      <v-btn
                        @click="editPregnancy_visit(item)"
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
                </template>
              </td>
            </tr>
          </tbody>
        </v-hover>
      </template>
    </v-data-table>

    <form-medicalact
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="pregnancy_visitForm"
    ></form-medicalact>
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
import FormMedicalact from "./../pregnancy_visit/Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/pregnancy_visits",
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
    maxDatePatient: new Date().toISOString().substr(0, 10),
    pregnant2: false,
    pregnant: false,
    form: {
      id: null,
      code: null,
      medicalObservationPatient: null,
      background: null,
      start_date_pregnant: null,
      end_date_pregnant: null,
      diagnosticImpressions: null,
      newExamsRequested: null,
      additionalTests: null,
      toBehave: null,
      examenOrl: null,
      otherExam: null,
      descRectal: null,
      vaginalExamination: null,
      speculumExam: null,
      rectalTouch: null,
      descExamSpeculum: null,
      pelvicExam: null,
      neuroPsychologicalExam: null,
      descAbdominalExam: null,
      lymphNodeResearch: null,
      abdominalAuscultation: null,
      lumbarConvulsion: null,
      cardioPulmonaryExamination: null,
      gradeAlterations: null,
      conjunctivae: null,
      jaundice: null,
      autoMedicare: null,
      other: null,
      weight: null,
      poul: null,
      temperature: null,
      tension: null,
      ta: null,
      descriptionBm: null,
      condition: null,
      tbs: null,
      tbm: null,
      items: [],
      examResults: [],
      careSheet: [],
      categoryBackground: [],
      descriptionBs: null,
      descriptionFamily: null,
      descriptionAllergy: null,
      reason: null,
      patient: null,
      doctor: null,
    },
    filter: {
      patient: null,
      doctor: null,
    },
    urlPatients: "patients",
    urlDoctors: "doctors",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchDoctor: null,
    searchPatient: null,
    itemsPatient: [],
    itemsDoctor: [],
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
      success: "$vuetify.pregnancy_visit.delete.success",
    },
  }),
  created() {
    this.getItems();
  },
  computed: {
    getminDatePatient() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_pregnant)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  watch: {
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPatients,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctors,
          params: params,
        })
        .then((response) => {
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (self.form.start_date_pregnant !== null) {
        params["start_date_pregnant"] = self.form.start_date_pregnant;
      }
      if (self.form.end_date_pregnant !== null) {
        params["end_date_pregnant"] = self.form.end_date_pregnant;
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
    setHeaders() {
      this.headers = [
        // {
        //   text: "$vuetify.consultation.cols.code.title",
        //   value: "code",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.prescription.cols.patient.title",
          value: "name_patient",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.consultation.cols.reason.title",
        //   value: "reason",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        //
        // {
        //   text: "$vuetify.consultation.cols.diagnostic.title",
        //   value: "diagnostic",
        //   align: "start",
        //   sortable: true,
        //   width: "20",
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
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.pregnancy_visit.new.title",
        submit: "$vuetify.pregnancy_visit.new.submit",
        success: "$vuetify.pregnancy_visit.new.success",
      };
    },
    editPregnancy_visit(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.pregnancy_visit.update.title",
        submit: "$vuetify.pregnancy_visit.update.submit",
        success: "$vuetify.pregnancy_visit.update.success",
      };
      this.$refs.pregnancy_visitForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
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
    FormMedicalact,
    DeleteItem,
  },
};
</script>

<style scoped></style>
