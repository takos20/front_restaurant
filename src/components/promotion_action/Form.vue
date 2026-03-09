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
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.promotion"
                  :items="itemsPromotion"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.promotion.title')"
                  @blur="$v.form.promotion.$touch()"
                  @input="$v.form.promotion.$touch()"
                  :error-messages="promotionErrors"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{ $vuetify.lang.t("$vuetify.promotion.title") }}
                  </template></v-autocomplete
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-select
                  outlined
                  dense
                  v-model="form.action_type"
                  color="primary"
                  :items="optionAction.action_type"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.promotion_action.cols.action_type.title'
                    )
                  "
                  :placeholder="
                    $vuetify.lang.t(
                      '$vuetify.promotion_action.cols.action_type.title'
                    )
                  "
                  class="font-weight-bold"
                  @blur="$v.form.action_type.$touch()"
                  @input="$v.form.action_type.$touch()"
                  :error-messages="action_typeErrors"
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t(
                        "$vuetify.promotion_action.cols.action_type.title"
                      )
                    }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.value"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.promotion_action.cols.value.title'
                    )
                  "
                  @blur="$v.form.value.$touch()"
                  @input="$v.form.value.$touch()"
                  :error-messages="valueErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                >
                  <template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t(
                        "$vuetify.promotion_action.cols.value.title"
                      )
                    }}
                  </template></v-text-field
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
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
  </v-dialog>
</template>

<script>
// import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
// import { rules } from "eslint-plugin-prettier";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          promotion: null,
          action_type: null,
          value: null,
          // depart: null
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    menu2: false,
    menu: false,
    menu3: false,
    menu4: false,
    is_active: false,
    cumulative: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    rules_reduction: [],
    optionsRules: {
      text: {
        number_dishes: "",
        type_advantage: "",
        reduction_percentage: "",
        start_date: "",
        end_date: "",
      },
    },
    optionAction: {
      action_type: [],
    },
    selectedend_date: null,
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    urlItems: "promotion_actions",
    urlPromotion: "promotions/all",
    isLoading: false,
    search: null,
    itemsPromotion: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPromotion,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsPromotion = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getOptionsAction();
  },
  validations() {
    let validators = {
      form: {
        promotion: {
          required,
        },
        value: {
          required,
        },
        action_type: {
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
        name: null,
      };
    },
    addColumnRule() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.rules_reduction.push({
        ...this.optionsRules.text,
      });
    },

    removeColumnRule(index) {
      this.rules_reduction.splice(index, 1);
    },
    removeColumnGuests(index) {
      this.externalGuests.splice(index, 1);
    },
    getOptionsAction() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.action_type, (action_type) => {
        self.optionAction.action_type.push({
          text: self.$vuetify.lang.t(action_type.text),
          value: action_type.value,
        });
      });
    },
    selectFile(file) {
      this.currentFile = file;

      if (file && file instanceof File) {
        this.selectedend_date = URL.createObjectURL(file);
      } else {
        console.error("Invalid file selected", file);
      }
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        promotion: this.form.promotion,
        value: this.form.value,
        action_type: this.form.action_type,
        // depart: this.form.depart
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.value = item.value;
      this.form.action_type = item.action_type;
      this.form.promotion = item.promotion["id"]
        ? item.promotion["id"]
        : item.promotion;
      this.itemsPromotion.push(item.promotion);
      // this.form.depart = item.depart["id"];
      // this.itemsDepartments.push(item.depart);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    promotionErrors() {
      let errors = [];
      if (!this.$v.form.promotion.$dirty) return errors;
      !this.$v.form.promotion.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.promotion_rule.cols.promotion.required"
          )
        );

      return errors;
    },
    action_typeErrors() {
      let errors = [];
      if (!this.$v.form.action_type.$dirty) return errors;
      !this.$v.form.action_type.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.promotion_action.cols.action_type.required"
          )
        );

      return errors;
    },
    valueErrors() {
      let errors = [];
      if (!this.$v.form.value.$dirty) return errors;
      !this.$v.form.value.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.promotion_action.cols.value.required")
        );

      return errors;
    },
  },
  components: {
    // FormDepartment
  },
};
</script>
