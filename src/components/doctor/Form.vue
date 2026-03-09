<template>
  <v-dialog
    v-model="dialog.show"
    max-width="780px"
    persistent
    max-height="980px"
  >
    <v-card>
      <v-card-title dense>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-form @submit.prevent="save" style="margin-top: -15px">
        <v-card>
          <v-card-text>
            <!--            <span class="text-h7 text-center body-2 black&#45;&#45;text text&#45;&#45;darken-1">-->
            <!--              {{ $vuetify.lang.t("$vuetify.doctor.title_basic") }}-->
            <!--            </span>-->
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.doctor.cols.code_internal.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-select
                    v-model="form.position"
                    color="primary"
                    :items="optionPos.type_Pos"
                    prepend-inner-icon="mdi-account-network mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.doctor.cols.position.title")
                      }}
                    </template></v-select
                  >
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.coef"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.doctor.cols.coef_quote.title') +
                      ' : ' +
                      this.get_doctor_quote
                    "
                    prepend-inner-icon="mdi-text-short mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.medical_areas.cols.status.enabled'
                      )
                    "
                    outlined
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.doctor.cols.first_name.title")
                      }}
                    </template></v-text-field
                  >
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-menu
                    v-model="menu2"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    dense
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.dateNaiss"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.doctor.cols.birthday.title')
                        "
                        prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.dateNaiss"
                      :max="maxDate"
                      color="primary"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.address"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.doctor.cols.address.title')
                    "
                    prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.phone"
                    color="primary"
                    @blur="$v.form.phone.$touch()"
                    @input="$v.form.phone.$touch()"
                    :error-messages="phoneErrors"
                    prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.doctor.cols.phone.title") }}
                    </template></v-text-field
                  >
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.email"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.doctor.cols.email.title')"
                    @blur="$v.form.email.$touch()"
                    @input="$v.form.email.$touch()"
                    :error-messages="emailErrors"
                    prepend-inner-icon="mdi-at"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.department"
                    :items="itemsDepartments"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.departments.cols.name.title')
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
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-btn
                    class="mx-2"
                    dark
                    dense
                    @click="createDepartment()"
                    color="primary"
                    max-width="2px"
                    v-if="
                      _.includes(
                        this.$auth.user().permissions,
                        'add_departments'
                      )
                    "
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.type_doctor"
                    :items="itemsType_doctor"
                    :loading="isLoadingType_doctor"
                    :search-input.sync="searchType_doctor"
                    @blur="$v.form.type_doctor.$touch()"
                    @input="$v.form.type_doctor.$touch()"
                    :error-messages="type_doctorErrors"
                    :label="$vuetify.lang.t('$vuetify.type_doctor.title')"
                    color="primary"
                    item-text="title"
                    return-object
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      {{ $vuetify.lang.t("$vuetify.type_doctor.title")
                      }}<span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <!-- <v-col cols="12" sm="8" class="mb-0 py-0">
                  <v-select
                    v-model="form.intervention_days"
                    color="primary"
                    :items="optionDays.type_Days"
                    prepend-inner-icon="mdi-weather-sunny mdi-dark mdi-18px"
                    class="font-weight-bold"
                    @blur="$v.form.intervention_days.$touch()"
                    @input="$v.form.intervention_days.$touch()"
                    :error-messages="intervention_daysErrors"
                    outlined
                    multiple
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.doctor.cols.intervention_days.title"
                        )
                      }}
                    </template>
                  </v-select>
                </v-col> -->
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-menu
                    v-model="menu"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    dense
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.dateService"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.doctor.cols.dateService.title'
                          )
                        "
                        prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                        class="font-weight-bold"
                        outlined
                        v-bind="attrs"
                        v-on="on"
                        dense
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.dateService"
                      :max="maxDate"
                      color="primary"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!--          <v-card-actions-->
          <!--            style="margin-top: -35px"-->
          <!--            v-if="this.form.id === null || this.form.id === undefined"-->
          <!--          >-->
          <!--            <v-btn color="orange lighten-2" text>-->
          <!--              {{ $vuetify.lang.t("$vuetify.doctor.title_user") }}-->
          <!--            </v-btn>-->

          <!--            <v-spacer></v-spacer>-->

          <!--            <v-btn icon @click="show = !show">-->
          <!--              <v-icon>{{-->
          <!--                show ? "mdi-chevron-up" : "mdi-chevron-down"-->
          <!--              }}</v-icon>-->
          <!--            </v-btn>-->
          <!--          </v-card-actions>-->

          <!--          <v-expand-transition>-->
          <!--            <div v-show="show">-->
          <!--              <v-form>-->
          <!--                <v-card-text>-->
          <!--                  <v-container>-->
          <!--                    <v-row wrap>-->
          <!--                      <v-col cols="12" sm="4" class="mb-0 py-0">-->
          <!--                        <v-text-field-->
          <!--                          v-model="form.username"-->
          <!--                          color="primary"-->
          <!--                          :label="-->
          <!--                            $vuetify.lang.t(-->
          <!--                              '$vuetify.users.cols.username.title'-->
          <!--                            )-->
          <!--                          "-->
          <!--                          @blur="$v.form.username.$touch()"-->
          <!--                          @input="$v.form.username.$touch()"-->
          <!--                          :error-messages="usernameErrors"-->
          <!--                          prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"-->
          <!--                          class="font-weight-bold"-->
          <!--                          outlined-->
          <!--                          dense-->
          <!--                        ></v-text-field>-->
          <!--                      </v-col>-->
          <!--                      <v-col cols="12" sm="4" class="mb-0 py-0">-->
          <!--                        <v-text-field-->
          <!--                          v-model="form.password"-->
          <!--                          color="primary"-->
          <!--                          :label="-->
          <!--                            $vuetify.lang.t(-->
          <!--                              '$vuetify.users.cols.password.title'-->
          <!--                            )-->
          <!--                          "-->
          <!--                          prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"-->
          <!--                          class="font-weight-bold"-->
          <!--                          type="password"-->
          <!--                          outlined-->
          <!--                          dense-->
          <!--                        ></v-text-field>-->
          <!--                      </v-col>-->
          <!--                      <v-col cols="12" sm="4" class="mb-0 py-0">-->
          <!--                        <v-text-field-->
          <!--                          v-model="form.re_password"-->
          <!--                          color="primary"-->
          <!--                          :label="-->
          <!--                            $vuetify.lang.t(-->
          <!--                              '$vuetify.users.cols.re_password.title'-->
          <!--                            )-->
          <!--                          "-->
          <!--                          @blur="$v.form.re_password.$touch()"-->
          <!--                          @input="$v.form.re_password.$touch()"-->
          <!--                          :error-messages="rePasswordErrors"-->
          <!--                          prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"-->
          <!--                          class="font-weight-bold"-->
          <!--                          type="password"-->
          <!--                          outlined-->
          <!--                          dense-->
          <!--                        ></v-text-field>-->
          <!--                      </v-col>-->
          <!--                    </v-row>-->
          <!--                  </v-container>-->
          <!--                </v-card-text>-->
          <!--              </v-form>-->
          <!--            </div>-->
          <!--          </v-expand-transition>-->
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
    <form-department :dialog="dialogForm"></form-department>
  </v-dialog>
</template>

<script>
import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, email } from "vuelidate/lib/validators";
import { phoneR, existNameDoctor } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          code: null,
          coef: null,
          dateNaiss: null,
          dateService: null,
          intervention_days: null,
          position: null,
          address: null,
          type_doctor: null,
          speciality: null,
          phone: null,
          email: null,
          username: null,
          password: null,
          re_password: null,
          department: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    urlDepartments: "departments/all",
    urlType_doctor: "type_doctors/all",
    isLoading: false,
    isLoadingType_doctor: false,
    search: null,
    searchType_doctor: null,
    optionAppointment: {
      type_appointment: [],
    },
    itemsDepartments: [],
    itemsType_doctor: [],
    selectDepartments: [],
    menu2: false,
    is_active: true,
    menu3: false,
    menu4: false,
    menu: false,
    show: false,
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
    optionDays: {
      type_Days: [],
    },
    optionPos: {
      type_Pos: [],
    },
    urlItems: "doctors",
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
    searchType_doctor(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_doctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_doctor,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsType_doctor = response.data.content;
        })
        .finally(() => (this.isLoadingType_doctor = false));
    },
  },

  created() {
    this.form.department = this.itemsDepartments.slice();
    this.getOptionsJour();
    this.getOptionsPosition();
    this.getOptionsAppointment();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameDoctor,
        },
        // coef: {
        //   required
        // },
        email: {
          email,
        },
        type_doctor: {
          required,
        },
        phone: {
          phoneR,
        },
        // username: {
        //   maxLength: maxLength(255),
        //   minLength: minLength(3),
        //   unique: existUsername
        // },
        // re_password: {
        //   sameAsPassword: sameAs("password")
        // }
      },
    };
    return validators;
  },
  methods: {
    getOptionsAppointment() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.appointment_type, (type_appointment) => {
        self.optionAppointment.type_appointment.push({
          text: self.$vuetify.lang.t(type_appointment.text),
          value: type_appointment.value,
        });
      });
    },
    toggle() {
      this.form.department = this.itemsDepartments.slice();
      console.log(this.form.department);
    },
    createDepartment() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

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
      this._.each(this.$store.getters.position_doctor, (type_Pos) => {
        self.optionPos.type_Pos.push({
          text: self.$vuetify.lang.t(type_Pos.text),
          value: type_Pos.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        is_active: this.is_active,
        // intervention_days: this.form.intervention_days,
        position: this.form.position,
        dateNaiss: this.form.dateNaiss,
        dateService: this.form.dateService,
        coef: this.get_doctor_quote,
        address: this.form.address,
        type_doctor: this.form.type_doctor,
        speciality: this.form.speciality,
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        department: this.form.department,
        // username: this.form.username,
        // password: this.form.password
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.coef = item.coef;
      this.form.dateService = item.dateService;
      this.form.type_doctor = item.type_doctor["id"];
      this.itemsType_doctor.push(item.type_doctor);
      this.is_active = item.is_active;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.address = item.address;
      this.form.dateNaiss = item.dateNaiss;
      this.form.position = item.position;
      this.form.intervention_days = item.intervention_days;
      this.form.phone = item.phone;
      this.form.speciality = item.speciality;
      this.form.email = item.email;
      this.form.department = item.department["id"];
      this.itemsDepartments.push(item.department);
    },
  },
  computed: {
    get_doctor_quote() {
      let doctor_quote = 0;
      doctor_quote =
        this.form.coef === null
          ? this.form.type_doctor === null
            ? 0
            : this.form.type_doctor?.share
          : this.form.coef;
      return doctor_quote;
    },
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.first_name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.first_name.unique")
        );
      return errors;
    },
    type_doctorErrors() {
      let errors = [];
      if (!this.$v.form.type_doctor.$dirty) return errors;
      !this.$v.form.type_doctor.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.doctor.cols.type.required"));
      return errors;
    },
    departmentErrors() {
      let errors = [];
      if (!this.$v.form.department.$dirty) return errors;
      !this.$v.form.department.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.department.required")
        );
      return errors;
    },
    // usernameErrors() {
    //   let errors = [];
    //   if (!this.$v.form.username.$dirty) return errors;
    //
    //   !this.$v.form.username.minLength &&
    //     errors.push(
    //       this.$vuetify.lang.t(
    //         "$vuetify.users.cols.username.minLength",
    //         this.$v.form.username.$params.minLength.min
    //       )
    //     );
    //
    //   !this.$v.form.username.maxLength &&
    //     errors.push(
    //       this.$vuetify.lang.t(
    //         "$vuetify.users.cols.username.maxLength",
    //         this.$v.form.username.$params.maxLength.max
    //       )
    //     );
    //   !this.$v.form.username.unique &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.users.cols.username.unique")
    //     );
    //   return errors;
    // },
    // rePasswordErrors() {
    //   let errors = [];
    //   if (!this.$v.form.re_password.$dirty) return errors;
    //
    //   !this.$v.form.re_password.sameAsPassword &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
    //     );
    //   return errors;
    // },
    specialityErrors() {
      let errors = [];
      if (!this.$v.form.speciality.$dirty) return errors;
      !this.$v.form.speciality.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.speciality.required")
        );
      return errors;
    },
    positionErrors() {
      let errors = [];
      if (!this.$v.form.position.$dirty) return errors;
      !this.$v.form.position.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.position.required")
        );
      return errors;
    },
    coef_quoteErrors() {
      let errors = [];
      if (!this.$v.form.coef.$dirty) return errors;
      !this.$v.form.coef.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.coef_quote.required")
        );
      return errors;
    },
    intervention_daysErrors() {
      let errors = [];
      if (!this.$v.form.intervention_days.$dirty) return errors;
      !this.$v.form.intervention_days.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.doctor.cols.intervention_days.required"
          )
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.doctor.cols.email.invalid"));

      // !this.$v.form.email.unique &&
      //   errors.push(this.$vuetify.lang.t("$vuetify.doctor.cols.email.unique"));
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.doctor.cols.phone.invalid"));
      return errors;
    },
  },
  components: {
    FormDepartment,
  },
};
</script>
