<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_doctor')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-doctor</v-icon>
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
          <v-icon left color="#49c5b6">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.doctor.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-text-field
              v-model="filter.code"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.doctor.cols.code_internal.title')
              "
              prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              filled
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-text-field
              v-model="filter.name"
              color="primary"
              :label="$vuetify.lang.t('$vuetify.doctor.cols.first_name.title')"
              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
              @input="performFilter"
              prefix="Dr"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.department"
              :items="itemsDepartments"
              :loading="isLoading"
              :search-input.sync="search"
              color="primary"
              item-text="name"
              item-value="id"
              @change="performFilter"
              :label="$vuetify.lang.t('$vuetify.departments.cols.name.title')"
              s
              prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
              :menu-props="{
                closeOnClick: true,
                closeOnContentClick: true,
              }"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-text-field
              v-model="filter.speciality"
              color="primary"
              :label="$vuetify.lang.t('$vuetify.doctor.cols.speciality.title')"
              prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-iterator
      :items="items"
      :items-per-page="itemsPerPage"
      :server-items-length="meta.totalElements"
      :loading="loading.list"
      :options.sync="pagination"
      class="mt-2"
      style="background-color: #eceff1"
    >
      <template v-slot:default="props">
        <v-container>
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              sm="1"
              md="1"
              lg="3"
            >
              <v-card color="transparent">
                <v-divider></v-divider>
                <v-divider class="mx-4"></v-divider>
                <div style="background-color: white" class="text-left">
                  <v-col class="mb-0 py-0" cols="12" sm="12">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="body-1 font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.doctor.cols.first_name.title"
                          )
                        }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text style="width: 100px">
                          {{ item.name.toUpperCase() }}</v-list-item-action-text
                        >
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="body-1 font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.doctor.cols.speciality.title"
                          )
                        }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text>{{
                          item.type_doctor.title.toUpperCase()
                        }}</v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="body-1 font-weight-bold">{{
                          $vuetify.lang.t("$vuetify.doctor.cols.phone.title")
                        }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text>{{
                          item.phone.toUpperCase()
                        }}</v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="body-1 font-weight-bold">{{
                          $vuetify.lang.t("$vuetify.doctor.cols.address.title")
                        }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text style="width: 100px">{{
                          item.address
                        }}</v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider
                    ><v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="body-1 font-weight-bold">{{
                          $vuetify.lang.t(
                            "$vuetify.medical_areas.cols.status.title"
                          )
                        }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-list-item-action-text>
                          <v-tooltip top>
                            <template v-slot:activator="{ on }">
                              <template v-if="item.is_active">
                                <v-icon
                                  color="primary"
                                  class="pointer"
                                  dark
                                  v-on="on"
                                >
                                  mdi-check-circle
                                </v-icon>
                              </template>
                              <template v-else>
                                <v-icon
                                  color="red accent-4"
                                  v-on="on"
                                  class="pointer"
                                  dark
                                >
                                  mdi-close-circle
                                </v-icon>
                              </template>
                            </template>
                          </v-tooltip></v-list-item-action-text
                        >
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-card-text class="text-center" style="margin-top: -10px">
                      <v-menu bottom transition="scale-transition">
                        <template v-slot:activator="{ on }">
                          <v-btn icon v-on="on">
                            <v-icon size="30" width="2px">mdi-menu</v-icon>
                          </v-btn>
                        </template>
                        <v-list class="menu-app-bar">
                          <v-list-item
                            @click="editUser(item)"
                            v-if="
                              _.includes(
                                $auth.user().permissions,
                                'change_doctor'
                              )
                            "
                          >
                            <v-list-item-title>
                              {{ $vuetify.lang.t("$vuetify.btn.edit") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="statDoctor(item)"
                            v-if="
                              _.includes(
                                $auth.user().permissions,
                                'view_doctor'
                              )
                            "
                          >
                            <v-list-item-title>
                              {{ $vuetify.lang.t("$vuetify.btn.detail") }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            @click="deleteItem(item)"
                            v-if="
                              _.includes(
                                $auth.user().permissions,
                                'delete_doctor'
                              )
                            "
                          >
                            <v-list-item-title>
                              {{ $vuetify.lang.t("$vuetify.btn.remove") }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-card-text>
                  </v-col>
                </div>
                <!--                <div style="background-color: white" class="text-center">-->
                <!--                  <v-card-text>-->
                <!--&lt;!&ndash;                    <template>&ndash;&gt;-->
                <!--&lt;!&ndash;                      <v-avatar class="center" size="75">&ndash;&gt;-->
                <!--&lt;!&ndash;                        <v-img :src="require('../../assets/user.png')"></v-img>&ndash;&gt;-->
                <!--&lt;!&ndash;                      </v-avatar>&ndash;&gt;-->
                <!--&lt;!&ndash;                    </template>&ndash;&gt;-->
                <!--                    <div-->
                <!--                      class="text-center font-weight-bold black&#45;&#45;text"-->
                <!--                      style="font-size: 15px"-->
                <!--                    >-->
                <!--                      DR {{ item.name.toUpperCase() }}-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                      class="text-center grey&#45;&#45;text text&#45;&#45;darken-1 subtitle-1"-->
                <!--                      style="font-size: 15px"-->
                <!--                    >-->
                <!--                      {{ item.speciality.toUpperCase() }}-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                      class="font-weight-bold black&#45;&#45;text"-->
                <!--                      style="font-size: 15px"-->
                <!--                    >-->
                <!--                      {{ item.phone }}-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                      class="text-center font-weight-bold black&#45;&#45;text"-->
                <!--                      style="font-size: 15px"-->
                <!--                    >-->
                <!--                      {{ item.address.toLowerCase() }}-->
                <!--                    </div>-->
                <!--                    <div-->
                <!--                      class="text-center font-weight-bold black&#45;&#45;text "-->
                <!--                      style="font-size: 15px"-->
                <!--                    >-->
                <!--                      <v-tooltip top>-->
                <!--                        <template v-slot:activator="{ on }">-->
                <!--                          <template v-if="item.is_active">-->
                <!--                            <v-icon-->
                <!--                              color="primary"-->
                <!--                              class="pointer"-->
                <!--                              dark-->
                <!--                              v-on="on"-->
                <!--                            >-->
                <!--                              mdi-check-circle-->
                <!--                            </v-icon>-->
                <!--                          </template>-->
                <!--                          <template v-else>-->
                <!--                            <v-icon-->
                <!--                              color="red accent-4"-->
                <!--                              v-on="on"-->
                <!--                              class="pointer"-->
                <!--                              dark-->
                <!--                            >-->
                <!--                              mdi-close-circle-->
                <!--                            </v-icon>-->
                <!--                          </template>-->
                <!--                        </template>-->
                <!--                      </v-tooltip>-->
                <!--                    </div>-->
                <!--                  </v-card-text>-->

                <!--                </div>-->
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
    <form-doctor
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="userForm"
    ></form-doctor>
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
import FormDoctor from "./Form";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
export default {
  mixins: [ListMixin],
  data: () => ({
    itemsPerPage: 10,
    urlItems: "/doctors",
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
    loadingBtn: false,
    form: {
      id: null,
      code_internal: null,
      coef: null,
      dateNaiss: null,
      dateService: null,
      intervention_days: null,
      position: null,
      address: null,
      speciality: null,
      phone: null,
      email: null,
      department: null,
    },
    filter: {
      code_internal: null,
      coef: null,
      dateNaiss: null,
      dateService: null,
      intervention_days: null,
      position: null,
      address: null,
      speciality: null,
      phone: null,
      email: null,
      department: null,
    },
    urlDepartments: "departments/all",
    isLoading: false,
    search: null,
    itemsDepartments: [],
    selectDepartments: [],
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.doctor.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepartments,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDepartments = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  methods: {
    exportDoctor() {
      let self = this;
      self.$store
        .dispatch("request", {
          url: self.urlItems + "/" + "exports",
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des doctors";
          let blob = new Blob([response.data], { type: response.data.type });
          console.log(response.data);
          FileSaver.saveAs(blob, fileName);
        });
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.doctor.cols.code_internal.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.doctor.cols.first_name.title",
          value: "first_name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.departments.title",
          value: "departments",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.doctor.cols.speciality.title",
          value: "speciality",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.doctor.cols.phone.title",
          value: "phone",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.doctor.cols.position.title",
          value: "position",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.doctor.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.doctor.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.doctor.new.title",
        submit: "$vuetify.doctor.new.submit",
        success: "$vuetify.doctor.new.success",
      };
      this.form = {
        id: null,
        coef: null,
        code_internal: null,
        dateNaiss: null,
        dateService: null,
        intervention_days: null,
        position: null,
        address: null,
        speciality: null,
        name: null,
        phone: null,
        email: null,
        username: null,
        password: null,
        re_password: null,
        role: null,
        is_active: null,
      };
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.doctor.update.title",
        submit: "$vuetify.doctor.update.submit",
        success: "$vuetify.doctor.update.success",
      };
      this.$refs.userForm.setForm(item);
    },
    statDoctor(item) {
      this.$router.push({
        name: "statDoctor",
        params: { id: item.id, name: item.name },
      });
    },
    enabled(user) {
      this.$refs.enableUser.setForm(user);
      if (!user.is_active) {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.doctor.cols.status.enabled",
          submit: "$vuetify.doctor.update.submit",
          success: "$vuetify.doctor.update.success",
        };
      } else {
        this.dialogForm.shows.showInfo = true;
        this.messages = {
          title: "$vuetify.doctor.cols.status.desabled",
          submit: "$vuetify.doctor.update.submit",
          success: "$vuetify.doctor.update.success",
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
      if (self.filter.speciality !== null) {
        params["speciality"] = self.filter.speciality;
      }
      if (self.filter.department !== null) {
        params["department"] = self.filter.department;
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
    FormDoctor,
    DeleteItem,
  },
};
</script>

<style scoped>
.call-button-container {
  margin: auto;
  width: 170px;
  vertical-align: middle;
  padding: 10px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-family: lato-bold;
  font-size: 17px;
  color: white;
}
</style>
