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
                        readonly
                      ></v-text-field>
                    </template>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" v-if="this.form.consult">
            </v-col>
          </v-row>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-2">
          <v-container class="mt-1">
            <v-col cols="12" sm="12" class="mb-0 py-0">
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
          </v-container>
        </v-card>
        <v-card max-width="920px" class="ml-6 mt-5">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.background.title") }}
          </div>
          <div class="d-flex justify-space-around">
            <span
              class="font-weight-medium text-subtitle-1"
              style="width: 680px; margin-top: -10px"
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
              style="height: 155px; width: 920px"
            >
              <v-divider></v-divider>
              <div class="align-center mt-4">
                <v-row>
                  <v-col cols="12" sm="11" class="mb-0 py-0">
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="3">
                          <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                              <v-subheader class="font-weight-bold">{{
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
                      <v-row v-if="category.categoryBack === 'ANESTHESIA'">
                        <v-col cols="12" sm="6" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="3">
                              <v-subheader class="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.anesthesia_general.cols.type_anesthesia.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="9">
                              <v-select
                                dense
                                v-model="category.type_anesthesia"
                                color="primary"
                                :items="optionAnesthesia.typeAnesthesia"
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
                            v-model="category.otherAnesthesia"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.background.cols.otherAnesthesia.title'
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
                              <v-subheader class="font-weight-bold">{{
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
        <v-card max-width="920px" class="ml-6 mt-2">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{
              $vuetify.lang.t("$vuetify.anesthesia_general.titleDiagAnesthesia")
            }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="5" class="mb-0 py-0">
                <v-row>
                  <v-col cols="4">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.anesthesia_general.cols.eye_operated.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="8" class="mt-1">
                    <v-select
                      dense
                      v-model="form.eye_operated"
                      color="primary"
                      :items="optionEye.typeEye"
                      clearable
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-row>
                  <v-col cols="6">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.anesthesia_general.cols.height.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="6" class="mt-1">
                    <v-text-field
                      dense
                      v-model="form.height"
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
                        "$vuetify.anesthesia_general.cols.weight.title"
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
                  v-model="form.diagnosis"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.anesthesia_general.cols.diagnosis.title'
                    )
                  "
                  class="font-weight-bold"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="2">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t("$vuetify.surgery.title")
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="10" class="mt-1">
                    <v-autocomplete
                      dense
                      v-model="form.surgery"
                      :items="itemsSurgery"
                      :loading="isLoadingSurgery"
                      :search-input.sync="searchSurgery"
                      color="primary"
                      item-text="title"
                      hide-no-data
                      item-value="id"
                      class="font-weight-bold"
                      clearable
                    >
                      <template #label>
                        <span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="4">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.anesthesia_general.cols.dateSurgery.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="8" class="mt-1">
                    <v-menu
                      outlined
                      dense
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
                          dense
                          v-model="form.dateSurgery"
                          color="primary"
                          class="font-weight-bold"
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        outlined
                        dense
                        v-model="form.dateSurgery"
                        :max="maxDate"
                        color="primary"
                        @input="menu4 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="4">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.anesthesia_general.cols.type_anesthesia.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="8" class="mt-1">
                    <v-select
                      dense
                      v-model="form.type_anesthesia"
                      color="primary"
                      :items="optionAnesthesia.typeAnesthesia"
                      clearable
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row>
                  <v-col cols="4">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.anesthesia_general.cols.patient_below_15.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="8" class="mt-1">
                    <v-select
                      dense
                      v-model="form.patient_below_15"
                      color="primary"
                      :items="optionBelow15.typeBelow15"
                      clearable
                      multiple
                      class="font-weight-bold"
                    ></v-select>
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
                "$vuetify.anesthesia_general.cols.systemic_evaluation.title"
              )
            }}
          </div>

          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  rows="2"
                  dense
                  v-model="form.cvs"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.anesthesia_general.cols.cvs.title'
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
                  v-model="form.rs"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.anesthesia_general.cols.rs.title')
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
                  v-model="form.cns"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.anesthesia_general.cols.cns.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  clearable
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  rows="2"
                  dense
                  v-model="form.systemic_evaluation_other"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.anesthesia_general.cols.systemic_evaluation_other.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  clearable
                ></v-textarea>
              </v-col>
              <div style="width: 895px" class="ml-3">
                <span
                  class="text-h7 text-center body-2 black--text text--darken-1"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.anesthesia_general.cols.laboratory_investigation.title"
                    )
                  }}
                </span>
                <v-row class="mt-2">
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-textarea
                      rows="2"
                      dense
                      v-model="form.hb"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.hb.title'
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
                      v-model="form.wbc"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.wbc.title'
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
                      v-model="form.platelets"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.platelets.title'
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
                      v-model="form.tp_tck"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.tp_tck.title'
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
                      v-model="form.fbs_rbs"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.fbs_rbs.title'
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
                      v-model="form.urea"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.urea.title'
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
                      v-model="form.creatinine"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.creatinine.title'
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
                      v-model="form.clotting_time"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.clotting_time.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      clearable
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>

              <div style="width: 895px" class="ml-3">
                <span
                  class="text-h7 text-center body-2 black--text text--darken-1"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.anesthesia_general.cols.parameter.title"
                    )
                  }}
                </span>
                <v-row class="mt-2">
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-textarea
                      rows="2"
                      dense
                      v-model="form.rr"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.rr.title'
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
                      v-model="form.bp"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.bp.title'
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
                      v-model="form.pr"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.pr.title'
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
                      v-model="form.spO2"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.spO2.title'
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
                      v-model="form.temp"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.temp.title'
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
                      v-model="form.parameter_weight"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.weight.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      clearable
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>
              <div style="width: 895px" class="ml-3">
                <span
                  class="text-h7 text-center body-2 black--text text--darken-1"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.anesthesia_general.cols.physical_examination.title"
                    )
                  }}
                </span>
                <v-row class="mt-2">
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-textarea
                      rows="2"
                      dense
                      v-model="form.mallamphati"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.mallamphati'
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
                      v-model="form.opening_mouth"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.opening_mouth'
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
                      v-model="form.cervical_mobility"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.cervical_mobility'
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
                      v-model="form.artificial_dentures"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.artificial_dentures'
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
                      v-model="form.tyromenthoid_distance"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.tyromenthoid_distance'
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
                      v-model="form.IV_accessibility"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.anesthesia_general.cols.physical_examination.IV_accessibility'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      clearable
                    ></v-textarea>
                  </v-col>
                </v-row>
              </div>
            </v-row>
          </v-container>
        </v-card>

        <v-card max-width="920px" class="ml-6 mt-1">
          <div
            class="title mb-5 white--text blue darken-5 text-center"
            style="height: 30px; margin-top: 30px"
          >
            {{ $vuetify.lang.t("$vuetify.anesthesia_general.recommendations") }}
          </div>
          <v-container>
            <div style="width: 875px" class="ml-3">
              <span
                class="text-h7 text-center body-2 black--text text--darken-1"
              >
                {{
                  $vuetify.lang.t(
                    "$vuetify.anesthesia_general.cols.fasting_details.title"
                  )
                }}
              </span>
              <v-row class="mt-2">
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    rows="2"
                    dense
                    v-model="form.solids"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.anesthesia_general.cols.fasting_details.solids'
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
                    v-model="form.fluids"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.anesthesia_general.cols.fasting_details.fluids'
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
                    v-model="form.breast_milk"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.anesthesia_general.cols.fasting_details.breast_milk'
                      )
                    "
                    class="font-weight-bold"
                    outlined
                    clearable
                  ></v-textarea>
                </v-col>
              </v-row>
            </div>
          </v-container>
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
    <form-patient :dialog="dialogForm"></form-patient>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
import FormPatient from "./FormPatient";

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
          consultation: null,
          consult: null,
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
          type_consultation: "MEDICAL",
          tbs: null,
          tbm: null,
          descriptionBs: null,
          descriptionFamily: null,
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
        type_anesthesia: "",
        otherAnesthesia: "",
        descriptionFamily: "",
        descriptionAllergy: "",
      },
    },
    show: false,
    showMedical: false,
    showSurgical: false,
    showFamily: false,
    showAllergy: false,
    isLoadingSurgery: false,
    searchSurgery: null,
    itemsSurgery: [],
    urlSurgery: "surgeries/all",
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
    optionEye: {
      typeEye: [],
    },
    optionBelow15: {
      typeBelow15: [],
    },
    optionAnesthesia: {
      typeAnesthesia: [],
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
    menu4: false,
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
    searchSurgery(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingSsurgery = true;
      this.$store
        .dispatch("request", {
          url: self.urlSurgery,
          params: params,
        })
        .then((response) => {
          self.itemsSurgery = response.data.content;
        })
        .finally(() => (this.isLoadingSurgery = false));
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
    this.getOptionsCategory();
    this.getOptionsTBM();
    this.getOptionsTBS();
    this.getOptionsCondition();
    this.getOptionsEye();
    this.getOptionsBelow15();
    this.getOptionsAnesthesia();
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
    getOptionsEye() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.eye, (typeEye) => {
        self.optionEye.typeEye.push({
          text: self.$vuetify.lang.t(typeEye.text),
          value: typeEye.value,
        });
      });
    },
    getOptionsBelow15() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.patient_below_15, (typeBelow15) => {
        self.optionBelow15.typeBelow15.push({
          text: self.$vuetify.lang.t(typeBelow15.text),
          value: typeBelow15.value,
        });
      });
    },
    getOptionsAnesthesia() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.anesthesia, (typeAnesthesia) => {
        self.optionAnesthesia.typeAnesthesia.push({
          text: self.$vuetify.lang.t(typeAnesthesia.text),
          value: typeAnesthesia.value,
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
        type_consultation: this.type_consultation,
        careSheet: this.careSheet,
        diagnostic_impressions: this.form.diagnosticImpressions,
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
        patient: this.form.patient,
        doctor: this.form.doctor,
        product_form: this.form.product_form,
        descriptionBs: this.form.descriptionBs,
        descriptionBm: this.form.descriptionBm,
        start_appointment_date: this.form.start_appointment_date,
        end_appointment_date: this.form.end_appointment_date,
        consultation: this.form.consultation,
        tbm: this.form.tbm,
        tbs: this.form.tbs,
        reason: this.form.reason,
      };
      return data;
    },
    getDataFormBackground() {
      let data = {
        patient: this.form.patient,
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
    setFormConsultation(item) {
      // Données envoyées lors de la modification
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.consultation = item.id;
    },
    setFormConsult(item) {
      (this.form.medicalObservationPatient = item.medicalObservationPatient),
        (this.examResults =
          item.examResults === undefined ? [] : item.examResults),
        (this.type_consultation = item.type_consultation),
        (this.categoryBackground =
          item.background === undefined ? [] : item.background),
        (this.careSheet = item.careSheet),
        (this.form.diagnosticImpressions = item.diagnostic_impressions),
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
        (this.form.createdAt = this.$moment(item.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        )),
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
      this.form.consult = item.id;
      this.form.consultation = item.consultation;
      // Données envoyées lors de la modification
      this.form.id = item.id;
      // this.form.code = item.code;
      // this.form.patient = item.patient["id"];
      // this.itemsPatient.push(item.patient);
      // this.form.doctor = item.doctor["id"];
      // this.itemsDoctor.push(item.doctor);
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
  components: { FormPatient },
};
</script>
