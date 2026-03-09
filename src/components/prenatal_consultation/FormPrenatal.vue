<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
    <v-card style="background-color: #eceff1">
      <v-toolbar dark color="#f5f5f5" dense max-width="920px" class="ml-6">
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
        <v-card max-width="920px" class="ml-6" v-if="this.form.consult">
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0" v-if="this.form.consult">
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" v-if="this.form.consult">
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
            <v-col cols="12" sm="4" class="mb-0 py-0" v-if="this.form.consult">
            </v-col>
          </v-row>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-5">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.background.title") }}
            {{
              $vuetify.lang.t(
                "$vuetify.background.cols.category.OBSTETRICAL_GYNECOLOGISTS"
              )
            }}
          </div>
          <div class="align-center mt-4">
            <v-row>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="7">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.lastPeriod.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="5" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.lastPeriod"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="5">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.gestitis.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="5" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.gestitis"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-row>
                      <v-col cols="4">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.parity.title"
                          )
                        }}</v-subheader>
                      </v-col>
                      <v-col cols="5" class="mt-1">
                        <v-text-field
                          dense
                          v-model="form.parity"
                          color="primary"
                          class="font-weight-bold"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{
                $vuetify.lang.t(
                  "$vuetify.consultation.cols.previous_pregnancy.title"
                )
              }}
            </span>
          </v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.previous_pregnancy.live_newborn"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="3" class="mt-1">
                    <v-select
                      dense
                      v-model="form.live_newborn"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
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
                        "$vuetify.consultation.cols.previous_pregnancy.number"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="5" class="mt-1">
                    <v-text-field
                      :disabled="
                        this.form.live_newborn === 'NO' ||
                        !this.form.live_newborn
                      "
                      dense
                      v-model="form.live_newborn_number"
                      color="primary"
                      class="font-weight-bold"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.previous_pregnancy.stillborn_child"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="3" class="mt-1">
                    <v-select
                      dense
                      v-model="form.stillborn_child"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
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
                        "$vuetify.consultation.cols.previous_pregnancy.number"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="5" class="mt-1">
                    <v-text-field
                      dense
                      :disabled="
                        this.form.stillborn_child === 'NO' ||
                        !this.form.stillborn_child
                      "
                      v-model="form.stillborn_child_number"
                      color="primary"
                      class="font-weight-bold"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.previous_pregnancy.infant_death"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="3" class="mt-1">
                    <v-select
                      dense
                      v-model="form.infant_death"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
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
                        "$vuetify.consultation.cols.previous_pregnancy.number"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="5" class="mt-1">
                    <v-text-field
                      :disabled="
                        this.form.infant_death === 'NO' ||
                        !this.form.infant_death
                      "
                      dense
                      v-model="form.infant_death_number"
                      color="primary"
                      class="font-weight-bold"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.previous_pregnancy.abortion"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="3" class="mt-1">
                    <v-select
                      dense
                      v-model="form.abortion"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
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
                        "$vuetify.consultation.cols.previous_pregnancy.number"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="5" class="mt-1">
                    <v-text-field
                      :disabled="
                        this.form.abortion === 'NO' || !this.form.abortion
                      "
                      dense
                      v-model="form.abortion_number"
                      color="primary"
                      class="font-weight-bold"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <!--                  <v-col cols="12" sm="12" class="mb-0 py-0">-->
              <!--                    <v-textarea-->
              <!--
                v-model="form.diagnostic"-->
              <!--                      color="primary"-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.consultation.cols.diagnostic.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      class="font-weight-bold"-->
              <!--                      outlined
                clearable-->
              <!--                    ></v-textarea>-->
              <!--                  </v-col>-->
            </v-row>
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t(
                "$vuetify.consultation.cols.problems_during_previous_pregnancy.title"
              )
            }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-row>
                  <v-col cols="5">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_pregnancy.anemia"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.anemia"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_pregnancy.hypertension"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.hypertension"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_pregnancy.antepartum_hemorrhage"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.antepartum_hemorrhage"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  dense
                  :rows="2"
                  outlined
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.other.title')
                  "
                  v-model="form.other_pre_pregnancy"
                  color="primary"
                  class="font-weight-bold"
                ></v-textarea>
              </v-col>
              <!--                  <v-col cols="12" sm="12" class="mb-0 py-0">-->
              <!--                    <v-textarea-->
              <!--
                v-model="form.diagnostic"-->
              <!--                      color="primary"-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.consultation.cols.diagnostic.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      class="font-weight-bold"-->
              <!--                      outlined
                clearable-->
              <!--                    ></v-textarea>-->
              <!--                  </v-col>-->
            </v-row>
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t(
                "$vuetify.consultation.cols.problems_during_previous_childbirth.title"
              )
            }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.prolonged_work"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.prolonged_work"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.instrumental_extraction"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.instrumental_extraction"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.placenta"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.placenta"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.episiotomy"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.episiotomy"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row> </v-col
              ><v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.postpartum_hemorrahage"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.postpartum_hemorrahage"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.puerperal_infection"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.puerperal_infection"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.problems_during_previous_childbirth.fistula"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.fistula"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  dense
                  :rows="2"
                  outlined
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.other.title')
                  "
                  v-model="form.other_pre_childbirth"
                  color="primary"
                  class="font-weight-bold"
                ></v-textarea>
              </v-col>
              <!--                  <v-col cols="12" sm="12" class="mb-0 py-0">-->
              <!--                    <v-textarea-->
              <!--
                v-model="form.diagnostic"-->
              <!--                      color="primary"-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.consultation.cols.diagnostic.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      class="font-weight-bold"-->
              <!--                      outlined
                clearable-->
              <!--                    ></v-textarea>-->
              <!--                  </v-col>-->
            </v-row>
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t(
                "$vuetify.consultation.cols.medical_history.title"
              )
            }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.hypertension"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.hypertension_history"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.diabetes"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.diabetes"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.tuberculosis"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.tuberculosis"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.sexually_transmitted_infection"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.sexually_transmitted_infection"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row> </v-col
              ><v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.hiv_infection"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.hiv_infection"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="7">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.medical_history.abdominal_surgery"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="4" class="mt-1">
                    <v-select
                      dense
                      v-model="form.abdominal_surgery"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  dense
                  :rows="2"
                  outlined
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.other.title')
                  "
                  v-model="form.other_history"
                  color="primary"
                  class="font-weight-bold"
                ></v-textarea>
              </v-col>
              <!--                  <v-col cols="12" sm="12" class="mb-0 py-0">-->
              <!--                    <v-textarea-->
              <!--
                v-model="form.diagnostic"-->
              <!--                      color="primary"-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.consultation.cols.diagnostic.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      class="font-weight-bold"-->
              <!--                      outlined
                clearable-->
              <!--                    ></v-textarea>-->
              <!--                  </v-col>-->
            </v-row>
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t(
                "$vuetify.consultation.cols.exam_observations.title"
              )
            }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  rows="2"
                  dense
                  v-model="form.exam_observations"
                  color="primary"
                  outlined
                  class="font-weight-bold"
                ></v-textarea>
              </v-col>
              <!--                  <v-col cols="12" sm="12" class="mb-0 py-0">-->
              <!--                    <v-textarea-->
              <!--
                v-model="form.diagnostic"-->
              <!--                      color="primary"-->
              <!--                      :label="-->
              <!--                        $vuetify.lang.t(-->
              <!--                          '$vuetify.consultation.cols.diagnostic.title'-->
              <!--                        )-->
              <!--                      "-->
              <!--                      class="font-weight-bold"-->
              <!--                      outlined
                clearable-->
              <!--                    ></v-textarea>-->
              <!--                  </v-col>-->
            </v-row>
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.consultation.cols.vat.title") }}
          </div>
          <div class="d-flex justify-space-between">
            <span class="font-weight-medium text-subtitle-1"> </span>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon @click="addColumn()" v-on="on">
                  mdi-plus-circle-outline
                </v-icon>
              </template>
              <span>{{ $vuetify.lang.t("$vuetify.btn.add") }}</span>
            </v-tooltip>
          </div>
          <div class="d-flex wrap align-center mt-8" style="height: 40px">
            <v-container>
              <v-row>
                <v-text-field
                  class="font-weight-bold ml-2 mr-1"
                  outlined
                  :placeholder="
                    $vuetify.lang.t('$vuetify.consultation.cols.vat.date')
                  "
                  dense
                  style="width: 50px"
                  readonly
                ></v-text-field>
                <v-text-field
                  class="font-weight-bold ml-2 mr-1"
                  outlined
                  :placeholder="
                    $vuetify.lang.t('$vuetify.consultation.cols.vat.dateNext')
                  "
                  dense
                  style="width: 50px"
                  readonly
                ></v-text-field>
              </v-row>
            </v-container>
          </div>
          <div v-for="(exam, index) in vat" :key="index">
            <div class="d-flex wrap align-center mt-3" style="height: 40px">
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
                    v-model="exam.dateCurrent"
                    color="primary"
                    class="font-weight-bold ml-2 mr-1"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    style="width: 50px"
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="exam.dateCurrent"
                  color="primary"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
              <v-menu
                v-model="menu"
                color="primary"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="exam.dateNext"
                    color="primary"
                    class="font-weight-bold ml-2 mr-1"
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    style="width: 50px"
                    dense
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="exam.dateNext"
                  color="primary"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              <v-icon
                class="ml-1 mb-5"
                style="width: 10px"
                v-if="index > 0"
                @click="removeColumn(index)"
              >
                mdi-minus-circle-outline
              </v-icon>
            </div>
          </div>
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
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
// import FormPatient from "./FormPatient";

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
          lastPeriod: null,
          other: null,
          other_pre_childbirth: null,
          other_pre_pregnancy: null,
          hypertension_history: null,
          diabetes: null,
          tuberculosis: null,
          consultation: null,
          consult: null,
          sexually_transmitted_infection: null,
          hiv_infection: null,
          abdominal_surgery: null,
          gestitis: null,
          live_newborn: null,
          stillborn_child: null,
          infant_death: null,
          abortion: null,
          live_newborn_number: null,
          stillborn_child_number: null,
          infant_death_number: null,
          abortion_number: null,
          parity: null,
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
    vat: [],
    optionsVat: {
      text: { dateCurrent: "", dateNext: "" },
    },
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    urlItems: "details_consultations",
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
            self.closeForm();
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
        vat: this.vat,
        other_pre_childbirth: this.form.other_pre_childbirth,
        other_pre_pregnancy: this.form.other_pre_pregnancy,
        hypertension_history: this.form.hypertension_history,
        diabetes: this.form.diabetes,
        tuberculosis: this.form.tuberculosis,
        sexually_transmitted_infection:
          this.form.sexually_transmitted_infection,
        hiv_infection: this.form.hiv_infection,
        abdominal_surgery: this.form.abdominal_surgery,
        lastPeriod: this.form.lastPeriod,
        parity: this.form.parity,
        gestitis: this.gestitis,
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
        consultation: this.form.consultation,
        exam_observations: this.form.exam_observations,
        reason: this.form.reason,
      };
      return data;
    },
    setFormConsultation(item) {
      // Données envoyées lors de la modification
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.consultation = item.id;
    },
    setFormConsult(item) {
      (this.form.lastPeriod = item.lastPeriod),
        (this.form.gestitis = item.gestitis),
        (this.form.parity = item.parity),
        (this.form.live_newborn = item.live_newborn),
        (this.form.stillborn_child = item.stillborn_child),
        (this.form.infant_death = item.infant_death),
        (this.form.abortion = item.abortion),
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
      this.vat = item.vat === undefined ? [] : item.vat;
      this.form.abdominal_surgery = item.abdominal_surgery;
      this.form.exam_observations = item.exam_observations;
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.consult = item.id;
      this.form.consultation = item.consultation;
      // this.form.code = item.code;
      // this.form.patient = item.patient["id"];
      // this.itemsPatient.push(item.patient);
      // this.form.doctor = item.doctor["id"];
      // this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
  },
  components: {},
};
</script>
