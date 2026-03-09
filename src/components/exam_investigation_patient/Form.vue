<template>
  <v-dialog v-model="dialog.show" persistent max-width="480px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form style="margin-top: 15px" @submit.prevent="save">
        <v-card-text>
          <v-row wrap>
            <!--            <v-col cols="12" sm="3" class="mb-0 py-0">-->
            <!--              <v-text-field-->
            <!--                v-model="form.code"-->
            <!--                color="primary"-->
            <!--                :label="$vuetify.lang.t('$vuetify.ordinance.cols.code.title')"-->
            <!--                prepend-inner-icon="mdi-code-array"-->
            <!--                class="font-weight-bold"-->
            <!--                outlined-->
            <!--                dense-->
            <!--                filled-->
            <!--                readonly-->
            <!--              ></v-text-field>-->
            <!--            </v-col>-->
            <!--            <v-col-->
            <!--              cols="12"-->
            <!--              sm="8"-->
            <!--              class="mb-0 py-0"-->
            <!--              v-if="this.form.id === null"-->
            <!--            >-->
            <!--            </v-col>-->
            <!--            <v-col-->
            <!--              cols="12"-->
            <!--              sm="5"-->
            <!--              class="mb-0 py-0"-->
            <!--              v-if="this.form.id !== null"-->
            <!--            >-->
            <!--            </v-col>-->
            <!--            <v-col-->
            <!--              cols="12"-->
            <!--              sm="4"-->
            <!--              class="mb-0 py-0"-->
            <!--              v-if="this.form.id !== null"-->
            <!--            >-->
            <!--              <v-text-field-->
            <!--                v-model="form.date"-->
            <!--                color="primary"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t(-->
            <!--                    '$vuetify.ordinance.cols.date_ordinance.title'-->
            <!--                  )-->
            <!--                "-->
            <!--                prepend-inner-icon="mdi-clock-start"-->
            <!--                class="font-weight-bold"-->
            <!--                outlined-->
            <!--                dense-->
            <!--              ></v-text-field>-->
            <!--            </v-col>-->
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-textarea
                v-model="form.results"
                @blur="$v.form.results.$touch()"
                @input="$v.form.results.$touch()"
                :error-messages="resultsErrors"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.radiography.cols.results.title')
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="6"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.radiography.cols.results.title")
                  }}
                </template>
              </v-textarea>
            </v-col>
            <!--            <v-col cols="12" sm="12" class="mb-0 py-0" style="margin-top: -15px">-->
            <!--              <v-file-input-->
            <!--                  v-model="files"-->
            <!--                  small-chips-->
            <!--                  :show-size="1000"-->
            <!--                  counter-->
            <!--                  placeholder="Select your files"-->
            <!--                  multiple-->
            <!--                  accept="image/*"-->
            <!--                  clearable-->
            <!--                  :label="-->
            <!--                  $vuetify.lang.t('$vuetify.radiography.cols.image.title')-->
            <!--                "-->
            <!--                  @change="fileAdded"-->
            <!--              >-->
            <!--                <template v-slot:selection="{ text, index }">-->
            <!--                  <v-chip-->
            <!--                      small-->
            <!--                      text-color="white"-->
            <!--                      color="#295671"-->
            <!--                      close-->
            <!--                      @click:close="remove(index)"-->
            <!--                  >-->
            <!--                    {{ text }}-->
            <!--                  </v-chip>-->
            <!--                </template>-->
            <!--              </v-file-input>-->
            <!--              &lt;!&ndash;                  <v-file-input&ndash;&gt;-->
            <!--              &lt;!&ndash;                    accept="image/png"&ndash;&gt;-->
            <!--              &lt;!&ndash;                    prepend-icon="mdi-camera"&ndash;&gt;-->
            <!--              &lt;!&ndash;                    :label="&ndash;&gt;-->
            <!--              &lt;!&ndash;                      $vuetify.lang.t(&ndash;&gt;-->
            <!--              &lt;!&ndash;                        '$vuetify.alerts.cols.attachments.title'&ndash;&gt;-->
            <!--              &lt;!&ndash;                      )&ndash;&gt;-->
            <!--              &lt;!&ndash;                    "&ndash;&gt;-->
            <!--              &lt;!&ndash;                    @change="selectFile"&ndash;&gt;-->
            <!--              &lt;!&ndash;                  >&ndash;&gt;-->
            <!--              &lt;!&ndash;                  </v-file-input>&ndash;&gt;-->

            <!--              &lt;!&ndash;                <v-text-field&ndash;&gt;-->
            <!--              &lt;!&ndash;                    v-model="form.logo"&ndash;&gt;-->
            <!--              &lt;!&ndash;                    color="primary"&ndash;&gt;-->
            <!--              &lt;!&ndash;                    :label="$vuetify.lang.t('$vuetify.hospitals.cols.logo.title')"&ndash;&gt;-->
            <!--              &lt;!&ndash;                    class="font-weight-bold"-->
            <!--              outlined-->
            <!--          dense&ndash;&gt;-->
            <!--              &lt;!&ndash;                ></v-text-field>&ndash;&gt;-->
            <!--              <br />-->
            <!--            </v-col>-->
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItemsDetails="getItemsDetails"
    ></delete-item>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    <form-attachment
      :dialog="dialogFormAttachment"
      ref="attachmentForm"
      :form="form"
      :messages="messages"
      @getItems="getItemsDetails"
    ></form-attachment>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
import FormAttachment from "./attachmentAlert";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
import DeleteItem from "@/components/Common/Delete";
// const FileSaver = require("file-saver");
// import {mapGetters} from "vuex";
// import { required, maxLength } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
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
          exam_investigation: null,
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
          exam_investigation: null,
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
    urlItems: "details_exam_investigations",
    urlPatients: "patients",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    headers: [],
    previousFiles: [],
    files: [],
    items: [],
    meta: {},
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    loading: false,
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
      success: "$vuetify.diagnostic.delete.success",
    },
    dialogFormAttachment: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
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
    isLoadingExam_investigation: false,
    searchExam_investigation: null,
    itemsExam_investigation: [],
    urlDiagnostic: "exam_investigations",
    urlItemsDetails: "details_exam_investigations",
  }),
  watch: {},
  created() {},
  validations() {
    let validators = {
      form: {
        results: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    fileAdded() {
      if (this.previousFiles.length > 0) {
        this.files.push(...this.previousFiles);
      }
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails + "/" + item.id;
      this.dialogDelete.show = true;
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.send();
    },
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getDataFormdetails() {
      let data = {
        exam_investigation:
          this.formDetails.id === undefined
            ? this.formDetails.exam_investigation
            : this.formDetails.exam_investigation["id"],
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    resetDataForm() {
      this.items = [];
      this.form.results = null;
      this.form.exam_investigation = null;
      this.form.doctor = null;
      this.form.patient = null;
      this.form.image = null;
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
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        patient: this.form.patient,
        exam_investigation: this.form.exam_investigation,
        results: this.form.results,
        doctor: this.form.doctor,
      };
      return data;
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
    showAttachment(item) {
      this.dialogFormAttachment.show = true;
      this.$refs.attachmentForm.setForm(item);
      // this.$router.push({
      //   name: "notification",
      //   params: { id: item.id }
      // });
    },
    editDetails(item) {
      // console.log(item.product)
      this.formDetails.id = item.id;
      this.formDetails.exam_investigation = item.exam_investigation;
      this.formDetails.results = item.results;
      this.setItemsFile(item.attachments);
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
              self.urlItemsDetails +
              "?exam_investigation_patient=" +
              this.form.id,
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
            url: self.urlItemsDetails + "?exam_investigation_patient=reset",
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    resetDataFormRadiography() {
      this.formDetails.exam_investigation = null;
      this.formDetails.results = null;
      this.file = [];
      this.items = [];
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
            response.data;
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            // let blob = new Blob([response.data], { type: response.data.type });
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
            if (this.getMethod() === "PUT") {
              self.$emit("getItemsDetails");
            } else {
              self.$emit("getItemsDetails");
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
    setItemsFile(use) {
      let self = this;
      self.files = [];
      // self.previousFiles = [];
      use.forEach((content) => {
        self.files.push({ name: content.file.split("/").slice(-1)[0] });
        // self.previousFiles.push({name:content.file.split("/").slice(-1)[0]});
      });
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.results = item.results;
      this.form.date = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient;
      this.itemsPatient.push(item.patient);
      this.form.exam_investigation = item.exam_investigation["id"];
      this.itemsExam_investigation.push(item.exam_investigation);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    resultsErrors() {
      let errors = [];
      if (!this.$v.form.results.$dirty) return errors;
      !this.$v.form.results.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.results.required")
        );
      return errors;
    },
  },
  components: {
    FormPdf,
    FormAttachment,
    DeleteItem,
  },
};
</script>
