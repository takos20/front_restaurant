<template>
  <v-dialog v-model="dialog.show" persistent max-width="900px">
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
                :label="$vuetify.lang.t('$vuetify.ordinance.cols.code.title')"
                prepend-inner-icon="mdi-code-array"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" v-if="this.form.id">
              <v-text-field
                v-model="form.date_ordinance"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.ordinance.cols.date_ordinance.title'
                  )
                "
                prepend-inner-icon="mdi-clock-start"
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" v-if="!this.form.id">
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                dense
                v-model="form.patient"
                :items="itemsPatient"
                :loading="isLoadingPatient"
                :search-input.sync="searchPatient"
                :label="
                  $vuetify.lang.t('$vuetify.ordinance.cols.patient.title')
                "
                color="primary"
                item-text="name"
                hide-no-data
                item-value="id"
                class="font-weight-bold"
                prepend-inner-icon="mdi-code-array"
                outlined
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                dense
                v-model="form.consultation"
                :items="itemsConsultation"
                :loading="isLoadingConsultation"
                :search-input.sync="searchConsultation"
                color="primary"
                item-text="code"
                :label="
                  $vuetify.lang.t('$vuetify.ordinance.cols.consultation.title')
                "
                hide-no-data
                item-value="id"
                class="font-weight-bold"
                clearable
                prepend-inner-icon="mdi-code-array"
                outlined
              ></v-autocomplete>
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
        :disabled="this.form.consultation === null"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                v-model="formDetails.product"
                :items="itemsProduct"
                :loading="isLoadingProduct"
                :search-input.sync="searchProduct"
                color="primary"
                item-text="product_name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.ordinance.cols.product.title')
                "
                class="font-weight-bold"
                outlined
                dense
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-text-field
                v-model="formDetails.qteDosage"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.ordinance.cols.qteDosage.title')
                "
                class="font-weight-bold ml-1"
                outlined
                dense
                type="number"
                :rules="[numberRuleQteServed]"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-row>
                <v-col cols="12" sm="9">
                  <v-autocomplete
                    v-model="formDetails.dosage"
                    :items="itemsDosage"
                    :loading="isLoadingDosage"
                    :search-input.sync="searchDosage"
                    color="primary"
                    item-text="title"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.ordinance.cols.dosage.title')
                    "
                    class="font-weight-bold"
                    outlined
                    dense
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-btn
                    class="mt-3"
                    dark
                    dense
                    @click="createDosage()"
                    color="primary"
                    max-width="2px"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
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
                    v-on="on"
                    class="font-weight-bold mr-5"
                    max-width="1px"
                    :disabled="
                      formDetails.product === null ||
                      form.consultation === null ||
                      formDetails.qteDosage === null ||
                      formDetails.dosage === null
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
            dark
            :loading="loadingBtn"
            :disabled="
              form.consultation === null ||
              form.patient === null ||
              this.items.length === 0
            "
          >
            <v-icon> mdi-content-save </v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.save") }}
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
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
          <template v-slot:header.product="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.qteDosage="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.dosage="{ header }">
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
                    {{ item.product.product_name }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.qteDosage }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.dosage.title }}
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
                            <v-icon mdi-18px>mdi-update</v-icon>
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
        <form-dosage
          :dialog="dialogFormDosage"
          :form="form"
          :messages="messagesDosage"
          ref="dosageForm"
        ></form-dosage>
        <form-qte
          :dialog="dialogFormQteDosage"
          :form="form"
          :messages="messagesQte"
          ref="qteDosageForm"
        ></form-qte>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItemsDetails"
        ></delete-item>
      </v-card-text>
    </v-card>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
import FormDosage from "./FormDosage";
import FormQte from "./FormQte";
import DeleteItem from "@/components/Common/Delete";
// const FileSaver = require("file-saver");
// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          date_ordinance: null,
          medication: null,
          product: null,
          dosage: null,
          qteDosage: null,
          patient: null,
        };
      },
    },
  },
  data: () => ({
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    dialogFormQteDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    formDetails: {
      type: Object,
      default: function () {
        return {
          id: null,
          dosage: null,
          qteDosage: null,
          product: null,
        };
      },
    },
    dialogFormDosage: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    medication: [],
    optionsMedication: {
      text: {
        nameDrug: "",
        dosageDrug: "",
        formDrug: "",
        nberTimesDay: "",
        qteDrug: "",
      },
    },
    end_appointment_date: false,
    start_appointment_date: false,
    menu: false,
    menu3: false,
    urlItems: "ordinances",
    urlPatients: "patients",
    urlQteDosage: "qte_dosages",
    urlDosage: "dosages",
    isLoadingPatient: false,
    isLoadingQteDosage: false,
    isLoadingDosage: false,
    isLoadingConsultation: false,
    urlConsultation: "consultations",
    searchConsultation: null,
    itemsConsultation: [],
    searchPatient: null,
    itemsPatient: [],
    itemsQteDosage: [],
    itemsDosage: [],
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
    isLoadingProduct: false,
    searchProduct: null,
    searchQteDosage: null,
    searchDosage: null,
    menu2: false,
    supply: false,
    active: false,
    menu4: false,
    isInventory: false,
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPdf: {
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
    urlItemsDetails: "details_ordinances",
  }),
  watch: {
    searchProduct(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingProduct = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingProduct = false));
    },
    searchQteDosage(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingQteDosage = true;
      this.$store
        .dispatch("request", {
          url: self.urlQteDosage,
          params: params,
        })
        .then((response) => {
          self.itemsQteDosage = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingQteDosage = false));
    },
    searchDosage(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingDosage = true;
      this.$store
        .dispatch("request", {
          url: self.urlDosage,
          params: params,
        })
        .then((response) => {
          self.itemsDosage = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingDosage = false));
    },
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPatients,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchConsultation(value) {
      if (value === null) return;
      const params = { code: value, patient: this.form.patient };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlConsultation,
          params: params,
        })
        .then((response) => {
          self.itemsConsultation = response.data.content;
        })
        .finally(() => (this.isLoading = false));
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
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails + "/" + item.id;
      this.dialogDelete.show = true;
    },
    createQteDosage() {
      this.dialogFormQteDosage.show = true;
      this.messagesQte = {
        title: "$vuetify.qteDosage.new.title",
        submit: "$vuetify.qteDosage.new.submit",
        success: "$vuetify.qteDosage.new.success",
      };
    },
    createDosage() {
      this.dialogFormDosage.show = true;
      this.messagesDosage = {
        title: "$vuetify.dosage.new.title",
        submit: "$vuetify.dosage.new.submit",
        success: "$vuetify.dosage.new.success",
      };
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.send();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.ordinance.cols.product.title",
          value: "product",
          align: "start",
          sortable: false,
          width: "70",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.ordinance.cols.qteDosage.title",
          value: "qteDosage",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.ordinance.cols.dosage.title",
          value: "dosage",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "70",
        },
      ];
    },
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getDataFormdetails() {
      let data = {
        product:
          this.formDetails.id === undefined
            ? this.formDetails.product
            : this.formDetails.product["id"],
        qteDosage: this.formDetails.qteDosage,
        dosage:
          this.formDetails.id === undefined
            ? this.formDetails.dosage
            : this.formDetails.dosage["id"],
      };

      return data;
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails + "/" + this.form.id;
      } else {
        return this.urlItemsDetails;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PATCH" : "POST";
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
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            if (this.getMethod() === "PATCH") {
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    resetDataForm() {
      this.items = [];
      this.form.id = null;
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
    addColumnMedication() {
      this.medication.push({ ...this.optionsMedication.text });
    },
    removeColumnMedication(index) {
      this.medication.splice(index, 1);
    },
    createPatient() {
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
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient: this.form.patient,
        consultation: this.form.consultation,
      };
      return data;
    },
    resetDataFormProduct() {
      this.formDetails.product = null;
      this.formDetails.qteDosage = null;
      this.formDetails.dosage = null;
      this.items = [];
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
      this.formDetails.id = item.id;
      this.formDetails.product = item.product;
      this.formDetails.qteDosage = item.qteDosage;
      this.formDetails.dosage = item.dosage;
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
            url: self.urlItemsDetails + "?ordinance=" + this.form.id,
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
    send() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails + "?ordinance=reset",
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
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
            self.resetDataFormProduct();
            this.getItemsDetails();
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
    setForm(item) {
      (this.medication = item.medication),
        // Données envoyées lors de la modification
        (this.form.id = item.id);
      this.form.code = item.code;
      this.form.date_ordinance = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.consultation = item.consultation["id"];
      this.itemsConsultation.push(item.consultation);
      this.getItemsDetails();
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.name.unique")
        );

      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;
      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.price.required")
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.form.quote_external.$dirty) return errors;

      !this.$v.form.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.prescription.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.prescription.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: {
    FormQte,
    FormPdf,
    FormDosage,
    DeleteItem,
  },
};
</script>
