<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_consumable')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-home-modern</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.consumable.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="6">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.consumable.cols.name.title')"
              prepend-inner-icon="mdi-rename-box"
              v-model="filter.name"
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
                <td class="subtitle-2">{{ item.code }}</td>
                <td class="subtitle-2">
                  {{ item.name }}
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
                            'change_consumable'
                          )
                        "
                      >
                        <v-btn
                          @click="editRoom(item)"
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
                            'delete_consumable'
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
      <form-consumable
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="consumableForm"
      ></form-consumable>
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
import FormConsumable from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/consumables",
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
      title: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.consumable.delete.success",
    },
  }),
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.expenses_nature.cols.nature_code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.room.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.shape.cols.created.title",
          value: "create_date",
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
          width: "40",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.consumable.new.title",
        submit: "$vuetify.consumable.new.submit",
        success: "$vuetify.consumable.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editRoom(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.consumable.update.title",
        submit: "$vuetify.consumable.update.submit",
        success: "$vuetify.consumable.update.success",
      };
      this.$refs.consumableForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
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
    FormConsumable,
    DeleteItem,
  },
};
</script>

<style scoped></style>
