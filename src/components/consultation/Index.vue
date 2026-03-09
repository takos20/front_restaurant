<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_consultation')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-clipboard-text</v-icon>
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
        </div>
        <v-card-text style="margin-left: 300px; margin-top: -70px">
          <v-row>
            <v-col cols="3">
              <v-file-input
                show-size
                :label="
                  $vuetify.lang.t('$vuetify.product.cols.file_input.title')
                "
                @change="selectFile"
              ></v-file-input>
            </v-col>

            <v-col cols="2" class="pl-2 mt-4">
              <v-btn
                color="teal darken-1"
                dark
                @click="upload"
                :loading="loadingImport"
              >
                {{ $vuetify.lang.t("$vuetify.btn.upload") }}
                <v-icon right dark>mdi-database-plus</v-icon>
              </v-btn>
            </v-col>
            <v-alert v-if="message" border="left" color="blue-grey" dark>
              {{ message }}
            </v-alert>

            <v-card v-if="fileInfos.length > 0" class="mx-auto">
              <v-list>
                <v-subheader>List of Files</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(file, index) in fileInfos" :key="index">
                    <a :href="file.url">{{ file.name }}</a>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-row>
        </v-card-text>
      </v-row>
    </v-card>
    <br />
    <v-card class="pb-1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.consultation.filter") }}
        </div>
      </v-card-title>
      <v-card-text style="margin-top: -25px; height: 60px">
        <v-row wrap>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-card-text>
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
                    v-model="filter.createdAt"
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
                  v-model="filter.createdAt"
                  color="primary"
                  @change="performFilter"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.patient"
              :items="itemsPatient"
              :loading="isLoadingPatient"
              :search-input.sync="searchPatient"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.patient.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.doctor"
              :items="itemsDoctor"
              :loading="isLoadingDoctor"
              :search-input.sync="searchDoctor"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-card-text>
              <v-select
                v-model="filter.status"
                outlined
                color="primary"
                dense
                clearable
                @change="performFilter"
                prepend-inner-icon="mdi-account-group-outline"
                :items="optionStatus.type_status"
                :label="
                  $vuetify.lang.t('$vuetify.consultation.cols.status.title')
                "
              ></v-select>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
      <!--      <v-card-actions style="margin-top: -30px">-->
      <!--        <v-spacer></v-spacer>-->
      <!--        <v-btn dark color="primary" @click="exportPrint()">-->
      <!--          <v-icon color="white" left>mdi-printer</v-icon>-->
      <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}-->
      <!--        </v-btn>-->
      <!--        <v-btn dark color="primary" @click="exportPDF()">-->
      <!--          <v-icon color="white" left>mdi-file</v-icon>-->
      <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}-->
      <!--        </v-btn>-->
      <!--        <v-btn dark color="primary" @click="performExport">-->
      <!--          {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}-->
      <!--        </v-btn>-->
      <!--      </v-card-actions>-->
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
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.name_patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.age="{ header }">
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
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">{{ item.patient.age }}</td>
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
                    color="orange lighten-5"
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
                    color="green darken-2"
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
                    <v-tooltip
                      bottom
                      v-if="
                        _.includes(
                          $auth.user().permissions,
                          'change_consultation'
                        )
                      "
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="editConsultation(item)"
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
                    <!-- <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          @click="print(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-printer</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                    </v-tooltip> -->
                    <v-tooltip
                      bottom
                      v-if="
                        _.includes(
                          $auth.user().permissions,
                          'delete_consultation'
                        )
                      "
                    >
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
      <form-dental
        :dialog="dialogFormDental"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="dentalForm"
      ></form-dental>
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
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormConsultation from "./Form";
import FormMedical from "./../medical_consultation/FormMedical";
import FormDental from "./../dental_consultation/FormDental";
import FormPrenatal from "./../prenatal_consultation/FormPrenatal";
import FormOphtalmologic from "./../ophtamological_consultation/FormOphtal";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
import FormPdf from "./../bills/Pdf";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/consultations",
    urlItemsDetails: "/details_consultations",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    menu: false,
    menu2: false,
    dialogFormMedical: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionStatus: {
      type_status: [],
    },
    dialogFormPrenatal: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDental: {
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
    currentFile: undefined,
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
    maxDate: new Date().toISOString().substr(0, 10),
    minDate: new Date().toISOString().substr(0, 10),
    fileInfos: [],
    filter: {
      patient: null,
      status: null,
      createdAt: null,
      doctor: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionVisit: {
      typeVisit: [],
    },
    urlPatients: "patients",
    urlDoctors: "doctors",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchDoctor: null,
    searchPatient: null,
    itemsPatient: [],
    itemsDoctor: [],
    loading: {
      list: false,
      refresh: false,
      filter: false,
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
    this.getOptionsStatus();
  },
  methods: {
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("consultations/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = "$vuetify.error_occured";
            const fields = error.response.data;
            self.setFormErrors(fields);
            this.$forceUpdate();
          } else {
            message = "$vuetify.error_server";
          }
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(message),
            color: "#B71C1C",
          });
        })
        .then(() => {
          self.loading = false;
        });
    },
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    getItems() {
      let self = this;
      let url;
      url =
        this.$auth.user().type == "DOCTOR"
          ? self.urlItems + "?doctor=" + this.$auth.user().doctor.id
          : this.$auth.user().type == "PATIENT"
          ? self.urlItems + "?patient=" + this.$auth.user().patient.id
          : self.urlItems;
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
    getOptionsStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.status_consultation, (type_status) => {
        self.optionStatus.type_status.push({
          text: self.$vuetify.lang.t(type_status.text),
          value: type_status.value,
        });
      });
    },
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
          text: "$vuetify.prescription.cols.patient.title",
          value: "name_patient",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.age.title",
          value: "age",
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
      if (item.type_consultation.type === "MEDICAL") {
        this.dialogFormMedical.show = true;
        this.$refs.medicalForm.setFormConsult(item);
      } else if (item.type_consultation.type === "PRENATAL") {
        this.dialogFormPrenatal.show = true;
        this.$refs.prenatalForm.setFormConsult(item);
      } else if (item.type_consultation.type === "DENTAL") {
        this.dialogFormDental.show = true;
        this.$refs.dentalForm.setFormConsult(item);
      } else {
        this.dialogFormOphtalmologic.show = true;
        this.$refs.ophtalmologicForm.setFormConsult(item);
      }
      this.messages = {
        title: "$vuetify.consultation.new.title",
        submit: "$vuetify.consultation.new.submit",
        success: "$vuetify.consultation.new.success",
      };
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    print(item) {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.loading.list = true;
      self.$store
        .dispatch("request", {
          url: self.urlItemsDetails + "/print" + "?consultation=" + item.id,
          method: "GET",
        })
        .then((response) => {
          // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          this.editPdf(objectUrl);
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = "$vuetify.error_occured";
            const fields = error.response.data;
            self.setFormErrors(fields);
            this.$forceUpdate();
          } else {
            message = "$vuetify.error_server";
          }
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(message),
            color: "#B71C1C",
          });
        })
        .then(() => {
          self.loading.list = false;
        });
      /*else {
               console.log(self.$v);
             }*/
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
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
      }
      if (self.filter.createdAt !== null) {
        params["createdAt"] = self.filter.createdAt;
      }
      if (self.filter.status !== null) {
        params["status"] = self.filter.status;
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
    FormPdf,
    FormPrenatal,
    FormDental,
    FormOphtalmologic,
    DeleteItem,
  },
};
</script>

<style scoped></style>
