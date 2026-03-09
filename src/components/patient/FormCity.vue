<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.city.new.title") }}
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
                    v-model="form.region"
                    :items="itemsregion"
                    :loading="isLoading"
                    :search-input.sync="search"
                    @blur="$v.form.region.$touch()"
                    @input="$v.form.region.$touch()"
                    :error-messages="regionErrors"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.region.title')"
                    outlined
                    dense
                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.region.title") }}
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
              {{ $vuetify.lang.t("$vuetify.btn.save") }}
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
import { existNameCity } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          region: null,
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
    urlItems: "cities",
    urlregion: "regions",
    isLoading: false,
    search: null,
    itemsregion: [],
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
          url: self.urlregion,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsregion = response.data.content;
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
        region: {
          required,
        },
        name: {
          required,
          unique: existNameCity,
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
        region: this.form.region,
        billable: this.form.billable,
        name: this.form.name,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.is_active = item.is_active;
      this.form.region = item.region["id"];
      this.itemsregion.push(item.region);
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
    regionErrors() {
      let errors = [];
      if (!this.$v.form.region.$dirty) return errors;
      !this.$v.form.region.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.category.cols.region.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
