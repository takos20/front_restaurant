<template>
  <div>
    <v-card class="pb-4" height="60">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_pregnancyvisit')"
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
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.consultation.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-card-text>
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
            </v-card-text>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-card-text>
              <v-autocomplete
                v-model="filter.doctor"
                :items="itemsDoctor"
                :loading="isLoadingDoctor"
                :search-input.sync="searchDoctor"
                :label="
                  $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
                "
                outlined
                dense
                color="primary"
                item-text="name"
                hide-no-data
                @change="performFilter"
                item-value="id"
                class="font-weight-bold"
                clearable
              ></v-autocomplete>
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
          </tr> </template
        ><template v-slot:header.name_doctor="{ header }">
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
                <td class="subtitle-2">DR. {{ item.doctor.name }}</td>
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
                    <v-tooltip
                      bottom
                      v-if="
                        _.includes(
                          this.$auth.user().permissions,
                          'delete_pregnancyvisit'
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
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormMedicalact from "./Form";
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
        {
          text: "$vuetify.prescription.cols.doctor.title",
          value: "name_doctor",
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
