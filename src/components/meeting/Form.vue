<template>
  <v-dialog v-model="dialog.show" persistent max-width="870px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.title"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.meeting.cols.title.title')
                    "
                    prepend-inner-icon="mdi-account-multiple mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.meeting.cols.title.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.members"
                    :items="itemsMembers"
                    :loading="isLoadingMembers"
                    :search-input.sync="searchMembers"
                    color="primary"
                    @blur="$v.form.members.$touch()"
                    @input="$v.form.members.$touch()"
                    :error-messages="membersErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.meeting.cols.members.title')
                    "
                    prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark"
                    class="font-weight-bold"
                    outlined
                    show-select
                    item-text="username"
                    item-value="id"
                    clearable
                    multiple
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.meeting.cols.members.title")
                      }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <!--                <v-col cols="12" sm="12" class="mb-0 py-0">-->
                <!--                  <v-autocomplete-->
                <!--                    v-model="form.guests"-->
                <!--                    :items="itemsGuests"-->
                <!--                    :loading="isLoadingGuests"-->
                <!--                    :search-input.sync="searchGuests"-->
                <!--                    color="primary"-->
                <!--                    item-text="name"-->
                <!--                    item-value="id"-->
                <!--                    :label="-->
                <!--                      $vuetify.lang.t(-->
                <!--                        '$vuetify.meeting.cols.guests.title'-->
                <!--                      )-->
                <!--                    "-->
                <!--                    prepend-inner-icon="mdi-account-multiple-plus mdi-dark mdi-18px"-->
                <!--                    class="font-weight-bold"-->
                <!--                    @blur="$v.form.guests.$touch()"-->
                <!--                    @input="$v.form.guests.$touch()"-->
                <!--                    :error-messages="guestsErrors"-->
                <!--                    outlined-->
                <!--                    dense-->
                <!--                    multiple-->
                <!--                    chips-->
                <!--                    clearable-->
                <!--                  >-->
                <!--                    <template slot="selection" slot-scope="data">-->
                <!--                      {{ data.item.profile?data.item.profile.name:data.item.username }}-->
                <!--                    </template>-->
                <!--                    <template v-slot:item="data">-->
                <!--                      {{ data.item.profile?data.item.profile.name:data.item.username }}-->
                <!--                    </template>-->
                <!--                  </v-autocomplete>-->
                <!--                </v-col>-->

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-sheet outlined color="#BDBDBD" rounded>
                    <v-card outlined elevation="0">
                      <v-card-text>
                        <span
                          class="text-h6 text-center body-2 black--text text--darken-1"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.meeting.cols.external_guests.title"
                            )
                          }}
                        </span>
                        <div class="d-flex justify-space-between">
                          <span class="font-weight-medium text-subtitle-1">
                          </span>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <v-icon @click="addColumnGuests()" v-on="on">
                                mdi-plus-circle-outline
                              </v-icon>
                            </template>
                            <span>{{
                              $vuetify.lang.t("$vuetify.btn.add")
                            }}</span>
                          </v-tooltip>
                        </div>
                        <div
                          class="d-flex wrap align-center mt-8"
                          style="height: 40px"
                        >
                          <v-container>
                            <v-row>
                              <v-text-field
                                outlined
                                :placeholder="
                                  $vuetify.lang.t(
                                    '$vuetify.meeting.cols.external_guests.name'
                                  )
                                "
                                class="font-weight-bold ml-2 mr-1"
                                dense
                                readonly
                                style="width: 100px"
                              ></v-text-field>
                              <v-text-field
                                readonly
                                outlined
                                dense
                                style="width: 100px"
                                :placeholder="
                                  $vuetify.lang.t(
                                    '$vuetify.meeting.cols.external_guests.phone'
                                  )
                                "
                                class="font-weight-bold ml-2 mr-1"
                              ></v-text-field>
                              <v-text-field
                                readonly
                                outlined
                                dense
                                :placeholder="
                                  $vuetify.lang.t(
                                    '$vuetify.meeting.cols.external_guests.email'
                                  )
                                "
                                style="width: 100px"
                                class="font-weight-bold ml-2 mr-1"
                              ></v-text-field>
                              <v-text-field
                                readonly
                                outlined
                                dense
                                :placeholder="
                                  $vuetify.lang.t(
                                    '$vuetify.meeting.cols.external_guests.function'
                                  )
                                "
                                style="width: 100px"
                                class="font-weight-bold ml-2 mr-1"
                              ></v-text-field>
                            </v-row>
                          </v-container>
                        </div>
                        <div
                          v-for="(guest, index) in externalGuests"
                          :key="index"
                        >
                          <div
                            class="d-flex wrap align-center mt-3"
                            style="height: 40px"
                          >
                            <v-text-field
                              outlined
                              dense
                              v-model="guest.name"
                              style="width: 200px"
                              class="font-weight-bold ml-2 mr-1"
                            ></v-text-field>
                            <v-text-field
                              outlined
                              dense
                              v-model="guest.phone"
                              style="width: 200px"
                              class="font-weight-bold ml-2 mr-1"
                              type="number"
                              :rules="[rules.phone.regex]"
                            ></v-text-field>
                            <v-text-field
                              outlined
                              dense
                              v-model="guest.email"
                              style="width: 200px"
                              :rules="[rules.email.regex]"
                              class="font-weight-bold ml-2 mr-1"
                            ></v-text-field>
                            <v-text-field
                              outlined
                              dense
                              v-model="guest.function"
                              style="width: 200px"
                              class="ml-2 mr-1"
                            ></v-text-field>
                            <v-icon
                              class="ml-1 mb-5"
                              style="width: 10px"
                              v-if="index > 0"
                              @click="removeColumnGuests(index)"
                            >
                              mdi-minus-circle-outline
                            </v-icon>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-sheet>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: 15px"
                >
                  <v-menu
                    color="primary"
                    ref="menu"
                    v-model="menuTimeStart"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.startTime"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.meeting.cols.startTime.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        @blur="$v.form.startTime.$touch()"
                        @input="$v.form.startTime.$touch()"
                        :error-messages="startTimeErrors"
                        dense
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuTimeStart"
                      v-model="form.startTime"
                      full-width
                      @click:minute="$refs.menu.save(form.startTime)"
                      color="primary"
                      @input="menuTimeStart = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: 15px"
                >
                  <v-menu
                    color="primary"
                    ref="menu"
                    v-model="menuTimeEnd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.endTime"
                        prepend-inner-icon="mdi-clock-time-four-outline"
                        outlined
                        :label="
                          $vuetify.lang.t('$vuetify.meeting.cols.endTime.title')
                        "
                        v-bind="attrs"
                        v-on="on"
                        @blur="$v.form.endTime.$touch()"
                        @input="$v.form.endTime.$touch()"
                        :error-messages="endTimeErrors"
                        dense
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menuTimeEnd"
                      v-model="form.endTime"
                      full-width
                      @click:minute="$refs.menu.save(form.endTime)"
                      color="primary"
                      @input="menuTimeEnd = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: 15px"
                >
                  <v-menu
                    v-model="menuStart"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.startDate"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.meeting.cols.startDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        @blur="$v.form.startDate.$touch()"
                        @input="$v.form.startDate.$touch()"
                        :error-messages="startDateErrors"
                        dense
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.startDate"
                      :min="maxDateStart"
                      color="primary"
                      @input="menuStart = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  class="mb-0 py-0"
                  style="margin-top: 15px"
                >
                  <v-menu
                    v-model="menuEnd"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.endDate"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
                        "
                        @blur="$v.form.endDate.$touch()"
                        @input="$v.form.endDate.$touch()"
                        :error-messages="endDateErrors"
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.endDate"
                      color="primary"
                      :min="maxDateStart"
                      @input="menuEnd = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeForm()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import ShortUniqueId from "short-unique-id";
import FormMixin from "./../../mixins/Common/Form.vue";
const uid = new ShortUniqueId();
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          // guests: null,
          startDate: null,
          startTime: null,
          endTime: null,
          title: null,
          external_guests: null,
          endDate: null,
          phone: null,
          email: null,
          members: [],
        };
      },
    },
  },
  data: () => ({
    is_active: true,
    files: [],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    externalGuests: [],
    optionsExternalGuests: {
      text: {
        id: "",
        name: "",
        phone: "",
        email: "",
        function: "",
      },
    },
    rules: {
      email: {
        regex: (v) =>
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
            v
          ) || "Email must be valid",
      },
      phone: {
        regex: (v) => /^((6([5-9][0-9]{7})))$/.test(v) || "Phone must be valid",
      },
    },
    menuEnd: false,
    menuStart: false,
    menuTimeStart: false,
    menuTimeEnd: false,
    maxDateStart: new Date().toISOString().substr(0, 10),
    isLoadingGuests: false,
    searchGuests: null,
    itemsGuests: [],
    urlGuests: "users",
    isLoadingMembers: false,
    urlMembers: "users",
    searchMembers: null,
    itemsMembers: [],
    // formR: {
    //   id: null,
    //   name: null
    // },
    urlItems: "meetings",
  }),
  watch: {
    searchGuests(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingGuests = true;
      this.$store
        .dispatch("request", {
          url: self.urlGuests,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsGuests = response.data.content;
        })
        .finally(() => (this.isLoadingGuests = false));
    },
    searchMembers(value) {
      if (value === null) return;

      let self = this;
      this.isLoadingMembers = true;
      this.$store
        .dispatch("request", {
          url: self.urlMembers,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsMembers = response.data.content;
        })
        .finally(() => (this.isLoadingMembers = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        // guests: {
        //   required
        // },
        startDate: {
          required,
        },
        endDate: {
          required,
        },
        startTime: {
          required,
        },
        endTime: {
          required,
        },
        members: {
          required,
        },
      },
    };
    return validators;
  },

  methods: {
    resetDataForm() {
      this.form.id = null;
      this.form.guests = null;
      this.externalGuests = [];
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
    closeForm() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    addColumnGuests() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.externalGuests.push({
        ...this.optionsExternalGuests.text,
        id: uid.rnd(),
      });
    },
    removeColumnGuests(index) {
      this.externalGuests.splice(index, 1);
    },
    remove(index) {
      this.files.splice(index, 1);
    },
    downloadFile() {
      this.downloadWithAxios(this.form.file);
    },
    downloadWithAxios(item) {
      for (let file of item) {
        let url = "http://127.0.0.1:8017/" + "media" + file.file;
        let title = file.file.split("/").slice(-1)[0];
        console.log("urlFile", url);
        axios({
          method: "GET",
          url,
          responseType: "blob",
        })
          .then((response) => {
            const urlFile = window.URL.createObjectURL(
              new Blob([response.data])
            );
            const link = document.createElement("a");
            link.href = urlFile;
            link.setAttribute("download", title);
            document.body.appendChild(link);
            link.click();
            // this.forceFileDownload(response)
          })
          .catch(() => console.log("error occured"));
      }
    },
    fileAdded() {
      if (this.previousFiles.length > 0) {
        this.files.push(...this.previousFiles);
      }
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

            self.$emit("getItems");
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
    // save() {
    //   this.$store.dispatch("showNotification", {
    //     statut: false
    //   });
    //   let self = this;
    //   self.$v.$touch();
    //   if (!self.$v.$invalid) {
    //     let formData = new FormData();
    //     for (let guest of this.externalGuests) {
    //       formData.append("external_guests", JSON.stringify(guest));
    //     }
    //     for (let file of this.files) {
    //       formData.append("attachments", file);
    //     }
    //     // formData.append("guests", this.form.guests);
    //     formData.append("startDate", this.form.startDate);
    //     formData.append("endDate", this.form.endDate);
    //     formData.append("startTime", this.form.startTime);
    //     formData.append("endTime", this.form.endTime);

    //     formData.append("sms_guests", this.form.sms_guests);
    //     formData.append("members", [this.form.members]);
    //     // formData.append("external_guests", JSON.stringify(this.externalGuests));
    //     if (this.form.id === null) {
    //       this.loading = true;
    //       axios
    //         .post(this.urlItems, formData, {
    //           headers: {
    //             "Content-Type": "multipart/form-data"
    //           }
    //         })
    //         .then(() => {
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: self.$vuetify.lang.t(self.messages.success)
    //           });
    //           self.$emit("getItems");
    //           this.resetDataForm();
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
    //     } else {
    //       axios
    //         .put(this.urlItems + "/" + this.form.id, formData, {
    //           headers: {
    //             "Content-Type": "multipart/form-data"
    //           }
    //         })
    //         .then(() => {
    //           this.getItems();
    //           self.$store.dispatch("showNotification", {
    //             statut: true,
    //             text: self.$vuetify.lang.t("$vuetify.hospitals.updateInfo")
    //           });
    //           self.$emit("getItems");
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
    //           // self.loading = false;
    //         });
    //     }
    //   }
    //   /*else {
    //            console.log(self.$v);
    //          }*/
    // },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        // guests: this.form.guests,
        startDate: this.form.startDate,
        startTime: this.form.startTime,
        title: this.form.title,
        endDate: this.form.endDate,
        endTime: this.form.endTime,
        members: this.form.members,
      };

      return data;
    },
    setItemsMembers(use) {
      let self = this;
      self.form.members = [];
      use.forEach((member) => {
        self.itemsMembers.push(member);
        self.form.members.push(member.id);
      });
    },
    setItemsGuests(use) {
      let self = this;
      self.form.guests = [];
      use.forEach((user) => {
        self.itemsGuests.push(user);
        self.form.guests.push(user.id);
      });
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
      // this.form.guests = item.guests;
      this.form.startDate = item.startDate;
      this.form.startTime = item.startTime;
      this.form.endTime = item.endTime;
      this.form.title = item.title;
      this.form.endDate = item.endDate;
      // this.form.file_guests = item.file_guests;
      this.externalGuests = item.external_guests;
      this.form.members = item.members;
      this.setItemsMembers(item.members);
      // this.setItemsGuests(item.guests);
    },
  },
  computed: {
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));
      return errors;
    },
    getminDate() {
      let minDateStart = "";
      minDateStart = new Date(this.form.startDate)?.toISOString().substr(0, 10);
      return minDateStart;
    },
    // guestsErrors() {
    //   let errors = [];
    //   if (!this.$v.form.guests.$dirty) return errors;
    //   !this.$v.form.guests.required &&
    //     errors.push(
    //       this.$vuetify.lang.t(
    //         "$vuetify.meeting.cols.guests.required"
    //       )
    //     );
    //   return errors;
    // },
    startDateErrors() {
      let errors = [];
      if (!this.$v.form.startDate.$dirty) return errors;
      !this.$v.form.startDate.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.startDate.required")
        );
      return errors;
    },
    startTimeErrors() {
      let errors = [];
      if (!this.$v.form.startTime.$dirty) return errors;
      !this.$v.form.startTime.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.startTime.required")
        );
      return errors;
    },
    endDateErrors() {
      let errors = [];
      if (!this.$v.form.endDate.$dirty) return errors;
      !this.$v.form.endDate.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.endDate.required")
        );
      return errors;
    },
    endTimeErrors() {
      let errors = [];
      if (!this.$v.form.endTime.$dirty) return errors;
      !this.$v.form.endTime.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.endTime.required")
        );
      return errors;
    },
    membersErrors() {
      let errors = [];
      if (!this.$v.form.members.$dirty) return errors;

      !this.$v.form.members.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.members.required")
        );
      return errors;
    },
    sms_guestsErrors() {
      let errors = [];
      if (!this.$v.form.sms_guests.$dirty) return errors;
      !this.$v.form.sms_guests.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.sms_guests.required")
        );
      return errors;
    },
    // Gestion des erreurs du formulaire
  },
  components: {},
};
</script>
