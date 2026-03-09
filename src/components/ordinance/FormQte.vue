<template>
  <v-dialog v-model="dialog.show" persistent max-width="480px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveQteDosage">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.title"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.qteDosage.cols.title.title')
                    "
                    @blur="$v.form.title.$touch()"
                    @input="$v.form.title.$touch()"
                    :error-messages="titleErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
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
import { existTitleQte } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
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
    urlItems: "qte_dosages",
    isLoading: false,
  }),
  watch: {},

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        title: {
          required,
          unique: existTitleQte,
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
        title: this.form.title,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.title = item.title;
      this.form["oldTitle"] = item.title;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    titleErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.qteDosage.cols.title.required")
        );

      !this.$v.form.title.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.qteDosage.cols.title.unique")
        );

      return errors;
    },
  },
  components: {},
};
</script>
