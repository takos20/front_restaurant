<template>
  <v-dialog v-model="dialog.show" persistent max-width="900px">
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
    <!--    <v-card class="pb-1">-->
    <!--      <v-card-actions>-->
    <!--        <v-spacer></v-spacer>-->
    <!--        &lt;!&ndash;        <v-btn dark color="primary" @click="exportPrint()">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <v-icon color="white" left>mdi-printer</v-icon>&ndash;&gt;-->
    <!--        &lt;!&ndash;          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}&ndash;&gt;-->
    <!--        &lt;!&ndash;        </v-btn>&ndash;&gt;-->
    <!--        <v-btn dark color="primary" @click="exportPDF()">-->
    <!--          <v-icon color="white" left>mdi-file</v-icon>-->
    <!--          {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}-->
    <!--        </v-btn>-->
    <!--      </v-card-actions>-->
    <!--    </v-card>-->
    <v-card style="margin-top: 1px">
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
        >
          <template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.product_name="{ header }">
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
          <!-- <template v-slot:header.normal_value="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.interpretation="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>        
          <template v-slot:header.conclusion="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>           -->
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
                    {{ item.diagnostic ? item.diagnostic.code : "-" }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.diagnostic ? item.diagnostic.title : "-" }}
                  </td>
                  <td class="subtitle-2">{{ item.results }}</td>
                  <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
                  <td class="subtitle-2">{{ item.interpretation }}</td>
                  <td class="subtitle-2">{{ item.conclusion }}</td> -->

                  <td class="subtitle-2" width="50px">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editLaboratoryPatient(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-grease-pencil</v-icon>
                          </v-btn>
                        </template>
                        <span>{{
                          $vuetify.lang.t(
                            "$vuetify.diagnostic.cols.results.title"
                          )
                        }}</span>
                      </v-tooltip>
                      <!-- <v-tooltip bottom>
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
                      </v-tooltip> -->
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
    <form-laboratory
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItemsDetails="getItemsDetails"
      ref="laboratoryPatientForm"
    ></form-laboratory>
    <!-- <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf> -->
    <!--    <pdf :src="pdfsrc"></pdf>-->
  </v-dialog>
</template>

<script>
import FormLaboratory from "./Form";
// import axios from "axios";c
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
// import FormPdf from "./../bills/Pdf";
const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {},
  data: () => ({
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
    dialogFormPermit: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    dialogForm: {
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
    urlItems: "diagnostic_patients",
    urlItemsDetails_bills: "details_diagnostics",
  }),
  watch: {},
  created() {
    this.setHeaders();
    this.getItemsDetails();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    // editPdf(objectUrl) {
    //   this.dialogFormPdf.show = true;
    //   this.$refs.pdfForm.setForm(objectUrl);
    // },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
    },
    exportPDF() {
      let self = this;
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print" + "?id=" + this.form.id,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Resultats_examens_" + this.form.patient;
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
    setHeaders() {
      this.getItemsDetails();
      this.headers = [
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.laboratory.cols.results.title",
          value: "results",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.laboratory.cols.normal_value.title",
        //   value: "normal_value",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.interpretation.title",
        //   value: "interpretation",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        // {
        //   text: "$vuetify.laboratory.cols.conclusion.title",
        //   value: "conclusion",
        //   align: "start",
        //   sortable: false,
        //   width: "120",
        //   class: "grey--text text--darken-3"
        // },

        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "80",
        },
      ];
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    editLaboratoryPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.laboratory.update.title",
        submit: "$vuetify.laboratory.update.submit",
        success: "$vuetify.laboratory.update.success",
      };
      this.$refs.laboratoryPatientForm.setForm(item);
    },

    setForm(item) {
      console.log(item.id);

      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.patient = item.patient.name;
      console.log(this.form.bills);
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
            url:
              self.urlItemsDetails_bills +
              "?diagnostic_patient=" +
              this.form.bills,
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
  },
  computed: {},
  components: {
    DeleteItem,
    FormLaboratory,
  },
};
</script>
