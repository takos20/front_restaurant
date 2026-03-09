<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
    <v-card>
      <v-card-title> </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.language"
                    color="primary"
                    :items="optionLanguage.type_language"
                    @blur="$v.form.language.$touch()"
                    @input="$v.form.language.$touch()"
                    :error-messages="languageErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.dish.cols.language.title')
                    "
                    prepend-inner-icon="mdi-earth mdi-dark mdi-18px"
                    class="text-h7 font-weight-bold"
                    item-text="text"
                    item-value="value"
                    outlined
                    dense
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.dish.cols.name.title')"
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.dish.cols.name.title") }}
                    </template></v-text-field
                  >
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.description"
                    color="primary"
                    :row="2"
                    :label="
                      $vuetify.lang.t('$vuetify.dish.cols.description.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
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
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import { existTranslateIgredient } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          description: null,
          language: null,
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
    optionLanguage: {
      type_language: [],
    },
    // formR: {
    //   id: null,
    //   name: null
    // },
    is_delivery: true,
    urlItems: "ingredients/translations",
    isLoading: false,
    search: null,
    itemsCategory: [],
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
          url: self.urlCategory,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCategory = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {
    //this.setItemRoles();
    this.getOptionsLanguage();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existTranslateIgredient,
        },
        language: {
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
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        description: this.form.description,
        language: this.form.language,
        name: this.form.name,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.description = item.description;
      this.form.language = item.language;
      this.form.name = item.name;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.dish.cols.name.required"));
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.ingredient.cols.name.unique")
        );
      return errors;
    },
    languageErrors() {
      let errors = [];
      if (!this.$v.form.language.$dirty) return errors;
      !this.$v.form.language.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.category.cols.language.required")
        );
      return errors;
    },
    categoryErrors() {
      let errors = [];
      if (!this.$v.form.category.$dirty) return errors;
      !this.$v.form.category.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.dish.cols.category.required")
        );
      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.dish.cols.price.required"));
      return errors;
    },
  },
  components: {},
};
</script>
