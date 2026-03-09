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
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.nature_code.title'
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
                <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.type_exam"
                    :items="itemsType_exam"
                    :loading="isLoadingType_exam"
                    :search-input.sync="searchType_exam"
                    @blur="$v.form.type_exam.$touch()"
                    @input="$v.form.type_exam.$touch()"
                    :error-messages="type_examErrors"
                    :label="$vuetify.lang.t('$vuetify.type_exam.title')"
                    color="primary"
                    item-text="title"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.type_exam.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.title"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.dosage.cols.title.title')"
                    @blur="$v.form.title.$touch()"
                    @input="$v.form.title.$touch()"
                    :error-messages="titleErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.dosage.cols.title.title") }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.description"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.radiography.cols.description.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.normal_value"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.laboratory.cols.normal_value.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.interpretation"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.laboratory.cols.interpretation.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.conclusion"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.laboratory.cols.conclusion.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
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
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import { existTitleLaboratory } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          title: null,
          price: null,
          type_exam: null,
          conclusion: null,
          interpretation: null,
          normal_value: null,
          description: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlType_exam: "type_exams",
    isLoadingType_exam: false,
    searchType_exam: null,
    itemsType_exam: [],
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems: "laboratories",
    isLoading: false,
  }),
  watch: {
    searchType_exam(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_exam = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_exam,
          params: params,
        })
        .then((response) => {
          self.itemsType_exam = response.data.content;
        })
        .finally(() => (this.isLoadingType_exam = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        title: {
          required,
          unique: existTitleLaboratory,
        },
        type_exam: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        title: this.form.title,
        price: this.form.price,
        type_exam: this.form.type_exam,
        conclusion: this.form.conclusion,
        normal_value: this.form.normal_value,
        results: this.form.results,
        interpretation: this.form.interpretation
          ? this.form.interpretation
          : "RAS",
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.title = item.title;
      this.form.code = item.code;
      this.form.price = item.price;
      this.form.type_exam = item.type_exam["id"];
      this.itemsType_exam.push(item.type_exam);
      this.form.interpretation = item.interpretation;
      this.form.conclusion = item.conclusion;
      this.form.normal_value = item.normal_value;
      this.form.description = item.description;
      this.form["oldTitle"] = item.title;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    titleErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.title.required")
        );

      !this.$v.form.title.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.title.unique")
        );
      return errors;
    },
    type_examErrors() {
      let errors = [];
      if (!this.$v.form.type_exam.$dirty) return errors;

      !this.$v.form.type_exam.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.laboratory.cols.type_exam.required")
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.laboratory.cols.price.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
