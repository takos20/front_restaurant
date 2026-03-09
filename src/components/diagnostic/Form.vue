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
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="form.is_assured"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.patient.cols.is_insurance.title'
                      )
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.type_diagnostic"
                    :items="itemsType_diagnostic"
                    :loading="isLoadingType_diagnostic"
                    :search-input.sync="searchType_diagnostic"
                    @blur="$v.form.type_diagnostic.$touch()"
                    @input="$v.form.type_diagnostic.$touch()"
                    :error-messages="type_diagnosticErrors"
                    :label="$vuetify.lang.t('$vuetify.type_diagnostic.title')"
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
                      >{{ $vuetify.lang.t("$vuetify.type_diagnostic.title") }}
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
import { existTitleDiagnostic } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          is_assured: null,
          title: null,
          type_diagnostic: null,
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
    urlType_diagnostic: "type_diagnostics",
    isLoadingType_diagnostic: false,
    searchType_diagnostic: null,
    itemsType_diagnostic: [],
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems: "diagnostics",
    isLoading: false,
  }),
  watch: {
    searchType_diagnostic(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_diagnostic = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_diagnostic,
          params: params,
        })
        .then((response) => {
          self.itemsType_diagnostic = response.data.content;
        })
        .finally(() => (this.isLoadingType_diagnostic = false));
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
          unique: existTitleDiagnostic,
        },
        type_diagnostic: {
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
        type_diagnostic: this.form.type_diagnostic,
        is_assured: this.form.is_assured,
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.title = item.title;
      this.form.code = item.code;
      this.form.is_assured = item.code;
      this.form.type_diagnostic = item.type_diagnostic["id"];
      this.itemsType_diagnostic.push(item.type_diagnostic);
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
    type_diagnosticErrors() {
      let errors = [];
      if (!this.$v.form.type_diagnostic.$dirty) return errors;

      !this.$v.form.type_diagnostic.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.diagnostic.cols.type_diagnostic.required"
          )
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
