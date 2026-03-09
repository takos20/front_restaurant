<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="780px"
    max-height="880px"
  >
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-stepper v-model="e1" alt-labels dense>
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" color="primary">
            {{ $vuetify.lang.t("$vuetify.supplies.title") }}
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2" color="primary">
            {{ $vuetify.lang.t("$vuetify.product.title") }}
          </v-stepper-step>
        </v-stepper-header>
        <v-form @submit.prevent="save" style="margin-top: -15px">
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
                          $vuetify.lang.t('$vuetify.supplies.cols.code.title')
                        "
                        prepend-inner-icon="mdi-code-array"
                        class="font-weight-bold"
                        outlined
                        dense
                        filled
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
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
                            v-model="form.arrival_date"
                            color="primary"
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.supplies.cols.arrival_date.title'
                              )
                            "
                            prepend-inner-icon="mdi-clock-start"
                            class="font-weight-bold"
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            dense
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="form.arrival_date"
                          color="primary"
                          @input="menu3 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.storage_depot"
                        :items="itemsDepot"
                        :loading="isLoadingDepot"
                        :search-input.sync="searchDepot"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.storage_depot.title'
                          )
                        "
                        prepend-inner-icon="mdi-archive"
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
                          $vuetify.lang.t('$vuetify.supplies.cols.name.title')
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
                        v-model="form.supply_amount"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.supply_amount.title'
                          )
                        "
                        prepend-inner-icon="mdi-credit-card"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.reference_no"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.reference_no.title'
                          )
                        "
                        prepend-inner-icon="mdi-scatter-plot"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.additional_info"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.additional_info.title'
                          )
                        "
                        @input="$v.form.additional_info.$touch()"
                        prepend-inner-icon="mdi-script-text"
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
                <v-btn @click="dialog.show = false" class="mb-5">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn
                  color="primary"
                  @click="goToNextPage"
                  class="mb-5"
                  :disabled="
                    this.form.name == null ||
                    this.form.storage_depot == null ||
                    this.form.arrival_date == null ||
                    this.form.supply_amount == null ||
                    this.form.reference_no == null ||
                    this.form.additional_info == null
                  "
                  dark
                >
                  {{ $vuetify.lang.t("$vuetify.btn.next") }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card-text>
                <v-container>
                  <v-row wrap>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.product_code"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.product_code.title'
                          )
                        "
                        prepend-inner-icon="mdi-code-array"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col
                    ><v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
                    <v-col cols="12" sm="4" class="mb-0 py-0">
                      <v-autocomplete
                        v-model="form.product_name"
                        :items="itemsProduct"
                        :loading="isLoading"
                        :search-input.sync="search"
                        color="primary"
                        item-text="name"
                        item-value="id"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.product_name.title'
                          )
                        "
                        prepend-inner-icon="mdi-rename-box"
                        class="font-weight-bold"
                        outlined
                        dense
                        clearable
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="2" class="mb-0 py-0">
                      <v-btn
                        class="mx-2"
                        dark
                        dense
                        @click="createD()"
                        color="primary"
                        max-width="2px"
                      >
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.quantity"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.quantity.title'
                          )
                        "
                        prepend-inner-icon="mdi-numeric-0-box"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="form.arrival_price"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.arrival_price.title'
                          )
                        "
                        prepend-inner-icon="mdi-credit-card"
                        class="font-weight-bold"
                        outlined
                        dense
                      ></v-text-field> </v-col
                    ><v-col cols="12" sm="6" class="mb-0 py-0">
                      <v-text-field
                        v-model="get_total_amount"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.supplies.cols.total_amount.title'
                          )
                        "
                        prepend-inner-icon="mdi-credit-card-plus"
                        class="font-weight-bold"
                        outlined
                        :value="get_total_amount"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
              <v-card-actions style="margin-bottom: -5px">
                <v-spacer></v-spacer>
                <v-btn @click="dialog.show = false">
                  {{ $vuetify.lang.t("$vuetify.btn.close") }}
                </v-btn>
                <v-btn @click="backTo">
                  {{ $vuetify.lang.t("$vuetify.btn.previous") }}
                </v-btn>
                <v-btn color="primary" :loading="loading" dark type="submit">
                  {{ $vuetify.lang.t(messages.submit) }}
                </v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-form>
      </v-stepper>
    </v-card>
    <form-product :dialog="dialogForm"></form-product>
  </v-dialog>
</template>

<script>
import FormProduct from "./FormProduct";

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
          name: null,
          total_amount: null,
          quantity: null,
          product_name: null,
          product_code: null,
          arrival_price: null,
          arrival_date: null,
          reference_no: null,
          additional_info: null,
          supply_amount: null,
          code: null,
          storage_depot: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
      coefficient: null,
      number_account: null,
      quote_internal: null,
      quote_external: null,
    },
    e1: 1,
    isLoadingDepot: false,
    isLoading: false,
    search: null,
    searchDepot: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    // formR: {
    //   id: null,
    //   name: null
    // },
    itemsDepot: [],
    itemsProduct: [],
    urlDepot: "storage_depots",
    urlProduct: "product",
    urlItems: "supplies",
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchDepot(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDepot = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot = response.data.content;
        })
        .finally(() => (this.isLoadingDepot = false));
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
        },
      },
    };
    return validators;
  },
  methods: {
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
    goToNextPage() {
      this.e1 = 2;
    },

    backTo() {
      this.e1 = 1;
    },

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        product_name: this.form.product_name,
        total_amount: this.get_total_amount,
        arrival_date: this.form.arrival_date,
        quantity: this.form.quantity,
        product_code: this.form.product_code,
        reference_no: this.form.reference_no,
        name: this.form.name,
        arrival_price: this.form.arrival_price,
        supply_amount: this.form.supply_amount,
        additional_info: this.form.additional_info,
        storage_depot: this.form.storage_depot,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.product_name = item.product_name["id"];
      this.itemsProduct.push(item.product_name);
      this.form.product_code = item.product_code;
      this.form.id = item.id;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.reference_no = item.reference_no;
      this.form.arrival_price = item.arrival_price;
      this.form.arrival_date = item.arrival_date;
      this.form.total_amount = item.total_amount;
      this.form.supply_amount = item.supply_amount;
      this.form.additional_info = item.additional_info;
      this.form.code = item.code;
      this.form.storage_depot = item.storage_depot["id"];
      this.itemsDepot.push(item.storage_depot);
    },
  },
  computed: {
    get_total_amount() {
      if (this.form.quantity) {
        return this.form.quantity * this.form.arrival_price;
      } else if (this.form.total_amount != null) {
        return this.form.total_amount;
      } else {
        return 0;
      }
    },
    // get_storage_depot() {
    //   if (this.form.arrival_date) {
    //     const today = new Date();
    //     const date_year = today.getFullYear();
    //     return (
    //       date_year - moment(String(this.form.arrival_date)).format("YYYY")
    //     );
    //   } else {
    //     return 0;
    //   }
    // },
    // Gestion des erreurs du formulaire

    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    product_codeErrors() {
      let errors = [];
      if (!this.$v.form.product_code.$dirty) return errors;

      // !this.$v.form.product_code.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.required")
      //   );

      !this.$v.form.product_code.product_code &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.invalid")
        );

      !this.$v.form.product_code.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.unique")
        );
      return errors;
    },
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
        );
      return errors;
    },
    arrival_dateErrors() {
      let errors = [];
      if (!this.$v.form.arrival_date.$dirty) return errors;
      !this.$v.form.arrival_date.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.birthday.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.total_amount.required")
        );
      return errors;
    },
  },
  components: {
    FormProduct,
  },
};
</script>
