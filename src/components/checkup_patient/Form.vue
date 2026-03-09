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
      <v-form style="margin-top: 15px" @submit.prevent="save">
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
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-textarea
                v-model="formDetails.results"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.radiography.cols.results.title')
                "
                prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                rows="3"
              ></v-textarea>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItems="getItemsDetails"
    ></delete-item>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormPdf from "./../bills/Pdf";
// import DatePickerend from "../appointment/date-picker-end.vue";
// import DatePickerstart from "../appointment/date-picker-start.vue";
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
          date: null,
          checkup: null,
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
          checkup: null,
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
    urlItems: "checkup_patients",
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
      success: "$vuetify.checkup.delete.success",
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
    isLoadingCheckup: false,
    searchCheckup: null,
    itemsCheckup: [],
    urlCheckup: "checkups",
    urlItemsDetails: "details_checkups",
  }),
  watch: {},
  created() {},
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
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
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
            response;
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            // let blob = new Blob([response.data], { type: response.data.type });
            // const objectUrl = URL.createObjectURL(blob);
            // this.editPdf(objectUrl);
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
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        checkup: this.form.checkup,
        results: this.form.results,
        patient: this.form.patient,
        doctor: this.form.doctor,
      };
      return data;
    },
    resetDataFormCheckup() {
      this.formDetails.checkup = null;
      this.formDetails.results = null;
      this.items = [];
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.date = item.createdAt + " " + item.timeAt;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.checkup = item.checkup["id"];
      this.itemsCheckup.push(item.checkup);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {},
  components: {
    FormPdf,
    DeleteItem,
  },
};
</script>
