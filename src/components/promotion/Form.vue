<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12">
                <v-card class="pa-4" outlined>
                  <!-- Header -->
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div>
                      <div class="text-h6 font-weight-bold">
                        {{ $vuetify.lang.t("$vuetify.dish.language") }}
                      </div>
                      <div class="grey--text text--darken-1 text-caption">
                        {{
                          $vuetify.lang.t("$vuetify.dish.language_description")
                        }}
                      </div>
                    </div>

                    <v-btn color="primary" small @click="addColumnLanguage">
                      <v-icon left>mdi-plus</v-icon>
                      {{ $vuetify.lang.t("$vuetify.btn.add") }}
                    </v-btn>
                  </div>

                  <v-divider class="mb-4"></v-divider>

                  <!-- Lines -->
                  <v-card
                    v-for="(rule, index) in name_language"
                    :key="index"
                    class="mb-2 pa-2 rounded-lg"
                    outlined
                  >
                    <v-row dense align="center">
                      <!-- Language -->
                      <v-col cols="4">
                        <v-select
                          v-model="rule.language"
                          :items="optionLanguage.type_language"
                          item-text="text"
                          item-value="value"
                          outlined
                          dense
                          hide-details
                          :label="
                            $vuetify.lang.t('$vuetify.dish.cols.language.title')
                          "
                        />
                      </v-col>

                      <!-- Name -->
                      <v-col cols="7">
                        <v-text-field
                          v-model="rule.name"
                          outlined
                          dense
                          hide-details
                          :label="
                            $vuetify.lang.t('$vuetify.dish.cols.name.title')
                          "
                        />
                      </v-col>

                      <!-- Actions -->
                      <v-col cols="1" class="d-flex justify-end">
                        <!-- Save -->
                        <!-- <v-btn icon @click="saveLanguage(rule)">
            <v-icon :color="rule.saved ? 'green' : ''">
              mdi-content-save
            </v-icon>
          </v-btn> -->

                        <!-- Delete -->
                        <v-btn
                          icon
                          color="error"
                          @click="removeColumnLanguage(index)"
                        >
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.priority"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.promotion.cols.priority.title')
                  "
                  @blur="$v.form.priority.$touch()"
                  @input="$v.form.priority.$touch()"
                  :error-messages="priorityErrors"
                  prepend-inner-icon="mdi-start_date mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.consultation_time"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.consultation_time.title'
                    )
                  "
                  @blur="$v.form.consultation_time.$touch()"
                  @input="$v.form.consultation_time.$touch()"
                  :error-messages="consultation_timeErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.owner"
                  :items="itemsUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.owner.title')
                  "
                  @blur="$v.form.owner.$touch()"
                  @input="$v.form.owner.$touch()"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col> -->

              <!-- <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_hour"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.start_hour.title'
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
                    v-model="form.start_hour"
                    color="primary"
                    @input="menu = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-menu
                  v-model="menu2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_hour"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.end_hour.title'
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
                    :min="form.start_hour"
                    v-model="form.end_hour"
                    color="primary"
                    @input="menu2 = false"
                  ></v-time-picker>
                </v-menu>
              </v-col> -->

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date"
                      outlined
                      dense
                      clearable
                      hide-details
                      class="font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date"
                    color="primary"
                    @input="menu4 = false"
                  />
                </v-menu>
                <!-- <v-text-field
                          v-model="rule.start_date"
                          dense
                          outlined
                          hide-details
                          
                        /> -->
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-menu
                  v-model="menu3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date"
                      outlined
                      dense
                      clearable
                      hide-details
                      class="font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date"
                    color="primary"
                    scrollable
                    @input="menu3 = false"
                  />
                </v-menu>
                <!-- <v-text-field
                          v-model="rule.end_date"
                          dense
                          outlined
                          hide-details
                          
                        /> -->
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-switch
                  v-model="is_active"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.promotion.cols.is_active.title')
                  "
                  outlined
                  dense
                ></v-switch>
              </v-col>
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-switch
                  v-model="cumulative"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.promotion.cols.cumulative.title')
                  "
                  outlined
                  dense
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
// import { rules } from "eslint-plugin-prettier";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          active: null,
          priority: null,
          start_hour: null,
          end_hour: null,
          end_date: null,
          start_date: null,
          // depart: null
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    menu2: false,
    menu: false,
    menu3: false,
    menu4: false,
    is_active: false,
    cumulative: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    name_language: [],
    optionsLanguages: {
      text: {
        language: "",
        name: "",
        saved: false,
      },
    },
    rules_reduction: [],
    optionsRules: {
      text: {
        number_dishes: "",
        type_advantage: "",
        reduction_percentage: "",
        start_date: "",
        end_date: "",
      },
    },
    optionLanguage: {
      type_language: [],
    },
    optionAdvantage: {
      type_advantage: [],
    },
    selectedend_date: null,
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },

    urlDepartments: "departments",
    search_: null,
    itemsDepartments: [],
    urlItems: "promotions",
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { username: value, role: "RESPONSIBLE" };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlUsers,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsUsers = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    // search_(value) {
    //   if (value === null) return;
    //   const params = { name: value };
    //   let self = this;
    //   this.isLoading = true;
    //   this.$store
    //     .dispatch("request", {
    //       url: self.urlDepartments,
    //       params: params
    //     })
    //     .then(response => {
    //       //console.log("respp", response.data.content);
    //       self.itemsDepartments = response.data.content;
    //     })
    //     .finally(() => (this.isLoading = false));
    // }
  },
  created() {
    this.getOptionsAdvantage();
    this.getOptionsLanguage();
  },
  validations() {
    let validators = {
      form: {
        priority: {
          required,
        },
        start_date: {
          required,
        },
        end_date: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsLanguage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_language, (type_language) => {
        self.optionLanguage.type_language.push({
          text: self.$vuetify.lang.t(type_language.text),
          value: type_language.value,
        });
      });
    },
    addColumnLanguage() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.name_language.push({
        ...this.optionsLanguages.text,
      });
    },
    removeColumnLanguage(index) {
      this.name_language.splice(index, 1);
    },
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    addColumnRule() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.rules_reduction.push({
        ...this.optionsRules.text,
      });
    },

    removeColumnRule(index) {
      this.rules_reduction.splice(index, 1);
    },
    removeColumnGuests(index) {
      this.externalGuests.splice(index, 1);
    },
    getOptionsAdvantage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_advantage, (type_advantage) => {
        self.optionAdvantage.type_advantage.push({
          text: self.$vuetify.lang.t(type_advantage.text),
          value: type_advantage.value,
        });
      });
    },
    selectFile(file) {
      this.currentFile = file;

      if (file && file instanceof File) {
        this.selectedend_date = URL.createObjectURL(file);
      } else {
        console.error("Invalid file selected", file);
      }
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        is_active: this.is_active,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        priority: this.form.priority,
        start_hour: this.form.start_hour,
        end_hour: this.form.end_hour,
        name_language: this.name_language,
        cumulative: this.cumulative,
        // depart: this.form.depart
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.name_language = item.name_language;
      this.is_active = item.is_active;
      this.cumulative = item.cumulative;
      this.form.start_hour = item.start_hour;
      this.form.end_hour = item.end_hour;
      this.form.priority = item.priority;
      this.form.start_date = item.start_date;
      this.form.end_date = item.end_date;
      // this.form.depart = item.depart["id"];
      // this.itemsDepartments.push(item.depart);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.unique")
        );

      return errors;
    },
    priorityErrors() {
      let errors = [];
      if (!this.$v.form.priority.$dirty) return errors;
      !this.$v.form.priority.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.promotion.cols.priority.required")
        );

      return errors;
    },
    consultation_timeErrors() {
      let errors = [];
      if (!this.$v.form.consultation_time.$dirty) return errors;
      !this.$v.form.consultation_time.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitals.cols.consultation_time.required"
          )
        );

      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.email.invalid")
        );
      return errors;
    },
    start_dateErrors() {
      let errors = [];
      if (!this.$v.form.start_date.$dirty) return errors;
      !this.$v.form.start_date.start_dateR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.start_date.invalid")
        );
      return errors;
    },
  },
  components: {
    // FormDepartment
  },
};
</script>
