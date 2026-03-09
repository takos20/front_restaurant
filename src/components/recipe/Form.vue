<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="880px"
    transition="dialog-bottom-transition"
  >
    <v-toolbar dark color="white" dense max-width="880px">
      <div class="title" style="color: black">
        {{ $vuetify.lang.t(messages.title) }}
      </div>
      <v-spacer></v-spacer>
      <v-btn icon light @click="forceRefresh()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <div style="margin-top: 1px">
      <!--    <div-->
      <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
      <!--      style="height: 30px; margin-top: 30px"-->
      <!--      v-if="this.isActive === 'false'"-->
      <!--    >-->
      <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
      <!--    </div>-->
      <v-card class="pb-1">
        <br />

        <v-form>
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="7"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-autocomplete
                  v-model="form.dish"
                  :items="itemsDish"
                  :loading="isLoadingDish"
                  :search-input.sync="searchDish"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="$vuetify.lang.t('$vuetify.recipe.cols.dish.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  autofocus
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                sm="5"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-text-field
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.recipe.cols.cost.titleT')"
                  class="font-weight-bold"
                  outlined
                  :value="totalBillsAmount"
                  readonly
                  filled
                  dense
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
          <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        </v-form>
        <v-form @submit.prevent="save" :disabled="form.dish === null">
          <br />
          <v-card-text>
            <v-row wrap>
              <v-col
                cols="12"
                sm="8"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-autocomplete
                  v-model="formData.ingredient"
                  :items="itemsIngredient"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="name"
                  item-value="uid"
                  :label="
                    $vuetify.lang.t('$vuetify.recipe.cols.ingredient.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-text-field
                  v-model="formData.quantity"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.recipe.cols.quantity.title')
                  "
                  class="font-weight-bold"
                  outlined
                  @keyup.enter="saveDetails()"
                  dense
                  type="number"
                  :rules="[numberRuleQteServed]"
                  min="0"
                ></v-text-field>
              </v-col>

              <!-- <v-col
                cols="12"
                sm="1"
                class="mb-0 py-0"
                style="margin-top: -15px"
              >
                <v-btn
                  light
                  color="primary"
                  :loading="loadingBtn"
                  :disabled="this.formData.quantity === null"
                  type="submit"
                  class="font-weight-bold ml-5 white--text"
                >
                  {{ $vuetify.lang.t("$vuetify.recipe.new.submit") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text> -->
              <v-col
                cols="12"
                sm="1"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-btn
                  color="primary"
                  :loading="loadingBtn"
                  light
                  @click="saveDetails()"
                  dense
                  small
                  max-width="2px"
                  :disabled="this.formData.quantity === null"
                >
                  <v-icon dark> mdi-content-save </v-icon>
                  <!--{{ $vuetify.lang.t(messages.submit) }}-->
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mr-2"
            light
            type="submit"
            dense
                      
            :loading="loadingBtn"
            style="margin-top: -30px"
            :disabled="totalBillsAmount === 0"
          >
            <v-icon> mdi-content-save </v-icon>
            {{ $vuetify.lang.t("$vuetify.supplies.new.submitSupplies") }}
          </v-btn>
        </v-card-actions> -->
          <v-divider class="mx-4"></v-divider>
        </v-form>

        <v-card-text>
          <v-data-table
            :footer-props="{
              'items-per-page-options': itemPerPageOptions,
            }"
            :headers="headers"
            :items="items"
            :items-per-page="itemPerPage"
            :loading="loadingDetails.list"
            :options.sync="pagination"
            :server-items-length="meta.totalElements"
            :sort-by="sortBy"
            :sort-desc="sortDesc"
            item-key="name"
            class="mt-5"
            hide-default-footer
          >
            <template v-slot:header.name="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.quantity="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>
            <template v-slot:header.cost="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>

            <template v-slot:header.null="{ header }">
              <tr>
                {{
                  $vuetify.lang.t(header.text)
                }}
              </tr>
            </template>

            <template v-slot:body="{ items }">
              <tbody>
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">
                    {{
                      item.ingredient
                        ? item.ingredient.name
                        : item.compose_ingredient
                        ? item.compose_ingredient.name
                        : "-"
                    }}
                  </td>

                  <!-- Editable Quantity -->
                  <td class="subtitle-2">
                    <div v-if="editedRowId === item.id">
                      <v-text-field
                        v-model="editedRow.quantity"
                        dense
                        hide-details
                        type="number"
                        style="max-width: 80px"
                      />
                    </div>
                    <div v-else>
                      {{ item.quantity }}
                    </div>
                  </td>
                  <td class="subtitle-2">
                    <div v-if="editedRowId === item.id">
                      <v-text-field
                        v-model="editedRow.cost"
                        dense
                        hide-details
                        type="number"
                        style="max-width: 80px"
                      />
                    </div>
                    <div v-else>
                      {{ item.cost }}
                    </div>
                  </td>

                  <!-- Action Buttons -->
                  <td class="subtitle-2">
                    <template v-if="editedRowId === item.id">
                      <v-btn icon color="green" @click="saveRowEdit">
                        <v-icon>mdi-content-save</v-icon>
                      </v-btn>
                      <v-btn icon color="grey" @click="cancelRowEdit">
                        <v-icon>mdi-cancel</v-icon>
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn icon color="secondary" @click="editDetails(item)">
                        <v-icon>mdi-update</v-icon>
                      </v-btn>
                      <v-btn icon color="red" @click="deleteItem(item)">
                        <v-icon>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                  </td>
                  <!-- <td class="subtitle-2" width="50px">
                      <template>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              @click="editDetails(item)"
                              color="secondary"
                              icon
                              text
                              v-on="on"
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-update</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.edit")
                          }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              @click="deleteItem(item)"
                              color="red"
                              icon
                              text
                              v-on="on"
                              dark
                              v-show="$vuetify.breakpoint.smAndDown || hover"
                            >
                              <v-icon mdi-18px>mdi-delete-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>{{
                            $vuetify.lang.t("$vuetify.btn.remove")
                          }}</span>
                        </v-tooltip>
                      </template>
                    </td> -->
                </tr>
              </tbody>
            </template>
          </v-data-table>
          <delete-item
            :dialog="dialogDelete"
            :messages="messagesDelete"
            :urlItems="urlDeleteItems"
            @getItemsDetails="getItemsDetails"
          ></delete-item>
        </v-card-text>
      </v-card>
      <form-dish :dialog="dialogForm" :messages="messages"></form-dish>
      <!--    <pdf :src="pdfsrc"></pdf>-->
    </div>
  </v-dialog>
</template>

<script>
import FormDish from "./../dish/Form";

// import axios from "axios";c
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
// const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          dish: null,
          total_amount: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      dish: null,
      quantity: null,
      ingredient: null,
      total_amount: null,
    },
    editedRowId: null,
    editedRow: {},
    maxDate: new Date().toISOString().substr(0, 10),
    optionPayment: {
      type_Payment: [],
    },
    optionType: {
      type_accommodation: [],
    },
    pdfsrc: null,
    headers: [],
    items: [],
    meta: {},
    itemPerPage: 30,
    //itemPerPages: 3,
    itemPerPageOptions: [30, 40, 50],
    urlDeleteItems: "",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },

    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    numberRuleQteServed: (val) => {
      if (val === null || val === "" || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },

    sortBy: ["id"],
    numberRuleDelivery: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.recipe.delete.success",
    },
    loadingBtn: false,
    recipes: null,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingPrice: {
      list: false,
      refresh: false,
      filter: false,
    },

    urlIngredient: "ingredients/alls",
    itemsIngredient: [],
    product_public_price: "",
    isLoadingDish: false,
    isLoading: false,
    searchDish: null,
    search: null,
    itemsDish: [],
    urlDish: "dishes/all",
    urlItems: "recipes",
    urlItemsDetails_bills: "recipe_ingredients",
  }),
  watch: {
    pagination: {
      handler() {
        // this.getItemsDetails();
      },
      deep: true,
    },
    "dialog.show": {
      immediate: false,
      async handler(val) {
        if (val) {
          if (!this.form.id) {
            await this.createEmptySupply();
          }
        }

        if (!val) {
          await this.deleteEmptySupply();
        }
        this.getItemsDetails();
        this.items = [];
      },
    },
    search(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlIngredient,
          params: params,
        })
        .then((response) => {
          self.itemsIngredient = response.data.content;
          // this.formData.quantity_served = 1;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoading = false));
    },
    searchDish(value) {
      if (value === null) return;
      this.isLoadingDish = true;
      const params = { name_language: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlDish,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoadingDish = false));
    },
  },
  created() {
    this.setHeaders();
    //this.setItemRoles();
  },
  validations() {
    let validators = {};
    return validators;
  },
  methods: {
    createEmptySupply() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItems + "/create-empty",
            method: "POST",
          })
          .then((response) => {
            self.recipes = response.data.id;
            resolve(response);
            // console.log("meta", data);
          });
      });
    },
    deleteEmptySupply() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItems + "/" + this.recipes + "/delete-empty",
            method: "DELETE",
          })
          .then((response) => {
            resolve(response);
            // console.log("meta", data);
          });
      });
    },

    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.formData.ingredient = null;
      this.formData.quantity = null;
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.ingredient.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.recipe.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.recipe.cols.cost.title",
          value: "cost",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "100",
        },
      ];
    },
    createDish() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patient.new.title",
        submit: "$vuetify.patient.new.submit",
        success: "$vuetify.patient.new.success",
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
    },
    currentInventory() {
      this.dialogFormInv.show = true;
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        code: this.form.code,
        dish: this.form.dish,
        recipes: this.recipes,
        total_amount: this.totalBillsAmount,
      };
      return data;
    },
    getDataFormdetails() {
      let data;

      data = {
        recipes: this.recipes,
        quantity: this.formData.quantity,

        dish: this.form.dish
          ? this.form.dish["id"]
            ? this.form.dish["id"]
            : this.form.dish
          : this.form.dish["id"],
        total_amount: this.totalBillsAmount,
        item_uid: this.formData.ingredient,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.recipes = item.id;
      this.form.dish = item.dish;
      this.itemsDish.push(item.dish);
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    getDetailsRoute: function () {
      if (this.form.dish) {
        // <-- vérifie que dish existe
        // dish peut être un objet {id: ...} ou juste un id
        const dishId = this.form.dish.id ? this.form.dish.id : this.form.dish;
        return this.urlItemsDetails_bills + "?dish=" + dishId;
      } else {
        // dish n'est pas encore sélectionné
        return this.urlItemsDetails_bills;
      }
    },
    getMethodDetails() {
      //this.reset = this.form.id === undefined
      return "POST";
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    refreshItemsDetail() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
    },
    getHospital() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.tva_collected = data.content[0].VAT_collected;
            resolve(response);
          });
      });
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
              self.resetDataFormProduct();
              this.resetDataForm();

              this.createEmptySupply();
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

    getItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills + "?recipes=" + this.recipes,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch((err) => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                const fields = err.response.data;
                self.setFormErrors(fields);

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message,
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    editDetails(item) {
      this.editedRowId = item.id;
      this.editedRow = { ...item }; // clone to prevent direct mutations
    },
    saveRowEdit() {
      console.log(this.editedRow);
      // emit or update item in-place or via API
      if (this.editedRow.ingredient) {
        this.editedRow.ingredient = this.editedRow.ingredient["id"];
      }
      if (this.editedRow.dish) {
        this.editedRow.dish = this.editedRow.dish["id"];
      }
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails() + "/" + this.editedRow.id,
            method: "PATCH",
            data: this.editedRow,
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      // this.$emit("update-item", this.editedRow); // or call API directly
      const index = this.items.findIndex((i) => i.id === this.editedRow.id);
      if (index !== -1) {
        this.items.splice(index, 1, { ...this.editedRow });
      }
      this.editedRowId = null;
      this.editedRow = {};
    },
    cancelRowEdit() {
      this.editedRowId = null;
      this.editedRow = {};
    },
    resetDataFormProduct() {
      this.items = [];
      this.formData.ingredient = null;
      this.formData.quantity = null;
      this.formData.total_amount = null;
    },
    saveDetails() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills,
            method: "POST",
            data: self.getDataFormdetails(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    setFormData(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.editedRow.pun -
        ((this.editedRow.pun || 0) * (this.editedRow.delivery || 0)) / 100;
    },
    setFormDataAmount(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.editedRow.pun -
        ((this.editedRow.pun || 0) * (this.editedRow.delivery || 0)) / 100;
    },
  },
  computed: {
    totalBillsAmount() {
      if (!Array.isArray(this.items)) return 0;

      return this.items.reduce((total, item) => {
        return total + Number(item.cost || 0);
      }, 0);
    },

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
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
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
  mounted() {
    this.getHospital();
  },
  // mounted() {
  //   window.addEventListener("keydown", function(event) {
  //     if (
  //         (event.metaKey || event.ctrlKey) &&
  //         event.keyCode === "r".charCodeAt(0)
  //     ) {
  //       event.preventDefault();
  //       this.resetFormBills();
  //     }
  //   });
  // },
  components: {
    DeleteItem,
    FormDish,
  },
};
</script>
