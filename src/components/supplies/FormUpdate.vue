<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="1300px"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <!--        <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])">-->
        <!--          <v-btn-->
        <!--            class="mr-1 my-2"-->
        <!--            color="primary"-->
        <!--            @click="createD()"-->
        <!--            dark-->
        <!--            dense-->
        <!--            small-->
        <!--            style="margin-left: -150px"-->
        <!--          >-->
        <!--            <v-icon dark>-->
        <!--              mdi-plus-->
        <!--            </v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.product.new.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <br />
      <v-form>
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.supplies.cols.code.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.supply_amount.title')
                "
                prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                :value="get_supply_amount"
                readonly
                filled
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" class="mb-0 py-0">
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
                :readonly="supply"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.supplies.cols.supplier.title"
                    ) +
                    " : " +
                    supplier
                  }}
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-btn
                class="mx-2"
                dark
                dense
                @click="createS()"
                color="primary"
                max-width="2px"
                v-if="
                  _.includes(this.$auth.user().permissions, 'add_suppliers')
                "
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <!-- <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.reference_no"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.reference_no.title')
                "
                prepend-inner-icon="mdi-scatter-plot mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                :disabled="form.suppliers == null"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.supplies.cols.reference_no.title")
                  }}
                </template>
              </v-text-field>
            </v-col> -->
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.storage_depots"
                :items="itemsDepot"
                :loading="isLoadingDepot"
                :search-input.sync="searchDepot"
                return-object
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.storage_depot.title')
                "
                prepend-inner-icon="mdi-archive mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.supplies.cols.storage_depot.title"
                    ) +
                    " : " +
                    warehouse
                  }}
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-text-field
                v-model="form.additional_info"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.supplies.cols.additional_info.title'
                  )
                "
                prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -10px"></v-divider>
      </v-form>
      <v-form @submit.prevent="saveDetails" style="margin-top: 10px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="5" class="mb-0 py-0">
              <v-autocomplete
                v-model="formData.ingredient"
                :items="itemsProduct"
                :loading="isLoading"
                :search-input.sync="search"
                color="primary"
                item-text="name"
                item-value="id"
                autofocus
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.recipe.cols.ingredient.title')
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.recipe.cols.ingredient.title")
                  }}
                </template>
              </v-autocomplete>
            </v-col>

            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-btn
                class="mx-2"
                dense
                light
                @click="createD()"
                color="primary"
                max-width="2px"
                :disabled="
                  !_.includes($auth.user().permissions, 'add_ingredient')
                "
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <!-- <v-col cols="12" sm="3" class="mb-0 py-0">
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
                      $vuetify.lang.t('$vuetify.product.cols.expiry_date.title')
                    "
                    prepend-inner-icon="mdi-clock-start"
                    class="font-weight-bold"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    readonly
                    dense
                    
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.product.cols.expiry_date.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="form.expiry_date"
                  color="primary"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col> -->
            <!-- <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
                "
                class="font-weight-bold"
                outlined
                dense
                v-model="get_product_code"
                readonly
                filled
              ></v-text-field>
            </v-col> -->

            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="formData.quantity"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.supplies.cols.quantity_gramme.title'
                  )
                "
                class="font-weight-bold"
                outlined
                @keyup.enter="saveDetails()"
                dense
                type="number"
                min="0"
                :disabled="formData.ingredient == null"
                :readonly="this.form.id !== null"
                :rules="[numberRule]"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t(
                      "$vuetify.supplies.cols.quantity_gramme.title"
                    )
                  }}
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-text-field
                v-model="formData.quantity_two"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.quantity.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :disabled="formData.ingredient == null"
                :readonly="this.form.id !== null"
                :rules="[numberRule]"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.total_amount.title')
                "
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :disabled="formData.ingredient == null"
                :rules="[numberRuleArrivalPrice]"
                v-model="formData.total_amount"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.supplies.cols.total_amount.title")
                  }}
                </template>
              </v-text-field>
            </v-col>
            <!-- <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="get_total_amount"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.supplies.cols.total_amount.title')
                "
                class="font-weight-bold"
                outlined
                :value="get_total_amount"
                dense
                readonly
                filled
              ></v-text-field>
            </v-col> -->

            <v-col cols="12" sm="1" class="mb-0 py-0">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <template>
                    <v-btn
                      color="primary"
                      :loading="loadingBtn"
                      light
                      type="submit"
                      dense
                      v-on="on"
                      small
                      max-width="2px"
                      style="margin-top: 3px"
                      :disabled="
                        formData.ingredient == null || formData.quantity == null || formData.total_amount== null
                      "
                    >
                      <v-icon dark> mdi-content-save </v-icon>
                      <!--{{ $vuetify.lang.t(messages.submit) }}-->
                    </v-btn>
                  </template>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="save()"
            class="mr-2"
            light
            :loading="loadingBtn"
            style="margin-top: -30px"
            :disabled="get_supply_amount === 0"
          >
            <v-icon> mdi-content-save </v-icon>
            {{ $vuetify.lang.t("$vuetify.supplies.new.submitSupplies") }}
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
          disable-pagination
          hide-default-footer
        >
          <template v-slot:header.product_name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_two="{ header }">
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
          <template v-slot:header.cmup="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.total_amount="{ header }">
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
                  {{ item.ingredient ? item.ingredient.name : "-" }}
                </td>
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.quantity"
                      dense
                      hide-details
                      type="number"
                    />
                  </div>
                  <div v-else>
                    {{Number(item.quantity).toFixed(0) }}
                  </div>
                </td>

                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.quantity_two"
                      dense
                      hide-details
                      type="number"
                      @keyup.enter="calculatedPuNet"
                    />
                  </div>
                  <div v-else>
                    {{ Number(item.quantity_two).toFixed(0) }}
                  </div>
                </td>
                <td class="subtitle-2">
                  {{ Number(item.unit_price).toFixed(1) }}
                </td>
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.total_amount"
                      dense
                      hide-details
                      type="number"
                      @keyup.enter="calculatedUnitPrice"
                    />
                  </div>
                  <div v-else>
                    {{ item.total_amount }}
                  </div>
                </td>
                <td class="text-h6 compact-td">
                  <template v-if="editedRowId === item.id">
                    <v-btn icon color="green" @click="saveRowEdit">
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn icon color="grey" @click="cancelRowEdit">
                      <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                  </template>
                  <template v-else-if="form.id == null">
                    <v-btn icon color="secondary" @click="editDetails(item)">
                      <v-icon>mdi-update</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="deleteItem(item)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                </td>
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
        <form-details
          :dialog="dialogFormDetails"
          :form="form"
          :messages="messages"
          @getItems="getItemsDetails"
          ref="detailsForm"
        ></form-details>
      </v-card-text>
    </v-card>
    <form-product :dialog="dialogForm" :messages="messages"></form-product>
    <form-inv :dialog="dialogFormInv" ref="invForm"></form-inv>
    <form-suppliers
      :dialog="dialogFormSupplies"
      :messages="messages"
    ></form-suppliers>
  </v-dialog>
</template>

<script>
import FormDetails from "./FormProductUpdate";
import FormProduct from "./../ingredient/Form";
import FormSuppliers from "./../suppliers/Form";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
import FormInv from "./../bills/IsInventory";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          supplies: null,
          total_amount: null,
          quantity: null,
          product: null,
          arrival_price: null,
          arrival_date: null,
          expiry_date: "null",
          warehouse_default: null,
          supplier_default: null,
          suppliers: null,
          reference_no: null,
          additional_info: null,
          supply_amount: null,
          is_accounted: null,
          code: null,
          storage_depots: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      id: null,
      supplies: null,
      total_amount: null,
      quantity: null,
      ingredient: null,
      quantity_two: null,
      consumable: null,
      reagent: null,
      arrival_price: null,
      arrival_date: null,
      suppliers: null,
      reference_no: null,
      additional_info: null,
      expiry_date: null,
      supply_amount: null,
      is_accounted: null,
      code: null,
      storage_depots: null,
    },
    isInventory: false,
    supplies: null,
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItemsNoneSupplies: "details_supplies/noneSupplies",
    headers: [],
    items: [],
    numberRule: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleArrivalPrice: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    meta: {},
    sum: "",
    editedRowId: null,
    next_beneficiary: "",
    current_contribution: "",
    warehouse: null,
    supplier: null,
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
    dialogFormSupplies: {
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
      success: "$vuetify.supplies.delete.success",
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

    itemsProduct: [],
    isLoading: false,
    search: null,
    optionType: {
      quantity_two: [],
    },
    urlProduct: "ingredients/all",
    isLoadingDepot: false,
    searchDepot: null,
    itemsDepot: [],
    urlDepot: "storage_depots/all",
    urlSuppliers: "suppliers/all",
    itemsSelectingWarehouse: [],
    itemsSelectingSupplier: [],
    itemsSuppliers: [],
    searchSuppliers: null,
    isLoadingSuppliers: false,
    urlReagent: "reagents",
    itemsReagent: [],
    searchReagent: null,
    isLoadingReagent: false,
    urlConsumable: "consumables",
    itemsConsumable: [],
    searchConsumable: null,
    isLoadingConsumable: false,
    urlItems: "supplies",
    urlItemsDetails_supplies: "details_supplies",
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
          await this.loadWarehouse();
          await this.loadSupplier();
          this.form.additional_info = "RAS"
          await this.getItemsDetails();
        }

        if (!val) {
          await this.deleteEmptySupply();
        }
      },
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
    searchReagent(value) {
      if (value === null) return;
      const params = { name: value };
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
      if (value === null) return;
      const params = { name: value };
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
    this.setHeaders();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    editDetails(item) {
      this.editedRowId = item.id;
      this.editedRow = { ...item }; // clone to prevent direct mutations
    },

    saveRowEdit() {
      // emit or update item in-place or via API
      this.editedRow.unit_price = this.calculatedUnitPrice;
      if (this.editedRow.ingredient) {
        this.editedRow.ingredient = this.editedRow.ingredient["id"];
      }
      
      if (this.editedRow.hospital) {
        this.editedRow.hospital = this.editedRow.hospital["id"];
      }
      this.editedRow.supplies = this.supplies;
      this.editedRow.storage_depots = this.form.storage_depots?.id ?? this.form.warehouse_default?.id ?? null;
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
    async loadWarehouse(value) {
      const params = { name: value, is_default: true };

      const response = await this.$store.dispatch("request", {
        url: this.urlDepot,
        params,
      });
      const warehouse = response.data.content?.[0];
      if (warehouse) {
        this.form.warehouse_default = warehouse;
        this.itemsSelectingWarehouse.push(warehouse);
        this.warehouse = warehouse.name;
      }

      return warehouse;
    },
    async loadSupplier(value) {
      const params = { name: value, is_default: true };

      const response = await this.$store.dispatch("request", {
        url: this.urlSuppliers,
        params,
      });
      const supplier = response.data.content?.[0];
      if (supplier) {
        this.form.supplier_default = supplier;
        this.itemsSelectingSupplier.push(supplier);
        this.supplier = supplier.name;
      }

      return supplier;
    },
    currentInventory() {
      this.dialogFormInv.show = true;
    },
    getNoneSupplies() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsNoneSupplies,
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
      this.deleteEmptySupply();
    },
    createEmptySupply() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: "supplies/create-empty",
            method: "POST",
          })
          .then((response) => {
            self.supplies = response.data.id;
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
            url: "supplies/" + this.supplies + "/delete-empty",
            method: "DELETE",
          })
          .then((response) => {
            resolve(response);
            // console.log("meta", data);
          });
      });
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_supplies + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.supplies.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "140",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.supplies.cols.quantity_gramme.title",
          value: "quantity",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.quantity.title",
          value: "quantity_two",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.unit_price.title",
          value: "cmup",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: false,
          width: "50",
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
          width: "70",
        },
      ];
    },
    createD() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.ingredient.new.title",
        submit: "$vuetify.ingredient.new.submit",
        success: "$vuetify.ingredient.new.success",
      };
    },
    createS() {
      this.dialogFormSupplies.show = true;
      this.messages = {
        title: "$vuetify.suppliers.new.title",
        submit: "$vuetify.suppliers.new.submit",
        success: "$vuetify.suppliers.new.success",
      };
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        supplies: this.supplies,
        reference_no: this.form.reference_no,
        suppliers: this.form.suppliers?.id ??
          this.form.supplier_default?.id ??
          null,
        additional_info: this.form.additional_info,
        storage_depots:
          this.form.storage_depots?.id ??
          this.form.warehouse_default?.id ??
          null,
        supply_amount: this.get_supply_amount,
      };
      return data;
    },
    resetDataFormProduct() {
      this.formData.ingredient = null;
      this.formData.quantity = null;
      this.formData.quantity_two = null;
      this.formData.arrival_price = null;
      this.formData.total_amount = null;
    },
    resetDataForm() {
      this.form.product = null;
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

    getDataFormdetails() {
      let data = {
        quantity_two: this.formData.quantity_two,
        supplies: this.supplies,
        ingredient: this.formData.ingredient
          ? this.formData.ingredient["id"]
          : this.formData.ingredient,
        supply_amount: this.get_supply_amount,
        quantity: this.formData.quantity,
        total_amount: this.formData.total_amount,
        reference_no: this.form.reference_no,
        suppliers: this.form.suppliers?.id ??
          this.form.supplier_default?.id ??
          null,
        additional_info: this.form.additional_info,
        storage_depots:
          this.form.storage_depots?.id ??
          this.form.warehouse_default?.id ??
          null,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.supplies = item.id;

      this.form.arrival_date = item.createdAt + " " + item.timeAt;
      this.form.supply_amount = item.supply_amount;
      this.form.additional_info = item.additional_info;
      this.form.code = item.code;
      this.form.suppliers = item.suppliers
        ? item.suppliers["id"]
          ? item.suppliers["id"]
          : item.suppliers
        : item.suppliers;
      this.itemsSuppliers.push(item.suppliers);
      // this.form.consumable = item.consumable?item.consumable["id"]:null;
      // this.itemsConsumable.push(item.consumable?item.consumable["id"]:null);
      // this.form.reagent = item.reagent?item.reagent["id"]:null;
      // this.itemsReagent.push(item.reagent?item.reagent["id"]:null);
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_supplies + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_supplies;
      }
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
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
            url: self.urlItemsDetails_supplies + "?supplies=" + this.supplies,
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
      console.log(this.getDataFormdetails());
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
    calculatedUnitPrice() {
      return (
        (this.editedRow.total_amount || 0) / (this.editedRow.quantity || 0)
      );
    },
    // get_product_code() {
    //   let product_code = "";
    //   product_code =
    //     this.formData.product === null ? "" : this.formData.product?.code;
    //   return product_code;
    // },
    get_product_price() {
      let product_price = "";
      product_price = this.formData.product
        ? this.formData.product.public_price
        : this.formData.reagent
        ? this.formData.reagent.public_price
        : this.formData.consumable
        ? this.formData.consumable.public_price
        : this.formData.consumable;
      return product_price;
    },
    get_supply_amount() {
      let total = 0;
      this.items.forEach((d) => {
        total += d.total_amount;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_total_amount() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.formData.arrival_price) {
        return this.formData.quantity * this.formData.arrival_price;
      } else {
        return this.formData.quantity * this.get_product_price;
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
    // product_codeErrors() {
    //   let errors = [];
    //   if (!this.$v.form.product_code.$dirty) return errors;

    //   // !this.$v.form.product_code.required &&
    //   //   errors.push(
    //   //     this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.required")
    //   //   );

    //   !this.$v.form.product_code.product_code &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.invalid")
    //     );

    //   !this.$v.form.product_code.unique &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.supplies.cols.product_code.unique")
    //     );
    //   return errors;
    // },
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
    this.getNoneSupplies();
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
    FormProduct,
    FormInv,
    FormSuppliers,
    FormDetails,
  },
};
</script>
