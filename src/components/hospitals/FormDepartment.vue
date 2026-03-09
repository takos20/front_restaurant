<template>
  <v-dialog v-model="dialog.show" persistent max-width="350px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.departments.new.title") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-text-field
            v-model="formData.name"
            color="#0984e3"
            :label="$vuetify.lang.t('$vuetify.departments.cols.name.title')"
            @blur="$v.formData.name.$touch()"
            @input="$v.formData.name.$touch()"
            :error-messages="nameErrors"
            prepend-inner-icon="mdi-text-short mdi-dark mdi-18px"
            class="font-weight-bold"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -30px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="#0984e3" :loading="loading" dark type="submit">
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
import { existName } from "../../helpers/Validator";

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
    },
    loading: false,
    reset: false,
    errors: {},
    urlItems: "departments",
  }),
  created() {},
  validations() {
    let validators = {
      formData: {
        name: {
          required,
          maxLength: maxLength(100),
          unique: existName,
        },
      },
    };
    return validators;
  },
  methods: {
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
    getDataForm() {
      let data = {
        name: this.formData.name,
      };
      return data;
    },
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
              text: self.$vuetify.lang.t("$vuetify.departments.new.success"),
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
  },
  computed: {
    nameErrors() {
      let errors = [];
      if (!this.$v.formData.name.$dirty) return errors;

      !this.$v.formData.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.departments.cols.name.unique")
        );
      return errors;
    },
    // Gestion des erreurs du formulaire
  },
};
</script>
