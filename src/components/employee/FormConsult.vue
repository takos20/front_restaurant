<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-row>
                <v-col cols="4" class="mt-3">
                  <v-subheader lass="font-weight-bold">{{
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
            <v-col
              cols="12"
              sm="8"
              class="mb-0 py-0"
              v-if="
                this.$auth.user().groups[0].name !== 'DOCTOR' ||
                this.$auth.user().groups[0].name !== 'DOCTEUR'
              "
            >
              <v-row>
                <v-col cols="2" class="mt-3">
                  <v-subheader lass="font-weight-bold">{{
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
          <span
            class="text-h6 text-center body-2 black--text text--darken-1 ml-4"
          >
            {{ $vuetify.lang.t("$vuetify.background.title") }}
          </span>
          <div class="d-flex justify-space-around">
            <span
              class="font-weight-medium text-subtitle-1"
              style="width: 680px"
            >
            </span>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon @click="addColumnCategoryBackground()" v-on="on">
                  mdi-plus-circle-outline
                </v-icon>
              </template>
              <span>{{ $vuetify.lang.t("$vuetify.btn.add") }}</span>
            </v-tooltip>
          </div>
          <v-card-text>
            <v-card-text
              v-for="(category, index) in categoryBackground"
              :key="index"
              style="height: 155px; width: 820px"
            >
              <v-divider></v-divider>
              <div class="align-center mt-4">
                <v-row>
                  <v-col cols="12" sm="11" class="mb-0 py-0">
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="3">
                          <v-subheader lass="font-weight-bold">{{
                            $vuetify.lang.t("$vuetify.background.titleType")
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="9">
                          <v-select
                            dense
                            v-model="category.categoryBack"
                            color="primary"
                            :items="optionCategory.typeCategory"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row
                        wrap
                        v-if="
                          category.categoryBack === 'OBSTETRICAL_GYNECOLOGISTS'
                        "
                      >
                        <v-col cols="12" sm="4" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="7">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.firstPeriodAge.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="5" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.firstPeriodAge"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="2" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="7">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.gestitis.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="5" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.gestitis"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="2" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="6">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.parity.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.parity"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="4" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="8">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.numberLivingChildren.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="4" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.numberLivingChildren"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="4" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="8">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.numberDeceasedChildren.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="4" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.numberDeceasedChildren"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
                        <v-col cols="12" sm="2" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="6">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.cols.ivg.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="category.ivg"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
                      <v-row v-if="category.categoryBack === 'MEDICAL'">
                        <v-col cols="12" sm="6" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="2">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.background.cols.tbm.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="10">
                              <v-select
                                dense
                                v-model="category.tbm"
                                color="primary"
                                :items="optionTBM.typeTBM"
                                multiple
                                deletable-chips
                                clearable
                                class="font-weight-bold"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" class="mb-0 py-0">
                          <v-textarea
                            dense
                            rows="3"
                            v-model="category.descriptionBm"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.background.cols.description.title'
                              )
                            "
                            outlined
                            clearable
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
                      <v-row v-if="category.categoryBack === 'SURGICAL'">
                        <v-col cols="12" sm="6" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="2">
                              <v-subheader lass="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.background.cols.tbs.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="10">
                              <v-select
                                dense
                                v-model="category.tbs"
                                color="primary"
                                :items="optionTBS.typeTBS"
                                multiple
                                deletable-chips
                                clearable
                                class="font-weight-bold"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="6" class="mb-0 py-0">
                          <v-textarea
                            dense
                            rows="3"
                            v-model="category.descriptionBs"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.background.cols.description.title'
                              )
                            "
                            outlined
                            clearable
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
                      <v-row v-if="category.categoryBack === 'FAMILY'">
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            rows="3"
                            dense
                            v-model="category.descriptionFamily"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.background.cols.description.title'
                              )
                            "
                            outlined
                            clearable
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
                      <v-row v-if="category.categoryBack === 'ALLERGY'">
                        <v-col cols="12" sm="12" class="mb-0 py-0">
                          <v-textarea
                            rows="3"
                            dense
                            v-model="category.descriptionAllergy"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.background.cols.description.title'
                              )
                            "
                            outlined
                            clearable
                            class="font-weight-bold"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-col>
                  <v-col cols="12" sm="1" class="mb-0 py-0">
                    <v-icon
                      class="ml-1 mb-2"
                      style="width: 10px"
                      v-if="index > 0"
                      @click="removeColumnCategoryBackground(index)"
                    >
                      mdi-minus-circle-outline
                    </v-icon>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-2">
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.consultation.title") }}
            </span>
            <v-container class="mt-3">
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="3">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t("$vuetify.consultation.cols.ta.title")
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="9" class="mt-1">
                      <v-text-field
                        dense
                        v-model="form.ta"
                        color="primary"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="6">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.consultation.cols.temperature.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="6" class="mt-1">
                      <v-text-field
                        dense
                        v-model="form.temperature"
                        color="primary"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="4">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t("$vuetify.consultation.cols.poul.title")
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="8" class="mt-1">
                      <v-text-field
                        dense
                        v-model="form.poul"
                        color="primary"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="4">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.consultation.cols.weight.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="8" class="mt-1">
                      <v-text-field
                        dense
                        v-model="form.weight"
                        color="primary"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.other"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.consultation.cols.other.title')
                    "
                    class="font-weight-bold"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.reason"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.consultation.cols.reason.title')
                    "
                    class="font-weight-bold"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.autoMedicare"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.autoMedicare.title'
                      )
                    "
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
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-2">
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.examination.title") }}
            </span>

            <v-container class="mt-3">
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="3">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.examination.cols.condition.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="9" class="mt-1">
                      <v-select
                        dense
                        v-model="form.condition"
                        color="primary"
                        :items="optionCondition.typeCondition"
                        clearable
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  class="mb-0 py-0"
                  v-if="form.condition === 'ALTERED'"
                >
                  <v-row>
                    <v-col cols="5">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.examination.cols.gradeAlterations.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="7" class="mt-1">
                      <v-text-field
                        dense
                        v-model="form.gradeAlterations"
                        :min="1"
                        :max="5"
                        :rules="rules"
                        color="primary"
                        class="font-weight-bold"
                        suffix="OMS"
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="6">
                      <v-subheader lass="font-weight-bold">{{
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
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="5">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.examination.cols.jaundice.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="7" class="mt-1">
                      <v-select
                        dense
                        v-model="form.jaundice"
                        color="primary"
                        :items="optionJaundice.typeJaundice"
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.examenOrl"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.examenOrl.title'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.lymphNodeResearch"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.lymphNodeResearch.title'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.cardioPulmonaryExamination"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.cardioPulmonaryExamination.title'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <div style="width: 760px" class="ml-3">
                  <span
                    class="text-h7 text-center body-2 black--text text--darken-1"
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.examination.cols.abdominalExamination.title"
                      )
                    }}
                  </span>
                  <v-row class="mt-2">
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader lass="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.examination.cols.lumbarConvulsion.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.lumbarConvulsion"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader lass="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.examination.cols.abdominalAuscultation.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.abdominalAuscultation"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        rows="2"
                        dense
                        v-model="form.descAbdominalExam"
                        color="primary"
                        class="font-weight-bold"
                        outlined
                        clearable
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </div>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.neuroPsychologicalExam"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.neuroPsychologicalExam.title'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.pelvicExam"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.examination.cols.pelvicExam.title'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="6">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.examination.cols.vaginalExamination.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        dense
                        v-model="form.vaginalExamination"
                        color="primary"
                        :items="optionVaginalExamination.typeVaginalExamination"
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-row>
                    <v-col cols="6">
                      <v-subheader lass="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.examination.cols.speculumExam.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="3" class="mt-1">
                      <v-select
                        dense
                        v-model="form.speculumExam"
                        color="primary"
                        :items="optionSpeculumExam.typeSpeculumExam"
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.descExamSpeculum"
                    color="primary"
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
                <v-row>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-col cols="12" sm="9" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader lass="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.examination.cols.rectalTouch.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="4" class="mt-1">
                          <v-select
                            dense
                            v-model="form.rectalTouch"
                            color="primary"
                            :items="optionRectalTouch.typeRectalTouch"
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        rows="2"
                        dense
                        v-model="form.descRectal"
                        color="primary"
                        class="font-weight-bold"
                        outlined
                        clearable
                      ></v-textarea>
                    </v-col>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0 mt-12">
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        rows="2"
                        dense
                        v-model="form.otherExam"
                        color="primary"
                        class="font-weight-bold"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.examination.cols.otherExam.title'
                          )
                        "
                        outlined
                        clearable
                      ></v-textarea>
                    </v-col>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-5">
          <v-row>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-card-text style="height: 20px">
                <span
                  class="text-h6 text-center body-2 black--text text--darken-1"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.consultation.titleDiagnosticImpressions"
                    )
                  }}
                </span>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-textarea
                      rows="2"
                      dense
                      v-model="form.diagnosticImpressions"
                      color="primary"
                      class="font-weight-bold"
                      outlined
                      clearable
                    ></v-textarea>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-card-text>
                <span
                  class="text-h6 text-center body-2 black--text text--darken-1"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.consultation.titleAdditionalTests"
                    )
                  }}
                </span>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-textarea
                      rows="2"
                      dense
                      v-model="form.additionalTests"
                      color="primary"
                      class="font-weight-bold"
                      outlined
                      clearable
                    ></v-textarea>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-col>
          </v-row>
          <v-card-text class="mb-4">
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.consultation.titleToBehave") }}
            </span>
            <v-container class="mb-3">
              <v-row wrap>
                <v-textarea
                  rows="2"
                  dense
                  v-model="form.toBehave"
                  color="primary"
                  class="font-weight-bold"
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.toBehave.title')
                  "
                  outlined
                  clearable
                ></v-textarea>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-1">
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.consultation.titleExamResults") }}
            </span>
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
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.dateReceipt.title'
                      )
                    "
                    dense
                    style="width: 50px"
                    readonly
                  ></v-text-field>
                  <v-textarea
                    rows="1"
                    readonly
                    outlined
                    dense
                    style="width: 200px"
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.examReceived.title'
                      )
                    "
                    class="font-weight-bold ml-2 mr-1"
                  ></v-textarea>
                  <v-textarea
                    rows="1"
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.results.title'
                      )
                    "
                    style="width: 200px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-textarea>
                </v-row>
              </v-container>
            </div>
            <div v-for="(exam, index) in examResults" :key="index">
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
                      v-model="exam.dateReceipt"
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
                    v-model="exam.dateReceipt"
                    color="primary"
                    @input="menu3 = false"
                  ></v-date-picker>
                </v-menu>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="exam.examReceived"
                  style="width: 200px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="exam.results"
                  style="width: 200px"
                  class="ml-2 mr-1"
                ></v-textarea>
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
            <div style="width: 775px" class="ml-2 mt-3">
              <v-row>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.expectedResult"
                    color="primary"
                    class="font-weight-bold"
                    outlined
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.expectedResult.title'
                      )
                    "
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.newExamsRequested"
                    color="primary"
                    class="font-weight-bold"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.newExamsRequested.title'
                      )
                    "
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-2">
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.consultation.titleCareSheet") }}
            </span>
            <div class="d-flex justify-space-between">
              <span class="font-weight-medium text-subtitle-1"> </span>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon @click="addColumnCareSheet()" v-on="on">
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
                    outlined
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.dateCareSheet.title'
                      )
                    "
                    class="font-weight-bold ml-2 mr-1"
                    dense
                    readonly
                    style="width: 100px"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    style="width: 200px"
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.paramCareSheet.title'
                      )
                    "
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.paramCareReceived.title'
                      )
                    "
                    style="width: 200px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.paramObservations.title'
                      )
                    "
                    style="width: 200px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                </v-row>
              </v-container>
            </div>
            <div v-for="(sheet, index) in careSheet" :key="index">
              <div class="d-flex wrap align-center mt-3" style="height: 40px">
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
                      v-model="sheet.dateCareSheet"
                      color="primary"
                      class="font-weight-bold ml-2 mr-1"
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      style="width: 100px"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="sheet.dateCareSheet"
                    color="primary"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.paramCareSheet"
                  style="width: 200px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.paramCareReceived"
                  style="width: 200px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.paramObservations"
                  style="width: 200px"
                  class="ml-2 mr-1"
                ></v-textarea>
                <v-icon
                  class="ml-1 mb-5"
                  style="width: 10px"
                  v-if="index > 0"
                  @click="removeColumnCareSheet(index)"
                >
                  mdi-minus-circle-outline
                </v-icon>
              </div>
            </div>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{
                $vuetify.lang.t(
                  "$vuetify.consultation.titleMedicalObservationPatient"
                )
              }}
            </span>
            <div style="width: 775px" class="ml-2 mt-3">
              <v-row>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    dense
                    rows="2"
                    v-model="form.medicalObservationPatient"
                    color="primary"
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-divider class="mx-2 mr-10" style="margin-top: -25px"></v-divider>
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
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";

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
          medicalObservationPatient: null,
          background: null,
          examResults: null,
          careSheet: null,
          diagnosticImpressions: null,
          newExamsRequested: null,
          additionalTests: null,
          toBehave: null,
          examenOrl: null,
          otherExam: null,
          expectedResult: null,
          descRectal: null,
          vaginalExamination: null,
          speculumExam: null,
          rectalTouch: null,
          descExamSpeculum: null,
          pelvicExam: null,
          neuroPsychologicalExam: null,
          descAbdominalExam: null,
          lymphNodeResearch: null,
          abdominalAuscultation: null,
          lumbarConvulsion: null,
          cardioPulmonaryExamination: null,
          gradeAlterations: null,
          conjunctivae: null,
          jaundice: null,
          autoMedicare: null,
          other: null,
          weight: null,
          poul: null,
          temperature: null,
          tension: null,
          ta: null,
          descriptionBm: null,
          condition: null,
          tbs: null,
          tbm: null,
          descriptionBs: null,
          descriptionFamily: null,
          descriptionAllergy: null,
          reason: null,
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
    categoryBackground: [],
    examResults: [],
    careSheet: [],
    options: {
      text: { dateReceipt: "", examReceived: "", results: "" },
    },
    optionsCareSheet: {
      text: {
        dateCareSheet: "",
        paramCareSheet: "",
        paramCareReceived: "",
        paramObservations: "",
      },
    },
    optionsCategoryBackground: {
      text: {
        categoryBack: "",
        firstPeriodAge: "",
        gestitis: "",
        parity: "",
        numberLivingChildren: "",
        numberDeceasedChildren: "",
        ivg: "",
        tbm: "",
        descriptionBm: "",
        tbs: "",
        descriptionBs: "",
        descriptionFamily: "",
        descriptionAllergy: "",
      },
    },
    show: false,
    showMedical: false,
    showSurgical: false,
    showFamily: false,
    showAllergy: false,
    optionCategory: {
      typeCategory: [],
    },
    rules: [
      (v) => v >= 1 || "Le grade doit être supérieure ou égale à 1",
      (v) => v <= 5 || "Le maximum ne doit pas dépasser 5",
    ],
    optionTBM: {
      typeTBM: [],
    },
    optionCondition: {
      typeCondition: [],
    },
    optionConjunctivae: {
      typeConjunctivae: [],
    },
    optionJaundice: {
      typeJaundice: [],
    },
    optionRectalTouch: {
      typeRectalTouch: [],
    },
    optionSpeculumExam: {
      typeSpeculumExam: [],
    },
    optionVaginalExamination: {
      typeVaginalExamination: [],
    },
    optionTBS: {
      typeTBS: [],
    },
    textFields: [],
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    urlItems: "consultations",
    urlItemsBackground: "backgrounds",
    urlDoctors: "doctors",
    isLoadingDoctor: false,
    searchDoctor: null,
    itemsDoctor: [],
  }),
  watch: {
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
    this.getOptionsCategory();
    this.getOptionsTBM();
    this.getOptionsTBS();
    this.getOptionsCondition();
    this.getOptionsConjunctivae();
    this.getOptionsJaundice();
    this.getOptionsVaginalExamination();
    this.getOptionsSpeculumExam();
    this.getOptionsRectalTouch();
  },
  validations() {
    let validators = {
      form: {},
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
    addColumn() {
      this.examResults.push({ ...this.options.text });
    },
    addColumnCategoryBackground() {
      this.categoryBackground.push({ ...this.optionsCategoryBackground.text });
      console.log(this.categoryBackground);
    },
    addColumnCareSheet() {
      this.careSheet.push({ ...this.optionsCareSheet.text });
    },
    removeColumn(index) {
      this.examResults.splice(index, 1);
    },
    removeColumnCareSheet(index) {
      this.careSheet.splice(index, 1);
    },
    removeColumnCategoryBackground(index) {
      this.categoryBackground.splice(index, 1);
    },
    getdatetime_start(val) {
      this.form.start_appointment_date = val;
    },
    getdatetime_end(val) {
      this.form.end_appointment_date = val;
      console.log(this.form.end_appointment_date);
    },
    getOptionsTBM() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.tbm, (typeTBM) => {
        self.optionTBM.typeTBM.push({
          text: self.$vuetify.lang.t(typeTBM.text),
          value: typeTBM.value,
        });
      });
    },
    getOptionsCategory() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.category, (typeCategory) => {
        self.optionCategory.typeCategory.push({
          text: self.$vuetify.lang.t(typeCategory.text),
          value: typeCategory.value,
        });
      });
    },
    getOptionsTBS() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.tbs, (typeTBS) => {
        self.optionTBS.typeTBS.push({
          text: self.$vuetify.lang.t(typeTBS.text),
          value: typeTBS.value,
        });
      });
    },
    getOptionsCondition() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.condition, (typeCondition) => {
        self.optionCondition.typeCondition.push({
          text: self.$vuetify.lang.t(typeCondition.text),
          value: typeCondition.value,
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
    getOptionsRectalTouch() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.jaundice, (typeRectalTouch) => {
        self.optionRectalTouch.typeRectalTouch.push({
          text: self.$vuetify.lang.t(typeRectalTouch.text),
          value: typeRectalTouch.value,
        });
      });
    },
    getOptionsSpeculumExam() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.jaundice, (typeSpeculumExam) => {
        self.optionSpeculumExam.typeSpeculumExam.push({
          text: self.$vuetify.lang.t(typeSpeculumExam.text),
          value: typeSpeculumExam.value,
        });
      });
    },
    getOptionsVaginalExamination() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.jaundice, (typeVaginalExamination) => {
        self.optionVaginalExamination.typeVaginalExamination.push({
          text: self.$vuetify.lang.t(typeVaginalExamination.text),
          value: typeVaginalExamination.value,
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
        medicalObservationPatient: this.form.medicalObservationPatient,
        examResults: this.examResults,
        background: this.categoryBackground,
        careSheet: this.careSheet,
        diagnosticImpressions: this.form.diagnosticImpressions,
        additionalTests: this.form.additionalTests,
        toBehave: this.form.toBehave,
        examenOrl: this.form.examenOrl,
        otherExam: this.form.otherExam,
        descRectal: this.form.descRectal,
        vaginalExamination: this.form.vaginalExamination,
        speculumExam: this.form.speculumExam,
        rectalTouch: this.form.rectalTouch,
        descExamSpeculum: this.form.descExamSpeculum,
        pelvicExam: this.form.pelvicExam,
        expectedResult: this.form.expectedResult,
        neuroPsychologicalExam: this.form.neuroPsychologicalExam,
        newExamsRequested: this.form.newExamsRequested,
        descAbdominalExam: this.form.descAbdominalExam,
        lymphNodeResearch: this.form.lymphNodeResearch,
        abdominalAuscultation: this.form.abdominalAuscultation,
        lumbarConvulsion: this.form.lumbarConvulsion,
        cardioPulmonaryExamination: this.form.cardioPulmonaryExamination,
        gradeAlterations: this.form.gradeAlterations,
        conjunctivae: this.form.conjunctivae,
        jaundice: this.form.jaundice,
        other: this.form.other,
        poul: this.form.poul,
        temperature: this.form.temperature,
        tension: this.form.tension,
        condition: this.form.condition,
        descriptionAllergy: this.form.descriptionAllergy,
        descriptionFamily: this.form.descriptionFamily,
        ta: this.form.ta,
        weight: this.form.weight,
        autoMedicare: this.form.autoMedicare,
        patient: this.$route.params.id,
        doctor: this.form.doctor,
        product_form: this.form.product_form,
        descriptionBs: this.form.descriptionBs,
        descriptionBm: this.form.descriptionBm,
        start_appointment_date: this.form.start_appointment_date,
        end_appointment_date: this.form.end_appointment_date,
        tbm: this.form.tbm,
        tbs: this.form.tbs,
        createdAt: this.form.createdAt,
        reason: this.form.reason,
      };
      return data;
    },
    getDataFormBackground() {
      let data = {
        doctor: this.form.doctor,
      };
      return data;
    },
    getDataFormExamination() {
      let data = {
        results_exam: this.form.results_exam,
        tension: this.form.tension,
        perimeter: this.form.perimeter,
        temperature: this.form.temperature,
      };
      return data;
    },
    setForm(item) {
      (this.form.medicalObservationPatient = item.medicalObservationPatient),
        (this.examResults = item.examResults),
        (this.categoryBackground = item.background),
        (this.careSheet = item.careSheet),
        (this.form.diagnosticImpressions = item.diagnosticImpressions),
        (this.form.additionalTests = item.additionalTests),
        (this.form.toBehave = item.toBehave),
        (this.form.examenOrl = item.examenOrl),
        (this.form.expectedResult = item.expectedResult),
        (this.form.otherExam = item.otherExam),
        (this.form.descRectal = item.descRectal),
        (this.form.vaginalExamination = item.vaginalExamination),
        (this.form.newExamsRequested = item.newExamsRequested),
        (this.form.speculumExam = item.speculumExam),
        (this.form.rectalTouch = item.rectalTouch),
        (this.form.descExamSpeculum = item.descExamSpeculum),
        (this.form.pelvicExam = item.pelvicExam),
        (this.form.createdAt = item.createdAt),
        (this.form.neuroPsychologicalExam = item.neuroPsychologicalExam),
        (this.form.descAbdominalExam = item.descAbdominalExam),
        (this.form.lymphNodeResearch = item.lymphNodeResearch),
        (this.form.abdominalAuscultation = item.abdominalAuscultation),
        (this.form.lumbarConvulsion = item.lumbarConvulsion),
        (this.form.cardioPulmonaryExamination =
          item.cardioPulmonaryExamination),
        (this.form.gradeAlterations = item.gradeAlterations),
        (this.form.conjunctivae = item.conjunctivae),
        (this.form.jaundice = item.jaundice),
        (this.form.other = item.other),
        (this.form.poul = item.poul),
        (this.form.temperature = item.temperature),
        (this.form.tension = item.tension),
        (this.form.condition = item.condition),
        (this.form.descriptionAllergy = item.descriptionAllergy);
      this.form.descriptionFamily = item.descriptionFamily;
      this.form.ta = item.ta;
      this.form.weight = item.weight;
      this.form.autoMedicare = item.autoMedicare;
      this.form.product_form = item.product_form;
      this.form.descriptionBs = item.descriptionBs;
      this.form.descriptionBm = item.descriptionBm;
      this.form.start_appointment_date = item.start_appointment_date;
      this.form.end_appointment_date = item.end_appointment_date;
      this.form.tbm = item.tbm;
      this.form.tbs = item.tbs;
      this.form.reason = item.reason;
      this.form.diagnostic = item.diagnostic;
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
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
};
</script>
