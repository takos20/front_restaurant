<template>
  <v-dialog max-width="500" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.stock_movement.export") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="performExportMovement()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-select
                  v-model="exports.type_movement"
                  color="primary"
                  :items="optionMovement.type_Movement"
                  :label="
                    $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                  "
                  dense
                  prepend-inner-icon="mdi-account-supervisor-circle"
                  outlined
                  class="font-weight-bold"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
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
          type_movement: null,
        };
      },
    },
  },
  created() {
    this.getOptionsMovement();
    //this.setItemRoles();
  },
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlMedical_areas,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_areas = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  data: () => ({
    loadingBtn: false,
    urlMedical_areas: "medical_areas",
    optionMovement: {
      type_Movement: [],
    },
    urlItems: "stock_movements",
    isLoading: false,
    search: null,
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    itemsMedical_areas: [],
  }),
  methods: {
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
      if (self.exports.type_movement !== null) {
        params["type_movement"] = self.exports.type_movement;
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
      if (self.exports.type_movement !== null) {
        params["type_movement"] = self.exports.type_movement;
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
          let fileName = "Listes des mouvements de stock";
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
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.exports.type_movement = null;
    },
  },
  components: {
    FormPdf,
  },
};
</script>
