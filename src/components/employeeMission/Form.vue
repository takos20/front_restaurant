<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
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
                      $vuetify.lang.t('$vuetify.employeeMission.cols.code.title')
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
                  <v-select
                    v-model="form.status"
                    outlined
                    color="primary"
                    required
                    dense
                    clearable
                    prepend-inner-icon="mdi-account-group-outline"
                    :items="optionStatus.type_status"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeMission.cols.status.title'
                      )
                    "
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.destination"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeMission.cols.destination.title'
                      )
                    "
                    @blur="$v.form.destination.$touch()"
                    @input="$v.form.destination.$touch()"
                    :error-messages="destinationErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.employeeMission.cols.destination.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.means_transport"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeMission.cols.means_transport.title'
                      )
                    "
                    @blur="$v.form.means_transport.$touch()"
                    @input="$v.form.means_transport.$touch()"
                    :error-messages="means_transportErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.employeeMission.cols.means_transport.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.reason"
                    color="primary"
                    @blur="$v.form.reason.$touch()"
                    @input="$v.form.reason.$touch()"
                    :error-messages="reasonErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employeeMission.cols.reason.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
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
                            '$vuetify.employeeMission.cols.startDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.startDate"
                      :min="maxDateStart"
                      color="primary"
                      @input="menuStart = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
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
                            '$vuetify.employeeMission.cols.endDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.endDate"
                      color="primary"
                      :min="maxDateStart"
                      @input="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
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
          destination: null,
          reason: null,
          status: null,
          startDate: null,
          endDate: null,
          means_transport: null,
        };
      },
    },
  },
  data: () => ({
    minDateStart: new Date().toISOString().substr(0, 10),
    menuStart: false,
    menuEnd: false,
    formData: {
      id: null,
      name: null,
    },
    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    menuTimeStart: false,
    menuTimeEnd: false,
    maxDateStart: new Date().toISOString().substr(0, 10),
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionStatus: {
      type_status: [],
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems: "employeeMissions",
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
  },

  created() {
    this.getOptionsStatus();
  },
  validations() {
    let validators = {
      form: {
        employee: {
          required,
        },
        means_transport: {
          required,
        },
        destination: {
          required,
        },
        reason: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.mission_status, (type_status) => {
        self.optionStatus.type_status.push({
          text: self.$vuetify.lang.t(type_status.text),
          value: type_status.value,
        });
      });
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        employee: this.form.employee,
        destination: this.form.destination,
        reason: this.form.reason,
        status: this.form.status,
        means_transport: this.form.means_transport,
        startDate: this.form.startDate,
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
      this.form.destination = item.destination;
      this.form.reason = item.reason;
      this.form.status = item.status;
      this.form.means_transport = item.means_transport;
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
    destinationErrors() {
      let errors = [];
      if (!this.$v.form.destination.$dirty) return errors;

      !this.$v.form.destination.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.emplyeeMission.cols.destination.required"
          )
        );
      return errors;
    },
    means_transportErrors() {
      let errors = [];
      if (!this.$v.form.means_transport.$dirty) return errors;

      !this.$v.form.means_transport.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.emplyeeMission.cols.means_transport.required"
          )
        );
      return errors;
    },
    reasonErrors() {
      let errors = [];
      if (!this.$v.form.reason.$dirty) return errors;

      !this.$v.form.reason.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.emplyeeMission.cols.reason.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
