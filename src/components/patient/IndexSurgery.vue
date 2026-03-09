<template>
  <div>
    <v-card class="pb-4">
      <v-row>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <h3 style="padding-left: 15px" class="my-4">
            {{ $vuetify.lang.t("$vuetify.surgery.title") }}
          </h3>
        </v-col>
        <v-col cols="12" sm="1" class="mb-0 py-0">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItems()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
          </v-btn> </v-col
        ><v-col cols="12" sm="1" class="mb-0 py-0"> </v-col>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <v-menu
            v-model="menu4"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.start_date"
                color="primary"
                class="font-weight-bold my-2"
                clearable
                prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                outlined
                :label="
                  $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
                "
                v-bind="attrs"
                v-on="on"
                dense
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.start_date"
              @change="getItems"
              :max="maxDate"
              color="primary"
              @input="menu4 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" class="mb-0 py-0">
          <v-menu
            v-model="menu5"
            color="primary"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="form.end_date"
                color="primary"
                class="font-weight-bold my-2"
                clearable
                prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                outlined
                :label="
                  $vuetify.lang.t(
                    '$vuetify.appointment.cols.end_appointment_date.title'
                  )
                "
                v-bind="attrs"
                v-on="on"
                dense
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="form.end_date"
              :max="maxDate"
              :min="getminDateBestSell"
              @change="getItems"
              color="primary"
              @input="menu5 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
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
        <template v-slot:header.doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--        <template v-slot:header.surgery="{ header }">-->
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
                  {{ item.doctor.name }}
                </td>
                <!--                <td class="subtitle-2">-->
                <!--                  {{ item.surgery ? item.surgery.title : "-" }}-->
                <!--                </td>-->
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
                            'change_surgerypatient'
                          )
                        "
                      >
                        <v-btn
                          @click="editSurgeryPatient(item)"
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
                    <!--                        v-slot:activator="{ on }"-->
                    <!--                        v-if="-->
                    <!--                          _.includes(-->
                    <!--                            $auth.user().permissions,-->
                    <!--                            'delete_surgerypatient'-->
                    <!--                          )-->
                    <!--                        "-->
                    <!--                      >-->
                    <!--                        <v-btn-->
                    <!--                          @click="deleteItem(item)"-->
                    <!--                          color="red"-->
                    <!--                          icon-->
                    <!--                          text-->
                    <!--                          v-on="on"-->
                    <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--                          dark-->
                    <!--                        >-->
                    <!--                          <v-icon>mdi-delete-outline</v-icon>-->
                    <!--                        </v-btn>-->
                    <!--                      </template>-->
                    <!--                      <span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>-->
                    <!--                    </v-tooltip>-->
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>

      <form-surgery
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="surgeryPatientForm"
      ></form-surgery>
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
import FormSurgery from "../../components/surgery_patient/Formbills";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  props: {
    id: Number,
  },
  data: () => ({
    urlItems: "/surgery_patients",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    menu4: false,
    menu5: false,
    dialogDetail: {
      show: false,
    },
    maxDate: new Date().toISOString().substr(0, 10),
    maxDateStatMonth: new Date().toISOString().substr(0, 7),
    dialogEnt: {
      show: false,
    },
    form: {
      id: null,
      code: null,
      medication: null,
      patient: null,
      consultation: null,
      start_date: null,
      end_date: null,
    },
    filter: {
      userpatient: null,
      role: null,
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
      success: "$vuetify.surgeryPatient.delete.success",
    },
  }),
  computed: {
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    editCertificate(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.surgeryPatient.update.title",
        submit: "$vuetify.surgeryPatient.update.submit",
        success: "$vuetify.surgeryPatient.update.success",
      };
      this.$refs.surgeryPatientForm.setForm(item);
      // this.getItemsDetails();
      // this.refreshItemsDetails();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.certificate.cols.doctor.title",
          value: "doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.surgery.title",
        //   value: "surgery",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
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
    getItems() {
      let self = this;
      let params = {};
      if (self.form.start_date !== null) {
        params["start_date"] = self.form.start_date;
      }
      if (self.form.end_date !== null) {
        params["end_date"] = self.form.end_date;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?patient=" + this.id,
            method: "get",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;

            // let statP = Object.entries(data.content)
            // this.chartData=statP.length===1? []:Object.entries(data.content);
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
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.surgeryPatient.new.title",
        submit: "$vuetify.surgeryPatient.new.submit",
        success: "$vuetify.surgeryPatient.new.success",
      };
    },
    editSurgeryPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.surgeryPatient.update.title",
        submit: "$vuetify.surgeryPatient.update.submit",
        success: "$vuetify.surgeryPatient.update.success",
      };
      this.$refs.surgeryPatientForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.userpatient !== null) {
        params["userpatient"] = self.filter.userpatient;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
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
    FormSurgery,
    DeleteItem,
  },
};
</script>

<style scoped></style>
