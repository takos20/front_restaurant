<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-toolbar dark color="#f5f5f5" dense max-width="820px" class="ml-6">
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
        <v-form @submit.prevent="save">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions style="margin-bottom: -25px">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals" class="mb-5">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="goToNextPage2"
                    class="mb-5"
                    :disabled="
                      this.form.gender == null ||
                      this.form.name == null ||
                      this.form.city == null ||
                      this.form.district == null ||
                      this.form.dateNaiss == null ||
                      this.form.phone == null ||
                      this.form.address == null ||
                      this.form.type_patient == null
                    "
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
                <v-card max-width="820px" class="ml-6">
                  <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2" class="mt-3">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.prescription.cols.patient.title"
                            )
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
                    <v-col
                      cols="12"
                      sm="4"
                      class="mb-0 py-0"
                      v-if="this.form.id"
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
                      v-if="!this.form.id"
                    >
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-row>
                        <v-col cols="2" class="mt-3">
                          <v-subheader class="font-weight-bold">{{
                            $vuetify.lang.t(
                              "$vuetify.prescription.cols.doctor.title"
                            )
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
                <v-card max-width="820px" class="ml-6 mt-5">
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
                        <v-icon
                          @click="addColumnCategoryBackground()"
                          v-on="on"
                        >
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
                      style="height: 255px; width: 820px"
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
                              <v-row
                                v-if="category.categoryBack === 'SURGICAL'"
                              >
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
                <v-card max-width="820px" class="ml-6 mt-2">
                  <v-card-text>
                    <div
                      class="title mb-5 white--text blue darken-5 text-center"
                      style="height: 30px; margin-top: 30px"
                    >
                      {{
                        $vuetify.lang.t(
                          "$vuetify.ophtamologique.titleParameters"
                        )
                      }}
                    </div>
                    <v-container class="mt-3">
                      <v-row wrap>
                        <v-col cols="12" sm="4" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="6">
                              <v-subheader class="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.ta_sys.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="form.ta_sys"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" sm="4" class="mb-0 py-0">
                          <v-row>
                            <v-col cols="6">
                              <v-subheader class="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.ta_dias.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
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
                            <v-col cols="4">
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
                            <v-col cols="6">
                              <v-subheader class="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.iop_od.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
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
                            <v-col cols="6">
                              <v-subheader class="font-weight-bold">{{
                                $vuetify.lang.t(
                                  "$vuetify.ophtamologique.cols.iop_og.title"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
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
                  </v-card-text>
                </v-card>
                <v-card max-width="820px" class="ml-6 mt-2">
                  <v-card-text>
                    <div
                      class="title mb-5 white--text blue darken-5 text-center"
                      style="height: 30px; margin-top: 30px"
                    >
                      {{
                        $vuetify.lang.t(
                          "$vuetify.ophtamologique.cols.acuity.title"
                        )
                      }}
                    </div>

                    <v-container class="mt-3">
                      <v-row wrap>
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
                              <v-text-field
                                dense
                                v-model="form.ODWC"
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
                                  "$vuetify.ophtamologique.cols.acuity.OGWC"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="form.OGWC"
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
                                  "$vuetify.ophtamologique.cols.acuity.ODWTC"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="form.ODWTC"
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
                                  "$vuetify.ophtamologique.cols.acuity.OGWTC"
                                )
                              }}</v-subheader>
                            </v-col>
                            <v-col cols="6" class="mt-1">
                              <v-text-field
                                dense
                                v-model="form.OGWTC"
                                color="primary"
                                class="font-weight-bold"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
                <v-card max-width="820px" class="ml-6 mt-2">
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
                <v-card max-width="820px" class="ml-6 mt-2">
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
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eyelids.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-textarea
                              dense
                              v-model="form.eyelids_re"
                              color="primary"
                              :rows="2"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-textarea> </v-col
                          ><v-col cols="4" class="mt-1">
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
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.conjunctiva.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.conjunctiva_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.conjunctiva_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.cornea.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.cornea_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.cornea_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.anterior_chamber.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.anterior_chamber_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.anterior_chamber_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.iris.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.iris_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.iris_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.pupil.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.pupil_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.pupil_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.crystalline.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.crystalline_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.crystalline_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.eom.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.eom_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.eom_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.iop.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.iop_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.iop_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-row>
                          <v-col cols="4">
                            <v-subheader class="font-weight-bold">{{
                              $vuetify.lang.t(
                                "$vuetify.ophtamologique.cols.anteriors_segments.cct.title"
                              )
                            }}</v-subheader>
                          </v-col>
                          <v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.cct_re"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.RE'
                                )
                              "
                            ></v-text-field> </v-col
                          ><v-col cols="4" class="mt-1">
                            <v-text-field
                              dense
                              v-model="form.cct_le"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.ophtamologique.cols.anteriors_segments.eyelids.LE'
                                )
                              "
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
                <v-card max-width="820px" class="ml-6 mt-2">
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
                <v-card max-width="820px" class="ml-6 mt-2">
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
                        <v-textarea
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
                        ></v-textarea> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-textarea
                          dense
                          :rows="2"
                          outlined
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.ophtamologique.cols.diagnostic_final.diagnostic_og'
                            )
                          "
                          v-model="form.diagnostic_og"
                          color="primary"
                          class="font-weight-bold"
                        ></v-textarea> </v-col
                      ><v-col cols="12" sm="12" class="mb-0 py-0">
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
                <v-card max-width="820px" class="ml-6 mt-2">
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
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-textarea
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
                        ></v-textarea> </v-col
                      ><v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-textarea
                          dense
                          :rows="2"
                          outlined
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.ophtamologique.cols.decision.decision_ordinnance'
                            )
                          "
                          v-model="form.decision_ordinnance"
                          color="primary"
                          class="font-weight-bold"
                        ></v-textarea> </v-col
                      ><v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-textarea
                          dense
                          :rows="2"
                          outlined
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.ophtamologique.cols.decision.decision_surgery'
                            )
                          "
                          v-model="form.decision_surgery"
                          color="primary"
                          class="font-weight-bold"
                        ></v-textarea> </v-col
                      ><v-col cols="12" sm="12" class="mb-0 py-0">
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
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions style="margin-bottom: -25px">
                  <v-spacer></v-spacer>
                  <v-btn @click="closeModals" class="mb-5">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn
                    color="primary"
                    @click="goToNextPage2"
                    class="mb-5"
                    :disabled="
                      this.form.gender == null ||
                      this.form.name == null ||
                      this.form.city == null ||
                      this.form.district == null ||
                      this.form.dateNaiss == null ||
                      this.form.phone == null ||
                      this.form.address == null ||
                      this.form.type_patient == null
                    "
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card-text> </v-card-text>
              <v-card max-width="820px" class="ml-6 mt-2">
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
            </v-stepper-content>
          </v-stepper-items>

          <v-card-text></v-card-text>
        </v-form>
      </v-stepper>
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
          background: null,
          poul: null,
          reason: null,
          patient: null,
          doctor: null,
          ta_sys: null,
          ta_dias: null,
          iop_od: null,
          iop_og: null,
          ODWC: null,
          OGWC: null,
          ODWTC: null,
          OGWTC: null,
          symptoms: null,
          other_symptoms: null,
          current_treatments: null,
          eyelids_re: null,
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
          decision_ordinnance: null,
          decision_surgery: null,
          type_consultation: "OPHTALMOLOGIC",
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
    e1: 1,
    maxDate: new Date().toISOString().substr(0, 10),
    categoryBackground: [],
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
    optionTBS: {
      typeTBS: [],
    },
    optionOP: {
      typeOP: [],
    },
    optionSymptoms: {
      type_symptoms: [],
    },
    textFields: [],
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
    this.getOptionsCategory();
    this.getOptionsTBM();
    this.getOptionsTBS();
    this.getOptionsOP();
    this.getOptionsSymptoms();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    closeModals() {
      this.dialog.show = false;
      this.e1 = 1;
    },
    goToNextPage2() {
      this.e1 = 2;
    },
    backTo() {
      this.e1 = 1;
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
    addColumnCategoryBackground() {
      this.categoryBackground.push({ ...this.optionsCategoryBackground.text });
      console.log(this.categoryBackground);
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
        ta_dias: this.form.ta_dias,
        iop_od: this.form.iop_od,
        iop_og: this.form.iop_og,
        ODWC: this.form.ODWC,
        OGWC: this.form.OGWC,
        ODWTC: this.form.ODWTC,
        OGWTC: this.form.OGWTC,
        type_consultation: this.form.type_consultation,
        symptoms: this.form.symptoms,
        other_symptoms: this.form.other_symptoms,
        current_treatments: this.form.current_treatments,
        eyelids_re: this.form.eyelids_re,
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
        background: this.categoryBackground,
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
      (this.categoryBackground = item.background),
        (this.form.createdAt = this.$moment(item.createdAt).format(
          "YYYY-MM-DD HH:mm:ss"
        )),
        (this.form.type_consultation = item.type_consultation),
        (this.form.poul = item.poul),
        (this.form.condition = item.condition),
        (this.form.descriptionAllergy = item.descriptionAllergy);
      this.form.descriptionFamily = item.descriptionFamily;
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
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.ta_sys = item.ta_sys;
      this.ta_dias = item.ta_dias;
      this.poul = item.poul;
      this.iop_od = item.iop_od;
      this.iop_og = item.iop_og;
      this.ODWC = item.ODWC;
      this.OGWC = item.OGWC;
      this.ODWTC = item.ODWTC;
      this.OGWTC = item.OGWTC;
      this.symptoms = item.symptoms;
      this.other_symptoms = item.other_symptoms;
      this.current_treatments = item.current_treatments;
      this.eyelids_re = item.eyelids_re;
      this.eyelids_le = item.eyelids_le;
      this.conjunctiva_re = item.conjunctiva_re;
      this.conjunctiva_le = item.conjunctiva_le;
      this.cornea_re = item.cornea_re;
      this.cornea_le = item.cornea_le;
      this.anterior_chamber_re = item.anterior_chamber_re;
      this.anterior_chamber_le = item.anterior_chamber_le;
      this.iris_re = item.iris_re;
      this.iris_le = item.iris_le;
      this.pupil_re = item.pupil_re;
      this.pupil_le = item.pupil_le;
      this.crystalline_re = item.crystalline_re;
      this.crystalline_le = item.crystalline_le;
      this.eom_re = item.eom_re;
      this.eom_le = item.eom_le;
      this.iop_re = item.iop_re;
      this.iop_le = item.iop_le;
      this.cct_re = item.cct_re;
      this.cct_le = item.cct_le;
      this.diagnostic_impressions = item.diagnostic_impressions;
      this.diagnostic_od = item.diagnostic_od;
      this.diagnostic_og = item.diagnostic_og;
      this.diagnostic_other = item.diagnostic_other;
      this.decision_exam_labo = item.decision_exam_labo;
      this.decision_ordinnance = item.decision_ordinnance;
      this.decision_surgery = item.decision_surgery;
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
