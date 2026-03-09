<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveEvents">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-autocomplete
                  outlined
                  dense
                  v-model="form.patient"
                  :items="itemsPatient"
                  :rules="patientRule"
                  required
                  :loading="isLoadingPatient"
                  :search-input.sync="searchPatient"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.appointment.cols.patient.title')
                  "
                  class="font-weight-bold"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-select
                  v-model="form.appointment_status"
                  outlined
                  color="primary"
                  required
                  :rules="stateConsultationRule"
                  dense
                  clearable
                  prepend-inner-icon="mdi-account-group-outline"
                  :items="optionStatus.type_status"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.appointment_surgery.cols.appointment_status.title'
                    )
                  "
                ></v-select>
              </v-col>
              <!-- <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-select
                  v-model="form.appointment_type"
                  outlined
                  color="primary"
                  dense
                  clearable
                  prepend-inner-icon="mdi-account-group-outline"
                  :items="optionAppointment.type_appointment"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.patient.cols.appointment_type.title'
                    )
                  "
                ></v-select>
              </v-col> -->
              <!--                <v-col cols="12" sm="6" class="mb-0 py-0">-->
              <!--                  <v-text-field-->
              <!--                    outlined-->
              <!--                    dense-->
              <!--                      v-model="form.department"-->
              <!--                    color="primary"-->
              <!--                    :label="-->
              <!--                      $vuetify.lang.t(-->
              <!--                        '$vuetify.appointment.cols.department.title'-->
              <!--                      )-->
              <!--                    "-->
              <!--                    prepend-inner-icon="mdi-card-text-outline mdi-dark mdi-18px"-->
              <!--                    class="font-weight-bold"-->
              <!--                  ></v-text-field>-->
              <!--                </v-col>-->
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-autocomplete
                  outlined
                  dense
                  v-model="form.doctor"
                  :items="itemsDoctor"
                  :loading="isLoadingDoctor"
                  :search-input.sync="searchDoctor"
                  color="primary"
                  item-text="name"
                  required
                  :rules="doctorRule"
                  item-value="id"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.appointment_surgery.cols.doctor.title'
                    )
                  "
                  class="font-weight-bold"
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-text-field
                  v-model="form.other_participants"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.appointment_surgery.cols.other_participants.title'
                    )
                  "
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  v-model="form.types_rooms"
                  :items="itemsTypes_rooms"
                  :loading="isLoadingTypes_rooms"
                  :search-input.sync="searchTypes_rooms"
                  @blur="$v.form.types_rooms.$touch()"
                  @input="$v.form.types_rooms.$touch()"
                  :error-messages="types_roomsErrors"
                  :label="$vuetify.lang.t('$vuetify.types_rooms.title')"
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
                    >{{ $vuetify.lang.t("$vuetify.types_rooms.title") }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.room"
                  :items="itemsRoom"
                  :loading="isLoadingRoom"
                  :search-input.sync="searchRoom"
                  @blur="$v.form.room.$touch()"
                  @input="$v.form.room.$touch()"
                  :error-messages="roomErrors"
                  color="primary"
                  return-object
                  item-text="name"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.room.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{ $vuetify.lang.t("$vuetify.room.title") }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
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
                      v-model="form.start_appointment_date"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      :rules="dateRule"
                      outlined
                      required
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment_surgery.cols.start_appointment_date.title'
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
                    v-model="form.start_appointment_date"
                    :min="maxDateStatMonth"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
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
                      v-model="form.appointment_hour"
                      @blur="$v.form.appointment_hour.$touch()"
                      @input="$v.form.appointment_hour.$touch()"
                      :error-messages="appointment_hourErrors"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment_surgery.cols.appointment_hour.title'
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
                    v-model="form.appointment_hour"
                    color="primary"
                    @input="menu2 = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>

              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <div class="block3">
                  <div class="ml-2" style="font-size: 15px">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.appointment.cols.start_appointment_date.title"
                      )
                    }}
                  </div>
                  <datetime
                    type="date"
                    v-model="formData.start_appointment_date"
                    :min-datetime="maxDate"
                    class="ml-2 font-weight-bold"
                    format="yyyy-MM-dd HH:mm:ss"
                  ></datetime>
                </div>
              </v-col> -->

              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  outlined
                  dense
                  v-model="form.problem"
                  @blur="$v.form.problem.$touch()"
                  @input="$v.form.problem.$touch()"
                  :error-messages="problemErrors"
                  :rows="2"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.appointment_surgery.cols.problem.title'
                    )
                  "
                  class="font-weight-bold"
                ></v-textarea> </v-col
              ><v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="canceled_appointment()"
            class="white--text"
            v-if="form.id !== null"
            color="red"
          >
            {{
              $vuetify.lang.t(
                "$vuetify.appointment.cols.cancel_appointment.title"
              )
            }} </v-btn
          ><v-btn @click="close">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import { existNameAct } from "../../helpers/Validator";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";
// import { Datetime } from "vue-datetime";
import { required } from "vuelidate/lib/validators";
import { existDateHour } from "../../helpers/Validator";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          problem: null,
          patient: null,
          other_participants: null,
          start_appointment_date: null,
          appointment_hour: null,
          end_appointment_date: null,
          types_rooms: null,
          room: null,
          patient_shape: null,
          appointment_status: null,
          color: null,
          doctor: null,
        };
      },
    },
  },
  data: () => ({
    patientRule: [(v) => !!v || "Patient est requis"],
    doctorRule: [(v) => !!v || "Doctor est requis"],
    stateDiseaseRule: [(v) => !!v || "Etat du malade requis"],
    stateConsultationRule: [(v) => !!v || "Status consultation est requis"],
    dateRule: [(v) => !!v || "Date est requise"],
    problemRule: [(v) => !!v || "Probleme est requis"],
    // patientRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.patient.required")],
    // doctorRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.doctor.required")],
    // stateDiseaseRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.patient_shape.required")],
    //stateConsultationRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.appointment_status.required")],
    // dateRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.appointment_status.required")],
    // problemRule: [v => !!v || this.$vuetify.lang.t("$vuetify.appointment.cols.problem.required")],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlRoom: "rooms",
    itemsRoom: [],
    isLoadingRoom: false,
    searchRoom: null,
    maxDate: new Date().toISOString().substr(0, 10),

    messagesDelete: {
      success: "$vuetify.appointment.cols.cancel_appointment.success",
    },
    dialogDelete: {
      show: false,
    },
    pickcolor: false,
    menu: false,
    menu2: false,
    maxDateStatMonth: new Date().toISOString().substr(0, 10),
    menu6: false,
    time_start: false,
    time_end: false,
    urlItems: "appointments",

    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionAppointment: {
      type_appointment: [],
    },
    optionStatus: {
      type_status: [],
    },
    urlPatients: "patients",
    urlItemsHospital: "hospitals",
    urlDoctors: "doctors",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchPatient: null,
    searchDoctor: null,
    searchDepart: null,
    period_time: null,
    start_day_work: null,
    end_day_work: null,
    itemsPatient: [],
    items: [],
    itemsDoctor: [],
    urlTypes_rooms: "types_rooms",
    isLoadingTypes_rooms: false,
    searchTypes_rooms: null,
    itemsTypes_rooms: [],
  }),

  watch: {
    searchTypes_rooms(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingTypes_rooms = true;
      this.$store
        .dispatch("request", {
          url: self.urlTypes_rooms,
          params: params,
        })
        .then((response) => {
          self.itemsTypes_rooms = response.data.content;
        })
        .finally(() => (this.isLoadingTypes_rooms = false));
    },
    searchRoom(value) {
      if (value === null) return;
      const params = {
        name: value,
      };
      let self = this;
      this.isLoadingRoom = true;
      this.$store
        .dispatch("request", {
          url: self.urlRoom + "?type_room=" + this.form.types_rooms,
          params: params,
        })
        .then((response) => {
          self.itemsRoom = response.data.content;
        })
        .finally(() => (this.isLoadingRoom = false));
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
    // this.getOptionsAppointment();
    this.getOptionsStatus();
  },
  validations() {
    let validators = {
      form: {
        problem: {
          required,
        },
        // patient: {
        //   required
        // },
        // appointment_status: {
        //   required
        // },
        // // start_appointment_date: {
        // //   required
        // // },
        room: {
          required,
        },
        types_rooms: {
          required,
        },
        appointment_hour: {
          unique: existDateHour,
        },
      },
    };
    return validators;
  },
  mounted() {
    this.getOpenCash();
  },
  methods: {
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.period_time = data.content[0].consultation_time;
            self.start_day_work = data.content[0].start_day_work;
            self.end_day_work = data.content[0].end_day_work;
            // console.log("meta", data);
            resolve(response);
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
    // getOptionsAppointment() {
    //   // On pouvait aussi utliser le forEach au lieu de   _.eaach
    //   let self = this;
    //   this._.each(this.$store.getters.appointment_type, type_appointment => {
    //     self.optionAppointment.type_appointment.push({
    //       text: self.$vuetify.lang.t(type_appointment.text),
    //       value: type_appointment.value
    //     });
    //   });
    // },
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
    close() {
      this.dialog.show = false;
      this.form.color = null;
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        problem: this.form.problem,
        patient: this.form.patient,
        patient_shape: this.form.patient_shape,
        appointment_status: this.form.appointment_status,
        other_participants: this.form.other_participants,
        types_rooms: this.form.types_rooms,
        start_appointment_date: this.form.start_appointment_date,
        type_planning: "SURGICAL_INTERVENTIONS",
        room: this.form.room,
        doctor: this.form.doctor,
        start_appointment_hour: this.form.appointment_hour,
        end_appointment_date: this.form.start_appointment_date,
      };
      return data;
    },
    getDataFormCanceled() {
      let data = {
        problem: this.form.problem,
        patient: this.form.patient,
        other_participants: this.form.other_participants,
        patient_shape: this.form.patient_shape,
        start_appointment_date: this.form.start_appointment_date,
        appointment_status: "CANCELED",
        type_planning: "SURGICAL_INTERVENTIONS",
        room: this.form.room,
        doctor: this.form.doctor,
        color: this.getColor,
        start_appointment_hour: this.form.appointment_hour,
        end_appointment_date: this.form.start_appointment_date,
      };
      return data;
    },
    setForm(item) {
      console.log(item);
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.problem = item.problem;
      this.form.color = item.color;
      this.form.type_planning = item.type_planning;
      this.form.patient_shape = item.patient_shape;
      this.form.other_participants = item.other_participants;
      this.form.appointment_status = item.appointment_status;
      // this.form.appointment_type = item.appointment_type;
      this.form.start_appointment_date = item.start_appointment_date;
      this.form.appointment_hour = item.start_appointment_hour;
      this.form["oldHour"] = item.start_appointment_hour;
      this.form.end_appointment_date = item.end_appointment_date;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.room = item.room["id"];
      this.itemsRoom.push(item.room);
    },
  },
  computed: {
    allowedStep() {
      return (m) => m % this.period_time === 0;
    },
    patientErrors() {
      let errors = [];
      if (!this.$v.form.patient.$dirty) return errors;
      !this.$v.form.patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.appointment.cols.patient.required")
        );
      return errors;
    },
    problemErrors() {
      let errors = [];
      if (!this.$v.form.problem.$dirty) return errors;
      !this.$v.form.problem.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment_surgery.cols.problem.required"
          )
        );
      return errors;
    },
    appointment_statusErrors() {
      let errors = [];
      if (!this.$v.form.appointment_status.$dirty) return errors;
      !this.$v.form.appointment_status.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment_surgical.cols.appointment_status.required"
          )
        );
      return errors;
    },
    doctorErrors() {
      let errors = [];
      if (!this.$v.form.doctor.$dirty) return errors;
      !this.$v.form.doctor.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.appointment.cols.doctor.required")
        );
      return errors;
    },
    patient_shapeErrors() {
      let errors = [];
      if (!this.$v.form.patient_shape.$dirty) return errors;
      !this.$v.form.doctor.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment.cols.patient_shape.required"
          )
        );
      return errors;
    },
    // start_appointment_dateErrors() {
    //   let errors = [];
    //   if (!this.$v.form.start_appointment_date.$dirty) return errors;
    //   !this.$v.form.start_appointment_date.required &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.appointment.cols.start_appointment_date.required")
    //     );
    //   return errors;
    // },
    appointment_hourErrors() {
      let errors = [];
      if (!this.$v.form.appointment_hour.$dirty) return errors;

      // !this.$v.form.appointment_hour.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.appointment.cols.appointment_hour.required")
      //   );

      !this.$v.form.appointment_hour.unique &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment.cols.appointment_hour.unique"
          )
        );
      return errors;
    },
    types_roomsErrors() {
      let errors = [];
      if (!this.$v.form.types_rooms.$dirty) return errors;

      !this.$v.form.types_rooms.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment_surgery.cols.types_rooms.required"
          )
        );

      return errors;
    },
    roomErrors() {
      let errors = [];
      if (!this.$v.form.room.$dirty) return errors;

      !this.$v.form.room.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.appointment_surgery.cols.rooms.required"
          )
        );

      return errors;
    },
    getColor() {
      if (this.form.id === null || this.form.id === undefined) {
        let color_code = "";
        if (this.form.color === null) {
          color_code = this.form.color === null ? "" : this.form.color?.hex;
          return color_code;
        } else {
          if (typeof this.form.color === "object") {
            return this.form.color.hex;
          } else {
            return this.form.color;
          }
        }
      } else {
        return this.form.color;
      }
    },
    // Gestion des erreurs du formulaire
  },
  components: {},
};
</script>
<style scoped>
.block3 {
  width: 100%;
  height: 60%;
  border: 1px solid;
  border-color: #9e9e9e;
  margin-right: -2px;
  border-radius: 3px;
  font-size: 15px;
  margin: 0;
  padding: 0;
}
.block2 {
  width: 100%;
  height: 30%;
  border: 1px solid;
  border-color: white;
  border-radius: 5px;
  font-size: 15px;
  margin: 0;
  padding: 0;
}
</style>
