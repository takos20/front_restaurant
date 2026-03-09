<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-row wrap>
            <v-col cols="12" sm="5" class="mb-0 py-0">
              <v-row>
                <v-col cols="4" class="mt-3">
                  <v-subheader lass="font-weight-bold">{{
                    $vuetify.lang.t(
                      "$vuetify.consultation.cols.createdAt.title"
                    )
                  }}</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-menu
                    v-model="menu3"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.createdAt"
                        color="primary"
                        class="font-weight-bold"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.createdAt"
                      :max="maxDate"
                      color="primary"
                      @input="menu3 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" sm="7" class="mb-0 py-0">
              <v-row>
                <v-col cols="2" class="mt-3">
                  <v-subheader lass="font-weight-bold">{{
                    $vuetify.lang.t(
                      "$vuetify.ordinance.cols.consultation.title"
                    )
                  }}</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-card-text>
                    <v-autocomplete
                      dense
                      v-model="form.consultation"
                      :items="itemsConsultation"
                      :loading="isLoadingConsultation"
                      :search-input.sync="searchConsultation"
                      color="primary"
                      item-text="code"
                      hide-no-data
                      item-value="id"
                      class="font-weight-bold"
                      clearable
                    ></v-autocomplete>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card max-width="820px" class="ml-6 mt-2">
          <v-card-text>
            <span class="text-h6 text-center body-2 black--text text--darken-1">
              {{ $vuetify.lang.t("$vuetify.ordinance.titleMedication") }}
            </span>
            <div class="d-flex justify-space-between">
              <span class="font-weight-medium text-subtitle-1"> </span>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon @click="addColumnMedication()" v-on="on">
                    mdi-plus-circle-outline
                  </v-icon>
                </template>
                <span>{{ $vuetify.lang.t("$vuetify.btn.add") }}</span>
              </v-tooltip>
            </div>
            <div class="d-flex wrap align-center mt-8" style="height: 40px">
              <v-container>
                <v-row>
                  <v-text-field
                    outlined
                    :placeholder="
                      $vuetify.lang.t('$vuetify.ordinance.cols.nameDrug.title')
                    "
                    class="font-weight-bold ml-2 mr-1"
                    dense
                    readonly
                    style="width: 200px"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    style="width: 100px"
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.ordinance.cols.dosageDrug.title'
                      )
                    "
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t('$vuetify.ordinance.cols.formDrug.title')
                    "
                    style="width: 100px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                  <v-text-field
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t(
                        '$vuetify.ordinance.cols.nberTimesDay.title'
                      )
                    "
                    style="width: 100px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field
                  ><v-text-field
                    readonly
                    outlined
                    dense
                    :placeholder="
                      $vuetify.lang.t('$vuetify.ordinance.cols.qteDrug.title')
                    "
                    style="width: 100px"
                    class="font-weight-bold ml-2 mr-1"
                  ></v-text-field>
                </v-row>
              </v-container>
            </div>
            <div v-for="(sheet, index) in medication" :key="index">
              <div class="d-flex wrap align-center mt-3" style="height: 40px">
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.nameDrug"
                  style="width: 200px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.dosageDrug"
                  style="width: 100px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.formDrug"
                  style="width: 100px"
                  class="font-weight-bold ml-2 mr-1"
                ></v-textarea>
                <v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.nberTimesDay"
                  style="width: 100px"
                  class="ml-2 mr-1"
                ></v-textarea
                ><v-textarea
                  rows="1"
                  outlined
                  dense
                  v-model="sheet.qteDrug"
                  style="width: 100px"
                  class="ml-2 mr-1"
                ></v-textarea>
                <v-icon
                  class="ml-1 mb-5"
                  style="width: 10px"
                  v-if="index > 0"
                  @click="removeColumnMedication(index)"
                >
                  mdi-minus-circle-outline
                </v-icon>
              </div>
            </div>
          </v-card-text>
          <v-divider class="mx-2 mr-10" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeForm()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card-text></v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";

// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          createdAt: null,
          medication: null,
          patient: null,
          consultation: null,
        };
      },
    },
  },
  data: () => ({
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    medication: [],
    optionsMedication: {
      text: {
        nameDrug: "",
        dosageDrug: "",
        formDrug: "",
        nberTimesDay: "",
        qteDrug: "",
      },
    },
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    urlItems: "ordinances",
    urlConsultation: "consultations",
    isLoadingConsultation: false,
    searchConsultation: null,
    itemsConsultation: [],
  }),
  watch: {
    searchConsultation(value) {
      if (value === null) return;
      const params = { code: value, patient: this.$route.params.id };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlConsultation,
          params: params,
        })
        .then((response) => {
          self.itemsConsultation = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {},
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PATCH" : "POST";
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
            self.resetDataForm();
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
    resetDataForm() {
      this.medication = [];
      this.form.id = null;
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
    },
    addColumnMedication() {
      this.medication.push({ ...this.optionsMedication.text });
    },
    removeColumnMedication(index) {
      this.medication.splice(index, 1);
    },
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
        coefficient: null,
        number_account: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        medication: this.medication,
        patient: this.$route.params.id,
        consultation: this.form.consultation,
      };
      return data;
    },
    setForm(item) {
      (this.medication = item.medication),
        // Données envoyées lors de la modification
        (this.form.id = item.id);
      this.form.code = item.code;
      this.form.createdAt = item.createdAt;
      this.form.consultation = item.consultation["id"];
      this.itemsConsultation.push(item.consultation);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.unique")
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.price.required")
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.form.quote_external.$dirty) return errors;

      !this.$v.form.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.prescription.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: {},
};
</script>
