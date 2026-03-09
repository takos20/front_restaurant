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
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.performanceBonus.cols.code.title'
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
                  <v-text-field
                    v-model="form.price"
                    @blur="$v.form.price.$touch()"
                    @input="$v.form.price.$touch()"
                    :error-messages="priceErrors"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.performanceBonus.cols.price.title'
                      )
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
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.performanceBonus.cols.price.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.rate"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.taxeContribution.cols.rate.title'
                      )
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="%"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.rate_employer"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.taxeContribution.cols.rate_employer.title'
                      )
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="%"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.performanceBonus.cols.name.title'
                      )
                    "
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.performanceBonus.cols.name.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.description"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.performanceBonus.cols.description.title'
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
import { existNameTaxe } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          price: null,
          rate: null,
          rate_employer: null,
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
    urlItems: "taxeContributions",
    isLoading: false,
  }),
  watch: {},

  created() {},
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameTaxe,
        },
        price: {
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
        name: this.form.name,
        price: this.form.price,
        rate: this.form.rate,
        rate_employer: this.form.rate_employer,
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form.price = item.price;
      this.form.rate = item.rate;
      this.form.rate_employer = item.rate_employer;
      this.form.description = item.description;
      this.form["oldName"] = item.name;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.performanceBonus.cols.name.required")
        );

      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.performanceBonus.cols.name.unique")
        );
      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.performanceBonus.cols.price.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
