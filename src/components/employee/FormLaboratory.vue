<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
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
            <v-col cols="12" sm="3" class="mb-0 py-0">
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
            <v-col
              cols="12"
              sm="8"
              class="mb-0 py-0"
              v-if="this.form.id === null"
            >
            </v-col>
            <v-col
              cols="12"
              sm="5"
              class="mb-0 py-0"
              v-if="this.form.id !== null"
            >
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="mb-0 py-0"
              v-if="this.form.id !== null"
            >
              <v-text-field
                v-model="form.date"
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
            <v-col cols="12" sm="6" class="mb-0 py-0">
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
            <v-col
              cols="12"
              sm="6"
              class="mb-0 py-0"
              :disabled="this.$auth.user().role !== 'DOCTOR'"
            >
              <v-autocomplete
                v-model="form.doctor"
                :items="itemsDoctor"
                :loading="isLoadingDoctor"
                :search-input.sync="searchDoctor"
                color="primary"
                item-text="name"
                item-value="id"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.dealing_with.title')
                "
                prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
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
        <v-divider class="mx-4" style="margin-top: -10px"></v-divider>
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
          <template v-slot:header.laboratory="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.results="{ header }">
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
                    {{ item.laboratory.title }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.results }}
                  </td>
                  <!--                  <td class="subtitle-2">-->
                  <!--                    {{ $moment(item.createdAt).format("YYYY-MM-DD") }}-->
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
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
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
          date: null,
          laboratory: null,
          results: null,
          doctor: null,
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
    formDetails: {
      type: Object,
      default: function () {
        return {
          id: null,
          results: null,
          laboratory: null,
        };
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu3: false,
    urlDoctor: "doctors",
    itemsDoctor: [],
    isLoadingDoctor: false,
    searchDoctor: null,
    urlItems: "laboratory_patients",
    urlPatients: "patients",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
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
    isLoadingLaboratory: false,
    searchLaboratory: null,
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
      success: "$vuetify.laboratory.delete.success",
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
    itemsLaboratory: [],
    urlLaboratory: "laboratories",
    urlItemsDetails: "details_laboratories",
  }),
  watch: {
    searchLaboratory(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingLaboratory = true;
      this.$store
        .dispatch("request", {
          url: self.urlLaboratory,
          params: params,
        })
        .then((response) => {
          self.itemsLaboratory = response.data.content;
          // console.log(response.data.content);
        })
        .finally(() => (this.isLoadingLaboratory = false));
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
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDoctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctor,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoadingDoctor = false));
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
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.send();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.laboratory.title",
          value: "laboratory",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.radiography.cols.results.title",
          value: "results",
          align: "start",
          sortable: false,
          width: "160",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "10",
        },
      ];
    },
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getDataFormdetails() {
      let data = {
        laboratory:
          this.formDetails.id === undefined
            ? this.formDetails.laboratory
            : this.formDetails.laboratory["id"],
        results: this.formDetails.results,
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    resetDataForm() {
      this.medication = [];
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
        doctor: this.form.doctor,
      };
      return data;
    },
    resetDataFormCheckup() {
      this.formDetails.laboratory = null;
      this.formDetails.results = null;
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
      this.formDetails.laboratory = item.laboratory;
      this.formDetails.results = item.results;
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
            url: self.urlItemsDetails + "?laboratory_patient=" + this.form.id,
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
            url: self.urlItemsDetails + "?laboratory_patient=reset",
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
            self.resetDataFormCheckup();
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
      this.form.date = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);

      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.getItemsDetails();
    },
  },
  computed: {},
  components: {},
};
</script>
