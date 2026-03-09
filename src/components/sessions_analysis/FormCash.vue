<template>
  <v-dialog v-model="dialog.show" max-width="880px" max-height="880px">
    <v-card>
      <v-card-title
        v-if="this.form.role === null || this.form.role === 'RESPONSIBLE'"
      >
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-card-title
        v-if="
          this.form.role === 'DOCTOR' ||
          this.form.role === 'PATIENT' ||
          this.form.role === 'RECEPTIONIST' ||
          this.form.role === 'HR'
        "
      >
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.stepper.title") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-stepper v-model="e1" alt-labels>
        <v-stepper-header
          v-if="
            this.form.role === 'DOCTOR' ||
            this.form.role === 'PATIENT' ||
            this.form.role === 'RECEPTIONIST' ||
            this.form.role === 'HR'
          "
        >
          <v-stepper-step :complete="e1 > 1" step="" color="#0984e3">
            {{ $vuetify.lang.t("$vuetify.stepper.step1") }}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            :complete="e1 > 2"
            step=""
            v-if="this.form.role === 'DOCTOR'"
            color="#0984e3"
          >
            {{ $vuetify.lang.t("$vuetify.stepper.step2") }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="e1 > 3"
            step=""
            v-if="this.form.role === 'PATIENT'"
            color="#0984e3"
          >
            {{ $vuetify.lang.t("$vuetify.stepper.step3") }}
          </v-stepper-step>
          <v-divider></v-divider
          ><v-stepper-step
            :complete="e1 > 4"
            step=""
            v-if="this.form.role === 'PATIENT'"
            color="#0984e3"
          >
            {{ $vuetify.lang.t("$vuetify.stepper.step4") }}
          </v-stepper-step>
          <v-divider></v-divider
          ><v-stepper-step
            :complete="e1 > 5"
            step=""
            v-if="this.form.role === 'PATIENT'"
            color="#0984e3"
          >
            {{ $vuetify.lang.t("$vuetify.stepper.step5") }}
          </v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>
        <v-form @submit.prevent="save" style="margin-top: -15px">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.first_name"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.first_name.title'
                            )
                          "
                          @blur="$v.form.first_name.$touch()"
                          @input="$v.form.first_name.$touch()"
                          :error-messages="firstnameErrors"
                          prepend-inner--icon="mdi-text-short mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.last_name"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.last_name.title'
                            )
                          "
                          @blur="$v.form.last_name.$touch()"
                          @input="$v.form.last_name.$touch()"
                          :error-messages="lastnameErrors"
                          prepend-inner--icon="mdi-text-short mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.phone"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.phone.title')
                          "
                          @blur="$v.form.phone.$touch()"
                          @input="$v.form.phone.$touch()"
                          :error-messages="phoneErrors"
                          prepend-inner--icon="mdi-phone mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.email"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.email.title')
                          "
                          @blur="$v.form.email.$touch()"
                          @input="$v.form.email.$touch()"
                          :error-messages="emailErrors"
                          prepend-inner--icon="mdi-at mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.username"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.username.title'
                            )
                          "
                          @blur="$v.form.username.$touch()"
                          @input="$v.form.username.$touch()"
                          :error-messages="usernameErrors"
                          prepend-inner--icon="mdi-account-outline mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.password"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.password.title'
                            )
                          "
                          prepend-inner--icon="mdi-shield-account-outline mdi-dark mdi-18px"
                          @blur="$v.form.password.$touch()"
                          @input="$v.form.password.$touch()"
                          :error-messages="passwordErrors"
                          class="font-weight-bold"
                          type="password"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.re_password"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.re_password.title'
                            )
                          "
                          @blur="$v.form.re_password.$touch()"
                          @input="$v.form.re_password.$touch()"
                          :error-messages="rePasswordErrors"
                          prepend-inner--icon="mdi-shield-account-outline mdi-dark mdi-18px"
                          class="font-weight-bold"
                          type="password"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-select
                          v-model="form.gender"
                          color="#0984e3"
                          :items="optionGender.type_Gender"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.gender.title')
                          "
                          :placeholder="
                            $vuetify.lang.t('$vuetify.users.cols.gender.title')
                          "
                          prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        class="mb-0 py-0"
                        v-if="$auth.check(['RESPONSIBLE'])"
                      >
                        <v-select
                          v-model="form.role"
                          color="#0984e3"
                          :items="optionRoleR.type_RoleR"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.role.title')
                          "
                          :placeholder="
                            $vuetify.lang.t('$vuetify.users.cols.role.title2')
                          "
                          @blur="$v.form.role.$touch()"
                          @input="$v.form.role.$touch()"
                          :error-messages="roleErrors"
                          prepend-inner-icon="mdi-account-group-outline mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0" v-else>
                        <v-select
                          v-model="form.role"
                          color="#0984e3"
                          :items="optionRole.type_Role"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.role.title')
                          "
                          :placeholder="
                            $vuetify.lang.t('$vuetify.users.cols.role.title2')
                          "
                          @blur="$v.form.role.$touch()"
                          @input="$v.form.role.$touch()"
                          :error-messages="roleErrors"
                          prepend-inner-icon="mdi-account-group-outline mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="4"
                        class="mb-0 py-0"
                        style="margin-top: -5px"
                      >
                        <v-switch
                          v-model="form.is_active"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.status.title2')
                          "
                          outlined
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions
                  v-if="
                    this.form.role === null || this.form.role === 'RESPONSIBLE'
                  "
                >
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog.show = false">
                    {{ $vuetify.lang.t("$vuetify.btn.close") }}
                  </v-btn>
                  <v-btn color="#0984e3" :loading="loading" dark type="submit">
                    {{ $vuetify.lang.t(messages.submit) }}
                  </v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="#0984e3"
                    @click="goToNextPage"
                    class="mb-5"
                    v-if="this.form.role === 'DOCTOR'"
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                  <v-btn
                    color="#0984e3"
                    @click="goToNextPage3"
                    class="mb-5"
                    v-if="this.form.role === 'PATIENT'"
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                  <!--<v-btn-->
                  <!--@click="prospert = null"-->
                  <!--class="mr-5 mb-5"-->
                  <!--color="accent darken-2"-->
                  <!--&gt;-->
                  <!--{{ $vuetify.lang.t("$vuetify.btn.cancel") }}-->
                  <!--</v-btn>-->
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.address"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.address.title')
                          "
                          prepend-inner--icon="mdi-account-outline mdi-dark mdi-18px"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-menu
                          v-model="menu2"
                          color="#0984e3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.dateNaiss"
                              color="#0984e3"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.users.cols.birthday.title'
                                )
                              "
                              prepend-inner-icon="mdi-clock-start"
                              class="font-weight-bold"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateNaiss"
                            color="#0984e3"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <!--<v-row wrap>-->
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-menu
                          v-model="menu"
                          color="#0984e3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.dateService"
                              color="#0984e3"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.users.cols.dateService.title'
                                )
                              "
                              prepend-inner-icon="mdi-clock-start"
                              class="font-weight-bold"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateService"
                            color="#0984e3"
                            @input="menu = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.speciality"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.speciality.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-select
                          v-model="form.intervention_days"
                          color="#0984e3"
                          :items="optionDays.type_Days"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.intervention_days.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t('$vuetify.users.cols.role.title2')
                          "
                          prepend-inner-icon="mdi-weather-sunny"
                          class="font-weight-bold"
                          outlined
                          multiple
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="5" class="mb-0 py-0">
                        <v-select
                          v-model="form.position"
                          color="#0984e3"
                          :items="optionPos.type_Pos"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.position.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t('$vuetify.users.cols.role.title2')
                          "
                          prepend-inner-icon="mdi-account-network"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="5" class="mb-0 py-0">
                        <v-autocomplete
                          v-model="form.departments"
                          :items="itemsDepartments"
                          :loading="isLoading"
                          :search-input.sync="search"
                          color="#0984e3"
                          item-text="name"
                          item-value="id"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.departments.cols.name.title'
                            )
                          "
                          @blur="$v.form.departments.$touch()"
                          @input="$v.form.departments.$touch()"
                          prepend-inner-icon="mdi-home-plus"
                          class="font-weight-bold"
                          outlined
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="2" class="mb-0 py-0">
                        <v-btn
                          class="mx-2"
                          dark
                          large
                          @click="createD()"
                          color="#0984e3"
                          style="margin-top: 5px"
                          max-width="2px"
                        >
                          <v-icon dark> mdi-plus </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn color="#0984e3" :loading="loading" dark type="submit">
                    {{ $vuetify.lang.t(messages.submit) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-menu
                          v-model="menu3"
                          color="#0984e3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.dateNaiss"
                              color="#0984e3"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.users.cols.birthday.title'
                                )
                              "
                              prepend-inner-icon="mdi-clock-start"
                              class="font-weight-bold"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.dateNaiss"
                            color="#0984e3"
                            @input="menu3 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.age"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.age.title')
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.address"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.address.title')
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.other_phone"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.other_phone.title'
                            )
                          "
                          @blur="$v.form.other_phone.$touch()"
                          @input="$v.form.other_phone.$touch()"
                          :error-messages="other_phoneErrors"
                          prepend-inner--icon="mdi-phone"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <!--<v-row wrap>-->
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.patient_shape"
                          color="#0984e3"
                          :items="optionPatient_shape.type_Patient_shape"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.patient_shape.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.patient_shape.title'
                            )
                          "
                          prepend-inner-icon="mdi-account-group-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        class="mb-0 py-0"
                        v-if="this.form.patient_shape === 'COVERED'"
                      >
                        <v-text-field
                          v-model="form.insurance_name"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.insurance_name.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        class="mb-0 py-0"
                        v-if="this.form.patient_shape === 'COVERED'"
                      >
                        <v-text-field
                          v-model="form.insurance_number"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.insurance_number.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo" style="margin-top: -20px">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn
                    color="#0984e3"
                    @click="goToNextPage4"
                    class="mb-5"
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="15" sm="6" class="mb-0 py-0">
                        <!--<v-row wrap>-->
                        <v-select
                          v-model="form.religion"
                          color="#0984e3"
                          :items="optionReligion.type_Religion"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.religion.title'
                            )
                          "
                          dense
                          prepend-inner-icon="mdi-church"
                          outlined
                          class="font-weight-bold"
                          height="9vh"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.maritalStatus"
                          color="#0984e3"
                          :items="optionMaritalStatus.type_MaritalStatus"
                          @blur="$v.form.maritalStatus.$touch()"
                          @input="$v.form.maritalStatus.$touch()"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.maritalStatus.title'
                            )
                          "
                          dense
                          prepend-inner-icon="mdi-account-supervisor-circle"
                          outlined
                          class="font-weight-bold"
                          height="9vh"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-select
                          v-model="form.type_id"
                          color="#0984e3"
                          :items="optionID.type_ID"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.type_id.title')
                          "
                          dense
                          prepend-inner-icon="mdi-account-supervisor-circle"
                          outlined
                          class="font-weight-bold"
                          height="9vh"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.number_id"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.number_id.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="4" class="mb-0 py-0">
                        <v-menu
                          v-model="menu4"
                          color="#0984e3"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="form.date_id"
                              color="#0984e3"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.users.cols.date_id.title'
                                )
                              "
                              prepend-inner-icon="mdi-clock-start"
                              class="font-weight-bold"
                              outlined
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="form.date_id"
                            color="#0984e3"
                            @input="menu4 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.child"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.child.title')
                          "
                          prepend-inner--icon="mdi-account-group-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.mother_name"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.mother_name.title'
                            )
                          "
                          prepend-inner--icon="mdi-format-size"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.emergency_name"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.emergency_name.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.emergency_contact"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.emergency_contact.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo3" style="margin-top: -20px">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn
                    color="#0984e3"
                    @click="goToNextPage5"
                    class="mb-5"
                    dark
                  >
                    {{ $vuetify.lang.t("$vuetify.btn.next") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="5">
              <v-card>
                <v-card-text>
                  <v-container>
                    <v-row wrap>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.blood_group"
                          color="#0984e3"
                          :items="optionBlood_group.type_Blood_group"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.blood_group.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.blood_group.title'
                            )
                          "
                          prepend-inner-icon="mdi-blood-bag"
                          class="font-weight-bold"
                          outlined
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.weight"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.weight.title')
                          "
                          prepend-inner--icon="mdi-weight-kilogram"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-select
                          v-model="form.electrophoresis"
                          color="#0984e3"
                          :items="optionElectrophoresis.type_Electrophoresis"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.electrophoresis.title'
                            )
                          "
                          :placeholder="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.electrophoresis.title'
                            )
                          "
                          prepend-inner-icon="mdi-account-network"
                          class="font-weight-bold"
                          outlined
                        ></v-select> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.size"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.size.title')
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.bpm"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.bpm.title')
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.temperature"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.temperature.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.padiasto"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.padiasto.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.pasysto"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t('$vuetify.users.cols.pasysto.title')
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.allergies"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.allergies.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field> </v-col
                      ><v-col cols="12" sm="6" class="mb-0 py-0">
                        <v-text-field
                          v-model="form.pathologies"
                          color="#0984e3"
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.users.cols.pathologies.title'
                            )
                          "
                          prepend-inner--icon="mdi-account-outline"
                          class="font-weight-bold"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="backTo4">
                    {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                  </v-btn>
                  <v-btn color="#0984e3" :loading="loading" dark type="submit">
                    {{ $vuetify.lang.t(messages.submit) }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-card>
    <form-department :dialog="dialogForm"></form-department>
  </v-dialog>
</template>

<script>
import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  email,
  sameAs,
} from "vuelidate/lib/validators";
import {
  phoneR,
  existUsername,
  existPhone,
  existEmail,
} from "../../helpers/Validator";

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
          first_name: null,
          religion: null,
          type_id: null,
          mother_name: null,
          emergency_name: null,
          emergency_contact: null,
          maritalStatus: null,
          number_id: null,
          date_id: null,
          child: null,
          last_name: null,
          dateNaiss: null,
          dateService: null,
          intervention_days: null,
          position: null,
          address: null,
          speciality: null,
          other_phone: null,
          phone: null,
          insurance_name: null,
          insurance_number: null,
          email: null,
          username: null,
          password: null,
          re_password: null,
          departments: null,
          age: null,
          gender: null,
          patient_shape: null,
          role: null,
          is_active: false,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    urlDepartments: "departments",
    urlReligion: "religions",
    urlType_id: "type_id",
    isLoading: false,
    search: null,
    itemsDepartments: [],
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
    formData: {
      id: null,
      name: null,
    },
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
    optionRole: {
      type_Role: [],
    },
    optionRoleR: {
      type_RoleR: [],
    },
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
    optionDays: {
      type_Days: [],
    },
    optionPos: {
      type_Pos: [],
    },
    optionElectrophoresis: {
      type_Electrophoresis: [],
    },
    urlItems: "users",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepartments,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDepartments = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {
    this.getOptionsMaritalStatus();
    this.getOptionsRoleR();
    this.getOptionsBlood_group();
    this.getOptionsElectrophoresis();
    this.getOptionsReligion();
    this.getOptionsID();
    this.getOptionsGender();
    this.getOptionsPatient_shape();
    this.getOptionsRole();
    this.getOptionsJour();
    this.getOptionsPosition();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        first_name: {
          required,
          maxLength: maxLength(100),
        },
        last_name: {
          required,
          maxLength: maxLength(100),
        },
        email: {
          required,
          email,
          unique: existEmail,
          maxLength: maxLength(100),
        },
        phone: {
          required,
          unique: existPhone,
          phoneR,
        },
        other_phone: {
          required,
          unique: existPhone,
          phoneR,
        },
        role: {
          required,
        },
        username: {
          required,
          maxLength: maxLength(10),
          minLength: minLength(3),
          unique: existUsername,
        },
        password: {
          required: requiredIf((component) => {
            return !component["id"];
          }),
        },
        re_password: {
          sameAsPassword: sameAs("password"),
        },
      },
    };
    return validators;
  },
  methods: {
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    goToNextPage() {
      this.e1 = 2;
    },
    goToNextPage3() {
      this.e1 = 3;
    },
    goToNextPage4() {
      this.e1 = 4;
    },
    goToNextPage5() {
      this.e1 = 5;
    },
    backTo() {
      this.e1 = 1;
    },
    backTo3() {
      this.e1 = 3;
    },
    backTo4() {
      this.e1 = 4;
    },
    getsignal() {
      this.e1 = 2;
      this.existId = true;
    },
    // Fonction pour récuperer les types de roles dans la store
    getOptionsRole() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.roles, (type_Role) => {
        self.optionRole.type_Role.push({
          text: self.$vuetify.lang.t(type_Role.text),
          value: type_Role.value,
        });
      });
    },
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
    getOptionsRoleR() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.rolesR, (type_RoleR) => {
        self.optionRoleR.type_RoleR.push({
          text: self.$vuetify.lang.t(type_RoleR.text),
          value: type_RoleR.value,
        });
      });
    },
    getOptionsJour() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.days, (type_Days) => {
        self.optionDays.type_Days.push({
          text: self.$vuetify.lang.t(type_Days.text),
          value: type_Days.value,
        });
      });
    },
    getOptionsPosition() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.position, (type_Pos) => {
        self.optionPos.type_Pos.push({
          text: self.$vuetify.lang.t(type_Pos.text),
          value: type_Pos.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        blood_group: this.form.blood_group,
        intervention_days: this.form.intervention_days,
        mother_name: this.form.mother_name,
        emergency_name: this.form.emergency_name,
        emergency_contact: this.form.emergency_contact,
        religion: this.form.religion,
        position: this.form.position,
        dateNaiss: this.form.dateNaiss,
        date_id: this.form.date_id,
        number_id: this.form.number_id,
        type_id: this.form.type_id,
        dateService: this.form.dateService,
        address: this.form.address,
        speciality: this.form.speciality,
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        child: this.form.child,
        phone: this.form.phone,
        other_phone: this.form.other_phone,
        insurance_name: this.form.insurance_name,
        insurance_number: this.form.insurance_number,
        email: this.form.email,
        departments: this.form.departments,
        username: this.form.username,
        role: this.form.role,
        maritalStatus: this.formData.maritalStatus,
        age: this.form.age,
        patient_shape: this.form.patient_shape,
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
        is_active: this.form.is_active ? this.form.is_active : false,
      };
      if (
        !this._.isEmpty(this.form.password) ||
        !this._.isNull(this.form.password)
      ) {
        data.password = this.form.password;
      }
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.allergies = item.allergies;
      this.form.pasysto = item.pasysto;
      this.form.pathologies = item.pathologies;
      this.form.padiasto = item.padiasto;
      this.form.temperature = item.temperature;
      this.form.bpm = item.bpm;
      this.form.size = item.size;
      this.form.electrophoresis = item.electrophoresis;
      this.form.weight = item.weight;
      this.form.blood_group = item.blood_group;
      this.form.id = item.id;
      this.form.first_name = item.profile.first_name;
      this.form.last_name = item.profile.last_name;
      this.form.address = item.profile.address;
      this.form.child = item.profile.child;
      this.form.dateNaiss = item.profile.dateNaiss;
      this.form.insurance_name = item.profile.insurance_name;
      this.form.insurance_number = item.profile.insurance_number;
      this.form.position = item.profile.position;
      this.form.intervention_days = item.profile.intervention_days;
      this.form.dateService = item.profile.dateService;
      this.form.phone = item.profile.phone;
      this.form["oldPhone"] = item.profile.phone;
      this.form.other_phone = item.profile.other_phone;
      this.form["oldPhone"] = item.profile.other_phone;
      this.form.speciality = item.profile.speciality;
      this.form.email = item.profile.email;
      this.form["oldEmail"] = item.profile.email;
      this.form.username = item.username;
      this.form["oldUsername"] = item.username;
      if (!this._.isEmpty(item.password) || !this._.isNull(item.password)) {
        this.form.password = item.password;
      }
      if (
        !this._.isEmpty(item.re_password) ||
        !this._.isNull(item.re_password)
      ) {
        this.form.re_password = item.re_password;
      }
      this.form.role = item.role;
      this.form.gender = item.gender;
      this.form.age = item.age;
      this.form.patient_shape = item.patient_shape;
      this.form.is_active = item.is_active;
      this.form.maritalStatus = item.maritalStatus;
      this.form.departments = item.departments["id"];
      this.itemsDepartments.push(item.departments);
      this.form.religion = item.religion["id"];
      this.itemsReligion.push(item.religion);
      this.form.type_id = item.type_id["id"];
      this.itemsType_id.push(item.type_id);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    roleErrors() {
      let errors = [];
      if (!this.$v.form.role.$dirty) return errors;
      !this.$v.form.role.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.role.required"));
      return errors;
    },
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;

      !this.$v.form.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );

      !this.$v.form.username.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.minLength",
            this.$v.form.username.$params.minLength.min
          )
        );

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.maxLength",
            this.$v.form.username.$params.maxLength.max
          )
        );
      !this.$v.form.username.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.unique")
        );
      return errors;
    },
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
    rePasswordErrors() {
      let errors = [];
      if (!this.$v.form.re_password.$dirty) return errors;

      !this.$v.form.re_password.sameAsPassword &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
        );
      return errors;
    },

    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.first_name.$dirty) return errors;
      !this.$v.form.first_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.first_name.required")
        );

      !this.$v.form.first_name.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.first_name.maxLength",
            this.$v.form.first_name.$params.maxLength.max
          )
        );
      return errors;
    },
    lastnameErrors() {
      let errors = [];
      if (!this.$v.form.last_name.$dirty) return errors;
      !this.$v.form.last_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.last_name.required")
        );

      !this.$v.form.last_name.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.last_name.maxLength",
            this.$v.form.last_name.$params.maxLength.max
          )
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.required"));

      !this.$v.form.email.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.unique"));
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.other_phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
  },
  components: {
    FormDepartment,
  },
};
</script>
