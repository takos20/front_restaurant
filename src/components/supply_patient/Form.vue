<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
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
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.patient"
                    :items="items_patient"
                    :loading="is_loading_patient"
                    :search-input.sync="search_patient"
                    color="primary"
                    return-object
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.patient.title')"
                    prepend-inner-icon="mdi-arrow-collapse-right mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.patient_account"
                    :items="items_patient_account"
                    :loading="is_loading_patient_account"
                    :search-input.sync="search_patient_account"
                    @blur="$v.form.patient_account.$touch()"
                    @input="$v.form.patient_account.$touch()"
                    :error-messages="patient_accountErrors"
                    return-object
                    color="primary"
                    item-text="code"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.patientaccount.title')"
                    prepend-inner-icon="mdi-arrow-collapse-left mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.type_operation"
                    color="primary"
                    :items="optionType_cash_movement.type_cash_movement"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.type_cash_movement.title'
                      )
                    "
                    dense
                    @blur="$v.form.type_operation.$touch()"
                    @input="$v.form.type_operation.$touch()"
                    :error-messages="type_operationErrors"
                    prepend-inner-icon="mdi-account-supervisor-circle"
                    outlined
                    class="font-weight-bold"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.balance"
                    color="primary"
                    @blur="$v.form.balance.$touch()"
                    @input="$v.form.balance.$touch()"
                    :error-messages="balanceErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.amount_movement.title'
                      )
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    type="number"
                    min="0"
                    :rules="[numberRule]"
                    dense
                    suffix="FCFA"
                  >
                    <template #label>
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash_movement.cols.amount_movement.title"
                        )
                      }}<span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.comment"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.motive.title'
                      )
                    "
                    prepend-inner-icon="mdi-text-shadow mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
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
            <v-btn @click="close()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" type="submit">
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
          patient: null,
          type_operation: null,
          comment: null,
          balance: null,
          patient_account: null,
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
    optionType_cash_movement: {
      type_cash_movement: [],
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems_patient_account: "patient_accounts/all",
    items_patient_account: [],
    is_loading_patient_account: false,
    search_patient_account: null,
    urlItems_patient: "patients/all",
    items_patient: [],
    is_loading_patient: false,
    search_patient: null,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "details_patient_accounts",
  }),
  watch: {
    search_patient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.is_loading_patient = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems_patient,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.items_patient = response.data.content;
        })
        .finally(() => (this.is_loading_patient = false));
    },
    search_patient_account(value) {
      if (value === null) return;
      const params = {
        code: value,
        patient: this.form?.patient["id"],
        type_account: "PREPAID",
      };
      let self = this;
      this.is_loading_patient_account = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems_patient_account,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.items_patient_account = response.data.content;
        })
        .finally(() => (this.is_loading_patient_account = false));
    },
  },

  created() {
    this.getOptionsType_cash_movement();
  },
  validations() {
    let validators = {
      form: {
        balance: {
          required,
        },
        type_operation: {
          required,
        },
        patient_account: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsType_cash_movement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_cash_movement,
        (type_cash_movement) => {
          self.optionType_cash_movement.type_cash_movement.push({
            text: self.$vuetify.lang.t(type_cash_movement.text),
            value: type_cash_movement.value,
          });
        }
      );
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        balance: this.form.balance,
        type_operation: this.form.type_operation,
        patient_account: this.form.patient_account["id"],
        comment: this.form.comment,
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
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            // let fileName = "factures";
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
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
    close() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    resetDataForm() {
      if (this.form.id) return;
      let self = this;
      this.form.cash_origin = null;
      this.form.cash_destination = null;
      this.items_patient = [];
      this.items_patient_account = [];
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
      this.form.type_operation = item.type_operation;
      this.form.balance = item.balance;
      this.form.patient_account = item.patient_account;
      this.items_patient_account.push(item.patient_account);
      // this.form["oldname"] = item.name;
      this.form.comment = item.comment;
      // this.checkCash();
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
    balanceErrors() {
      let errors = [];
      if (!this.$v.form.balance.$dirty) return errors;
      !this.$v.form.balance.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.amount_movement.required"
          )
        );
      return errors;
    },
    type_operationErrors() {
      let errors = [];
      if (!this.$v.form.type_operation.$dirty) return errors;
      !this.$v.form.type_operation.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.type_cash_movement.required"
          )
        );
      return errors;
    },

    patientErrors() {
      let errors = [];
      if (!this.$v.form.patient.$dirty) return errors;
      !this.$v.form.patient.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.cash_origin.required"
          )
        );
      return errors;
    },
    patient_accountErrors() {
      let errors = [];
      if (!this.$v.form.patient_account.$dirty) return errors;
      !this.$v.form.patient_account.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.cash_destination.required"
          )
        );
      return errors;
    },
  },
  components: {
    FormPdf,
  },
};
</script>
