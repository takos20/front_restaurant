<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messagesProduct.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.product.cols.code.title')"
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.barcode"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.product.cols.barcode.title')
                    "
                    prepend-inner-icon="mdi-barcode mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  style="margin-top: -10px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.product.cols.status.title2')
                    "
                    outlined
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.product.cols.name.title')"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.product.cols.name.title") }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.category"
                    :items="itemsCategory"
                    :loading="isLoading"
                    @blur="$v.form.category.$touch()"
                    @input="$v.form.category.$touch()"
                    :error-messages="categoryErrors"
                    :search-input.sync="search"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.product.cols.category.title')
                    "
                    prepend-inner-icon="mdi-alpha-c-circle-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.product.cols.category.title")
                      }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.shape"
                    :items="itemsShape"
                    :loading="isLoadingShape"
                    :search-input.sync="searchShape"
                    @blur="$v.form.shape.$touch()"
                    @input="$v.form.shape.$touch()"
                    :error-messages="shapeErrors"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.product.cols.shape.title')
                    "
                    prepend-inner-icon="mdi-shape mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.product.cols.shape.title")
                      }}
                    </template>
                  </v-autocomplete>
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
                    @blur="$v.form.conditioning.$touch()"
                    @input="$v.form.conditioning.$touch()"
                    :error-messages="conditioningErrors"
                    prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.product.cols.conditioning.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.dosage"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.product.cols.dosage.title')
                    "
                    prepend-inner-icon="mdi-nuke mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.dci1"
                    :items="itemsDCI"
                    :loading="isLoadingDCI"
                    :search-input.sync="searchDCI"
                    @blur="$v.form.dci1.$touch()"
                    @input="$v.form.dci1.$touch()"
                    :error-messages="dci1Errors"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.product.cols.dci1.title')"
                    prepend-inner-icon="mdi-atom mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.product.cols.dci1.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                                 <v-autocomplete
                                   v-model="form.dci2"
                                   :items="itemsDCI2"
                                   :loading="isLoadingDCI2"
                                   :search-input.sync="searchDCI2"
                                   color="primary"
                                   item-text="name"
                                   item-value="id"
                                   :label="$vuetify.lang.t('$vuetify.product.cols.dci2.title')"
                                   prepend-inner-icon="mdi-atom-variant mdi-dark mdi-18px"
                                   class="font-weight-bold"
                                   outlined
                                   dense
                                   clearable
                                 ></v-autocomplete>
                               </v-col> -->

                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  v-if="this.form.category"
                >
                  <v-text-field
                    v-model="form.public_price"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.product.cols.public_price.title'
                      )
                    "
                    prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                    type="number"
                    :rules="[numberRule]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.purchase_price"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.product.cols.purchase_price.title'
                      )
                    "
                    prepend-inner-icon="mdi-credit-card-plus mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    suffix="FCFA"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-menu
                    v-model="menu"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    dense
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.expiry_date"
                        color="primary"
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.product.cols.expiry_date.title'
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
                      v-model="form.expiry_date"
                      color="primary"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.order_threshold"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.product.cols.order_threshold.title'
                      )
                    "
                    prepend-inner-icon="mdi-arrow-collapse-right mdi-dark mdi-18px"
                    class="font-weight-bold"
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
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import { existNameproduct } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          dci1: null,
          shape: null,
          public_price: null,
          purchase_price: null,
          order_threshold: null,
          dosage: null,
          conditioning: null,
          category: null,
          // quantity: null,
          expiry_date: null,
          barcode: null,
          code: null,
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
    numberRule: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    menu: false,
    urlItems: "products",

    isLoadingShape: false,
    isLoadingDCI: false,
    isLoadingDCI2: false,
    urlCategory: "categories",
    itemsCategory: [],
    search: null,
    isLoading: false,
    urlShape: "shapes",
    urlDCI: "dcis",
    searchDCI: null,
    searchDCI2: null,
    searchShape: null,
    itemsDCI: [],
    itemsDCI2: [],
    itemsShape: [],
  }),
  watch: {
    searchShape(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingShape = true;
      this.$store
        .dispatch("request", {
          url: self.urlShape,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsShape = response.data.content;
        })
        .finally(() => (this.isLoadingShape = false));
    },
    searchDCI(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDCI = true;
      this.$store
        .dispatch("request", {
          url: self.urlDCI,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDCI = response.data.content;
        })
        .finally(() => (this.isLoadingDCI = false));
    },
    searchDCI2(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDCI2 = true;
      this.$store
        .dispatch("request", {
          url: self.urlDCI,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDCI2 = response.data.content;
        })
        .finally(() => (this.isLoadingDCI2 = false));
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
        category: {
          required,
        },
        shape: {
          required,
        },
        dci1: {
          required,
        },
        conditioning: {
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
        code: null,
        name: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        expiry_date: this.form.expiry_date,
        // quantity: this.form.quantity,
        shape: this.form.shape,
        purchase_price: this.form.purchase_price,
        order_threshold: this.form.order_threshold,
        public_price: this.form.public_price,
        dci1: this.form.dci1,
        // dci2: this.form.dci2,
        dosage: this.form.dosage,
        conditioning: this.form.conditioning,
        barcode: this.form.barcode,
        category: this.form.category,
        name: this.form.name,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.expiry_date = item.expiry_date;
      this.form.public_price = item.public_price;
      this.form.purchase_price = item.purchase_price;
      this.form.dosage = item.dosage;
      this.form.order_threshold = item.order_threshold;
      this.form.conditioning = item.conditioning;
      this.form.barcode = item.barcode;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.is_active = item.is_active;
      this.form.category = item.category["id"];
      this.itemsCategory.push(item.category);
      this.form.shape = item.shape["id"];
      this.itemsShape.push(item.shape);
      this.form.dci1 = item.dci1["id"];
      this.itemsDCI.push(item.dci1);
      // this.form.dci2 = item.dci2["id"];
      // this.itemsDCI.push(item.dci2);
    },
  },
  computed: {
    get_billable() {
      if (this.form.category === undefined) {
        return 0;
      } else {
        let response = "";
        response =
          this.form.category === null ? "" : this.form.category?.billable;
        return response;
      }
    },
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
    categoryErrors() {
      let errors = [];
      if (!this.$v.form.category.$dirty) return errors;

      !this.$v.form.category.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.category.required")
        );
      return errors;
    },
    shapeErrors() {
      let errors = [];
      if (!this.$v.form.shape.$dirty) return errors;

      !this.$v.form.shape.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.shape.required")
        );
      return errors;
    },
    dci1Errors() {
      let errors = [];
      if (!this.$v.form.dci1.$dirty) return errors;

      !this.$v.form.dci1.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.dci1.required")
        );
      return errors;
    },
    conditioningErrors() {
      let errors = [];
      if (!this.$v.form.conditioning.$dirty) return errors;

      !this.$v.form.conditioning.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.product.cols.conditioning.required")
        );
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
