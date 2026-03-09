<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.storage_depot_transmitter"
                :items="itemsDepot"
                :loading="isLoadingDepot"
                :search-input.sync="searchDepot"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.bills.cols.storage_depot_transmitter.title'
                  )
                "
                prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.details_stock"
                :items="itemsProduct"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="product_name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t(
                    '$vuetify.bills.cols.product_name_transmitter.title'
                  )
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
                style="max-width: 250px"
                :readonly="form.storage_depot_transmitter === null"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                style="max-width: 180px"
                :value="get_product_code"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.quantity_transmitter"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.bills.cols.quantity_transmitter.title'
                  )
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                type="number"
                :rules="[numberRuleQte]"
                min="0"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <br />

        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        <br />
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.storage_depot_receiver"
                :items="itemsDepot2"
                :loading="isLoadingDepot2"
                :search-input.sync="searchDepot2"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.bills.cols.storage_depot_receiver.title'
                  )
                "
                prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.details_stock2"
                :items="itemsProduct2"
                :loading="isLoading2"
                :search-input.sync="search2"
                color="primary"
                item-text="product_name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t(
                    '$vuetify.bills.cols.product_name_receiver.title'
                  )
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
                :readonly="
                  form.storage_depot_receiver === form.storage_depot_transmitter
                "
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                style="max-width: 180px"
                :value="get_product_code2"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.quantity_receiver"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.quantity_receiver.title')
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                type="number"
                :rules="[numberRuleQte2]"
                min="0"
                :readonly="form.details_stock !== form.details_stock2"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          details_stock: null,
          details_stock2: null,
          quantity_transmitter: null,
          quantity_receiver: null,
          storage_depot_transmitter: null,
          storage_depot_receiver: null,
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
    isLoadingDepot: false,
    isLoadingDepot2: false,
    isLoading2: false,
    search2: null,
    searchDepot: null,
    searchDepot2: null,
    itemsDepot: [],
    itemsDepot2: [],
    itemsProduct: [],
    itemsProduct2: [],
    urlDepot: "storage_depots",
    product_public_price: "",
    urlProduct: "products/get_products",
    isLoading: false,
    search: null,
    numberRuleQte: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQte2: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    itemsUsers: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "?storage_depots=" +
            this.form.storage_depot_transmitter,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    search2(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading2 = true;
      this.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "?storage_depots=" +
            this.form.storage_depot_receiver,
          params: params,
        })
        .then((response) => {
          self.itemsProduct2 = response.data.content;
        })
        .finally(() => (this.isLoading2 = false));
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
    searchDepot2(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDepot2 = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot2 = response.data.content;
        })
        .finally(() => (this.isLoadingDepot2 = false));
    },
  },

  created() {},
  validations() {
    let validators = {
      form: {
        name: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
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
        storage_depot_transmitter: this.form.storage_depot_transmitter,
        storage_depot_receiver: this.form.storage_depot_receiver,
        quantity_receiver: this.form.quantity_receiver,
        quantity_transmitter: this.form.quantity_transmitter,
        details_stock: this.form.details_stock,
        details_stock2: this.form.details_stock2,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.default_depot = item.default_depot;
      this.form.name = item.name;
      this.form["oldname"] = item.name;
      this.form.name_responsible = item.name_responsible;
      this.quantity_receiver = item.quantity_receiver;
      this.quantity_transmitter = item.quantity_transmitter;
      this.form.username = item.username["id"];
      this.itemsUsers.push(item.username);
    },
    save() {
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
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
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
  },
  computed: {
    get_product_code() {
      let product_code = "";
      product_code =
        this.form.details_stock === null ||
        this.form.details_stock === undefined
          ? ""
          : this.form.details_stock?.product.code;
      let product_stock = "";
      product_stock =
        this.form.details_stock === null ||
        this.form.details_stock === undefined
          ? ""
          : this.form.details_stock?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      return code_stock;
    },
    get_product_code2() {
      let product_code = "";
      product_code =
        this.form.details_stock2 === null ||
        this.form.details_stock2 === undefined
          ? ""
          : this.form.details_stock2?.product.code;
      let product_stock = "";
      product_stock =
        this.form.details_stock2 === null ||
        this.form.details_stock2 === undefined
          ? ""
          : this.form.details_stock2?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      return code_stock;
    },
    // Gestion des erreurs du formulaire
    roleErrors() {
      let errors = [];
      if (!this.$v.form.role.$dirty) return errors;
      !this.$v.form.role.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.role.required"));
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
  components: {},
};
</script>
