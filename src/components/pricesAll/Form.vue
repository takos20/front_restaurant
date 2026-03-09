<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.type_patient"
                    :items="itemsType_patient"
                    :loading="isLoadingType_patient"
                    :search-input.sync="searchType_patients"
                    @blur="$v.form.type_patient.$touch()"
                    @input="$v.form.type_patient.$touch()"
                    :error-messages="type_patientErrors"
                    :label="$vuetify.lang.t('$vuetify.type_patient.title')"
                    color="primary"
                    item-text="title"
                    return-object
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.type_patient.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  v-if="this.$route.params.type === 'room'"
                >
                  <v-select
                    v-model="form.type_accommodation"
                    color="primary"
                    :items="optionType.type_accommodation"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.hospitalization.cols.type_accommodation.title'
                      )
                    "
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.hospitalization.cols.type_accommodation.title'
                      )
                    "
                    prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.hospitalization.cols.type_accommodation.title"
                        )
                      }}
                    </template>
                  </v-select>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  v-if="this.$route.params.type === 'room'"
                >
                  <v-select
                    v-model="form.number_bed"
                    color="primary"
                    :items="optionNumberBed.number_bed"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.hospitalization.cols.number_bed.title'
                      )
                    "
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.hospitalization.cols.number_bed.title'
                      )
                    "
                    prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.price"
                    color="primary"
                    @blur="$v.form.price.$touch()"
                    @input="$v.form.price.$touch()"
                    :error-messages="priceErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.radiography.cols.price.title')
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.radiography.cols.price.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
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
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
// import { existPrices } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          price: null,
          type_patient: null,
          status_patient: null,
          type_accommodation: null,
          exam_investigation: null,
          laboratory: null,
          diagnostic: null,
          consultation: null,
          room: null,
          bed: null,
          medical_act: null,
          surgery: null,
          number_bed: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionNumberBed: {
      number_bed: [],
    },
    optionType: {
      type_accommodation: [],
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlType_patient: "type_patients",
    isLoadingType_patient: false,
    searchType_patients: null,
    itemsType_patient: [],
    urlItems: "prices",
    isLoading: false,
  }),
  watch: {
    searchType_patients(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_patient = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_patient,
          params: params,
        })
        .then((response) => {
          self.itemsType_patient = response.data.content;
        })
        .finally(() => (this.isLoadingType_patient = false));
    },
  },

  created() {
    this.getOptionsType();
    this.getOptionsNumberBed();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        price: {
          required,
        },
        type_patient: {
          required,
          // unique: existPrices
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsNumberBed() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.number_bed, (number_bed) => {
        self.optionNumberBed.number_bed.push({
          text: self.$vuetify.lang.t(number_bed.text),
          value: number_bed.value,
        });
      });
    },
    getOptionsType() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_accommodation,
        (type_accommodation) => {
          self.optionType.type_accommodation.push({
            text: self.$vuetify.lang.t(type_accommodation.text),
            value: type_accommodation.value,
          });
        }
      );
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        type_accommodation: this.form.type_accommodation,
        number_bed: this.form.number_bed,
        price: this.form.price,
        status_patient: this.form.type_patient,
        other_code: this.$route.params.code,
        exam_investigation: this.form.exam_investigation,
        medical_act: this.form.medical_act,
        room: this.form.room,
        laboratory: this.form.laboratory,
        surgery: this.form.surgery,
        diagnostic: this.form.diagnostic,
        radiography: this.form.radiography,
        consultation: this.form.consultation,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.type_accommodation = item.type_accommodation;
      this.form.number_bed = item.number_bed;
      this.form.id = item.id;
      this.form.price = item.price;
      this.form.type_patient = item.status_patient["id"];
      this.itemsType_patient.push(item.status_patient);
      this.form.surgery = item.surgery["id"];
      // this.form["oldType_patient"] = item.status_patient;
      // this.form["other_code"] = this.$route.params.code;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    titleErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.dosage.cols.title.required")
        );

      !this.$v.form.title.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.dosage.cols.title.unique"));
      return errors;
    },
    type_patientErrors() {
      let errors = [];
      if (!this.$v.form.type_patient.$dirty) return errors;
      !this.$v.form.type_patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.type_patient.required")
        );
      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.price.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
