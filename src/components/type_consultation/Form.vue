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
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.title"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.radiography.cols.title.title')
                    "
                    @blur="$v.form.title.$touch()"
                    @input="$v.form.title.$touch()"
                    :error-messages="titleErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <!--      <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.price"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.radiography.cols.price.title')
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    @blur="$v.form.price.$touch()"
                    @input="$v.form.price.$touch()"
                    :error-messages="priceErrors"
                    outlined
                    dense
                    suffix="FCFA"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  ></v-text-field>
                </v-col>-->
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
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.type"
                    outlined
                    color="primary"
                    dense
                    clearable
                    @blur="$v.form.type.$touch()"
                    @input="$v.form.type.$touch()"
                    :error-messages="typeErrors"
                    prepend-inner-icon="mdi-account-group-outline"
                    :items="optionType.type_type"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.consultation_type.title'
                      )
                    "
                  ></v-select>
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
import { existTitleTypeConsultation } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          title: null,
          code: null,
          price: null,
          is_assured: null,
          type: null,
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
    optionType: {
      type_type: [],
    },
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
    urlItems: "type_consultations",
    isLoading: false,
  }),
  watch: {},

  created() {
    this.getOptionsType();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        title: {
          required,
          unique: existTitleTypeConsultation,
        },
        type: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsType() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.consultation_type, (type_type) => {
        self.optionType.type_type.push({
          text: self.$vuetify.lang.t(type_type.text),
          value: type_type.value,
        });
      });
    },

    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        title: this.form.title,
        price: this.form.price,
        is_assured: this.form.is_assured,
        type: this.form.type,
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.title = item.title;
      this.form.price = item.price;
      this.form.is_assured = item.is_assured;
      this.form.type = item.type;
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
    typeErrors() {
      let errors = [];
      if (!this.$v.form.type.$dirty) return errors;

      !this.$v.form.type.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.consultation.cols.consultation_type.required"
          )
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.price.required")
        );

      return errors;
    },
  },
  components: {},
};
</script>
