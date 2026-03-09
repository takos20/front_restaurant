<template>
  <div>
    <v-card class="pb-4" height="60">
      <div class="mt-5 mx-5">
        <!--        <template>-->
        <!--          &lt;!&ndash;          v-if="_.includes(this.$auth.user().permissions, 'add_ordinance')"&ndash;&gt;-->

        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            @click="create()"-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            v-if="_.includes(this.$auth.user().permissions, 'add_radiopatient')"-->
        <!--          >-->
        <!--            <v-icon left>mdi-medical-bag</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
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
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.radiography.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="2">
            <v-menu
              v-model="menu"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.start_date"
                  color="primary"
                  class="font-weight-bold"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title'
                    )
                  "
                  v-bind="attrs"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  v-on="on"
                  dense
                  clearable
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.start_date"
                color="primary"
                @change="performFilter"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-menu
              v-model="menu2"
              color="primary"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="filter.end_date"
                  color="primary"
                  clearable
                  class="font-weight-bold"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.item_movements.cols.period_of.title2'
                    )
                  "
                  v-bind="attrs"
                  v-on="on"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.end_date"
                :min="minDate"
                :max="maxDate"
                color="primary"
                @change="performFilter"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.patient"
              :items="itemsPatient"
              :loading="isLoadingPatient"
              :search-input.sync="searchPatient"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.patient.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.doctor"
              :items="itemsDoctor"
              :loading="isLoadingDoctor"
              :search-input.sync="searchDoctor"
              :label="
                $vuetify.lang.t('$vuetify.prescription.cols.doctor.title')
              "
              outlined
              color="primary"
              item-text="name"
              item-value="id"
              hide-no-data
              @change="performFilter"
              class="font-weight-bold"
              clearable
              autofocus
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <br />
      <v-card-actions style=" margin-top: -45px">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="print()"
          class="mr-2 my-2"
          depressed
          dark
          :loading="loadingBtn"
        >
          <v-icon left>mdi-printer</v-icon>
          {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}
        </v-btn>
      </v-card-actions> -->
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
        item-key="patient"
        class="mt-5"
      >
        <template v-slot:header.patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--                <template v-slot:header.radiography="{ header }">-->
        <!--                  <tr>-->
        <!--                    {{-->
        <!--                      $vuetify.lang.t(header.text)-->
        <!--                    }}-->
        <!--                  </tr> </template-->
        <!--                >-->
        <!--        <template v-slot:header.results="{ header }">-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <template v-slot:header.createdAt="{ header }">
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
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.doctor.name }}
                </td>
                <!--                                <td class="subtitle-2">-->
                <!--                                  {{ item.radiography?item.radiography.title:'-' }}-->
                <!--                                </td>-->
                <!--                                <td class="subtitle-2">-->
                <!--                                  {{-->
                <!--                                    item.results-->
                <!--                                  }}-->
                <!--                                </td>-->
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <!--                      v-if="_.includes($auth.user().permissions, 'change_ordinance')"-->
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_radiopatient'
                          )
                        "
                      >
                        <v-btn
                          @click="editRadioPatient(item)"
                          color="secondary"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-file-document</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t(
                          "$vuetify.radiography.cols.results.title"
                        )
                      }}</span>
                    </v-tooltip>
                    <!--                    <v-tooltip bottom>-->
                    <!--                      <template-->
                    <!--                          v-slot:activator="{ on }"-->
                    <!--                          v-if="-->
                    <!--                                              _.includes(-->
                    <!--                                                $auth.user().permissions,-->
                    <!--                                                'view_attachment'-->
                    <!--                                              )-->
                    <!--                                            "-->
                    <!--                      >-->
                    <!--                        <v-btn-->
                    <!--                            @click="showAttachment(item)"-->
                    <!--                            color="green"-->
                    <!--                            icon-->
                    <!--                            text-->
                    <!--                            v-on="on"-->
                    <!--                            v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-file</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{-->
                    <!--                          $vuetify.lang.t("$vuetify.radiography.cols.image.title")-->
                    <!--                        }}</span>-->
                    <!--                    </v-tooltip>-->
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_radiopatient'
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
      <form-attachment
        :dialog="dialogFormAttachment"
        ref="attachmentForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
      ></form-attachment>
      <form-radio
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="radioPatientForm"
      ></form-radio>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormRadio from "./Formbills";
import DeleteItem from "./../Common/Delete";
import FormAttachment from "./attachmentAlert";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/radiography_patients",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlDoctor: "doctors",
    itemsDoctor: [],
    isLoadingDoctor: false,
    menu: false,
    menu2: false,
    searchDoctor: null,
    searchPatient: null,
    isLoadingPatient: false,
    itemsPatient: [],
    urlPatients: "patients",
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    maxDate: new Date().toISOString().substr(0, 10),
    minDate: new Date().toISOString().substr(0, 10),
    dialogEnt: {
      show: false,
    },
    dialogFormAttachment: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    form: {
      id: null,
      code: null,
      medication: null,
      patient: null,
      consultation: null,
    },
    filter: {
      patient: null,
      doctor: null,
      start_date: null,
      end_date: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.radioPatient.delete.success",
    },
  }),

  watch: {
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDoctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctor,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoadingDoctor = false));
    },
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPatients,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  methods: {
    editCertificate(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.radioPatient.update.title",
        submit: "$vuetify.radioPatient.update.submit",
        success: "$vuetify.radioPatient.update.success",
      };
      this.$refs.certificateForm.setForm(item);
      // this.getItemsDetails();
      // this.refreshItemsDetails();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.certificate.cols.patient.title",
          value: "patient",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.certificate.cols.doctor.title",
          value: "doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.radiography.title",
        //   value: "radiography",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.radiography.cols.results.title",
        //   value: "results",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.consultation.cols.createdAt.title",
          value: "createdAt",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.consultation.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "40",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.radioPatient.new.title",
        submit: "$vuetify.radioPatient.new.submit",
        success: "$vuetify.radioPatient.new.success",
      };
    },
    showAttachment(item) {
      this.dialogFormAttachment.show = true;
      this.$refs.attachmentForm.setForm(item);
      // this.$router.push({
      //   name: "notification",
      //   params: { id: item.id }
      // });
    },
    editRadioPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.radioPatient.update.title",
        submit: "$vuetify.radioPatient.update.submit",
        success: "$vuetify.radioPatient.update.success",
      };
      this.$refs.radioPatientForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.start_date !== null) {
        params["start_date"] = self.filter.start_date;
      }
      if (self.filter.end_date !== null) {
        params["end_date"] = self.filter.end_date;
      }
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }
      if (self.filter.doctor !== null) {
        params["doctor"] = self.filter.doctor;
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
    FormRadio,
    DeleteItem,
    FormAttachment,
  },
};
</script>

<style scoped></style>
