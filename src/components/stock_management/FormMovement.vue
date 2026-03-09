<template>
  <v-dialog v-model="dialog.show" persistent max-width="1100px">
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
      <v-form>
        <v-card-text class="mt-2">
          <v-row wrap>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.stock_movement.cols.code.title')
                "
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
                v-model="form.date_movement"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.date_movement.title'
                  )
                "
                prepend-inner-icon="mdi-clock-start"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.movement_value.title'
                  )
                "
                prepend-inner-icon="mdi-credit-card"
                class="font-weight-bold"
                outlined
                dense
                :value="get_movement_value"
                readonly
                suffix="FCFA"
              ></v-text-field>
            </v-col> -->
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-select
                v-model="form.type_movement"
                color="primary"
                :items="optionMovement.type_Movement"
                :label="
                  $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                "
                dense
                :disabled="form.id"
                @blur="$v.form.type_movement.$touch()"
                @input="$v.form.type_movement.$touch()"
                :error-messages="type_movementErrors"
                prepend-inner-icon="mdi-account-supervisor-circle"
                outlined
                class="font-weight-bold"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-text-field
                v-model="form.reason_movement"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.reason_movement.title'
                  )
                "
                prepend-inner-icon="mdi-script-text"
                class="font-weight-bold"
                outlined
                :disabled="form.id"
                @blur="$v.form.reason_movement.$touch()"
                @input="$v.form.reason_movement.$touch()"
                :error-messages="reason_movementErrors"
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

      <v-form @submit.prevent="saveDetails" style="margin-top: -5px">
        <v-card-text class="mt-3">
          <v-card
            v-if="form && form.type_movement === 'TRANSFER'"
            class="pa-4 mb-4"
            outlined
            elevation="3"
          >
            <div class="d-flex align-center">
              <v-avatar color="red lighten-4" size="48" class="mr-4">
                <v-icon color="red darken-2"> mdi-swap-horizontal </v-icon>
              </v-avatar>

              <div>
                <div class="subtitle-1 font-weight-bold red--text">
                  {{ $vuetify.lang.t("$vuetify.stock_movement.transfer") }}
                </div>
                <div class="caption grey--text">
                  {{ $vuetify.lang.t("$vuetify.stock_movement.transfer_info") }}
                </div>
              </div>
            </div>
          </v-card>
          <br />
          <v-row wrap>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.details_stock"
                :items="itemsProduct"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="product_name"
                @change="onIngredientSelect"
                item-value="id"
                return-object
                :disabled="form.id"
                :label="$vuetify.lang.t('$vuetify.ingredient.title')"
                prepend-inner-icon="mdi-rename-box"
                class="font-weight-bold"
                outlined
                dense
                clearable
              >
                <template slot="selection" slot-scope="data">
                  {{ data.item.ingredient.name }} - {{ data.item.quantity }}
                </template>
                <template v-slot:item="data">
                  {{ data.item.ingredient.name }} - {{ data.item.quantity }}
                </template>
                <template #label>
                  {{ $vuetify.lang.t("$vuetify.ingredient.title") }}
                </template>
              </v-autocomplete>
            </v-col>
            <!-- <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.product_code.title'
                  )
                "
                prepend-inner-icon="mdi-code-array"
                class="font-weight-bold"
                outlined
                dense
                :value="get_product_code"
                readonly
              ></v-text-field>
            </v-col> -->
            <!--<v-col-->
            <!--cols="12"-->
            <!--sm="3"-->
            <!--class="mb-0 py-0"-->
            <!--v-if="form.product_code != null"-->
            <!--&gt;-->
            <!--<v-text-field-->
            <!--color="primary"-->
            <!--v-model="form.product_code"-->
            <!--:label="-->
            <!--$vuetify.lang.t('$vuetify.stock_movement.cols.product_code.title')-->
            <!--"-->
            <!--prepend-inner-icon="mdi-code-array"-->
            <!--class="font-weight-bold"-->
            <!--outlined-->
            <!--dense-->
            <!--&gt;</v-text-field>-->
            <!--</v-col>-->
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.quantity"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.stock_movement.cols.quantity.titleTransfer'
                  )
                "
                prepend-inner-icon="mdi-numeric-0-box"
                class="font-weight-bold"
                outlined
                :disabled="form.id"
                dense
                type="number"
                min="0"
                :rules="[numberRule]"
              ></v-text-field>
            </v-col>
            <!--            <v-col cols="12" sm="2" class="mb-0 py-0">-->
            <!--              <v-text-field-->
            <!--                color="primary"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t(-->
            <!--                    '$vuetify.stock_movement.cols.unit_price.title'-->
            <!--                  )-->
            <!--                "-->
            <!--                prepend-inner-icon="mdi-credit-card"-->
            <!--                class="font-weight-bold"-->
            <!--                outlined-->
            <!--                dense-->
            <!--                :value="get_product_price"-->
            <!--                readonly-->
            <!--              ></v-text-field>-->
            <!--            </v-col>-->
            <!--            <v-col cols="12" sm="2" class="mb-0 py-0">-->
            <!--              <v-text-field-->
            <!--                color="primary"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t(-->
            <!--                    '$vuetify.stock_movement.cols.total_amount.title'-->
            <!--                  )-->
            <!--                "-->
            <!--                prepend-inner-icon="mdi-credit-card-plus"-->
            <!--                class="font-weight-bold"-->
            <!--                outlined-->
            <!--                :value="get_total_amount"-->
            <!--                dense-->
            <!--                suffix="FCFA"-->
            <!--                readonly-->
            <!--              ></v-text-field>-->
            <!--            </v-col>-->
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.storage_depots_dest"
                :items="itemsDepot"
                :loading="isLoadingDepot"
                :search-input.sync="searchDepot"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.stock_movement.cols.depot.title')
                "
                prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                :disabled="this.form.type_movement !== 'TRANSFER' || form.id"
                clearable
                :readonly="supply"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="primary"
                    :loading="loadingBtn"
                    ligt
                    type="submit"
                    dense
                    small
                    v-on="on"
                    max-width="2px"
                    style="margin-top: 3px"
                    :disabled="
                      form.type_movement === null ||
                      form.reason_movement === null ||
                      form.quantity === null ||
                      form.id
                    "
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
      </v-form>
      <v-card-actions style="margin-top: -28px">
        <v-spacer></v-spacer>
        <!-- <v-btn
          color="primary"
          class="mr-2 my-2"
          depressed
          dense
          ligt
          :loading="loadingBtn"
        >
          <v-icon> mdi-cancel </v-icon>
          {{ $vuetify.lang.t("$vuetify.stock_movement.new.cancel") }}
        </v-btn> -->
        <v-btn
          color="primary"
          @click="save()"
          class="mr-2"
          depressed
          dense
          ligt
          :loading="loadingBtn"
          :disabled="
            form.type_movement === null ||
            form.reason_movement === null ||
            form.id
          "
        >
          <v-icon> mdi-content-save </v-icon>
          {{
            $vuetify.lang.t("$vuetify.stock_movement.new.submitstock_movement")
          }}
        </v-btn>
      </v-card-actions>
      <v-divider class="mx-4"></v-divider>
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

          <template v-slot:header.quantity="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.storage_depots_dest="{ header }">
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
                <tr
                  :key="itemStock_movement.id"
                  v-for="itemStock_movement in items"
                >
                  <td class="subtitle-2">
                    {{ itemStock_movement.ingredient.name }}
                  </td>

                  <td class="subtitle-2">
                    {{ itemStock_movement.quantity }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-if="itemStock_movement.storage_depots_dest"
                  >
                    {{ itemStock_movement.storage_depots_dest.name }}
                  </td>
                  <td class="subtitle-2" v-else>R.A.S</td>
                  <!--                    <td class="subtitle-2">-->
                  <!--                      {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}-->
                  <!--                    </td>-->
                  <td class="subtitle-2" width="50px">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editDetails(itemStock_movement)"
                            color="secondary"
                            icon
                            text
                            light
                            :disabled="this.form.id"
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
                            @click="deleteItem(itemStock_movement)"
                            color="red"
                            icon
                            text
                            :disabled="this.form.id"
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
import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          stock_movement: null,
          total_amount: null,
          storage_depots_dest: null,
          quantity: null,
          details_stock: null,
          product_code: null,
          date_movement: new Date().toISOString().substr(0, 10),
          type_movement: null,
          reason_movement: "RAS",
          movement_value: null,
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
    isLoadingDepot: false,
    searchDepot: null,
    itemsDepot: [],
    urlDepot: "storage_depots",
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
    isLoading: false,
    search: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    stock_movements: null,
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
    minDate: new Date().toISOString().substr(0, 10),
    messagesDelete: {
      success: "$vuetify.stock_movement.delete.success",
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
    urlItemsMov: "details_stock_movement/noneMov",
    urlProduct: "details_stocks/specify",
    urlItems: "stock_movements",
    urlItemsDetails_stock_movement: "details_stock_movement",
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
          this.form.date_movement = new Date().toISOString().slice(0, 10);
        }

        if (!val) {
          await this.deleteEmptySupply();
        }
      },
    },
    pagination: {
      handler() {
        this.getItemsDetails();
      },
      deep: true,
    },
    searchDepot(value) {
      if (value === null) return;
      const params = { name_language: value };
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
    search(value) {
      if (value === null) return;
      const params = { name: value };
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
    this.getOptionsMovement();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        type_movement: {
          required,
        },
        reason_movement: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    onIngredientSelect(selectedStock) {
      if (selectedStock && selectedStock.ingredient) {
        // ✅ Stocker l'ingredient.id séparément
        this.form.details_stock = selectedStock.ingredient.id;

        // ✅ Optionnel: stocker aussi le nom pour affichage
        this.form.ingredient_name = selectedStock.ingredient.name;
      } else {
        // Champ vidé (clearable)
        this.form.details_stock = null;
        this.form.ingredient_name = null;
      }
    },
    createEmptySupply() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: "stock_movements/create-empty",
            method: "POST",
          })
          .then((response) => {
            self.stock_movements = response.data.id;
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
            url: "stock_movements/" + this.stock_movements + "/delete-empty",
            method: "DELETE",
          })
          .then((response) => {
            resolve(response);
            // console.log("meta", data);
          });
      });
    },
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement_stock, (type_Movement) => {
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
      this.resetDataForm();
      this.getNoneMov();
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_stock_movement + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.ingredient.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "150",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.quantity.titleTransfer",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.depot.title",
          value: "storage_depots_dest",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.stock_movement.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.stock_movement.cols.actions.title",
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
        createdAt: this.form.date_movement,
        stock_movement: this.stock_movements,
        type_movement: this.form.type_movement,
        suppliers: this.form.suppliers,
        reason_movement: this.form.reason_movement,
        movement_value: this.get_movement_value,
        storage_depots: this.$route.params.id,
      };
      return data;
    },
    getDataFormdetails() {
      let data = {
        ingredient: this.form.details_stock,
        // total_amount: this.get_total_amount,
        stock_movement: this.stock_movements,
        quantity: this.form.quantity,
        type_movement: this.form.type_movement,
        storage_depots_dest: this.form.storage_depots_dest,
        storage_depots: this.$route.params.id,
        createdAt: this.form.date_movement,
        // unit_price: this.get_product_price,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.stock_movements = item.id;
      this.form.type_movement = item.type_movement;
      this.form.date_movement = item.createdAt;
      this.form.movement_value = item.movement_value;
      this.form.reason_movement = item.reason_movement;
      this.form.code = item.code;
      this.getItemsDetails();
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_stock_movement + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_stock_movement;
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
      this.form.quantity = null;
    },
    resetDataForm() {
      this.form.product = null;
      this.form.id = null;
      this.form.type_movement = null;
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
    editDetails(itemStock_movement) {
      this.form.details_stock = itemStock_movement.ingredient;
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
              text: self.$vuetify.lang.t("$vuetify.stock_movement.new.success"),
            });
            self.$emit("getStockMovement");
            self.resetDataForm();
            this.createEmptySupply();
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
              self.urlItemsDetails_stock_movement +
              "?stock_movement=" +
              this.stock_movements,
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
    // editDetails(item) {
    //   // this.dialogFormDetails.show = true;
    //   this.$refs.detailsForm.setForm(item);
    //   // this.refreshItemsDetails();
    // },
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
            self.form.details_stock = null;
            self.form.quantity = null;
            self.form.storage_depots = null;
            self.form.storage_depots_dest = null;
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
    getNoneMov() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsMov,
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
  },
  computed: {
    get_product_code() {
      let product_code = "";
      product_code =
        this.form.details_stock === null
          ? ""
          : this.form.details_stock?.product?.code;
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
    get_product_stock() {
      let product_code = "";
      product_code =
        this.form.details_stock === null
          ? 0
          : this.form.details_stock?.qte_stock;
      return product_code;
    },
    // get_product_price() {
    //   let product_public_price = "";
    //   product_public_price =
    //     this.form.details_stock === null
    //       ? ""
    //       : this.form.details_stock?.cmup
    //       ? this.form.details_stock.cmup
    //       : this.form.details_stock?.product?.public_price;
    //   return product_public_price;
    // },
    get_movement_value() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.total_amount;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    // get_total_amount() {
    //   // console.log("hum",this.form.product.purchase_price);
    //   if (this.form.quantity && this.form.details_stock) {
    //     if (this.form.details_stock.cmup) {
    //       return this.form.quantity * this.form.details_stock?.cmup;
    //     } else {
    //       return (
    //         this.form.quantity * this.form.details_stock?.product.public_price
    //       );
    //     }
    //   } else if (this.form.total_amount != null) {
    //     return this.form.total_amount;
    //   } else {
    //     return 0;
    //   }
    // },

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

    reason_movementErrors() {
      let errors = [];
      if (!this.$v.form.reason_movement.$dirty) return errors;
      !this.$v.form.reason_movement.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.reason_movement.required"
          )
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.stock_movement.cols.name.unique")
      //   );
      return errors;
    },
    product_codeErrors() {
      let errors = [];
      if (!this.$v.form.product_code.$dirty) return errors;

      // !this.$v.form.product_code.required &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.stock_movement.cols.product_code.required")
      //   );

      !this.$v.form.product_code.product_code &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.product_code.invalid"
          )
        );

      !this.$v.form.product_code.unique &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.product_code.unique"
          )
        );
      return errors;
    },
    type_movementErrors() {
      let errors = [];
      if (!this.$v.form.type_movement.$dirty) return errors;
      !this.$v.form.type_movement.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.type_movement.required"
          )
        );
      return errors;
    },
    date_movementErrors() {
      let errors = [];
      if (!this.$v.form.date_movement.$dirty) return errors;
      !this.$v.form.date_movement.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.date_movement.required"
          )
        );
      return errors;
    },
    operation_dateErrors() {
      let errors = [];
      if (!this.$v.form.operation_date.$dirty) return errors;
      !this.$v.form.operation_date.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.stock_movement.cols.birthday.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.stock_movement.cols.total_amount.required"
          )
        );
      return errors;
    },
  },
  mounted() {
    this.getNoneMov();
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
  components: {
    DeleteItem,
  },
};
</script>
