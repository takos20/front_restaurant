<template>
  <div>
    <v-row wrap>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <h3 style="padding-left: 15px" class="my-4">
          {{ $vuetify.lang.t("$vuetify.certificate.title") }}
        </h3>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="certificat"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date_certificat"
              color="primary"
              class="font-weight-bold my-2"
              prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
              outlined
              :label="$vuetify.lang.t('$vuetify.meeting.cols.startDate.title')"
              v-bind="attrs"
              v-on="on"
              dense
              readonly
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.start_date_certificat"
            :max="maxDatePatient"
            color="primary"
            @change="getItems"
            @input="certificat = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="4" class="mb-0 py-0">
        <v-menu
          v-model="certificat2"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date_certificat"
              color="primary"
              class="font-weight-bold my-2"
              prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
              outlined
              :label="$vuetify.lang.t('$vuetify.meeting.cols.endDate.title')"
              v-bind="attrs"
              v-on="on"
              dense
              readonly
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.end_date_certificat"
            :max="maxDatePatient"
            :min="getminDatePatient"
            color="primary"
            @change="getItems"
            @input="certificat2 = false"
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
      <template v-slot:header.patient="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr> </template
      ><template v-slot:header.type_certificate="{ header }">
        <tr>
          {{
            $vuetify.lang.t(header.text)
          }}
        </tr>
      </template>
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
                {{
                  $vuetify.lang.t(
                    "$vuetify.certificate.cols.certificate_type." +
                      item.certificate_type
                  )
                }}
              </td>
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
                          'change_certificate'
                        )
                      "
                    >
                      <v-btn
                        @click="editCertificate(item)"
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
                </template>
              </td>
            </tr>
          </tbody>
        </v-hover>
      </template>
    </v-data-table>

    <form-certificate
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="certificateForm"
    ></form-certificate>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItems="getItems"
    ></delete-item>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormCertificate from "./../certificate/Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/certificates",
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
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    items: [],
    form: {
      id: null,
      code: null,
      medication: null,
      patient: null,
      start_date_certificat: null,
      end_date_certificat: null,
      consultation: null,
    },
    certificat2: false,
    certificat: false,
    filter: {
      userpatient: null,
      role: null,
    },
    maxDatePatient: new Date().toISOString().substr(0, 10),
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
      success: "$vuetify.ordinance.delete.success",
    },
  }),
  computed: {
    getminDatePatient() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_certificat)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (self.form.start_date_certificat !== null) {
        params["start_date_certificat"] = self.form.start_date_certificat;
      }
      if (self.form.end_date_certificat !== null) {
        params["end_date_certificat"] = self.form.end_date_certificat;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?doctor=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
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
    editCertificate(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.certificate.update.title",
        submit: "$vuetify.certificate.update.submit",
        success: "$vuetify.certificate.update.success",
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
          text: "$vuetify.certificate.cols.certificate_type.title",
          value: "type_certificate",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
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
        title: "$vuetify.certificate.new.title",
        submit: "$vuetify.certificate.new.submit",
        success: "$vuetify.certificate.new.success",
      };
    },
    editOrdinance(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.ordinance.update.title",
        submit: "$vuetify.ordinance.update.submit",
        success: "$vuetify.ordinance.update.success",
      };
      this.$refs.ordinanceForm.setForm(item);
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
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormCertificate,
    DeleteItem,
  },
};
</script>

<style scoped></style>
