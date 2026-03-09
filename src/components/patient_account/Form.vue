<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveRadiography">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.nature_code.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" class="mb-0 py-0"> </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.patient"
                    :items="itemsPatient"
                    :loading="isLoadingPatient"
                    :search-input.sync="searchPatient"
                    @blur="$v.form.patient.$touch()"
                    @input="$v.form.patient.$touch()"
                    :error-messages="patientErrors"
                    :label="$vuetify.lang.t('$vuetify.patient.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-account-supervisor-circle"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.patient.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.type_account"
                    color="primary"
                    :items="optionType_account.type_account"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.patientaccount.cols.type_account.title'
                      )
                    "
                    dense
                    @blur="$v.form.type_account.$touch()"
                    @input="$v.form.type_account.$touch()"
                    :error-messages="type_accountErrors"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    class="font-weight-bold"
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

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          patient: null,
          code: null,
          type_account: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    optionType_account: {
      type_account: [],
    },
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
    urlpatient: "patients/all",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    urlItems: "patient_accounts",
    isLoading: false,
  }),
  watch: {
    searchPatient(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingPatient = true;
      this.$store
        .dispatch("request", {
          url: self.urlpatient,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
  },
  created() {
    this.getOptionsType_account();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        type_account: {
          required,
        },
        patient: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsType_account() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_account, (type_account) => {
        self.optionType_account.type_account.push({
          text: self.$vuetify.lang.t(type_account.text),
          value: type_account.value,
        });
      });
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient: this.form.patient,
        type_account: this.form.type_account,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.type_account = item.type_account;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    type_accountErrors() {
      let errors = [];
      if (!this.$v.form.type_account.$dirty) return errors;

      !this.$v.form.type_account.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.patientaccount.cols.type_account.required"
          )
        );

      return errors;
    },
    patientErrors() {
      let errors = [];
      if (!this.$v.form.patient.$dirty) return errors;

      !this.$v.form.patient.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.patientaccount.cols.patient.required")
        );

      return errors;
    },
  },
  components: {},
};
</script>
