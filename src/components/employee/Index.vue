<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-2 mx-5">
          <template v-if="_.includes($auth.user().permissions, 'add_employee')">
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-human-male-female</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.employee.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.employee.cols.code.title')"
              v-model="filter.code"
              outlined
              dense
              clearable
              @input="performFilter"
              prepend-inner-icon="mdi-code-array"
            ></v-text-field>
          </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.employee.cols.lastName.title')"
              v-model="filter.name"
              prepend-inner-icon="mdi-rename-box"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-select
              outlined
              dense
              clearable
              @change="performFilter"
              v-model="filter.gender"
              color="primary"
              :items="optionGender.type_Gender"
              :label="$vuetify.lang.t('$vuetify.employee.cols.gender.title')"
              :placeholder="
                $vuetify.lang.t('$vuetify.employee.cols.gender.title')
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
        <template v-slot:header.first_name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.age="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.gender="{ header }">
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
        <template v-slot:header.address="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <!--        <template-->
        <!--          v-slot:header.total_bills="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_patient_plus')"-->
        <!--        >-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <!--        <template-->
        <!--          v-slot:header.total_payment="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_patient_plus')"-->
        <!--        >-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <!--        <template-->
        <!--          v-slot:header.balance="{ header }"-->
        <!--          v-if="_.includes($auth.user().permissions, 'view_patient_plus')"-->
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
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{ item.lastName.toUpperCase() }}
                  {{ item.firstName.toUpperCase() }}
                </td>
                <td class="subtitle-2">
                  {{ item.age }}
                </td>
                <td class="subtitle-2" v-if="item.gender == 'MAN'">
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="teal darken-6"
                    small
                  >
                    <v-icon left color="white">mdi-human-male</v-icon>
                    {{ $vuetify.lang.t("$vuetify.patient.cols.gender.titleM") }}
                  </v-btn>
                </td>
                <td class="subtitle-2" v-else>
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="pink darken-5"
                    small
                  >
                    <v-icon left color="white">mdi-human-female</v-icon>
                    {{ $vuetify.lang.t("$vuetify.patient.cols.gender.titleW") }}
                  </v-btn>
                </td>
                <td class="subtitle-2">
                  {{ item.phone }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.type_patient ? item.type_patient.title : "" }}
                </td> -->
                <td class="subtitle-2">
                  {{ item.address }}
                </td>
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_patient_plus')-->
                <!--                  "-->
                <!--                >-->
                <!--                  {{ item.solde }}-->
                <!--                </td>-->
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_patient_plus')-->
                <!--                  "-->
                <!--                >-->
                <!--                  {{ item.total_bills }}-->
                <!--                </td>-->
                <!--                <td-->
                <!--                  class="subtitle-2"-->
                <!--                  v-if="-->
                <!--                    _.includes($auth.user().permissions, 'view_patient_plus')-->
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
                <!--$vuetify.lang.t("$vuetify.patient.cols.status.enabled")-->
                <!--}}-->
                <!--</span>-->
                <!--<span v-else>-->
                <!--{{-->
                <!--$vuetify.lang.t("$vuetify.patient.cols.status.desabled")-->
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
                            'change_employee'
                          )
                        "
                      >
                        <v-btn
                          @click="editEmployee(item)"
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
                          _.includes(
                            $auth.user().permissions,
                            'view_details_employee'
                          )
                        "
                      >
                        <v-btn
                          @click="detailsEmployee(item)"
                          color="details"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-details</v-icon>
                        </v-btn>
                      </template>
                      <span>{{ $vuetify.lang.t("$vuetify.btn.detail") }}</span>
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
                    <!--                          @click="consultationPatient(item)"-->
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
                    <!--                          @click="ordinancePatient(item)"-->
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
                    <!--                          @click="appointmentPatient(item)"-->
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
                            'delete_employee'
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
      <form-patient
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="userForm"
      ></form-patient>
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
import FormPatient from "./Form";
import DeleteItem from "./../Common/Delete";
import FormPdf from "./../bills/Pdf";
import axios from "axios";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "employees",
    urlItemsGet: "employees",
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
          gender: null,
          shape: null,
          name: null,
          code: null,
        };
      },
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionGender: {
      type_Gender: [],
    },
    json_fields: {
      Code: "code",
      Name: "name",
      Age: "age",
      Sexe: "gender",
      Date_naissance: "dateNaiss",
      Tel: "phone",
      Enfant: "child",
      Date_ID: "dateId",
      Num_ID: "numberId",
      Nom_urgence: "emergencyName",
      Contact_urgence: "emergencyContact",
      Ville: "city.name",
      Quartier: "district",
      Religion: "religion",
      Forme: "shape",
    },
    currentFile: undefined,
    form: {
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
      age: null,
      gender: null,
      shape: null,
    },
    dialogFormExport: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    message: "",
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loadingImport: false,
    messagesDelete: {
      success: "$vuetify.employee.delete.success",
    },
  }),
  created() {
    this.getOptionsPatient_shape();
    this.getOptionsGender();
    this.setHeaders();
  },
  methods: {
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.filter.shape !== null) {
        params["shape"] = self.filter.shape;
      }
      if (self.filter.gender !== null) {
        params["gender"] = self.filter.gender;
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
      if (self.filter.shape !== null) {
        params["shape"] = self.filter.shape;
      }
      if (self.filter.gender !== null) {
        params["gender"] = self.filter.gender;
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
    performExport() {
      let self = this;
      let params = {};
      if (self.filter.shape !== null) {
        params["shape"] = self.filter.shape;
      }
      if (self.filter.gender !== null) {
        params["gender"] = self.filter.gender;
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
          let fileName = "Liste des patients";
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
        .post("employees/upload", formData, {
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
          text: "$vuetify.patient.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.first_name.title",
          value: "first_name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.age.title",
          value: "age",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.gender.title",
          value: "gender",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.phone.title",
          value: "phone",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.patient.cols.address.title",
          value: "address",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.patient.cols.status.title",
        //   value: "is_active",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.patient.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patient.cols.actions.title",
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
    //       text: "$vuetify.patient.cols.code.title",
    //       value: "code",
    //       align: "start",
    //       sortable: true,
    //       width: "15",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.first_name.title",
    //       value: "first_name",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.age.title",
    //       value: "age",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.gender.title",
    //       value: "gender",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.phone.title",
    //       value: "phone",
    //       align: "start",
    //       sortable: true,
    //       width: "20",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.patient_shape.title",
    //       value: "patient_shape",
    //       align: "start",
    //       sortable: true,
    //       width: "30",
    //       class: "grey--text text--darken-3"
    //     },
    //
    //     {
    //       text: "$vuetify.patient.cols.address.title",
    //       value: "address",
    //       align: "start",
    //       sortable: true,
    //       width: "6",
    //       class: "grey--text text--darken-3"
    //     },
    //     // {
    //     //   text: "$vuetify.patient.cols.status.title",
    //     //   value: "is_active",
    //     //   align: "start",
    //     //   sortable: true,
    //     //   width: "1",
    //     //   class: "grey--text text--darken-3"
    //     // },
    //     {
    //       text: "$vuetify.patient.cols.balance.title",
    //       value: "balance",
    //       align: "start",
    //       sortable: true,
    //       width: "15",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.total_bills.title",
    //       value: "total_bills",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.total_payment.title",
    //       value: "total_payment",
    //       align: "start",
    //       sortable: true,
    //       width: "50",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.created.title",
    //       value: "create_date",
    //       align: "start",
    //       sortable: true,
    //       width: "105",
    //       class: "grey--text text--darken-3"
    //     },
    //     {
    //       text: "$vuetify.patient.cols.actions.title",
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
        title: "$vuetify.employee.new.title",
        submit: "$vuetify.employee.new.submit",
        success: "$vuetify.employee.new.success",
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
        age: null,
        gender: null,
        shape: null,
      };
    },
    editEmployee(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.employee.update.title",
        submit: "$vuetify.employee.update.submit",
        success: "$vuetify.employee.update.success",
      };
      this.$refs.userForm.setForm(item);
    },
    detailsEmployee(item) {
      this.$router.push({
        name: "detailsEmployee",
        params: { id: item.id, name: item.name },
      });
    },
    consultationPatient(item) {
      this.$router.push({
        name: "consultationPatient",
        params: { id: item.id, name: item.name },
      });
    },
    ordinancePatient(item) {
      this.$router.push({
        name: "ordinancePatient",
        params: { id: item.id, name: item.name },
      });
    },
    appointmentPatient(item) {
      this.$router.push({
        name: "appointmentPatient",
        params: { id: item.id, name: item.name },
      });
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
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
      if (self.filter.shape !== null) {
        params["shape"] = self.filter.shape;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.gender !== null) {
        params["gender"] = self.filter.gender;
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
    FormPatient,
    DeleteItem,
    FormPdf,
  },
};
</script>

<style scoped></style>
