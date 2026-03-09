<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
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
                <v-col cols="12" sm="5" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.patient"
                    :items="itemsPatient"
                    :loading="isLoadingPatient"
                    :search-input.sync="searchPatient"
                    @blur="$v.form.patient.$touch()"
                    @input="$v.form.patient.$touch()"
                    :error-messages="patientErrors"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.prescription.cols.patient.title'
                      )
                    "
                    item-text="name"
                    item-value="id"
                    hide-no-data
                    class="font-weight-bold"
                    clearable
                    outlined
                    autofocus
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="3" class="mb-0 py-0" v-if="this.form.id">
                  <v-text-field
                    v-model="form.createdAt"
                    color="primary"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.createdAt.title'
                      )
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0" v-if="!this.form.id">
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.type_consultation"
                    :items="itemsType_consultation"
                    :loading="isLoadingType_consultation"
                    :search-input.sync="searchType_consultation"
                    color="primary"
                    @blur="$v.form.type_consultation.$touch()"
                    @input="$v.form.type_consultation.$touch()"
                    :error-messages="type_consultationErrors"
                    :label="$vuetify.lang.t('$vuetify.type_consultation.title')"
                    item-text="title"
                    item-value="id"
                    hide-no-data
                    class="font-weight-bold"
                    clearable
                    outlined
                    autofocus
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.doctor"
                    :items="itemsDoctor"
                    :loading="isLoadingDoctor"
                    :search-input.sync="searchDoctor"
                    @blur="$v.form.doctor.$touch()"
                    @input="$v.form.doctor.$touch()"
                    :error-messages="doctorErrors"
                    color="primary"
                    item-text="name"
                    :label="
                      $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
                    "
                    hide-no-data
                    outlined
                    item-value="id"
                    class="font-weight-bold"
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.status"
                    outlined
                    color="primary"
                    @blur="$v.form.status.$touch()"
                    @input="$v.form.status.$touch()"
                    :error-messages="statusErrors"
                    dense
                    clearable
                    prepend-inner-icon="mdi-account-group-outline"
                    :items="optionStatus.type_status"
                    :label="
                      $vuetify.lang.t('$vuetify.consultation.cols.status.title')
                    "
                  ></v-select>
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
    <form-patient :dialog="dialogForm"></form-patient>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
import FormPatient from "./FormPatient";
import { required } from "vuelidate/lib/validators";

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
          type_consultation: null,
          createdAt: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          reason: null,
          status: null,
          patient: null,
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
    maxDate: new Date().toISOString().substr(0, 10),
    optionStatus: {
      type_status: [],
    },
    show: false,
    rules: [
      (v) => v >= 1 || "Le grade doit être supérieure ou égale à 1",
      (v) => v <= 5 || "Le maximum ne doit pas dépasser 5",
    ],
    menu: false,
    consultation_price: "",
    menu3: false,
    urlItems: "consultations",
    urlPatients: "patients",

    isLoadingPatient: false,
    urlDoctors: "doctors",
    isLoadingDoctor: false,
    searchDoctor: null,
    itemsDoctor: [],
    searchType_consultation: null,
    itemsType_consultation: [],
    isLoadingType_consultation: false,
    urlType_consultation: "type_consultations",

    searchPatient: null,
    itemsPatient: [],
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
    searchType_consultation(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_consultation = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_consultation,
          params: params,
        })
        .then((response) => {
          self.itemsType_consultation = response.data.content;
        })
        .finally(() => (this.isLoadingType_consultation = false));
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
  validations() {
    let validators = {
      form: {
        patient: {
          required,
        },
        type_consultation: {
          required,
        },
        doctor: {
          required,
        },
        status: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PATCH" : "POST";
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.resetDataForm();
    },
    resetDataForm() {
      this.examResults = [];
      this.careSheet = [];
      this.categoryBackground = [];
      this.form.id = null;
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
    },
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
        status: this.form.status,
        type_consultation: this.form.type_consultation,
        patient: this.form.patient,
        doctor: this.form.doctor,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.status = item.status;
      this.form.createdAt = item.createdAt;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.type_consultation = item.type_consultation["id"];
      this.itemsType_consultation.push(item.type_consultation);
    },
  },
  computed: {
    get_consultation_price() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.consultation_price =
        this.form.type_consultation === null
          ? ""
          : this.form.type_consultation?.price;
      // this.reset_product_detail_act();

      return this.consultation_price;
      // let product_public_price = "";
    },
    // Gestion des erreurs du formulaire
    patientErrors() {
      let errors = [];
      if (!this.$v.form.patient.$dirty) return errors;
      !this.$v.form.patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.certificate.cols.patient.required")
        );

      return errors;
    },
    doctorErrors() {
      let errors = [];
      if (!this.$v.form.doctor.$dirty) return errors;
      !this.$v.form.doctor.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.certificate.cols.doctor.required")
        );

      return errors;
    },
    type_consultationErrors() {
      let errors = [];
      if (!this.$v.form.type_consultation.$dirty) return errors;
      !this.$v.form.type_consultation.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.consultation.cols.consultation_type.required"
          )
        );
      return errors;
    },
    statusErrors() {
      let errors = [];
      if (!this.$v.form.status.$dirty) return errors;
      !this.$v.form.status.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.consultation.cols.status.required")
        );
      return errors;
    },
  },
  components: { FormPatient },
};
</script>
