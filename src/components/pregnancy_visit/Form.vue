<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
    <v-card style="background-color: #eceff1">
      <v-toolbar dark color="#ECEFF1" dense max-width="920px" class="ml-6">
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
        <v-card max-width="920px" class="ml-6">
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
                      @blur="$v.form.patient.$touch()"
                      @input="$v.form.patient.$touch()"
                      :error-messages="patientErrors"
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
                    @blur="$v.form.type_visit.$touch()"
                    @input="$v.form.type_visit.$touch()"
                    :error-messages="type_visitErrors"
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
                      @blur="$v.form.doctor.$touch()"
                      @input="$v.form.doctor.$touch()"
                      :error-messages="doctorErrors"
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
            <v-container>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-autocomplete
                  dense
                  v-model="form.consultation"
                  :items="itemsConsultation"
                  :loading="isLoadingConsultation"
                  :search-input.sync="searchConsultation"
                  color="primary"
                  item-text="code"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.ordinance.cols.consultation.title'
                    )
                  "
                  hide-no-data
                  item-value="id"
                  class="font-weight-bold"
                  clearable
                  prepend-inner-icon="mdi-code-array"
                  outlined
                ></v-autocomplete>
              </v-col>
            </v-container>
          </v-row>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-5">
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
        <v-card max-width="920px" class="ml-6 mt-5">
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
        <v-card max-width="920px" class="ml-6 mt-5">
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
                  <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        <v-col cols="12" sm="6" class="mb-0 py-0">
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
        <v-card max-width="920px" class="ml-6">
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="6" class="mt-3">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.pregnancy_visit.cols.next_meeting.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="4">
                      <v-menu
                        v-model="menu2"
                        color="primary"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="form.appointment_date"
                            color="primary"
                            class="font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="form.appointment_date"
                          :min="maxDate"
                          color="primary"
                          @input="menu2 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeForm()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card-text></v-card-text>
      </v-form>
    </v-card>
    <!--    <form-patient :dialog="dialogForm"></form-patient>-->
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { required } from "vuelidate/lib/validators";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
// import FormPatient from "./FormPatient";
// import { Datetime } from "vue-datetime";
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
          consultation: null,
          patient: null,
          doctor: null,
          type_visit: null,
          gestationnal_age: null,
          weight: null,
          blood_pressure: null,
          abdominal_contour: null,
          uterine_height: null,
          heart_rate: null,
          conjunctivae: null,
          fetal_movement: null,
          position: null,
          presentation: null,
          edema: null,
          complaints: null,
          syphilis_test: null,
          hemoglobin: null,
          HIV_test: null,
          urine_analysis: null,
          rapid_malaria_test: null,
          pregnancy_test: null,
          other_test: null,
          iron_salts_folic_acid: null,
          albendazole: null,
          prevent_treat_malaria: null,
          cur_treat_malaria: null,
          treat_urinary_infect: null,
          syphilis_treat: null,
          treatment_O_IST: null,
          other_treatment: null,
          appointment_date: null,
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
    optionConjunctivae: {
      typeConjunctivae: [],
    },
    vat: [],
    optionsVat: {
      text: { dateCurrent: "", dateNext: "" },
    },
    urlConsultation: "consultations",
    isLoadingConsultation: false,
    searchConsultation: null,
    itemsConsultation: [],
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    menu2: false,
    urlItems: "pregnancy_visits",
    urlItemsBackground: "backgrounds",
    optionVisit: {
      typeVisit: [],
    },
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
    searchConsultation(value) {
      if (value === null) return;
      const params = { type_consultation: "PRENETAL" };
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
    this.getOptionsJaundice();
    this.getOptionsFetal();
    this.getOptionsPosition();
    this.getOptionsPresentation();
    this.getOptionsVisit();
    this.getOptionsConjunctivae();
  },
  validations() {
    let validators = {
      form: {
        patient: {
          required,
        },
        type_visit: {
          required,
        },
        doctor: {
          required,
        },
      },
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
        consultation: this.form.consultation,
        type_visit: this.form.type_visit,
        patient: this.form.patient,
        doctor: this.form.doctor,
        position: this.position,
        fetal_movement: this.fetal_movement,
        presentation: this.presentation,
        abdominal_contour: this.abdominal_contour,
        appointment_date: this.form.appointment_date,
        gestationnal_age: this.form.gestationnal_age,
        blood_pressure: this.form.blood_pressure,
        weight: this.weight,
        reason: this.form.reason,
        uterine_height: this.form.uterine_height,
        heart_rate: this.form.heart_rate,
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
      (this.form.createdAt = item.createdAt),
        (this.form.type_visit = item.type_visit),
        (this.form.gestationnal_age = item.gestationnal_age),
        (this.form.weight = item.weight),
        (this.form.blood_pressure = item.blood_pressure),
        (this.form.presentation = item.presentation),
        (this.form.fetal_movement = item.fetal_movement),
        (this.form.position = item.position),
        (this.form.uterine_height = item.uterine_height),
        (this.form.appointment_date = item.appointment_date),
        (this.form.heart_rate = item.heart_rate),
        (this.form.abdominal_contour = item.abdominal_contour),
        (this.form.edema = item.edema),
        (this.form.syphilis_test = item.syphilis_test),
        (this.form.hemoglobin = item.hemoglobin),
        (this.form.HIV_test = item.HIV_test),
        (this.form.urine_analysis = item.urine_analysis),
        (this.form.rapid_malaria_test = item.rapid_malaria_test),
        (this.form.pregnancy_test = item.pregnancy_test),
        (this.form.other_test = item.other_test),
        (this.form.other = item.other);
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.consultation = item.consultation["id"];
      this.itemsConsultation.push(item.consultation);
    },
  },
  computed: {
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
    type_visitErrors() {
      let errors = [];
      if (!this.$v.form.type_visit.$dirty) return errors;
      !this.$v.form.type_visit.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.consultation.cols.visit.required")
        );
      return errors;
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
  border-color: red;
  margin-right: -2px;
  border-radius: 3px;
  font-size: 15px;
  margin: 0;
  padding: 0;
}
</style>
