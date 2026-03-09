<template>
  <v-dialog max-width="500" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.patient.export") }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performExport()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-select
                  v-model="exports.shape"
                  outlined
                  color="primary"
                  dense
                  prepend-inner-icon="mdi-account-group-outline"
                  :items="optionPatient_shape.type_Patient_shape"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.patient_shape.title')
                  "
                  :placeholder="
                    $vuetify.lang.t('$vuetify.patient.cols.patient_shape.title')
                  "
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-select
                  outlined
                  dense
                  v-model="exports.gender"
                  color="primary"
                  :items="optionGender.type_Gender"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.gender.title')"
                  :placeholder="
                    $vuetify.lang.t('$vuetify.patient.cols.gender.title')
                  "
                  class="font-weight-bold"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.shows.showFilter = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn @click="resetForm">
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPrint()">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPDF()">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <v-btn dark color="primary" type="submit">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
  </v-dialog>
</template>

<script>
import FilterMixin from "../../mixins/Common/Filters";
import FormPdf from "./../bills/Pdf";
const FileSaver = require("file-saver");
export default {
  mixins: [FilterMixin],
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showFilter: false,
          },
        };
      },
    },
    exports: {
      type: Object,
      default: function () {
        return {
          gender: null,
          shape: null,
        };
      },
    },
  },
  created() {
    this.getOptionsPatient_shape();
    this.getOptionsGender();
  },
  data: () => ({
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionGender: {
      type_Gender: [],
    },
    urlItems: "patients",
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingBtn: false,
  }),
  methods: {
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.exports.shape !== null) {
        params["shape"] = self.exports.shape;
      }
      if (self.exports.gender !== null) {
        params["gender"] = self.exports.gender;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print",
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
      if (self.exports.shape !== null) {
        params["shape"] = self.exports.shape;
      }
      if (self.exports.gender !== null) {
        params["gender"] = self.exports.gender;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des patients";
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
    getOptionsGender() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Gender, (type_Gender) => {
        self.optionGender.type_Gender.push({
          text: self.$vuetify.lang.t(type_Gender.text),
          value: type_Gender.value,
        });
      });
    },
    getOptionsPatient_shape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_Patient_shape,
        (type_Patient_shape) => {
          self.optionPatient_shape.type_Patient_shape.push({
            text: self.$vuetify.lang.t(type_Patient_shape.text),
            value: type_Patient_shape.value,
          });
        }
      );
    },
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.exports.shape = null;
      this.exports.gender = null;
    },
  },
  components: {
    FormPdf,
  },
};
</script>
