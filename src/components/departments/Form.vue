<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
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
                  :label="$vuetify.lang.t('$vuetify.dci.cols.code.title')"
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
                  v-model="form.name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.departments.cols.name.title')
                  "
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.departments.cols.name.title")
                    }}
                  </template>
                </v-text-field></v-col
              >
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
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import { existNameDepart } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
        };
      },
    },
  },
  data: () => ({
    urlItems: "departments",
    is_active: true,
  }),
  created() {},
  validations() {
    let validators = {
      form: {
        name: {
          required,
          maxLength: maxLength(100),
          unique: existNameDepart,
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
        name: this.form.name,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.code = item.code;
      this.is_active = item.is_active;
      this.form["oldName"] = item.name;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.departments.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.departments.cols.name.unique")
        );
      return errors;
    },
  },
};
</script>
