<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveRadiography">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.employeeLeave.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"></v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col> -->
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.employee"
                    :items="itemsEmployee"
                    :loading="isLoadingEmployee"
                    :search-input.sync="searchEmployee"
                    @blur="$v.form.employee.$touch()"
                    @input="$v.form.employee.$touch()"
                    :error-messages="employeeErrors"
                    :label="$vuetify.lang.t('$vuetify.employee.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.lastName }} - {{ data.item.firstName }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.lastName }} - {{ data.item.firstName }}
                    </template>
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.employee.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.leave"
                    :items="itemsleave"
                    :loading="isLoadingleave"
                    :search-input.sync="searchleave"
                    @blur="$v.form.leave.$touch()"
                    @input="$v.form.leave.$touch()"
                    :error-messages="leaveErrors"
                    :label="$vuetify.lang.t('$vuetify.leave.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.leave.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-menu
                    v-model="menuRequest"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.requestDate"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employeeLeave.cols.requestDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.requestDate"
                      :min="minDateStart"
                      color="primary"
                      @input="menuRequest = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-menu
                    v-model="menuStart"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.startDate"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employeeLeave.cols.startDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.startDate"
                      :min="minDateStart"
                      color="primary"
                      @input="menuStart = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.numberDaysRequested"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeLeave.cols.numberDaysRequested.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-menu
                    v-model="menuEnd"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.endDate"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.employeeLeave.cols.endDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.endDate"
                      :min="this.form.startdate"
                      color="primary"
                      @input="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.numberDaysRemaining"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeLeave.cols.numberDaysRemaining.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    outlined
                    dense
                    v-model="form.status"
                    color="primary"
                    :items="optionStatusLeave.type_status_leave"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeLeave.cols.status.title'
                      )
                    "
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.employeeLeave.cols.status.title'
                      )
                    "
                    class="font-weight-bold"
                  >
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { required } from "vuelidate/lib/validators";

// import {mapGetters} from "vuex";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          epmployee: null,
          leave: null,
          requestDate: null,
          status: "NO_START",
          numberDaysRequested: null,
          numberDaysRemaining: null,
          endDate: null,
          startDate: null,
        };
      },
    },
  },
  data: () => ({
    minDateStart: new Date().toISOString().substr(0, 10),
    menuStart: false,
    menuRequest: false,
    menuEnd: false,
    formData: {
      id: null,
      name: null,
    },
    optionStatusLeave: {
      type_status_leave: [],
    },

    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    urlleave: "leaves/all",
    isLoadingleave: false,
    searchleave: null,
    itemsleave: [],
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems: "employeeLeaves",
    isLoading: false,
  }),
  watch: {
    searchEmployee(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingEmployee = true;
      this.$store
        .dispatch("request", {
          url: self.urlEmployee,
          params: params,
        })
        .then((response) => {
          self.itemsEmployee = response.data.content;
        })
        .finally(() => (this.isLoadingEmployee = false));
    },
    searchleave(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingleave = true;
      this.$store
        .dispatch("request", {
          url: self.urlleave,
          params: params,
        })
        .then((response) => {
          self.itemsleave = response.data.content;
        })
        .finally(() => (this.isLoadingleave = false));
    },
  },

  created() {
    this.optionStatusEmploye();
  },
  validations() {
    let validators = {
      form: {
        employee: {
          required,
        },
        leave: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    optionStatusEmploye() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.employeeLeaveStatus,
        (type_status_leave) => {
          self.optionStatusLeave.type_status_leave.push({
            text: self.$vuetify.lang.t(type_status_leave.text),
            value: type_status_leave.value,
          });
        }
      );
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        numberDaysRemaining: this.form.numberDaysRemaining,
        employee: this.form.employee,
        numberDaysRequested: this.form.numberDaysRequested,
        leave: this.form.leave,
        status: this.form.status,
        startDate: this.form.startDate,
        requestDate: this.form.requestDate,
        endDate: this.form.endDate,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.employee = item.employee["id"];
      this.itemsEmployee.push(item.employee);
      this.form.leave = item.leave["id"];
      this.itemsleave.push(item.leave);
      this.form.requestDate = item.requestDate;
      this.form.numberDaysRemaining = item.numberDaysRemaining;
      this.form.numberDaysRequested = item.numberDaysRequested;
      this.form.status = item.status;
      this.form.startDate = item.startDate;
      this.form.endDate = item.endDate;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    employeeErrors() {
      let errors = [];
      if (!this.$v.form.employee.$dirty) return errors;

      !this.$v.form.employee.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.employee.required")
        );
      return errors;
    },
    leaveErrors() {
      let errors = [];
      if (!this.$v.form.leave.$dirty) return errors;

      !this.$v.form.leave.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.leave.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
