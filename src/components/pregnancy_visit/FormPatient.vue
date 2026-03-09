<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="780px"
    max-height="680px"
  >
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-card max-width="820px" class="ml-6">
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" color="primary">
              {{ $vuetify.lang.t("$vuetify.stepper.step1") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2" color="primary">
              {{ $vuetify.lang.t("$vuetify.stepper.step2") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3" color="primary">
              {{ $vuetify.lang.t("$vuetify.stepper.step3") }}
            </v-stepper-step>
          </v-stepper-header>
          <v-form @submit.prevent="save" style="margin-top: -30px">
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.code"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.code.title')
                          "
                          class="font-weight-bold"
                          filled
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" class="mb-0 py-0"> </v-col>

                      <v-col cols="12" sm="5" class="mb-0 py-0">
                        <v-select
                          v-model="form.gender"
                          color="primary"
                          :items="optionGender.type_Gender"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.gender.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.gender.title'
                            )
                          "
                          class="font-weight-bold"
                          @blur="$v.form.gender.$touch()"
                          @input="$v.form.gender.$touch()"
                          :error-messages="genderErrors"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.name"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.first_name.title'
                            )
                          "
                          @blur="$v.form.name.$touch()"
                          @input="$v.form.name.$touch()"
                          :error-messages="firstnameErrors"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-menu
                          v-model="menu3"
                          color="primary"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.dateNaiss"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.patient.cols.birthday.title'
                                )
                              "
                              class="font-weight-bold"
                              @blur="$v.form.dateNaiss.$touch()"
                              @input="$v.form.dateNaiss.$touch()"
                              :error-messages="dateNaissErrors"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateNaiss"
                            color="primary"
                            @input="menu3 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="2" class="mb-0 py-0">
                        <v-text-field
                          v-model="get_age"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.age.title')
                          "
                          class="font-weight-bold"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.phone"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.phone.title')
                          "
                          @blur="$v.form.phone.$touch()"
                          @input="$v.form.phone.$touch()"
                          :error-messages="phoneErrors"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="8" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.address"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.address.title'
                            )
                          "
                          class="font-weight-bold"
                          @blur="$v.form.address.$touch()"
                          @input="$v.form.address.$touch()"
                          :error-messages="addressErrors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.other_phone"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.other_phone.title'
                            )
                          "
                          @input="$v.form.other_phone.$touch()"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-select
                          v-model="form.shape"
                          color="primary"
                          :items="optionPatient_shape.type_Patient_shape"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.patient_shape.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.patient_shape.title'
                            )
                          "
                          class="font-weight-bold"
                          @blur="$v.form.shape.$touch()"
                          @input="$v.form.shape.$touch()"
                          :error-messages="patient_shapeErrors"
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        class="mb-0 py-0"
                        v-if="this.form.shape === 'COVERED'"
                      >
                        <v-text-field
                          v-model="form.insurance_name"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.insurance_name.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        class="mb-0 py-0"
                        v-if="this.form.shape === 'COVERED'"
                      >
                        <v-text-field
                          v-model="form.insurance_number"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.insurance_number.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions style="margin-bottom: -25px">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#49c5b6"
                    @click="goToNextPage2"
                    class="mb-5"
                    :disabled="
                      this.form.gender == null ||
                      this.form.name == null ||
                      this.form.dateNaiss == null ||
                      this.form.phone == null ||
                      this.form.address == null ||
                      this.form.shape == null
                    "
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card-text>
                  <v-container>
                    <v-row wrap
                      ><v-col cols="15" sm="4" class="mb-0 py-0">
                        <v-select
                          v-model="form.religion"
                          color="primary"
                          :items="optionReligion.type_Religion"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.religion.title'
                            )
                          "
                          @blur="$v.form.religion.$touch()"
                          @input="$v.form.religion.$touch()"
                          :error-messages="religionErrors"
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="8" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.email"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.email.title')
                          "
                          @input="$v.form.email.$touch()"
                          :error-messages="emailErrors"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-select
                          v-model="form.type_id"
                          color="primary"
                          :items="optionID.type_ID"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.type_id.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.number_id"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.number_id.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-menu
                          v-model="menu4"
                          color="primary"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.date_id"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.patient.cols.date_id.title'
                                )
                              "
                              class="font-weight-bold"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.date_id"
                            color="primary"
                            @input="menu4 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.maritalStatus"
                          color="primary"
                          :items="optionMaritalStatus.type_MaritalStatus"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.maritalStatus.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.child"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.child.title')
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.mother_name"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.mother_name.title'
                            )
                          "
                          class="font-weight-bold"
                          @blur="$v.form.mother_name.$touch()"
                          @input="$v.form.mother_name.$touch()"
                          :error-messages="mother_nameErrors"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.emergency_name"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.emergency_name.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.emergency_contact"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.emergency_contact.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions style="margin-bottom: -25px">
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo" style="margin-top: -20px">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn
                    color="#49c5b6"
                    @click="goToNextPage3"
                    class="mb-5"
                    dark
                    :disabled="
                      this.form.religion == null ||
                      this.form.mother_name == null
                    "
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.blood_group"
                          color="primary"
                          :items="optionBlood_group.type_Blood_group"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.blood_group.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.blood_group.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.weight"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.weight.title'
                            )
                          "
                          class="font-weight-bold"
                          suffix="Kg"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.electrophoresis"
                          color="primary"
                          :items="optionElectrophoresis.type_Electrophoresis"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.electrophoresis.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.electrophoresis.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-select> </v-col
                      ><v-col cols="12" sm="3" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.size"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.size.title')
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="3" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.bpm"
                          color="primary"
                          :label="
                            $vuetify.lang.t('$vuetify.patient.cols.bpm.title')
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.temperature"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.temperature.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.padiasto"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.padiasto.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="3" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.pasysto"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.pasysto.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.allergies"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.allergies.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.pathologies"
                          color="primary"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.patient.cols.pathologies.title'
                            )
                          "
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions style="margin-bottom: -5px">
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo2">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>
            </v-stepper-items>
          </v-form>
        </v-stepper>
      </v-card>
      <v-form class="mt-5">
        <v-card max-width="820px" class="ml-6">
          <v-card-text>
            <span class="text-h7 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.patient.title_user") }}
            </span>
            <v-container class="mt-3">
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.username.title')
                    "
                    @blur="$v.form.username.$touch()"
                    @input="$v.form.username.$touch()"
                    :error-messages="usernameErrors"
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.password.title')
                    "
                    @blur="$v.form.password.$touch()"
                    @input="$v.form.password.$touch()"
                    :error-messages="passwordErrors"
                    class="font-weight-bold"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.re_password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.re_password.title')
                    "
                    @blur="$v.form.re_password.$touch()"
                    @input="$v.form.re_password.$touch()"
                    :error-messages="rePasswordErrors"
                    class="font-weight-bold"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="form.is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.status.title2')
                    "
                  ></v-switch>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>

          <v-card-actions style="margin-bottom: -5px">
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="#49c5b6" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t("$vuetify.btn.save") }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card-text> </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import {
  phoneR,
  existPhone,
  existEmail,
  existNamePatient,
} from "../../helpers/Validator";
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
          padiasto: null,
          temperature: null,
          bpm: null,
          size: null,
          electrophoresis: null,
          weight: null,
          blood_group: null,
          allergies: null,
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
          date_id: null,
          child: null,
          dateNaiss: null,
          address: null,
          other_phone: null,
          phone: null,
          insurance_name: null,
          insurance_number: null,
          code: null,
          age: null,
          gender: null,
          shape: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    search: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
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
    urlItems: "patients",
  }),

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
          unique: existNamePatient,
          maxLength: maxLength(255),
        },
        email: {
          // required,
          email,
          unique: existEmail,
        },
        phone: {
          required,
          unique: existPhone,
          phoneR,
        },
        religion: {
          required,
        },
        mother_name: {
          required,
        },
        dateNaiss: {
          required,
        },
        gender: {
          required,
        },
        address: {
          required,
        },
        shape: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
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
        date_id: this.form.date_id,
        number_id: this.form.number_id,
        email: this.form.email,
        type_id: this.form.type_id,
        address: this.form.address,
        name: this.form.name,
        child: this.form.child,
        phone: this.form.phone,
        other_phone: this.form.other_phone,
        insurance_name: this.form.insurance_name,
        insurance_number: this.form.insurance_number,
        maritalStatus: this.form.maritalStatus,
        age: this.get_age,
        shape: this.form.shape,
        gender: this.form.gender,
        electrophoresis: this.form.electrophoresis,
        bpm: this.form.bpm,
        size: this.form.size,
        weight: this.form.weight,
        allergies: this.form.allergies,
        pasysto: this.form.pasysto,
        pathologies: this.form.pathologies,
        padiasto: this.form.padiasto,
        temperature: this.form.temperature,
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
      this.form.size = item.size;
      this.form.electrophoresis = item.electrophoresis;
      this.form.weight = item.weight;
      this.form.emergency_name = item.emergency_name;
      this.form.blood_group = item.blood_group;
      this.form.id = item.id;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.address = item.address;
      this.form.child = item.child;
      this.form.mother_name = item.mother_name;
      this.form.dateNaiss = item.dateNaiss;
      this.form.insurance_name = item.insurance_name;
      this.form.insurance_number = item.insurance_number;
      this.form.phone = item.phone;
      this.form["oldPhone"] = item.phone;
      this.form.other_phone = item.other_phone;
      this.form["oldPhone"] = item.other_phone;
      this.form.code = item.code;
      this.form["oldcode"] = item.code;
      this.form.gender = item.gender;
      this.form.age = item.age;
      this.form.shape = item.shape;
      this.form.is_active = item.is_active;
      this.form.maritalStatus = item.maritalStatus;
      this.form.religion = item.religion;
      this.form.type_id = item.type_id;
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

    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.first_name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.first_name.unique")
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

      !this.$v.form.email.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.patient.cols.email.unique"));
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
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.phone.invalid")
        );

      !this.$v.form.phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.patient.cols.phone.unique"));
      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.other_phone.invalid")
        );

      !this.$v.form.other_phone.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.other_phone.unique")
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
    genderErrors() {
      let errors = [];
      if (!this.$v.form.gender.$dirty) return errors;
      !this.$v.form.gender.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.gender.required")
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
  components: {},
};
</script>
