<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
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
                <v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.cash_origin"
                    :items="itemsCash_origin"
                    :loading="isLoadingCash_origin"
                    :search-input.sync="searchCash_origin"
                    @blur="$v.form.cash_origin.$touch()"
                    @input="$v.form.cash_origin.$touch()"
                    :error-messages="cash_originErrors"
                    return-object
                    color="primary"
                    item-text="code"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.cash_origin.title'
                      )
                    "
                    prepend-inner-icon="mdi-arrow-collapse-left mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.code }} - {{ data.item.user.username }} -
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash.cols.type_cash." + data.item.type_cash
                        )
                      }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.code }} - {{ data.item.user.username }} -
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash.cols.type_cash." + data.item.type_cash
                        )
                      }}
                    </template>
                    <template #label>
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash_movement.cols.cash_origin.title"
                        )
                      }}<span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </v-col>
                <!-- <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-select
                    v-model="form.type_cash_movement"
                    color="primary"
                    :items="optionType_cash_movement.type_cash_movement"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.type_cash_movement.title'
                      )
                    "
                    dense
                    @blur="$v.form.type_cash_movement.$touch()"
                    @input="$v.form.type_cash_movement.$touch()"
                    :error-messages="type_cash_movementErrors"
                    prepend-inner-icon="mdi-account-supervisor-circle"
                    outlined
                    class="font-weight-bold"
                  ></v-select>
                </v-col> -->
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.cash_destination"
                    :items="itemsCash_destination"
                    :loading="isLoadingCash_destination"
                    :search-input.sync="searchCash_destination"
                    @blur="$v.form.cash_destination.$touch()"
                    @input="$v.form.cash_destination.$touch()"
                    :error-messages="cash_destinationErrors"
                    color="primary"
                    return-object
                    item-text="code"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.cash_destination.title'
                      )
                    "
                    prepend-inner-icon="mdi-arrow-collapse-right mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.code }} - {{ data.item.user.username }} -
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash.cols.type_cash." + data.item.type_cash
                        )
                      }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.code }} - {{ data.item.user.username }} -
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash.cols.type_cash." + data.item.type_cash
                        )
                      }}
                    </template>
                    <template #label>
                      {{
                        $vuetify.lang.t(
                          "$vuetify.cash_movement.cols.cash_destination.title"
                        )
                      }}<span class="red--text"><strong>* </strong></span>
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model.number="form.amount_movement"
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
                    readonly
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

                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.physical_amount"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.physical_amount.title'
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
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    :value="difference"
                    color="primary"
                    readonly
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.difference.title'
                      )
                    "
                    prepend-inner-icon="mdi-text-shadow mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
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
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-text
                class="mt-3"
                style="background-color: #ffeaea; border-radius: 4px"
                v-if="this.checkCash() === 'same_cash'"
              >
                <div class="d-flex align-center py-2 px-3">
                  <v-icon color="red" class="mr-2" size="24">mdi-alert</v-icon>
                  <h3 class="red--text font-weight-bold mb-0">
                    {{ $vuetify.lang.t("$vuetify.cash_movement.same_cash") }}
                  </h3>
                </div>
              </v-card-text>
              <v-card-text
                class="mt-3"
                style="background-color: #ffeaea; border-radius: 4px"
                v-if="this.checkCash() === 'counter_bank'"
              >
                <div class="d-flex align-center py-2 px-3">
                  <v-icon color="red" class="mr-2" size="24">mdi-alert</v-icon>
                  <h3 class="red--text font-weight-bold mb-0">
                    {{ $vuetify.lang.t("$vuetify.cash_movement.counter_bank") }}
                  </h3>
                </div>
              </v-card-text>
              <v-card-text
                class="mt-3"
                style="background-color: #ffeaea; border-radius: 4px"
                v-if="this.checkCash() === 'bank_counter'"
              >
                <div class="d-flex align-center py-2 px-3">
                  <v-icon color="red" class="mr-2" size="24">mdi-alert</v-icon>
                  <h3 class="red--text font-weight-bold mb-0">
                    {{ $vuetify.lang.t("$vuetify.cash_movement.bank_counter") }}
                  </h3>
                </div>
              </v-card-text>
              <v-card-text
                class="mt-3"
                style="background-color: #ffeaea; border-radius: 4px"
                v-if="this.form.amount_movement === 0"
              >
                <div class="d-flex align-center py-2 px-3">
                  <v-icon color="red" class="mr-2" size="24">mdi-alert</v-icon>
                  <h3 class="red--text font-weight-bold mb-0">
                    {{ $vuetify.lang.t("$vuetify.cash_movement.bank_counter") }}
                  </h3>
                </div>
              </v-card-text>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              type="submit"
              :disabled="
                this.form.amount_movement === null ||
                this.form.amount_movement === 0 ||
                ['same_cash', 'counter_bank', 'bank_counter'].includes(
                  checkCash()
                )
              "
            >
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
          cash_origin: null,
          difference: null,
          physical_amount: null,
          cash_destination: null,
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
    optionType_cash_movement: {
      type_cash_movement: [],
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItemsCash_origin: "cashs/all",
    itemsCash_origin: [],
    isLoadingCash_origin: false,
    searchCash_origin: null,
    urlItemsCash_destination: "cashs/all",
    itemsCash_destination: [],
    isLoadingCash_destination: false,
    searchCash_destination: null,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "cash_movements",
  }),
  watch: {
    "form.cash_origin"(val) {
      this.form.amount_movement = val ? val["balance"] : null;
    },
    searchExpenses_nature(value) {
      if (value === null) return;
      const params = { code: value };
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
    searchCash_destination(value) {
      if (value === null) return;
      const params = { code: value, is_transfer: false };
      let self = this;
      this.isLoadingCash_destination = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsCash_destination,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsCash_destination = response.data.content;
        })
        .finally(() => (this.isLoadingCash_destination = false));
    },
    searchCash_origin(value) {
      if (value === null) return;
      const params = { code: value, is_transfer: false };
      let self = this;
      this.isLoadingCash_origin = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsCash_origin,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsCash_origin = response.data.content;
        })
        .finally(() => (this.isLoadingCash_origin = false));
    },
  },

  created() {},
  validations() {
    let validators = {
      form: {
        amount_movement: {
          required,
        },
        cash_origin: {
          required,
        },
        cash_destination: {
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
        amount_movement: this.form.amount_movement,
        type_cash_movement: this.form.type_cash_movement,
        difference: this.difference,
        physical_amount:
          this.form.physical_amount == null ? 0 : this.form.physical_amount,
        cash_origin: this.form.cash_origin["id"],
        cash_destination: this.form.cash_destination["id"],
        type: "TRANSFER",
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
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            // let blob = new Blob([response.data], { type: response.data.type });
            // // let fileName = "factures";
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
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
      this.itemsCash_destination = [];
      this.itemsCash_origin = [];
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
      this.form.difference = item.difference;
      this.form.type_cash_movement = item.type_cash_movement;
      this.form.amount_movement = item.amount_movement;
      this.form.cash_origin = item.cash_origin;
      this.itemsCash_origin.push(item.cash_origin);
      this.form.cash_destination = item.cash_destination;
      this.itemsCash_destination.push(item.cash_destination);
      this.form.physical_amount = item.physical_amount;
      // this.form["oldname"] = item.name;
      this.form.motive = item.motive;
      // this.checkCash();
    },
    checkCash() {
      let result = "";
      // console.log(parseInt(this.form.cash_destination) == parseInt(this.form.cash_origin))
      if (
        this.form.cash_origin !== null &&
        this.form.cash_destination !== null
      ) {
        //   console.log(this.form.cash_origin.type_cash === 'CASH_COUNTERS')
        // console.log(this.form.cash_destination['type_cash'])
        // console.log(this.form.cash_origin.type_cash === 'CASH_COUNTERS' && this.form.cash_origin.type_cash ==='CASH_BANK')

        if (this.form.cash_destination.id === this.form.cash_origin.id) {
          result = "same_cash";
        }
        if (
          this.form.cash_origin.type_cash === "CASH_COUNTERS" &&
          this.form.cash_destination.type_cash === "CASH_BANK"
        ) {
          result = "counter_bank";
        }
        if (
          this.form.cash_destination.type_cash === "CASH_COUNTERS" &&
          this.form.cash_origin.type_cash === "CASH_BANK"
        ) {
          result = "bank_counter";
        }
      }
      return result;
    },
  },
  computed: {
    difference() {
      return this.form.amount_movement - this.form.physical_amount;
    },
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
    type_cash_movementErrors() {
      let errors = [];
      if (!this.$v.form.type_cash_movement.$dirty) return errors;
      !this.$v.form.type_cash_movement.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.type_cash_movement.required"
          )
        );
      return errors;
    },

    cash_originErrors() {
      let errors = [];
      if (!this.$v.form.cash_origin.$dirty) return errors;
      !this.$v.form.cash_origin.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.cash_movement.cols.cash_origin.required"
          )
        );
      return errors;
    },
    cash_destinationErrors() {
      let errors = [];
      if (!this.$v.form.cash_destination.$dirty) return errors;
      !this.$v.form.cash_destination.required &&
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
