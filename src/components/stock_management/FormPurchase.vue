<template>
  <v-dialog v-model="dialog.show" persistent max-width="1000px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
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

            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              v-if="this.form.id !== null"
            >
              <v-text-field
                v-model="form.date_inventory"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.purchase_order.cols.date.title')
                "
                prepend-inner-icon="mdi-clock-start"
                class="font-weight-bold"
                outlined
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
      <v-form @submit.prevent="saveDetails">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-select
                v-model="form.type_product"
                color="primary"
                :items="optionType.type_product"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.type_product.title')
                "
                :placeholder="
                  $vuetify.lang.t('$vuetify.supplies.cols.type_product.title')
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.supplies.cols.type_product.title")
                  }}
                </template>
              </v-select>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              v-if="this.form.type_product === 'PHARMACY'"
            >
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
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              v-if="this.form.type_product === 'REAGENT'"
            >
              <v-autocomplete
                v-model="form.reagent"
                :items="itemsReagent"
                :loading="isLoadingReagent"
                :search-input.sync="searchReagent"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="$vuetify.lang.t('$vuetify.reagent.title')"
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
              v-if="this.form.type_product === 'CONSUMABLE'"
            >
              <v-autocomplete
                v-model="form.consumable"
                :items="itemsConsumable"
                :loading="isLoadingConsumable"
                :search-input.sync="searchConsumable"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="$vuetify.lang.t('$vuetify.consumable.title')"
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <!--            <v-col cols="12" sm="1" class="mb-0 py-0">-->
            <!--              <v-text-field-->
            <!--                :value="get_product_stock"-->
            <!--                color="primary"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t(-->
            <!--                    '$vuetify.inventory.cols.quantity_stock.title'-->
            <!--                  )-->
            <!--                "-->
            <!--                class="font-weight-bold ml-1"-->
            <!--                outlined-->
            <!--                dense-->
            <!--                type="number"-->
            <!--                readonly-->
            <!--              ></v-text-field>-->
            <!--            </v-col>-->
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.quantity_ordered"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.purchase_order.cols.quantity_ordered.title'
                  )
                "
                class="font-weight-bold ml-1"
                outlined
                style="max-width: 125px"
                dense
                type="number"
                min="0"
                :rules="[numberRule]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.unit_price.title'
                  )
                "
                class="font-weight-bold ml-1"
                outlined
                :value="get_amount"
                dense
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.purchase_order.cols.amount_ordered.title'
                  )
                "
                class="font-weight-bold ml-1"
                outlined
                :value="get_amount_ordered"
                dense
                readonly
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
                    class="font-weight-bold ml-1"
                    :disabled="form.quantity_ordered === null"
                  >
                    <v-icon dark> mdi-content-save </v-icon>
                    <!--{{ $vuetify.lang.t(messages.submit) }}-->
                  </v-btn>
                </template>
                <span
                  class="text-center font-weight-bold body-2 withe--text text--d ken-1"
                >
                  {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
                </span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="margin-top: -45px">
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
            :disabled="this.items === []"
          >
            <v-icon> mdi-content-save </v-icon>
            {{ $vuetify.lang.t("$vuetify.purchase_order.new.submit") }}
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
          <template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_stock="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.quantity_ordered="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.amount_ordered="{ header }">
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
                    {{
                      item.details_stock.product
                        ? item.details_stock.product.name
                        : item.details_stock.reagent
                        ? item.details_stock.reagent.name
                        : item.details_stock.consumable
                        ? item.details_stock.consumable.name
                        : "-"
                    }}
                  </td>
                  <td class="subtitle-2">
                    {{
                      item.details_stock.product
                        ? item.details_stock.product.code
                        : item.details_stock.reagent
                        ? item.details_stock.reagent.code
                        : item.details_stock.consumable
                        ? item.details_stock.consumable.code
                        : "-"
                    }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.quantity_stock }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.quantity_ordered }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_ordered }}
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
          purchase_order: null,
          amount: null,
          amount_ordered: null,
          details_stock: null,
          quantity_stock: null,
          quantity_ordered: null,
          product_code: null,
          date_inventory: null,
          type_product: null,
          consumable: null,
          reagent: null,
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
    urlReagent: "reagents",
    itemsReagent: [],
    searchReagent: null,
    isLoadingReagent: false,
    urlConsumable: "consumables",
    itemsConsumable: [],
    searchConsumable: null,
    isLoadingConsumable: false,
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
    menu2: false,
    supply: false,
    active: false,
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
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.purchase_order.delete.success",
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
    optionType: {
      type_product: [],
    },
    itemsProduct: [],
    urlProduct: "products",
    urlItems: "purchase_orders",
    urlItemsDetails_Purchase_order: "details_purchase_orders",
  }),
  watch: {
    search(value) {
      this.form.reagent = null;
      this.form.consumable = null;
      this.form.quantity_ordered = null;
      if (value === null) return;
      const params = {
        name: value,
      };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoading = false));
    },
    searchReagent(value) {
      this.form.consumable = null;
      this.form.details_stock = null;
      this.form.quantity_ordered = null;
      if (value === null) return;
      const params = {
        name: value,
      };
      let self = this;
      this.isLoadingReagent = true;
      this.$store
        .dispatch("request", {
          url: self.urlReagent,
          params: params,
        })
        .then((response) => {
          self.itemsReagent = response.data.content;
        })
        .finally(() => (this.isLoadingReagent = false));
    },
    searchConsumable(value) {
      this.form.reagent = null;
      this.form.details_stock = null;
      this.form.quantity_ordered = null;
      if (value === null) return;
      const params = {
        name: value,
      };
      let self = this;
      this.isLoadingConsumable = true;
      this.$store
        .dispatch("request", {
          url: self.urlConsumable,
          params: params,
        })
        .then((response) => {
          self.itemsConsumable = response.data.content;
        })
        .finally(() => (this.isLoadingConsumable = false));
    },
    // pagination: {
    //   handler() {
    //     this.getNoneInv();
    //   },
    //   deep: true
    // },
  },
  created() {
    this.setHeaders();
    this.getOptionsType();
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
    resetDetail() {
      this.form.reagent = null;
      this.form.consumable = null;
      this.form.quantity_ordered = null;
    },
    resetReagent() {
      this.form.details_stock = null;
      this.form.consumable = null;
      this.form.quantity_ordered = null;
    },
    resetConsumable() {
      this.form.reagent = null;
      this.form.details_stock = null;
      this.form.quantity_ordered = null;
    },
    getOptionsType() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_products, (type_product) => {
        self.optionType.type_product.push({
          text: self.$vuetify.lang.t(type_product.text),
          value: type_product.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
      this.send();
      this.resetDataForm();
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_Purchase_order + "/" + item.id;
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
          text: "$vuetify.inventory.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.inventory.cols.quantity_stock.title",
          value: "quantity_stock",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.amount.title",
          value: "amount",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.purchase_order.cols.quantity_ordered.title",
          value: "quantity_ordered",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.purchase_order.cols.amount_ordered.title",
          value: "amount_ordered",
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
        storage_depots: this.$route.params.id,
      };
      return data;
    },
    getDataFormdetails() {
      let data = {
        details_stock: this.form.details_stock
          ? this.form.details_stock["id"]
          : this.form.reagent
          ? this.form.reagent["id"]
          : this.form.consumable
          ? this.form.consumable["id"]
          : this.form.details_stock,
        amount_ordered: this.get_amount_ordered,
        amount: this.form.details_stock
          ? this.form.details_stock.purchase_price
          : this.form.reagent
          ? this.form.reagent.purchase_price
          : this.form.consumable
          ? this.form.consumable.purchase_price
          : 0,
        type_product: this.form.type_product,
        quantity_stock: this.get_product_stock,
        quantity_ordered: this.form.quantity_ordered,
        storage_depots: this.$route.params.id,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.purchase_order = item.id;
      this.form.type_product = item.type_product;
      this.form.date_inventory = item.createdAt + " " + item.timeAt;
      this.form.code = item.code;
      this.form.consumable = item.consumable["id"];
      this.itemsConsumable.push(item.consumable);
      this.form.reagent = item.reagent["id"];
      this.itemsReagent.push(item.reagent);
      this.getItemsDetails();
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_Purchase_order + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_Purchase_order;
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
      this.form.quantity_ordered = null;
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
    send() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_Purchase_order + "?purchase_order=reset",
          })
          .then((response) => {
            // console.log("meta", data);
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
              text: self.$vuetify.lang.t("$vuetify.purchase_order.new.success"),
            });
            self.$emit("getInventory");
            self.resetDataForm();
            this.dialog.show = false;
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
            url:
              self.urlItemsDetails_Purchase_order +
              "?purchase_order=" +
              this.form.purchase_order,
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
    get_product_stock() {
      let product_stock = "";
      if (this.form.details_stock) {
        product_stock = this.form.details_stock.qte_stock;
      }
      if (this.form.reagent) {
        product_stock = this.form.reagent.qte_stock;
      }
      if (this.form.consumable) {
        product_stock = this.form.consumable.qte_stock;
      }
      return product_stock;
    },
    get_amount() {
      let amount = "";
      amount = this.form.details_stock
        ? this.form.details_stock.purchase_price
        : this.form.reagent
        ? this.form.reagent.purchase_price
        : this.form.consumable
        ? this.form.consumable.purchase_price
        : 0;

      return amount;
    },
    get_amount_ordered() {
      let amount_ordered = "";
      if (this.form.details_stock) {
        amount_ordered =
          this.form.quantity_ordered * this.form.details_stock.purchase_price;
      } else if (this.form.reagent) {
        amount_ordered =
          this.form.quantity_ordered * this.form.reagent.purchase_price;
      } else if (this.form.consumable) {
        amount_ordered =
          this.form.quantity_ordered * this.form.consumable.purchase_price;
      }
      return amount_ordered;
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
