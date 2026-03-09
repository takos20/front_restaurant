<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-5 mx-5">
          <template
            v-if="
              _.includes(this.$auth.user().permissions, 'add_patientaccount')
            "
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-blur-radial</v-icon>
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
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.patientaccount.infos.title") }}
        </div>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.patientaccount.infos.description") }}
        </div>
      </v-card-title>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.patientaccount.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.patient"
              :items="itemsPatient"
              :loading="isLoadingPatient"
              :search-input.sync="searchPatient"
              :label="$vuetify.lang.t('$vuetify.patient.title')"
              color="primary"
              item-text="name"
              hide-no-data
              item-value="id"
              @change="performFilter"
              class="font-weight-bold"
              prepend-inner-icon="mdi-code-array"
              outlined
              clearable
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.patient.title") }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-select
              v-model="filter.type_account"
              color="primary"
              :items="optionType_account.type_account"
              :label="
                $vuetify.lang.t(
                  '$vuetify.patientaccount.cols.type_account.title'
                )
              "
              dense
              @change="performFilter"
              prepend-inner-icon="mdi-account-supervisor-circle"
              outlined
              class="font-weight-bold"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
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
        <template v-slot:header.type_account="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.patient_balance="{ header }">
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
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.patientaccount.cols.type_account." +
                        item.type_account
                    )
                  }}
                </td>
                <td class="subtitle-2">
                  {{ item.patient.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.balance }}
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
                            'change_patientaccount'
                          )
                        "
                      >
                        <v-btn
                          @click="editpatientaccount(item)"
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
                            'view_patientaccount'
                          )
                        "
                      >
                        <v-btn
                          @click="detailsPatient(item)"
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
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_patientaccount'
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
      <form-account
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="accountForm"
      ></form-account>
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
import FormAccount from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/patient_accounts",
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
    urlpatient: "patients/all",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    optionType_account: {
      type_account: [],
    },
    currentFile: undefined,
    form: {
      id: null,
      title: null,
    },
    fileInfos: [],
    filter: {
      patient: null,
      type_account: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loadingImport: false,
    messagesDelete: {
      success: "$vuetify.patientaccount.delete.success",
    },
  }),
  watch: {
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingPatient = true;
      this.$store
        .dispatch("request", {
          url: self.urlpatient,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
  },
  created() {
    this.getOptionsType_account();
  },
  methods: {
    detailsPatient(item) {
      this.$router.push({
        name: "detailsPatientAccount",
        params: { id: item.id, type_account: item.type_account },
      });
    },
    getOptionsType_account() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_account, (type_account) => {
        self.optionType_account.type_account.push({
          text: self.$vuetify.lang.t(type_account.text),
          value: type_account.value,
        });
      });
    },
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("surgeries/upload", formData, {
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
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patientaccount.cols.type_account.title",
          value: "type_account",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.patientaccount.cols.patient.title",
          value: "patient",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.patient_balance.title",
          value: "patient_balance",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.type_patient.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.type_patient.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "80",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patientaccount.new.title",
        submit: "$vuetify.patientaccount.new.submit",
        success: "$vuetify.patientaccount.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editpatientaccount(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patientaccount.update.title",
        submit: "$vuetify.patientaccount.update.submit",
        success: "$vuetify.patientaccount.update.success",
      };
      this.$refs.accountForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.patient !== null) {
        params["patient"] = self.filter.patient;
      }

      if (self.filter.type_account !== null) {
        params["type_account"] = self.filter.type_account;
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
    FormAccount,
    DeleteItem,
  },
};
</script>
