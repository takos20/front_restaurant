<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-card-text>
                <v-autocomplete
                  outlined
                  dense
                  v-model="form.patient"
                  :items="itemsPatient"
                  :loading="isLoadingPatient"
                  :search-input.sync="searchPatient"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.prescription.cols.patient.title')
                  "
                  class="font-weight-bold"
                  clearable
                ></v-autocomplete>
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-btn
                class="mr-10 my-7"
                dark
                dense
                @click="createPatient()"
                color="primary"
                max-width="2px"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              v-if="this.$auth.user().role !== 'DOCTOR'"
            >
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="mb-0 py-0"
              v-if="this.$auth.user().role !== 'DOCTOR'"
            >
              <v-card-text>
                <v-autocomplete
                  outlined
                  dense
                  v-model="form.doctor"
                  :items="itemsDoctor"
                  :loading="isLoadingDoctor"
                  :search-input.sync="searchDoctor"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
                  "
                  class="font-weight-bold"
                  clearable
                ></v-autocomplete>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-card max-width="400px" class="ml-9 mt-5">
            <v-card-text>
              <span
                class="text-h7 text-center body-2 black--text text--darken-1"
              >
                {{ $vuetify.lang.t("$vuetify.background.title") }}
              </span>
              <v-container class="mt-3">
                <v-row wrap>
                  <v-col cols="12" sm="12" class="mb-0 py-0">
                    <v-select
                      outlined
                      dense
                      v-model="form.category_back"
                      color="primary"
                      :items="optionCategory.type_Category"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.background.cols.category.title'
                        )
                      "
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-0 py-0">
                    <v-textarea
                      outlined
                      dense
                      v-model="form.description_back"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.background.cols.description.title'
                        )
                      "
                      class="font-weight-bold"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    :loading="loading"
                    dark
                    @click="save_background()"
                  >
                    {{ $vuetify.lang.t(messages.submit) }}
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card max-width="400px" class="ml-5 mt-5">
            <v-card-text>
              <span
                class="text-h7 text-center body-2 black--text text--darken-1"
              >
                {{ $vuetify.lang.t("$vuetify.consultation.title") }}
              </span>
              <v-container class="mt-3">
                <v-row wrap>
                  <v-col cols="12" sm="12" class="mb-0 py-0">
                    <v-text-field
                      outlined
                      dense
                      v-model="form.reason"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.consultation.cols.reason.title'
                        )
                      "
                      class="font-weight-bold"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" class="mb-0 py-0">
                    <v-textarea
                      outlined
                      dense
                      v-model="form.diagnostic"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.consultation.cols.diagnostic.title'
                        )
                      "
                      class="font-weight-bold"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-row>
        <v-card max-width="820px" class="ml-6 mt-5">
          <v-card-text>
            <span class="text-h7 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.examination.title") }}
            </span>

            <v-container class="mt-3">
              <v-row wrap>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-select
                    outlined
                    dense
                    v-model="form.type_examination"
                    color="primary"
                    :items="optionExamination.type_Examination"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.type_examination.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    outlined
                    dense
                    v-model="form.description_exam"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.description.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-textarea>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  v-if="form.type_examination === 'CLINICAL'"
                >
                  <v-text-field
                    outlined
                    dense
                    v-model="form.temperature"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.temperature.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field> </v-col
                ><v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  v-if="form.type_examination === 'CLINICAL'"
                >
                  <v-text-field
                    outlined
                    dense
                    v-model="form.tension"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.examination.cols.tension.title')
                    "
                    class="font-weight-bold"
                  ></v-text-field> </v-col
                ><v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  v-if="form.type_examination === 'CLINICAL'"
                >
                  <v-text-field
                    outlined
                    dense
                    v-model="form.perimeter"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.perimeter.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <v-card-text>
            <span class="text-h7 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.prescription.title_Ordinance") }}
            </span>
            <v-container class="mt-3">
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.medication"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.medication.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.period_medication"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.period_medication.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.product_qte"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.product_qte.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.product_nbr_fois"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.product_nbr_fois.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="form.product_form"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.product_form.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <v-card-text>
            <span class="text-h7 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.appointment.title") }}
            </span>
            <v-container class="mt-3">
              <v-row wrap>
                <div>
                  <v-text-field
                    class="font-weight-bold ml-3"
                    outlined
                    dense
                    v-model="form.start_appointment_date"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.appointment.cols.start_appointment_date.title'
                      )
                    "
                    :readonly="form.postpone === false || form.id !== null"
                  >
                    <template v-slot:append>
                      <date-pickerstart
                        @getdatetime_start="getdatetime_start"
                      ></date-pickerstart>
                    </template>
                  </v-text-field>
                </div>
                <div>
                  <v-text-field
                    class="font-weight-bold ml-4"
                    outlined
                    dense
                    v-model="form.end_appointment_date"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.appointment.cols.end_appointment_date.title'
                      )
                    "
                  >
                    <template v-slot:append>
                      <date-pickerend
                        @getdatetime_end="getdatetime_end"
                      ></date-pickerend>
                    </template>
                  </v-text-field>
                </div>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    outlined
                    dense
                    v-model="form.problem"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.appointment.cols.problem.title')
                    "
                    class="font-weight-bold"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-2" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card-text> </v-card-text>
      </v-form>
    </v-card>
    <form-patient :dialog="dialogForm"></form-patient>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import DatePickerend from "../appointment/date-picker-end.vue";
import DatePickerstart from "../appointment/date-picker-start.vue";
import FormPatient from "./FormPatient";

// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          product_qte: null,
          product_nbr_fois: null,
          product_form: null,
          tension: null,
          perimeter: null,
          temperature: null,
          type_examination: null,
          description_exam: null,
          description_back: null,
          category_back: null,
          reason: null,
          diagnostic: null,
          period_medication: null,
          patient: null,
          medication: null,
          doctor: null,
        };
      },
    },
  },
  data: () => ({
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionCategory: {
      type_Category: [],
    },
    optionExamination: {
      type_Examination: [],
    },
    menu: false,
    urlItems: "prescriptions",
    urlItemsBackground: "backgrounds",
    urlPatients: "patients",
    urlDoctors: "doctors",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchDoctor: null,
    searchPatient: null,
    itemsPatient: [],
    itemsDoctor: [],
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
          console.log("respp", response.data.content);
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
          console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getOptionsCategory();
    this.getOptionsExamination();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    createPatient() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
        coefficient: null,
        number_account: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    getOptionsCategory() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.category, (type_Category) => {
        self.optionCategory.type_Category.push({
          text: self.$vuetify.lang.t(type_Category.text),
          value: type_Category.value,
        });
      });
    },
    getOptionsExamination() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.examination, (type_Examination) => {
        self.optionExamination.type_Examination.push({
          text: self.$vuetify.lang.t(type_Examination.text),
          value: type_Examination.value,
        });
      });
    },
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
        coefficient: null,
        number_account: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        period_medication: this.form.period_medication,
        medication: this.form.medication,
        patient: this.form.patient,
        doctor: this.form.doctor,
      };
      return data;
    },
    getDataFormBackground() {
      let data = {
        category_back: this.form.category_back,
        description_back: this.form.description_back,
        patient: this.form.patient,
        doctor: this.form.doctor,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.medication = item.medication;
      this.form.period_medication = item.period_medication;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.unique")
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.price.required")
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.form.quote_external.$dirty) return errors;

      !this.$v.form.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.prescription.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: { DatePickerend, DatePickerstart, FormPatient },
};
</script>
