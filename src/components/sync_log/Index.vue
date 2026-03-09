<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_category')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-alpha-c-circle-outline</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.sync.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.hospital"
              :items="itemsHospital"
              :loading="isLoadingHospital"
              :search-input.sync="searchHospital"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.hospitals.title')"
              outlined
              dense
              prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
              class="font-weight-bold"
              clearable
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.model"
              :items="itemsModel"
              :loading="isLoadingModel"
              :search-input.sync="searchModel"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.sync_log.cols.model.title')"
              outlined
              dense
              prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
              class="font-weight-bold"
              clearable
            >
            </v-autocomplete>
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
        <template v-slot:header.hospital="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.direction="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.status="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.content_type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.operation="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.error_message="{ header }">
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

        <template v-slot:header.syncedAt="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.local_updatedAt="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.remote_updatedAt="{ header }">
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
                  {{ item.hospital.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.direction }}
                </td>
                <td class="subtitle-2">
                  {{ item.status }}
                </td>
                <td class="subtitle-2">{{ item.content_type.name }}</td>
                <td class="subtitle-2">{{ item.operation }}</td>
                <td class="subtitle-2">{{ item.error_message }}</td>

                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.syncedAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  {{
                    $moment(item.local_updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </td>
                <td class="subtitle-2">
                  {{
                    $moment(item.remote_updatedAt).format("YYYY-MM-DD HH:mm:ss")
                  }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_category'
                          )
                        "
                      >
                        <v-btn
                          @click="editsync_log(item)"
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
                            'delete_category'
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
      <form-category
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="sync_logForm"
      ></form-category>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <form-enable
        :dialog="dialogForm"
        ref="enableCategory"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
    </v-card>
  </div>
</template>

<script>
import FormEnable from "./EnableCategory";

import ListMixin from "./../../mixins/Common/List.vue";
import FormCategory from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/sync_logs",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    json_fields: {
      Code: "code",
      Name: "name",
      Facturable: "billable",
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
    optionBillable: {
      type_Billable: [],
    },
    currentFile: undefined,
    form: {
      id: null,
      price: null,
      category: null,
      name: null,
      preparation_time: null,
      is_active: null,
    },
    urlHospital: "hospitals",
    isLoadingHospital: false,
    searchHospital: null,
    itemsHospital: [],
    urlModel: "content_types",
    isLoadingModel: false,
    searchModel: null,
    itemsModel: [],
    fileInfos: [],
    filter: {
      type: Object,
      default: function () {
        return {
          hospital: null,
          model: null,
        };
      },
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
    loadingImport: false,
    messagesDelete: {
      success: "$vuetify.sync_log.delete.success",
    },
  }),
  created() {
    //this.setItemRoles();
  },
  watch: {
    searchModel(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingModel = true;
      this.$store
        .dispatch("request", {
          url: self.urlModel,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsModel = response.data.content;
        })
        .finally(() => (this.isLoadingModel = false));
    },
    searchHospital(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingHospital = true;
      this.$store
        .dispatch("request", {
          url: self.urlHospital,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsHospital = response.data.content;
        })
        .finally(() => (this.isLoadingHospital = false));
    },
  },
  methods: {
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("sync_loges/upload", formData, {
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
          text: "$vuetify.hospitals.title",
          value: "hospital",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.direction.title",
          value: "direction",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.status.title",
          value: "status",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.content_type.title",
          value: "content_type",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.operation.title",
          value: "operation",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.createdAt.title",
          value: "createdAt",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.syncedAt.title",
          value: "syncedAt",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.local_updatedAt.title",
          value: "local_updatedAt",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.sync_log.cols.remote_updatedAt.title",
          value: "remote_updatedAt",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.actions.title",
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
        title: "$vuetify.sync_log.new.title",
        submit: "$vuetify.sync_log.new.submit",
        success: "$vuetify.sync_log.new.success",
      };
      this.form = {
        id: null,
        price: null,
        category: null,
        name: null,
        preparation_time: null,
        is_active: null,
      };
    },
    editsync_log(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.sync_log.update.title",
        submit: "$vuetify.sync_log.update.submit",
        success: "$vuetify.sync_log.update.success",
      };
      this.$refs.sync_logForm.setForm(item);
      // console.log(this._.includes(this.$auth.user().permissions,"add_category"))
    },
    enabled(item) {
      this.$refs.enableCategory.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.category.cols.status.enabled",
          submit: "$vuetify.category.update.submit",
          success: "$vuetify.category.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.category.cols.status.desabled",
          submit: "$vuetify.category.update.submit",
          success: "$vuetify.category.update.success",
        };
      }
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name_language"] = self.filter.name;
      }
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }

      self._search = params;
      //console.log("FILTRE", this._search);
      self
        .getItems()
        .then(() => {
          // self.$refs.filterForm.closeDialog();
        })
        .finally(() => {
          // self.$refs.filterForm.stopLoadingBtn();
        });
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormCategory,
    FormEnable,
    DeleteItem,
  },
  computed: {
    get_permissions() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "change_category"
      );
      return result;
    },
  },
};
</script>

<style scoped></style>
