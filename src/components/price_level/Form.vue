<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.product"
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
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  ></v-autocomplete>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.price_level.cols.status.title')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.price_level.cols.name.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.suppliers"
                    :items="itemsSuppliers"
                    :loading="isLoadingSuppliers"
                    :search-input.sync="searchSuppliers"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.supplies.cols.supplier.title')
                    "
                    prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.quantity_min"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.price_level.cols.quantity_min.title'
                      )
                    "
                    prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.quantity_max"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.price_level.cols.quantity_max.title'
                      )
                    "
                    prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.purchase_price"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.price_level.cols.purchase_price.title'
                      )
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-credit-card-plus mdi-dark mdi-18px"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.public_price"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.price_level.cols.public_price.title'
                      )
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-credit-card-plus mdi-dark mdi-18px"
                    outlined
                    dense
                    type="number"
                    min="0"
                  ></v-text-field>
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
// import { required } from "vuelidate/lib/validators";
// import {mapGetters} from "vuex";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          quantity_min: null,
          quantity_mmax: null,
          public_price: null,
          purchase_price: null,
          product: null,
          suppliers: null,
          name: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    itemsProduct: [],
    search: null,
    urlSuppliers: "suppliers",
    itemsSuppliers: [],
    searchSuppliers: null,
    isLoadingSuppliers: false,
    urlProduct: "products",
    urlItems: "price_level",
    isLoading: false,
  }),
  watch: {
    searchSuppliers(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingSuppliers = true;
      this.$store
        .dispatch("request", {
          url: self.urlSuppliers,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsSuppliers = response.data.content;
        })
        .finally(() => (this.isLoadingSuppliers = false));
    },
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
          self.itemsProduct = response.data.content;
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
        // name: {
        //   required
        // },
        // purchase_price: {
        //   required
        // },
        // public_price: {
        //   required
        // },
        // quantity_min: {
        //   required
        // },
        // quantity_max: {
        //   required
        // }
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        suppliers: this.form.suppliers,
        product: this.form.product,
        purchase_price: this.form.purchase_price,
        public_price: this.form.public_price,
        quantity_min: this.form.quantity_min,
        quantity_max: this.form.quantity_max,
        name: this.form.name,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.name = item.name;
      this.form.purchase_price = item.purchase_price;
      this.form.public_price = item.public_price;
      this.form.quantity_max = item.quantity_max;
      this.form.quantity_min = item.quantity_min;
      this.form["oldName"] = item.name;
      this.form.product = item.product["id"];
      this.itemsProduct.push(item.product);
      this.form.suppliers = item.suppliers["id"];
      this.itemsSuppliers.push(item.suppliers);
      this.is_active = item.is_active;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.price_level.cols.name.required")
        );
      return errors;
    },
    purchase_priceErrors() {
      let errors = [];
      if (!this.$v.form.purchase_price.$dirty) return errors;

      !this.$v.form.purchase_price.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.price_level.cols.purchase_price.required"
          )
        );
      return errors;
    },
    public_priceErrors() {
      let errors = [];
      if (!this.$v.form.public_price.$dirty) return errors;

      !this.$v.form.public_price.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.price_level.cols.public_price.required"
          )
        );
      return errors;
    },
    quantity_minErrors() {
      let errors = [];
      if (!this.$v.form.quantity_min.$dirty) return errors;

      !this.$v.form.quantity_min.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.price_level.cols.quantity_min.required"
          )
        );
      return errors;
    },
    quantity_maxErrors() {
      let errors = [];
      if (!this.$v.form.quantity_max.$dirty) return errors;

      !this.$v.form.quantity_max.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.price_level.cols.quantity_max.required"
          )
        );
      return errors;
    },
    codeErrors() {
      let errors = [];
      if (!this.$v.form.code.$dirty) return errors;
      !this.$v.form.code.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.price_level.cols.code.required")
        );

      !this.$v.form.code.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.price_level.cols.code.maxLength",
            this.$v.form.code.$params.maxLength.max
          )
        );
      return errors;
    },
    // phonerepresentativeErrors() {
    //   let errors = [];
    //   if (!this.$v.form.quantity.$dirty) return errors;
    //   !this.$v.form.quantity.phoneR &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.price_level.cols.phone.invalid")
    //     );
    //   return errors;
    // }
  },
  components: {},
};
</script>
