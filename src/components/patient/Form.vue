<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form>
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.code"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.code.title')"
                  class="font-weight-bold"
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  v-model="form.type_patient"
                  :items="itemsType_patient"
                  :loading="isLoadingType_patient"
                  :search-input.sync="searchType_patient"
                  :label="$vuetify.lang.t('$vuetify.type_patient.title')"
                  color="primary"
                  item-text="title"
                  hide-no-data
                  item-value="id"
                  class="font-weight-bold"
                  prepend-inner-icon="mdi-code-array"
                  outlined
                  clearable
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.type_patient.title") +
                      " : " +
                      default_patient
                    }}
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-select
                  outlined
                  dense
                  v-model="form.gender"
                  color="primary"
                  :items="optionGender.type_Gender"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.gender.title')"
                  :placeholder="
                    $vuetify.lang.t('$vuetify.patient.cols.gender.title')
                  "
                  class="font-weight-bold"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.patient.cols.gender.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.first_name.title')
                  "
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="firstnameErrors"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{
                      $vuetify.lang.t("$vuetify.patient.cols.first_name.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.address"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.address.title')
                  "
                  class="font-weight-bold"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.patient.cols.address.title") }}
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.phone"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.phone.title')"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.patient.cols.phone.title")
                    }}<span class="red--text"><strong></strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.other_phone"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.other_phone.title')
                  "
                  @input="$v.form.other_phone.$touch()"
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.email"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.email.title')"
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  v-model="form.insurance"
                  :items="itemsType_insurance"
                  :loading="isLoadingType_insurance"
                  :search-input.sync="searchType_insurance"
                  :label="$vuetify.lang.t('$vuetify.insurance.title')"
                  color="primary"
                  item-text="name"
                  hide-no-data
                  item-value="id"
                  class="font-weight-bold"
                  prepend-inner-icon="mdi-shield"
                  outlined
                  clearable
                  ><template slot="selection" slot-scope="data">
                    {{ data.item.name }} - {{ data.item.percent }} %
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.name }} - {{ data.item.percent }} %
                  </template>
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{ $vuetify.lang.t("$vuetify.insurance.title") }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -20px"
              >
                <v-switch
                  v-model="form.is_default"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.district.cols.is_default.title')
                  "
                  outlined
                  dense
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions style="margin-bottom: -5px">
          <v-spacer></v-spacer>
          <v-btn @click="closeModals">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>

          <v-btn color="primary" :loading="loading" @click="save">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <form-city :dialog="dialogForm"></form-city>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import FormCity from "./FormCity";
import { required, maxLength } from "vuelidate/lib/validators";
// import { phoneR } from "../../helpers/Validator";
import moment from "moment";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          pasysto: null,
          is_default: null,
          padiasto: null,
          temperature: null,
          bpm: null,
          size: null,
          electrophoresis: null,
          weight: null,
          blood_group: null,
          allergies: null,
          type_patient_default: null,
          scale_price: null,
          primary_insured: null,
          pathologies: null,
          name: null,
          religion: null,
          type_id: null,
          mother_name: null,
          emergency_name: null,
          emergency_contact: null,
          maritalStatus: null,
          number_id: null,
          email: null,
          city: null,
          district: null,
          date_id: null,
          is_assured: null,
          insurance: null,
          child: null,
          username: null,
          password: null,
          re_password: null,
          dateNaiss: null,
          address: null,
          other_phone: null,
          phone: null,
          code: null,
          type_patient: null,
          age: null,
          gender: null,
          shape: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    e1: 1,
    isLoading: false,
    search: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
    isLoadingCity: false,
    searchCity: null,
    itemsCity: [],
    urlCity: "cities",
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    // formR: {
    //   id: null,
    //   name: null
    // },
    optionGender: {
      type_Gender: [],
    },
    optionReligion: {
      type_Religion: [],
    },
    optionID: {
      type_ID: [],
    },
    optionBlood_group: {
      type_Blood_group: [],
    },
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionMaritalStatus: {
      type_MaritalStatus: [],
    },
    optionElectrophoresis: {
      type_Electrophoresis: [],
    },
    urlType_patient: "type_patients/all",
    isLoadingType_patient: false,
    searchType_patient: null,
    default_patient: null,
    itemsType_patient: [],
    urlType_insurance: "insurances",
    isLoadingType_insurance: false,
    searchType_insurance: null,
    itemsType_insurance: [],
    itemsSelectingPatient: [],
    urlItems: "patients",
  }),
  watch: {
    "dialog.show": {
      immediate: false,
      async handler() {
        await this.loadTypePatient();
      },
    },
    searchCity(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCity = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCity = response.data.content;
        })
        .finally(() => (this.isLoadingCity = false));
    },
    searchType_patient(value) {
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
    searchType_insurance(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_insurance = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_insurance,
          params: params,
        })
        .then((response) => {
          self.itemsType_insurance = response.data.content;
        })
        .finally(() => (this.isLoadingType_insurance = false));
    },
  },
  created() {
    this.getOptionsMaritalStatus();
    this.getOptionsBlood_group();
    this.getOptionsElectrophoresis();
    this.getOptionsReligion();
    this.getOptionsID();
    this.getOptionsGender();
    this.getOptionsPatient_shape();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          maxLength: maxLength(255),
        },
        // email: {
        //   // required,
        //   email
        // },

        // city: {
        //   required
        // },
        // emergency_name: {
        //   required
        // },
        // emergency_contact: {
        //   required,
        //   phoneR
        // },
        // dateNaiss: {
        //   required
        // },
        // gender: {
        //   required,
        // },
        // username: {
        //   required,
        //   maxLength: maxLength(255),
        //   minLength: minLength(3),
        //   unique: existUsername
        // },
        // password: {
        //   required: requiredIf(component => {
        //     return !component["id"];
        //   })
        // },
        // re_password: {
        //   sameAsPassword: sameAs("password")
        // }
      },
    };
    return validators;
  },
  methods: {
    async loadTypePatient(value) {
      const params = { name: value, is_default: true };

      const response = await this.$store.dispatch("request", {
        url: this.urlType_patient,
        params,
      });

      const patient = response.data.content?.[0];

      if (patient) {
        this.form.type_patient_default = patient;
        this.itemsSelectingPatient.push(patient);
        this.default_patient = patient.title;
      }

      return patient;
    },
    createCity() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    closeModals() {
      this.dialog.show = false;
      this.e1 = 1;
    },
    goToNextPage2() {
      this.e1 = 2;
    },
    goToNextPage3() {
      this.e1 = 3;
    },

    backTo() {
      this.e1 = 1;
    },
    backTo2() {
      this.e1 = 2;
    },
    backTo3() {
      this.e1 = 3;
    },
    getsignal() {
      this.e1 = 2;
      this.existId = true;
    },
    // Fonction pour récuperer les types de roles dans la store
    getOptionsReligion() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Religion, (type_Religion) => {
        self.optionReligion.type_Religion.push({
          text: self.$vuetify.lang.t(type_Religion.text),
          value: type_Religion.value,
        });
      });
    },
    getOptionsID() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_ID, (type_ID) => {
        self.optionID.type_ID.push({
          text: self.$vuetify.lang.t(type_ID.text),
          value: type_ID.value,
        });
      });
    },
    getOptionsGender() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Gender, (type_Gender) => {
        self.optionGender.type_Gender.push({
          text: self.$vuetify.lang.t(type_Gender.text),
          value: type_Gender.value,
        });
      });
    },
    getOptionsElectrophoresis() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_Electrophoresis,
        (type_Electrophoresis) => {
          self.optionElectrophoresis.type_Electrophoresis.push({
            text: self.$vuetify.lang.t(type_Electrophoresis.text),
            value: type_Electrophoresis.value,
          });
        }
      );
    },
    getOptionsBlood_group() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Blood_group, (type_Blood_group) => {
        self.optionBlood_group.type_Blood_group.push({
          text: self.$vuetify.lang.t(type_Blood_group.text),
          value: type_Blood_group.value,
        });
      });
    },
    getOptionsMaritalStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_MaritalStatus,
        (type_MaritalStatus) => {
          self.optionMaritalStatus.type_MaritalStatus.push({
            text: self.$vuetify.lang.t(type_MaritalStatus.text),
            value: type_MaritalStatus.value,
          });
        }
      );
    },
    getOptionsPatient_shape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_Patient_shape,
        (type_Patient_shape) => {
          self.optionPatient_shape.type_Patient_shape.push({
            text: self.$vuetify.lang.t(type_Patient_shape.text),
            value: type_Patient_shape.value,
          });
        }
      );
    },

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        blood_group: this.form.blood_group,
        mother_name: this.form.mother_name,
        emergency_name: this.form.emergency_name,
        emergency_contact: this.form.emergency_contact,
        religion: this.form.religion,
        dateNaiss: this.form.dateNaiss,
        scale_price: this.form.scale_price,
        primary_insured: this.form.primary_insured,
        date_id: this.form.date_id,
        number_id: this.form.number_id,
        email: this.form.email,
        city: this.form.city,
        district: this.form.district,
        type_id: this.form.type_id,
        address: this.form.address,
        name: this.form.name,
        child: this.form.child,
        phone: this.form.phone,
        other_phone: this.form.other_phone,
        is_assured: this.form.is_assured,
        insurance: this.form.insurance,
        maritalStatus: this.form.maritalStatus,
        age: this.form.age ? this.form.age : this.get_age,
        shape: this.form.shape,
        gender: this.form.gender,
        electrophoresis: this.form.electrophoresis,
        bpm: this.form.bpm,
        is_default: this.form.is_default,
        size: this.form.size,
        weight: this.form.weight,
        allergies: this.form.allergies,
        pasysto: this.form.pasysto,
        pathologies: this.form.pathologies,
        padiasto: this.form.padiasto,
        type_patient:
          this.form.type_patient?.id ??
          this.form.type_patient_default?.id ??
          null,
        temperature: this.form.temperature,
        // username: this.form.username,
        // password: this.form.password
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.date_id = item.date_id;
      this.form.number_id = item.number_id;
      this.form.allergies = item.allergies;
      this.form.pasysto = item.pasysto;
      this.form.pathologies = item.pathologies;
      this.form.padiasto = item.padiasto;
      this.form.temperature = item.temperature;
      this.form.emergency_contact = item.emergency_contact;
      this.form.bpm = item.bpm;
      this.form.email = item.email;
      this.form.primary_insured = item.primary_insured;
      this.form.size = item.size;
      this.form.is_default = item.is_default;
      this.form.electrophoresis = item.electrophoresis;
      this.form.weight = item.weight;
      this.form.emergency_name = item.emergency_name;
      this.form.blood_group = item.blood_group;
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.scale_price = item.scale_price;
      this.form["oldName"] = item.name;
      this.form.address = item.address;
      this.form.child = item.child;
      this.form.mother_name = item.mother_name;
      this.form.dateNaiss = item.dateNaiss;
      this.form.insurance = item.insurance;
      this.itemsType_insurance.push(item.insurance);
      this.form.is_assured = item.is_assured;
      this.form.phone = item.phone;
      this.form["oldPhone"] = item.phone;
      this.form.other_phone = item.other_phone;
      this.form["oldPhone"] = item.other_phone;
      this.form.code = item.code;
      this.form["oldcode"] = item.code;
      this.form.gender = item.gender;
      this.form.age = item.age;
      this.form.shape = item.shape;
      this.form.maritalStatus = item.maritalStatus;
      this.form.religion = item.religion;
      this.form.type_patient = item.type_patient["id"]
        ? item.type_patient["id"]
        : item.type_patient;
      this.itemsType_patient.push(item.type_patient);
    },
  },
  computed: {
    get_age() {
      if (this.form.dateNaiss) {
        const today = new Date();
        const date_year = today.getFullYear();
        return date_year - moment(String(this.form.dateNaiss)).format("YYYY");
      } else {
        return "";
      }
    },
    // Gestion des erreurs du formulaire
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;

      !this.$v.form.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );

      !this.$v.form.username.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.minLength",
            this.$v.form.username.$params.minLength.min
          )
        );

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.maxLength",
            this.$v.form.username.$params.maxLength.max
          )
        );
      return errors;
    },
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
    rePasswordErrors() {
      let errors = [];
      if (!this.$v.form.re_password.$dirty) return errors;

      !this.$v.form.re_password.sameAsPassword &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
        );
      return errors;
    },
    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.first_name.required")
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      // !this.$v.form.email.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.patient.cols.email.required")
      //   );

      !this.$v.form.email.email &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.email.invalid")
        );
      return errors;
    },
    patient_shapeErrors() {
      let errors = [];
      if (!this.$v.form.shape.$dirty) return errors;

      !this.$v.form.shape.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.patient_shape.required")
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];

      if (!this.$v.form.phone.$dirty) return errors;

      !this.$v.form.phone.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.phone.required")
        );

      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.phone.invalid")
        );

      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.other_phone.invalid")
        );
      return errors;
    },
    addressErrors() {
      let errors = [];
      if (!this.$v.form.address.$dirty) return errors;
      !this.$v.form.address.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.address.required")
        );
      return errors;
    },
    emergency_contactErrors() {
      let errors = [];
      if (!this.$v.form.emergency_contact.$dirty) return errors;
      !this.$v.form.emergency_contact.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.patient.cols.emergency_contact.required"
          )
        );
      if (!this.$v.form.emergency_contact.$dirty) return errors;
      !this.$v.form.emergency_contact.phoneR &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.patient.cols.emergency_contact.invalid"
          )
        );
      return errors;
    },
    emergency_nameErrors() {
      let errors = [];
      if (!this.$v.form.emergency_name.$dirty) return errors;
      !this.$v.form.emergency_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.emergency_name.required")
        );
      return errors;
    },
    districtErrors() {
      let errors = [];
      if (!this.$v.form.district.$dirty) return errors;
      !this.$v.form.district.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.district.required")
        );
      return errors;
    },
    cityErrors() {
      let errors = [];
      if (!this.$v.form.city.$dirty) return errors;
      !this.$v.form.city.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.city.required")
        );
      return errors;
    },
    genderErrors() {
      let errors = [];
      if (!this.$v.form.gender.$dirty) return errors;
      !this.$v.form.gender.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.gender.required")
        );
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
    dateNaissErrors() {
      let errors = [];
      if (!this.$v.form.dateNaiss.$dirty) return errors;
      !this.$v.form.dateNaiss.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.birthday.required")
        );
      return errors;
    },
    religionErrors() {
      let errors = [];
      if (!this.$v.form.religion.$dirty) return errors;
      !this.$v.form.religion.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.religion.required")
        );
      return errors;
    },
    mother_nameErrors() {
      let errors = [];
      if (!this.$v.form.mother_name.$dirty) return errors;
      !this.$v.form.mother_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.mother_name.required")
        );
      return errors;
    },
  },
  components: {
    FormCity,
  },
};
</script>
