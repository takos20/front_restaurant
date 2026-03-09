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
                  <v-text-field
                    v-model="this.minStartHour"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.presence.cols.date.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
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
                        v-model="form.startHour"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.presence.cols.startHour.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="form.startHour"
                      color="primary"
                      @input="menuStart = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
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
                        v-model="form.endHour"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.presence.cols.endHour.title'
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
                      v-model="form.endHour"
                      :min="this.form.startHour"
                      color="primary"
                      @input="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col> -->
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
                        v-model="form.endHour"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.presence.cols.endHour.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      :min="this.form.startHour"
                      v-model="form.endHour"
                      color="primary"
                      @input="menuEnd = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    rows="2"
                    v-model="form.comments"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.presence.cols.comments.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
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
          date: null,
          epmployee: null,
          comments: null,
          endHour: null,
          startHour: null,
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
    minStartHour: new Date().toISOString().substr(0, 10),
    urlEmployee: "employees",
    urlItemsHospital: "hospitals",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    start_day_work: null,
    end_day_work: null,
    urlSanction: "sanctions",
    isLoadingSanction: false,
    searchSanction: null,
    itemsSanction: [],
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
    urlItems: "presences",
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
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        employee: {
          required,
        },
      },
    };
    return validators;
  },
  mounted() {
    this.getOpenCash();
  },
  methods: {
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.period_time = data.content[0].consultation_time;
            self.start_day_work = data.content[0].start_day_work;
            self.end_day_work = data.content[0].end_day_work;
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        employee: this.form.employee,
        date: new Date().toISOString().substr(0, 10),
        comments: this.form.comments,
        startHour: this.form.startHour,
        requestDate: this.form.requestDate,
        endHour: this.form.endHour,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.employee = item.employee["id"];
      this.itemsEmployee.push(item.employee);
      this.form.comments = item.comments;
      this.form.date = item.date;
      this.form.startHour = item.startHour;
      this.form.endHour = item.endHour;
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
    sanctionErrors() {
      let errors = [];
      if (!this.$v.form.sanction.$dirty) return errors;

      !this.$v.form.sanction.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.sanction.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
