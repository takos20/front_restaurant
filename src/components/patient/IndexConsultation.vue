<template>
  <div>
    <v-card class="pb-4">
      <v-row>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <h3 style="padding-left: 15px" class="my-4">
            {{ $vuetify.lang.t("$vuetify.consultation.title") }}
          </h3>
        </v-col>
        <v-col cols="12" sm="2" class="mb-0 py-0">
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
        </v-col>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <v-menu
            v-model="menu4"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.start_date"
                color="primary"
                class="font-weight-bold my-2"
                clearable
                prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                outlined
                :label="
                  $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
                "
                v-bind="attrs"
                v-on="on"
                dense
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.start_date"
              @change="getItems"
              :max="maxDate"
              color="primary"
              @input="menu4 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <v-menu
            v-model="menu5"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.end_date"
                color="primary"
                class="font-weight-bold my-2"
                clearable
                prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                outlined
                :label="
                  $vuetify.lang.t(
                    '$vuetify.appointment.cols.end_appointment_date.title'
                  )
                "
                v-bind="attrs"
                v-on="on"
                dense
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.end_date"
              :max="maxDate"
              :min="getminDateBestSell"
              @change="getItems"
              color="primary"
              @input="menu5 = false"
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
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.name_doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.type_consultation="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.status="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
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
                  {{ item.code }}
                </td>
                <td class="subtitle-2">DR. {{ item.doctor.name }}</td>
                <td class="subtitle-2">
                  {{
                    item.type_consultation ? item.type_consultation.title : "-"
                  }}
                </td>
                <td class="subtitle-2" v-if="item.status == 'WAITING'">
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="blue darken-6"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.status." + item.status
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2" v-else-if="item.status == 'PENDING'">
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="orange darken-5"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.status." + item.status
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2" v-else>
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="green darken-5"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.status." + item.status
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="detailsConsultation(item)"
                          color="details"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.consultation.infos")
                      }}</span>
                    </v-tooltip>
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>

      <form-consultation
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="consultationForm"
      ></form-consultation>
      <form-medical
        :dialog="dialogFormMedical"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="medicalForm"
      ></form-medical>
      <form-prenatal
        :dialog="dialogFormPrenatal"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="prenatalForm"
      ></form-prenatal>
      <form-ophtalmologic
        :dialog="dialogFormOphtalmologic"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="ophtalmologicForm"
      ></form-ophtalmologic>
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
import FormConsultation from "../../components/consultation/Form";
import FormMedical from "./../medical_consultation/FormMedical";
import FormPrenatal from "./../prenatal_consultation/FormPrenatal";
import FormOphtalmologic from "./../ophtamological_consultation/FormOphtal";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  props: {
    id: Number,
  },
  data: () => ({
    urlItems: "/consultations",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    menu4: false,
    menu5: false,
    dialogFormMedical: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPrenatal: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormOphtalmologic: {
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
    maxDate: new Date().toISOString().substr(0, 10),
    maxDateStatMonth: new Date().toISOString().substr(0, 7),
    form: {
      id: null,
      code: null,
      medicalObservationPatient: null,
      background: null,
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
      examResults: [],
      careSheet: [],
      categoryBackground: [],
      descriptionBs: null,
      descriptionFamily: null,
      descriptionAllergy: null,
      reason: null,
      patient: null,
      doctor: null,
      start_date: null,
      end_date: null,
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
      success: "$vuetify.prescription.delete.success",
    },
  }),
  computed: {
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.consultation.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.prescription.cols.doctor.title",
          value: "name_doctor",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.type_consultation.title",
          value: "type_consultation",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.consultation.cols.status.title",
          value: "status",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
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
        title: "$vuetify.consultation.new.title",
        submit: "$vuetify.consultation.new.submit",
        success: "$vuetify.consultation.new.success",
      };
    },
    detailsConsultation(item) {
      if (item.consultation.length > 0) {
        if (item.type_consultation.type === "MEDICAL") {
          // console.log("item",item.consultation)
          this.dialogFormMedical.show = true;
          this.$refs.medicalForm.setFormConsult(item.consultation[0]);
        } else if (item.type_consultation.type === "PRENATAL") {
          this.dialogFormPrenatal.show = true;
          this.$refs.prenatalForm.setFormConsult(item.consultation[0]);
        } else {
          this.dialogFormOphtalmologic.show = true;
          this.$refs.ophtalmologicForm.setFormConsult(item.consultation[0]);
        }
        this.messages = {
          title: "$vuetify.consultation.update.title",
          submit: "$vuetify.consultation.update.submit",
          success: "$vuetify.consultation.update.success",
        };
      } else {
        if (item.type_consultation.type === "MEDICAL") {
          this.dialogFormMedical.show = true;
          this.$refs.medicalForm.setFormConsultation(item);
        } else if (item.type_consultation.type === "PRENATAL") {
          this.dialogFormPrenatal.show = true;
          this.$refs.prenatalForm.setFormConsultation(item);
        } else {
          this.dialogFormOphtalmologic.show = true;
          this.$refs.ophtalmologicForm.setFormConsultation(item);
        }
        this.messages = {
          title: "$vuetify.consultation.new.title",
          submit: "$vuetify.consultation.new.submit",
          success: "$vuetify.consultation.new.success",
        };
      }
    },
    getItems() {
      let self = this;
      let params = {};
      if (self.form.start_date !== null) {
        params["start_date"] = self.form.start_date;
      }
      if (self.form.end_date !== null) {
        params["end_date"] = self.form.end_date;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?patient=" + this.id,
            method: "get",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;

            // let statP = Object.entries(data.content)
            // this.chartData=statP.length===1? []:Object.entries(data.content);
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
    editConsultation(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.consultation.update.title",
        submit: "$vuetify.consultation.update.submit",
        success: "$vuetify.consultation.update.success",
      };
      this.$refs.consultationForm.setForm(item);
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
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormConsultation,
    FormMedical,
    FormPrenatal,
    FormOphtalmologic,
    DeleteItem,
  },
};
</script>

<style scoped></style>
