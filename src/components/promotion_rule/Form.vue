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
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.consultation_time"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.consultation_time.title'
                    )
                  "
                  @blur="$v.form.consultation_time.$touch()"
                  @input="$v.form.consultation_time.$touch()"
                  :error-messages="consultation_timeErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->
              <v-col cols="12" sm="6" class="mb-0 py-0">
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
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.type_patient"
                  :items="itemsType_patient"
                  :loading="isLoadingType_patient"
                  :search-input.sync="searchType_patient"
                  color="primary"
                  item-text="title"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.type_patient.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.category"
                  :items="itemsCategory"
                  :loading="isLoadingCategory"
                  :search-input.sync="searchCategory"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.category.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.dish"
                  :items="itemsDish"
                  :loading="isLoadingDish"
                  :search-input.sync="searchDish"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.dish.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.min_quantity"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.promotion_rule.cols.min_quantity.title'
                    )
                  "
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_hour"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.promotion_rule.cols.start_hour.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="form.start_hour"
                    color="primary"
                    @input="menu = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_hour"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.promotion_rule.cols.end_hour.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    :min="form.start_hour"
                    v-model="form.end_hour"
                    color="primary"
                    @input="menu2 = false"
                  ></v-time-picker>
                </v-menu>
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
          type_patient: null,
          min_quantity: null,
          category: null,
          end_hour: null,
          dish: null,
          start_hour: null,
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
    optionAdvantage: {
      type_advantage: [],
    },
    selectedend_date: null,
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    urlItems: "promotion_rules",
    searchDish: null,
    itemsDish: [],
    isLoadingDish: false,
    isLoading: false,
    urlItemsDish: "dishes/all",
    urlPromotion: "promotions/all",
    search: null,
    itemsPromotion: [],
    searchCategory: null,
    itemsCategory: [],
    isLoadingCategory: false,
    urlCategory: "categories/all",
    searchType_patient: null,
    itemsType_patient: [],
    isLoadingType_patient: false,
    urlType_patient: "type_patients/all",
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
    searchDish(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoadingDish = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDish,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoadingDish = false));
    },
    searchCategory(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCategory = true;
      this.$store
        .dispatch("request", {
          url: self.urlCategory,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsCategory = response.data.content;
        })
        .finally(() => (this.isLoadingCategory = false));
    },
    searchType_patient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingType_patient = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_patient,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsType_patient = response.data.content;
        })
        .finally(() => (this.isLoadingType_patient = false));
    },
  },
  created() {
    this.getOptionsAdvantage();
  },
  validations() {
    let validators = {
      form: {
        promotion: {
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
    getOptionsAdvantage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_advantage, (type_advantage) => {
        self.optionAdvantage.type_advantage.push({
          text: self.$vuetify.lang.t(type_advantage.text),
          value: type_advantage.value,
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
        type_patient: this.form.type_patient,
        category: this.form.category,
        start_hour: this.form.start_hour,
        end_hour: this.form.end_hour,
        min_quantity: this.form.min_quantity,
        dish: this.form.dish,
        // depart: this.form.depart
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.min_quantity = item.min_quantity;
      this.form.start_hour = item.start_hour;
      this.form.end_hour = item.end_hour;
      this.form.dish = item.dish
        ? item.dish["id"]
          ? item.dish["id"]
          : item.dish
        : item.dish;
      this.itemsDish.push(item.dish);
      this.form.promotion = item.promotion
        ? item.promotion["id"]
          ? item.promotion["id"]
          : item.promotion
        : item.promotion;
      this.itemsPromotion.push(item.promotion);
      this.form.type_patient = item.type_patient
        ? item.type_patient["id"]
          ? item.type_patient["id"]
          : item.type_patient
        : item.type_patient;
      this.itemsType_patient.push(item.type_patient);
      this.form.category = item.category
        ? item.category["id"]
          ? item.category["id"]
          : item.category
        : item.category;
      this.itemsCategory.push(item.category);
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
  },
  components: {
    // FormDepartment
  },
};
</script>
