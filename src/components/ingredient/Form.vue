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
                <v-col cols="12">
                  <v-card class="pa-4" outlined>
                    <!-- Header -->
                    <div class="d-flex align-center justify-space-between mb-4">
                      <div>
                        <div class="text-h6 font-weight-bold">
                          {{ $vuetify.lang.t("$vuetify.dish.language") }}
                        </div>
                        <div class="grey--text text--darken-1 text-caption">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.dish.language_description"
                            )
                          }}
                        </div>
                      </div>

                      <v-btn color="primary" small @click="addColumnLanguage">
                        <v-icon left>mdi-plus</v-icon>
                        {{ $vuetify.lang.t("$vuetify.btn.add") }}
                      </v-btn>
                    </div>

                    <v-divider class="mb-4"></v-divider>

                    <!-- Lines -->
                    <v-card
                      v-for="(rule, index) in name_language"
                      :key="index"
                      class="mb-2 pa-2 rounded-lg"
                      outlined
                    >
                      <v-row dense align="center">
                        <!-- Language -->
                        <v-col cols="4">
                          <v-select
                            v-model="rule.language"
                            :items="optionLanguage.type_language"
                            item-text="text"
                            item-value="value"
                            outlined
                            dense
                            hide-details
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.dish.cols.language.title'
                              )
                            "
                          />
                        </v-col>

                        <!-- Name -->
                        <v-col cols="7">
                          <v-text-field
                            v-model="rule.name"
                            outlined
                            dense
                            hide-details
                            :label="
                              $vuetify.lang.t('$vuetify.dish.cols.name.title')
                            "
                          />
                        </v-col>

                        <!-- Actions -->
                        <v-col cols="1" class="d-flex justify-end">
                          <!-- Save -->
                          <!-- <v-btn icon @click="saveLanguage(rule)">
            <v-icon :color="rule.saved ? 'green' : ''">
              mdi-content-save
            </v-icon>
          </v-btn> -->

                          <!-- Delete -->
                          <v-btn
                            icon
                            color="error"
                            @click="removeColumnLanguage(index)"
                          >
                            <v-icon>mdi-delete-outline</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.unit"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.ingredient.cols.unit.title')
                    "
                    @blur="$v.form.unit.$touch()"
                    @input="$v.form.unit.$touch()"
                    :error-messages="unitErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.ingredient.cols.unit.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.price_per_unit"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.ingredient.cols.price_per_unit.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong></strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.ingredient.cols.price_per_unit.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.last_paid_price"
                    readonly
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.ingredient.cols.last_paid_price.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong></strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.ingredient.cols.last_paid_price.title"
                        )
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
            <v-btn @click="forceRefresh()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
    <form-translation
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      ref="translationForm"
    ></form-translation>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
// import { existNameIngredient } from "../../helpers/Validator";
import FormTranslation from "./FormTranslation.vue";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          price_per_unit: null,
          stock_quantity: null,
          unit: null,
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
    urlItemsTranslate: "ingredients/translations",
    optionLanguage: {
      type_language: [],
    },
    name_language: [],
    optionsLanguages: {
      text: {
        language: "",
        name: "",
        saved: false,
      },
    },
    urlItems: "ingredients",
  }),
  watch: {},

  created() {
    //this.setItemRoles();
    this.getOptionsLanguage();
  },
  validations() {
    let validators = {
      form: {
        unit: {
          required,
        },
        // price_per_unit: {
        //   required,
        // },
        // name: {
        //   required,
        //   unique: existNameIngredient,
        // },
      },
    };
    return validators;
  },
  methods: {
    addColumnLanguage() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.name_language.push({
        ...this.optionsLanguages.text,
      });
    },
    removeColumnLanguage(index) {
      this.name_language.splice(index, 1);
    },
    forceRefresh() {
      this.dialog.show = false;
      this.name_language = [];
    },
    saveLanguage(rule) {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      const payload = {
        ingredient: this.form.id,
        language: rule.language,
        name: rule.name,
      };
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsTranslate,
            method: "POST",
            data: payload,
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },

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
        price_per_unit: this.form.price_per_unit,
        unit: this.form.unit,
        name_language: this.name_language,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.unit = item.unit;
      this.name_language = item.name_language;
      this.form.price_per_unit = item.price_per_unit;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.ingredient.cols.name.required")
        );

      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.ingredient.cols.name.unique")
        );
      return errors;
    },
    price_per_unitErrors() {
      let errors = [];
      if (!this.$v.form.price_per_unit.$dirty) return errors;
      !this.$v.form.price_per_unit.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.ingredient.cols.price_per_unit.required"
          )
        );

      return errors;
    },
    unitErrors() {
      let errors = [];
      if (!this.$v.form.unit.$dirty) return errors;
      !this.$v.form.unit.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.ingredient.cols.unit.required")
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
      return errors;
    },
  },
  components: { FormTranslation },
};
</script>
