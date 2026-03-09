<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'add_employeemission')
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
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.employeeMission.filter") }}
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
        <template v-slot:header.destination="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.reason="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.means_transport="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.startDate="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.endDate="{ header }">
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
                  {{ item.destination }}
                </td>
                <td class="subtitle-2">
                  {{ item.reason }}
                </td>
                <td class="subtitle-2">
                  {{ item.means_transport }}
                </td>
                <td class="subtitle-2">
                  {{ item.startDate }}
                </td>
                <td class="subtitle-2">
                  {{ item.endDate }}
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
                            'change_employeemission'
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
                      <!--                      v-if="_.includes($auth.user().permissions, 'change_ordinance')"-->
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_employeemission'
                          )
                        "
                      >
                        <v-btn
                          @click="print(item)"
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
                        $vuetify.lang.t("$vuetify.employeeMission.list.doc")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_employeemission'
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
      <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
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
import FormPdf from "./../bills/Pdf";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/employeeMissions",
    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    urlbonus: "performanceBonus",
    isLoadingbonus: false,
    searchbonus: null,
    itemsbonus: [],
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPdf: {
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
      bonus: null,
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
    searchbonus(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingbonus = true;
      this.$store
        .dispatch("request", {
          url: self.urlbonus,
          params: params,
        })
        .then((response) => {
          self.itemsbonus = response.data.content;
        })
        .finally(() => (this.isLoadingbonus = false));
    },
  },
  methods: {
    setHeaders() {
      this.headers = [
        // {
        //   text: "$vuetify.employeeMission.cols.code.title",
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
          text: "$vuetify.employeeMission.cols.destination.title",
          value: "destination",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeMission.cols.reason.title",
          value: "reason",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeMission.cols.means_transport.title",
          value: "means_transport",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeMission.cols.startDate.title",
          value: "created",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeMission.cols.endDate.title",
          value: "endDate",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.employeeMission.cols.created.title",
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
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    print(item) {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      this.loadingBtn = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems + "/print" + "?id=" + item.id,
          method: "POST",
        })
        .then((response) => {
          // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          this.editPdf(objectUrl);
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
          self.loadingBtn = false;
        });
      /*else {
               console.log(self.$v);
             }*/
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.employeeMission.new.title",
        submit: "$vuetify.employeeMission.new.submit",
        success: "$vuetify.employeeMission.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editDiscipline(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.employeeMission.update.title",
        submit: "$vuetify.employeeMission.update.submit",
        success: "$vuetify.employeeMission.update.success",
      };
      this.$refs.disciplineForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.emlyee !== null) {
        params["employee"] = self.filter.employee;
      }
      if (self.filter.bonus !== null) {
        params["bonus"] = self.filter.bonus;
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
    FormPdf,
  },
};
</script>

<style scoped></style>
