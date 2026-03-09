<template>
  <v-dialog v-model="dialog.show" persistent max-width="1000px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.inventory.cols.code.title')"
                prepend-inner-icon="mdi-code-array"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.date_inventory"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.inventory.cols.date_inventory.title'
                  )
                "
                prepend-inner-icon="mdi-clock-start"
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="7" class="mb-0 py-0">
              <v-text-field
                v-model="form.reason_inventory"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.inventory.cols.reason_inventory.title'
                  )
                "
                prepend-inner-icon="mdi-script-text"
                class="font-weight-bold"
                outlined
                dense
                :readonly="supply"
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
      <v-form
        @submit.prevent="saveDetails"
        :disabled="form.reason_inventory === null"
      >
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="8" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.details_stock"
                :items="itemsProduct"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.inventory.cols.product_name.title')
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
                ><template slot="selection" slot-scope="data">
                  <span
                    >{{ data.item.ingredient.name }} -
                    {{ data.item.quantity }}</span
                  >
                </template>
                <template v-slot:item="data">
                  <span
                    >{{ data.item.ingredient.name }} -
                    {{ data.item.quantity }}</span
                  >
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.quantity_adjusted"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.inventory.cols.quantity_adjusted.title'
                  )
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRule]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    :loading="loadingBtn"
                    dark
                    type="submit"
                    dense
                    small
                    v-on="on"
                    class="font-weight-bold"
                    max-width="2px"
                    :disabled="
                      form.details_stock === null ||
                      form.reason_inventory === null ||
                      form.quantity_adjusted === null
                    "
                  >
                    <v-icon dark> mdi-content-save </v-icon>
                    <!--{{ $vuetify.lang.t(messages.submit) }}-->
                  </v-btn>
                </template>
                <span
                  class="text-center font-weight-bold body-2 withe--text text--d ken-1"
                >
                  {{ $vuetify.lang.t("$vuetify.btn.add") }}
                </span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="margin-top: -25px">
          <!--          <v-btn-->
          <!--              :loading="loading.refresh"-->
          <!--              @click="refreshItemsDetail()"-->
          <!--              class="mr-2 my-2"-->
          <!--              depressed-->
          <!--              color="#f1f5fc"-->
          <!--          >-->
          <!--            <v-icon left color="primary">mdi-refresh</v-icon>-->
          <!--            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
          <!--          </v-btn>-->
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="save()"
            class="mr-2 my-2"
            depressed
            dense
            dark
            :loading="loadingBtn"
            :disabled="form.reason_inventory === null || this.items.length < 0"
          >
            <v-icon> mdi-content-save </v-icon>
            {{ $vuetify.lang.t("$vuetify.inventory.new.submitinventory") }}
          </v-btn>
        </v-card-actions>
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
        >
          <template v-slot:header.product_name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_adjusted="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <!--            <template v-slot:header.create_date="{ header }">-->
          <!--              <tr>-->
          <!--                {{-->
          <!--                  $vuetify.lang.t(header.text)-->
          <!--                }}-->
          <!--              </tr>-->
          <!--            </template>-->
          <template v-slot:header.null="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:body="{ items }">
            <v-hover>
              <tbody slot-scope="{ hover }">
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">
                    {{ item.ingredient.name }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.quantity_adjusted }}
                  </td>

                  <!--                  <td class="subtitle-2">-->
                  <!--                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}-->
                  <!--                  </td>-->
                  <td class="subtitle-2" width="50px">
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
                            <v-icon mdi-18px>mdi-grease-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
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
                  </td>
                </tr>
              </tbody>
            </v-hover>
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
  </v-dialog>
</template>

<script>
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          inventory: null,
          amount: null,
          amount_adjusted: null,
          details_stock: null,
          quantity_stock: null,
          quantity_adjusted: null,
          product_code: null,
          date_inventory: null,
          reason_inventory: null,
          code: null,
          storage_depots: null,
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
    numberRule: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    headers: [],
    items: [],
    meta: {},
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
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
    sortBy: ["id"],
    e1: 1,
    minDate: new Date().toISOString().substr(0, 10),
    isLoading: false,
    search: null,
    inventories: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    isInventory: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.inventory.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    optionMovement: {
      type_Movement: [],
    },
    itemsProduct: [],
    urlProduct: "details_stocks/specify",
    urlItems: "inventories",
    urlItemsInv: "hospitals/isInventory",
    urlItemsDetails_inventory: "details_inventories",
    urlItemsNoneInv: "details_inventories/noneInv",
  }),
  watch: {
    "dialog.show": {
      immediate: false,
      async handler(val) {
        if (val) {
          if (!this.form.id) {
            await this.createEmptySupply();
          }
          await this.getItemsDetails();
          this.form.date_inventory = new Date().toISOString().slice(0, 10);
        }

        if (!val) {
          await this.deleteEmptySupply();
        }
      },
    },
    // pagination: {
    //   handler() {
    //     this.getNoneInv();
    //   },
    //   deep: true
    // },
    search(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct + "?storage_depots=" + this.$route.params.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.setHeaders();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  mounted() {
    window.addEventListener("keydown", function (event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.keyCode === "r".charCodeAt(0)
      ) {
        event.preventDefault();
        this.resetFormBills();
      }
    });
  },
  methods: {
    createEmptySupply() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: "inventories/create-empty",
            method: "POST",
          })
          .then((response) => {
            self.inventories = response.data.id;
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
            url: "inventories/" + this.inventories + "/delete-empty",
            method: "DELETE",
          })
          .then((response) => {
            resolve(response);
            // console.log("meta", data);
          });
      });
    },
    // getNoneInv() {
    //   let self = this;
    //   return new Promise(resolve => {
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItemsNoneInv
    //       })
    //       .then(response => {
    //         // console.log("meta", data);
    //         resolve(response);
    //       });
    //   });
    // },
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
      // this.send();
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_inventory + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.inventory.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "70",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.inventory.cols.quantity_adjusted.title",
          value: "quantity_adjusted",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.inventory.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.inventory.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "70",
        },
      ];
    },
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
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        inventory: this.inventories,
        reason_inventory: this.form.reason_inventory,
        storage_depots: this.$route.params.id,
      };
      return data;
    },
    getDataFormdetails() {
      let data = {
        ingredient: this.form.details_stock.ingredient["id"],
        quantity_adjusted: this.form.quantity_adjusted,
        inventory: this.inventories,
        storage_depots: this.$route.params.id,
        cmup: this.get_product_cmup,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.inventories = item.id;
      this.form.type_movement = item.type_movement;
      this.form.date_inventory = item.createdAt + " " + item.timeAt;
      this.form.reason_inventory = item.reason_inventory;
      this.form.code = item.code;
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_inventory + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_inventory;
      }
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    resetDataFormProduct() {
      this.form.details_stock = null;
      this.form.quantity_adjusted = null;
    },
    resetDataForm() {
      this.form.id = null;
      this.items = [];
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
    editDetails(item) {
      // console.log(item.product)
      this.form.details_stock = item.details_stock;
    },
    getDataFormInv() {
      let data = {
        is_inventory: false,
      };
      return data;
    },
    // send() {
    //   let self = this;
    //   return new Promise(resolve => {
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItemsDetails_inventory + "?inventory=reset"
    //       })
    //       .then(response => {
    //         // console.log("meta", data);
    //         resolve(response);
    //       });
    //   });
    // },
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
              text: self.$vuetify.lang.t("$vuetify.inventory.new.success"),
            });
            self.$emit("getInventory");
            self.resetDataForm();
            this.dialog.show = false;
            self.$emit("getOpenCash");
            // this.getNoneInv();
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
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsCash,
          })
          .then((response) => {
            let data = response.data;
            self.isActive = data.content.is_active;
            self.isInventory = data.content.is_inventory;

            if (self.isInventory === true) {
              this.currentInventory();
            }

            // console.log("meta", data);
            resolve(response);
          });
      });
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
            url:
              self.urlItemsDetails_inventory + "?inventory=" + this.inventories,
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
            url: self.getRouteDetails(),
            method: self.getMethod(),
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
  },
  computed: {
    get_product_code() {
      let product_code = "";
      product_code =
        this.form.details_stock === null
          ? ""
          : this.form.details_stock?.product?.code;
      return product_code;
    },
    get_product_cmup() {
      let product_cmup = "";
      product_cmup =
        this.form.details_stock === null ? "" : this.form.details_stock?.cmup;
      return product_cmup;
    },
    get_product_stock() {
      let product_stock = "";
      product_stock =
        this.form.details_stock === null
          ? ""
          : this.form.details_stock?.qte_stock;
      return product_stock;
    },
    get_amount() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.details_stock?.qte_stock && this.form.details_stock?.cmup) {
        return (
          this.form.details_stock?.cmup * this.form.details_stock?.qte_stock
        );
      } else if (this.form.amount != null) {
        return this.form.amount;
      } else {
        return 0;
      }
    },
    get_amount_adjusted() {
      // console.log("hum",this.form.details_stock?.cmup);
      if (this.form.quantity_adjusted && this.form.details_stock?.cmup) {
        return this.form.quantity_adjusted * this.form.details_stock?.cmup;
      } else if (this.form.amount_adjusted != null) {
        return this.form.amount_adjusted;
      } else {
        return 0;
      }
    },
    // get_storage_depot() {
    //   if (this.form.operation_date) {
    //     const today = new Date();
    //     const date_year = today.getFullYear();
    //     return (
    //       date_year - moment(String(this.form.operation_date)).format("YYYY")
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
          this.$vuetify.lang.t("$vuetify.inventory.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.inventory.cols.name.unique")
      //   );
      return errors;
    },
    product_codeErrors() {
      let errors = [];
      if (!this.$v.form.product_code.$dirty) return errors;

      // !this.$v.form.product_code.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.inventory.cols.product_code.required")
      //   );

      !this.$v.form.product_code.product_code &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.inventory.cols.product_code.invalid")
        );

      !this.$v.form.product_code.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.inventory.cols.product_code.unique")
        );
      return errors;
    },
    type_movementErrors() {
      let errors = [];
      if (!this.$v.form.type_movement.$dirty) return errors;
      !this.$v.form.type_movement.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.inventory.cols.type_movement.required")
        );
      return errors;
    },
    operation_dateErrors() {
      let errors = [];
      if (!this.$v.form.operation_date.$dirty) return errors;
      !this.$v.form.operation_date.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.inventory.cols.birthday.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.inventory.cols.total_amount.required")
        );
      return errors;
    },
  },
  components: {
    DeleteItem,
  },
};
</script>
