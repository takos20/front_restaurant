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
            {{ $vuetify.lang.t("$vuetify.consultation.title") }}
          </div>
          <v-container class="mt-3">
            <v-row wrap>
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
              <v-card-text class="left body-5 black--text text--darken-1">
                <div>
                  <span style="font-size: 20px">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.dental_schema.title"
                      )
                    }}
                  </span>
                </div>
                <div>
                  <span class="text-center body-2 red--text text--darken-1">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.dental_schema.titleInfos"
                      )
                    }}
                  </span>
                </div>
                <div>
                  <span style="font-size: 15px">
                    {{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.dental_schema.titleChoice"
                      )
                    }}
                  </span>
                </div>
              </v-card-text>
              <v-card-text style="margin-top: -30px">
                <div class="d-flex wrap align-center">
                  <v-row style="max-width: 100px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.18"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighteen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.17"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.seventeen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.16"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixteen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.15"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifteen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.14"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourteen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.13"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirteen"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.12"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twelve"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.11"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eleven"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.21"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.22"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.23"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.24"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.25"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.26"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_six"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.27"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_seven"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.28"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.twenty_eight"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                </div>
                <div class="d-flex wrap align-center" style="margin-top: -20px">
                  <v-row style="max-width: 100px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.55"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.54"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.53"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.52"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.51"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fifty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.61"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.62"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.63"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.64"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.65"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.sixty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                </div>
                <div class="d-flex wrap align-center">
                  <v-row style="max-width: 100px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.85"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.84"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.83"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.82"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.eighty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.81"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.seventy_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.71"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.seventy_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.72"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.seventy_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.73"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        font-size="300"
                        outlined
                        v-model="formSchema.seventy_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                          font-size: 25px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.74"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.seventy_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.75"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: -12px">
                    <div>
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold"></v-subheader>
                      </v-col>
                    </div>
                    <div></div>
                  </v-row>
                </div>
                <div class="d-flex wrap align-center">
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_eight"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.48"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_seven"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.47"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_six"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.46"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.45"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.44"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.43"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.42"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.fourty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.41"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_one"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.31"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_two"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.32"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_three"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.33"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_four"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.34"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_five"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.35"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_six"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.36"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_seven"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.37"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                  <v-row style="max-width: 100px; margin-top: 25px">
                    <div>
                      <v-text-field
                        dense
                        outlined
                        v-model="formSchema.thirty_eight"
                        color="primary"
                        :rules="[letterRule]"
                        style="
                          max-width: 50px;
                          margin-top: -30px;
                          margin-left: 10px;
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </div>
                    <div style="margin-top: -52px">
                      <v-col cols="6">
                        <v-subheader class="font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.consultation.cols.dental_schema.choice.38"
                          )
                        }}</v-subheader>
                      </v-col>
                    </div>
                  </v-row>
                </div>
              </v-card-text>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="5">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.periodontopathy.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="7" class="mt-1">
                    <v-select
                      dense
                      v-model="form.periodontopathy"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-row>
                  <v-col cols="5">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.need_care.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="7" class="mt-1">
                    <v-select
                      dense
                      v-model="form.need_care"
                      color="primary"
                      :items="optionJaundice.typeJaundice"
                      class="font-weight-bold"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                class="mb-0 py-0"
                v-if="this.form.need_care == 'YES'"
              >
                <v-row>
                  <v-col cols="2">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t("$vuetify.consultation.cols.care.title")
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="10" class="mt-1">
                    <v-select
                      dense
                      multiple
                      deletable-chips
                      clearable
                      v-model="careDental"
                      color="primary"
                      :items="optionCare.typeCare"
                      class="font-weight-bold"
                      @change="check_item()"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                v-if="this.check_item() === true"
              >
                <v-row>
                  <v-col cols="5">
                    <v-subheader class="font-weight-bold">{{
                      $vuetify.lang.t(
                        "$vuetify.consultation.cols.type_prosthetics.title"
                      )
                    }}</v-subheader>
                  </v-col>
                  <v-col cols="7" class="mt-1">
                    <v-select
                      dense
                      v-model="form.type_prosthetics"
                      color="primary"
                      :items="optionProsthetics.typeProsthetics"
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
          background: null,
          periodontopathy: null,
          need_care: null,
          consultation: null,
          type_prosthetics: null,
          care: [],
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
    careDental: [],
    options: {
      text: { dateReceipt: "", examReceived: "", results: "" },
    },
    formSchema: {
      eighteen: null,
      seventeen: null,
      sixteen: null,
      fifteen: null,
      fourteen: null,
      thirteen: null,
      twelve: null,
      eleven: null,
      thirty_two: null,
      thirty_four: null,
      thirty_three: null,
      thirty_one: null,
      thirty_six: null,
      thirty_seven: null,
      twenty_five: null,
      twenty_two: null,
      twenty_four: null,
      twenty_three: null,
      twenty_one: null,
      twenty_six: null,
      twenty_seven: null,
      twenty_eight: null,
      fourty_five: null,
      fourty_two: null,
      fourty_four: null,
      fourty_three: null,
      fourty_one: null,
      fourty_six: null,
      fourty_seven: null,
      fourty_eight: null,
      eighty_four: null,
      eighty_one: null,
      eighty_two: null,
      eighty_three: null,
      eighty_five: null,
      seventy_four: null,
      seventy_one: null,
      seventy_two: null,
      seventy_three: null,
      seventy_five: null,
      fifty_four: null,
      fifty_one: null,
      fifty_two: null,
      fifty_three: null,
      fifty_five: null,
      sixty_four: null,
      sixty_one: null,
      sixty_two: null,
      sixty_three: null,
      sixty_five: null,
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
    letterRule: (val) => {
      let letter;
      letter = ["S", "O", "C", "A"];
      if (letter.includes(val)) {
        return true;
      } else {
        return false;
      }
    },
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
    optionCare: {
      typeCare: [],
    },
    optionProsthetics: {
      typeProsthetics: [],
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
    this.getOptionsCategory();
    this.getOptionsTBM();
    this.getOptionsTBS();
    this.getOptionsCondition();
    this.getOptionsConjunctivae();
    this.getOptionsJaundice();
    this.getOptionsVaginalExamination();
    this.getOptionsSpeculumExam();
    this.getOptionsCare();
    this.getOptionsProsthetics();
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
      this.careSheet = [];
      this.categoryBackground = [];
      this.formSchema.eighteen = null;
      this.formSchema.seventeen = null;
      this.formSchema.sixteen = null;
      this.formSchema.fifteen = null;
      this.formSchema.fourteen = null;
      this.formSchema.thirteen = null;
      this.formSchema.twelve = null;
      this.formSchema.eleven = null;
      this.formSchema.thirty_two = null;
      this.formSchema.thirty_four = null;
      this.formSchema.thirty_three = null;
      this.formSchema.thirty_one = null;
      this.formSchema.thirty_six = null;
      this.formSchema.thirty_seven = null;
      this.formSchema.twenty_five = null;
      this.formSchema.twenty_two = null;
      this.formSchema.twenty_four = null;
      this.formSchema.twenty_three = null;
      this.formSchema.twenty_one = null;
      this.formSchema.twenty_six = null;
      this.formSchema.twenty_seven = null;
      this.formSchema.twenty_eight = null;
      this.formSchema.fourty_five = null;
      this.formSchema.fourty_two = null;
      this.formSchema.fourty_four = null;
      this.formSchema.fourty_three = null;
      this.formSchema.fourty_one = null;
      this.formSchema.fourty_six = null;
      this.formSchema.fourty_seven = null;
      this.formSchema.fourty_eight = null;
      this.formSchema.eighty_four = null;
      this.formSchema.eighty_one = null;
      this.formSchema.eighty_two = null;
      this.formSchema.eighty_three = null;
      this.formSchema.eighty_five = null;
      this.formSchema.seventy_four = null;
      this.formSchema.seventy_one = null;
      this.formSchema.seventy_two = null;
      this.formSchema.seventy_three = null;
      this.formSchema.seventy_five = null;
      this.formSchema.fifty_four = null;
      this.formSchema.fifty_one = null;
      this.formSchema.fifty_two = null;
      this.formSchema.fifty_three = null;
      this.formSchema.fifty_five = null;
      this.formSchema.sixty_four = null;
      this.formSchema.sixty_one = null;
      this.formSchema.sixty_two = null;
      this.formSchema.sixty_three = null;
      this.formSchema.sixty_five = null;
      this.form.periodontopathy = null;
      this.form.need_care = null;
      this.form.type_prosthetics = null;
      this.careDental = [];
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
    getOptionsCare() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.care, (typeCare) => {
        self.optionCare.typeCare.push({
          text: self.$vuetify.lang.t(typeCare.text),
          value: typeCare.value,
        });
      });
    },
    getOptionsProsthetics() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_prosthetics, (typeProsthetics) => {
        self.optionProsthetics.typeProsthetics.push({
          text: self.$vuetify.lang.t(typeProsthetics.text),
          value: typeProsthetics.value,
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
        dental_schema: this.formSchema,
        need_care: this.form.need_care,
        periodontopathy: this.form.periodontopathy,
        care: this.careDental,
        type_prosthetics: this.form.type_prosthetics,
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
      this.form.consultation = item.id;
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
      this.form.type_prosthetics = item.type_prosthetics;
      this.form.periodontopathy = item.periodontopathy;

      // this.form.care = item.care;
      this.form.need_care = item.need_care;
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
      this.formSchema.eighteen = item.dental_schema.eighteen;
      this.formSchema.seventeen = item.dental_schema.seventeen;
      this.formSchema.sixteen = item.dental_schema.sixteen;
      this.formSchema.fifteen = item.dental_schema.fifteen;
      this.formSchema.fourteen = item.dental_schema.fourteen;
      this.formSchema.thirteen = item.dental_schema.thirteen;
      this.formSchema.twelve = item.dental_schema.twelve;
      this.formSchema.eleven = item.dental_schema.eleven;
      this.formSchema.thirty_two = item.dental_schema.thirty_two;
      this.formSchema.thirty_four = item.dental_schema.thirty_four;
      this.formSchema.thirty_three = item.dental_schema.thirty_three;
      this.formSchema.thirty_one = item.dental_schema.thirty_one;
      this.formSchema.thirty_six = item.dental_schema.thirty_six;
      this.formSchema.thirty_seven = item.dental_schema.thirty_seven;
      this.formSchema.twenty_five = item.dental_schema.twenty_five;
      this.formSchema.twenty_two = item.dental_schema.twenty_two;
      this.formSchema.twenty_four = item.dental_schema.twenty_four;
      this.formSchema.twenty_three = item.dental_schema.twenty_three;
      this.formSchema.twenty_one = item.dental_schema.twenty_one;
      this.formSchema.twenty_six = item.dental_schema.twenty_six;
      this.formSchema.twenty_seven = item.dental_schema.twenty_seven;
      this.formSchema.twenty_eight = item.dental_schema.twenty_eight;
      this.formSchema.fourty_five = item.dental_schema.fourty_five;
      this.formSchema.fourty_two = item.dental_schema.fourty_two;
      this.formSchema.fourty_four = item.dental_schema.fourty_four;
      this.formSchema.fourty_three = item.dental_schema.fourty_three;
      this.formSchema.fourty_one = item.dental_schema.fourty_one;
      this.formSchema.fourty_six = item.dental_schema.fourty_six;
      this.formSchema.fourty_seven = item.dental_schema.fourty_seven;
      this.formSchema.fourty_eight = item.dental_schema.fourty_eight;
      this.formSchema.eighty_four = item.dental_schema.eighty_four;
      this.formSchema.eighty_one = item.dental_schema.eighty_one;
      this.formSchema.eighty_two = item.dental_schema.eighty_two;
      this.formSchema.eighty_three = item.dental_schema.eighty_three;
      this.formSchema.eighty_five = item.dental_schema.eighty_five;
      this.formSchema.seventy_four = item.dental_schema.seventy_four;
      this.formSchema.seventy_one = item.dental_schema.seventy_one;
      this.formSchema.seventy_two = item.dental_schema.seventy_two;
      this.formSchema.seventy_three = item.dental_schema.seventy_three;
      this.formSchema.seventy_five = item.dental_schema.seventy_five;
      this.formSchema.fifty_four = item.dental_schema.fifty_four;
      this.formSchema.fifty_one = item.dental_schema.fifty_one;
      this.formSchema.fifty_two = item.dental_schema.fifty_two;
      this.formSchema.fifty_three = item.dental_schema.fifty_three;
      this.formSchema.fifty_five = item.dental_schema.fifty_five;
      this.formSchema.sixty_four = item.dental_schema.sixty_four;
      this.formSchema.sixty_one = item.dental_schema.sixty_one;
      this.formSchema.sixty_two = item.dental_schema.sixty_two;
      this.formSchema.sixty_three = item.dental_schema.sixty_three;
      this.formSchema.sixty_five = item.dental_schema.sixty_five;
      // Données envoyées lors de la modification
      this.careDental = [];
      this.form.id = item.id;
      item.care.forEach((d) => {
        this.careDental.push(d);
      });

      // this.form.code = item.code;
      // this.form.patient = item.patient["id"];
      // this.itemsPatient.push(item.patient);
      // this.form.doctor = item.doctor["id"];
      // this.form.care.push(item.care);
    },
    check_item() {
      console.log(this.careDental);
      if (this.careDental.length > 0) {
        if (this.careDental.includes("prosthetics")) {
          return true;
        }
        return false;
      }
      return false;
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
