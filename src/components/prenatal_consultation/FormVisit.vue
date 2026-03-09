<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-toolbar dark color="#ECEFF1" dense max-width="820px" class="ml-6">
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-row>
                <v-col cols="2" class="mt-3">
                  <v-subheader class="font-weight-bold">{{
                    $vuetify.lang.t("$vuetify.prescription.cols.patient.title")
                  }}</v-subheader>
                </v-col>
                <v-col cols="10">
                  <v-card-text>
                    <v-autocomplete
                      dense
                      v-model="form.patient"
                      :items="itemsPatient"
                      :loading="isLoadingPatient"
                      :search-input.sync="searchPatient"
                      color="primary"
                      item-text="name"
                      item-value="id"
                      hide-no-data
                      class="font-weight-bold"
                      clearable
                      autofocus
                    ></v-autocomplete>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" v-if="this.form.id">
              <v-row>
                <v-col cols="4" class="mt-3">
                  <v-subheader class="font-weight-bold">{{
                    $vuetify.lang.t(
                      "$vuetify.consultation.cols.createdAt.title"
                    )
                  }}</v-subheader>
                </v-col>
                <v-col cols="8">
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
                        v-model="form.createdAt"
                        color="primary"
                        class="font-weight-bold"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.createdAt"
                      :max="maxDate"
                      color="primary"
                      @input="menu3 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-row>
                <v-col cols="5" class="mt-3">
                  <v-subheader class="font-weight-bold">{{
                    $vuetify.lang.t("$vuetify.consultation.cols.visit.title")
                  }}</v-subheader>
                </v-col>
                <v-col cols="7" class="mt-3">
                  <v-select
                    dense
                    v-model="form.type_visit"
                    color="primary"
                    :items="optionVisit.typeVisit"
                    clearable
                    autofocus
                    class="font-weight-bold"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-row>
                <v-col cols="2" class="mt-3">
                  <v-subheader class="font-weight-bold">{{
                    $vuetify.lang.t("$vuetify.prescription.cols.doctor.title")
                  }}</v-subheader>
                </v-col>
                <v-col cols="10">
                  <v-card-text>
                    <v-autocomplete
                      dense
                      v-model="form.doctor"
                      :items="itemsDoctor"
                      :loading="isLoadingDoctor"
                      :search-input.sync="searchDoctor"
                      color="primary"
                      item-text="name"
                      hide-no-data
                      item-value="id"
                      class="font-weight-bold"
                      clearable
                    ></v-autocomplete>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.pregnancy_visit.cols.param.title") }}
          </div>
          <div class="align-center mt-4">
            <v-row>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.gestationnal_age.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.gestationnal_age"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.weight.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.weight"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.blood_pressure.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.blood_pressure"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.abdominal_contour.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.abdominal_contour"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.uterine_height.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.uterine_height"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.heart_rate.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.heart_rate"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="3" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.examination.cols.conjunctivae.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="6" class="mt-1">
                        <v-select
                          dense
                          v-model="form.conjunctivae"
                          color="primary"
                          :items="optionConjunctivae.typeConjunctivae"
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="5" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.fetal_movement.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="4" class="mt-1">
                        <v-select
                          dense
                          v-model="form.fetal_movement"
                          color="primary"
                          :items="optionFetal.typeFetal"
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.position.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="6" class="mt-1">
                        <v-select
                          dense
                          v-model="form.position"
                          color="primary"
                          :items="optionPosition.typePosition"
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.presentation.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="4" class="mt-1">
                        <v-select
                          dense
                          v-model="form.presentation"
                          color="primary"
                          :items="optionPresentation.typePresentation"
                          class="font-weight-bold"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.edema.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.edema"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-container>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.pregnancy_visit.cols.complaints.title'
                          )
                        "
                        v-model="form.complaints"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>
                    </v-col>
                  </v-container>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.pregnancy_visit.cols.examen.title") }}
          </div>
          <div class="align-center mt-4">
            <v-row>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.syphilis_test.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.syphilis_test"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.hemoglobin.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.hemoglobin"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.HIV_test.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.HIV_test"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.urine_analysis.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.urine_analysis"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.rapid_malaria_test.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.rapid_malaria_test"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.pregnancy_test.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.pregnancy_test"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-container>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.pregnancy_visit.cols.other_test.title'
                          )
                        "
                        v-model="form.other_test"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>
                    </v-col>
                  </v-container>
                </v-row>
              </v-col>
              <br />
            </v-row>
          </div>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t("$vuetify.pregnancy_visit.cols.treatments.title")
            }}
          </div>
          <div class="align-center mt-4">
            <v-row>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="12" sm="12" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="8">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.iron_salts_folic_acid.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.iron_salts_folic_acid"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <!--                  <v-col cols="12" sm="6" class="mb-0 py-0">-->
                  <!--                    <v-row>-->
                  <!--                      <v-col cols="8">-->
                  <!--                        <v-subheader class="font-weight-bold">{{-->
                  <!--                          $vuetify.lang.t(-->
                  <!--                            "$vuetify.pregnancy_visit.cols.albendazole.title"-->
                  <!--                          )-->
                  <!--                        }}</v-subheader>-->
                  <!--                      </v-col>-->
                  <!--                      <v-col cols="3" class="mt-1">-->
                  <!--                        <v-text-field-->
                  <!--                          dense-->
                  <!--                          v-model="form.albendazole"-->
                  <!--                          color="primary"-->
                  <!--                          class="font-weight-bold"-->
                  <!--                        ></v-text-field>-->
                  <!--                      </v-col>-->
                  <!--                    </v-row>-->
                  <!--                  </v-col>-->
                  <v-card-text>
                    <v-container>
                      <v-row wrap>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.prevent_treat_malaria.title'
                              )
                            "
                            v-model="form.prevent_treat_malaria"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.cur_treat_malaria.title'
                              )
                            "
                            v-model="form.cur_treat_malaria"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.treat_urinary_infect.title'
                              )
                            "
                            v-model="form.treat_urinary_infect"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.syphilis_treat.title'
                              )
                            "
                            v-model="form.syphilis_treat"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.treatment_O_IST.title'
                              )
                            "
                            v-model="form.treatment_O_IST"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            dense
                            :rows="2"
                            outlined
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.pregnancy_visit.cols.other_treatment.title'
                              )
                            "
                            v-model="form.other_treatment"
                            color="primary"
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
        <br />
        <v-card max-width="820px" class="ml-6">
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <div class="block3">
                    <v-row>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.pregnancy_visit.cols.next_meeting.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="3" style="margin-top: 15px">
                        <datetime
                          type="datetime"
                          v-model="form.appointment_date"
                          :min-datetime="maxDate"
                          class="ml-2 font-weight-bold"
                          format="yyyy-MM-dd HH:mm:ss"
                          auto
                        ></datetime>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0"> </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card-text></v-card-text>
      </v-form>
    </v-card>
    <!--    <form-patient :dialog="dialogForm"></form-patient>-->
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
// import FormPatient from "./FormPatient";
import { Datetime } from "vue-datetime";
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
          createdAt: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          gestationnal_age: null,
          other: null,
          presentation: null,
          position: null,
          fetal_movement: null,
          other_pre_childbirth: null,
          other_pre_pregnancy: null,
          abdominal_contour: null,
          hypertension_history: null,
          diabetes: null,
          tuberculosis: null,
          sexually_transmitted_infection: null,
          hiv_infection: null,
          appointment_date: null,
          abdominal_surgery: null,
          weight: null,
          uterine_height: null,
          heart_rate: null,
          laboratory_tests: null,
          edema: null,
          syphilis_test: null,
          hemoglobin: null,
          HIV_test: null,
          urine_analysis: null,
          rapid_malaria_test: null,
          pregnancy_test: null,
          other_test: null,
          live_newborn: null,
          stillborn_child: null,
          infant_death: null,
          abortion: null,
          live_newborn_number: null,
          stillborn_child_number: null,
          infant_death_number: null,
          abortion_number: null,
          descriptionBs: null,
          descriptionFamily: null,
          blood_pressure: null,
          prolonged_work: null,
          bad_presentation: null,
          cesarean: null,
          instrumental_extraction: null,
          placenta: null,
          episiotomy: null,
          postpartum_hemorrahage: null,
          puerperal_infection: null,
          fistula: null,
          vat: null,
          exam_observations: null,
          descriptionAllergy: null,
          reason: null,
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

    optionJaundice: {
      typeJaundice: [],
    },
    optionFetal: {
      typeFetal: [],
    },
    optionPosition: {
      typePosition: [],
    },
    optionPresentation: {
      typePresentation: [],
    },
    optionVisit: {
      typeVisit: [],
    },
    optionConjunctivae: {
      typeConjunctivae: [],
    },
    vat: [],
    optionsVat: {
      text: { dateCurrent: "", dateNext: "" },
    },
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    urlItems: "consultations",
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
    this.getOptionsJaundice();
    this.getOptionsFetal();
    this.getOptionsPosition();
    this.getOptionsPresentation();
    this.getOptionsVisit();
    this.getOptionsConjunctivae();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    addColumn() {
      this.vat.push({ ...this.optionsVat.text });
    },
    removeColumn(index) {
      this.vat.splice(index, 1);
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
      this.form.vat = [];
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
    getOptionsJaundice() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.jaundice, (typeJaundice) => {
        self.optionJaundice.typeJaundice.push({
          text: self.$vuetify.lang.t(typeJaundice.text),
          value: typeJaundice.value,
        });
      });
    },
    getOptionsPosition() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.position, (typePosition) => {
        self.optionPosition.typePosition.push({
          text: self.$vuetify.lang.t(typePosition.text),
          value: typePosition.value,
        });
      });
    },
    getOptionsPresentation() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.presentation, (typePresentation) => {
        self.optionPresentation.typePresentation.push({
          text: self.$vuetify.lang.t(typePresentation.text),
          value: typePresentation.value,
        });
      });
    },
    getOptionsFetal() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.fetal, (typeFetal) => {
        self.optionFetal.typeFetal.push({
          text: self.$vuetify.lang.t(typeFetal.text),
          value: typeFetal.value,
        });
      });
    },
    getOptionsConjunctivae() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.conjunctivae, (typeConjunctivae) => {
        self.optionConjunctivae.typeConjunctivae.push({
          text: self.$vuetify.lang.t(typeConjunctivae.text),
          value: typeConjunctivae.value,
        });
      });
    },

    getOptionsVisit() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.visit, (typeVisit) => {
        self.optionVisit.typeVisit.push({
          text: self.$vuetify.lang.t(typeVisit.text),
          value: typeVisit.value,
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
        patient: this.form.patient,
        doctor: this.form.doctor,
        position: this.position,
        fetal_movement: this.fetal_movement,
        presentation: this.presentation,
        other_pre_childbirth: this.form.other_pre_childbirth,
        other_pre_pregnancy: this.form.other_pre_pregnancy,
        hypertension_history: this.form.hypertension_history,
        abdominal_contour: this.form.abdominal_contour,
        diabetes: this.form.diabetes,
        tuberculosis: this.form.tuberculosis,
        appointment_date: this.form.appointment_date,
        sexually_transmitted_infection:
          this.form.sexually_transmitted_infection,
        hiv_infection: this.form.hiv_infection,
        abdominal_surgery: this.form.abdominal_surgery,
        gestationnal_age: this.form.gestationnal_age,
        blood_pressure: this.form.blood_pressure,
        weight: this.weight,
        live_newborn: this.form.live_newborn,
        stillborn_child: this.form.stillborn_child,
        infant_death: this.form.infant_death,
        abortion: this.form.abortion,
        live_newborn_number: this.form.live_newborn_number,
        stillborn_child_number: this.form.stillborn_child_number,
        infant_death_number: this.form.infant_death_number,
        abortion_number: this.form.abortion_number,
        prolonged_work: this.form.prolonged_work,
        bad_presentation: this.form.bad_presentation,
        cesarean: this.form.cesarean,
        instrumental_extraction: this.form.instrumental_extraction,
        placenta: this.form.placenta,
        episiotomy: this.form.episiotomy,
        postpartum_hemorrahage: this.form.postpartum_hemorrahage,
        puerperal_infection: this.form.puerperal_infection,
        fistula: this.form.fistula,
        other: this.form.other,
        exam_observations: this.form.exam_observations,
        reason: this.form.reason,
        uterine_height: this.form.uterine_height,
        heart_rate: this.form.heart_rate,
        laboratory_tests: this.form.laboratory_tests,
        edema: this.form.edema,
        syphilis_test: this.form.syphilis_test,
        hemoglobin: this.form.hemoglobin,
        HIV_test: this.form.HIV_test,
        urine_analysis: this.form.urine_analysis,
        rapid_malaria_test: this.form.rapid_malaria_test,
        pregnancy_test: this.form.pregnancy_test,
        other_test: this.form.other_test,
      };
      return data;
    },
    setForm(item) {
      (this.form.gestationnal_age = item.gestationnal_age),
        (this.form.weight = item.weight),
        (this.form.blood_pressure = item.blood_pressure),
        (this.form.presentation = item.presentation),
        (this.form.fetal_movement = item.fetal_movement),
        (this.form.position = item.position),
        (this.form.abortion = item.abortion),
        (this.form.uterine_height = item.uterine_height),
        (this.form.appointment_date = item.appointment_date),
        (this.form.heart_rate = item.heart_rate),
        (this.form.laboratory_tests = item.laboratory_tests),
        (this.form.edema = item.edema),
        (this.form.abdominal_contour = item.abdominal_contour),
        (this.form.syphilis_test = item.syphilis_test),
        (this.form.hemoglobin = item.hemoglobin),
        (this.form.HIV_test = item.HIV_test),
        (this.form.urine_analysis = item.urine_analysis),
        (this.form.rapid_malaria_test = item.rapid_malaria_test),
        (this.form.pregnancy_test = item.pregnancy_test),
        (this.form.other_test = item.other_test),
        (this.form.live_newborn_number = item.live_newborn_number),
        (this.form.stillborn_child_number = item.stillborn_child_number),
        (this.form.infant_death_number = item.infant_death_number),
        (this.form.abortion_number = item.abortion_number),
        (this.form.prolonged_work = item.prolonged_work),
        (this.form.bad_presentation = item.bad_presentation),
        (this.form.cesarean = item.cesarean),
        (this.form.instrumental_extraction = item.instrumental_extraction),
        (this.form.placenta = item.placenta),
        (this.form.episiotomy = item.episiotomy),
        (this.form.postpartum_hemorrahage = item.postpartum_hemorrahage),
        (this.form.puerperal_infection = item.puerperal_infection),
        (this.form.fistula = item.fistula),
        (this.form.other = item.other);
      this.form.other_pre_childbirth = item.other_pre_childbirth;
      this.form.other_pre_pregnancy = item.other_pre_pregnancy;
      this.form.hypertension_history = item.hypertension_history;
      this.form.diabetes = item.diabetes;
      this.form.tuberculosis = item.tuberculosis;
      this.form.sexually_transmitted_infection =
        item.sexually_transmitted_infection;
      this.form.hiv_infection = item.hiv_infection;
      this.form.abdominal_surgery = item.abdominal_surgery;
      this.form.exam_observations = item.exam_observations;
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
  },
  components: { Datetime },
};
</script>
<style scoped>
.block3 {
  width: 100%;
  height: 60%;
  border: 1px solid;
  border-color: red;
  margin-right: -2px;
  border-radius: 3px;
  font-size: 15px;
  margin: 0;
  padding: 0;
}
</style>
