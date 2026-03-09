<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_reagent')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-store</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loading.refresh"
            @click="refreshItemsGet()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
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
      </v-row>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.reagent.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              outlined
              dense
              :label="$vuetify.lang.t('$vuetify.product.cols.code.title')"
              prepend-inner-icon="mdi-code-array"
              v-model="filter.code"
              @input="performFilter()"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-text-field
              v-model="filter.name"
              outlined
              dense
              color="primary"
              @input="performFilter()"
              prepend-inner-icon="mdi-code-array"
              :label="
                $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
              "
              class="font-weight-bold"
              clearable
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
    <v-card>
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
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--        <template v-slot:header.dci2="{ header }">-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <template v-slot:header.shape="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.conditioning="{ header }">
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
        <template v-slot:header.purchase_price="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.public_price="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.expiry_date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

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
                <td class="subtitle-2">{{ item.name }}</td>
                <!--                <td class="subtitle-2">{{ item.dci2.name }}</td>-->
                <td class="subtitle-2">
                  {{ item.shape ? item.shape.name : "-" }}
                </td>
                <td class="subtitle-2">{{ item.conditioning }}</td>
                <td class="subtitle-2">{{ item.stock_max }}</td>
                <td class="subtitle-2">{{ item.purchase_price }}</td>
                <td class="subtitle-2">{{ item.public_price }}</td>
                <td class="subtitle-2">
                  {{ $moment(item.expiry_date).format("YYYY-MM-DD") }}
                </td>

                <!--<td class="subtitle-2">-->
                <!--<template v-if="item.is_active">-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.product.cols.billable." + item.billable) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--<template v-else>-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.billable." + item.billable) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--</td>-->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'change_reagent')
                        "
                      >
                        <v-btn
                          @click="editReagent(item)"
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
                          _.includes($auth.user().permissions, 'delete_reagent')
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
      <form-reagent
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="reagentForm"
      ></form-reagent>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItemsGet"
      ></delete-item>
      <form-enable
        :dialog="dialogForm"
        ref="enableProduct"
        :messages="messages"
        @getItems="getItemsGet"
      ></form-enable>
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormReagent from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
import FilterMixin from "../../mixins/Common/Filters";
import FormPdf from "./../bills/Pdf";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin, FilterMixin],
  data: () => ({
    urlItems: "/reagents",
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
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    json_fields: {
      Code: "code",
      CodeBarre: "barcode",
      Name: "name",
      DCI: "dci1.name",
      Forme: "shape.name",
      Categorie: "category.name",
      Conditionnement: "conditioning",
      Prix_vente: "public_price",
      Prix_achat: "purchase_price",
      Quantite: "stock_max",
      Dosage: "dosage",
    },
    form: {
      id: null,
      dci1: null,
      dci2: null,
      shape: null,
      public_price: null,
      purchase_price: null,
      margin: null,
      dosage: null,
      conditioning: null,
      category: null,
      quantity: null,
      barcode: null,
      code: null,
      name: null,
      is_active: false,
    },
    currentFile: undefined,
    progress: 0,
    message: "",

    fileInfos: [],
    filter: {
      type: Object,
      default: function () {
        return {
          name: null,
          category: null,
          code: null,
        };
      },
    },
    exports: {
      dci1: null,
      dci2: null,
      shape: null,
      public_price: null,
      purchase_price: null,
      margin: null,
      dosage: null,
      conditioning: null,
      category: null,
      quantity: null,
      barcode: null,
      code: null,
      name: null,
      is_active: false,
    },
    dialogFormExport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingImport: false,
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.reagent.delete.success",
    },
  }),
  watch: {
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  methods: {
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
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
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
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
          let fileName = "Listes des reactifs";
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
    showExport() {
      this.dialogFormExport.shows.showFilter = true;
    },
    performExport() {
      let self = this;
      let params = {};
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
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
          let fileName = "Liste des produits";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExport.shows.showFilter = false;
        });
    },
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("reagents/upload", formData, {
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
          text: "$vuetify.product.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.product.cols.dci2.title",
        //   value: "dci2",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.product.cols.shape.title",
          value: "shape",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.conditioning.title",
          value: "conditioning",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.purchase_price.title",
          value: "purchase_price",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.public_price.title",
          value: "public_price",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.expiry_date.title",
          value: "expiry_date",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.created.title",
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
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.reagent.new.title",
        submit: "$vuetify.reagent.new.submit",
        success: "$vuetify.reagent.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        is_active: false,
      };
    },
    editReagent(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.reagent.update.title",
        submit: "$vuetify.reagent.update.submit",
        success: "$vuetify.reagent.update.success",
      };
      this.$refs.reagentForm.setForm(item);
    },
    enabled(item) {
      this.$refs.enableProduct.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.product.cols.status.enabled",
          submit: "$vuetify.product.update.submit",
          success: "$vuetify.product.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.product.cols.status.desabled",
          submit: "$vuetify.product.update.submit",
          success: "$vuetify.product.update.success",
        };
      }
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItems();
    },
  },
  components: {
    FormReagent,
    FormPdf,
    DeleteItem,
  },
};
</script>

<style scoped></style>
