<template>
  <v-dialog v-model="dialog.show" persistent max-width="1050px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t("$vuetify.radiography.update_results") }}
        </div>
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
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>{{
                    $vuetify.lang.t("$vuetify.radiography.audio")
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content color="grey lighten-3">
                    <br />
                    <v-row wrap>
                      <v-col cols="12" sm="7" class="mb-0 py-0">
                        <audio-recorder
                          :upload-url="this.getUploadAudio()"
                          :attempts="1"
                          :time="this.timeRecord"
                          :pause-recording="callback"
                          :after-recording="callback"
                          :show-download-button="true"
                          :show-upload-button="true"
                        />
                      </v-col>
                      {{ this.audio }}
                      <v-col
                        cols="12"
                        sm="4"
                        class="mb-0 py-0"
                        style="margin-top: 150px"
                        ><audio-player
                          :src="
                            'http://' +
                            $auth.user().server_ip +
                            ':' +
                            $auth.user().server_port +
                            '/' +
                            this.audio
                          "
                          controls
                      /></v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <br />
            </v-col>
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>{{
                    $vuetify.lang.t("$vuetify.radiography.cols.image.title")
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content color="grey lighten-3">
                    <br />
                    <br />
                    <v-row wrap>
                      <v-col
                        cols="12"
                        sm="11"
                        class="mb-0 py-0"
                        style="margin-top: -15px"
                      >
                        <v-file-input
                          v-model="files"
                          small-chips
                          :show-size="1000"
                          counter
                          placeholder="Select your files"
                          multiple
                          accept="image/*"
                          clearable
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.radiography.cols.image.title'
                            )
                          "
                          @change="fileAdded"
                        >
                          <template v-slot:selection="{ text, index }">
                            <v-chip
                              small
                              text-color="white"
                              color="#295671"
                              close
                              @click:close="remove(index)"
                            >
                              {{ text }}
                            </v-chip>
                          </template>
                        </v-file-input>
                        <!--                  <v-file-input-->
                        <!--                    accept="image/png"-->
                        <!--                    prepend-icon="mdi-camera"-->
                        <!--                    :label="-->
                        <!--                      $vuetify.lang.t(-->
                        <!--                        '$vuetify.alerts.cols.attachments.title'-->
                        <!--                      )-->
                        <!--                    "-->
                        <!--                    @change="selectFile"-->
                        <!--                  >-->
                        <!--                  </v-file-input>-->

                        <!--                <v-text-field-->
                        <!--                    v-model="form.logo"-->
                        <!--                    color="primary"-->
                        <!--                    :label="$vuetify.lang.t('$vuetify.hospitals.cols.logo.title')"-->
                        <!--                    class="font-weight-bold"
              outlined
          dense-->
                        <!--                ></v-text-field>-->
                        <br />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="1"
                        class="mb-0 py-0"
                        style="margin-top: -5px"
                      >
                        <v-btn color="primary" dark @click="save()">
                          <v-icon> mdi-content-save </v-icon>
                        </v-btn></v-col
                      >
                      <v-col cols="12" sm="12" class="mb-0 py-0">
                        <v-layout wrap>
                          <v-flex
                            v-for="(item, index) in this.attachments"
                            :key="index"
                            xs12
                            md12
                          >
                            <v-list>
                              <v-list-item>
                                <v-list-item-title>
                                  <img
                                    class="preview"
                                    style="width: 1000px; height: auto"
                                    :src="
                                      'http://' +
                                      $auth.user().server_ip +
                                      ':' +
                                      $auth.user().server_port +
                                      '/' +
                                      item.file
                                    "
                                    alt=""
                                  />
                                  <!--                    {{item.file.split("/").slice(-1)[0]}}-->
                                </v-list-item-title>
                                <v-list-item-icon>
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on }">
                                      <v-icon
                                        @click="downloadWithAxios(item)"
                                        v-on="on"
                                      >
                                        mdi-download
                                      </v-icon>
                                    </template>
                                    <span>{{
                                      $vuetify.lang.t("$vuetify.btn.download")
                                    }}</span>
                                  </v-tooltip>
                                </v-list-item-icon>
                              </v-list-item>
                            </v-list>
                            <!--              <a :href="'http://127.0.0.1:8017/media'+item.file" download>File Template</a>-->
                          </v-flex>
                        </v-layout>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <br />
            </v-col>

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
                rows="3"
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{
                    $vuetify.lang.t("$vuetify.radiography.cols.results.title")
                  }}
                </template>
              </v-textarea>
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
import axios from "axios";
import AudioRecorder from "vue-audio-recorder";
import Vue from "vue";
Vue.use(AudioRecorder);
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
          radiography: null,
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
          radiography: null,
        };
      },
    },
    maxDate: new Date().toISOString().substr(0, 10),
    menu: false,
    menu3: false,
    urlDoctor: "doctors",
    itemsDoctor: [],
    timeRecord: 2,
    isLoadingDoctor: false,
    searchDoctor: null,
    urlItems: "details_radiographs",
    urlPatients: "patients",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    headers: [],
    previousFiles: [],
    files: [],
    audio: null,
    items: [],
    itemsUpdate: [],
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
      success: "$vuetify.radiography.delete.success",
    },
    dialogFormAttachment: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    attachments: [],
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
    isLoadingRadiography: false,
    searchRadiography: null,
    itemsRadiography: [],
    urlRadiography: "radiographs",
    urlItemsDetails: "details_radiographs",
  }),
  watch: {},
  created() {
    this.getItemsDetails();
  },
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
    callback(data) {
      console.log("data");
      if (data && data.url) {
        this.url = data.url;
      }
      console.log(data);
    },
    downloadWithAxios(item) {
      let url = "http://127.0.0.1:8012/" + item.file;
      // let url = window.location.origin + window.location.pathname + 'media' + item.file
      let title = item.file.split("/").slice(-1)[0];
      console.log("urlFile", url);
      axios({
        method: "GET",
        url,
        responseType: "blob",
      })
        .then((response) => {
          const urlFile = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = urlFile;
          link.setAttribute("download", title);
          document.body.appendChild(link);
          link.click();
          // this.forceFileDownload(response)
        })
        .catch(() => console.log("error occured"));
    },
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
        radiography:
          this.formDetails.id === undefined
            ? this.formDetails.radiography
            : this.formDetails.radiography["id"],
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
    getUploadAudio() {
      return this.urlItemsDetails + "?radiography_patient=" + this.form.id;
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
      return this.form.id ? "POST" : "POST";
    },
    // save() {
    //   this.$store.dispatch("showNotification", {
    //     statut: false
    //   });
    //   let self = this;
    //   self.$v.$touch();
    //   if (!self.$v.$invalid) {
    //     this.loading = true;
    //     this.$store
    //       .dispatch("request", {
    //         url: self.getRoute(),
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         self.$store.dispatch("showNotification", {
    //           statut: true,
    //           text: self.$vuetify.lang.t(self.messages.success)
    //         });
    //         response;
    //         // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
    //         // let blob = new Blob([response.data], { type: response.data.type });
    //         // const objectUrl = URL.createObjectURL(blob);
    //         // this.editPdf(objectUrl);
    //         if (this.getMethod() === "PUT") {
    //           self.$emit("getItems");
    //         } else {
    //           self.$emit("getItems");
    //           self.resetDataForm();
    //         }
    //       })
    //       .catch(error => {
    //         let message;
    //         if (error.response.status === 400) {
    //           message = "$vuetify.error_occured";
    //           const fields = error.response.data;
    //           self.setFormErrors(fields);
    //           this.$forceUpdate();
    //         } else {
    //           message = "$vuetify.error_server";
    //         }
    //         self.$store.dispatch("showNotification", {
    //           statut: true,
    //           text: self.$vuetify.lang.t(message),
    //           color: "#B71C1C"
    //         });
    //       })
    //       .then(() => {
    //         self.loading = false;
    //       });
    //   }
    //   /*else {
    //            console.log(self.$v);
    //          }*/
    // },
    // save() {
    //   this.$store.dispatch("showNotification", {
    //     statut: false
    //   });
    //   let self = this;
    //   self.$v.$touch();
    //   if (!self.$v.$invalid) {
    //     this.loading = true;
    //     this.$store
    //         .dispatch("request", {
    //           url: self.getRoute(),
    //           method: self.getMethod(),
    //           data: self.getDataForm()
    //         })
    //         .then(response => {
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: self.$vuetify.lang.t(self.messages.success)
    //           });
    //           // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
    //           let blob = new Blob([response.data], { type: response.data.type });
    //           const objectUrl = URL.createObjectURL(blob);
    //           this.editPdf(objectUrl);
    //           if (this.getMethod() === "PUT") {
    //             self.$emit("getItems");
    //           } else {
    //             self.$emit("getItems");
    //             self.resetDataForm();
    //           }
    //         })
    //         .catch(error => {
    //           let message;
    //           if (error.response.status === 400) {
    //             message = "$vuetify.error_occured";
    //             const fields = error.response.data;
    //             self.setFormErrors(fields);
    //             this.$forceUpdate();
    //           } else {
    //             message = "$vuetify.error_server";
    //           }
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: self.$vuetify.lang.t(message),
    //             color: "#B71C1C"
    //           });
    //         })
    //         .then(() => {
    //           self.loading = false;
    //         });
    //   }
    //   /*else {
    //            console.log(self.$v);
    //          }*/
    // },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    resetDataForm() {
      this.items = [];
      this.form.results = null;
      this.form.radiography = null;
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
        radiography: this.form.radiography,
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
      this.formDetails.radiography = item.radiography;
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
            url: self.urlItemsDetails + "?radiography_patient=" + this.form.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            this.itemsUpdate = data.content;
            self.$emit("getItemsDetails");
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
    toggle_record() {
      this.recording = !this.recording;
    },
    send() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails + "?surgery_patient=reset",
          })
          .then((response) => {
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    resetDataFormRadiography() {
      this.formDetails.radiography = null;
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
        let formData = new FormData();
        for (let file of this.files) {
          formData.append("attachments", file);
        }
        if (this.form.id) formData.append("_method", "put");
        if (this.form.radiography)
          formData.append("radiography", this.form.radiography);
        if (this.form.patient) formData.append("patient", this.form.patient);
        if (this.form.doctor) formData.append("doctor", this.form.doctor);
        if (this.form.results) formData.append("results", this.form.results);
        // formData.append("attachments", this.currentFile);
        // formData.append("responsible", this.form.responsible);
        console.log(this.form);
        if (this.form.id) {
          axios
            .put(this.urlItems + "/" + this.form.id, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              self.$store.dispatch("showNotification", {
                statut: true,
                text: self.$vuetify.lang.t(self.messages.success),
              });
              // self.resetDataForm();
              this.getItemsDetails();
              let Item = this.itemsUpdate.filter((t) => {
                return t.id === this.form.id;
              });
              // console.log("items");

              this.attachments = [];
              this.attachments = Item[0]["attachments"];
              this.loading = false;
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
              self.loading = false;
            });
        } else {
          axios
            .post(this.urlItemsDetails, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              self.$store.dispatch("showNotification", {
                statut: true,
                text: self.$vuetify.lang.t(self.messages.success),
              });
              self.resetDataForm();
              this.getItems();
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
              self.loading = false;
            });
        }
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
      this.audio = null;
      this.audio = item.attachmentsAudio ? item.attachmentsAudio[0].file : null;
      this.form.results = item.results;
      this.setItemsFile(item.attachments);
      this.form.date = item.createdAt + " " + item.timeAt;
      this.attachments = [];
      this.attachments = item.attachments;
      this.form.patient = item.patient;
      this.itemsPatient.push(item.patient);
      this.form.radiography = item.radiography["id"];
      this.itemsRadiography.push(item.radiography);
      // this.form.doctor = item.doctor["id"];
      // this.itemsDoctor.push(item.doctor);
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
<style>
.ar-player {
  display: none !important;
}
</style>
