<template>
  <v-dialog v-model="dialog.show" persistent max-width="1080px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form style="margin-top: 15px" @submit.prevent="save">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
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
                    v-model="form.surgery_date"
                    color="primary"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                    :rules="dateRule"
                    outlined
                    required
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.surgeryPatient.cols.surgery_date.title'
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
                  v-model="form.surgery_date"
                  color="primary"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-menu
                v-model="menu2"
                color="primary"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.surgery_hour_start"
                    @blur="$v.form.surgery_hour_start.$touch()"
                    @input="$v.form.surgery_hour_start.$touch()"
                    :error-messages="surgery_hour_startErrors"
                    color="primary"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                    outlined
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.surgeryPatient.cols.surgery_hour_start.title'
                      )
                    "
                    v-bind="attrs"
                    v-on="on"
                    dense
                    readonly
                    clearable
                  ></v-text-field>
                </template>
                <v-time-picker
                  :allowed-minutes="allowedStep"
                  v-model="form.surgery_hour_start"
                  color="primary"
                  @input="menu2 = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-menu
                v-model="menu3"
                color="primary"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.surgery_hour_end"
                    @blur="$v.form.surgery_hour_end.$touch()"
                    @input="$v.form.surgery_hour_end.$touch()"
                    :error-messages="surgery_hour_endErrors"
                    color="primary"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                    outlined
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.surgeryPatient.cols.surgery_hour_end.title'
                      )
                    "
                    v-bind="attrs"
                    v-on="on"
                    dense
                    readonly
                    clearable
                  ></v-text-field>
                </template>
                <v-time-picker
                  :allowed-minutes="allowedStep"
                  v-model="form.surgery_hour_end"
                  color="primary"
                  @input="menu3 = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-text-field
                v-model="form.patient_position"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.patient_position.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.surgeryPatient.cols.patient_position.title"
                    )
                  }}
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-select
                v-model="form.mode_anesthesia"
                outlined
                required
                color="primary"
                class="font-weight-bold"
                dense
                clearable
                prepend-inner-icon="mdi-account-group-outline"
                :items="optionMode.type_mode"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.mode_anesthesia.title'
                  )
                "
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.description"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.description.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.surgical_gestures"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.surgical_gestures.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.description_lesions_observed"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.description_lesions_observed.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.surgical_procedures_perfomed"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.surgical_procedures_perfomed.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.surgical_procedures_not_perfomed"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.surgical_procedures_not_perfomed.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.particular_diificulties_incidents"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.particular_diificulties_incidents.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.specifies_lesions_left"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.specifies_lesions_left.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea> </v-col
            ><v-col cols="12" sm="6" class="mb-0 py-0">
              <v-textarea
                v-model="form.anatomopathological_examination"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.anatomopathological_examination.title'
                  )
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-select
                v-model="form.blood_transfusion"
                outlined
                required
                color="primary"
                dense
                multiple
                class="font-weight-bold"
                clearable
                prepend-inner-icon="mdi-account-group-outline"
                :items="optionTransfusion.type_transfusion"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.blood_transfusion.title'
                  )
                "
              ></v-select> </v-col
            ><v-col cols="12" sm="6" class="mb-0 py-0">
              <v-select
                v-model="form.type_suture_threads"
                outlined
                required
                color="primary"
                class="font-weight-bold"
                dense
                clearable
                multiple
                prepend-inner-icon="mdi-account-group-outline"
                :items="optionThreads.type_threads"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.surgeryPatient.cols.type_suture_threads.title'
                  )
                "
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
    ></delete-item>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
// import DatePickerend from "../sugery_patient/date-picker-end.vue";
// import DatePickerstart from "../sugery_patient/date-picker-start.vue";
import DeleteItem from "@/components/Common/Delete";
// const FileSaver = require("file-saver");
// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          date: null,
          type_suture_threads: null,
          anatomopathological_examination: null,
          blood_transfusion: null,
          particular_diificulties_incidents: null,
          specifies_lesions_left: null,
          surgical_procedures_not_perfomed: null,
          surgical_procedures_perfomed: null,
          description_lesions_observed: null,
          mode_anesthesia: null,
          patient_position: null,
          surgery: null,
          surgery_hour_start: null,
          surgery_date: null,
          surgery_hour_end: null,
          decription: null,
          doctor: null,
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
    formDetails: {
      type: Object,
      default: function () {
        return {
          id: null,
          results: null,
          surgery: null,
        };
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu3: false,
    menu2: false,
    urlDoctor: "doctors",
    itemsDoctor: [],
    isLoadingDoctor: false,
    searchDoctor: null,
    urlItems: "details_surgeries",
    urlPatients: "patients",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    headers: [],
    items: [],
    meta: {},
    optionMode: {
      type_mode: [],
    },
    optionTransfusion: {
      type_transfusion: [],
    },
    optionThreads: {
      type_threads: [],
    },
    dateRule: [(v) => !!v || "Date est requise"],
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    pagination: {},
    selectedItem: false,
    loading: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    minDate: new Date().toISOString().substr(0, 10),
    supply: false,
    active: false,
    isInventory: false,
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.surgery.delete.success",
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
    isLoadingSurgery: false,
    searchSurgery: null,
    itemsSurgery: [],
    urlSurgery: "surgeries",
    urlItemsDetails: "details_surgeries",
  }),
  watch: {},
  created() {
    this.getOptionsMode();
    this.getOptionsTransfusion();
    this.getOptionsThreads();
  },
  validations() {
    let validators = {
      form: {
        surgery_hour_start: {
          required,
        },
        surgery_hour_end: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails + "/" + item.id;
      this.dialogDelete.show = true;
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
    getOptionsMode() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.mode_anesthesia, (type_mode) => {
        self.optionMode.type_mode.push({
          text: self.$vuetify.lang.t(type_mode.text),
          value: type_mode.value,
        });
      });
    },
    getOptionsTransfusion() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.blood_transfusion, (type_transfusion) => {
        self.optionTransfusion.type_transfusion.push({
          text: self.$vuetify.lang.t(type_transfusion.text),
          value: type_transfusion.value,
        });
      });
    },
    getOptionsThreads() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.threads, (type_threads) => {
        self.optionThreads.type_threads.push({
          text: self.$vuetify.lang.t(type_threads.text),
          value: type_threads.value,
        });
      });
    },
    getDataFormdetails() {
      let data = {
        surgery:
          this.formDetails.id === undefined
            ? this.formDetails.surgery
            : this.formDetails.surgery["id"],
        results: this.formDetails.results,
      };

      return data;
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails + "/" + this.form.id;
      } else {
        return this.urlItemsDetails;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
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
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            response.data;
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            // let blob = new Blob([response.data], { type: response.data.type });
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
            if (this.getMethod() === "PUT") {
              self.$emit("getItemsDetails");
            } else {
              self.$emit("getItemsDetails");
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
      this.items = [];
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

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        surgery: this.form.surgery,
        results: this.form.results,
        patient: this.form.patient,
        decription: this.form.decription,
        surgical_procedures_not_perfomed:
          this.form.surgical_procedures_not_perfomed,
        description_lesions_observed: this.form.description_lesions_observed,
        surgical_procedures_perfomed: this.form.surgical_procedures_perfomed,
        particular_diificulties_incidents:
          this.form.particular_diificulties_incidents,
        patsurgery_dateient: this.form.surgery_date,
        type_suture_threads: this.form.type_suture_threads,
        mode_anesthesia: this.form.mode_anesthesia,
        patient_position: this.form.patient_position,
        blood_transfusion: this.form.blood_transfusion,
        surgery_hour_start: this.form.surgery_hour_start,
        surgery_hour_end: this.form.surgery_hour_end,
        doctor: this.form.doctor,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.surgery_hour_end = item.surgery_hour_end;
      this.form.code = item.code;
      this.form.surgery_hour_start = item.surgery_hour_start;
      this.form.surgery_hour_end = item.surgery_hour_end;
      this.form.blood_transfusion = item.blood_transfusion;
      this.form.patient_position = item.patient_position;
      this.form.mode_anesthesia = item.mode_anesthesia;
      this.form.type_suture_threads = item.type_suture_threads;
      this.form.surgical_procedures_perfomed =
        item.surgical_procedures_perfomed;
      this.form.description_lesions_observed =
        item.description_lesions_observed;
      this.form.surgical_procedures_not_perfomed =
        item.surgical_procedures_not_perfomed;
      this.form.decription = item.decription;
      this.form.specifies_lesions_left = item.specifies_lesions_left;
      this.form.surgery_date = item.surgery_date;
      this.form.particular_diificulties_incidents =
        item.particular_diificulties_incidents;
      this.form.date = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient;
      this.itemsPatient.push(item.patient);
      this.form.surgery = item.surgery["id"];
      this.itemsSurgery.push(item.surgery);
    },
  },
  computed: {
    allowedStep() {
      return (m) => m % this.period_time === 0;
    },
    patient_positionErrors() {
      let errors = [];
      if (!this.$v.form.patient_position.$dirty) return errors;

      !this.$v.form.patient_position.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.surgeryPatient.cols.patient_position.required"
          )
        );
      return errors;
    },
    surgery_hour_endErrors() {
      let errors = [];
      if (!this.$v.form.surgery_hour_end.$dirty) return errors;

      !this.$v.form.surgery_hour_end.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.surgeryPatient.cols.surgery_hour_end.required"
          )
        );
      return errors;
    },
    surgery_hour_startErrors() {
      let errors = [];
      if (!this.$v.form.surgery_hour_start.$dirty) return errors;

      !this.$v.form.surgery_hour_start.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.surgeryPatient.cols.surgery_hour_start.required"
          )
        );
      return errors;
    },
  },
  components: {
    FormPdf,
    DeleteItem,
  },
};
</script>
