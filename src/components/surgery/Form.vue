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
                <v-col cols="12" sm="1" class="mb-0 py-0"> </v-col>
                <v-col
                  cols="12"
                  sm="3"
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
                    v-model="form.type_surgery"
                    :items="itemsType_surgery"
                    :loading="isLoadingType_surgery"
                    :search-input.sync="searchType_surgery"
                    @blur="$v.form.type_surgery.$touch()"
                    @input="$v.form.type_surgery.$touch()"
                    :error-messages="type_surgeryErrors"
                    :label="$vuetify.lang.t('$vuetify.type_surgery.title')"
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
                      >{{ $vuetify.lang.t("$vuetify.type_surgery.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.price"
                    color="primary"
                    @blur="$v.form.price.$touch()"
                    @input="$v.form.price.$touch()"
                    :error-messages="priceErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.radiography.cols.price.title')
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span>{{$vuetify.lang.t('$vuetify.radiography.cols.price.title')}}
                    </template>
                  </v-text-field>
                </v-col> -->
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
import { existTitleSurgery } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          title: null,
          type_surgery: null,
          is_assured: null,
          code: null,
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
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlType_surgery: "type_surgeries",
    isLoadingType_surgery: false,
    searchType_surgery: null,
    itemsType_surgery: [],
    urlItems: "surgeries",
    isLoading: false,
  }),
  watch: {
    searchType_surgery(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_surgery = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_surgery,
          params: params,
        })
        .then((response) => {
          self.itemsType_surgery = response.data.content;
        })
        .finally(() => (this.isLoadingType_surgery = false));
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
          unique: existTitleSurgery,
        },
        type_surgery: {
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
        type_surgery: this.form.type_surgery,
        is_assured: this.form.type_surgery,
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.title = item.title;
      this.form.code = item.code;
      this.form.is_assured = item.is_assured;
      this.form.type_surgery = item.type_surgery["id"];
      this.itemsType_surgery.push(item.type_surgery);
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
    type_surgeryErrors() {
      let errors = [];
      if (!this.$v.form.type_surgery.$dirty) return errors;

      !this.$v.form.type_surgery.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.surgery.cols.type_surgery.required")
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.price.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
