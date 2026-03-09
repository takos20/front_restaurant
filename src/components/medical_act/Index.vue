<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-2 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_medical_act')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-hospital</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loading.refresh"
            @click="refreshItems()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-spacer></v-spacer>
        </div>
        <v-card-text style="margin-left: 300px; margin-top: -70px">
          <v-row>
            <v-col cols="3">
              <v-file-input
                show-size
                :label="
                  $vuetify.lang.t('$vuetify.product.cols.file_input.title')
                "
                @change="selectFile"
              ></v-file-input>
            </v-col>

            <v-col cols="2" class="pl-2 mt-4">
              <v-btn
                color="teal darken-1"
                dark
                @click="upload"
                :loading="loadingImport"
              >
                {{ $vuetify.lang.t("$vuetify.btn.upload") }}
                <v-icon right dark>mdi-database-plus</v-icon>
              </v-btn>
            </v-col>
            <v-alert v-if="message" border="left" color="blue-grey" dark>
              {{ message }}
            </v-alert>
            <v-card v-if="fileInfos.length > 0" class="mx-auto">
              <v-list>
                <v-subheader>List of Files</v-subheader>
                <v-list-item-group color="primary">
                  <v-list-item v-for="(file, index) in fileInfos" :key="index">
                    <a :href="file.url">{{ file.name }}</a>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-row>
        </v-card-text>
        <!--        <v-row no-gutters justify="center" align="center">-->
        <!--          <v-col cols="8">-->
        <!--            <v-file-input-->
        <!--              show-size-->
        <!--              :label="$vuetify.lang.t('$vuetify.product.cols.file_input.title')"-->
        <!--              @change="selectFile"-->
        <!--            ></v-file-input>-->
        <!--          </v-col>-->

        <!--          <v-col cols="4" class="pl-2">-->
        <!--            <v-btn color="success" dark small @click="upload">-->
        <!--              {{ $vuetify.lang.t("$vuetify.btn.upload") }}-->
        <!--              <v-icon right dark>mdi-database-plus</v-icon>-->
        <!--            </v-btn>-->
        <!--          </v-col>-->
        <!--        </v-row>-->

        <!--        <v-alert v-if="message" border="left" color="blue-grey" dark>-->
        <!--          {{ message }}-->
        <!--        </v-alert>-->

        <!--        <v-card v-if="fileInfos.length > 0" class="mx-auto">-->
        <!--          <v-list>-->
        <!--            <v-subheader>List of Files</v-subheader>-->
        <!--            <v-list-item-group color="primary">-->
        <!--              <v-list-item v-for="(file, index) in fileInfos" :key="index">-->
        <!--                <a :href="file.url">{{ file.name }}</a>-->
        <!--              </v-list-item>-->
        <!--            </v-list-item-group>-->
        <!--          </v-list>-->
        <!--        </v-card>-->
      </v-row>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.medical_act.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.medical_act.cols.name.title')"
              prepend-inner-icon="mdi-rename-box"
              v-model="filter.title"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.medical_areas"
              :items="itemsMedical_areas"
              :loading="isLoading"
              :search-input.sync="search"
              color="primary"
              item-text="name"
              item-value="id"
              @change="performFilter"
              :label="$vuetify.lang.t('$vuetify.medical_areas.cols.name.title')"
              prepend-inner-icon="mdi-hospital mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.medical_act.cols.price.title')"
              prepend-inner-icon="mdi-cash"
              v-model="filter.price"
              outlined
              clearable
              dense
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.medical_areas.cols.code.title')"
              prepend-inner-icon="mdi-numeric"
              v-model="filter.code"
              outlined
              clearable
              dense
              @input="performFilter"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions style="margin-top: -30px">
        <v-spacer></v-spacer>
        <v-btn dark color="primary" @click="exportPrint()">
          <v-icon color="white" left>mdi-printer</v-icon>
          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
        </v-btn>
        <v-btn dark color="primary" @click="exportPDF()">
          <v-icon color="white" left>mdi-file</v-icon>
          {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
        </v-btn>
        <v-btn dark color="primary" @click="performExport">
          {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="pb-4">
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headers"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loading.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="username"
        class="mt-5"
      >
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.medical_areas="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.price="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.is_active="{ header }">
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
                <td class="subtitle-2">
                  {{ item.code }}
                </td>
                <td class="subtitle-2">
                  {{ item.title }}
                </td>
                <td class="subtitle-2">
                  {{ item.medical_areas.name }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.price }}
                </td> -->
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_active">
                        <v-icon color="primary" class="pointer" dark v-on="on">
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          class="pointer"
                          dark
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
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
                            'change_medical_act'
                          )
                        "
                      >
                        <v-btn
                          @click="editMedicalact(item)"
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
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'view_bills')
                        "
                      >
                        <v-icon
                          @click="detailsAct(item)"
                          color="details"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-details
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.medical_act.details") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'add_prices')
                        "
                      >
                        <v-btn
                          @click="
                            $router.push({
                              name: 'prices',
                              params: {
                                id: item.id,
                                title: item.title,
                                code: item.code,
                                type: 'medical_act',
                              },
                            })
                          "
                          color="cash"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-cash</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.prices.title")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_medical_act'
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
                      <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>
                    </v-tooltip>
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>

      <form-medicalact
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="medicalactForm"
      ></form-medicalact>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormMedicalact from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
const FileSaver = require("file-saver");
import FormPdf from "./../bills/Pdf";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/medical_act",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlMedical_areas: "medical_areas",
    isLoading: false,
    search: null,
    itemsMedical_areas: [],
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormExport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    fileInfos: [],
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    message: "",
    dialogEnt: {
      show: false,
    },
    loadingImport: false,
    form: {
      id: null,
      title: null,
      medical_areas: null,
      coefficient: null,
      price: null,
      quote_internal: null,
      quote_external: null,
    },
    filter: {
      title: null,
      price: null,
      code: null,
    },
    exports: {
      title: null,
      medical_areas: null,
      price: null,
      code: null,
    },
    json_fields: {
      Code: "code",
      Nom: "title",
      Nom_domaine: "medical_areas__name",
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.medical_act.delete.success",
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
          url: self.urlMedical_areas,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_areas = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    detailsAct(item) {
      this.$router.push({
        name: "details_acts",
        params: { id: item.id, title: item.title },
      });
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.exports.medical_areas !== null) {
        params["medical_areas"] = self.exports.medical_areas;
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
      if (self.exports.medical_areas !== null) {
        params["medical_areas"] = self.exports.medical_areas;
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
          let fileName = "Listes des Produits";
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
    export() {
      let self = this;
      self.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "/" +
            "export_items" +
            "?product=" +
            this.formData.product.product.id +
            "&start_date=" +
            this.formData.start_date +
            "&end_date=" +
            this.formData.end_date +
            "&id=" +
            this.$route.params.id,
          //   +
          // "&optionExport=" +
          // this.formData.optionExport,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Historique des sessions";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
        });
    },
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("medical_act/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = "$vuetify.error_occured";
            const fields = error.response.data;
            self.setFormErrors(fields);
            this.$forceUpdate();
          } else {
            message = "$vuetify.error_server";
          }
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(message),
            color: "#B71C1C",
          });
        })
        .then(() => {
          self.loadingImport = false;
        });
    },
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.expenses_nature.cols.nature_code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_act.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_areas.cols.name.title",
          value: "medical_areas",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.medical_act.cols.price.title",
        //   value: "price",
        //   align: "start",
        //   sortable: true,
        //   width: "20",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.medical_areas.cols.status.title",
          value: "is_active",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_act.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_act.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "100",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.medical_act.new.title",
        submit: "$vuetify.medical_act.new.submit",
        success: "$vuetify.medical_act.new.success",
      };
      this.form = {
        id: null,
        title: null,
        medical_areas: null,
        coefficient: null,
        price: null,
        quote_internal: null,
        quote_external: null,
      };
    },
    editMedicalact(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.medical_act.update.title",
        submit: "$vuetify.medical_act.update.submit",
        success: "$vuetify.medical_act.update.success",
      };
      this.$refs.medicalactForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    showExport() {
      this.dialogFormExport.shows.showFilter = true;
    },
    performExport() {
      let self = this;
      let params = {};
      if (self.exports.medical_areas !== null) {
        params["medical_areas"] = self.exports.medical_areas;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItemsExport();
      // .then(() => {
      //   self.$refs.exportForm.closeDialog();
      // })
      // .finally(() => {
      //   self.$refs.exportForm.stopLoadingBtn();
      // });
    },
    getItemsExport() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des actes medicaux";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExport.shows.showFilter = false;
        });
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.title !== null) {
        params["title"] = self.filter.title;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.price !== null) {
        params["price"] = self.filter.price;
      }
      if (self.filter.medical_areas !== null) {
        params["medical_areas"] = self.filter.medical_areas;
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

    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormMedicalact,
    DeleteItem,
    FormPdf,
  },
};
</script>

<style scoped></style>
