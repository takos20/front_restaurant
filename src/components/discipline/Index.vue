<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_discipline')"
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
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.discipline.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" class="mb-0 py-0">
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
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="form.sanction"
              :items="itemsSanction"
              :loading="isLoadingSanction"
              :search-input.sync="searchSanction"
              :label="$vuetify.lang.t('$vuetify.sanction.title')"
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
                >{{ $vuetify.lang.t("$vuetify.sanction.title") }}
              </template>
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
        <template v-slot:header.sanction="{ header }">
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
                  {{ item.sanction.name }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.startDate).format("YYYY-MM-DD") }}
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.endDate).format("YYYY-MM-DD") }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.price }}
                </td> -->
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
                            'change_discipline'
                          )
                        "
                      >
                        <v-btn
                          @click="editDiscipline(item)"
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
                            'delete_discipline'
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
      <form-discipline
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="disciplineForm"
      ></form-discipline>
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
import FormDiscipline from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/disciplines",
    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    urlSanction: "sanctions",
    isLoadingSanction: false,
    searchSanction: null,
    itemsSanction: [],
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
      sanction: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.discipline.delete.success",
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
    searchSanction(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingSanction = true;
      this.$store
        .dispatch("request", {
          url: self.urlSanction,
          params: params,
        })
        .then((response) => {
          self.itemsSanction = response.data.content;
        })
        .finally(() => (this.isLoadingSanction = false));
    },
  },
  methods: {
    setHeaders() {
      this.headers = [
        // {
        //   text: "$vuetify.discipline.cols.code.title",
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
          text: "$vuetify.sanction.title",
          value: "sanction",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.discipline.cols.startDate.title",
          value: "startdate",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.discipline.cols.endDate.title",
          value: "enddate",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.discipline.cols.created.title",
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
        title: "$vuetify.discipline.new.title",
        submit: "$vuetify.discipline.new.submit",
        success: "$vuetify.discipline.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editDiscipline(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.discipline.update.title",
        submit: "$vuetify.discipline.update.submit",
        success: "$vuetify.discipline.update.success",
      };
      this.$refs.disciplineForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.emlyee !== null) {
        params["emplyee"] = self.filter.employee;
      }
      if (self.filter.sanction !== null) {
        params["sanction"] = self.filter.sanction;
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
    FormDiscipline,
    DeleteItem,
  },
};
</script>

<style scoped></style>
