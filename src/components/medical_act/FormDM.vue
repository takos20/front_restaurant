<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.medical_areas.title") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.code"
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
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.name.title')
                  "
                  @blur="$v.formData.name.$touch()"
                  @input="$v.formData.name.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.number_account"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.number_account.title'
                    )
                  "
                  prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row wrap>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.normal"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.normal.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.covered"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.covered.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.employee"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.employee.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  v-model="formData.indigent"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.indigent.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -35px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t("$vuetify.btn.save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import { existNameAreas } from "../../helpers/Validator";

export default {
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
      normal: null,
      covered: null,
      employee: null,
      indigent: null,
      coefficient: null,
      number_account: null,
    },
    is_active: true,
    loading: false,
    reset: false,
    errors: {},
    urlItems: "medical_areas",
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { username: value, role: "RESPONSIBLE" };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlUsers,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsUsers = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {},
  validations() {
    let validators = {
      formData: {
        name: {
          required,
          maxLength: maxLength(100),
          unique: existNameAreas,
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
        normal: this.formData.normal,
        indigent: this.formData.indigent,
        covered: this.formData.covered,
        employee: this.formData.employee,
        coefficient: this.formData.coefficient,
        number_account: this.formData.number_account,
        name: this.formData.name,
        is_active: this.is_active,
      };
      return data;
    },
    getRoute() {
      if (this.formData.id) {
        return this.urlItems + "/" + this.formData.id;
      } else {
        return this.urlItems;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.formData.id ? "PUT" : "POST";
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire

    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.medical_areas.new.success"),
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
    setFormErrors(errors) {
      let self = this;
      this._.each(errors, (_error, key) => {
        if (self._.hasIn(self.errors, key)) {
          self.errors[key] = _error;
          //console.log("back error", errors[key]);
        }
      });
    },
    resetDataForm() {
      if (this.formData.id) return;
      let self = this;
      this.$v.formData.$reset();
      this._.each(this.formData, (field, k) => {
        if (typeof self.formData[k] === "object") {
          self._.each(self.formData[k], (subField, i) => {
            if (typeof self.formData[k][i] === "boolean") {
              self.formData[k][i] = false;
            } else {
              self.formData[k][i] = null;
            }
          });
        } else {
          if (typeof self.formData[k] === "boolean") {
            self.formData[k] = false;
          } else {
            self.formData[k] = null;
          }
        }
      });
    },
  },

  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.formData.name.$dirty) return errors;
      !this.$v.formData.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.name.required")
        );
      !this.$v.formData.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.name.unique")
        );
      return errors;
    },
    number_accountErrors() {
      let errors = [];
      if (!this.$v.formData.number_account.$dirty) return errors;
      !this.$v.formData.number_account.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_areas.cols.number_account.required"
          )
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.formData.quote_external.$dirty) return errors;

      !this.$v.formData.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_areas.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.formData.phone.$dirty) return errors;
      !this.$v.foformDatarm.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.phone.invalid")
        );
      return errors;
    },
  },
};
</script>
