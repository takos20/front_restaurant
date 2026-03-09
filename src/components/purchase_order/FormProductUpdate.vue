<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="780px"
    max-height="880px"
  >
    <v-card>
      <v-card-title> </v-card-title>
      <v-divider class="mx-4"></v-divider>

      <v-form @submit.prevent="saveDetails" style="margin-top: -5px">
        <v-col cols="12" sm="4" class="mb-0 py-0">
          <v-autocomplete
            v-model="form.product"
            :items="itemsProduct"
            :loading="isLoading"
            :search-input.sync="search"
            color="primary"
            item-text="name"
            item-value="id"
            return-object
            :label="
              $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
            "
            prepend-inner-icon="mdi-rename-box"
            class="font-weight-bold"
            outlined
            dense
            clearable
          ></v-autocomplete>
        </v-col>
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.product_code"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                  "
                  prepend-inner-icon="mdi-code-array"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0"> </v-col
              ><v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.product_name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  prepend-inner-icon="mdi-rename-box"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.quantity"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.quantity.title')
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
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.total_amount.title')
                  "
                  prepend-inner-icon="mdi-credit-card-plus"
                  class="font-weight-bold"
                  outlined
                  :value="get_total_amounts"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
            <v-card-actions style="margin-bottom: -25px">
              <v-spacer></v-spacer>
              <v-btn @click="dialog.show = false">
                {{ $vuetify.lang.t("$vuetify.btn.close") }}
              </v-btn>
              <v-btn color="primary" :loading="loading" dark type="submit">
                {{ $vuetify.lang.t(messages.submit) }}
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          product: null,
          total_amount: null,
          quantity: null,
          product_name: null,
          product_code: null,
          arrival_price: null,
        };
      },
    },
  },
  data: () => ({
    search: null,
    isLoadingDepot: false,
    isLoading: false,
    itemsProduct: [],
    urlProduct: "product",
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
    urlItems: "supplies",
  }),
  created() {
    //this.setItemRoles();
  },
  methods: {
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        product_name: this.form.product_name,
        total_amount: this.get_total_amounts,
        arrival_date: this.form.arrival_date,
        quantity: this.form.quantity,
        product_code: this.form.product_code,
        arrival_price: this.form.arrival_price,
        supply_amount: this.form.supply_amount,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.quantity = item.quantity;
      this.form.product_name = item.product_name;
      this.form.product_code = item.product_code;
      this.form.id = item.id;
      this.form.arrival_price = item.arrival_price;
      this.form.total_amount = this.get_total_amounts;
      this.form.product = item.product["id"];
      this.itemsProduct.push(item.product);
      console.log(this.form.product);
    },
  },
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
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  computed: {
    get_total_amounts() {
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
  components: {},
};
</script>
