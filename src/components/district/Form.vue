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
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.category.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="9" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.city"
                    :items="itemsCity"
                    :loading="isLoading"
                    :search-input.sync="search"
                    @blur="$v.form.city.$touch()"
                    @input="$v.form.city.$touch()"
                    :error-messages="cityErrors"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.city.title')"
                    outlined
                    dense
                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.city.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.category.cols.name.title')
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
                        $vuetify.lang.t("$vuetify.category.cols.name.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="form.is_default"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.district.cols.is_default.title')
                    "
                    outlined
                    dense
                  ></v-switch>
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
import { existNameDistrict } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          is_default: null,
          city: null,
          name: null,
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
    // formR: {
    //   id: null,
    //   name: null
    // },
    optionBillable: {
      type_Billable: [],
    },
    urlItems: "districts",
    urlCity: "cities/all",
    isLoading: false,
    search: null,
    itemsCity: [],
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCity = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        city: {
          required,
        },
        name: {
          required,
          unique: existNameDistrict,
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        is_default: this.form.is_default,
        city: this.form.city,
        name: this.form.name,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.is_default = item.is_default;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.city = item.city["id"];
      this.itemsCity.push(item.city);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.category.cols.name.required")
        );

      !this.$v.form.name.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.category.cols.name.unique"));
      return errors;
    },
    codeErrors() {
      let errors = [];
      if (!this.$v.form.code.$dirty) return errors;
      !this.$v.form.code.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.category.cols.code.required")
        );

      !this.$v.form.code.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.category.cols.code.maxLength",
            this.$v.form.code.$params.maxLength.max
          )
        );
      return errors;
    },
    cityErrors() {
      let errors = [];
      if (!this.$v.form.city.$dirty) return errors;
      !this.$v.form.city.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.district.cols.city.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
