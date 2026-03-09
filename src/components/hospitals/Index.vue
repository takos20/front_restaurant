<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-2 mx-5">
          <template v-if="_.includes($auth.user().permissions, 'add_hospital')">
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-account-alert</v-icon>
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
        </div>
      </v-row>
    </v-card>
    <br />
    <!-- <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.product.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.hospitals.cols.code.title')"
              v-model="filter.code"
              outlined
              dense
              clearable
              @input="performFilter"
              prepend-inner-icon="mdi-code-array"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.zip_code"
              :items="itemszip_code"
              :loading="isLoadingzip_code"
              :search-input.sync="searchzip_code"
              :label="$vuetify.lang.t('$vuetify.hospitals.cols.zip_code.title')"
              color="primary"
              item-text="title"
              hide-no-data
              @change="performFilter"
              item-value="id"
              class="font-weight-bold"
              prepend-inner-icon="mdi-code-array"
              outlined
              clearable
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.zip_code.title") }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.hospitals.cols.name.title')"
              v-model="filter.name"
              prepend-inner-icon="mdi-rename-box"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-select
              outlined
              dense
              clearable
              @change="performFilter"
              v-model="filter.phone"
              color="primary"
              :items="optionphone.type_phone"
              :label="$vuetify.lang.t('$vuetify.hospitals.cols.phone.title')"
              :placeholder="
                $vuetify.lang.t('$vuetify.hospitals.cols.phone.title')
              "
              class="font-weight-bold"
            ></v-select>
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
    </v-card> -->
    <v-card>
      <v-data-table
        :footer-props="{
          'items-per-paddress-options': itemPerPageOptions,
        }"
        :headers="headers"
        :items="items"
        :items-per-paddress="itemPerPage"
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
        <template v-slot:header.address="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.phone="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.zip_code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.slogan="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.taxpayer="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.email="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.type_enterprise="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.VAT_collected="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.deductible_VAT="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <!--        <template-->
        <!--          v-slot:header.total_bills="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_hospitals_plus')"-->
        <!--        >-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <!--        <template-->
        <!--          v-slot:header.total_payment="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_hospitals_plus')"-->
        <!--        >-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <!--        <template-->
        <!--          v-slot:header.balance="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_hospitals_plus')"-->
        <!--        >-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <!--<template v-slot:header.is_active="{ header }">-->
        <!--<tr>-->
        <!--{{-->
        <!--$vuetify.lang.t(header.text)-->
        <!--}}-->
        <!--</tr>-->
        <!--</template>-->
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
                  {{ item.name.toUpperCase() }}
                </td>
                <td class="subtitle-2">
                  {{ item.address }}
                </td>
                <td class="subtitle-2">
                  {{ item.phone }}
                </td>
                <td class="subtitle-2">
                  {{ item.zip_code }}
                </td>
                <td class="subtitle-2">
                  {{ item.slogan }}
                </td>
                <td class="subtitle-2">
                  {{ item.taxpayer }}
                </td>
                <td class="subtitle-2">
                  {{ item.email }}
                </td>
                <td class="subtitle-2">
                  {{ item.type_enterprise }}
                </td>
                <td class="subtitle-2">
                  {{ item.VAT_collected }}
                </td>
                <td class="subtitle-2">
                  {{ item.deductible_VAT }}
                </td>
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_hospitals_plus')-->
                <!--                  "-->
                <!--                >-->
                <!--                  {{ item.solde }}-->
                <!--                </td>-->
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_hospitals_plus')-->
                <!--                  "-->
                <!--                >-->
                <!--                  {{ item.total_bills }}-->
                <!--                </td>-->
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_hospitals_plus')-->
                <!--                  "-->
                <!--                >-->
                <!--                  {{ item.total_payment }}-->
                <!--                </td>-->

                <!--<td class="subtitle-2">-->
                <!--<template v-if="item.is_active">-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.roles." + item.role) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--<template v-else>-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.roles." + item.role) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--</td>-->
                <!--<td>-->
                <!--<v-tooltip top>-->
                <!--<template v-slot:activator="{ on }">-->
                <!--<template v-if="item.is_active">-->
                <!--<v-icon-->
                <!--color="primary"-->
                <!--class="pointer"-->
                <!--dark-->
                <!--@click="enabled(item)"-->
                <!--v-on="on"-->
                <!--:disabled="!$auth.check(['ADMIN', 'RESPONSIBLE'])"-->
                <!--&gt;-->
                <!--mdi-check-circle-->
                <!--</v-icon>-->
                <!--</template>-->
                <!--<template v-else>-->
                <!--<v-icon-->
                <!--color="red accent-4"-->
                <!--@click="enabled(item)"-->
                <!--v-on="on"-->
                <!--class="pointer"-->
                <!--dark-->
                <!--:disabled="!$auth.check(['ADMIN', 'RESPONSIBLE'])"-->
                <!--&gt;-->
                <!--mdi-close-circle-->
                <!--</v-icon>-->
                <!--</template>-->
                <!--</template>-->
                <!--<span v-if="!item.is_active">-->
                <!--{{-->
                <!--$vuetify.lang.t("$vuetify.hospitals.cols.status.enabled")-->
                <!--}}-->
                <!--</span>-->
                <!--<span v-else>-->
                <!--{{-->
                <!--$vuetify.lang.t("$vuetify.hospitals.cols.status.desabled")-->
                <!--}}-->
                <!--</span>-->
                <!--</v-tooltip>-->
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
                          _.includes(
                            $auth.user().permissions,
                            'change_hospital'
                          )
                        "
                      >
                        <v-btn
                          @click="edithospitals(item)"
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

                    <!--                    <v-tooltip bottom>-->
                    <!--                      <template-->
                    <!--                        v-slot:activator="{ on }"-->
                    <!--                        v-if="-->
                    <!--                          _.includes(-->
                    <!--                            $auth.user().permissions,-->
                    <!--                            'view_consultation'-->
                    <!--                          )-->
                    <!--                        "-->
                    <!--                      >-->
                    <!--                        <v-btn-->
                    <!--                          @click="consultationhospitals(item)"-->
                    <!--                          color="teal darken-1"-->
                    <!--                          icon-->
                    <!--                          text-->
                    <!--                          v-on="on"-->
                    <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-clipboard-text</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{-->
                    <!--                        $vuetify.lang.t("$vuetify.consultation.title")-->
                    <!--                      }}</span>-->
                    <!--                    </v-tooltip>-->
                    <!--                    <v-tooltip bottom>-->
                    <!--                      <template v-slot:activator="{ on }">-->
                    <!--                        &lt;!&ndash;                        v-if="&ndash;&gt;-->
                    <!--                        &lt;!&ndash;                        _.includes($auth.user().permissions, 'view_ordinance')&ndash;&gt;-->
                    <!--                        &lt;!&ndash;                        "&ndash;&gt;-->
                    <!--                        <v-btn-->
                    <!--                          @click="ordinancehospitals(item)"-->
                    <!--                          color="teal darken-1"-->
                    <!--                          icon-->
                    <!--                          text-->
                    <!--                          v-on="on"-->
                    <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-medical-bag</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{-->
                    <!--                        $vuetify.lang.t("$vuetify.ordinance.title")-->
                    <!--                      }}</span>-->
                    <!--                    </v-tooltip>-->
                    <!--                    <v-tooltip bottom>-->
                    <!--                      <template v-slot:activator="{ on }">-->
                    <!--                        &lt;!&ndash;                        v-if="&ndash;&gt;-->
                    <!--                        &lt;!&ndash;                        _.includes($auth.user().permissions, 'view_ordinance')&ndash;&gt;-->
                    <!--                        &lt;!&ndash;                        "&ndash;&gt;-->
                    <!--                        <v-btn-->
                    <!--                          @click="appointmenthospitals(item)"-->
                    <!--                          color="teal darken-1"-->
                    <!--                          icon-->
                    <!--                          text-->
                    <!--                          v-on="on"-->
                    <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-calendar-check</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{-->
                    <!--                        $vuetify.lang.t("$vuetify.appointment.title")-->
                    <!--                      }}</span>-->
                    <!--                    </v-tooltip>-->
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_hospital'
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
      <form-hospitals
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="userForm"
      ></form-hospitals>
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
import FormHospitals from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
import FormPdf from "./../bills/Pdf";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "hospitals",
    urlItemsGet: "hospitals/all",
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
    fileInfos: [],
    dialogDelete: {
      show: false,
    },
    filter: {
      type: Object,
      default: function () {
        return {
          phone: null,
          zip_code: null,
          name: null,
        };
      },
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    urlzip_code: "zip_codes",
    isLoadingzip_code: false,
    searchzip_code: null,
    itemszip_code: [],
    optionhospitals_shape: {
      zip_code_shape: [],
    },
    optionphone: {
      type_phone: [],
    },
    json_fields: {
      Code: "code",
      Name: "name",
      address: "address",
      Sexe: "phone",
      Date_naissance: "dateNaiss",
      Nom_mere: "mother_name",
      Tel: "phone",
      Enfant: "child",
      Date_ID: "date_id",
      Num_ID: "number_id",
      Nom_urgence: "emergency_name",
      Contact_urgence: "emergency_contact",
      Ville: "city.name",
      Quartier: "district",
      Religion: "religion",
      Forme: "shape",
      Groupe_sanguin: "blood_group",
      Electrophoreze: "electrophoresis",
    },
    form: {
      id: null,
      name: null,
      deductible_VAT: null,
      VAT_collected: null,
      email: null,
      type_enterprise: null,
      taxpayer: null,
      slogan: null,
      address: null,
      zip_code: null,
      phone: null,
    },
    dialogFormExport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messaddress: "",
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loadingImport: false,
    messagesDelete: {
      success: "$vuetify.hospitals.delete.success",
    },
  }),
  watch: {
    searchCity(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCity = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCity = response.data.content;
        })
        .finally(() => (this.isLoadingCity = false));
    },
    searchzip_code(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingzip_code = true;
      this.$store
        .dispatch("request", {
          url: self.urlzip_code,
          params: params,
        })
        .then((response) => {
          self.itemszip_code = response.data.content;
        })
        .finally(() => (this.isLoadingzip_code = false));
    },
    searchType_insurance(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingType_insurance = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_insurance,
          params: params,
        })
        .then((response) => {
          self.itemsType_insurance = response.data.content;
        })
        .finally(() => (this.isLoadingType_insurance = false));
    },
  },
  created() {
    this.getOptionshospitals_shape();
    this.getOptionsphone();
    this.setHeaders();
  },
  methods: {
    getOptionsphone() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_phone, (type_phone) => {
        self.optionphone.type_phone.push({
          text: self.$vuetify.lang.t(type_phone.text),
          value: type_phone.value,
        });
      });
    },
    getOptionshospitals_shape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.zip_code_shape, (zip_code_shape) => {
        self.optionhospitals_shape.zip_code_shape.push({
          text: self.$vuetify.lang.t(zip_code_shape.text),
          value: zip_code_shape.value,
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
      if (self.filter.zip_code !== null) {
        params["zip_code"] = self.filter.zip_code;
      }
      if (self.filter.phone !== null) {
        params["phone"] = self.filter.phone;
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
      if (self.filter.zip_code !== null) {
        params["zip_code"] = self.filter.zip_code;
      }
      if (self.filter.phone !== null) {
        params["phone"] = self.filter.phone;
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
          let fileName = "Listes des hospitalss";
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
    performExport() {
      let self = this;
      let params = {};
      if (self.filter.zip_code !== null) {
        params["zip_code"] = self.filter.zip_code;
      }
      if (self.filter.phone !== null) {
        params["phone"] = self.filter.phone;
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
          let fileName = "Liste des hospitalss";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExport.shows.showFilter = false;
        });
    },
    showExport() {
      this.dialogFormExport.shows.showFilter = true;
    },
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("hospitalss/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .catch((error) => {
          let messaddress;
          if (error.response.status === 400) {
            messaddress = "$vuetify.error_occured";
            const fields = error.response.data;
            self.setFormErrors(fields);
            this.$forceUpdate();
          } else {
            messaddress = "$vuetify.error_server";
          }
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(messaddress),
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
          text: "$vuetify.hospitals.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.address.title",
          value: "address",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.phone.title",
          value: "phone",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.zip_code.title",
          value: "zip_code",
          align: "start",
          sortable: true,
          width: "10",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.hospitals.cols.slogan.title",
          value: "slogan",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.taxpayer.title",
          value: "taxpayer",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.email.title",
          value: "email",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.type_enterprise.title",
          value: "type_enterprise",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.VAT_collected.title",
          value: "VAT_collected",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.deductible_VAT.title",
          value: "deductible_VAT",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.hospitals.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.hospitals.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.hospitals.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "140",
        },
      ];
    },
    // setHeadersPlus() {
    //   this.headers = [
    //     {
    //       text: "$vuetify.hospitals.cols.code.title",
    //       value: "code",
    //       align: "start",
    //       sortable: true,
    //       width: "15",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.name.title",
    //       value: "name",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.address.title",
    //       value: "address",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.phone.title",
    //       value: "phone",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.phone.title",
    //       value: "phone",
    //       align: "start",
    //       sortable: true,
    //       width: "20",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.hospitals_shape.title",
    //       value: "hospitals_shape",
    //       align: "start",
    //       sortable: true,
    //       width: "30",
    //       class: "grey--text text--darken-3"
    //     },
    //address
    //     {
    //       text: "$vuetify.hospitals.cols.address.title",
    //       value: "address",
    //       align: "start",
    //       sortable: true,
    //       width: "6",
    //       class: "grey--text text--darken-3"
    //     },
    //     // {
    //     //   text: "$vuetify.hospitals.cols.status.title",
    //     //   value: "is_active",
    //     //   align: "start",
    //     //   sortable: true,
    //     //   width: "1",
    //     //   class: "grey--text text--darken-3"
    //     // },
    //     {
    //       text: "$vuetify.hospitals.cols.balance.title",
    //       value: "balance",
    //       align: "start",
    //       sortable: true,
    //       width: "15",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.total_bills.title",
    //       value: "total_bills",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.total_payment.title",
    //       value: "total_payment",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.created.title",
    //       value: "create_date",
    //       align: "start",
    //       sortable: true,
    //       width: "105",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.hospitals.cols.actions.title",
    //       value: null,
    //       align: "start",
    //       sortable: true,
    //       width: "140"
    //     }
    //   ];
    // },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.hospitals.new.title",
        submit: "$vuetify.hospitals.new.submit",
        success: "$vuetify.hospitals.new.success",
      };
      this.form = {
        id: null,
        pasysto: null,
        padiasto: null,
        temperature: null,
        bpm: null,
        size: null,
        electrophoresis: null,
        weight: null,
        blood_group: null,
        allergies: null,
        pathologies: null,
        name: null,
        religion: null,
        type_id: null,
        mother_name: null,
        emergency_name: null,
        emergency_contact: null,
        maritalStatus: null,
        number_id: null,
        email: null,
        date_id: null,
        child: null,
        dateNaiss: null,
        address: null,
        other_phone: null,
        phone: null,
        insurance_name: null,
        insurance_number: null,
        code: null,
        shape: null,
      };
    },
    edithospitals(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.hospitals.update.title",
        submit: "$vuetify.hospitals.update.submit",
        success: "$vuetify.hospitals.update.success",
      };
      this.$refs.userForm.setForm(item);
    },
    detailshospitals(item) {
      this.$router.push({
        name: "detailshospitals",
        params: { id: item.id, name: item.name },
      });
    },
    consultationhospitals(item) {
      this.$router.push({
        name: "consultationhospitals",
        params: { id: item.id, name: item.name },
      });
    },
    ordinancehospitals(item) {
      this.$router.push({
        name: "ordinancehospitals",
        params: { id: item.id, name: item.name },
      });
    },
    appointmenthospitals(item) {
      this.$router.push({
        name: "appointmenthospitals",
        params: { id: item.id, name: item.name },
      });
    },
    getItems() {
      let self = this;
      const { paddress, itemsPerPaddress } = this.pagination;
      let params = {
        paddress: paddress,
        size: itemsPerPaddress,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
            resolve(response);
          })
          .catch((err) => {
            let messaddress = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                messaddress = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                messaddress = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                messaddress = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: messaddress,
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.zip_code !== null) {
        params["zip_code"] = self.filter.zip_code;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.phone !== null) {
        params["phone"] = self.filter.phone;
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
  },
  components: {
    FormHospitals,
    DeleteItem,
    FormPdf,
  },
};
</script>

<style scoped></style>
