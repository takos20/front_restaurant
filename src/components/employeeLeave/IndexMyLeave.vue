<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <!-- <template
          v-if="_.includes(this.$auth.user().permissions, 'add_employeeleave')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-blur-radial</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.add") }}
          </v-btn>
        </template> -->
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
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.employeeLeave.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="form.employee"
              :items="itemsEmployee"
              :loading="isLoadingEmployee"
              :search-input.sync="searchEmployee"
              :label="$vuetify.lang.t('$vuetify.employee.title')"
              color="primary"
              item-text="name"
              hide-no-data
              item-value="id"
              class="font-weight-bold"
              prepend-inner-icon="mdi-code-array"
              outlined
              clearable
            >
              <template slot="selection" slot-scope="data">
                {{ data.item.lastName }} - {{ data.item.firstName }}
              </template>
              <template v-slot:item="data">
                {{ data.item.lastName }} - {{ data.item.firstName }}
              </template>
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.employee.title") }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="form.leave"
              :items="itemsleave"
              :loading="isLoadingleave"
              :search-input.sync="searchleave"
              :label="$vuetify.lang.t('$vuetify.leave.title')"
              color="primary"
              item-text="name"
              hide-no-data
              item-value="id"
              class="font-weight-bold"
              prepend-inner-icon="mdi-code-array"
              outlined
              clearable
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.leave.title") }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" class="mb-0 py-0">
            <v-select
              outlined
              dense
              v-model="filter.status"
              color="primary"
              :items="optionStatusLeave.type_status_leave"
              :label="
                $vuetify.lang.t('$vuetify.employeeLeave.cols.status.title')
              "
              :placeholder="
                $vuetify.lang.t('$vuetify.employeeLeave.cols.status.title')
              "
              class="font-weight-bold"
              @change="performFilter"
            >
            </v-select>
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
        <!-- <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.employee="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.price="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.leave="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.startdate="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.enddate="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.numberDaysRequested="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>

        <template v-slot:header.numberDaysRemaining="{ header }">
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
        <template v-slot:header.created="{ header }">
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
              <!--            <tr v-for="d in items" :key="d.name">-->
              <!--              <td>-->
              <!--                <v-checkbox-->
              <!--                    v-model="selected"-->
              <!--                    :value="d"-->
              <!--                    style="margin:0px;padding:0px"-->
              <!--                    hide-details>-->
              <!--                </v-checkbox>-->
              <!--              </td>-->
              <!--              <td>{{ d.name }}</td>-->
              <!--              <td>{{ d.is_active }}</td>-->
              <!--              <td>{{ d.createdAt }}</td>-->
              <!--            </tr>-->
              <tr :key="item.id" v-for="item in items">
                <!-- <td class="subtitle-2">{{ item.code }}</td> -->
                <td class="subtitle-2">
                  {{ item.employee.lastName }} {{ item.employee.firstName }}
                </td>
                <td class="subtitle-2">
                  {{ item.leave.name }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.startDate).format("YYYY-MM-DD") }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.endDate).format("YYYY-MM-DD") }}
                </td>
                <td class="subtitle-2">
                  {{ item.numberDaysRequested }}
                </td>
                <td class="subtitle-2">
                  {{ item.numberDaysRemaining }}
                </td>
                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.employeeLeave.cols.status." + item.status
                    )
                  }}
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
                            'change_employeeleave'
                          )
                        "
                      >
                        <v-btn
                          @click="editemployeeLeave(item)"
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
                            'delete_employeeleave'
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
      <form-leave
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="employeeLeaveForm"
      ></form-leave>
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
import FormLeave from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/employeeLeaves",
    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    urlleave: "leaves",
    isLoadingleave: false,
    searchleave: null,
    itemsleave: [],
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
    form: {
      id: null,
      title: null,
    },
    filter: {
      employee: null,
      status: null,
      leave: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    optionStatusLeave: {
      type_status_leave: [],
    },
    messagesDelete: {
      success: "$vuetify.employeeLeave.delete.success",
    },
  }),
  watch: {
    searchEmployee(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingEmployee = true;
      this.$store
        .dispatch("request", {
          url: self.urlEmployee,
          params: params,
        })
        .then((response) => {
          self.itemsEmployee = response.data.content;
        })
        .finally(() => (this.isLoadingEmployee = false));
    },
    searchleave(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingleave = true;
      this.$store
        .dispatch("request", {
          url: self.urlleave,
          params: params,
        })
        .then((response) => {
          self.itemsleave = response.data.content;
        })
        .finally(() => (this.isLoadingleave = false));
    },
  },
  created() {
    this.optionStatusEmploye();
  },
  methods: {
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?employee=" + this.$auth.user().id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
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
    optionStatusEmploye() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.employeeLeaveStatus,
        (type_status_leave) => {
          self.optionStatusLeave.type_status_leave.push({
            text: self.$vuetify.lang.t(type_status_leave.text),
            value: type_status_leave.value,
          });
        }
      );
    },
    setHeaders() {
      this.headers = [
        // {
        //   text: "$vuetify.employeeLeave.cols.code.title",
        //   value: "code",
        //   align: "start",
        //   sortable: true,
        //   width: "15",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.employee.title",
          value: "employee",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.leave.title",
          value: "leave",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.startDate.title",
          value: "startdate",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.endDate.title",
          value: "enddate",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.numberDaysRequested.title",
          value: "numberDaysRequested",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.numberDaysRemaining.title",
          value: "numberDaysRemaining",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.status.title",
          value: "status",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeLeave.cols.created.title",
          value: "created",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.shape.cols.actions.title",
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
        title: "$vuetify.employeeLeave.new.title",
        submit: "$vuetify.employeeLeave.new.submit",
        success: "$vuetify.employeeLeave.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editemployeeLeave(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.employeeLeave.update.title",
        submit: "$vuetify.employeeLeave.update.submit",
        success: "$vuetify.employeeLeave.update.success",
      };
      this.$refs.employeeLeaveForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.emlyee !== null) {
        params["emplyee"] = self.filter.employee;
      }
      if (self.filter.leave !== null) {
        params["leave"] = self.filter.leave;
      }
      if (self.filter.status !== null) {
        params["status"] = self.filter.status;
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
    FormLeave,
    DeleteItem,
  },
};
</script>

<style scoped></style>
