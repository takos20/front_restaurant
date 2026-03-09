<template>
  <div>
    <div
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_movement')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes($auth.user().permissions, 'add_stock_movement')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="create_movement()"
              color="primary"
              dark
            >
              <v-icon> mdi-plus </v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loadingStockMovement.refresh"
            @click="refresh_stock_movement()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <!-- <v-btn
            color="teal darken-1"
            @click="showExportMovement()"
            class="white--text"
          >
            {{ $vuetify.lang.t("$vuetify.product.cols.export.title") }}

            <v-icon right dark>mdi-export-variant</v-icon>
          </v-btn> -->
          <v-spacer></v-spacer>
        </div>
      </v-card>
      <br />
      <v-card class="pb-4">
        <v-card-title>
          <div class="title">
            {{ $vuetify.lang.t("$vuetify.stock_movement.filter") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-select
                v-model="filter.type_movement"
                color="primary"
                :items="optionMovement.type_Movement"
                :label="
                  $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                "
                dense
                prepend-inner-icon="mdi-account-supervisor-circle"
                outlined
                @change="performFilterMovement"
                class="font-weight-bold"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <!-- <v-card-actions style="margin-top: -30px">
          <v-spacer></v-spacer>
          <v-btn dark color="primary" @click="exportPrint()">
            <v-icon color="white" left>mdi-printer</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <v-btn dark color="primary" @click="performExportMovement">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn>
        </v-card-actions> -->
      </v-card>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersStock_movement"
          :items="itemsStock_movement"
          :items-per-page="itemPerPage"
          :loading="loading.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.date_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.type_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.reason_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.movement_value="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.is_valid="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.create_date="{ header }">
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
            <v-hover>
              <tbody slot-scope="{ hover }">
                <tr :key="item.id" v-for="item in items">
                  <td class="subtitle-2">{{ item.code }}</td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2">
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="item.type_movement === 'ENTRY'"
                      >
                        <v-icon
                          color="teal darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon> </template
                      ><template
                        v-slot:activator="{ on }"
                        v-else-if="item.type_movement === 'TRANSFER'"
                      >
                        <v-icon
                          color="green darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                      <template v-slot:activator="{ on }" v-else>
                        <v-icon
                          color="red accent-4"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </td>
                  <td class="subtitle-2">
                    {{ item.reason_movement }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.product_code }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.movement_value }}
                  </td>
                  <td>
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <template v-if="item.is_valid">
                          <v-icon
                            color="primary"
                            class="pointer"
                            dark
                            v-on="on"
                          >
                            mdi-check-circle
                          </v-icon>
                        </template>
                        <template v-else>
                          <v-icon
                            color="red accent-4"
                            v-on="on"
                            class="pointer"
                            dark
                            :disabled="item.type_movement !== 'TRANSFER'"
                            @click="enabled(item)"
                          >
                            mdi-close-circle
                          </v-icon>
                        </template>
                      </template>
                      <span v-if="!item.is_valid">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.stock_movement.cols.is_valid.enabled"
                          )
                        }}
                      </span>
                    </v-tooltip>
                  </td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2">
                    <template>
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes(
                              $auth.user().permissions,
                              'change_stock_movement'
                            )
                          "
                        >
                          <v-btn
                            @click="editStock_movement(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon>mdi-update</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes(
                              $auth.user().permissions,
                              'view_complaints'
                            )
                          "
                        >
                          <v-btn
                            @click="viewComplaints(item)"
                            color="btn_logout"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon>mdi-note-text</v-icon>
                          </v-btn>
                        </template>
                        <span>{{
                          $vuetify.lang.t("$vuetify.complaints.title")
                        }}</span>
                      </v-tooltip>
                      <!--                    <v-tooltip top>-->
                      <!--                      <template-->
                      <!--                        v-slot:activator="{ on }"-->
                      <!--                        v-if="$auth.check(['ADMIN'])"-->
                      <!--                      >-->
                      <!--                        <v-icon-->
                      <!--                          @click="detailsCash(item)"-->
                      <!--                          color="secondary"-->
                      <!--                          v-on="on"-->
                      <!--                          dark-->
                      <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                      <!--                        >-->
                      <!--                          mdi-clipboard-outline-->
                      <!--                        </v-icon>-->
                      <!--                      </template>-->
                      <!--                      <span>-->
                      <!--                        {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}-->
                      <!--                      </span>-->
                      <!--                    </v-tooltip>-->
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes(
                              $auth.user().permissions,
                              'delete_stock_movement'
                            )
                          "
                        >
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                            dark
                          >
                            <v-icon>mdi-delete-outline</v-icon>
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
        <form-complaints
          :dialog="dialogFormComplaints"
          :form="form"
          :messages="messages"
          @getItems="getItems"
          ref="complaintsForm"
        ></form-complaints>
        <form-movement
          :dialog="dialogFormStock_movement"
          :form="form"
          :messages="messages"
          @getItems="get_stock_movement"
          ref="stock_movementForm"
        ></form-movement>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItems"
        ></delete-item>
        <form-inv :dialog="dialogFormInv" ref="invForm"></form-inv>
        <form-enable
          :dialog="dialogForm"
          ref="enableUser"
          :messages="messages"
          @getItems="get_stock_movement"
        ></form-enable>
      </v-card>
    </div>
  </div>
</template>

<script>
import FormEnable from "./../stock_management/Vilidate_stock.vue";
import ListMixin from "../../mixins/Common/List.vue";
// import FormUser from "./Form";
import DeleteItem from "./../Common/Delete";
import FormMovement from "./FormMovement";
import FormComplaints from "./../complaints/FormStock_mov";
import FormInv from "./IsInventory";
const FileSaver = require("file-saver");
// import VueJsonToCsv from "vue-json-to-csv";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  mixins: [ListMixin],
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      start_date: null,
      end_date: null,
      product: null,
      productAvailable: null,
      date: null,
      optionExport: null,
    },
    optionMovement: {
      type_Movement: [],
    },
    itemsStock_movement: [],
    headersStock_movement: [],
    itemsProduct: [],
    isInventory: false,
    urlItemsCash: "cashs/isOpen",
    showStocks_movements: false,
    urlProduct: "products",
    urlProductPlus: "details_stocks/specify",
    urlItemsStock_movement: "details_stock_movement/get_items",
    urlItemsExportStock_movement: "stock_movements",
    urlItems: "stock_movements",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    search: null,
    isLoading: false,
    menu: false,
    optionsExport: {
      type_Export: [],
    },

    loadingBtn: false,
    loadingItemStock_movement: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingStockMovement: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    json_fields: {
      Code: "product.code",
      Name: "product.name",
      DCI: "product.dci1.name",
      Forme: "product.shape.name",
      Categorie: "product.category.name",
      Conditionnement: "product.conditioning",
      Quantite: "qte_stock",
      CMUP: "cmup",
      MontantT: "total",
    },
    dialogFormExportMovement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormFilterMov: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormStock_movement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    exports: {
      id: null,
      type_movement: null,
      email: null,
      code: null,
      password: null,
      role: null,
      is_active: null,
    },
    dialogFormComplaints: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    form: {
      type_movement: null,
      role: null,
    },
    filter: {
      type_movement: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.storage_depots.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus + "?storage_depots=" + this.$route.params.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    pagination: {
      handler() {
        this.get_stock_movement();
      },
      deep: true,
    },
  },
  created() {
    this.setHeadersStock_movement();
    this.get_options_export();
    this.getOptionsMovement();

    //this.setItemRoles();
  },
  methods: {
    enabled(item) {
      this.$refs.enableUser.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.stock_movement.cols.is_valid.enabled",
          submit: "$vuetify.stock_movement.update.submit",
          success: "$vuetify.stock_movement.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.stock_movement.cols.is_valid.desabled",
          submit: "$vuetify.stock_movement.update.submit",
          success: "$vuetify.stock_movement.update.success",
        };
      }
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          // let fileName = "Listes des Porduits";
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          // FileSaver.saveAs(blob, fileName);
          this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    exportPDF() {
      let self = this;
      const params = {};
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des produits";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    showExportMovement() {
      this.dialogFormExportMovement.shows.showFilter = true;
    },
    performExportMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItemsExportMovement();

      // .then(() => {
      //   self.$refs.exportForm.closeDialog();
      // })
      // .finally(() => {
      //   self.$refs.exportForm.stopLoadingBtn();
      // });
    },
    getItemsExportMovement() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des mouvements de stock";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExportMovement.shows.showFilter = false;
        });
    },
    currentInventory() {
      this.dialogFormInvent.show = true;
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
            self.isInventory = data.content.is_inventory;
            if (self.isInventory === true) {
              this.currentInventory();
            }
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    // searchBarcode() {
    //   axios
    //       .get('api/Products/SearchProductBarcode/' + this.code)
    //       .then(function(response) {
    //         this.addDetail(response.data)
    //       })
    //       .catch(function(error) {
    //         console.log(error)
    //       })
    // },
    resetDate() {
      this.formData.date = null;
      this.menu5 = false;
      this.$refs.menu5.save(this.formData.date);
    },
    get_options_export() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.export, (type_Export) => {
        self.optionsExport.type_Export.push({
          text: self.$vuetify.lang.t(type_Export.text),
          value: type_Export.value,
        });
      });
    },
    get_data_form() {
      let data = {
        product: this.formData.product.product["id"],
        end_date: this.formData.end_date,
        storage_depots: this.$route.params.id,
        start_date: this.formData.start_date,
      };
      return data;
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    refresh_stock_movement() {
      let self = this;
      this.loadingStockMovement.refresh = true;
      this.get_stock_movement()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingStockMovement.refresh = false;
        });
    },
    get_stock_movement() {
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
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?storage_depots=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsStock_movement = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content);
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
            self.loading.list = false;
            resolve();
          });
      });
    },
    setHeadersStock_movement() {
      this.headersStock_movement = [
        {
          text: "$vuetify.stock_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.type_movement.title",
          value: "type_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.reason_movement.title",
          value: "reason_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.movement_value.title",
          value: "movement_value",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.is_valid.title",
          value: "is_valid",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.users.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "12",
        },
      ];
    },
    create_movement() {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.new.title",
        submit: "$vuetify.stock_movement.new.submit",
        success: "$vuetify.stock_movement.new.success",
      };
    },
    editStock_movement(item) {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.update.title",
        submit: "$vuetify.stock_movement.update.submit",
        success: "$vuetify.stock_movement.update.success",
      };
      this.$refs.stock_movementForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    showFilterMovement() {
      this.dialogFormFilterMov.shows.showFilter = true;
    },
    viewComplaints(item) {
      this.dialogFormComplaints.show = true;
      this.messages = {
        title: "$vuetify.complaints.update.title",
        submit: "$vuetify.complaints.update.submit",
        success: "$vuetify.complaints.update.success",
      };
      this.$refs.complaintsForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self
        .getItems()
        .then(() => {
          self.$refs.filterForm.closeDialog();
        })
        .finally(() => {
          self.$refs.filterForm.stopLoadingBtn();
        });
    },
    performFilterMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.get_stock_movement();
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  computed: {
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.formData.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    get_product_code() {
      let product_code = "";
      product_code =
        this.formData.product === null
          ? ""
          : this.formData.product?.product.code;
      return product_code;
    },
  },
  mounted() {
    this.getOpenCash();
    this.get_stock_movement();
  },
  components: {
    FormMovement,
    FormInv,
    FormEnable,
    FormComplaints,
    DeleteItem,
  },
};
</script>

<style scoped></style>
