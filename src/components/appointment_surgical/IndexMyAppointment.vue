<template>
  <div>
    <v-card class="pb-4" height="60">
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
    <br />
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.appointment.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="2" class="mb-0 py-0">
            <v-menu
              v-model="menu"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.start_appointment_date"
                  color="primary"
                  class="font-weight-bold"
                  prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                  outlined
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.appointment.cols.start_appointment_date.title'
                    )
                  "
                  v-bind="attrs"
                  v-on="on"
                  dense
                  readonly
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.start_appointment_date"
                color="primary"
                @change="performFilter"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="2" class="mb-0 py-0">
            <v-select
              v-model="filter.patient_shape"
              outlined
              color="primary"
              dense
              @change="performFilter"
              clearable
              prepend-inner-icon="mdi-account-group-outline"
              :items="optionPatient_shape.type_Patient_shape"
              :label="
                $vuetify.lang.t('$vuetify.patient.cols.patient_shape.title')
              "
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2" class="mb-0 py-0">
            <v-select
              v-model="filter.appointment_status"
              outlined
              color="primary"
              dense
              clearable
              prepend-inner-icon="mdi-account-group-outline"
              :items="optionStatus.type_status"
              @change="performFilter"
              :label="
                $vuetify.lang.t(
                  '$vuetify.patient.cols.status_appointment.title'
                )
              "
            ></v-select>
          </v-col>
          <!-- <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-select
              v-model="filter.appointment_type"
              outlined
              color="primary"
              dense
              clearable
              @change="performFilter"
              prepend-inner-icon="mdi-account-group-outline"
              :items="optionAppointment.type_appointment"
              :label="
                $vuetify.lang.t('$vuetify.patient.cols.appointment_type.title')
              "
            ></v-select>
          </v-col> -->
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              outlined
              dense
              v-model="filter.patient"
              :items="itemsPatient"
              :loading="isLoadingPatient"
              :search-input.sync="searchPatient"
              color="primary"
              item-text="name"
              item-value="id"
              @change="performFilter"
              :label="
                $vuetify.lang.t('$vuetify.appointment.cols.patient.title')
              "
              class="font-weight-bold"
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              outlined
              dense
              v-model="filter.doctor"
              :items="itemsDoctor"
              :loading="isLoadingDoctor"
              :search-input.sync="searchDoctor"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.appointment.cols.doctor.title')"
              class="font-weight-bold"
              clearable
              prefix="Dr"
              @change="performFilter"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <br />
      <v-card-actions style="margin-top: -45px">
        <!--          <v-btn-->
        <!--              :loading="loading.refresh"-->
        <!--              @click="refreshItemsDetail()"-->
        <!--              class="mr-2 my-2"-->
        <!--              depressed-->
        <!--              color="#f1f5fc"-->
        <!--          >-->
        <!--            <v-icon left color="primary">mdi-refresh</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
        <!--          </v-btn>-->
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="print()"
          class="mr-2 my-2"
          depressed
          dark
          :loading="loadingBtn"
        >
          <v-icon left>mdi-printer</v-icon>
          {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="pb-4">
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
        <template v-slot:header.name_patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.patient_shape="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.appointment_type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.name_doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.appointment_status="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.start_appointment_date="{ header }">
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
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2" v-if="item.patient_shape == 'NORMAL'">
                  <v-btn class="mr-2 my-2 white--text" color="primary" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.patient.cols.patient_shape." +
                          item.patient_shape
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.patient_shape == 'URGENT'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#FF2A04" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.patient.cols.patient_shape." +
                          item.patient_shape
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.patient_shape == 'SERIOUS'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#645600" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.patient.cols.patient_shape." +
                          item.patient_shape
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2" v-else-if="item.patient_shape == 'OLD'">
                  <v-btn class="mr-2 my-2 white--text" color="#3C3E42" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.patient.cols.patient_shape." +
                          item.patient_shape
                      )
                    }}
                  </v-btn>
                </td>

                <!-- <td class="subtitle-2">
                  {{ item.appointment_type }}
                </td> -->
                <td class="subtitle-2">DR. {{ item.doctor.name }}</td>
                <td
                  class="subtitle-2"
                  v-if="item.appointment_status == 'NOT_STARTED'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#3C3E42" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.appointment_status == 'PENDING'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#285766" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.appointment_status == 'CANCELED'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#FF2A04" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.appointment_status == 'PARAMETER_TAKING'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#645600" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.appointment_status == 'WAITING'"
                >
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="orange darken-5"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.appointment_status == 'FINISHED'"
                >
                  <v-btn class="mr-2 my-2 white--text" color="#005A00" small>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.appointment_status." +
                          item.appointment_status
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2">
                  {{ item.start_appointment_date }} [{{
                    item.start_appointment_hour
                  }}
                  - {{ item.end_appointment_hour }}]
                </td>

                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="editMedicalact(item)"
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
                      <template v-slot:activator="{ on }">
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

      <form-medicalact
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="medicalactForm"
      ></form-medicalact>
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
import FormMedicalact from "./Form";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/appointments",
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
    menu: false,
    loadingBtn: false,
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
    },
    filter: {
      patient: null,
      doctor: null,
      appointment_status: null,
      start_appointment_date: null,
      patient_shape: null,
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
    urlPatients: "patients",
    urlDoctors: "doctors",
    urlDeleteItems: "",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchPatient: null,
    searchDoctor: null,
    searchDepart: null,
    itemsPatient: [],
    itemsDoctor: [],
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionStatus: {
      type_status: [],
    },
    optionAppointment: {
      type_appointment: [],
    },
    messagesDelete: {
      success: "$vuetify.prescription.delete.success",
    },
  }),
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
  created() {
    this.getOptionsPatient_shape();
    this.getOptionsStatus();
  },
  methods: {
    print() {
      let self = this;
      const params = {};
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }
      if (self.filter.patient_shape !== null) {
        params["patient_shape"] = self.filter.patient_shape;
      }
      if (self.filter.appointment_status !== null) {
        params["appointment_status"] = self.filter.appointment_status;
      }
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
      }
      if (self.filter.start_appointment_date !== null) {
        params["start_appointment_date"] = self.filter.start_appointment_date;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des rendez-vous";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    getOptionsStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.appointment_status, (type_status) => {
        self.optionStatus.type_status.push({
          text: self.$vuetify.lang.t(type_status.text),
          value: type_status.value,
        });
      });
    },
    getOptionsPatient_shape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.patient_shape, (type_Patient_shape) => {
        self.optionPatient_shape.type_Patient_shape.push({
          text: self.$vuetify.lang.t(type_Patient_shape.text),
          value: type_Patient_shape.value,
        });
      });
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.prescription.cols.patient.title",
          value: "name_patient",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.patient_shape.title",
          value: "patient_shape",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patient.cols.appointment_type.title",
        //   value: "appointment_type",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.dealing_with.title",
          value: "name_doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.appointment.cols.appointment_status.title",
          value: "appointment_status",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.appointment.cols.start_appointment_date.title",
          value: "start_appointment_date",
          align: "start",
          sortable: true,
          width: "130",
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
          width: "80",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.appointment.new.title",
        submit: "$vuetify.appointment.new.submit",
        success: "$vuetify.appointment.new.success",
      };
    },
    editMedicalact(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.appointment.update.title",
        submit: "$vuetify.appointment.update.submit",
        success: "$vuetify.appointment.update.success",
      };
      this.$refs.medicalactForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
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
            url: self.urlItems + "?doctor=" + this.$auth.user().doctor.id,
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
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }
      if (self.filter.patient_shape !== null) {
        params["patient_shape"] = self.filter.patient_shape;
      }
      if (self.filter.appointment_status !== null) {
        params["appointment_status"] = self.filter.appointment_status;
      }
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
      }
      if (self.filter.start_appointment_date !== null) {
        params["start_appointment_date"] = self.filter.start_appointment_date;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItems();
    },
  },
  components: {
    FormMedicalact,
    DeleteItem,
  },
};
</script>

<style scoped></style>
