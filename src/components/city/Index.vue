<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_city')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-city</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.city.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="filter.region"
                    :items="itemsregion"
                    :loading="isLoading"
                    :search-input.sync="search"
                    @change="performFilter()"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.region.title')"
                    outlined
                    dense
                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.region.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.district.cols.name.title')"
              prepend-inner-icon="mdi-rename-box"
              v-model="filter.name"
              outlined
              clearable
              @input="performFilter()"
              dense
            ></v-text-field>
          </v-col>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.category.cols.code.title')"
              prepend-inner-icon="mdi-code-array"
              v-model="filter.code"
              outlined
              @input="performFilter()"
              clearable
              dense
            ></v-text-field>
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

        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.region="{ header }">
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

                <td class="subtitle-2">
                  {{ item.region.name }}
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
                            'change_district'
                          )
                        "
                      >
                        <v-btn
                          @click="editCategory(item)"
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
                            'delete_district'
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
        ref="categoryForm"
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
    urlItems: "/cities",
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
      code: null,
      medical_areas: null,
      name: null,
      billable: null,
      is_active: null,
    },
    fileInfos: [],
    urlregion: "regions/all",
    isLoading: false,
    search: null,
    itemsregion: [],
    filter: {
      type: Object,
      default: function () {
        return {
          name: null,
          region: null,
          code: null,
        };
      },
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loadingImport: false,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.district.delete.success",
    },
  }),
  created() {
    //this.setItemRoles();
  },
    watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlregion,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsregion = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("cities/upload", formData, {
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
          text: "$vuetify.category.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.region.title",
          value: "region",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.category.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
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
        title: "$vuetify.city.new.title",
        submit: "$vuetify.city.new.submit",
        success: "$vuetify.city.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        region: null,
      };
    },
    editCategory(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.city.update.title",
        submit: "$vuetify.city.update.submit",
        success: "$vuetify.city.update.success",
      };
      this.$refs.categoryForm.setForm(item);
      // console.log(this._.includes(this.$auth.user().permissions,"add_city"))
    },
    enabled(item) {
      this.$refs.enableCategory.setForm(item);
      if (!item.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.district.cols.status.enabled",
          submit: "$vuetify.district.update.submit",
          success: "$vuetify.district.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.district.cols.status.desabled",
          submit: "$vuetify.district.update.submit",
          success: "$vuetify.district.update.success",
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
        params["name"] = self.filter.name;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.region !== null) {
        params["region"] = self.filter.region;
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
