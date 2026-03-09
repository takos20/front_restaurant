<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="primary">
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" color="primary">
          </v-stepper-step>
        </v-stepper-header>
        <v-form @submit.prevent="save" style="margin-top: -30px">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.code"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.code.title')
                        "
                        prepend-inner-icon="mdi-code-array"
                        class="font-weight-bold"
                        outlined
                        dense
                        readonly
                        filled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.barcode"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.barcode.title')
                        "
                        prepend-inner-icon="mdi-barcode"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.category"
                        :items="itemsCategory"
                        :loading="isLoading"
                        :search-input.sync="search"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.product.cols.category.title'
                          )
                        "
                        prepend-inner-icon="mdi-alpha-c-circle-outline"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.shape"
                        :items="itemsShape"
                        :loading="isLoadingShape"
                        :search-input.sync="searchShape"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.shape.title')
                        "
                        prepend-inner-icon="mdi-shape"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.name"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.name.title')
                        "
                        @blur="$v.form.name.$touch()"
                        @input="$v.form.name.$touch()"
                        :error-messages="nameErrors"
                        prepend-inner-icon="mdi-rename-box"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.conditioning"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.product.cols.conditioning.title'
                          )
                        "
                        prepend-inner-icon="mdi-format-list-bulleted-type"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.dosage"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.dosage.title')
                        "
                        prepend-inner-icon="mdi-nuke"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -25px">
                <v-spacer></v-spacer>
                <v-btn @click="dialog.show = false" class="mb-5" dense>
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPage"
                  class="mb-5"
                  dark
                  dense
                >
                  {{ $vuetify.lang.t("$vuetify.btn.next") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.dci1"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.dci1.title')
                        "
                        prepend-inner-icon="mdi-atom"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.dci2"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.dci2.title')
                        "
                        prepend-inner-icon="mdi-atom"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      class="mb-0 py-0"
                      v-if="this.form.category !== undefined"
                    >
                      <v-text-field
                        v-model="form.public_price"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.product.cols.public_price.title'
                          )
                        "
                        prepend-inner-icon="mdi-credit-card"
                        class="font-weight-bold"
                        outlined
                        dense
                        :disabled="this.form.category.billable === 'NO'"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.purchase_price"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.product.cols.purchase_price.title'
                          )
                        "
                        prepend-inner-icon="mdi-credit-card-plus"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <!--<v-col cols="12" sm="6" class="mb-0 py-0">-->
                    <!--<v-text-field-->
                    <!--v-model="form.quantity"-->
                    <!--color="primary"-->
                    <!--:label="-->
                    <!--$vuetify.lang.t(-->
                    <!--'$vuetify.product.cols.quantity.title'-->
                    <!--)-->
                    <!--"-->
                    <!--prepend-inner-icon="mdi-numeric-0-box"-->
                    <!--class="font-weight-bold"-->
                    <!--outlined-->
                    <!--dense-->
                    <!--&gt;</v-text-field>-->
                    <!--</v-col>-->
                    <!--<v-col cols="12" sm="6" class="mb-0 py-0">-->
                    <!--<v-menu-->
                    <!--v-model="menu"-->
                    <!--color="primary"-->
                    <!--:close-on-content-click="false"-->
                    <!--:nudge-right="40"-->
                    <!--transition="scale-transition"-->
                    <!--offset-y-->
                    <!--min-width="auto"-->
                    <!--dense-->
                    <!--&gt;-->
                    <!--<template v-slot:activator="{ on, attrs }">-->
                    <!--<v-text-field-->
                    <!--v-model="form.expiry_date"-->
                    <!--color="primary"-->
                    <!--:label="-->
                    <!--$vuetify.lang.t(-->
                    <!--'$vuetify.product.cols.expiry_date.title'-->
                    <!--)-->
                    <!--"-->
                    <!--prepend-inner-icon="mdi-clock-start"-->
                    <!--class="font-weight-bold"-->
                    <!--outlined-->
                    <!--v-bind="attrs"-->
                    <!--v-on="on"-->
                    <!--dense-->
                    <!--&gt;</v-text-field>-->
                    <!--</template>-->
                    <!--<v-date-picker-->
                    <!--v-model="form.expiry_date"-->
                    <!--color="primary"-->
                    <!--@input="menu = false"-->
                    <!--&gt;</v-date-picker>-->
                    <!--</v-menu>-->
                    <!--</v-col>-->

                    <v-col
                      cols="12"
                      sm="6"
                      class="mb-0 py-0"
                      v-if="this.form.category !== undefined"
                    >
                      <v-text-field
                        v-model="form.margin"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.margin.title')
                        "
                        prepend-inner-icon="mdi-margin"
                        class="font-weight-bold"
                        outlined
                        dense
                        :disabled="this.form.category.billable === 'NO'"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      class="mb-0 py-0"
                      style="margin-top: -20px"
                    >
                      <v-switch
                        v-model="form.is_active"
                        color="primary"
                        :label="
                          $vuetify.lang.t('$vuetify.product.cols.status.title2')
                        "
                        outlined
                        dense
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -5px">
                <v-spacer></v-spacer>
                <v-btn @click="dialog.show = false" dense>
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn @click="backTo" dense>
                  {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                </v-btn>
                <v-btn
                  color="primary"
                  :loading="loading"
                  dark
                  type="submit"
                  dense
                >
                  {{ $vuetify.lang.t("$vuetify.btn.save") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import { existNameproduct } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
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
      dci1: null,
      dci2: null,
      shape: null,
      public_price: null,
      purchase_price: null,
      margin: null,
      dosage: null,
      conditioning: null,
      category: null,
      // quantity: null,
      expiry_date: null,
      barcode: null,
      code: null,
      name: null,
      is_active: false,
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    e1: 1,
    menu: false,
    urlItems: "product",
    isLoading: false,
    isLoadingShape: false,
    urlCategory: "category",
    urlShape: "shape",
    searchShape: null,
    search: null,
    itemsShape: [],
    itemsCategory: [],
  }),
  watch: {
    searchShape(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlShape,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsShape = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlCategory,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCategory = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameproduct,
        },
      },
    };
    return validators;
  },
  methods: {
    goToNextPage() {
      this.e1 = 2;
    },

    backTo() {
      this.e1 = 1;
    },

    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        // expiry_date: this.form.expiry_date,
        // quantity: this.form.quantity,
        shape: this.form.shape,
        purchase_price: this.form.purchase_price,
        public_price: this.form.public_price,
        margin: this.form.margin,
        dci1: this.form.dci1,
        dci2: this.form.dci2,
        dosage: this.form.dosage,
        conditioning: this.form.conditioning,
        barcode: this.form.barcode,
        category: this.form.category,
        name: this.form.name,
        is_active: this.form.is_active ? this.form.is_active : false,
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
              text: self.$vuetify.lang.t("$vuetify.product.new.success"),
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
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.product.cols.name.unique"));
      return errors;
    },
    codeErrors() {
      let errors = [];
      if (!this.$v.form.code.$dirty) return errors;
      !this.$v.form.code.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.code.required")
        );

      !this.$v.form.code.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.product.cols.code.maxLength",
            this.$v.form.code.$params.maxLength.max
          )
        );
      return errors;
    },
  },
  components: {},
};
</script>
