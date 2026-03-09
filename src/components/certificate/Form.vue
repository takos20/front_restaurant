<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form style="margin-top: 15px" @submit.prevent="save">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.ordinance.cols.code.title')"
                prepend-inner-icon="mdi-code-array"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="9" class="mb-0 py-0">
              <v-autocomplete
                dense
                v-model="form.patient"
                :items="itemsPatient"
                :loading="isLoadingPatient"
                :search-input.sync="searchPatient"
                :label="
                  $vuetify.lang.t('$vuetify.ordinance.cols.patient.title')
                "
                color="primary"
                item-text="name"
                hide-no-data
                item-value="id"
                class="font-weight-bold"
                prepend-inner-icon="mdi-code-array"
                outlined
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              :disabled="this.$auth.user().role !== 'DOCTOR'"
            >
              <v-autocomplete
                v-model="form.doctor"
                :items="itemsDoctor"
                :loading="isLoadingDoctor"
                :search-input.sync="searchDoctor"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.dealing_with.title')
                "
                prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <!--            <v-col cols="12" sm="4" class="mb-0 py-0">-->
            <!--              <v-autocomplete-->
            <!--                dense-->
            <!--                v-model="form.consultation"-->
            <!--                :items="itemsConsultation"-->
            <!--                :loading="isLoadingConsultation"-->
            <!--                :search-input.sync="searchConsultation"-->
            <!--                color="primary"-->
            <!--                item-text="code"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t('$vuetify.ordinance.cols.consultation.title')-->
            <!--                "-->
            <!--                hide-no-data-->
            <!--                item-value="id"-->
            <!--                class="font-weight-bold"-->
            <!--                clearable-->
            <!--                prepend-inner-icon="mdi-code-array"-->
            <!--                outlined-->
            <!--              ></v-autocomplete>-->
            <!--            </v-col>-->
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-select
                v-model="form.certificate_type"
                color="primary"
                :items="optionCertificate.type_certificate"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.certificate.cols.certificate_type.title'
                  )
                "
                :placeholder="
                  $vuetify.lang.t(
                    '$vuetify.certificate.cols.certificate_type.title'
                  )
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              v-if="
                this.form.certificate_type === 'STOPPAGE_WORK' ||
                this.form.certificate_type === 'STOPPAGE_SCHOOL'
              "
            >
              <v-select
                v-model="form.stoppage_type"
                color="primary"
                :items="optionStoppage.type_stoppage"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.certificate.cols.stoppage_type.title'
                  )
                "
                :placeholder="
                  $vuetify.lang.t(
                    '$vuetify.certificate.cols.stoppage_type.title'
                  )
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              v-if="
                this.form.stoppage_type === 'STOP' ||
                this.form.stoppage_type === 'EXTENSION'
              "
            >
              <v-text-field
                v-model="form.duration"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.certificate.cols.duration.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                :rules="[numberRuleDuration]"
                min="0"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              v-if="
                this.form.stoppage_type === 'EXTENSION' ||
                this.form.stoppage_type === 'STOP'
              "
            >
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
                    v-model="form.start_date"
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
                  v-model="form.start_date"
                  :max="maxDate"
                  color="primary"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              v-if="
                this.form.stoppage_type === 'STOP' ||
                this.form.stoppage_type === 'EXTENSION' ||
                this.form.stoppage_type === 'GETTING_BACK'
              "
            >
              <v-menu
                v-model="menu1"
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
                    class="font-weight-bold"
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
                    clearable
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.end_date"
                  :min="getminDate"
                  color="primary"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeForm()">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
// const FileSaver = require("file-saver");
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
          duration: null,
          consultation: null,
          doctor: null,
          end_date: null,
          stoppage_type: null,
          start_date: new Date().toISOString().substr(0, 10),
          certificate_type: null,
          patient: null,
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
    optionStoppage: {
      type_stoppage: [],
    },
    numberRuleDuration: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    loading: false,
    dialogFormQteDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    medication: [],
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu1: false,
    urlDoctor: "doctors",
    itemsDoctor: [],
    isLoadingDoctor: false,
    searchDoctor: null,
    searchPatient: null,
    itemsPatient: [],
    urlPatients: "patients",
    urlItems: "certificates",
    urlConsultation: "consultations",
    isLoadingPatient: false,
    isLoadingConsultation: false,
    searchConsultation: null,
    itemsConsultation: [],
    headers: [],
    items: [],
    meta: {},
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    minDate: new Date().toISOString().substr(0, 10),
    menu2: false,
    supply: false,
    active: false,
    menu4: false,
    isInventory: false,
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.inventory.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    optionCertificate: {
      type_certificate: [],
    },
  }),
  watch: {
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDoctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctor,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoadingDoctor = false));
    },
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
    searchConsultation(value) {
      if (value === null) return;
      const params = { code: value, patient: this.form.patient };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlConsultation,
          params: params,
        })
        .then((response) => {
          self.itemsConsultation = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getOptionsCertificate();
    this.getOptionsStoppage();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    getOptionsStoppage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_stoppage, (type_stoppage) => {
        self.optionStoppage.type_stoppage.push({
          text: self.$vuetify.lang.t(type_stoppage.text),
          value: type_stoppage.value,
        });
      });
    },
    getOptionsCertificate() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_certificate, (type_Certificate) => {
        self.optionCertificate.type_certificate.push({
          text: self.$vuetify.lang.t(type_Certificate.text),
          value: type_Certificate.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.send();
    },
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
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            self.closeForm();
            this.editPdf(objectUrl);

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    resetDataForm() {
      this.medication = [];
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
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient: this.form.patient,
        doctor: this.form.doctor,
        stoppage_type: this.form.stoppage_type,
        start_date: this.form.start_date
          ? this.form.start_date
          : new Date().toISOString().substr(0, 10),
        end_date: this.form.end_date,
        certificate_type: this.form.certificate_type,
        duration: this.form.duration ? this.form.duration : 0,
        // consultation: this.form.consultation
      };
      return data;
    },
    send() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails + "?ordinance=reset",
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.stoppage_type = item.stoppage_type;
      this.form.certificate_type = item.certificate_type;
      this.form.start_date = item.start_date;
      this.form.end_date = item.end_date;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      // this.form.consultation = item.consultation["id"];
      // this.itemsConsultation.push(item.consultation);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    getminDate() {
      let minDateStart = "";
      minDateStart = new Date().toISOString().substr(0, 10);
      return minDateStart;
    },
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
  components: {
    FormPdf,
  },
};
</script>
