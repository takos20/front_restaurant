<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template>
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
        <v-btn
          color="#f1f5fc"
          @click="showFilter()"
          class="mr-2 my-2"
          depressed
        >
          <v-icon color="primary" left>mdi-filter-outline</v-icon>
          {{ $vuetify.lang.t("$vuetify.category.btn.filter.title") }}
        </v-btn>
        <v-spacer></v-spacer>
      </div>
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
        <template v-slot:header.name="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!--        <template v-slot:header.medical_areas="{ header }">-->
        <!--          <tr>-->
        <!--            {{-->
        <!--              $vuetify.lang.t(header.text)-->
        <!--            }}-->
        <!--          </tr>-->
        <!--        </template>-->
        <template v-slot:header.billable="{ header }">
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
                <td class="subtitle-2">{{ item.name }}</td>
                <td class="subtitle-2">
                  {{ item.code }}
                </td>
                <!--                <td class="subtitle-2">-->
                <!--                  {{ item.medical_areas.name }}-->
                <!--                </td>-->
                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.category.cols.billable." + item.billable
                    )
                  }}
                </td>

                <!--<td class="subtitle-2">-->
                <!--<template v-if="item.is_active">-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.category.cols.billable." + item.billable) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--<template v-else>-->
                <!--<v-chip-->
                <!--class="ma-2"-->
                <!--color="primary"-->
                <!--text-color="white"-->
                <!--small-->
                <!--&gt;-->
                <!--{{ $vuetify.lang.t("$vuetify.billable." + item.billable) }}-->
                <!--</v-chip>-->
                <!--</template>-->
                <!--</td>-->
                <td>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <template v-if="item.is_active">
                        <v-icon
                          color="primary"
                          class="pointer"
                          dark
                          @click="enabled(item)"
                          v-on="on"
                        >
                          mdi-check-circle
                        </v-icon>
                      </template>
                      <template v-else>
                        <v-icon
                          color="red accent-4"
                          v-on="on"
                          @click="enabled(item)"
                          class="pointer"
                          dark
                        >
                          mdi-close-circle
                        </v-icon>
                      </template>
                    </template>
                    <template>
                      <span v-if="!item.is_active">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.category.cols.status.enabled"
                          )
                        }}
                      </span>
                      <span v-else>
                        {{
                          $vuetify.lang.t(
                            "$vuetify.category.cols.status.desabled"
                          )
                        }}
                      </span>
                    </template>
                  </v-tooltip>
                </td>
                <td class="subtitle-2">
                  {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                </td>
                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
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
                    <v-tooltip top>
                      <template v-slot:activator="{ on }">
                        <v-icon
                          @click="assignEnterprise(item)"
                          color="secondary"
                          v-on="on"
                          dark
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          mdi-plus-circle-outline
                        </v-icon>
                      </template>
                      <span>
                        {{ $vuetify.lang.t("$vuetify.btn.assign") }}
                      </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
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

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/categories",
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
      medical_areas: null,
      name: null,
      billable: null,
      is_active: null,
    },
    filter: {
      name: null,
      billable: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.category.delete.success",
    },
  }),
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.category.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.code.title",
          value: "code",
          align: "start",
          sortable: false,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.medical_areas.cols.name.title",
        //   value: "medical_areas",
        //   align: "start",
        //   sortable: false,
        //   width: "50",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: this.$vuetify.lang.t("$vuetify.category.cols.billable.title"),
          value: "billable",
          align: "start",
          sortable: false,
          width: "6",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.status.title",
          value: "is_active",
          align: "start",
          sortable: false,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.created.title",
          value: "create_date",
          align: "start",
          sortable: false,
          width: "105",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "140",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.category.new.title",
        submit: "$vuetify.category.new.submit",
        success: "$vuetify.category.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        billable: null,
        is_active: false,
      };
    },
    editCategory(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.category.update.title",
        submit: "$vuetify.category.update.submit",
        success: "$vuetify.category.update.success",
      };
      this.$refs.categoryForm.setForm(item);
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
        params["name"] = self.filter.name;
      }
      if (self.filter.billable !== null) {
        params["billable"] = self.filter.billable;
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
};
</script>

<style scoped></style>
