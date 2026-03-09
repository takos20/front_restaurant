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
                sm="4"
                class="mb-0 py-0"
                style="margin-top: -20px"
              >
                <v-switch
                  v-model="form.is_assured"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.is_insurance.title')
                  "
                  outlined
                  dense
                ></v-switch>
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
                  dense
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-text-field
                  v-model="form.title"
                  color="primary"
                  @blur="$v.form.title.$touch()"
                  @input="$v.form.title.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.medical_act.cols.name.title")
                    }}
                  </template>
                </v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.price"
                  color="primary"
                  @blur="$v.form.price.$touch()"
                  @input="$v.form.price.$touch()"
                  :error-messages="priceErrors"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_act.cols.price.title')
                  "
                  prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  type="number"
                  min="0"
                  suffix="FCFA"
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.medical_act.cols.price.title")
                    }}
                  </template>
                </v-text-field>
              </v-col> -->
              <v-col cols="12" sm="7" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.medical_areas"
                  :items="itemsMedical_areas"
                  :loading="isLoading"
                  :search-input.sync="search"
                  @blur="$v.form.medical_areas.$touch()"
                  @input="$v.form.medical_areas.$touch()"
                  :error-messages="medical_areasErrors"
                  color="primary"
                  item-text="title"
                  return-object
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.name.title')
                  "
                  prepend-inner-icon="mdi-hospital mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.medical_areas.cols.name.title")
                    }}
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-btn
                  class="mx-2"
                  dark
                  dense
                  @click="createD()"
                  color="primary"
                  max-width="2px"
                  v-if="
                    _.includes(
                      this.$auth.user().permissions,
                      'add_medical_areas'
                    )
                  "
                >
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="form.quotation_rate"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.quotation_rate.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-row wrap v-if="form.medical_areas == null">
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.normal"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.normal.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.employee"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.employee.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.indigent"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.indigent.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row wrap v-else-if="this.form.id !== null">
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.normal"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.normal.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.employee"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.employee.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.indigent"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.indigent.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row wrap v-else>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      :value="
                        form.medical_areas == null
                          ? ''
                          : form.medical_areas.normal
                      "
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.normal.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      :value="
                        form.medical_areas == null
                          ? ''
                          : form.medical_areas.employee
                      "
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.employee.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" class="mb-0 py-0">
                    <v-text-field
                      :value="
                        form.medical_areas == null
                          ? ''
                          : form.medical_areas.indigent
                      "
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.medical_areas.cols.indigent.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
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
      </v-form>
    </v-card>
    <form-areas :dialog="dialogForm"></form-areas>
  </v-dialog>
</template>

<script>
import FormAreas from "./FormDM";
import { existNameAct } from "../../helpers/Validator";

import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          medical_areas: null,
          is_assured: null,
          title: null,
          // price: null,
          normal: null,
          scale_price: null,
          quotation_rate: null,
          employee: null,
          indigent: null,
        };
      },
    },
  },
  data: () => ({
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    is_active: true,
    urlItems: "medical_act",
    urlMedical_areas: "medical_areas",
    isLoading: false,
    search: null,
    itemsMedical_areas: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlMedical_areas,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_areas = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {},
  validations() {
    let validators = {
      form: {
        title: {
          required,
          unique: existNameAct,
          maxLength: maxLength(255),
        },
        medical_areas: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        title: null,
        normal: null,
        employee: null,
        indigent: null,
        number_account: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        medical_areas:
          this.form.id === null
            ? this.form.medical_areas["id"]
            : this.form.medical_areas,
        is_active: this.is_active,
        // price: this.form.price,
        quotation_rate: this.form.quotation_rate,
        normal:
          this.form.medical_areas === null
            ? this.form.normal
            : this.form.medical_areas.normal,
        employee:
          this.form.medical_areas === null
            ? this.form.employee
            : this.form.medical_areas.employee,
        indigent:
          this.form.medical_areas === null
            ? this.form.indigent
            : this.form.medical_areas.indigent,
        is_assured: this.form.is_assured,
        title: this.form.title,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.title = item.title;
      this.form["oldName"] = item.title;
      // this.form.price = item.price;
      this.is_active = item.is_active;
      this.form.employee = item.employee;
      this.form.normal = item.normal;
      this.form.quotation_rate = item.quotation_rate;
      this.form.indigent = item.indigent;
      this.form.medical_areas = item.medical_areas["id"];
      this.itemsMedical_areas.push(item.medical_areas);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_act.cols.name.required")
        );
      !this.$v.form.title.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_act.cols.name.unique")
        );

      return errors;
    },
    // priceErrors() {
    //   let errors = [];
    //   if (!this.$v.form.price.$dirty) return errors;
    //   !this.$v.form.price.required &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.medical_act.cols.price.required")
    //     );

    //   return errors;
    // }
    // ,
    medical_areasErrors() {
      let errors = [];
      if (!this.$v.form.medical_areas.$dirty) return errors;
      !this.$v.form.medical_areas.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_act.cols.medical_areas.required"
          )
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.form.quote_external.$dirty) return errors;

      !this.$v.form.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_act.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_act.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: {
    FormAreas,
  },
};
</script>
