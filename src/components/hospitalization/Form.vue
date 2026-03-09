<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
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
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-autocomplete
                dense
                v-model="form.patient"
                :items="itemsPatient"
                :loading="isLoadingPatient"
                :search-input.sync="searchPatient"
                @blur="$v.form.patient.$touch()"
                @input="$v.form.patient.$touch()"
                :error-messages="patientErrors"
                return-object
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
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.ordinance.cols.patient.title")
                  }}
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-select
                v-model="form.type_accommodation"
                color="primary"
                :items="optionType.type_accommodation"
                @blur="$v.form.type_accommodation.$touch()"
                @input="$v.form.type_accommodation.$touch()"
                :error-messages="type_accommodationErrors"
                clearable
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
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-select
                v-model="form.status_occupation"
                color="primary"
                :items="optionStatus.status_occupation"
                @blur="$v.form.status_occupation.$touch()"
                @input="$v.form.status_occupation.$touch()"
                :error-messages="status_occupationErrors"
                clearable
                :label="
                  $vuetify.lang.t(
                    '$vuetify.hospitalization.cols.status_occupation.title'
                  )
                "
                :placeholder="
                  $vuetify.lang.t(
                    '$vuetify.hospitalization.cols.status_occupation.title'
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
                      "$vuetify.hospitalization.cols.status_occupation.title"
                    )
                  }}
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
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
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-select
                v-model="form.bed"
                color="primary"
                :items="optionNumberBed.number_bed"
                clearable
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
                @change="this.get_price_hospitalization()"
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-textarea
                v-model="form.raison"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.hospitalization.cols.reason.title')
                "
                @blur="$v.form.raison.$touch()"
                @input="$v.form.raison.$touch()"
                :error-messages="raisonErrors"
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                :rows="2"
                dense
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.hospitalization.cols.reason.title"
                    )
                  }}
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-menu
                v-model="menu4"
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
                        '$vuetify.hospitalization.cols.start_date.title'
                      )
                    "
                    v-bind="attrs"
                    v-on="on"
                    dense
                    readonly
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.hospitalization.cols.start_date.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="form.start_date"
                  :min="maxDate"
                  color="primary"
                  @input="menu4 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.days_number"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.hospitalization.cols.days_number.title'
                  )
                "
                class="font-weight-bold"
                outlined
                readonly
                dense
                type="number"
                min="0"
                :rules="[numberRuleAdvances]"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.hospitalization.cols.days_number.title"
                    )
                  }}
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-menu
                v-model="menu5"
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
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.appointment.cols.end_appointment_date.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="form.end_date"
                  :min="this.form.start_date"
                  color="primary"
                  @input="menu5 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.hospitalization.cols.price_day.title'
                  )
                "
                class="font-weight-bold"
                outlined
                :value="get_price_hospitalization"
                readonly
                filled
                dense
              ></v-text-field>
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
          <v-btn @click="forceRefresh() + resetDataForm()">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" dark type="submit">
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
import { required } from "vuelidate/lib/validators";
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
          date: null,
          days_number: null,
          status_occupation: null,
          type_accommodation: null,
          room: null,
          raison: null,
          start_date: null,
          payment_method: null,
          bank_card_number: null,
          phone_number: null,
          advances: null,
          end_date: null,
          bed: null,
          price_day: null,
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
    optionNumberBed: {
      number_bed: [],
    },
    menu5: false,
    optionPayment: {
      type_Payment: [],
    },
    formDetails: {
      type: Object,
      default: function () {
        return {
          id: null,
          results: null,
          laboratory: null,
        };
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu3: false,
    urlRoom: "rooms",
    itemsRoom: [],
    isLoadingRoom: false,
    searchRoom: null,
    urlItems: "hospitalizations",
    urlItemsHospitals: "hospitals",
    urlPatients: "patients",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    urlbed: "beds",
    isLoadingBed: false,
    searchBed: null,
    itemsBed: [],
    items: [],
    optionType: {
      type_accommodation: [],
    },
    optionStatus: {
      status_occupation: [],
    },
    dialogDelete: {
      show: false,
    },
    dialog: {
      show: false,
    },
    minDate: new Date().toISOString().substr(0, 10),
    loading: false,
    menu2: false,
    supply: false,
    active: false,
    menu4: false,
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
      success: "$vuetify.laboratory.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    urlItemsDetails: "details_laboratories",
  }),
  watch: {
    searchBed(value) {
      if (value === null) return;
      const params = {
        name: value,
        room: this.form.room,
        status: "NOT_OCCUPIED",
      };
      let self = this;
      this.isLoadingBed = true;
      this.$store
        .dispatch("request", {
          url: self.urlbed,
          params: params,
        })
        .then((response) => {
          self.itemsBed = response.data.content;
        })
        .finally(() => (this.isLoadingBed = false));
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
          url: self.urlRoom,
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
  },
  created() {
    this.getOptionsStatus();
    this.getOptionsType();
    this.getOptionsPayment();
    this.getOptionsNumberBed();
  },
  validations() {
    let validators = {
      form: {
        raison: {
          required,
        },
        patient: {
          required,
        },
        type_accommodation: {
          required,
        },
        status_occupation: {
          required,
        },
        room: {
          required,
        },
      },
    };
    return validators;
  },
  mounted() {
    this.getItems();
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
            this.getItems();
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
    getItems() {
      let self = this;
      return new Promise((resolve, reject) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospitals,
          })
          .then((response) => {
            let data = response.data;
            if (data.content !== []) {
              self.items = data.content;
              this.form.price_hospitalization =
                this.items[0].price_hospitalization;
            }
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
            resolve();
          });
      });
    },
    getOptionsPayment() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.payment, (type_Payment) => {
        self.optionPayment.type_Payment.push({
          text: self.$vuetify.lang.t(type_Payment.text),
          value: type_Payment.value,
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
    getOptionsStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.status_occupation,
        (status_occupation) => {
          self.optionStatus.status_occupation.push({
            text: self.$vuetify.lang.t(status_occupation.text),
            value: status_occupation.value,
          });
        }
      );
    },

    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails + "/" + item.id;
      this.dialogDelete.show = true;
    },
    forceRefresh() {
      this.dialog.show = false;
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
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient: this.form.patient["id"],
        room: this.form.room["id"],
        bed: this.form.bed,
        days_number: this.form.days_number,
        price_day: this.get_price_hospitalization,
        raison: this.form.raison,
        bank_card_number: this.form.bank_card_number,
        phone_number: this.form.phone_number,
        payment_method:
          this.form.advances === 0 ? "NO_PAY" : this.form.payment_method,
        net_payable: this.get_price_hospitalization,
        advances: this.form.advances === null ? 0 : this.form.advances,
        balance: this.get_balance,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        status_occupation: this.form.status_occupation,
        type_accommodation: this.form.type_accommodation,
      };
      return data;
    },
    getItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails + "?laboratory_patient=" + this.form.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    setForm(item) {
      (this.medication = item.medication),
        // Données envoyées lors de la modification
        (this.form.id = item.id);
      this.form.code = item.code;
      this.form.raison = item.raison;
      this.form.price_day = item.price_day;
      this.form.days_number = item.days_number;
      this.form.status_occupation = item.status_occupation;
      this.form.start_date = item.start_date;
      this.form.phone_number = item.phone_number;
      this.form.advances = item.advances;
      this.form.bank_card_number = item.bank_card_number;
      this.form.end_date = item.end_date;
      this.form.payment_method = item.payment_method;
      this.form.type_accommodation = item.type_accommodation;
      this.form.date = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);

      this.form.room = item.room["id"];
      this.itemsRoom.push(item.room);
      this.form.bed = item.bed;
    },
  },
  computed: {
    get_patient_shape() {
      let patient_shape = "";

      patient_shape =
        this.form.patient === null ? "" : this.form.patient?.type_patient.title;
      return patient_shape;
    },
    futureDate() {
      const futureDate = new Date(this.form.start_date);
      futureDate.setDate(futureDate.getDate() + this.form.days_number);
      return futureDate;
    },
    get_price_hospitalization() {
      let price_patient = 0;

      // Safely check if room exists and has prices
      const roomPrices = this.form?.room?.prices;
      if (!roomPrices) {
        return 0; // Return early if data structure is invalid
      }

      // Find the matching price entry
      const price = roomPrices.find(
        (el) =>
          el.type_patient === this.get_patient_shape &&
          el.type_accommodation === this.form.type_accommodation &&
          el.other_code === this.get_product_code &&
          el.number_bed === this.form.bed
      );
      // Handle both undefined and valid cases
      price_patient = price?.price ?? 0;

      return price_patient;
    },
    get_product_code() {
      let code = "";
      code = this.form.room === null ? "" : this.form.room?.code;
      return code;
    },
    get_balance() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.advances === undefined) {
        return this.get_price_hospitalization;
      } else {
        let balance = "";
        balance = this.get_price_hospitalization - this.form.advances;
        return balance;
      }
    },
    raisonErrors() {
      let errors = [];
      if (!this.$v.form.raison.$dirty) return errors;
      !this.$v.form.raison.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitalization.cols.raison.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    roomErrors() {
      let errors = [];
      if (!this.$v.form.room.$dirty) return errors;
      !this.$v.form.room.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitalization.cols.room.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    status_occupationErrors() {
      let errors = [];
      if (!this.$v.form.status_occupation.$dirty) return errors;
      !this.$v.form.status_occupation.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitalization.cols.status_occupation.required"
          )
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    type_occupationErrors() {
      let errors = [];
      if (!this.$v.form.type_occupation.$dirty) return errors;
      !this.$v.form.type_occupation.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitalization.cols.type_occupation.required"
          )
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    patientErrors() {
      let errors = [];
      if (!this.$v.form.patient.$dirty) return errors;
      !this.$v.form.patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitalization.cols.patient.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    type_accommodationErrors() {
      let errors = [];
      if (!this.$v.form.type_accommodation.$dirty) return errors;
      !this.$v.form.type_accommodation.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitalization.cols.type_accommodation.required"
          )
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
  },
  components: {
    FormPdf,
  },
};
</script>
