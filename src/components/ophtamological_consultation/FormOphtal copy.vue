<template>
  <v-dialog v-model="dialog.show" persistent max-width="1050">
    <div v-if="isEnded">Ended.</div>

    <v-card style="background-color: #eceff1">
      <v-toolbar dark color="#f5f5f5" dense max-width="1030px">
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="primary">
            {{ $vuetify.lang.t("$vuetify.stepper.step1") }}
            <v-btn icon light @click="backTo()">
              <v-icon>mdi-currency-eth</v-icon>
            </v-btn>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" color="primary">
            {{ $vuetify.lang.t("$vuetify.stepper.examen") }}
            <v-btn icon light @click="backTo1()">
              <v-icon>mdi-currency-eth</v-icon>
            </v-btn>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3" color="primary">
            {{ $vuetify.lang.t("$vuetify.stepper.stepRefraction") }}
            <v-btn icon light @click="backTo2()">
              <v-icon>mdi-currency-eth</v-icon>
            </v-btn>
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4" color="primary">
            {{ $vuetify.lang.t("$vuetify.stepper.recap") }}
            <v-btn icon light @click="backTo3()">
              <v-icon>mdi-currency-eth</v-icon>
            </v-btn>
          </v-stepper-step>
        </v-stepper-header>
        <v-form @submit.prevent="saveAll">
          <v-stepper-items>
            <v-stepper-content step="1">
              <br />
              <v-card max-width="1020px">
                <v-row wrap>
                  <v-col
                    cols="12"
                    sm="4"
                    class="mb-0 py-0"
                    v-if="this.form.consult"
                  >
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="mb-0 py-0"
                    v-if="this.form.consult"
                  >
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
                  <v-col
                    cols="12"
                    sm="4"
                    class="mb-0 py-0"
                    v-if="this.form.consult"
                  >
                  </v-col>
                  <v-container>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.reason.title'
                          )
                        "
                        v-model="form.reason"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>
                    </v-col>
                  </v-container>
                </v-row>
              </v-card>
              <v-card max-width="1020px" class="mt-5">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.background.title") }}
                </div>
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
                    v-for="(category, index) in categoryBackgrounds"
                    :key="index"
                    style="height: 255px; width: 920px"
                  >
                    <v-divider></v-divider>
                    <div class="align-center mt-4">
                      <v-row>
                        <v-col cols="12" sm="11" class="mb-0 py-0">
                          <v-col cols="12" sm="12" class="mb-0 py-0">
                            <v-row>
                              <v-col cols="3">
                                <v-subheader class="font-weight-bold">{{
                                  $vuetify.lang.t(
                                    "$vuetify.background.titleType"
                                  )
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
                            </v-row> </v-col
                          ><v-col cols="12" sm="12" class="mb-0 py-0 mt-2">
                            <v-row
                              v-if="category.categoryBack === 'OPHTALMOLOGIC'"
                            >
                              <v-col cols="12" sm="12" class="mb-0 py-0">
                                <v-row>
                                  <v-col cols="3">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.ophtamologique.cols.ophtalmologic_back.titleOD"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="9">
                                    <v-select
                                      dense
                                      v-model="category.OOD"
                                      color="primary"
                                      :items="optionOP.typeOP"
                                      multiple
                                      deletable-chips
                                      clearable
                                      class="font-weight-bold"
                                    ></v-select>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="12" class="mb-0 py-0">
                                <v-row>
                                  <v-col cols="3">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.ophtamologique.cols.ophtalmologic_back.titleOG"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="9">
                                    <v-select
                                      dense
                                      v-model="category.OOG"
                                      color="primary"
                                      :items="optionOP.typeOP"
                                      multiple
                                      deletable-chips
                                      clearable
                                      class="font-weight-bold"
                                    ></v-select>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="12" class="mb-0 py-0">
                                <v-textarea
                                  dense
                                  rows="3"
                                  v-model="category.otherBackOpht"
                                  color="primary"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.ophtamologique.cols.ophtalmologic_back.otherBackOpht'
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
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px"
                >
                  {{
                    $vuetify.lang.t("$vuetify.ophtamologique.titleParameters")
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.ta_sys.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="4" class="mt-1">
                          <v-select
                            dense
                            v-model="form.ta_sys_options"
                            color="primary"
                            :items="optionsTa.type_Ta"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                        <v-col cols="2" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.ta_sys"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.ta_dias.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="4" class="mt-1">
                          <v-select
                            dense
                            v-model="form.ta_dias_options"
                            color="primary"
                            :items="optionsTa.type_Ta"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                        <v-col cols="2" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.ta_dias"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="3">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.poul.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.poul"
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
                              "$vuetify.ophtamologique.cols.iop_od.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.iop_od"
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
                              "$vuetify.ophtamologique.cols.iop_og.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-text-field
                            dense
                            v-model="form.iop_og"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px"
                >
                  {{
                    $vuetify.lang.t("$vuetify.ophtamologique.cols.acuity.title")
                  }}
                </div>

                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.acuity.ODWTC"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-select
                            dense
                            v-model="form.ODWTC"
                            color="primary"
                            :items="optionsAC.type_ac"
                            deletable-chips
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
                              "$vuetify.ophtamologique.cols.acuity.OGWTC"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-select
                            dense
                            v-model="form.OGWTC"
                            color="primary"
                            :items="optionsAC.type_ac"
                            deletable-chips
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
                              "$vuetify.ophtamologique.cols.acuity.ODWC"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-select
                            dense
                            v-model="form.ODWC"
                            color="primary"
                            :items="optionsAC.type_ac"
                            deletable-chips
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
                              "$vuetify.ophtamologique.cols.acuity.OGWC"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-select
                            dense
                            v-model="form.OGWC"
                            color="primary"
                            :items="optionsAC.type_ac"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.ophtamologique.cols.interrogation.title"
                    )
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="3">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.interrogation.symptoms"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="9" class="mt-1">
                          <v-select
                            dense
                            v-model="form.symptoms"
                            color="primary"
                            :items="optionSymptoms.type_symptoms"
                            class="font-weight-bold"
                            multiple
                            clearable
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
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.interrogation.other_symptoms'
                          )
                        "
                        v-model="form.other_symptoms"
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
                            '$vuetify.ophtamologique.cols.interrogation.current_treatments'
                          )
                        "
                        v-model="form.current_treatments"
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
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.ophtamologique.cols.anteriors_segments.title"
                    )
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.eyelids_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.eyelids_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.conjunctiva.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.conjunctiva_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.conjunctiva_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.cornea.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.cornea_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.cornea_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2" class="mt-3">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.anterior_chamber.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.anterior_chamber_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.anterior_chamber_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.iris.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.iris_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.iris_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.pupil.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.pupil_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.pupil_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.crystalline.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.crystalline_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.crystalline_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.eom.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.eom_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.eom_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.iop.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.iop_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.iop_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.ophtamologique.cols.anteriors_segments.cct.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.cct_re"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                              )
                            "
                          ></v-textarea> </v-col
                        ><v-col cols="5" class="mt-1">
                          <v-textarea
                            dense
                            :rows="2"
                            v-model="form.cct_le"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                              )
                            "
                          ></v-textarea>
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
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.consultation.titleDiagnosticImpressions"
                    )
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        v-model="form.diagnostic_impressions"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>

              <v-card max-width="1020px" class="mt-2">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn color="primary" @click="goToNextPage2" dark>
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
              <br />
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.ophtamologique.cols.diagnostic_final.title"
                    )
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 8px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_og"
                              )
                            }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.diagnostic"
                                  :items="itemsDiagOg"
                                  :loading="isLoadingDiagnosticOg"
                                  :search-input.sync="searchDiagnosticOg"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t('$vuetify.diagnostic.title')
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="createDiagnosticOg()"
                                      v-on="on"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsDiagnosticOg()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                                <!-- <v-btn
          :loading="loadingDiagnostic.refresh"
          @click="refreshItemsDiagnostic()"
          depressed
          color="#f1f5fc"
        >
          <v-icon left color="primary">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn> -->
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsDiagnosticOg"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsDiagnosticOg.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                            <tr>
                              {{
                                $vuetify.lang.t(header.text)
                              }}
                            </tr>
                          </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.diagnostic
                                          ? item.diagnostic.code
                                          : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.diagnostic
                                          ? item.diagnostic.title
                                          : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                  {{ item.results }}
                                </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
              <td class="subtitle-2">{{ item.interpretation }}</td>
              <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="
                                                deleteItemDiagnosticOg(item)
                                              "
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDeleteDiagnosticOg"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="getItemsDetailsDiagnosticOg"
                          ></delete-item>
                        </v-card-text>
                      </v-card>
                      <br />
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 8px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_od"
                              )
                            }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.diagnostic"
                                  :items="itemsDiagOd"
                                  :loading="isLoadingDiagnosticOd"
                                  :search-input.sync="searchDiagnosticOd"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t('$vuetify.diagnostic.title')
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="createDiagnosticOd()"
                                      v-on="on"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsDiagnosticOd()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsDiagnosticOd"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsDiagnosticOd.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.diagnostic
                                          ? item.diagnostic.code
                                          : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.diagnostic
                                          ? item.diagnostic.title
                                          : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                    {{ item.results }}
                                  </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                <td class="subtitle-2">{{ item.interpretation }}</td>
                <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="
                                                deleteItemDiagnosticOd(item)
                                              "
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="getItemsDetailsDiagnosticOd"
                          ></delete-item>
                        </v-card-text>
                      </v-card>

                      <!-- <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.decision.exam_labo'
                          )
                        "
                        v-model="form.decision_exam_labo"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>  -->
                      <!-- <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_od'
                          )
                        "
                        v-model="form.diagnostic_od"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>  -->
                    </v-col>

                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_other'
                          )
                        "
                        v-model="form.diagnostic_other"
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
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.ophtamologique.cols.decision.title"
                    )
                  }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 1px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.decision.exam_labo"
                              )
                            }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.laboratory"
                                  :items="itemsLaboratory"
                                  :loading="isLoadingLaboratory"
                                  :search-input.sync="searchLaboratory"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t('$vuetify.laboratory.title')
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon @click="create()" v-on="on">
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsLaboratory()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsLaboaratory"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetails.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.laboratory
                                          ? item.laboratory.code
                                          : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.laboratory
                                          ? item.laboratory.title
                                          : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                    {{ item.results }}
                                  </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                <td class="subtitle-2">{{ item.interpretation }}</td>
                <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="
                                                deleteItemLaboratory(item)
                                              "
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="this.getItemsDetailsLaboratory()"
                          ></delete-item>
                        </v-card-text>
                      </v-card>

                      <!-- <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.decision.exam_labo'
                          )
                        "
                        v-model="form.decision_exam_labo"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>  -->
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 8px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.decision.decision_surgery"
                              )
                            }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.surgery"
                                  :items="itemsSurg"
                                  :loading="isLoadingSurgery"
                                  :search-input.sync="searchSurgery"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t('$vuetify.surgery.title')
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon @click="createSurgery()" v-on="on">
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsSurgery()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsSurgery"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsSurgery.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.surgery ? item.surgery.code : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.surgery ? item.surgery.title : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                    {{ item.results }}
                                  </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                <td class="subtitle-2">{{ item.interpretation }}</td>
                <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="deleteItemSurgery(item)"
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="getItemsDetailsSurgery"
                          ></delete-item>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 8px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{ $vuetify.lang.t("$vuetify.radiography.title") }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.radiography"
                                  :items="itemsRadio"
                                  :loading="isLoadingRadiography"
                                  :search-input.sync="searchRadiography"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.radiography.title'
                                    )
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="createRadiography()"
                                      v-on="on"
                                    >
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsRadiography()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsRadiography"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsRadiography.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.radiography
                                          ? item.radiography.code
                                          : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.radiography
                                          ? item.radiography.title
                                          : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                    {{ item.results }}
                                  </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                <td class="subtitle-2">{{ item.interpretation }}</td>
                <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="
                                                deleteItemRadiography(item)
                                              "
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="getItemsDetailsRadiography"
                          ></delete-item>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-card style="margin-top: 8px">
                        <v-card-text>
                          <div class="black--text text-center">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.exam_investigation.title"
                              )
                            }}
                          </div>
                          <div class="d-flex justify-space-around">
                            <v-row wrap>
                              <v-col cols="12" sm="10" class="my-2">
                                <v-autocomplete
                                  v-model="form.investigation"
                                  :items="itemsInvest"
                                  :loading="isLoadingInvestigation"
                                  :search-input.sync="searchInvestigation"
                                  item-text="title"
                                  color="primary"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.exam_investigation.title'
                                    )
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon @click="createInvest()" v-on="on">
                                      mdi-plus-circle-outline
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.add")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                              <v-col cols="12" sm="1" class="my-4">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-icon
                                      @click="refreshItemsInvest()"
                                      v-on="on"
                                    >
                                      mdi-refresh
                                    </v-icon>
                                  </template>
                                  <span>{{
                                    $vuetify.lang.t("$vuetify.btn.refresh")
                                  }}</span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </div>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headers"
                            :items="itemsInvestigation"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsInvest.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                          >
                            <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!-- <template v-slot:header.results="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <td class="subtitle-2">
                                      {{
                                        item.exam_investigation
                                          ? item.exam_investigation.code
                                          : "-"
                                      }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{
                                        item.exam_investigation
                                          ? item.exam_investigation.title
                                          : "-"
                                      }}
                                    </td>
                                    <!-- <td class="subtitle-2">
                                    {{ item.results }}
                                  </td> -->
                                    <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                <td class="subtitle-2">{{ item.interpretation }}</td>
                <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="deleteItemInvest(item)"
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItemsDetails="getItemsDetailsInvest"
                          ></delete-item>
                        </v-card-text>
                      </v-card>

                      <!-- <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.decision.exam_labo'
                          )
                        "
                        v-model="form.decision_exam_labo"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>  -->
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <br />
                      <v-card>
                        <div class="black--text text-center">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.prescription.title_Ordinance"
                            )
                          }}
                        </div>
                        <v-form @submit.prevent="saveDetails">
                          <v-card-text>
                            <v-row>
                              <v-col cols="12" sm="5" class="mb-0 py-0">
                                <v-autocomplete
                                  v-model="formDetails.product"
                                  :items="itemsProduct"
                                  :loading="isLoadingProduct"
                                  :search-input.sync="searchProduct"
                                  color="primary"
                                  item-text="name"
                                  item-value="id"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.ordinance.cols.product.title'
                                    )
                                  "
                                  class="font-weight-bold"
                                  outlined
                                  dense
                                  clearable
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="2" class="mb-0 py-0">
                                <v-text-field
                                  v-model="formDetails.qteDosage"
                                  color="primary"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.ordinance.cols.qteDosage.title'
                                    )
                                  "
                                  class="font-weight-bold ml-1"
                                  outlined
                                  dense
                                  type="number"
                                  :rules="[numberRuleQteServed]"
                                  min="0"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="4" class="mb-0 py-0">
                                <v-row>
                                  <v-col cols="12" sm="9">
                                    <v-autocomplete
                                      v-model="formDetails.dosage"
                                      :items="itemsDosage"
                                      :loading="isLoadingDosage"
                                      :search-input.sync="searchDosage"
                                      color="primary"
                                      item-text="title"
                                      item-value="id"
                                      :label="
                                        $vuetify.lang.t(
                                          '$vuetify.ordinance.cols.dosage.title'
                                        )
                                      "
                                      class="font-weight-bold"
                                      outlined
                                      dense
                                      clearable
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-btn
                                      class="mt-3"
                                      dark
                                      dense
                                      @click="createDosage()"
                                      color="primary"
                                      max-width="2px"
                                    >
                                      <v-icon dark> mdi-plus </v-icon>
                                    </v-btn>
                                  </v-col>
                                </v-row>
                              </v-col>
                              <v-col cols="12" sm="1" class="mb-0 py-0">
                                <v-tooltip top>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      color="primary"
                                      dark
                                      type="submit"
                                      dense
                                      v-on="on"
                                      class="font-weight-bold mr-5"
                                      max-width="1px"
                                      :disabled="
                                        formDetails.product === null ||
                                        formDetails.qteDosage === null ||
                                        formDetails.dosage === null
                                      "
                                    >
                                      <v-icon dark> mdi-content-save </v-icon>
                                      <!--{{ $vuetify.lang.t(messages.submit) }}-->
                                    </v-btn>
                                  </template>
                                  <span
                                    class="text-center font-weight-bold body-2 withe--text text--d ken-1"
                                  >
                                    {{
                                      $vuetify.lang.t(
                                        "$vuetify.bills.new.add_product"
                                      )
                                    }}
                                  </span>
                                </v-tooltip>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions style="margin-top: -45px">
                            <!--          <v-btn-->
                            <!--              :loading="loading.refresh"-->
                            <!--              @click="refreshItemsDetail()"-->
                            <!--              class="mr-2 my-2"-->
                            <!--              depressed-->
                            <!--              color="#f1f5fc"-->
                            <!--          >-->
                            <!--            <v-icon left color="primary">mdi-refresh</v-icon>-->
                            <!--            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
                            <!--          </v-btn>-->
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              @click="print()"
                              class="mr-2 my-2 white--test"
                              depressed
                              :loading="loadingBtn"
                              :disabled="this.itemsOrdinance.length === 0"
                            >
                              <v-icon left>mdi-printer</v-icon>
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.bills.new.print_bills"
                                )
                              }}
                            </v-btn>
                          </v-card-actions>
                          <v-divider></v-divider>
                        </v-form>
                        <v-card-text>
                          <v-data-table
                            :footer-props="{
                              'items-per-page-options': itemPerPageOptions,
                            }"
                            :headers="headersOrdinance"
                            :items="itemsOrdinance"
                            :items-per-page="itemPerPage"
                            :loading="loadingDetailsOrdinance.list"
                            :options.sync="pagination"
                            :server-items-length="meta.totalElements"
                            :sort-by="sortBy"
                            :sort-desc="sortDesc"
                            item-key="name"
                            class="mt-5"
                          >
                            <!-- <template v-slot:header.product_code="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template> -->
                            <template v-slot:header.product_name="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>

                            <template
                              v-slot:header.quantity_served="{ header }"
                            >
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:header.dosage="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <!--            <template v-slot:header.create_date="{ header }">-->
                            <!--              <tr>-->
                            <!--                {{-->
                            <!--                  $vuetify.lang.t(header.text)-->
                            <!--                }}-->
                            <!--              </tr>-->
                            <!--            </template>-->
                            <template v-slot:header.null="{ header }">
                              <tr>
                                {{
                                  $vuetify.lang.t(header.text)
                                }}
                              </tr>
                            </template>
                            <template v-slot:body="{ items }">
                              <v-hover>
                                <tbody slot-scope="{ hover }">
                                  <tr :key="item.id" v-for="item in items">
                                    <!-- <td class="subtitle-2">
                                      {{ item.product.code }}
                                    </td> -->
                                    <td class="subtitle-2">
                                      {{ item.product.name }}
                                    </td>

                                    <td class="subtitle-2">
                                      {{ item.qteDosage }}
                                    </td>
                                    <td class="subtitle-2">
                                      {{ item.dosage.title }}
                                    </td>
                                    <!--                  <td class="subtitle-2">-->
                                    <!--                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}-->
                                    <!--                  </td>-->
                                    <td class="subtitle-2" width="50px">
                                      <template>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="editDetails(item)"
                                              color="secondary"
                                              icon
                                              text
                                              v-on="on"
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-grease-pencil</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t("$vuetify.btn.edit")
                                          }}</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                          <template v-slot:activator="{ on }">
                                            <v-btn
                                              @click="deleteItemOrdinance(item)"
                                              color="red"
                                              icon
                                              text
                                              v-on="on"
                                              dark
                                              v-show="
                                                $vuetify.breakpoint.smAndDown ||
                                                hover
                                              "
                                            >
                                              <v-icon mdi-18px
                                                >mdi-delete-outline</v-icon
                                              >
                                            </v-btn>
                                          </template>
                                          <span>{{
                                            $vuetify.lang.t(
                                              "$vuetify.btn.remove"
                                            )
                                          }}</span>
                                        </v-tooltip>
                                      </template>
                                    </td>
                                  </tr>
                                </tbody>
                              </v-hover>
                            </template>
                          </v-data-table>
                          <form-dosage
                            :dialog="dialogFormDosage"
                            :form="form"
                            :messages="messagesDosage"
                            ref="dosageForm"
                          ></form-dosage>
                          <form-qte
                            :dialog="dialogFormQteDosage"
                            :form="form"
                            :messages="messagesQte"
                            ref="qteDosageForm"
                          ></form-qte>
                          <delete-item
                            :dialog="dialogDelete"
                            :messages="messagesDelete"
                            :urlItems="urlDeleteItems"
                            @getItems="getItemsDetailsOrdinance()"
                          ></delete-item>
                        </v-card-text>
                        <form-pdf
                          :dialog="dialogFormPdf"
                          ref="pdfForm"
                        ></form-pdf>
                      </v-card>
                      <br />
                      <!--                      <ordinance color="black" :id="this.$route.params.id"></ordinance>-->
                      <!--                      <v-textarea-->
                      <!--                          style="margin-top: 8px"-->
                      <!--                          dense-->
                      <!--                          :rows="2"-->
                      <!--                          outlined-->
                      <!--                          :label="-->
                      <!--                          $vuetify.lang.t(-->
                      <!--                            '$vuetify.ophtamologique.cols.decision.decision_ordinnance'-->
                      <!--                          )-->
                      <!--                        "-->
                      <!--                          v-model="form.decision_ordinnance"-->
                      <!--                          color="primary"-->
                      <!--                          class="font-weight-bold"-->
                      <!--                      ></v-textarea> -->
                    </v-col>

                    <!--                    <v-col cols="12" sm="12" class="mb-0 py-0">-->
                    <!--                      <v-textarea-->
                    <!--                        dense-->
                    <!--                        :rows="2"-->
                    <!--                        outlined-->
                    <!--                        :label="-->
                    <!--                          $vuetify.lang.t(-->
                    <!--                            '$vuetify.ophtamologique.cols.decision.decision_surgery'-->
                    <!--                          )-->
                    <!--                        "-->
                    <!--                        v-model="form.decision_surgery"-->
                    <!--                        color="primary"-->
                    <!--                        class="font-weight-bold"-->
                    <!--                      ></v-textarea> </v-col-->
                    <!--                    >-->
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.ophtamologique.cols.decision.decision_obervations'
                          )
                        "
                        v-model="form.decision_obervations"
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
              <v-card max-width="1020px" class="mt-2">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn @click="backTo" color="secondary">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn color="primary" @click="goToNextPage3" dark>
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
              <br />
            </v-stepper-content>
            <v-stepper-content step="3">
              <!--                  <v-card-actions style="margin-bottom: -5px">-->
              <!--                    <v-spacer></v-spacer>-->
              <!--                    <v-btn @click="closeModals">-->
              <!--                      {{ $vuetify.lang.t("$vuetify.btn.close") }}-->
              <!--                    </v-btn>-->
              <!--                    <v-btn @click="backTo">-->
              <!--                      {{ $vuetify.lang.t("$vuetify.btn.previous") }}-->
              <!--                    </v-btn>-->
              <!--                  </v-card-actions>-->
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.refraction.title") }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="1"> </v-col>
                        <v-col cols="9" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.spherical.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.cylinder.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.axis.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.va.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.distance_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vd_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.near_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            step="0.01"
                            type="number"
                            v-model="form.refraction_vn_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.refraction_vn_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <!-- <v-container class="mt-3"> -->
                <!-- <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.refraction.cols.VA_unaided.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.refraction.cols.VAW_correction.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4"> </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.refraction.cols.NVSPH_reads.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row> -->
                <!-- <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.refraction.cols.right_eye.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.right_eye_vas"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> -->
                <!--                                <v-subheader class="font-weight-bold">{{-->
                <!--                                    $vuetify.lang.t(-->
                <!--                                        "$vuetify.ophtamologique.cols.ta_dias.title"-->
                <!--                                    )-->
                <!--                                  }}</v-subheader>-->
                <!-- </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.right_eye_vaws"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4"> -->
                <!--                                <v-subheader class="font-weight-bold">{{-->
                <!--                                    $vuetify.lang.t(-->
                <!--                                        "$vuetify.ophtamologique.cols.poul.title"-->
                <!--                                    )-->
                <!--                                  }}</v-subheader>-->
                <!-- </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.right_eye_NVSPHR"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row> -->
                <!-- <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.refraction.cols.left_eye.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.left_eye_vas"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> -->
                <!--                                <v-subheader class="font-weight-bold">{{-->
                <!--                                    $vuetify.lang.t(-->
                <!--                                        "$vuetify.ophtamologique.cols.ta_dias.title"-->
                <!--                                    )-->
                <!--                                  }}</v-subheader>-->
                <!-- </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.left_eye_vaws"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4"> -->
                <!--                                <v-subheader class="font-weight-bold">{{-->
                <!--                                    $vuetify.lang.t(-->
                <!--                                        "$vuetify.ophtamologique.cols.poul.title"-->
                <!--                                    )-->
                <!--                                  }}</v-subheader>-->
                <!-- </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.left_eye_NVSPHR"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container> -->
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.subjective_refraction.title") }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="1"> </v-col>
                        <v-col cols="9" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.spherical.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.cylinder.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.axis.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.va.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.distance_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vd_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.near_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            step="0.01"
                            type="number"
                            v-model="form.vn_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.vn_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.patient_glass.title") }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="1"> </v-col>
                        <v-col cols="9" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.spherical.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.cylinder.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="5"> </v-col>
                        <v-col cols="7" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.axis.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6" class="mt-1">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.subjective_refraction.cols.va.title"
                            )
                          }}</v-subheader>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.distance_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vd_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.near_vision.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.right_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_spherical_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_spherical_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            step="0.01"
                            type="number"
                            v-model="form.gp_vn_cylinder_right_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_cylinder_right_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_axis_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_va_right_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row wrap style="margin-top: -15px">
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <!--                                <v-subheader class="font-weight-bold">{{-->
                      <!--                                    $vuetify.lang.t(-->
                      <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                      <!--                                    )-->
                      <!--                                  }}</v-subheader>-->
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-subheader class="font-weight-bold">{{
                        $vuetify.lang.t(
                          "$vuetify.subjective_refraction.cols.left_eye.title"
                        )
                      }}</v-subheader>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_spherical_left_eye_one"
                            color="primary"
                            class="font-weight-b old"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_spherical_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: 50px"
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_cylinder_left_eye_one"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_cylinder_left_eye_two"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -50px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_axis_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="2"
                      class="mb-0 py-0"
                      style="margin-left: -5px"
                    >
                      <v-row>
                        <v-col cols="6"> </v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            type="number"
                            v-model="form.gp_vn_va_left_eye"
                            color="primary"
                            class="font-weight-bold"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <br />
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.patient_glass.cols.type_material.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.type_material"
                            dense
                            color="primary"
                            :items="optionTM.typeTM"
                            deletable-chips
                            clearable
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
                              "$vuetify.patient_glass.cols.type_glass.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.type_glass"
                            dense
                            color="primary"
                            :items="optionTG.typeTG"
                            deletable-chips
                            clearable
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
                              "$vuetify.patient_glass.cols.glass_treatments.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.glass_treatments"
                            dense
                            multiple
                            color="primary"
                            :items="optionTT.typeTT"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    {{ this.form.glass_filter }}
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="4">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.patient_glass.cols.glass_filter.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.glass_filter"
                            dense
                            color="primary"
                            :items="optionTF.typeTF"
                            deletable-chips
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
                              "$vuetify.patient_glass.cols.type_solar.title"
                            )
                          }}</v-subheader>
                        </v-col>
                        <v-col cols="8">
                          <v-select
                            v-model="form.type_solar"
                            dense
                            color="primary"
                            :items="optionTS.typeTS"
                            deletable-chips
                            clearable
                            class="font-weight-bold"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" sm="10" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-btn
                        color="primary"
                        @click="print_glass()"
                        class="mr-2 my-2 white--test"
                        depressed
                        :loading="loadingBtn"
                      >
                        <v-icon left>mdi-printer</v-icon>
                        {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{
                    $vuetify.lang.t(
                      "$vuetify.other_refraction_informations.title"
                    )
                  }}
                </div>
                <v-col cols="12" class="mt-1">
                  <v-select
                    dense
                    v-model="form.other"
                    color="primary"
                    :items="optionOther.type_other"
                    class="font-weight-bold"
                    multiple
                    clearable
                  ></v-select>
                </v-col>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <div
                  class="title mb-5 white--text blue darken-5 text-center"
                  style="height: 30px; margin-top: 30px"
                >
                  {{ $vuetify.lang.t("$vuetify.refraction.observation") }}
                </div>
                <v-container class="mt-3">
                  <v-row wrap>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-textarea
                        dense
                        :rows="2"
                        outlined
                        v-model="form.refraction_observation"
                        color="primary"
                        class="font-weight-bold"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
              <v-card max-width="1020px" class="mt-2">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn @click="backTo1" color="secondary">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn color="primary" @click="goToNextPage4" dark>
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
              <br />
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-row wrap>
                <template>
                  <v-col class="mb-0 py-0" cols="12" sm="6">
                    <v-list two-line>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            {{ this.form.reason }}
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.reason.title"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                        <!-- <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold wrap-text">
                            <v-tooltip right v-if="this.form.reason">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.reason }}
                              </div>
                            </v-tooltip>
                            {{ this.form.reason }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.reason.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content> -->
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            class="body-1 font-weight-bold"
                            v-if="this.form.ta_sys_options"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.type_dias." +
                                  this.form.ta_sys_options
                              )
                            }}
                            / {{ this.form.ta_sys }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.ta_sys.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title
                            class="body-1 font-weight-bold"
                            v-if="this.form.ta_dias_options"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.type_dias." +
                                  this.form.ta_dias_options
                              )
                            }}
                            / {{ this.form.ta_dias }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.ta_dias.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.poul }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.poul.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.iop_od }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.iop_od.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.iop_og }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.iop_og.title"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>

                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.ODWC }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.acuity.ODWC"
                              )
                            }}
                            /
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.OGWC }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.acuity.OGWC"
                              )
                            }}
                            /
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.ODWTC }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.acuity.ODWTC"
                              )
                            }}
                            /
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            {{ this.form.OGWTC }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.acuity.OGWTC"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              <div style="display: inline">
                                <v-chip
                                  outlined
                                  label
                                  class="ma-1"
                                  v-for="content in this.form.symptoms"
                                  :key="content"
                                >
                                  {{ content }}
                                </v-chip>
                              </div>
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.interrogation.symptoms"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.other_symptoms }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.interrogation.other_symptoms"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.current_treatments }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.interrogation.current_treatments"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.eyelids_re }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.title"
                                )
                              }}
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.eyelids_re }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.conjunctiva_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.conjunctiva_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.conjunctiva_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.conjunctiva.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.conjunctiva_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.conjunctiva_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.conjunctiva_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.cornea_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.cornea_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.cornea_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.cornea.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.cornea_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.cornea_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.cornea_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip
                              right
                              v-if="this.form.anterior_chamber_re"
                            >
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.anterior_chamber_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.anterior_chamber_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.anterior_chamber.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip
                              right
                              v-if="this.form.anterior_chamber_le"
                            >
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.anterior_chamber_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.anterior_chamber_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.iris_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.iris_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.iris_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.iris.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.iris_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.iris_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.iris_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.pupil_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.pupil_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.pupil_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.pupil.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.pupil_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.pupil_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.pupil_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.crystalline_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.crystalline_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.crystalline_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.crystalline.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.crystalline_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.crystalline_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.crystalline_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.eom_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.eom_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.eom_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eom.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.eom_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.eom_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.eom_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.iop_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.iop_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.iop_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.iop.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.iop_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.iop_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.iop_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.cct_re">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.cct_re }}
                              </div>
                            </v-tooltip>
                            {{ this.form.cct_re }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.cct.title"
                              )
                            }}
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                          <v-list-item-title class="body-1 font-weight-bold">
                            <v-tooltip right v-if="this.form.cct_le">
                              <template v-slot:activator="{ on }">
                                <v-icon v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <div
                                style="width: 300px"
                                class="text-center font-weight-bold body-2 white--text text--d ken-1"
                              >
                                {{ this.form.cct_le }}
                              </div>
                            </v-tooltip>
                            {{ this.form.cct_le }}
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE"
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                    </v-list>
                  </v-col>
                  <v-col class="mb-0 py-0" cols="12" sm="6">
                    <v-list two-line>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.diagnostic_impressions }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.consultation.titleDiagnosticImpressions"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider
                      ><v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.diagnostic_other }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_other"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsDiagnosticOd"
                                :key="content.id"
                              >
                                {{ content.diagnostic.title }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_od"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsDiagnosticOg"
                                :key="content.id"
                              >
                                {{ content.diagnostic.title }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_og"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsInvestigation"
                                :key="content.id"
                              >
                                {{ content.exam_investigation.title }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.exam_investigation.title"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.items"
                                :key="content.id"
                              >
                                {{
                                  content.laboratory
                                    ? content.laboratory.title
                                    : "-"
                                }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.decision.exam_labo"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsSurgery"
                                :key="content.id"
                              >
                                {{ content.surgery.title }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.decision.decision_surgery"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsRadiography"
                                :key="content.id"
                              >
                                {{ content.radiography.title }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{ $vuetify.lang.t("$vuetify.radiography.title") }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-card-text class="body-1 font-weight-bold">
                            <div style="display: inline">
                              <v-chip
                                outlined
                                label
                                class="ma-1"
                                v-for="content in this.itemsOrdinance"
                                :key="content.id"
                              >
                                {{ content.product.name }}
                              </v-chip>
                            </div>
                          </v-card-text>
                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: -25px"
                          >
                            {{ $vuetify.lang.t("$vuetify.ordinance.title") }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.decision_obervations }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.decision.decision_obervations"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-tooltip bottom color="grey">
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">
                                mdi-plus-circle-outline
                              </v-icon>
                            </template>
                            <div
                              style="width: 650px; height: 200px"
                              class="text-center font-weight-bold body-2 white--text text--d ken-1"
                            >
                              <v-container class="mt-3">
                                <v-row wrap>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.spherical.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                      <v-col cols="4"> </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.cylinder.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="5"> </v-col>
                                      <v-col cols="7" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.axis.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="4"> </v-col>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.va.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.distance_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_axis_right_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.refraction_vd_va_right_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vd_axis_left_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.refraction_vd_va_left_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.near_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_axis_right_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.refraction_vn_va_right_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .refraction_vn_axis_left_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.refraction_vn_va_left_eye
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </div>
                          </v-tooltip>

                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: 5px"
                          >
                            {{ $vuetify.lang.t("$vuetify.refraction.title") }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-tooltip bottom color="grey">
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">
                                mdi-plus-circle-outline
                              </v-icon>
                            </template>
                            <div
                              style="width: 650px; height: 200px"
                              class="text-center font-weight-bold body-2 white--text text--d ken-1"
                            >
                              <v-container class="mt-3">
                                <v-row wrap>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.spherical.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                      <v-col cols="4"> </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.cylinder.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="5"> </v-col>
                                      <v-col cols="7" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.axis.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="4"> </v-col>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.va.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.distance_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vd_axis_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vd_va_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vd_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vd_axis_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vd_va_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.near_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vn_axis_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vn_va_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form.vn_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vn_axis_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.vn_va_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </div>
                          </v-tooltip>

                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: 5px"
                          >
                            {{
                              $vuetify.lang.t(
                                "$vuetify.subjective_refraction.title"
                              )
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-layout row wrap align-center justify-center>
                          <v-tooltip bottom color="grey">
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">
                                mdi-plus-circle-outline
                              </v-icon>
                            </template>
                            <div
                              style="width: 650px; height: 200px"
                              class="text-center font-weight-bold body-2 white--text text--d ken-1"
                            >
                              <v-container class="mt-3">
                                <v-row wrap>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.spherical.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                      <v-col cols="4"> </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.cylinder.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="5"> </v-col>
                                      <v-col cols="7" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.axis.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="4"> </v-col>
                                      <v-col cols="8" class="mt-1">
                                        <v-subheader class="font-weight-bold">{{
                                          $vuetify.lang.t(
                                            "$vuetify.subjective_refraction.cols.va.title"
                                          )
                                        }}</v-subheader>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.distance_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vd_axis_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vd_va_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vd_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vd_axis_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vd_va_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.near_vision.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.right_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_spherical_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_spherical_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_cylinder_right_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_cylinder_right_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vn_axis_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vn_va_right_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                <v-row wrap style="margin-top: -15px">
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <!--                                <v-subheader class="font-weight-bold">{{-->
                                    <!--                                    $vuetify.lang.t(-->
                                    <!--                                        "$vuetify.subjective_refraction.cols.distance_vision.title"-->
                                    <!--                                    )-->
                                    <!--                                  }}</v-subheader>-->
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-subheader class="font-weight-bold">{{
                                      $vuetify.lang.t(
                                        "$vuetify.subjective_refraction.cols.left_eye.title"
                                      )
                                    }}</v-subheader>
                                  </v-col>
                                  <v-col cols="12" sm="2" class="mb-0 py-0">
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_spherical_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_spherical_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: 50px"
                                  >
                                    <v-row>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_cylinder_left_eye_one
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{
                                            this.form
                                              .gp_vn_cylinder_left_eye_two
                                          }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -50px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vn_axis_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    sm="2"
                                    class="mb-0 py-0"
                                    style="margin-left: -5px"
                                  >
                                    <v-row>
                                      <v-col cols="6"> </v-col>
                                      <v-col cols="6" class="mt-3">
                                        <v-list-item-title
                                          class="body-1 font-weight-bold"
                                        >
                                          {{ this.form.gp_vn_va_left_eye }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </div>
                          </v-tooltip>

                          <v-card-subtitle
                            primary-title
                            class="layout justify-left"
                            style="margin-top: 5px"
                          >
                            {{
                              $vuetify.lang.t("$vuetify.patient_glass.title")
                            }}
                          </v-card-subtitle>
                        </v-layout>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              <div style="display: inline">
                                <v-chip
                                  outlined
                                  label
                                  class="ma-1"
                                  v-for="content in this.form.other"
                                  :key="content"
                                >
                                  {{ content }}
                                </v-chip>
                              </div>
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.other_refraction_informations.title"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item>
                        <v-list-item-content>
                          <v-layout row wrap align-center justify-center>
                            <v-card-text class="body-1 font-weight-bold">
                              {{ this.form.refraction_observation }}
                            </v-card-text>
                            <v-card-subtitle
                              primary-title
                              class="layout justify-left"
                              style="margin-top: -25px"
                            >
                              {{
                                $vuetify.lang.t(
                                  "$vuetify.refraction.observation"
                                )
                              }}
                            </v-card-subtitle>
                          </v-layout>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>

                      <!--                  <v-list-item>-->
                      <!--                    <v-list-item-content>-->
                      <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                      <!--                        {{-->
                      <!--                          claim.sla_violation_date-->
                      <!--                            ? formatCreated(-->
                      <!--                                claim.sla_violation_date-->
                      <!--                                  .replace("T", " ")-->
                      <!--                                  .replace("Z", "")-->
                      <!--                              )-->
                      <!--                            : "-"-->
                      <!--                        }}-->
                      <!--                      </v-list-item-title>-->
                      <!--                      <v-list-item-subtitle-->
                      <!--                        >{{-->
                      <!--                          $vuetify.lang.t(-->
                      <!--                            "$vuetify.claim.cols.sla_violation_date.title"-->
                      <!--                          )-->
                      <!--                        }}-->
                      <!--                      </v-list-item-subtitle>-->
                      <!--                    </v-list-item-content>-->
                      <!--                  </v-list-item>-->
                      <!--                  <v-divider></v-divider>-->
                    </v-list>
                  </v-col>
                  <!--              <v-col class="mb-0 py-0" cols="12" sm="12">-->
                  <!--                <v-list two-line>-->
                  <!--                  <v-list-item>-->
                  <!--                    <v-list-item-content>-->
                  <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                  <!--                        {{ claim.relaunch_resume }}-->
                  <!--                      </v-list-item-title>-->
                  <!--                      <v-list-item-subtitle-->
                  <!--                        >{{-->
                  <!--                          $vuetify.lang.t(-->
                  <!--                            "$vuetify.claim.cols.relaunch_resume.title"-->
                  <!--                          )-->
                  <!--                        }}-->
                  <!--                      </v-list-item-subtitle>-->
                  <!--                    </v-list-item-content>-->
                  <!--                  </v-list-item>-->
                  <!--                  <v-divider></v-divider>-->
                  <!--                </v-list>-->
                  <!--              </v-col>-->
                </template>
                <!--            <template v-if="havePayment">-->
                <!--              <v-col class="mb-0 py-0 my-9" cols="12" sm="12">-->
                <!--                <div class="title font-weight-bold">-->
                <!--                  {{-->
                <!--                    $vuetify.lang.t("$vuetify.claim.subHeader.create.title2")-->
                <!--                  }}-->
                <!--                </div>-->
                <!--                <v-divider></v-divider>-->
                <!--              </v-col>-->
                <!--              <v-col class="mb-0 py-0" cols="12" sm="6">-->
                <!--                <v-list two-line>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.name }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.name.title2")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.birthdate }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.birthdate.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.cni }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.cni.title2")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.residence }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.residence.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.deposit_phone_number }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.deposit_phone_number.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.spinneret }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.spinneret.title"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.nature_of_costs }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.nature_of_costs.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.discharge }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.discharge.title"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        <span v-if="claim.transferred">-->
                <!--                          <span v-if="claim.status">-->
                <!--                            <v-chip-->
                <!--                                color="teal"-->
                <!--                                label-->
                <!--                                style="height: 20px !important; text-align: center; padding-right: 10px; padding-left: 10px"-->
                <!--                                text-color="white"-->
                <!--                            >{{-->
                <!--                                $vuetify.lang.t(-->
                <!--                                    "$vuetify.payment.cols.status.answer"-->
                <!--                                )-->
                <!--                              }}</v-chip-->
                <!--                            >-->
                <!--                          </span>-->
                <!--                          <span v-else>-->
                <!--                            <v-chip-->
                <!--                                color="red"-->
                <!--                                label-->
                <!--                                style="height: 25px !important; text-align: center; padding-right: 7px; padding-left: 7px"-->
                <!--                                text-color="white"-->
                <!--                            >{{-->
                <!--                                $vuetify.lang.t(-->
                <!--                                    "$vuetify.payment.cols.status.no_answer"-->
                <!--                                )-->
                <!--                              }}</v-chip-->
                <!--                            >-->
                <!--                          </span>-->
                <!--                        </span>-->
                <!--                        <span v-else>-->
                <!--                          <v-chip-->
                <!--                              color="orange"-->
                <!--                              label-->
                <!--                              style="height: 20px !important; text-align: center; padding-right: 16px; padding-left: 16px"-->
                <!--                              text-color="white"-->
                <!--                          >-->
                <!--                            {{-->
                <!--                              $vuetify.lang.t(-->
                <!--                                  "$vuetify.payment.cols.status.none"-->
                <!--                              )-->
                <!--                            }}-->
                <!--                          </v-chip>-->
                <!--                        </span>-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.status.title")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                </v-list>-->
                <!--              </v-col>-->
                <!--              <v-col class="mb-0 py-0" cols="12" sm="6">-->
                <!--                <v-list two-line>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.email }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.email.title2")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.birthplace }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.birthplace.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.date_of_issue }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.date_of_issue.title2"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.phone }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.phone.title2")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.faculty }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.faculty.title")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.level }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.level.title")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.amount }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t("$vuetify.payment.cols.amount.title2")-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        {{ claim.payment.registration_number }}-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.registration_number.title"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                  <v-list-item>-->
                <!--                    <v-list-item-content>-->
                <!--                      <v-list-item-title class="body-1 font-weight-bold">-->
                <!--                        <span v-if="claim.transferred">-->
                <!--                          <span-->
                <!--                              v-if="claim.status && claim.payment.send_to_student"-->
                <!--                          >-->
                <!--                            <v-chip-->
                <!--                                color="teal"-->
                <!--                                label-->
                <!--                                style="height: 20px !important; text-align: center; padding-right: 10px; padding-left: 10px"-->
                <!--                                text-color="white"-->
                <!--                            >{{-->
                <!--                                $vuetify.lang.t(-->
                <!--                                    "$vuetify.payment.cols.send_to_student.answer"-->
                <!--                                )-->
                <!--                              }}</v-chip-->
                <!--                            >-->
                <!--                          </span>-->
                <!--                          <span v-else>-->
                <!--                            <v-chip-->
                <!--                                color="red"-->
                <!--                                label-->
                <!--                                style="height: 25px !important; text-align: center; padding-right: 7px; padding-left: 7px"-->
                <!--                                text-color="white"-->
                <!--                            >{{-->
                <!--                                $vuetify.lang.t(-->
                <!--                                    "$vuetify.payment.cols.send_to_student.no_answer"-->
                <!--                                )-->
                <!--                              }}</v-chip-->
                <!--                            >-->
                <!--                          </span>-->
                <!--                        </span>-->
                <!--                        <span v-else>-->
                <!--                          <v-chip-->
                <!--                              color="orange"-->
                <!--                              label-->
                <!--                              style="height: 20px !important; text-align: center; padding-right: 16px; padding-left: 16px"-->
                <!--                              text-color="white"-->
                <!--                          >-->
                <!--                            {{-->
                <!--                              $vuetify.lang.t(-->
                <!--                                  "$vuetify.payment.cols.send_to_student.none"-->
                <!--                              )-->
                <!--                            }}-->
                <!--                          </v-chip>-->
                <!--                        </span>-->
                <!--                      </v-list-item-title>-->
                <!--                      <v-list-item-subtitle-->
                <!--                      >{{-->
                <!--                          $vuetify.lang.t(-->
                <!--                              "$vuetify.payment.cols.send_to_student.title"-->
                <!--                          )-->
                <!--                        }}-->
                <!--                      </v-list-item-subtitle>-->
                <!--                    </v-list-item-content>-->
                <!--                  </v-list-item>-->
                <!--                  <v-divider></v-divider>-->
                <!--                </v-list>-->
                <!--              </v-col>-->
                <!--            </template>-->
              </v-row>

              <v-card max-width="1020px" class="mt-2">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn @click="backTo2" color="secondary">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn
                    color="secondary"
                    @click="printConsultation()"
                    class="mr-2 my-2 white--test"
                    :loading="loadingBtn"
                    depressed
                  >
                    <v-icon left>mdi-printer</v-icon>
                    {{ $vuetify.lang.t("$vuetify.payslips.new.simulate") }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    :loading="loadingBt"
                    dark
                    type="submit"
                  >
                    {{ $vuetify.lang.t(messages.submit) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
              <br />
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-card>
    <form-patient :dialog="dialogForm"></form-patient>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
import ListMixin from "./../../mixins/Common/List.vue";
import FormPatient from "./FormPatient";
import DeleteItem from "./../Common/DeleteDetails";
import FormQte from "../ordinance/FormQte";
import FormDosage from "../ordinance/FormDosage";
// import Ordinance from "./FormOrdinance";
// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin, ListMixin],
  props: {
    endDate: {
      type: Date, // Date.parse(this.endDate)
    },
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
          background: null,
          poul: null,
          reason: null,
          patient: null,
          doctor: null,
          consultation: null,
          consult: null,
          ta_sys: null,
          ta_sys_options: null,
          ta_dias: null,
          ta_dias_options: null,
          iop_od: null,
          left_eye_vas: null,
          left_eye_vaws: null,
          left_eye_NVSPHR: null,
          right_eye_vas: null,
          right_eye_vaws: null,
          right_eye_NVSPHR: null,
          refraction_observation: null,
          gp_vn_va_left_eye: null,
          gp_vn_axis_left_eye: null,
          gp_vn_cylinder_left_eye_two: null,
          gp_vn_cylinder_left_eye_one: null,
          gp_vn_spherical_left_eye_two: null,
          gp_vn_spherical_left_eye_one: null,
          gp_vn_va_right_eye: null,
          gp_vn_axis_right_eye: null,
          gp_vn_cylinder_right_eye_two: null,
          gp_vn_cylinder_right_eye_one: null,
          gp_vn_spherical_right_eye_two: null,
          gp_vn_spherical_right_eye_one: null,
          gp_vd_va_left_eye: null,
          gp_vd_axis_left_eye: null,
          gp_vd_cylinder_left_eye_two: null,
          gp_vd_cylinder_left_eye_one: null,
          gp_vd_spherical_left_eye_two: null,
          gp_vd_spherical_left_eye_one: null,
          gp_vd_va_right_eye: null,
          gp_vd_axis_right_eye: null,
          gp_vd_cylinder_right_eye_two: null,
          gp_vd_cylinder_right_eye_one: null,
          gp_vd_spherical_right_eye_two: null,
          gp_vd_spherical_right_eye_one: null,
          vn_va_left_eye: null,
          vn_axis_left_eye: null,
          vn_cylinder_left_eye_two: null,
          vn_cylinder_left_eye_one: null,
          vn_spherical_left_eye_two: null,
          vn_spherical_left_eye_one: null,
          vn_va_right_eye: null,
          vn_axis_right_eye: null,
          vn_cylinder_right_eye_two: null,
          vn_cylinder_right_eye_one: null,
          vn_spherical_right_eye_two: null,
          vn_spherical_right_eye_one: null,
          vd_va_left_eye: null,
          vd_axis_left_eye: null,
          vd_cylinder_left_eye_two: null,
          vd_cylinder_left_eye_one: null,
          vd_spherical_left_eye_two: null,
          vd_spherical_left_eye_one: null,
          vd_va_right_eye: null,
          vd_axis_right_eye: null,
          vd_cylinder_right_eye_two: null,
          vd_cylinder_right_eye_one: null,
          vd_spherical_right_eye_two: null,
          vd_spherical_right_eye_one: null,
          refraction_vn_va_left_eye: null,
          refraction_vn_axis_left_eye: null,
          refraction_vn_cylinder_left_eye_two: null,
          refraction_vn_cylinder_left_eye_one: null,
          refraction_vn_spherical_left_eye_two: null,
          refraction_vn_spherical_left_eye_one: null,
          refraction_vn_va_right_eye: null,
          refraction_vn_axis_right_eye: null,
          refraction_vn_cylinder_right_eye_two: null,
          refraction_vn_cylinder_right_eye_one: null,
          refraction_vn_spherical_right_eye_two: null,
          refraction_vn_spherical_right_eye_one: null,
          refraction_vd_va_left_eye: null,
          refraction_vd_axis_left_eye: null,
          refraction_vd_cylinder_left_eye_two: null,
          refraction_vd_cylinder_left_eye_one: null,
          refraction_vd_spherical_left_eye_two: null,
          refraction_vd_spherical_left_eye_one: null,
          refraction_vd_va_right_eye: null,
          refraction_vd_axis_right_eye: null,
          refraction_vd_cylinder_right_eye_two: null,
          refraction_vd_cylinder_right_eye_one: null,
          refraction_vd_spherical_right_eye_two: null,
          refraction_vd_spherical_right_eye_one: null,
          iop_og: null,
          ODWC: null,
          OGWC: null,
          ODWTC: null,
          OGWTC: null,
          symptoms: null,
          other: null,
          other_symptoms: null,
          current_treatments: null,
          eyelids_re: null,
          type_glass: null,
          type_material: null,
          glass_treatments: null,
          glass_filter: null,
          type_solar: null,
          eyelids_le: null,
          conjunctiva_re: null,
          conjunctiva_le: null,
          cornea_re: null,
          cornea_le: null,
          anterior_chamber_re: null,
          anterior_chamber_le: null,
          iris_re: null,
          iris_le: null,
          pupil_re: null,
          pupil_le: null,
          crystalline_re: null,
          crystalline_le: null,
          eom_re: null,
          eom_le: null,
          iop_re: null,
          iop_le: null,
          cct_re: null,
          cct_le: null,
          diagnostic_impressions: null,
          diagnostic_od: null,
          diagnostic_og: null,
          diagnostic_other: null,
          decision_exam_labo: null,
          decision_obervations: null,
          decision_ordinnance: null,
          decision_surgery: null,
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
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogFormDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormQteDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormLabo: {
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
          dosage: null,
          qteDosage: null,
          product: null,
        };
      },
    },
    urlItemsDetailsConsultation: "details_laboratories/details_consultation",
    isLoadingLaboratory: false,
    searchLaboratory: null,
    itemsLaboratory: [],
    urlLaboratory: "laboratories/all",
    isLoadingSurgery: false,
    searchSurgery: null,
    urlSurgery: "surgeries/all",
    isLoadingRadiography: false,
    searchRadiography: null,
    urlRadiography: "radiographs",
    isLoadingInvestigation: false,
    searchInvestigation: null,
    urlInvestigation: "exam_investigations",
    isLoadingDiagnostic: false,
    isLoadingDiagnosticOd: false,
    isLoadingDiagnosticOg: false,

    searchDiagnostic: null,
    searchDiagnosticOd: null,

    searchDiagnosticOg: null,

    urlDiagnostic: "diagnostics",
    headers: [],
    items: [],
    itemsSurg: [],
    itemsDiagnostic: [],
    itemsDiagOd: [],
    itemsDiagOg: [],
    itemsDiag: [],
    itemsInvest: [],
    itemsRadio: [],
    itemsProduct: [],
    isLoadingProduct: false,
    searchProduct: null,
    urlProduct: "products/specify",
    urlDeleteItems: "",
    sortDesc: true,
    dialogFormPermit: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    dialogDeleteLabo: {
      show: false,
    },
    dialogDeleteDiagnosticOg: {
      show: false,
    },
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
    isEnded: null,
    sortBy: ["id"],
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingBt: false,
    loadingBtn: false,
    loadingOrdinance: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    urlItemsLabo: "laboratory_patients",
    urlItemsDetails_labo: "details_laboratories",
    urlItemsDetails_radiography: "details_radiographs",
    urlItemsDetails_diagnostic: "details_diagnostics",
    urlItemsDetails_invest: "details_exam_investigations",
    urlItemsDetails_surgery: "details_surgeries",
    urlItemsDetails_ordinance: "details_ordinances",
    urlItemsDetailsConsultPrint: "/details_consultations",
    maxDate: new Date().toISOString().substr(0, 10),
    categoryBackgrounds: [],
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
        tbs: "",
        descriptionBm: "",
        descriptionBs: "",
        OOD: "",
        OOG: "",
        otherBackOpht: "",
        descriptionFamily: "",
        descriptionAllergy: "",
      },
    },
    show: false,
    showMedical: false,
    showSurgical: false,
    showFamily: false,
    showAllergy: false,
    urlQteDosage: "qte_dosages",
    urlDosage: "dosages",
    isLoadingQteDosage: false,
    isLoadingDosage: false,
    itemsDosage: [],
    itemsQteDosage: [],
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
    optionTG: {
      typeTG: [],
    },
    optionTT: {
      typeTT: [],
    },
    optionTF: {
      typeTF: [],
    },
    optionTS: {
      typeTS: [],
    },
    optionTM: {
      typeTM: [],
    },
    optionTBS: {
      typeTBS: [],
    },
    optionOP: {
      typeOP: [],
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    e1: 1,
    optionSymptoms: {
      type_symptoms: [],
    },
    optionsAC: {
      type_ac: [],
    },
    optionOther: {
      type_other: [],
    },
    optionsTa: {
      type_Ta: [],
    },
    textFields: [],
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
    searchQteDosage: null,
    searchDosage: null,
    itemsPatient: [],
    itemsDoctor: [],
  }),
  watch: {
    searchProduct(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingProduct = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingProduct = false));
    },
    searchQteDosage(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingQteDosage = true;
      this.$store
        .dispatch("request", {
          url: self.urlQteDosage,
          params: params,
        })
        .then((response) => {
          self.itemsQteDosage = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingQteDosage = false));
    },
    searchDosage(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDosage = true;
      this.$store
        .dispatch("request", {
          url: self.urlDosage,
          params: params,
        })
        .then((response) => {
          self.itemsDosage = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingDosage = false));
    },
    searchLaboratory(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingLaboratory = true;
      this.$store
        .dispatch("request", {
          url: self.urlLaboratory,
          params: params,
        })
        .then((response) => {
          self.itemsLaboratory = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingLaboratory = false));
    },
    searchDiagnostic(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDiagnostic = true;
      this.$store
        .dispatch("request", {
          url: self.urlDiagnostic,
          params: params,
        })
        .then((response) => {
          self.itemsDiag = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingDiagnostic = false));
    },

    searchDiagnosticOd(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDiagnosticOd = true;
      this.$store
        .dispatch("request", {
          url: self.urlDiagnostic,
          params: params,
        })
        .then((response) => {
          self.itemsDiagOd = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingDiagnosticOd = false));
    },

    searchDiagnosticOg(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDiagnosticOg = true;
      this.$store
        .dispatch("request", {
          url: self.urlDiagnostic,
          params: params,
        })
        .then((response) => {
          self.itemsDiagOg = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingDiagnosticOg = false));
    },
    searchInvestigation(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingInvestigation = true;
      this.$store
        .dispatch("request", {
          url: self.urlInvestigation,
          params: params,
        })
        .then((response) => {
          self.itemsInvest = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingInvestigation = false));
    },
    searchRadiography(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingRadiography = true;
      this.$store
        .dispatch("request", {
          url: self.urlRadiography,
          params: params,
        })
        .then((response) => {
          self.itemsRadio = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingRadiography = false));
    },
    searchSurgery(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingSurgery = true;
      this.$store
        .dispatch("request", {
          url: self.urlSurgery,
          params: params,
        })
        .then((response) => {
          self.itemsSurg = response.data.content;
          // console.log(response.data.content);
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
    this.getOptionsTa();
    this.getOptionsCategory();
    this.getOptionsTBM();
    this.getOptionsTG();
    this.getOptionsTT();
    this.getOptionsTF();
    this.getOptionsTS();
    this.getOptionsTM();
    this.getOptionsTBS();
    this.getOptionsOP();
    this.getOptionsSymptoms();
    this.getOptionsAC();
    this.getOptionsOther();
    this.setHeaders();
    this.setHeadersOrdiance();
  },
  mounted() {
    // this.tick()
    // this.timer = setInterval(this.tick.bind(this), 1000)
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    // updateRemaining (distance) {
    //   this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
    //   this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    //   this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    //   this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
    // },

    // tick () {
    //   const currentTime = new Date()
    //   const distance = Math.max(this.endDate - currentTime, 0)
    //   this.updateRemaining(distance)

    //   if (distance === 0) {
    //     clearInterval(this.timer)
    //     this.isEnded = true
    //   }
    // },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.laboratory.cols.results.title",
        //   value: "results",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.normal_value.title",
        //   value: "normal_value",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.interpretation.title",
        //   value: "interpretation",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.conclusion.title",
        //   value: "conclusion",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "80",
        },
      ];
    },
    setHeadersOrdiance() {
      this.headersOrdinance = [
        // {
        //   text: "$vuetify.bills.cols.product_code.title",
        //   value: "product_code",
        //   align: "start",
        //   sortable: false,
        //   width: "20",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.ordinance.cols.dosage.title",
          value: "dosage",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.laboratory.cols.results.title",
        //   value: "results",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.normal_value.title",
        //   value: "normal_value",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.interpretation.title",
        //   value: "interpretation",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.conclusion.title",
        //   value: "conclusion",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "80",
        },
      ];
    },
    createQteDosage() {
      this.dialogFormQteDosage.show = true;
      this.messagesQte = {
        title: "$vuetify.qteDosage.new.title",
        submit: "$vuetify.qteDosage.new.submit",
        success: "$vuetify.qteDosage.new.success",
      };
    },
    createDosage() {
      this.dialogFormDosage.show = true;
      this.messagesDosage = {
        title: "$vuetify.dosage.new.title",
        submit: "$vuetify.dosage.new.submit",
        success: "$vuetify.dosage.new.success",
      };
    },
    getDataFormdetails() {
      let data = {
        product:
          this.formDetails.id === undefined
            ? this.formDetails.product
            : this.formDetails.product["id"],
        qteDosage: this.formDetails.qteDosage,
        consultation: this.form.consultation,
        details_consultation: this.form.consult,
        dosage:
          this.formDetails.id === undefined
            ? this.formDetails.dosage
            : this.formDetails.dosage["id"],
      };

      return data;
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    printConsultation() {
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethodDetail(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$emit("getItems");
          });
      }
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      if (!self.$v.$invalid) {
        this.loadingBtn = true;
        this.$store
          .dispatch("request", {
            url:
              self.urlItemsDetailsConsultPrint +
              "/print" +
              "?consultation=" +
              this.form.id,
            method: "GET",
            data: self.getDataForm(),
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingBtn = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    print() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetails_ordinance + "/print",
            method: "POST",
            data: self.getDataFormdetails(),
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
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
    print_glass() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetails_ordinance + "/print" + "?type=glass",
            method: "POST",
            data: self.getDataFormdetails(),
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
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
    closeModals() {
      this.dialog.show = false;
      this.e1 = 1;
    },
    goToNextPage2() {
      this.e1 = 2;
    },
    goToNextPage3() {
      this.e1 = 3;
    },
    goToNextPage4() {
      this.e1 = 4;
    },
    backTo() {
      this.e1 = 1;
    },
    backTo1() {
      this.e1 = 2;
    },
    backTo2() {
      this.e1 = 3;
    },
    backTo3() {
      this.e1 = 4;
    },
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getRoute() {
      if (this.form.consult) {
        return this.urlItems + "/" + this.form.consult;
      } else {
        return this.urlItems;
      }
    },

    // deleteItemLaboratory(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_labo + "/" + item.id;
    //   this.dialogDeleteLabo.show = true;
    // },
    // deleteItemRadiography(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_radiography + "/" + item.id;
    //   this.dialogDelete.show = true;
    // },
    // deleteItemSurgery(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_surgery + "/" + item.id;
    //   this.dialogDelete.show = true;
    // },
    // // deleteItemInvest(item) {
    // //   this.urlDeleteItems = this.urlItemsDetails_invest + "/" + item.id;
    // //   this.dialogDelete.show = true;
    // // },
    // deleteItemDiagnosticOg(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_diagnostic + "/" + item.id;
    //   this.dialogDeleteDiagnosticOg.show = true;
    // },
    // deleteItemDiagnosticOd(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_diagnostic + "/" + item.id;
    //   this.dialogDelete.show = true;
    // },
    // deleteItemOrdinance(item) {
    //   this.urlDeleteItems = this.urlItemsDetails_ordinance + "/" + item.id;
    //   this.dialogDelete.show = true;
    // },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.resetDataForm();
    },
    resetDataForm() {
      this.categoryBackgrounds = [];
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
    addColumnCategoryBackground() {
      this.categoryBackgrounds.push({ ...this.optionsCategoryBackground.text });
    },
    removeColumnCategoryBackground(index) {
      this.categoryBackgrounds.splice(index, 1);
    },
    getdatetime_start(val) {
      this.form.start_appointment_date = val;
    },
    getdatetime_end(val) {
      this.form.end_appointment_date = val;
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
    getOptionsTM() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_material, (typeTM) => {
        self.optionTM.typeTM.push({
          text: self.$vuetify.lang.t(typeTM.text),
          value: typeTM.value,
        });
      });
    },
    getOptionsTG() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_glass, (typeTG) => {
        self.optionTG.typeTG.push({
          text: self.$vuetify.lang.t(typeTG.text),
          value: typeTG.value,
        });
      });
    },
    getOptionsTT() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.glass_treatments, (typeTT) => {
        self.optionTT.typeTT.push({
          text: self.$vuetify.lang.t(typeTT.text),
          value: typeTT.value,
        });
      });
    },
    getOptionsTF() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.filter, (typeTF) => {
        self.optionTF.typeTF.push({
          text: self.$vuetify.lang.t(typeTF.text),
          value: typeTF.value,
        });
      });
    },
    getOptionsTS() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_solar, (typeTS) => {
        self.optionTS.typeTS.push({
          text: self.$vuetify.lang.t(typeTS.text),
          value: typeTS.value,
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
    getOptionsCategory() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.categoryOpht, (typeCategory) => {
        self.optionCategory.typeCategory.push({
          text: self.$vuetify.lang.t(typeCategory.text),
          value: typeCategory.value,
        });
      });
    },
    getOptionsOP() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.op, (typeOP) => {
        self.optionOP.typeOP.push({
          text: self.$vuetify.lang.t(typeOP.text),
          value: typeOP.value,
        });
      });
    },
    getOptionsSymptoms() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.symptoms, (type_symptoms) => {
        self.optionSymptoms.type_symptoms.push({
          text: self.$vuetify.lang.t(type_symptoms.text),
          value: type_symptoms.value,
        });
      });
    },
    getOptionsAC() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.acuity, (type_ac) => {
        self.optionsAC.type_ac.push({
          text: self.$vuetify.lang.t(type_ac.text),
          value: type_ac.value,
        });
      });
    },
    getOptionsOther() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.others, (type_other) => {
        self.optionOther.type_other.push({
          text: self.$vuetify.lang.t(type_other.text),
          value: type_other.value,
        });
      });
    },
    getOptionsTa() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.sys_options, (type_Ta) => {
        self.optionsTa.type_Ta.push({
          text: self.$vuetify.lang.t(type_Ta.text),
          value: type_Ta.value,
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
        ta_sys: this.form.ta_sys,
        decision_obervations: this.form.decision_obervations,
        ta_sys_options: this.form.ta_sys_options,
        consultation: this.form.consultation,
        details_consultation: this.form.consult,
        ta_dias: this.form.ta_dias,
        ta_dias_options: this.form.ta_dias_options,
        iop_od: this.form.iop_od,
        iop_og: this.form.iop_og,
        left_eye_vas: this.form.left_eye_vas,
        left_eye_vaws: this.form.left_eye_vaws,
        left_eye_NVSPHR: this.form.left_eye_NVSPHR,
        right_eye_vas: this.form.right_eye_vas,
        right_eye_vaws: this.form.right_eye_vaws,
        right_eye_NVSPHR: this.form.right_eye_NVSPHR,
        refraction_observation: this.form.refraction_observation,
        gp_vn_va_left_eye: this.form.gp_vn_va_left_eye,
        gp_vn_axis_left_eye: this.form.gp_vn_axis_left_eye,
        gp_vn_cylinder_left_eye_two: this.form.gp_vn_cylinder_left_eye_two,
        gp_vn_cylinder_left_eye_one: this.form.gp_vn_cylinder_left_eye_one,
        gp_vn_spherical_left_eye_two: this.form.gp_vn_spherical_left_eye_two,
        gp_vn_spherical_left_eye_one: this.form.gp_vn_spherical_left_eye_one,
        gp_vn_va_right_eye: this.form.gp_vn_va_right_eye,
        gp_vn_axis_right_eye: this.form.gp_vn_axis_right_eye,
        gp_vn_cylinder_right_eye_two: this.form.gp_vn_cylinder_right_eye_two,
        gp_vn_cylinder_right_eye_one: this.form.gp_vn_cylinder_right_eye_one,
        gp_vn_spherical_right_eye_two: this.form.gp_vn_spherical_right_eye_two,
        gp_vn_spherical_right_eye_one: this.form.gp_vn_spherical_right_eye_one,
        gp_vd_va_left_eye: this.form.gp_vd_va_left_eye,
        gp_vd_axis_left_eye: this.form.gp_vd_axis_left_eye,
        gp_vd_cylinder_left_eye_two: this.form.gp_vd_cylinder_left_eye_two,
        gp_vd_cylinder_left_eye_one: this.form.gp_vd_cylinder_left_eye_one,
        gp_vd_spherical_left_eye_two: this.form.gp_vd_spherical_left_eye_two,
        gp_vd_spherical_left_eye_one: this.form.gp_vd_spherical_left_eye_one,
        gp_vd_va_right_eye: this.form.gp_vd_va_right_eye,
        gp_vd_axis_right_eye: this.form.gp_vd_axis_right_eye,
        gp_vd_cylinder_right_eye_two: this.form.gp_vd_cylinder_right_eye_two,
        gp_vd_cylinder_right_eye_one: this.form.gp_vd_cylinder_right_eye_one,
        gp_vd_spherical_right_eye_two: this.form.gp_vd_spherical_right_eye_two,
        gp_vd_spherical_right_eye_one: this.form.gp_vd_spherical_right_eye_one,
        vn_va_left_eye: this.form.vn_va_left_eye,
        vn_axis_left_eye: this.form.vn_axis_left_eye,
        vn_cylinder_left_eye_two: this.form.vn_cylinder_left_eye_two,
        vn_cylinder_left_eye_one: this.form.vn_cylinder_left_eye_one,
        vn_spherical_left_eye_two: this.form.vn_spherical_left_eye_two,
        vn_spherical_left_eye_one: this.form.vn_spherical_left_eye_one,
        vn_va_right_eye: this.form.vn_va_right_eye,
        vn_axis_right_eye: this.form.vn_axis_right_eye,
        vn_cylinder_right_eye_two: this.form.vn_cylinder_right_eye_two,
        vn_cylinder_right_eye_one: this.form.vn_cylinder_right_eye_one,
        vn_spherical_right_eye_two: this.form.vn_spherical_right_eye_two,
        vn_spherical_right_eye_one: this.form.vn_spherical_right_eye_one,
        vd_va_left_eye: this.form.vd_va_left_eye,
        vd_axis_left_eye: this.form.vd_axis_left_eye,
        vd_cylinder_left_eye_two: this.form.vd_cylinder_left_eye_two,
        vd_cylinder_left_eye_one: this.form.vd_cylinder_left_eye_one,
        vd_spherical_left_eye_two: this.form.vd_spherical_left_eye_two,
        vd_spherical_left_eye_one: this.form.vd_spherical_left_eye_one,
        vd_va_right_eye: this.form.vd_va_right_eye,
        vd_axis_right_eye: this.form.vd_axis_right_eye,
        vd_cylinder_right_eye_two: this.form.vd_cylinder_right_eye_two,
        vd_cylinder_right_eye_one: this.form.vd_cylinder_right_eye_one,
        vd_spherical_right_eye_two: this.form.vd_spherical_right_eye_two,
        vd_spherical_right_eye_one: this.form.vd_spherical_right_eye_one,
        refraction_vn_va_left_eye: this.form.refraction_vn_va_left_eye,
        refraction_vn_axis_left_eye: this.form.refraction_vn_axis_left_eye,
        refraction_vn_cylinder_left_eye_two:
          this.form.refraction_vn_cylinder_left_eye_two,
        refraction_vn_cylinder_left_eye_one:
          this.form.refraction_vn_cylinder_left_eye_one,
        refraction_vn_spherical_left_eye_two:
          this.form.refraction_vn_spherical_left_eye_two,
        refraction_vn_spherical_left_eye_one:
          this.form.refraction_vn_spherical_left_eye_one,
        refraction_vn_va_right_eye: this.form.refraction_vn_va_right_eye,
        refraction_vn_axis_right_eye: this.form.refraction_vn_axis_right_eye,
        refraction_vn_cylinder_right_eye_two:
          this.form.refraction_vn_cylinder_right_eye_two,
        refraction_vn_cylinder_right_eye_one:
          this.form.refraction_vn_cylinder_right_eye_one,
        refraction_vn_spherical_right_eye_two:
          this.form.refraction_vn_spherical_right_eye_two,
        refraction_vn_spherical_right_eye_one:
          this.form.refraction_vn_spherical_right_eye_one,
        refraction_vd_va_left_eye: this.form.refraction_vd_va_left_eye,
        refraction_vd_axis_left_eye: this.form.refraction_vd_axis_left_eye,
        refraction_vd_cylinder_left_eye_two:
          this.form.refraction_vd_cylinder_left_eye_two,
        refraction_vd_cylinder_left_eye_one:
          this.form.refraction_vd_cylinder_left_eye_one,
        refraction_vd_spherical_left_eye_two:
          this.form.refraction_vd_spherical_left_eye_two,
        refraction_vd_spherical_left_eye_one:
          this.form.refraction_vd_spherical_left_eye_one,
        refraction_vd_va_right_eye: this.form.refraction_vd_va_right_eye,
        refraction_vd_axis_right_eye: this.form.refraction_vd_axis_right_eye,
        refraction_vd_cylinder_right_eye_two:
          this.form.refraction_vd_cylinder_right_eye_two,
        refraction_vd_cylinder_right_eye_one:
          this.form.refraction_vd_cylinder_right_eye_one,
        refraction_vd_spherical_right_eye_two:
          this.form.refraction_vd_spherical_right_eye_two,
        refraction_vd_spherical_right_eye_one:
          this.form.refraction_vd_spherical_right_eye_one,
        ODWC: this.form.ODWC,
        OGWC: this.form.OGWC,
        ODWTC: this.form.ODWTC,
        OGWTC: this.form.OGWTC,
        symptoms: this.form.symptoms,
        other_infos: this.form.other,
        other_symptoms: this.form.other_symptoms,
        current_treatments: this.form.current_treatments,
        eyelids_re: this.form.eyelids_re,
        glass_filter: this.form.glass_filter,
        type_solar: this.form.type_solar,
        glass_treatments: this.form.glass_treatments,
        type_glass: this.form.type_glass,
        type_material: this.form.type_material,
        eyelids_le: this.form.eyelids_le,
        conjunctiva_re: this.form.conjunctiva_re,
        conjunctiva_le: this.form.conjunctiva_le,
        cornea_re: this.form.cornea_re,
        cornea_le: this.form.cornea_le,
        anterior_chamber_re: this.form.anterior_chamber_re,
        anterior_chamber_le: this.form.anterior_chamber_le,
        iris_re: this.form.iris_re,
        iris_le: this.form.iris_le,
        pupil_re: this.form.pupil_re,
        pupil_le: this.form.pupil_le,
        crystalline_re: this.form.crystalline_re,
        crystalline_le: this.form.crystalline_le,
        eom_re: this.form.eom_re,
        eom_le: this.form.eom_le,
        iop_re: this.form.iop_re,
        iop_le: this.form.iop_le,
        cct_re: this.form.cct_re,
        cct_le: this.form.cct_le,
        diagnostic_impressions: this.form.diagnostic_impressions,
        diagnostic_od: this.form.diagnostic_od,
        diagnostic_og: this.form.diagnostic_og,
        diagnostic_other: this.form.diagnostic_other,
        decision_exam_labo: this.form.decision_exam_labo,
        decision_ordinnance: this.form.decision_ordinnance,
        decision_surgery: this.form.decision_surgery,
        background: this.categoryBackgrounds,
        poul: this.form.poul,
        patient: this.form.patient,
        doctor: this.form.doctor,
        descriptionBs: this.form.descriptionBs,
        descriptionBm: this.form.descriptionBm,
        start_appointment_date: this.form.start_appointment_date,
        end_appointment_date: this.form.end_appointment_date,
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
    getDataFormDetails() {
      let data = {
        consultation: this.form.consultation,
        details_consultation: this.form.consult,
        laboratory: this.form.laboratory,
        investigation: this.form.investigation,
        radiography: this.form.radiography,
        surgery: this.form.surgery,
        diagnostic: this.form.diagnostic,
      };
      return data;
    },
    getDataFormDetailsOd() {
      let data = {
        details_consultation: this.form.consult,
        consultation: this.form.consultation,
        type_diagnostic: "RIGHT_EYE",
        diagnostic: this.form.diagnostic,
      };
      return data;
    },
    getDataFormDetailsOg() {
      let data = {
        consultation: this.form.consultation,
        details_consultation: this.form.consult,
        type_diagnostic: "LEFT_EYE",
        diagnostic: this.form.diagnostic,
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
      this.form.id = item.id;
      this.form.consult = item.consultation[0]?.id;
      this.form.consultation = item.id;
      this.getItemsDetailsLaboratory();
      this.getItemsDetailsOrdinance();
      this.getItemsDetailsInvest();
      this.getItemsDetailsSurgery();
      this.getItemsDetailsRadiography();
      this.getItemsDetailsDiagnosticOd();
      this.getItemsDetailsDiagnosticOg();
      this.categoryBackgrounds = [];
      this.categoryBackgrounds =
        item.consultation[0]?.background === undefined
          ? []
          : item.consultation[0]?.background;
      this.form.createdAt = this.$moment(
        item.consultation[0]?.createdAt
      ).format("YYYY-MM-DD HH:mm:ss");
      this.form.poul = item.consultation[0]?.poul;
      this.form.condition = item.consultation[0]?.condition;
      this.form.descriptionAllergy = item.consultation[0]?.descriptionAllergy;
      this.form.descriptionFamily = item.consultation[0]?.descriptionFamily;
      this.form.descriptionBs = item.consultation[0]?.descriptionBs;
      this.form.descriptionBm = item.consultation[0]?.descriptionBm;
      this.form.start_appointment_date =
        item.consultation[0]?.start_appointment_date;
      this.form.end_appointment_date =
        item.consultation[0]?.end_appointment_date;
      this.form.tbm = item.consultation[0]?.tbm;
      this.form.tbs = item.consultation[0]?.tbs;
      this.form.reason = item.consultation[0]?.reason;
      this.form.diagnostic = item.consultation[0]?.diagnostic;
      this.form.ta_sys = item.consultation[0]?.ta_sys;
      this.form.ta_sys_options = item.consultation[0]?.ta_sys_options;
      this.form.ta_dias = item.consultation[0]?.ta_dias;
      this.form.ta_dias_options = item.consultation[0]?.ta_dias_options;
      this.form.poul = item.consultation[0]?.poul;
      this.form.iop_od = item.consultation[0]?.iop_od;
      this.form.iop_og = item.consultation[0]?.iop_og;
      this.form.left_eye_vas = item.consultation[0]?.left_eye_vas;
      this.form.left_eye_vaws = item.consultation[0]?.left_eye_vaws;
      this.form.left_eye_NVSPHR = item.consultation[0]?.left_eye_NVSPHR;
      this.form.right_eye_vas = item.consultation[0]?.right_eye_vas;
      this.form.right_eye_vaws = item.consultation[0]?.right_eye_vaws;
      this.form.right_eye_NVSPHR = item.consultation[0]?.right_eye_NVSPHR;
      this.form.refraction_observation =
        item.consultation[0]?.refraction_observation;
      this.form.gp_vn_va_left_eye = item.consultation[0]?.gp_vn_va_left_eye;
      this.form.gp_vn_axis_left_eye = item.consultation[0]?.gp_vn_axis_left_eye;
      this.form.gp_vn_cylinder_left_eye_two =
        item.consultation[0]?.gp_vn_cylinder_left_eye_two;
      this.form.gp_vn_cylinder_left_eye_one =
        item.consultation[0]?.gp_vn_cylinder_left_eye_one;
      this.form.gp_vn_spherical_left_eye_two =
        item.consultation[0]?.gp_vn_spherical_left_eye_two;
      this.form.gp_vn_spherical_left_eye_one =
        item.consultation[0]?.gp_vn_spherical_left_eye_one;
      this.form.gp_vn_va_right_eye = item.consultation[0]?.gp_vn_va_right_eye;
      this.form.gp_vn_axis_right_eye =
        item.consultation[0]?.gp_vn_axis_right_eye;
      this.form.gp_vn_cylinder_right_eye_two =
        item.consultation[0]?.gp_vn_cylinder_right_eye_two;
      this.form.gp_vn_cylinder_right_eye_one =
        item.consultation[0]?.gp_vn_cylinder_right_eye_one;
      this.form.gp_vn_spherical_right_eye_two =
        item.consultation[0]?.gp_vn_spherical_right_eye_two;
      this.form.gp_vn_spherical_right_eye_one =
        item.consultation[0]?.gp_vn_spherical_right_eye_one;
      this.form.gp_vd_va_left_eye = item.consultation[0]?.gp_vd_va_left_eye;
      this.form.gp_vd_axis_left_eye = item.consultation[0]?.gp_vd_axis_left_eye;
      this.form.gp_vd_cylinder_left_eye_two =
        item.consultation[0]?.gp_vd_cylinder_left_eye_two;
      this.form.gp_vd_cylinder_left_eye_one =
        item.consultation[0]?.gp_vd_cylinder_left_eye_one;
      this.form.gp_vd_spherical_left_eye_two =
        item.consultation[0]?.gp_vd_spherical_left_eye_two;
      this.form.gp_vd_spherical_left_eye_one =
        item.consultation[0]?.gp_vd_spherical_left_eye_one;
      this.form.gp_vd_va_right_eye = item.consultation[0]?.gp_vd_va_right_eye;
      this.form.gp_vd_axis_right_eye =
        item.consultation[0]?.gp_vd_axis_right_eye;
      this.form.gp_vd_cylinder_right_eye_two =
        item.consultation[0]?.gp_vd_cylinder_right_eye_two;
      this.form.gp_vd_cylinder_right_eye_one =
        item.consultation[0]?.gp_vd_cylinder_right_eye_one;
      this.form.gp_vd_spherical_right_eye_two =
        item.consultation[0]?.gp_vd_spherical_right_eye_two;
      this.form.gp_vd_spherical_right_eye_one =
        item.consultation[0]?.gp_vd_spherical_right_eye_one;
      this.form.vn_va_left_eye = item.consultation[0]?.vn_va_left_eye;
      this.form.vn_axis_left_eye = item.consultation[0]?.vn_axis_left_eye;
      this.form.vn_cylinder_left_eye_two =
        item.consultation[0]?.vn_cylinder_left_eye_two;
      this.form.vn_cylinder_left_eye_one =
        item.consultation[0]?.vn_cylinder_left_eye_one;
      this.form.vn_spherical_left_eye_two =
        item.consultation[0]?.vn_spherical_left_eye_two;
      this.form.vn_spherical_left_eye_one =
        item.consultation[0]?.vn_spherical_left_eye_one;
      this.form.vn_va_right_eye = item.consultation[0]?.vn_va_right_eye;
      this.form.vn_axis_right_eye = item.consultation[0]?.vn_axis_right_eye;
      this.form.vn_cylinder_right_eye_two =
        item.consultation[0]?.vn_cylinder_right_eye_two;
      this.form.vn_cylinder_right_eye_one =
        item.consultation[0]?.vn_cylinder_right_eye_one;
      this.form.vn_spherical_right_eye_two =
        item.consultation[0]?.vn_spherical_right_eye_two;
      this.form.vn_spherical_right_eye_one =
        item.consultation[0]?.vn_spherical_right_eye_one;
      this.form.vd_va_left_eye = item.consultation[0]?.vd_va_left_eye;
      this.form.vd_axis_left_eye = item.consultation[0]?.vd_axis_left_eye;
      this.form.vd_cylinder_left_eye_two =
        item.consultation[0]?.vd_cylinder_left_eye_two;
      this.form.vd_cylinder_left_eye_one =
        item.consultation[0]?.vd_cylinder_left_eye_one;
      this.form.vd_spherical_left_eye_two =
        item.consultation[0]?.vd_spherical_left_eye_two;
      this.form.vd_spherical_left_eye_one =
        item.consultation[0]?.vd_spherical_left_eye_one;
      this.form.vd_va_right_eye = item.consultation[0]?.vd_va_right_eye;
      this.form.vd_axis_right_eye = item.consultation[0]?.vd_axis_right_eye;
      this.form.vd_cylinder_right_eye_two =
        item.consultation[0]?.vd_cylinder_right_eye_two;
      this.form.vd_cylinder_right_eye_one =
        item.consultation[0]?.vd_cylinder_right_eye_one;
      this.form.vd_spherical_right_eye_two =
        item.consultation[0]?.vd_spherical_right_eye_two;
      this.form.vd_spherical_right_eye_one =
        item.consultation[0]?.vd_spherical_right_eye_one;
      this.form.refraction_vn_va_left_eye =
        item.consultation[0]?.refraction_vn_va_left_eye;
      this.form.refraction_vn_axis_left_eye =
        item.consultation[0]?.refraction_vn_axis_left_eye;
      this.form.refraction_vn_cylinder_left_eye_two =
        item.consultation[0]?.refraction_vn_cylinder_left_eye_two;
      this.form.refraction_vn_cylinder_left_eye_one =
        item.consultation[0]?.refraction_vn_cylinder_left_eye_one;
      this.form.refraction_vn_spherical_left_eye_two =
        item.consultation[0]?.refraction_vn_spherical_left_eye_two;
      this.form.refraction_vn_spherical_left_eye_one =
        item.consultation[0]?.refraction_vn_spherical_left_eye_one;
      this.form.refraction_vn_va_right_eye =
        item.consultation[0]?.refraction_vn_va_right_eye;
      this.form.refraction_vn_axis_right_eye =
        item.consultation[0]?.refraction_vn_axis_right_eye;
      this.form.refraction_vn_cylinder_right_eye_two =
        item.consultation[0]?.refraction_vn_cylinder_right_eye_two;
      this.form.refraction_vn_cylinder_right_eye_one =
        item.consultation[0]?.refraction_vn_cylinder_right_eye_one;
      this.form.refraction_vn_spherical_right_eye_two =
        item.consultation[0]?.refraction_vn_spherical_right_eye_two;
      this.form.refraction_vn_spherical_right_eye_one =
        item.consultation[0]?.refraction_vn_spherical_right_eye_one;
      this.form.refraction_vd_va_left_eye =
        item.consultation[0]?.refraction_vd_va_left_eye;
      this.form.refraction_vd_axis_left_eye =
        item.consultation[0]?.refraction_vd_axis_left_eye;
      this.form.refraction_vd_cylinder_left_eye_two =
        item.consultation[0]?.refraction_vd_cylinder_left_eye_two;
      this.form.refraction_vd_cylinder_left_eye_one =
        item.consultation[0]?.refraction_vd_cylinder_left_eye_one;
      this.form.refraction_vd_spherical_left_eye_two =
        item.consultation[0]?.refraction_vd_spherical_left_eye_two;
      this.form.refraction_vd_spherical_left_eye_one =
        item.consultation[0]?.refraction_vd_spherical_left_eye_one;
      this.form.refraction_vd_va_right_eye =
        item.consultation[0]?.refraction_vd_va_right_eye;
      this.form.refraction_vd_axis_right_eye =
        item.consultation[0]?.refraction_vd_axis_right_eye;
      this.form.refraction_vd_cylinder_right_eye_two =
        item.consultation[0]?.refraction_vd_cylinder_right_eye_two;
      this.form.refraction_vd_cylinder_right_eye_one =
        item.consultation[0]?.refraction_vd_cylinder_right_eye_one;
      this.form.refraction_vd_spherical_right_eye_two =
        item.consultation[0]?.refraction_vd_spherical_right_eye_two;
      this.form.refraction_vd_spherical_right_eye_one =
        item.consultation[0]?.refraction_vd_spherical_right_eye_one;
      this.form.ODWC = item.consultation[0]?.ODWC;
      this.form.OGWC = item.consultation[0]?.OGWC;
      this.form.ODWTC = item.consultation[0]?.ODWTC;
      this.form.OGWTC = item.consultation[0]?.OGWTC;
      this.form.symptoms = item.consultation[0]?.symptoms;
      this.form.other = item.consultation[0]?.other_infos;
      this.form.other_symptoms = item.consultation[0]?.other_symptoms;
      this.form.current_treatments = item.consultation[0]?.current_treatments;
      this.form.eyelids_re = item.consultation[0]?.eyelids_re;
      this.form.type_material = item.consultation[0]?.type_material;
      this.form.type_glass = item.consultation[0]?.type_glass;
      this.form.glass_treatments = item.consultation[0]?.glass_treatments;
      this.form.glass_filter = item.consultation[0]?.glass_filter;
      this.form.type_solar = item.consultation[0]?.type_solar;
      this.form.eyelids_le = item.consultation[0]?.eyelids_le;
      this.form.conjunctiva_re = item.consultation[0]?.conjunctiva_re;
      this.form.conjunctiva_le = item.consultation[0]?.conjunctiva_le;
      this.form.cornea_re = item.consultation[0]?.cornea_re;
      this.form.cornea_le = item.consultation[0]?.cornea_le;
      this.form.anterior_chamber_re = item.consultation[0]?.anterior_chamber_re;
      this.form.anterior_chamber_le = item.consultation[0]?.anterior_chamber_le;
      this.form.iris_re = item.consultation[0]?.iris_re;
      this.form.iris_le = item.consultation[0]?.iris_le;
      this.form.pupil_re = item.consultation[0]?.pupil_re;
      this.form.pupil_le = item.consultation[0]?.pupil_le;
      this.form.crystalline_re = item.consultation[0]?.crystalline_re;
      this.form.crystalline_le = item.consultation[0]?.crystalline_le;
      this.form.eom_le = item.consultation[0]?.eom_le;
      this.form.eom_re = item.consultation[0]?.eom_re;
      this.form.iop_re = item.consultation[0]?.iop_re;
      this.form.iop_le = item.consultation[0]?.iop_le;
      this.form.cct_re = item.consultation[0]?.cct_re;
      this.form.cct_le = item.consultation[0]?.cct_le;
      this.form.diagnostic_impressions =
        item.consultation[0]?.diagnostic_impressions;
      this.form.diagnostic_od = item.consultation[0]?.diagnostic_od;
      this.form.diagnostic_og = item.consultation[0]?.diagnostic_og;
      this.form.diagnostic_other = item.consultation[0]?.diagnostic_other;
      this.form.decision_exam_labo = item.consultation[0]?.decision_exam_labo;
      this.form.decision_ordinnance = item.consultation[0]?.decision_ordinnance;
      this.form.decision_surgery = item.consultation[0]?.decision_surgery;
      this.form.decision_obervations =
        item.consultation[0]?.decision_obervations;
      // Données envoyées lors de la modification

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
  components: {
    FormPatient,
    FormQte,
    FormPdf,
    FormDosage,
    DeleteItem,
  },
};
</script>
