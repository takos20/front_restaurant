<template>
  <div>
    <v-card class="pb-4">
      <v-row wrap>
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes(this.$auth.user().permissions, 'add_insurance')"
          >
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-arrow-decision-outline</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.insurance.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="4">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.insurance.cols.code.title')"
              prepend-inner-icon="mdi-numeric"
              outlined
              dense
              clearable
              @input="performFilter"
              v-model="filter.code"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-text-field
              v-model="filter.number"
              color="primary"
              :label="$vuetify.lang.t('$vuetify.insurance.cols.number.title')"
              prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
              class="font-weight-bold"
              type="nature"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-text-field
              v-model="filter.name"
              color="primary"
              :label="$vuetify.lang.t('$vuetify.insurance.cols.name.title')"
              prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
              class="font-weight-bold"
              type="nature"
              outlined
              dense
              clearable
              @input="performFilter"
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
        <!--<template v-slot:header.nature="{ header }">-->
        <!--<tr>-->
        <!--{{-->
        <!--$vuetify.lang.t(header.text)-->
        <!--}}-->
        <!--</tr>-->
        <!--</template>-->
        <template v-slot:header.number="{ header }">
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
        <template v-slot:header.location="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.percent="{ header }">
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
                  {{ item.name }}
                </td>

                <td class="subtitle-2">
                  {{ item.number }}
                </td>
                <td class="subtitle-2">
                  {{ item.phone }}
                </td>
                <td class="subtitle-2">
                  {{ item.location }}
                </td>
                <td class="subtitle-2">
                  {{ item.percent }}
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
                            'change_insurance'
                          )
                        "
                      >
                        <v-btn
                          @click="editUser(item)"
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
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'view_cash_movement'
                          )
                        "
                      >
                        <v-icon
                          @click="detailsInsurance(item)"
                          color="details"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-details
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.medical_act.details") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_insurance'
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
      <form-user
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="userForm"
      ></form-user>
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
import FormUser from "./Form";
import DeleteItem from "./../Common/Delete";
import axios from "axios";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/insurances",
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
    currentFile: undefined,
    form: {
      id: null,
      type: null,
      email: null,
      code: null,
      percent: null,
      role: null,
      is_active: null,
    },
    fileInfos: [],
    filter: {
      number: null,
      percent: null,
      code: null,
      name: null,
    },
    optionMovement: {
      type_Movement: [],
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    loadingImport: false,
    messagesDelete: {
      success: "$vuetify.insurance.delete.success",
    },
  }),
  created() {
    this.getOptionsMovement();
  },
  methods: {
    upload() {
      let self = this;
      self.loadingImport = true;
      let formData = new FormData();
      formData.append("file", this.currentFile);
      axios
        .post("insurances/upload", formData, {
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
    detailsInsurance(item) {
      this.$router.push({
        name: "details_insurances",
        params: { id: item.id, name: item.name },
      });
    },
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.insurance.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.insurance.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.expenses_nature.cols.nature.title",
        //   value: "nature",
        //   align: "start",
        //   sortable: true,
        //   width: "20",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.insurance.cols.number.title",
          value: "number",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.cols.phone.title",
          value: "phone",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.cols.location.title",
          value: "location",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.cols.percent.title",
          value: "percent",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.insurance.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "100",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.insurance.new.title",
        submit: "$vuetify.insurance.new.submit",
        success: "$vuetify.insurance.new.success",
      };
      this.form = {
        id: null,
        insurance: null,
        name: null,
        number: null,
        code: null,
      };
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.insurance.update.title",
        submit: "$vuetify.insurance.update.submit",
        success: "$vuetify.insurance.update.success",
      };
      this.$refs.userForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.type !== null) {
        params["type"] = self.filter.type;
      }
      if (self.filter.number !== null) {
        params["number"] = self.filter.number;
      }
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItems();
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormUser,
    DeleteItem,
  },
};
</script>

<style scoped></style>
