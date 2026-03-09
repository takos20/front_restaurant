<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save_print_bills()">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash_movement.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    :value="$auth.user().username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash_movement.cols.name.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.motive"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.motive.title'
                      )
                    "
                    prepend-inner-icon="mdi-text-shadow mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
                    :readonly="this.form.id"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.expenses_nature"
                    :items="itemsExpenses_nature"
                    :loading="isLoadingExpenses_nature"
                    :search-input.sync="searchExpenses_nature"
                    color="primary"
                    item-text="name"
                    :readonly="this.form.id"
                    return-object
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.expenses_nature.title'
                      )
                    "
                    prepend-inner-icon="mdi-lead-pencil mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    :value="
                      get_movement_type === 'EXIT'
                        ? 'Sortie'
                        : get_movement_type === 'ENTRY'
                        ? 'Entrée'
                        : ''
                    "
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.amount_movement"
                    color="primary"
                    @blur="$v.form.amount_movement.$touch()"
                    @input="$v.form.amount_movement.$touch()"
                    :error-messages="amount_movementErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.amount_movement.title'
                      )
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    :readonly="this.form.id"
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                    dense
                    suffix="FCFA"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
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
          code: null,
          type: null,
          motive: null,
          expenses_nature: null,
          amount_movement: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    dialogFormPdf: {
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
    itemsExpenses_nature: [],
    isLoadingExpenses_nature: false,
    searchExpenses_nature: null,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "cash_movements",
    urlItemsExpenses_nature: "expenses_nature/all",
  }),
  watch: {
    searchExpenses_nature(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingExpenses_nature = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsExpenses_nature,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsExpenses_nature = response.data.content;
        })
        .finally(() => (this.isLoadingExpenses_nature = false));
    },
  },

  created() {},
  validations() {
    let validators = {
      form: {
        amount_movement: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    close() {
      (this.dialog.show = false), (this.form.id = null);
      this.form.code = null;
      this.form.cash = null;
      this.form.type = null;
      this.form.amount_movement = null;
      this.form.name = null;
      this.form.motive = null;
      this.form.expenses_nature = null;
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        cash: this.$route.params.id,
        amount_movement: this.form.amount_movement,
        type: this.get_movement_type,
        expenses_nature: this.form.expenses_nature["id"],
        motive: this.form.motive,
      };
      return data;
    },

    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            let blob = new Blob([response.data], { type: response.data.type });
            const blobUrl = URL.createObjectURL(blob);

            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            iframe.src = blobUrl;

            iframe.onload = () => {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();

              // Détecter la fermeture du dialogue d'impression
              iframe.contentWindow.onafterprint = () => {
                document.body.removeChild(iframe);
                URL.revokeObjectURL(blobUrl);
              };

              // Fallback : nettoyer après 30 secondes
              setTimeout(() => {
                if (document.body.contains(iframe)) {
                  document.body.removeChild(iframe);
                  URL.revokeObjectURL(blobUrl);
                }
              }, 300000000);
            };

            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            //let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            //const objectUrl = URL.createObjectURL(blob);
            //this.editPdf(objectUrl);
            // FileSaver.saveAs(blob, fileName);
            // const dataUrl = window.URL.createObjectURL(blob);
            //
            // // Open the window
            // const pdfWindow = window.open(dataUrl);
            //
            // // Call print on it
            // pdfWindow.print();
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
      if (this.form.id) return;
      let self = this;
      this.itemsExpenses_nature = [];
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

    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash = item.cash;
      this.form.type = item.type;
      this.form.amount_movement = item.amount_movement;
      this.form.name = item.name;
      this.form["oldname"] = item.name;
      this.form.motive = item.motive;
      this.form.expenses_nature = item.expenses_nature;
      this.itemsExpenses_nature.push(item.expenses_nature);
    },
  },
  computed: {
    get_movement_type() {
      let type_movement = "";
      type_movement =
        this.form.expenses_nature === null
          ? ""
          : this.form.expenses_nature?.type;
      return type_movement;
    },
    // Gestion des erreurs du formulaire
    amount_movementErrors() {
      let errors = [];
      if (!this.$v.form.amount_movement.$dirty) return errors;
      !this.$v.form.amount_movement.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.amount_movement.required"
          )
        );
      return errors;
    },
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;

      !this.$v.form.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );

      !this.$v.form.username.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.minLength",
            this.$v.form.username.$params.minLength.min
          )
        );

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.maxLength",
            this.$v.form.username.$params.maxLength.max
          )
        );
      !this.$v.form.username.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.unique")
        );
      return errors;
    },
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
    rePasswordErrors() {
      let errors = [];
      if (!this.$v.form.re_password.$dirty) return errors;

      !this.$v.form.re_password.sameAsPassword &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
        );
      return errors;
    },

    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.code_user.$dirty) return errors;
      !this.$v.form.code_user.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.code_user.required")
        );

      !this.$v.form.code_user.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.code_user.maxLength",
            this.$v.form.code_user.$params.maxLength.max
          )
        );
      return errors;
    },
    lastnameErrors() {
      let errors = [];
      if (!this.$v.form.position_held.$dirty) return errors;
      !this.$v.form.position_held.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.position_held.required")
        );

      !this.$v.form.position_held.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.position_held.maxLength",
            this.$v.form.position_held.$params.maxLength.max
          )
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.required"));

      !this.$v.form.email.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.unique"));
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.other_phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
  },
  components: {
    FormPdf,
  },
};
</script>
