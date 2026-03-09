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
                <v-col cols="12" sm="5" class="mb-0 py-0"> </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="form.is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.category.cols.status.title2')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <!--                <v-col cols="12" sm="6" class="mb-0 py-0">-->
                <!--                  <v-autocomplete-->
                <!--                    v-model="form.medical_areas"-->
                <!--                    :items="itemsMedical_areas"-->
                <!--                    :loading="isLoading"-->
                <!--                    :search-input.sync="search"-->
                <!--                    color="primary"-->
                <!--                    item-text="name"-->
                <!--                    item-value="id"-->
                <!--                    :label="-->
                <!--                      $vuetify.lang.t('$vuetify.medical_areas.cols.name.title')-->
                <!--                    "-->
                <!--                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"-->
                <!--                    class="font-weight-bold"-->
                <!--                    outlined-->
                <!--                    dense-->
                <!--                    clearable-->
                <!--                  ></v-autocomplete>-->
                <!--                </v-col>-->

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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.billable"
                    color="primary"
                    :items="optionBillable.type_Billable"
                    :label="
                      $vuetify.lang.t('$vuetify.category.cols.billable.title')
                    "
                    :placeholder="
                      $vuetify.lang.t('$vuetify.category.cols.billable.title2')
                    "
                    prepend-inner-icon="mdi-account-group-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-select>
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
import { existNameCategory } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          billable: null,
          name: null,
          is_active: false,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
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
    urlItems: "categories",
    urlMedical_areas: "medical_areas",
    isLoading: false,
    search: null,
    itemsMedical_areas: [],
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
          url: self.urlMedical_areas,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsMedical_areas = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {
    this.getOptionsBillable();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        billable: {
          required,
        },
        name: {
          required,
          unique: existNameCategory,
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    getOptionsBillable() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Billable, (type_Billable) => {
        self.optionBillable.type_Billable.push({
          text: self.$vuetify.lang.t(type_Billable.text),
          value: type_Billable.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        // medical_areas: this.form.medical_areas,
        billable: this.form.billable,
        name: this.form.name,
        is_active: this.form.is_active ? this.form.is_active : false,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.billable = item.billable;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.is_active = item.is_active;
      // this.form.medical_areas = item.medical_areas["id"];
      // this.itemsMedical_areas.push(item.medical_areas);
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
    billableErrors() {
      let errors = [];
      if (!this.$v.form.billable.$dirty) return errors;
      !this.$v.form.billable.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.category.cols.billable.required")
        );

      !this.$v.form.billable.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.category.cols.billable.maxLength",
            this.$v.form.billable.$params.maxLength.max
          )
        );
      return errors;
    },
  },
  components: {},
};
</script>
