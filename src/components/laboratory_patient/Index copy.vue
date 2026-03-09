<template>
  <div>
    <v-card class="pb-4" height="60">
      <div class="mt-5 mx-5">
        <!--        <template>-->
        <!--          &lt;!&ndash;          v-if="_.includes(this.$auth.user().permissions, 'add_ordinance')"&ndash;&gt;-->

        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            @click="create()"-->
        <!--            color="primary"-->
        <!--            dark-->
        <!--            v-if="-->
        <!--              _.includes(this.$auth.user().permissions, 'add_laboratorypatient')-->
        <!--            "-->
        <!--          >-->
        <!--            <v-icon left>mdi-medical-bag</v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
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
        <v-btn
          color="#f1f5fc"
          @click="showFilter()"
          class="mr-2 my-2"
          depressed
        >
          <v-icon color="primary" left>mdi-filter-outline</v-icon>
          {{ $vuetify.lang.t("$vuetify.users.btn.filter.title") }}
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <v-card class="pb-4">
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
        ><template v-slot:header.doctor="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.laboratory="{ header }">
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
                  {{ item.doctor.name }}
                </td>
                <td class="subtitle-2">
                  {{ item.laboratory ? item.laboratory.title : "-" }}
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
                            'change_laboratorypatient'
                          )
                        "
                      >
                        <v-btn
                          @click="editLaboratoryPatient(item)"
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
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_laboratorypatient'
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

      <form-laboratory
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="laboratoryPatientForm"
      ></form-laboratory>
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
import FormLaboratory from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/laboratory_patients",
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
      code: null,
      medication: null,
      patient: null,
      consultation: null,
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
      success: "$vuetify.laboratoryPatient.delete.success",
    },
  }),
  methods: {
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
          text: "$vuetify.certificate.cols.doctor.title",
          value: "doctor",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.laboratory.title",
          value: "laboratory",
          align: "start",
          sortable: true,
          width: "100",
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
        title: "$vuetify.laboratory.new.title",
        submit: "$vuetify.laboratory.new.submit",
        success: "$vuetify.laboratory.new.success",
      };
    },
    editLaboratoryPatient(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.laboratory.update.title",
        submit: "$vuetify.laboratory.update.submit",
        success: "$vuetify.laboratory.update.success",
      };
      this.$refs.laboratoryPatientForm.setForm(item);
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
    FormLaboratory,
    DeleteItem,
  },
};
</script>

<style scoped></style>
