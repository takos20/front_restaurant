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
                    autofocus
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.price"
                    color="primary"
                    @blur="$v.form.price.$touch()"
                    @input="$v.form.price.$touch()"
                    :error-messages="priceErrors"
                    :label="$vuetify.lang.t('$vuetify.dish.cols.price.title')"
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
                      >{{ $vuetify.lang.t("$vuetify.dish.cols.price.title") }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  class="mb-0 py-0"
                  style="margin-top: -10px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.status.title2')
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
// import { existPrices } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          price: null,
          dish: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    urlItems: "/structure_articles",
    isLoadingDish: false,
    searchDish: null,
    search: null,
    itemsDish: [],
    urlDish: "dishes/all",
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

    isLoading: false,
  }),
  watch: {
    searchDish(value) {
      if (value === null) return;
      this.isLoadingDish = true;
      const params = { name_language: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlDish,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoadingDish = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        price: {
          required,
        },
        dish: {
          required,
          // unique: existPrices
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
        dish: this.form.dish,
        price: this.form.price,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.is_active = item.is_active;
      this.form.id = item.id;
      this.form.price = item.price;
      this.form.dish = item.dish
        ? item.dish["id"]
          ? item.dish["id"]
          : item.dish
        : item.dish;
      this.itemsDish.push(item.dish);
      // this.form["oldType_patient"] = item.status_patient;
      // this.form["other_code"] = this.$route.params.code;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    titleErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.dosage.cols.title.required")
        );

      !this.$v.form.title.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.dosage.cols.title.unique"));
      return errors;
    },
    dishErrors() {
      let errors = [];
      if (!this.$v.form.dish.$dirty) return errors;
      !this.$v.form.dish.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.price.cols.dish.required"));
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
