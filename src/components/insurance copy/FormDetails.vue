<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="1050px"
    transition="dialog-bottom-transition"
  >
    <v-toolbar dark color="white" dense max-width="1050px">
      <div class="title" style="color: black">
        {{ $vuetify.lang.t(messages.title) }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon light @click="forceRefresh()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="margin-top: 1px">
      <!--    <div-->
      <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
      <!--      style="height: 30px; margin-top: 30px"-->
      <!--      v-if="this.isActive === 'false'"-->
      <!--    >-->
      <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
      <!--    </div>-->
      <v-card class="pb-1">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-row wrap>
            <v-col cols="12" sm="4">
              <template>
                <v-btn
                  class="mr-2 my-2 white--text"
                  color="primary"
                  @click="createD()"
                  :disabled="
                    !_.includes(
                      this.$auth.user().permissions,
                      'add_cash_movement'
                    )
                  "
                  dense
                >
                  <v-icon dark> mdi-plus </v-icon>
                  {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}
                </v-btn>
              </template>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
            >
              <template>
                <v-btn
                  class="mr-2 my-2 white--text"
                  color="primary"
                  @click="createP()"
                  :disabled="
                    !_.includes(
                      this.$auth.user().permissions,
                      'add_patientsettlement'
                    )
                  "
                  dense
                >
                  <v-icon dark> mdi-plus </v-icon>
                  {{ $vuetify.lang.t("$vuetify.patients_settlements.title") }}
                </v-btn>
              </template>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>

      <v-card
        style="margin-top: 1px"
        v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
      >
        <br />
        <v-form>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="form.code"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.bill_N.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <!--            <v-col cols="12" sm="1" class="mb-0 py-0"></v-col>-->
              <!--            <v-col cols="12" sm="2" class="mb-0 py-0" v-if="this.form.id !== null">-->
              <!--                  <v-text-field-->
              <!--                    v-model="form.bills_date"-->
              <!--                    color="primary"-->
              <!--                    :label="-->
              <!--                      $vuetify.lang.t('$vuetify.bills.cols.date_bill.title')-->
              <!--                    "-->
              <!--                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"-->
              <!--                    class="font-weight-bold"-->
              <!--                    outlined-->
              <!--                    dense-->
              <!--                    light-->
              <!--                    readonly-->
              <!--                  ></v-text-field>-->
              <!--            </v-col>-->
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-select
                  v-model="form.bill_type"
                  color="primary"
                  :items="optionBills.type_bills"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.bill_type.title')
                  "
                  :placeholder="
                    $vuetify.lang.t('$vuetify.bills.cols.bill_type.title')
                  "
                  prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  @change="resetAll()"
                  dense
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'hospitalization'"
              >
                <v-select
                  v-model="form.type_accommodation"
                  color="primary"
                  :items="optionType.type_accommodation"
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
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'hospitalization'"
              >
                <v-text-field
                  v-model="$auth.user().username"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0" v-else>
                <v-text-field
                  v-model="$auth.user().username"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.patient"
                  :items="itemsPatient"
                  :loading="isLoadingPatient"
                  :search-input.sync="searchPatient"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.patient_name.title')
                  "
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  autofocus
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="1" class="mb-0 py-0">
                <v-btn
                  class="mr-8 white--text"
                  :disabled="
                    !_.includes(this.$auth.user().permissions, 'add_patient')
                  "
                  dense
                  @click="createPatient()"
                  color="primary"
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <!--            <v-col-->
              <!--              cols="12"-->
              <!--              sm="4"-->
              <!--              class="mb-0 py-0"-->
              <!--              v-if="this.form.id === null"-->
              <!--            >-->
              <!--              <v-text-field-->
              <!--                color="primary"-->
              <!--                :label="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.code_patient.title')-->
              <!--                "-->
              <!--                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"-->
              <!--                class="font-weight-bold"-->
              <!--                outlined-->
              <!--                dense-->
              <!--                v-model="get_patient_code"-->
              <!--                readonly-->
              <!--                filled-->
              <!--              ></v-text-field>-->
              <!--            </v-col>-->
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.code_patient.title')
                  "
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="get_patient_code"
                  readonly
                  filled
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')
                  "
                  prepend-inner-icon="mdi-shape-circle-plus mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="get_patient_shape"
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="3" class="mb-0 py-0" v-else>
              <v-text-field
                  color="primary"
                  :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')
                "
                  prepend-inner-icon="mdi-shape-circle-plus mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="form.patient_type"
                  readonly
                  filled
              ></v-text-field> -->
              <!-- </v-col> -->
              <!--            <v-col cols="12" sm="3" class="mb-0 py-0">-->
              <!--              <v-select-->
              <!--                v-model="form.patient_type"-->
              <!--                color="primary"-->
              <!--                :items="optionPatient_shape.type_Patient_shape"-->
              <!--                :label="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')-->
              <!--                "-->
              <!--                :placeholder="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')-->
              <!--                "-->
              <!--                prepend-inner-icon="mdi-gender-male-female"-->
              <!--                class="font-weight-bold mdi-18px"-->
              <!--                outlined-->
              <!--                dense-->
              <!--              ></v-select>-->
              <!--            </v-col>-->

              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  v-model="get_patient_solde"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.patient_balance.title')
                  "
                  prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  suffix="FCFA"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type !== 'ordinance'"
              >
                <v-autocomplete
                  v-model="form.doctor"
                  :items="itemsDoctor"
                  :loading="isLoadingDoctor"
                  :search-input.sync="searchDoctor"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.dealing_with.title')
                  "
                  prepend-inner-icon="mdi-doctor mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                  :readonly="supply"
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                sm="8"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'hospitalization'"
              >
                <v-text-field
                  v-model="form.additional_info"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.additional_info.title'
                    )
                  "
                  prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="supply"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="9" class="mb-0 py-0" v-else>
                <v-text-field
                  v-model="form.additional_info"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.additional_info.title'
                    )
                  "
                  prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="supply"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'pharmacy'"
              >
                <v-autocomplete
                  v-model="form.storage_depots"
                  :items="itemsDepot"
                  :loading="isLoadingDepot"
                  :search-input.sync="searchDepot"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.storage_depot.title'
                    )
                  "
                  prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t(
                        "$vuetify.supplies.cols.storage_depot.title"
                      )
                    }}
                  </template></v-autocomplete
                >
              </v-col>

              <!--            <v-col-->
              <!--              cols="12"-->
              <!--              sm="3"-->
              <!--              class="mb-0 py-0"-->
              <!--              v-if="this.form.bill_type === 'pharmacy'"-->
              <!--            >-->
              <!--              <v-select-->
              <!--                v-model="form.bill_shape"-->
              <!--                color="primary"-->
              <!--                :items="optionShape.type_shape"-->
              <!--                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_shape.title')"-->
              <!--                :placeholder="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.bill_shape.title')-->
              <!--                "-->
              <!--                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"-->
              <!--                class="font-weight-bold"-->
              <!--                outlined-->
              <!--                dense-->
              <!--              ></v-select>-->
              <!--            </v-col>-->
              <!--            <v-col-->
              <!--              cols="12"-->
              <!--              sm="1"-->
              <!--              class="mb-0 py-0"-->
              <!--              v-if="this.form.id === null"-->
              <!--            >-->
              <!--              <v-btn-->
              <!--                color="primary"-->
              <!--                :loading="loadingBtn"-->
              <!--                dark-->
              <!--                type="submit"-->
              <!--                dense-->
              <!--                max-width="2px"-->
              <!--                style="margin-top: 2px"-->
              <!--                depressed-->
              <!--                :disabled="-->
              <!--                  this.form.patient === null ||-->
              <!--                    this.form.doctor === null ||-->
              <!--                    this.form.patient_type === null ||-->
              <!--                    this.form.additional_info === null ||-->
              <!--                    supply-->
              <!--                "-->
              <!--              >-->
              <!--                <v-icon dark>-->
              <!--                  mdi-content-save-->
              <!--                </v-icon>-->
              <!--                &lt;!&ndash;{{ $vuetify.lang.t(messages.submit) }}&ndash;&gt;-->
              <!--              </v-btn>-->
              <!--            </v-col>-->
            </v-row>
          </v-card-text>
          <!--<v-card-actions style="margin-top: -45px">-->
          <!--<v-spacer></v-spacer>-->
          <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
          <!--{{ $vuetify.lang.t(messages.submit) }}-->
          <!--</v-btn>-->
          <!--</v-card-actions>-->
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>
      </v-card>
      <v-card style="margin-top: 1px">
        <v-form
          @submit.prevent="saveDetailsOrdinance"
          :disabled="form.patient === null"
          v-if="this.form.bill_type === 'ordinance'"
        >
          <br />
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-autocomplete
                  v-model="formData.ordinance"
                  :items="itemsOrdinance"
                  :loading="isLoadingOrdinance"
                  :search-input.sync="searchOrdinance"
                  color="primary"
                  return-object
                  item-text="code"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.ordinance.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-btn
                  color="primary"
                  :loading="loadingBtn"
                  type="submit"
                  :disabled="
                    this.formData.ordinance == null || this.form.patient == null
                  "
                  class="font-weight-bold ml-5 white--text"
                >
                  {{
                    $vuetify.lang.t("$vuetify.bills.new.add_ordinance_product")
                  }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>
      </v-card>
      <v-card
        style="margin-top: 1px"
        v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
      >
        <v-form
          @submit.prevent="saveDetails"
          :disabled="form.patient === null || form.doctor === null"
        >
          <br />
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="
                  this.form.bill_type === 'pharmacy' ||
                  this.form.bill_type === 'ordinance'
                "
              >
                <v-autocomplete
                  v-model="formData.details_stock"
                  :items="itemsProduct"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="product_name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.$auth.user().type_enterprise === 'RETAIL'"
              >
                <v-autocomplete
                  v-model="formData.details_stock"
                  :items="itemsProduct"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="product_name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'medical_act'"
              >
                <v-autocomplete
                  v-model="formData.medical_act"
                  :items="itemsMedical_act"
                  :loading="isLoadingMedical_act"
                  :search-input.sync="searchMedical_act"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.medical_act.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'consultation'"
              >
                <v-autocomplete
                  dense
                  v-model="formData.type_consultation"
                  :items="itemsType_consultation"
                  :loading="isLoadingType_consultation"
                  :search-input.sync="searchType_consultation"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.new.select_service')"
                  item-text="title"
                  item-value="id"
                  return-object
                  hide-no-data
                  class="font-weight-bold"
                  clearable
                  outlined
                  autofocus
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'hospitalization'"
              >
                <v-autocomplete
                  v-model="formData.room"
                  :items="itemsRoom"
                  :loading="isLoadingRoom"
                  :search-input.sync="searchRoom"
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
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'hospitalization'"
              >
                <v-select
                  v-model="formData.number_bed"
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
                  @change="get_price_patient()"
                  dense
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'laboratory'"
              >
                <v-autocomplete
                  v-model="formData.laboratory"
                  :items="itemsLaboratory"
                  :loading="isLoadingLaboratory"
                  :search-input.sync="searchLaboratory"
                  item-text="title"
                  return-object
                  color="primary"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.laboratory.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'radiography'"
              >
                <v-autocomplete
                  v-model="formData.radiography"
                  :items="itemsRadiography"
                  :loading="isLoadingRadiography"
                  :search-input.sync="searchRadiography"
                  color="primary"
                  item-text="title"
                  return-object
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.radiography.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'exam_investigation'"
              >
                <v-autocomplete
                  v-model="formData.exam_investigation"
                  :items="itemsExam_investigation"
                  :loading="isLoadingExam_investigation"
                  :search-input.sync="searchExam_investigation"
                  color="primary"
                  item-text="title"
                  return-object
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.exam_investigation.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'diagnostic'"
              >
                <v-autocomplete
                  v-model="formData.diagnostic"
                  :items="itemsDiagnostic"
                  :loading="isLoadingDiagnostic"
                  :search-input.sync="searchDiagnostic"
                  color="primary"
                  item-text="title"
                  return-object
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.diagnostic.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'surgery'"
              >
                <v-autocomplete
                  v-model="formData.surgery"
                  :items="itemsSurgery"
                  :loading="isLoadingSurgery"
                  :search-input.sync="searchSurgery"
                  color="primary"
                  item-text="title"
                  return-object
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.surgery.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                v-if="this.form.bill_type === 'checkup'"
              >
                <v-autocomplete
                  v-model="formData.checkup"
                  :items="itemsCheckup"
                  :loading="isLoadingCheckup"
                  :search-input.sync="searchCheckup"
                  color="primary"
                  return-object
                  item-text="title"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.checkup.title')"
                  class="font-weight-bold"
                  outlined
                  clearable
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  :value="get_product_code"
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <!--            <v-col-->
              <!--              cols="12"-->
              <!--              sm="2"-->
              <!--              class="mb-0 py-0"-->
              <!--              v-if="this.form.bill_shape === 'ORDINANCE'"-->
              <!--            >-->
              <!--              <v-text-field-->
              <!--                v-model="formData.quantity_ordered"-->
              <!--                color="primary"-->
              <!--                :label="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.quantity_ordered.title')-->
              <!--                "-->
              <!--                class="font-weight-bold"-->
              <!--                outlined-->
              <!--                dense-->
              <!--                type="number"-->
              <!--                min="0"-->
              <!--                :rules="[numberRuleQteOrdered]"-->
              <!--              ></v-text-field>-->
              <!--            </v-col>-->
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.quantity_served"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.quantity_served.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  :rules="[numberRuleQteServed]"
                  min="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.pub.title') +
                    ' : ' +
                    this.get_price_patient
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="formData.unit_price"
                ></v-text-field
              ></v-col>
              <!--            <v-text-field-->
              <!--              color="primary"-->
              <!--              :label="$vuetify.lang.t('$vuetify.bills.cols.price.title')"-->
              <!--              class="font-weight-bold"-->
              <!--              outlined-->
              <!--              dense-->
              <!--              :value="get_act_price"-->
              <!--              readonly-->
              <!--              filled-->
              <!--              style="max-width: 210px"-->
              <!--              v-if="this.form.bill_type === 'MEDICAL_ACT'"-->
              <!--            ></v-text-field>-->

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_gross.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_amount_gross"
                  dense
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.delivery.title')"
                  class="font-weight-bold"
                  outlined
                  type="number"
                  min="0"
                  :rules="[numberRuleDelivery]"
                  dense
                  v-model="formData.delivery"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.pun.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  filled
                  :value="get_pu_net"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_net.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_amount_net"
                  dense
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                v-if="get_assured === true"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                v-if="get_assured === true"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title_patient')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance_patient"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="1" class="mb-0 py-0">
                <v-btn
                  light
                  color="primary"
                  :loading="loadingBtn"
                  :disabled="
                    this.formData.quantity_served === null ||
                    this.get_price_patient === 0
                  "
                  type="submit"
                  class="font-weight-bold ml-5 white--text"
                >
                  {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>
      </v-card>
      <v-card
        style="margin-top: 1px"
        v-if="this.$auth.user().type_enterprise === 'RETAIL'"
      >
        <v-form @submit.prevent="saveDetails">
          <br />
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="form.code"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.bill_N.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="$auth.user().username"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.additional_info"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.additional_info.title'
                    )
                  "
                  prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="supply"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.storage_depots"
                  :items="itemsDepot"
                  :loading="isLoadingDepot"
                  :search-input.sync="searchDepot"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.supplies.cols.storage_depot.title'
                    )
                  "
                  prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t(
                        "$vuetify.supplies.cols.storage_depot.title"
                      )
                    }}
                  </template></v-autocomplete
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="formData.details_stock"
                  :items="itemsProduct"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="product_name"
                  item-value="id"
                  return-object
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  :value="get_product_code"
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <!--            <v-col-->
              <!--              cols="12"-->
              <!--              sm="2"-->
              <!--              class="mb-0 py-0"-->
              <!--              v-if="this.form.bill_shape === 'ORDINANCE'"-->
              <!--            >-->
              <!--              <v-text-field-->
              <!--                v-model="formData.quantity_ordered"-->
              <!--                color="primary"-->
              <!--                :label="-->
              <!--                  $vuetify.lang.t('$vuetify.bills.cols.quantity_ordered.title')-->
              <!--                "-->
              <!--                class="font-weight-bold"-->
              <!--                outlined-->
              <!--                dense-->
              <!--                type="number"-->
              <!--                min="0"-->
              <!--                :rules="[numberRuleQteOrdered]"-->
              <!--              ></v-text-field>-->
              <!--            </v-col>-->
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.quantity_served"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.quantity_served.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  :rules="[numberRuleQteServed]"
                  min="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.pub.title') +
                    ' : ' +
                    this.get_price_patient
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  v-model="formData.unit_price"
                ></v-text-field
              ></v-col>
              <!--            <v-text-field-->
              <!--              color="primary"-->
              <!--              :label="$vuetify.lang.t('$vuetify.bills.cols.price.title')"-->
              <!--              class="font-weight-bold"-->
              <!--              outlined-->
              <!--              dense-->
              <!--              :value="get_act_price"-->
              <!--              readonly-->
              <!--              filled-->
              <!--              style="max-width: 210px"-->
              <!--              v-if="this.form.bill_type === 'MEDICAL_ACT'"-->
              <!--            ></v-text-field>-->

              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_gross.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_amount_gross"
                  dense
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.delivery.title')"
                  class="font-weight-bold"
                  outlined
                  type="number"
                  min="0"
                  :rules="[numberRuleDelivery]"
                  dense
                  v-model="formData.delivery"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.pun.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  filled
                  :value="get_pu_net"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_net.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_amount_net"
                  dense
                  readonly
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                v-if="get_assured === true"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                v-if="get_assured === true"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title_patient')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance_patient"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-btn
                  light
                  color="primary"
                  :loading="loadingBtn"
                  :disabled="
                    this.formData.quantity_served === null ||
                    this.get_price_patient === 0
                  "
                  type="submit"
                  class="font-weight-bold ml-5 white--text"
                >
                  {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>
      </v-card>
      <v-card
        style="background-color: #e9eef4; margin-top: 1px"
        color="#E9EEF4"
        v-if="this.$auth.user().type_enterprise === 'RETAIL'"
      >
        <v-form :disabled="this.get_bills_amount == 0">
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.net_payable.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_amount"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.tva.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_tva"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.ttc.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_ttc"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.net_payable.title2')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_amount_net"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="form.amount_received"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_received.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRuleamount_received]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  :value="get_bills_amount_paid"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_paid.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRuleamount_paid]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="get_balance"
                  :value="get_balance"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.balance.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  min="0"
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="get_refund"
                  :value="get_refund"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.refund.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  disabled
                  min="0"
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-select
                  v-model="form.payment_method"
                  color="primary"
                  :items="optionPayment.type_Payment"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                  "
                  prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="form.amount_received === 0"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
                v-if="
                  this.form.payment_method === 'OM' ||
                  this.form.payment_method === 'MOMO'
                "
              >
                <v-text-field
                  v-model="form.phone_number"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.phone_number.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRulephone_number]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
                v-if="this.form.payment_method === 'BANK_CARD'"
              >
                <v-text-field
                  v-model="form.bank_card_number"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.bills.cols.bank_card_number.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRulebank_card_number]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="primary"
              @click="resetFormBills()"
              :loading="loadingBtn"
            >
              {{ $vuetify.lang.t("$vuetify.btn.reset") }}
            </v-btn>
            <!--          <v-btn-->
            <!--            dark-->
            <!--            color="primary"-->
            <!--            @click="save()"-->
            <!--            :loading="loadingBtn"-->
            <!--            :disabled="-->
            <!--              this.get_bills_amount === 0 ||-->
            <!--                this.form.payment_method === null ||-->
            <!--                form.amount_received === null ||-->
            <!--                form.amount_received === ''-->
            <!--            "-->
            <!--          >-->
            <!--            {{ $vuetify.lang.t("$vuetify.bills.new.save_bills") }}-->
            <!--          </v-btn>-->
            <v-btn
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO'
              "
              color="primary"
              class="white--text"
              :loading="loadingBtn"
              @click="save_print_bills()"
              :disabled="
                this.get_bills_amount == 0 ||
                form.payment_method == null ||
                form.amount_received == null ||
                form.phone_number == null ||
                form.payment_method == 'NO_PAY'
              "
            >
              {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
            </v-btn>
            <v-btn
              v-else
              color="primary"
              class="white--text"
              :loading="loadingBtn"
              @click="save_print_bills()"
              :disabled="
                form.payment_method == null ||
                form.amount_received == null ||
                form.payment_method == 'NO_PAY'
              "
            >
              {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
            </v-btn>
            <!--          <v-btn-->
            <!--            color="primary"-->
            <!--            :loading="loadingBtn"-->
            <!--            dark-->
            <!--            @click="print_bills()"-->
            <!--            :disabled="this.get_bills_amount === 0"-->
            <!--          >-->
            <!--            {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}-->
            <!--          </v-btn>-->
          </v-card-actions>
          <v-divider class="mx-4"></v-divider>
        </v-form>
      </v-card>
      <v-card
        style="background-color: #e9eef4; margin-top: 1px"
        color="#E9EEF4"
        v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
      >
        <v-form :disabled="form.patient === null || form.bill_type === null">
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.net_payable.title')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_amount"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.tva.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_tva"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.ttc.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_ttc"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance_total"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.insurance.title_patient')"
                  class="font-weight-bold"
                  outlined
                  :value="get_insurance_patient_total"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.net_payable.title2')
                  "
                  class="font-weight-bold"
                  outlined
                  :value="get_bills_amount_net"
                  readonly
                  filled
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="form.amount_received"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_received.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRuleamount_received]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  :value="get_bills_amount_paid"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.amount_paid.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRuleamount_paid]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="get_balance"
                  :value="get_balance"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.balance.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  readonly
                  min="0"
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-text-field
                  v-model="get_refund"
                  :value="get_refund"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.bills.cols.refund.title')"
                  class="font-weight-bold"
                  outlined
                  dense
                  disabled
                  min="0"
                  filled
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
              >
                <v-select
                  v-model="form.payment_method"
                  color="primary"
                  :items="optionPayment.type_Payment"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                  "
                  prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  :readonly="form.amount_received === 0"
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
                v-if="
                  this.form.payment_method === 'OM' ||
                  this.form.payment_method === 'MOMO'
                "
              >
                <v-text-field
                  v-model="form.phone_number"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.phone_number.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRulephone_number]"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: 15px"
                v-if="this.form.payment_method === 'BANK_CARD'"
              >
                <v-text-field
                  v-model="form.bank_card_number"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.bills.cols.bank_card_number.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  :rules="[numberRulebank_card_number]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              color="primary"
              @click="resetFormBills()"
              :loading="loadingBtn"
            >
              {{ $vuetify.lang.t("$vuetify.btn.reset") }}
            </v-btn>
            <!--          <v-btn-->
            <!--            dark-->
            <!--            color="primary"-->
            <!--            @click="save()"-->
            <!--            :loading="loadingBtn"-->
            <!--            :disabled="-->
            <!--              this.get_bills_amount === 0 ||-->
            <!--                this.form.payment_method === null ||-->
            <!--                form.amount_received === null ||-->
            <!--                form.amount_received === ''-->
            <!--            "-->
            <!--          >-->
            <!--            {{ $vuetify.lang.t("$vuetify.bills.new.save_bills") }}-->
            <!--          </v-btn>-->
            <v-btn
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO'
              "
              color="primary"
              class="white--text"
              :loading="loadingBtn"
              @click="save_print_bills()"
              :disabled="
                this.get_bills_amount == 0 ||
                form.payment_method == null ||
                form.amount_received == null ||
                form.phone_number == null ||
                form.payment_method == 'NO_PAY'
              "
            >
              {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
            </v-btn>
            <v-btn
              v-else
              color="primary"
              class="white--text"
              :loading="loadingBtn"
              @click="save_print_bills()"
              :disabled="
                form.payment_method == null ||
                form.amount_received == null ||
                form.payment_method == 'NO_PAY'
              "
            >
              {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
            </v-btn>
            <!--          <v-btn-->
            <!--            color="primary"-->
            <!--            :loading="loadingBtn"-->
            <!--            dark-->
            <!--            @click="print_bills()"-->
            <!--            :disabled="this.get_bills_amount === 0"-->
            <!--          >-->
            <!--            {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}-->
            <!--          </v-btn>-->
          </v-card-actions>
          <v-divider class="mx-4"></v-divider>
        </v-form>
      </v-card>

      <v-card style="margin-top: 1px">
        <v-card-text>
          <v-data-table
            :footer-props="{
              'items-per-page-options': itemPerPageOptions,
            }"
            :headers="headers"
            :items="items"
            :items-per-page="itemPerPage"
            :loading="loadingDetails.list"
            :options.sync="pagination"
            :server-items-length="meta.totalElements"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            item-key="name"
            class="mt-5"
            hide-default-footer
          >
            <template v-slot:header.product_name="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.product_code="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.quantity_served="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>

            <template v-slot:header.pun="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.delivery="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>

            <template v-slot:header.amount_net="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.insurance="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.insurance_patient="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.tva="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
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
                        item.details_stock
                          ? item.details_stock.product.name
                          : item.medical_act
                          ? item.medical_act.title
                          : item.laboratory
                          ? item.laboratory.title
                          : item.checkup
                          ? item.checkup.title
                          : item.surgery
                          ? item.surgery.title
                          : item.radiography
                          ? item.radiography.title
                          : item.functional_exploration
                          ? item.functional_exploration.title
                          : item.type_consultation
                          ? item.type_consultation.title
                          : item.diagnostic
                          ? item.diagnostic.title
                          : item.exam_investigation
                          ? item.exam_investigation.title
                          : item.room
                          ? item.room.name
                          : "-"
                      }}
                    </td>

                    <td class="subtitle-2">
                      {{ item.quantity_served }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.delivery }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.pun }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.amount_net }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.insurance }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.insurance_patient }}
                    </td>
                    <td class="subtitle-2">
                      {{ item.tva }}
                    </td>
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
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-update</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.edit")
                          }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              @click="deleteItem(item)"
                              color="red"
                              icon
                              text
                              v-on="on"
                              dark
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-delete-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.remove")
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
            @getItemsDetails="getItemsDetails"
          ></delete-item>
        </v-card-text>
      </v-card>
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
      <!--    <pdf :src="pdfsrc"></pdf>-->
    </div>
  </v-dialog>
</template>

<script>
// import axios from "axios";c
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
import FormPdf from "./../bills/Pdf";
// const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          patient: null,
          doctor: null,
          medical_act: null,
          patient_name: null,
          patient_balance: null,
          net_payable: null,
          patient_type: null,
          bills_date: null,
          pub: null,
          pun: null,
          storage_depots: null,
          amount_gross: null,
          ordinance: null,
          payment_method: null,
          quantity_ordered: null,
          amount_net: null,
          total_amount: null,
          quantity_served: null,
          details_stock: null,
          type_accommodation: null,
          delivery: null,
          balance: null,
          bills: null,
          cash: null,
          tva: null,
          reference_no: null,
          phone_number: null,
          additional_info: "R.A.S",
          bills_amount: null,
          code: null,
          cashier: null,
          bill_type: "pharmacy",
          amount_received: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      patient: null,
      doctor: null,
      medical_act: null,
      type_consultation: null,
      refund: null,
      diagnostic: null,
      exam_investigation: null,
      patient_name: null,
      patient_balance: null,
      sales_packaging: null,
      net_payable: null,
      patient_type: null,
      laboratory: null,
      surgery: null,
      checkup: null,
      tva: null,
      ordinance: null,
      radiography: null,
      functional_exploration: null,
      room: null,
      bills_date: null,
      pub: null,
      unit_price: null,
      pun: null,
      amount_gross: null,
      payment_method: null,
      quantity_ordered: null,
      amount_net: null,
      total_amount: null,
      quantity_served: 1,
      bank_card_number: null,
      details_stock: null,
      delivery: null,
      balance: null,
      bills: null,
      reference_no: null,
      additional_info: null,
      bills_amount: null,
      code: null,
      cashier: null,
      bill_type: null,
      number_bed: null,
      is_accounted: null,
      amount_paid: null,
      amount_received: null,
    },
    isLoadingExam_investigation: false,
    searchExam_investigation: null,
    itemsExam_investigation: [],
    urlExam_investigation: "exam_investigations/all",
    isLoadingDiagnostic: false,
    searchDiagnostic: null,
    itemsDiagnostic: [],
    urlDiagnostic: "diagnostics/all",
    isLoadingRadiography: false,
    searchRadiography: null,
    itemsRadiography: [],
    urlRadiography: "radiographs/all",
    isLoadingSurgery: false,
    searchSurgery: null,
    itemsSurgery: [],
    urlSurgery: "surgeries/all",
    isLoadingCheckup: false,
    searchCheckup: null,
    itemsCheckup: [],
    urlCheckup: "checkups/all",
    isLoadingOrdinance: false,
    searchOrdinance: null,
    itemsOrdinance: [],
    urlOrdinance: "ordinances",
    isLoadingLaboratory: false,
    searchLaboratory: null,
    itemsLaboratory: [],
    urlLaboratory: "laboratories/all",
    maxDate: new Date().toISOString().substr(0, 10),
    optionPayment: {
      type_Payment: [],
    },
    optionType: {
      type_accommodation: [],
    },
    pdfsrc: null,
    headers: [],
    headers_act: [],
    items: [],
    meta: {},
    sum: "",
    simple_tva: null,
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 30,
    //itemPerPages: 3,
    itemPerPageOptions: [30, 40, 50],
    urlDeleteItems: "",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogFormPermit: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    isLoadingDepot: false,
    searchDepot: null,
    itemsDepot: [],
    urlDepot: "storage_depots",
    isLoading: false,
    searchSales_packaging: null,
    itemsSales_packaging: [],
    urlSales_packaging: "sales_packaging",
    isLoadingSales_packaging: false,
    search: null,
    urlRoom: "rooms",
    itemsRoom: [],
    isLoadingRoom: false,
    searchRoom: null,
    numberRuleDelivery: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteOrdered: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_received: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_paid: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulephone_number: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulebank_card_number: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    searchDoctor: null,
    isActive: false,
    pricePatient: null,
    isInventory: false,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    tva_collected: null,
    menu4: false,
    menu: false,
    dialogFormCMV: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormCash: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormWarning: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogForm: {
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
    dialogFormSet: {
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
    searchType_consultation: null,
    itemsType_consultation: [],
    isLoadingType_consultation: false,
    urlType_consultation: "type_consultations/all",
    optionBills: {
      type_bills: [],
    },
    optionNumberBed: {
      number_bed: [],
    },
    optionShape: {
      type_shape: [],
    },
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingPrice: {
      list: false,
      refresh: false,
      filter: false,
    },

    isLoadingMedical_act: false,
    searchMedical_act: null,
    itemsMedical_act: [],
    urlMedical_act: "medical_act",
    itemsProduct: [],
    product_public_price: "",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    urlPatient: "patients/allPatients",
    urlItemsPatientSolde: "patients/solde",
    urlDoctor: "doctors",
    itemsDoctor: [],
    isLoadingDoctor: false,
    urlItemsCash: "cashs/isOpen",
    urlItemsHospital: "hospitals",
    urlProduct: "details_stocks/specify",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
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
    pagination: {
      handler() {
        this.getItemsDetails();
      },
      deep: true,
    },

    searchDepot(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDepot = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot = response.data.content;
          this.itemsProduct = [];
          this.formData.details_stock = null;
        })
        .finally(() => (this.isLoadingDepot = false));
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
          // console.log("respp", response.data.content);
          self.itemsDiagnostic = response.data.content;
        })
        .finally(() => (this.isLoadingDiagnostic = false));
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
          self.itemsRadiography = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingRadiography = false));
    },
    searchExam_investigation(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingExam_investigation = true;
      this.$store
        .dispatch("request", {
          url: self.urlExam_investigation,
          params: params,
        })
        .then((response) => {
          self.itemsExam_investigation = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingExam_investigation = false));
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
          self.itemsSurgery = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingSurgery = false));
    },
    searchType_consultation(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_consultation = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_consultation,
          params: params,
        })
        .then((response) => {
          self.itemsType_consultation = response.data.content;
        })
        .finally(() => (this.isLoadingType_consultation = false));
    },
    searchCheckup(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingCheckup = true;
      this.$store
        .dispatch("request", {
          url: self.urlCheckup,
          params: params,
        })
        .then((response) => {
          self.itemsCheckup = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingCheckup = false));
    },
    searchOrdinance(value) {
      if (value === null) return;
      const params = { code: value, patient: this.form.patient["id"] };
      let self = this;
      this.isLoadingOrdinance = true;
      this.$store
        .dispatch("request", {
          url: self.urlOrdinance,
          params: params,
        })
        .then((response) => {
          self.itemsOrdinance = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingOrdinance = false));
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
    searchMedical_act(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlMedical_act,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_act = response.data.content;
          // this.formData.quantity_served = 1;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoading = false));
    },
    search(value) {
      // console.log(this.$auth.user().storage_depots === 'null')
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: this.form.storage_depots
            ? self.urlProduct + "?storage_depots=" + this.form.storage_depots
            : self.urlProduct +
              "?storage_depots=" +
              this.$auth.user()?.storage_depots.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;

          this.reset_product_detail_act();
          // this.formData.quantity_served = 1;
        })
        .finally(() => (this.isLoading = false));
    },
    searchPatient(value) {
      if (value === null) return;
      this.isLoadingPatient = true;
      const params = { name: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlPatient,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDoctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctor,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoadingDoctor = false));
    },
  },
  created() {
    this.setHeaders();
    this.setHeadersAct();
    this.getOptionsBill();
    this.getOptionsNumberBed();
    this.getOptionsShape();
    this.getOptionsType();
    this.getOptionsPatient_shape();
    this.getOptionsPayment();
    this.resetItemsDetails();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    permit_other_depots(val) {
      this.dialogFormPermit.shows.showInfo = true;
      this.messages = {
        title: "$vuetify.cash.cols.status.enabled",
        submit: "$vuetify.cash.update.submit",
        success: "$vuetify.cash.update.success",
      };
      this.$refs.permitOthers.setForm(val);
    },
    reset_product_detail() {
      this.formData.details_stock = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
    },
    reset_medical_act() {
      this.formData.details_stock = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.laboratory = null;
      this.formData.surgery = null;
      this.form.type_accommodation = null;
      this.formData.ordinance = null;
      this.formData.checkup = null;
      this.formData.radiography = null;
      this.formData.number_bed = null;
      this.formData.room = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_detail_stock() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.laboratory = null;
      this.formData.surgery = null;
      this.form.type_accommodation = null;
      this.formData.ordinance = null;
      this.formData.number_bed = null;
      this.formData.checkup = null;
      this.formData.radiography = null;
      this.formData.room = null;
      this.formData.type_consultation = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_laboratory() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.ordinance = null;
      this.form.type_accommodation = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.room = null;
      this.formData.number_bed = null;
      this.formData.radiography = null;
      this.formData.type_consultation = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_surgery() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.ordinance = null;
      this.form.type_accommodation = null;
      this.formData.checkup = null;
      this.formData.radiography = null;
      this.formData.number_bed = null;
      this.formData.room = null;
      this.formData.type_consultation = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_checkup() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.ordinance = null;
      this.form.type_accommodation = null;
      this.formData.surgery = null;
      this.formData.radiography = null;
      this.formData.room = null;
      this.formData.number_bed = null;
      this.formData.type_consultation = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_radiography() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.ordinance = null;
      this.form.type_accommodation = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.number_bed = null;
      this.formData.room = null;
      this.formData.type_consultation = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_type_consultation() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.ordinance = null;
      this.formData.laboratory = null;
      this.form.type_accommodation = null;
      this.formData.number_bed = null;
      this.formData.radiography = null;
      this.formData.room = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_ordinance() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.surgery = null;
      this.formData.radiography = null;
      this.form.type_accommodation = null;
      this.formData.number_bed = null;
      this.formData.room = null;
      this.formData.checkup = null;
      this.formData.diagnostic = null;
      this.formData.exam_investigation = null;
    },
    reset_diagnostic() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.radiography = null;
      this.formData.room = null;
      this.formData.number_bed = null;
      this.form.type_accommodation = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.ordinance = null;
      this.formData.exam_investigation = null;
    },
    reset_exam_investigation() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.radiography = null;
      this.form.type_accommodation = null;
      this.formData.room = null;
      this.formData.number_bed = null;
      this.formData.bed = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.ordinance = null;
      this.formData.diagnostic = null;
    },
    reset_room() {
      this.formData.medical_act = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.formData.details_stock = null;
      this.formData.laboratory = null;
      this.formData.radiography = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.ordinance = null;
      this.formData.diagnostic = null;
    },
    reset_product_detail_act() {
      this.formData.medical_act = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
    },
    resetFormPro() {
      this.formData.details_stock = null;
      this.formData.quantity_served = null;
    },
    get_qte_stock() {
      if (
        this.formData.details_stock?.qte_stock === 0 ||
        this.formData.quantity_served > this.formData.details_stock?.qte_stock
      ) {
        this.dialogFormWarning.show = true;
      } else {
        this.dialogFormWarning.show = false;
      }
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
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
    getOptionsBill() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_bills, (type_bills) => {
        self.optionBills.type_bills.push({
          text: self.$vuetify.lang.t(type_bills.text),
          value: type_bills.value,
        });
      });
    },
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
    getOptionsShape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_shape, (type_shape) => {
        self.optionShape.type_shape.push({
          text: self.$vuetify.lang.t(type_shape.text),
          value: type_shape.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
      this.resetItemsDetails();
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
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
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.title",
          value: "insurance",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.title_patient",
          value: "insurance_patient",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.tva.title",
          value: "tva",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
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
    setHeadersAct() {
      this.headers_act = [
        {
          text: "$vuetify.medical_act.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "20",
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
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
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
    createPatient() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patient.new.title",
        submit: "$vuetify.patient.new.submit",
        success: "$vuetify.patient.new.success",
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
    },
    currentInventory() {
      this.dialogFormInv.show = true;
    },
    createD() {
      this.dialogFormCMV.show = true;
      this.messagesCMV = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
    },
    createP() {
      this.dialogFormSet.show = true;
      this.messagesSet = {
        title: "$vuetify.patients_settlements.new.title",
        submit: "$vuetify.patients_settlements.new.submit",
        success: "$vuetify.patients_settlements.new.success",
      };
    },

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        doctor: this.form.doctor["id"],
        patient: this.form.patient["id"],
        cash:
          this.form.cash === undefined || this.form.cash === null
            ? null
            : this.form.cash["id"],
        cashier: this.form.cash
          ? this.form.cash["user"]["id"]
          : this.$auth.user().id,
        patient_type: this.form.patient_type,
        bills_date: this.form.createdAt,
        bill_type: this.form.bill_type,
        type_accommodation: this.form.type_accommodation,
        // bill_shape: this.form.bill_shape,
        patient_balance: this.get_patient_solde,
        additional_info: this.form.additional_info,
        phone_number: this.form.phone_number,
        bank_card_number: this.form.bank_card_number,
        storage_depots: this.form.storage_depots,
        payment_method:
          this.form.amount_received === 0
            ? "NO_PAY"
            : this.form.payment_method === null
            ? "CASH"
            : this.form.payment_method,
        bills_amount: this.get_bills_amount,
        amount_paid: this.get_bills_amount_paid,
        net_payable: this.get_bills_amount_net,
        tva: this.get_bills_tva,
        ttc: this.get_bills_ttc,
        insurance: this.get_insurance_total,
        insurance_patient: this.get_insurance_patient_total,
        amount_received:
          this.form.amount_received === null ? 0 : this.form.amount_received,
        balance: this.get_balance,
        refund: this.get_refund,
      };
      return data;
    },
    resetDataForm() {
      this.form.id = null;
      this.formData.details_stock = null;
      this.form.patient = null;
      this.formData.medical_act = null;
      this.form.doctor = null;
      this.items = [];
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
      this.resetItemsDetails();
      this.form.bill_type = "pharmacy";
      // this.form.bill_shape = "CLASSIC";
      this.form.additional_info = "R.A.S";
      this.form.payment_method = "NO_PAY";
    },
    resetFormBills() {
      this.form.id = null;
      this.formData.details_stock = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.form.patient = null;
      this.formData.medical_act = null;
      this.form.doctor = null;
      this.items = [];
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
      this.form.bill_type = "pharmacy";
      // this.form.bill_shape = "CLASSIC";
      this.form.additional_info = "R.A.S";
      this.form.payment_method = "CASH";
      this.form.bills_date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    resetItemsDetails() {
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
            url: self.urlItemsDetails_bills + "?bills=reset",
            params: params,
          })
          .then((response) => {
            let data = response.data;
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

    getDataFormdetails() {
      let type_product = ["ordinance", "pharmacy"];
      let data = {
        quantity_served:
          this.form.bill_type === "pharmacy"
            ? this.formData.quantity_served
            : 1,
        bill_type: this.form.bill_type,
        bills: this.form.bills,
        cash:
          this.form.cash === undefined || this.form.cash === null
            ? null
            : this.form.cash["id"],
        type_accommodation: this.form.type_accommodation,
        details_stock:
          this.formData.details_stock === undefined ||
          this.formData.details_stock === null
            ? ""
            : this.formData.details_stock["id"],
        quantity_ordered:
          this.formData.quantity_ordered === null
            ? 0
            : this.formData.quantity_ordered,
        pub: this.formData.unit_price
          ? this.formData.unit_price
          : this.get_price_patient,
        pun: this.get_pu_net,
        storage_depots: type_product.includes(this.form.bill_type)
          ? this.form.storage_depots
            ? this.form.storage_depots
            : this.$auth.user()?.storage_depots.id
          : null,
        delivery:
          this.formData.delivery === null || this.formData.delivery === ""
            ? 0
            : this.formData.delivery,
        amount_gross: this.get_amount_gross,
        amount_net: this.get_amount_net,
        doctor: this.form.doctor["id"],
        share_doctor: this.get_share_doctor,
        tva: this.get_tva,
        createdAt: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        product: this.form.patient["id"],
        medical_act:
          this.formData.medical_act === undefined ||
          this.formData.medical_act === null
            ? ""
            : this.formData.medical_act["id"],
        room:
          this.formData.room === undefined || this.formData.room === null
            ? ""
            : this.formData.room["id"],
        ordinance:
          this.formData.ordinance === undefined ||
          this.formData.ordinance === null
            ? ""
            : this.formData.ordinance["id"],
        laboratory:
          this.formData.laboratory === undefined ||
          this.formData.laboratory === null
            ? ""
            : this.formData.laboratory["id"],
        surgery:
          this.formData.surgery === undefined || this.formData.surgery === null
            ? ""
            : this.formData.surgery["id"],
        insurance: this.form.bill_type === "pharmacy" ? 0 : this.get_insurance,
        insurance_patient:
          this.form.bill_type === "pharmacy" ? 0 : this.get_insurance_patient,
        type_consultation:
          this.formData.type_consultation === undefined ||
          this.formData.type_consultation === null
            ? ""
            : this.formData.type_consultation["title"],
        checkup:
          this.formData.checkup === undefined || this.formData.checkup === null
            ? ""
            : this.formData.checkup["id"],
        radiography:
          this.formData.radiography === undefined ||
          this.formData.radiography === null
            ? ""
            : this.formData.radiography["id"],
        exam_investigation:
          this.formData.exam_investigation === undefined ||
          this.formData.exam_investigation === null
            ? ""
            : this.formData.exam_investigation["id"],
        diagnostic:
          this.formData.diagnostic === undefined ||
          this.formData.diagnostic === null
            ? ""
            : this.formData.diagnostic["id"],
        // pub:this.get_product_public_price,0
        // pub_act:this.get_product_public_price_act,
        // pun:this.get_pu_net,
        // pun_act:this.get_pu_net_act,
        // delivery:
        //     this.formData.delivery === null || this.formData.delivery === ""
        //         ? 0
        //         : this.formData.delivery,
        // amount_gross:this.get_amount_gross,
        // amount_gross_act:this.get_amount_gross_act,
        // amount_net:this.get_amount_net,
        // amount_net_act:this.get_amount_net_act,
      };

      return data;
    },
    getDataFormdetailsOrdinance() {
      let type_product = ["ordinance", "pharmacy"];
      let data = {
        details_stock:
          this.formData.details_stock === undefined ||
          this.formData.details_stock === null
            ? ""
            : this.formData.details_stock["id"],
        storage_depots: type_product.includes(this.form.bill_type)
          ? this.form.storage_depots
            ? this.form.storage_depots
            : this.$auth.user()?.storage_depots.id
          : null,
        ordinance:
          this.formData.ordinance === undefined ||
          this.formData.ordinance === null
            ? ""
            : this.formData.ordinance["id"],
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.cash = item.cash;
      this.form.code = item.code;
      this.form.patient = item.patient;
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor;
      this.itemsDoctor.push(item.doctor);
      this.form.patient_name = item.patient["name"];
      this.form.patient_type = item.patient["shape"];
      this.form.is_accounted = item.is_accounted;
      this.form.details_stock = item.details_stock;
      this.form.bank_card_number = item.bank_card_number;
      this.form.amount_received = item.amount_received;
      this.form.amount_paid = item.amount_paid;
      this.form.storage_depots =
        item.storage_depots === null ? "" : item.storage_depots["id"];
      this.itemsDepot.push(item.storage_depots);
      this.form.phone_number = item.phone_number;
      this.form.bills_date = item.createdAt;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      this.form.type_accommodation = item.type_accommodation;
      // this.form.bill_shape = item.bill_shape;
      this.form.additional_info = item.additional_info;
      this.form.refund = item.refund;
      this.form.tva = item.tva;
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    getMethodDetails() {
      //this.reset = this.form.id === undefined
      return "POST";
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    refreshItemsDetail() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
    },
    getHospital() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.tva_collected = data.content[0].VAT_collected;
            resolve(response);
          });
      });
    },
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsCash,
          })
          .then((response) => {
            let data = response.data;
            self.isActive = data.content.is_active;
            self.isInventory = data.content.is_inventory;
            if (self.isActive === false) {
              if (self.isInventory === false) {
                this.createCash();
              } else {
                this.currentInventory();
              }
            } else {
              self.isActive = data.content.is_active;
              if (self.isInventory === true) {
                this.currentInventory();
              }
            }

            // console.log("meta", data);
            resolve(response);
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
    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            // FileSaver.saveAs(blob, fileName);
            // const dataUrl = window.URL.createObjectURL(blob);
            //
            // // Open the window
            // const pdfWindow = window.open(dataUrl);
            //
            // // Call print on it
            // pdfWindow.print();
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
    print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?just_print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
            url: self.urlItemsDetails_bills + "?bills=" + this.form.bills,
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
    editDetails(item) {
      // this.itemsProduct = [];
      // this.itemsProduct.push(item.details_stock);
      if (item.details_stock) {
        this.reset_detail_stock();
        console.log(item);
        this.formData.details_stock = item.details_stock;
        this.itemsProduct.push(item.details_stock);
        // this.formData.details_stock = item.details_stock;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.medical_act) {
        this.reset_medical_act();
        this.formData.medical_act = item.medical_act;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.laboratory) {
        this.reset_laboratory();
        this.formData.laboratory = item.laboratory;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.radiography) {
        this.reset_radiography();
        this.formData.radiography = item.radiography;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.surgery) {
        this.reset_surgery();
        this.formData.surgery = item.surgery;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.checkup) {
        this.reset_checkup();
        this.formData.checkup = item.checkup;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.diagnostic) {
        this.reset_diagnostic();
        this.formData.diagnostic = item.diagnostic;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.room) {
        this.reset_room();
        this.formData.room = item.room;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      } else if (item.exam_investigation) {
        this.reset_exam_investigation();
        this.formData.exam_investigation = item.exam_investigation;
        this.formData.quantity_served = item.quantity_served;
        this.formData.quantity_ordered = item.quantity_ordered;
        this.formData.delivery = item.delivery;
      }
    },
    resetAll() {
      // this.itemsProduct = [];
      // this.itemsProduct.push(item.details_stock);
      if (this.form.bill_type === "pharmacy") {
        this.reset_detail_stock();
      } else if (this.form.bill_type === "medical_act") {
        this.reset_medical_act();
      } else if (this.form.bill_type === "laboratory") {
        this.reset_laboratory();
      } else if (this.form.bill_type === "radiography") {
        this.reset_radiography();
      } else if (this.form.bill_type === "surgery") {
        this.reset_surgery();
      } else if (this.form.bill_type === "checkup") {
        this.reset_checkup();
      } else if (this.form.bill_type === "diagnostic") {
        this.reset_diagnostic();
      } else if (this.form.bill_type === "hospitalization") {
        this.reset_room();
      } else if (this.form.bill_type === "exam_investigation") {
        this.reset_exam_investigation();
      }
    },
    resetDataFormProduct() {
      this.formData.quantity_served = 0;
      this.formData.details_stock = null;
      this.formData.medical_act = null;
      this.formData.laboratory = null;
      this.formData.surgery = null;
      this.formData.checkup = null;
      this.formData.quantity_served = null;
      this.formData.quantity_ordered = null;
      this.formData.delivery = null;
      this.formData.radiography = null;
      this.formData.exam_investigation = null;
      this.formData.diagnostic = null;
      this.formData.unit_price = null;
    },
    saveDetails() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: self.getMethodDetails(),
            data: self.getDataFormdetails(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveDetailsOrdinance() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: self.getMethod(),
            data: self.getDataFormdetailsOrdinance(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
  },
  computed: {
    get_assured() {
      if (this.formData.type_consultation === undefined) {
        return 0;
      } else {
        let response = "";
        response =
          this.formData.type_consultation === null
            ? ""
            : this.formData.type_consultation?.is_assured;
        return response;
      }
    },
    get_patient_code() {
      let patient_code = "";
      patient_code = this.form.patient === null ? "" : this.form.patient?.code;
      return patient_code;
    },

    get_patient_shape() {
      let patient_shape = "";

      patient_shape =
        this.form.patient === null ? "" : this.form.patient?.type_patient.title;
      return patient_shape;
    },
    get_price_patient() {
      let price_patient = 0;
      if (
        this.formData.laboratory !== null ||
        this.formData.details_stock !== null ||
        this.formData.medical_act !== null ||
        this.formData.radiography !== null ||
        this.formData.room !== null ||
        this.formData.type_consultation !== null ||
        this.formData.surgery !== null ||
        this.formData.diagnostic !== null ||
        this.formData.exam_investigation !== null ||
        this.formData.checkup !== null
      ) {
        if (this.form.bill_type === "hospitalization") {
          console.log(this.formData?.room["prices"]);
          let price =
            this.formData.number_bed !== null
              ? this.formData?.room["prices"].find((el) => {
                  if (
                    el.type_patient === this.get_patient_shape &&
                    el.type_accommodation === this.form.type_accommodation &&
                    el.other_code === this.get_product_code &&
                    el.number_bed === this.formData.number_bed
                  )
                    return true;
                })
              : 0;
          // let price = this.formData.number_bed !== null?this.formData?.room["prices"].find(el => el.type_patient === this.get_patient_shape && el => el.type_accommodation === this.form.type_accommodation && el => el.other_code === this.get_product_code && el => el.number_bed === this.formData.number_bed):0;
          if (price) {
            price_patient = price["price"];
          } else {
            price_patient = 0;
          }
        } else if (this.form.bill_type === "pharmacy") {
          price_patient =
            this.formData.details_stock === null
              ? ""
              : this.formData.details_stock?.product.public_price;
        } else if (this.form.bill_type === "consultation") {
          let price = this.formData["type_consultation"]
            ? this.formData["type_consultation"]["prices"].find(
                (el) => el.type_patient === this.get_patient_shape,
                (el) => el.other_code === this.get_product_code
              )
            : null;
          price_patient = price == undefined ? 0 : price["price"];
        } else {
          let price = this.formData[this.form.bill_type]
            ? this.formData[this.form.bill_type]["prices"].find(
                (el) => el.type_patient === this.get_patient_shape,
                (el) => el.other_code === this.get_product_code
              )
            : null;
          price_patient = price == undefined ? 0 : price["price"];
        }
      }
      return price_patient;
    },
    get_product_code() {
      let code = "";
      if (this.form.bill_type === "pharmacy") {
        let product_code = "";
        product_code =
          this.formData.details_stock === null ||
          this.formData.details_stock === undefined
            ? ""
            : this.formData.details_stock?.product.code;
        let product_stock = "";
        console.log(this.formData.details_stock);
        product_stock =
          this.formData.details_stock === null ||
          this.formData.details_stock === undefined
            ? ""
            : this.formData.details_stock?.qte_stock;
        code = product_code + "  /  " + product_stock;
      } else if (this.form.bill_type === "medical_act") {
        code =
          this.formData.medical_act === null
            ? ""
            : this.formData.medical_act?.code;
      } else if (this.form.bill_type === "laboratory") {
        code =
          this.formData.laboratory === null
            ? ""
            : this.formData.laboratory?.code;
      } else if (this.form.bill_type === "consultation") {
        code =
          this.formData.type_consultation === null
            ? ""
            : this.formData.type_consultation?.code;
      } else if (this.form.bill_type === "radiography") {
        code =
          this.formData.radiography === null
            ? ""
            : this.formData.radiography?.code;
      } else if (this.form.bill_type === "hospitalization") {
        code = this.formData.room === null ? "" : this.formData.room?.code;
      } else if (this.form.bill_type === "surgery") {
        code =
          this.formData.surgery === null ? "" : this.formData.surgery?.code;
      } else if (this.form.bill_type === "diagnostic") {
        code =
          this.formData.diagnostic === null
            ? ""
            : this.formData.diagnostic?.code;
      } else if (this.form.bill_type === "exam_investigation") {
        code =
          this.formData.exam_investigation === null
            ? ""
            : this.formData.exam_investigation?.code;
      } else {
        this.formData.checkup === null ? "" : this.formData.checkup?.code;
      }
      // else if (this.form.bill_type === "ordinance") {
      //     this.reset_ordinance();
      //     code =
      //         this.formData.ordinance === null ? "" : this.formData.ordinance?.code;
      //   }
      return code;
    },
    get_doctor() {
      let doctor = "";
      doctor =
        this.formData.ordinance === null ||
        this.formData.ordinance === undefined
          ? ""
          : this.formData.ordinance?.consultation.doctor;
      return doctor;
    },
    get_patient_solde() {
      // let patient_code = "";
      let patient_solde = "";
      patient_solde =
        this.form.patient === null ? "" : this.form.patient?.solde;
      return patient_solde;
    },
    get_patient_insurance() {
      // let patient_code = "";
      let patient_insurance = "";
      patient_insurance =
        this.form.patient?.is_assured == true
          ? this.form.patient?.insurance.percent
          : 0;
      return patient_insurance;
    },
    // get_product_public_price() {
    //   let price = "";
    //   if (this.form.bill_type === "pharmacy") {
    //     this.reset_detail_stock();
    //     // let product_stock = "";
    //     // product_stock =
    //     //   this.formData.details_stock === null ||
    //     //   this.formData.details_stock === undefined
    //     //     ? ""
    //     //     : this.formData.details_stock?.qte_stock;
    //     // if (this.formData.quantity_served > product_stock) {
    //     //   this.get_qte_stock();
    //     // }

    //     // if (
    //     //   this.formData.details_stock?.product.public_price === undefined ||
    //     //   this.formData.details_stock?.product.public_price === null
    //     // ) {
    //     //   return 0;
    //     // }
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //     price =
    //       this.formData.details_stock === null
    //         ? ""
    //         : this.formData.details_stock?.product.public_price;
    //     // this.reset_product_detail_act();
    //   } else if (this.form.bill_type === "medical_act") {
    //     this.reset_medical_act();
    //     if (this.form.patient?.shape === "COVERED") {
    //       price =
    //         this.formData.medical_act === null
    //           ? ""
    //           : this.formData.medical_act?.quotation_rate *
    //             this.form.patient?.scale_price;
    //     } else {
    //       let product_public_price = "";
    //       product_public_price =
    //         this.formData.medical_act === null
    //           ? ""
    //           : this.formData.medical_act?.price *
    //             this.formData.medical_act?.[
    //               this.form.patient?.shape.toLowerCase()
    //             ];
    //       price = Math.round(product_public_price * 100) / 100;
    //     }
    //   } else if (this.form.bill_type === "consultation") {
    //     this.reset_type_consultation();
    //     price =
    //       this.formData.type_consultation === null
    //         ? ""
    //         : this.formData.type_consultation?.price;
    //     // this.reset_product_detail();
    //   } else if (this.form.bill_type === "laboratory") {
    //     this.reset_laboratory();
    //     price =
    //       this.formData.laboratory === null
    //         ? ""
    //         : this.formData.laboratory?.price;
    //     // this.reset_product_detail();
    //   } else if (this.form.bill_type === "radiography") {
    //     this.reset_radiography();
    //     price =
    //       this.formData.radiography === null
    //         ? ""
    //         : this.formData.radiography?.price;
    //   } else if (this.form.bill_type === "surgery") {
    //     this.reset_surgery();
    //     price =
    //       this.formData.surgery === null ? "" : this.formData.surgery?.price;
    //   } else if (this.form.bill_type === "checkup") {
    //     this.reset_checkup();
    //     price =
    //       this.formData.checkup === null ? "" : this.formData.checkup?.price;
    //   }
    //   return price;
    //   // let product_public_price = "";
    // },
    get_doctor_quote() {
      let doctor_quote = "";
      doctor_quote = this.form.doctor === null ? "" : this.form.doctor?.coef;
      return doctor_quote;
    },
    get_bills_amount() {
      let total = 0; // Ensure the total starts at 0 before the loop

      this.items.forEach((d) => {
        total += d.amount_net; // Sum up the amount_net for each item
      });
      // console.log("hum",total);

      return total;
    },
    get_bills_amount_insurance() {
      let total = 0; // Ensure the total starts at 0 before the loop

      this.items.forEach((d) => {
        total += d.insurance_patient; // Sum up the amount_net for each item

        // if (d.insurance_patient !== 0) {  // Check if insurance_patient is not 0
        //   total += d.insurance_patient;  // Add insurance_patient to the total
        // }
      });
      // console.log("hum",total);

      return total;
    },
    get_share_doctor() {
      let total = (this.get_price_patient * this.get_doctor_quote) / 100;
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);

      return total;
    },
    get_bills_tva() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.tva;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);

      return total;
    },
    get_bills_ttc() {
      let total = this.get_bills_tva + this.get_bills_amount;
      return total;
    },
    get_pu_net() {
      if (
        this.formData.delivery === undefined ||
        this.formData.delivery === null
      ) {
        return this.formData.unit_price
          ? this.formData.unit_price
          : this.get_price_patient;
      } else {
        let pun = "";
        if (this.formData.unit_price) {
          pun = this.formData.unit_price * this.formData.delivery;
        } else {
          pun = this.get_price_patient * this.formData.delivery;
        }
        let PUN = "";
        PUN = pun / 100;
        let PUNT = "";
        if (this.formData.unit_price) {
          PUNT = this.formData.unit_price - PUN;
        } else {
          PUNT = this.get_price_patient - PUN;
        }

        return PUNT;
      }
    },
    get_amount_gross() {
      if (this.form.bill_type === "pharmacy") {
        let product_stock = "";
        product_stock =
          this.formData.details_stock === null ||
          this.formData.details_stock === undefined
            ? ""
            : this.formData.details_stock?.qte_stock;
        if (this.formData.quantity_served > product_stock) {
          this.get_qte_stock();
        }
      }

      let amount_gross = "";
      amount_gross =
        this.formData.quantity_served * this.formData.unit_price
          ? this.formData.unit_price
          : this.formData.quantity_served * this.get_price_patient;
      return amount_gross;
    },
    get_bills_amount_net() {
      let insurance = 0;
      let total = 0;
      if (this.get_patient_insurance == 0) {
        total = this.get_bills_amount;
      } else {
        total = this.get_insurance_patient_total;
      }
      insurance =
        parseInt(total) + parseInt(this.simple_tva ? this.simple_tva : 0);
      return insurance;
    },
    get_tva() {
      let tva = "";
      tva = this.formData.unit_price
        ? parseInt(this.formData.unit_price * this.tva_collected) / 100
        : parseInt(this.tva_collected * this.get_price_patient) / 100;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.simple_tva = tva;
      return tva;
    },
    get_insurance() {
      let insurance = "";
      insurance =
        Math.round(this.get_patient_insurance * this.get_amount_net) / 100;
      return insurance;
    },
    get_insurance_total() {
      let total_net = "";
      this.items.forEach((d) => {
        if (d.insurance_patient === 0) {
          // Check if insurance_patient is not 0
          total_net += d.amount_net; // Sum up the amount_net for each item
        }
      });
      let total_insurance = "";
      this.items.forEach((d) => {
        // total += d.amount_net;  // Sum up the amount_net for each item

        if (d.insurance_patient !== 0) {
          // Check if insurance_patient is not 0
          total_insurance += d.insurance; // Add insurance_patient to the total
        }
      });
      let total =
        Math.round(this.get_patient_insurance * parseInt(total_net)) / 100;
      let insurance = "";
      insurance = parseInt(total) + parseInt(total_insurance);
      return insurance;
    },
    get_insurance_patient() {
      let insurance = "";
      insurance = parseInt(this.get_amount_net) - parseInt(this.get_insurance);
      return insurance;
    },
    get_insurance_patient_total() {
      let insurance = "";
      insurance = this.get_bills_amount - this.get_insurance_total;
      return insurance;
    },

    get_amount_net() {
      if (this.formData.quantity_served === undefined) {
        return this.get_amount_gross;
      } else {
        let amount_net = "";
        amount_net = this.get_pu_net * this.formData.quantity_served;
        return amount_net;
      }
    },
    get_bills_amount_paid() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received > this.get_bills_amount_net) {
        return this.get_bills_amount_net;
      } else {
        return this.form.amount_received;
      }
    },

    get_balance() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received === undefined) {
        return this.get_bills_amount_net;
      } else {
        let balance = "";
        balance = this.get_bills_amount_net - this.form.amount_received;
        if (balance < 0) {
          balance = 0;
        }
        return balance;
      }
    },
    get_refund() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.amount_received === undefined) {
        return this.get_bills_amount_net;
      } else {
        let refund = "";
        refund = this.form.amount_received - this.get_bills_amount_net;
        if (refund < 0) {
          refund = 0;
        }
        return refund;
      }
    },

    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.total_amount.required")
        );
      return errors;
    },
  },
  mounted() {
    this.getOpenCash();
    this.getHospital();
  },
  // mounted() {
  //   window.addEventListener("keydown", function(event) {
  //     if (
  //         (event.metaKey || event.ctrlKey) &&
  //         event.keyCode === "r".charCodeAt(0)
  //     ) {
  //       event.preventDefault();
  //       this.resetFormBills();
  //     }
  //   });
  // },
  components: {
    DeleteItem,
    FormPdf,
  },
};
</script>
