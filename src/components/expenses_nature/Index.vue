<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'add_expenses_nature')
          "
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
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.expenses_nature.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="3">
            <v-text-field
              :label="
                $vuetify.lang.t(
                  '$vuetify.expenses_nature.cols.nature_code.title'
                )
              "
              prepend-inner-icon="mdi-numeric"
              outlined
              dense
              clearable
              @input="performFilter"
              v-model="filter.code"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-select
              v-model="filter.type"
              color="primary"
              :items="optionMovement.type_Movement"
              :label="
                $vuetify.lang.t('$vuetify.expenses_nature.cols.type.title')
              "
              dense
              prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark mdi-18px"
              outlined
              clearable
              @change="performFilter"
              class="font-weight-bold"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-text-field
              v-model="filter.account_number"
              color="primary"
              :label="
                $vuetify.lang.t(
                  '$vuetify.expenses_nature.cols.account_number.title'
                )
              "
              prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
              class="font-weight-bold"
              type="nature"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="mb-0 py-0">
            <v-text-field
              v-model="filter.name"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.expenses_nature.cols.name.title')
              "
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
        <template v-slot:header.nature_code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.type="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.name="{ header }">
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
        <template v-slot:header.account_number="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.used="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_active="{ header }">
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
                  <v-tooltip top>
                    <template
                      v-slot:activator="{ on }"
                      v-if="item.type === 'ENTRY'"
                    >
                      <v-icon
                        color="teal darken-1"
                        class="pointer"
                        dark
                        v-on="on"
                        style="font-size: 15px"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.expenses_nature.cols.type." + item.type
                          )
                        }}
                      </v-icon>
                    </template>
                    <template v-slot:activator="{ on }" v-else>
                      <v-icon
                        color="red accent-4"
                        class="pointer"
                        dark
                        v-on="on"
                        style="font-size: 15px"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.expenses_nature.cols.type." + item.type
                          )
                        }}
                      </v-icon>
                    </template>
                  </v-tooltip>
                </td>
                <td class="subtitle-2">
                  {{ item.name }}
                </td>
                <!--<td class="subtitle-2">-->
                <!--{{ item.nature }}-->
                <!--</td>-->
                <td class="subtitle-2">
                  {{ item.account_number }}
                </td>
                <td class="subtitle-2">
                  {{ item.cash_movement_count }}
                </td>
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_active">
                        <v-icon color="primary" class="pointer" dark v-on="on">
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
                  </v-tooltip>
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
                            'change_expenses_nature'
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
                          @click="detailsExpense(item)"
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
                            'delete_expenses_nature'
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

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/expenses_nature",
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
      type: null,
      email: null,
      nature_code: null,
      password: null,
      role: null,
      is_active: null,
    },
    filter: {
      account_number: null,
      type: null,
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
    messagesDelete: {
      success: "$vuetify.expenses_nature.delete.success",
    },
  }),
  created() {
    this.getOptionsMovement();
  },
  methods: {
    detailsExpense(item) {
      this.$router.push({
        name: "details_expenses",
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
          text: "$vuetify.expenses_nature.cols.nature_code.title",
          value: "nature_code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.cols.type.title",
          value: "type",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.cols.name.title",
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
          text: "$vuetify.expenses_nature.cols.account_number.title",
          value: "account_number",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.used",
          value: "used",
          align: "start",
          sortable: false,
          width: "30",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_areas.cols.status.title",
          value: "is_active",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: true,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.cols.actions.title",
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
        title: "$vuetify.expenses_nature.new.title",
        submit: "$vuetify.expenses_nature.new.submit",
        success: "$vuetify.expenses_nature.new.success",
      };
      this.form = {
        id: null,
        type: null,
        name: null,
        nature: null,
        account_number: null,
        nature_code: null,
        is_active: false,
      };
    },
    editUser(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.expenses_nature.update.title",
        submit: "$vuetify.expenses_nature.update.submit",
        success: "$vuetify.expenses_nature.update.success",
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
      if (self.filter.account_number !== null) {
        params["account_number"] = self.filter.account_number;
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
