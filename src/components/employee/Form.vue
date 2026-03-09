<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
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
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 4" step="4" color="primary">
            {{ $vuetify.lang.t("$vuetify.stepper.step4") }}
          </v-stepper-step>
        </v-stepper-header>
        <v-form style="margin-top: -30px">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.code"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.code.title')
                        "
                        class="font-weight-bold"
                        filled
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                    <v-col
                      cols="12"
                      sm="3"
                      class="mb-0 py-0"
                      style="margin-top: -20px"
                    >
                      <v-switch
                        v-model="employeeSpace"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.employeeSpace.title'
                          )
                        "
                        outlined
                        dense
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.password"
                        :disabled="this.employeeSpace == false"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.users.cols.password.title')
                        "
                        class="font-weight-bold"
                      >
                        <!-- <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t("$vuetify.employee.cols.name.title")
                          }}
                        </template> -->
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.lastName"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.lastName.title'
                          )
                        "
                        @blur="$v.form.lastName.$touch()"
                        @input="$v.form.lastName.$touch()"
                        :error-messages="lastNameErrors"
                        class="font-weight-bold"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.lastName.title"
                            )
                          }}
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.firstName"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.firstName.title'
                          )
                        "
                        class="font-weight-bold"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.firstName.title"
                            )
                          }}
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-select
                        outlined
                        dense
                        v-model="form.gender"
                        color="primary"
                        :items="optionGender.type_Gender"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.gender.title')
                        "
                        :placeholder="
                          $vuetify.lang.t('$vuetify.employee.cols.gender.title')
                        "
                        class="font-weight-bold"
                        @blur="$v.form.gender.$touch()"
                        @input="$v.form.gender.$touch()"
                        :error-messages="genderErrors"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.gender.title"
                            )
                          }}
                        </template>
                      </v-select>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-menu
                        outlined
                        dense
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
                            outlined
                            dense
                            v-model="form.birthday"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.employee.cols.birthday.title'
                              )
                            "
                            class="font-weight-bold"
                            @blur="$v.form.birthday.$touch()"
                            @input="$v.form.birthday.$touch()"
                            :error-messages="birthdayErrors"
                            v-bind="attrs"
                            v-on="on"
                            readonly
                          >
                            <template #label>
                              <span class="red--text"><strong>* </strong></span
                              >{{
                                $vuetify.lang.t(
                                  "$vuetify.employee.cols.birthday.title"
                                )
                              }}
                            </template>
                          </v-text-field>
                        </template>
                        <v-date-picker
                          outlined
                          dense
                          v-model="form.birthday"
                          :max="maxDate"
                          color="primary"
                          @input="menu3 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="get_age"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.age.title')
                        "
                        class="font-weight-bold"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.birthdayPlace"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.birthdayPlace.title'
                          )
                        "
                        class="font-weight-bold"
                        readonly
                      ></v-text-field>
                    </v-col> -->
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.phone"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.phone.title')
                        "
                        @blur="$v.form.phone.$touch()"
                        @input="$v.form.phone.$touch()"
                        :error-messages="phoneErrors"
                        class="font-weight-bold"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.phone.title"
                            )
                          }}
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.city"
                        :items="itemsCity"
                        :loading="isLoadingCity"
                        :search-input.sync="searchCity"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.city.title')
                        "
                        prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                        class="font-weight-bold"
                        @blur="$v.form.city.$touch()"
                        @input="$v.form.city.$touch()"
                        :error-messages="cityErrors"
                        outlined
                        dense
                        ><template slot="selection" slot-scope="data">
                          {{ data.item.name }} - {{ data.item.region.name }}
                        </template>
                        <template v-slot:item="data">
                          {{ data.item.name }} - {{ data.item.region.name }}
                        </template>
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t("$vuetify.employee.cols.city.title")
                          }}
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.district"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.district.title'
                          )
                        "
                        class="font-weight-bold"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.district.title"
                            )
                          }}
                        </template>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.address"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.address.title'
                          )
                        "
                        class="font-weight-bold"
                        @blur="$v.form.address.$touch()"
                        @input="$v.form.address.$touch()"
                        :error-messages="addressErrors"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.address.title"
                            )
                          }}
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -25px">
                <v-spacer></v-spacer>
                <v-btn @click="closeModals" class="mb-5">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPage2"
                  class="mb-5 white--text"
                  :disabled="
                    this.form.gender == null ||
                    this.form.lastName == null ||
                    this.form.city == null ||
                    this.form.district == null ||
                    this.form.birthday == null ||
                    this.form.phone == null ||
                    this.form.address == null
                  "
                >
                  {{ $vuetify.lang.t("$vuetify.btn.next") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card-text>
                <v-container>
                  <v-row wrap
                    ><v-col cols="15" sm="4" class="mb-0 py-0">
                      <v-select
                        outlined
                        dense
                        v-model="form.religion"
                        color="primary"
                        :items="optionReligion.type_Religion"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.religion.title'
                          )
                        "
                        @blur="$v.form.religion.$touch()"
                        @input="$v.form.religion.$touch()"
                        :error-messages="religionErrors"
                        class="font-weight-bold"
                      >
                        <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.patient.cols.religion.title"
                            )
                          }}
                        </template>
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="8" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.email"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.email.title')
                        "
                        @input="$v.form.email.$touch()"
                        :error-messages="emailErrors"
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-select
                        outlined
                        dense
                        v-model="form.type_id"
                        color="primary"
                        :items="optionID.type_ID"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.type_id.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.numberId"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.numberId.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
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
                            outlined
                            dense
                            v-model="form.startDateId"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.employee.cols.startDateId.title'
                              )
                            "
                            class="font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          outlined
                          dense
                          v-model="form.startDateId"
                          color="primary"
                          @input="menu4 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="3" class="mb-0 py-0">
                      <v-menu
                        outlined
                        dense
                        v-model="menu5"
                        color="primary"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            dense
                            v-model="form.endDateId"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.employee.cols.endDateId.title'
                              )
                            "
                            class="font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          outlined
                          dense
                          v-model="form.endDateId"
                          color="primary"
                          @input="menu5 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-select
                        outlined
                        dense
                        v-model="form.maritalStatus"
                        color="primary"
                        :items="optionMaritalStatus.type_MaritalStatus"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.maritalStatus.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.child"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.employee.cols.child.title')
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.emergencyName"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.emergencyName.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field> </v-col
                    ><v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.emergencyContact"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.emergencyContact.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -25px">
                <v-spacer></v-spacer>
                <v-btn @click="closeModals" class="mb-5">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn
                  @click="backTo"
                  style="margin-top: -20px"
                  color="secondary"
                >
                  {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPage3"
                  class="mb-5 white--text"
                >
                  {{ $vuetify.lang.t("$vuetify.btn.next") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.department"
                        :items="itemsDepartment"
                        :loading="isLoadingDepartment"
                        :search-input.sync="searchDepartment"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.departments.cols.name.title'
                          )
                        "
                        s
                        prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                        :menu-props="{
                          closeOnClick: true,
                          closeOnContentClick: true,
                        }"
                      >
                        <!--                    <template #label>-->
                        <!--                    <span class="red&#45;&#45;text"><strong>* </strong></span>{{$vuetify.lang.t('$vuetify.departments.cols.name.title')}}-->
                        <!--                  </template>-->
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.service"
                        :items="itemsService"
                        :loading="isLoadingService"
                        :search-input.sync="searchService"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="$vuetify.lang.t('$vuetify.services.title')"
                        s
                        prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                        :menu-props="{
                          closeOnClick: true,
                          closeOnContentClick: true,
                        }"
                      >
                        <!--                    <template #label>-->
                        <!--                    <span class="red&#45;&#45;text"><strong>* </strong></span>{{$vuetify.lang.t('$vuetify.departments.cols.name.title')}}-->
                        <!--                  </template>-->
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.function"
                        :items="itemsFunction"
                        :loading="isLoadingFunction"
                        :search-input.sync="searchFunction"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="$vuetify.lang.t('$vuetify.function.title')"
                        s
                        prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                        :menu-props="{
                          closeOnClick: true,
                          closeOnContentClick: true,
                        }"
                      >
                        <!--                    <template #label>-->
                        <!--                    <span class="red&#45;&#45;text"><strong>* </strong></span>{{$vuetify.lang.t('$vuetify.departments.cols.name.title')}}-->
                        <!--                  </template>-->
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.typeContract"
                        :items="itemsTypeContract"
                        :loading="isLoadingTypeContract"
                        :search-input.sync="searchTypeContract"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="$vuetify.lang.t('$vuetify.typeContract.title')"
                        s
                        prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                        :menu-props="{
                          closeOnClick: true,
                          closeOnContentClick: true,
                        }"
                      >
                        <!--                    <template #label>-->
                        <!--                    <span class="red&#45;&#45;text"><strong>* </strong></span>{{$vuetify.lang.t('$vuetify.departments.cols.name.title')}}-->
                        <!--                  </template>-->
                      </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-menu
                        outlined
                        dense
                        v-model="menu6"
                        color="primary"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            dense
                            v-model="form.dateEntryService"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.employee.cols.dateEntryService.title'
                              )
                            "
                            class="font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          outlined
                          dense
                          v-model="form.dateEntryService"
                          color="primary"
                          @input="menu6 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-menu
                        outlined
                        dense
                        v-model="menu7"
                        color="primary"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            outlined
                            clearable
                            dense
                            v-model="form.dateExitService"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.employee.cols.dateExitService.title'
                              )
                            "
                            class="font-weight-bold"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          outlined
                          dense
                          v-model="form.dateExitService"
                          color="primary"
                          @input="menu7 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.baseSalary"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.baseSalary.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.overtimeCost"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.overtimeCost.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.nbrLeaveUsed"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.nbrLeaveUsed.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.recruitmentDiploma"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.recruitmentDiploma.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -25px">
                <v-spacer></v-spacer>
                <v-btn @click="closeModals" class="mb-5">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn
                  @click="backTo2"
                  style="margin-top: -20px"
                  color="secondary"
                >
                  {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPage4"
                  class="mb-5 white--text"
                >
                  {{ $vuetify.lang.t("$vuetify.btn.next") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="4">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.nameBank"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.nameBank.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.addressBank"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.addressBank.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-text-field
                        outlined
                        dense
                        v-model="form.ribBank"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.ribBank.title'
                          )
                        "
                        class="font-weight-bold"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.cityBank"
                        :items="itemsCityBank"
                        :loading="isLoadingCityBank"
                        :search-input.sync="searchCityBank"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employee.cols.cityBank.title'
                          )
                        "
                        prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        dense
                        ><template slot="selection" slot-scope="data">
                          {{ data.item.name }} - {{ data.item.region.name }}
                        </template>
                        <template v-slot:item="data">
                          {{ data.item.name }} - {{ data.item.region.name }}
                        </template>
                        <!-- <template #label>
                          <span class="red--text"><strong>* </strong></span
                          >{{
                            $vuetify.lang.t(
                              "$vuetify.employee.cols.cityBank.title"
                            )
                          }}
                        </template> -->
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -5px">
                <v-spacer></v-spacer>
                <v-btn @click="closeModals">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn @click="backTo3" color="secondary">
                  {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                </v-btn>

                <v-btn color="primary" :loading="loading" dark @click="save">
                  {{ $vuetify.lang.t(messages.submit) }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { phoneR } from "../../helpers/Validator";
import moment from "moment";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          pasysto: null,
          nbrLeaveUsed: null,
          recruitmentDiploma: null,
          overtimeCost: null,
          baseSalary: null,
          firstName: null,
          lastName: null,
          religion: null,
          type_id: null,
          emergencyName: null,
          emergencyContact: null,
          maritalStatus: null,
          password: null,
          numberId: null,
          email: null,
          city: null,
          cityBank: null,
          dateEntryService: null,
          dateExitService: null,
          nameBank: null,
          addressBank: null,
          ribBank: null,
          district: null,
          startDateId: null,
          endDateId: null,
          typeContract: null,
          child: null,
          username: null,
          birthday: null,
          birthdayPlace: null,
          address: null,
          phone: null,
          code: null,
          age: null,
          gender: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    e1: 1,
    employeeSpace: false,
    isLoading: false,
    search: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu5: false,
    menu6: false,
    menu7: false,
    menu: false,
    isLoadingCity: false,
    searchCity: null,
    itemsCity: [],
    urlCity: "cities/all",
    isLoadingCityBank: false,
    searchCityBank: null,
    itemsCityBank: [],
    urlTypeContract: "typeContracts/all",
    isLoadingTypeContract: false,
    searchTypeContract: null,
    itemsTypeContract: [],
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
    optionGender: {
      type_Gender: [],
    },
    optionReligion: {
      type_Religion: [],
    },
    optionID: {
      type_ID: [],
    },
    optionMaritalStatus: {
      type_MaritalStatus: [],
    },
    urlService: "services/all",
    isLoadingService: false,
    searchService: null,
    itemsService: [],
    urlFunction: "functions/all",
    isLoadingFunction: false,
    searchFunction: null,
    itemsFunction: [],
    urlDepartment: "departments/all",
    isLoadingDepartment: false,
    searchDepartment: null,
    itemsDepartment: [],
    urlItems: "employees",
  }),
  watch: {
    searchCity(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCity = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCity = response.data.content;
        })
        .finally(() => (this.isLoadingCity = false));
    },
    searchCityBank(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCityBank = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCityBank = response.data.content;
        })
        .finally(() => (this.isLoadingCityBank = false));
    },
    searchDepartment(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDepartment = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepartment,
          params: params,
        })
        .then((response) => {
          self.itemsDepartment = response.data.content;
        })
        .finally(() => (this.isLoadingDepartment = false));
    },
    searchService(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingService = true;
      this.$store
        .dispatch("request", {
          url: self.urlService,
          params: params,
        })
        .then((response) => {
          self.itemsService = response.data.content;
        })
        .finally(() => (this.isLoadingService = false));
    },
    searchTypeContract(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingTypeContract = true;
      this.$store
        .dispatch("request", {
          url: self.urlTypeContract,
          params: params,
        })
        .then((response) => {
          self.itemsTypeContract = response.data.content;
        })
        .finally(() => (this.isLoadingTypeContract = false));
    },
    searchFunction(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingFunction = true;
      this.$store
        .dispatch("request", {
          url: self.urlFunction,
          params: params,
        })
        .then((response) => {
          self.itemsFunction = response.data.content;
        })
        .finally(() => (this.isLoadingFunction = false));
    },
  },
  created() {
    this.getOptionsMaritalStatus();
    this.getOptionsReligion();
    this.getOptionsID();
    this.getOptionsGender();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        lastName: {
          required,
          maxLength: maxLength(255),
        },
        email: {
          // required,
          email,
        },
        phone: {
          required,
          phoneR,
        },
        religion: {
          required,
        },
        city: {
          required,
        },
        district: {
          required,
        },
        birthday: {
          required,
        },
        gender: {
          required,
        },
        address: {
          required,
        },

        // username: {
        //   required,
        //   maxLength: maxLength(255),
        //   minLength: minLength(3),
        //   unique: existUsername
        // },
        // password: {
        //   required: requiredIf(component => {
        //     return !component["id"];
        //   })
        // },
        // password: {
        //   sameAsPassword: sameAs("password")
        // }
      },
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
    goToNextPage3() {
      this.e1 = 3;
    },
    goToNextPage4() {
      this.e1 = 4;
    },

    backTo() {
      this.e1 = 1;
    },
    backTo2() {
      this.e1 = 2;
    },
    backTo3() {
      this.e1 = 3;
    },
    getsignal() {
      this.e1 = 2;
      this.existId = true;
    },
    // Fonction pour récuperer les types de roles dans la store
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

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        nameBank: this.form.nameBank,
        ribBank: this.form.ribBank,
        emergencyName: this.form.emergencyName,
        emergencyContact: this.form.emergencyContact,
        religion: this.form.religion,
        birthday: this.form.birthday,
        addressBank: this.form.addressBank,
        startDateId: this.form.startDateId,
        service: this.form.service,
        department: this.form.department,
        function: this.form.function,
        cityBank: this.form.cityBank,
        endDateId: this.form.endDateId,
        numberId: this.form.numberId,
        email: this.form.email,
        city: this.form.city,
        district: this.form.district,
        type_id: this.form.type_id,
        address: this.form.address,
        lastName: this.form.lastName,
        firstName: this.form.firstName,
        child: this.form.child,
        phone: this.form.phone,
        baseSalary: this.form.baseSalary,
        typeContract: this.form.typeContract,
        maritalStatus: this.form.maritalStatus,
        employeeSpace: this.employeeSpace,
        dateExitService: this.form.dateExitService,
        dateEntryService: this.form.dateEntryService,
        age: this.get_age,
        gender: this.form.gender,
        overtimeCost: this.form.overtimeCost,
        nbrLeaveUsed: this.form.nbrLeaveUsed,
        recruitmentDiploma: this.form.recruitmentDiploma,
        // username: this.form.username,
        password: this.form.password,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.startDateId = item.startDateId;
      this.form.endDateId = item.endDateId;
      this.form.numberId = item.numberId;
      this.form.baseSalary = item.baseSalary;
      this.form.nameBank = item.nameBank;
      this.form.ribBank = item.ribBank;
      this.form.password = item.password;
      this.form.typeContract = item.typeContract["id"];
      this.itemsTypeContract.push(item.typeContract);
      this.form.dateEntryService = item.dateEntryService;
      this.form.dateExitService = item.dateExitService;
      this.form.nbrLeaveUsed = item.nbrLeaveUsed;
      this.form.recruitmentDiploma = item.recruitmentDiploma;
      this.form.emergencyContact = item.emergencyContact;
      this.form.addressBank = item.addressBank;
      this.form.email = item.email;
      this.employeeSpace = item.employeeSpace;
      this.form.overtimeCost = item.overtimeCost;
      this.form.emergencyName = item.emergencyName;
      this.form.id = item.id;
      this.form.lastName = item.lastName;
      this.form.firstName = item.firstName;
      this.form["oldName"] = item.lastName;
      this.form.address = item.address;
      this.form.child = item.child;
      this.form.mother_name = item.mother_name;
      this.form.birthday = item.birthday;
      this.form.city = item.city["id"];
      this.itemsCity.push(item.city);
      this.form.cityBank = item.cityBank["id"];
      this.itemsCityBank.push(item.cityBank);
      this.form.district = item.district;
      this.form.is_insurance = item.is_insurance;
      this.form.phone = item.phone;
      this.form["oldPhone"] = item.phone;
      this.form.code = item.code;
      this.form["oldcode"] = item.code;
      this.form.gender = item.gender;
      this.form.age = item.age;
      this.form.shape = item.shape;
      this.form.maritalStatus = item.maritalStatus;
      this.form.religion = item.religion;
      this.form.type_id = item.type_id;
      this.form.department = item.department["id"];
      this.itemsDepartment.push(item.department);
      this.form.service = item.service["id"];
      this.itemsService.push(item.service);
      this.form.function = item.function["id"];
      this.itemsFunction.push(item.function);
    },
  },
  computed: {
    get_age() {
      if (this.form.birthday) {
        const today = new Date();
        const date_year = today.getFullYear();
        return date_year - moment(String(this.form.birthday)).format("YYYY");
      } else {
        return "";
      }
    },
    // Gestion des erreurs du formulaire
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
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.sameAsPassword &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.password.error"));
      return errors;
    },
    lastNameErrors() {
      let errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.employee.cols.lastName.required")
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      // !this.$v.form.email.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.patient.cols.email.required")
      //   );

      !this.$v.form.email.email &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.email.invalid")
        );
      return errors;
    },
    patient_shapeErrors() {
      let errors = [];
      if (!this.$v.form.shape.$dirty) return errors;

      !this.$v.form.shape.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.patient_shape.required")
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.phone.invalid")
        );

      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.other_phone.invalid")
        );
      return errors;
    },
    addressErrors() {
      let errors = [];
      if (!this.$v.form.address.$dirty) return errors;
      !this.$v.form.address.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.address.required")
        );
      return errors;
    },
    districtErrors() {
      let errors = [];
      if (!this.$v.form.district.$dirty) return errors;
      !this.$v.form.district.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.district.required")
        );
      return errors;
    },
    cityErrors() {
      let errors = [];
      if (!this.$v.form.city.$dirty) return errors;
      !this.$v.form.city.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.city.required")
        );
      return errors;
    },
    genderErrors() {
      let errors = [];
      if (!this.$v.form.gender.$dirty) return errors;
      !this.$v.form.gender.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.gender.required")
        );
      return errors;
    },
    type_patientErrors() {
      let errors = [];
      if (!this.$v.form.type_patient.$dirty) return errors;
      !this.$v.form.type_patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.type_patient.required")
        );
      return errors;
    },
    birthdayErrors() {
      let errors = [];
      if (!this.$v.form.birthday.$dirty) return errors;
      !this.$v.form.birthday.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.birthday.required")
        );
      return errors;
    },
    religionErrors() {
      let errors = [];
      if (!this.$v.form.religion.$dirty) return errors;
      !this.$v.form.religion.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.religion.required")
        );
      return errors;
    },
    mother_nameErrors() {
      let errors = [];
      if (!this.$v.form.mother_name.$dirty) return errors;
      !this.$v.form.mother_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patient.cols.mother_name.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
