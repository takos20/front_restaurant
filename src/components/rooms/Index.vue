<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template v-if="_.includes(this.$auth.user().permissions, 'add_room')">
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
          {{ $vuetify.lang.t("$vuetify.room.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="6">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.room.cols.name.title')"
              prepend-inner-icon="mdi-rename-box"
              v-model="filter.name"
              outlined
              dense
              clearable
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              dense
              v-model="filter.type_room"
              :items="itemsTypes_rooms"
              :loading="isLoadingTypes_rooms"
              :search-input.sync="searchTypes_rooms"
              :label="$vuetify.lang.t('$vuetify.types_rooms.title')"
              color="primary"
              item-text="title"
              @change="performFilter"
              hide-no-data
              item-value="id"
              class="font-weight-bold"
              prepend-inner-icon="mdi-code-array"
              outlined
              clearable
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.types_rooms.title") }}
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
        <template v-slot:header.types_rooms="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_book="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.is_takes="{ header }">
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
                  {{ item.type_room.title }}
                </td>
                <td>
                  <template>
                    <template v-if="item.is_book">
                      <v-icon color="primary" class="pointer" dark>
                        mdi-check-circle
                      </v-icon>
                    </template>
                    <template v-else>
                      <v-icon color="red accent-4" class="pointer" dark>
                        mdi-close-circle
                      </v-icon>
                    </template>
                  </template>
                </td>
                <td
                  class="subtitle-2"
                  v-if="item.takes === 'PARTIALLY_OCCUPIED'"
                >
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="green darken-6"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.room.cols.takes.PARTIALLY_OCCUPIED"
                      )
                    }}
                  </v-btn>
                </td>
                <td
                  class="subtitle-2"
                  v-else-if="item.takes === 'TOTALLY_OCCUPIED'"
                >
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="blue darken-5"
                    small
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.room.cols.takes.TOTALLY_OCCUPIED"
                      )
                    }}
                  </v-btn>
                </td>
                <td class="subtitle-2" v-else>
                  <v-btn
                    class="mr-2 my-2 white--text"
                    color="blue darken-5"
                    small
                  >
                    -
                  </v-btn>
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
                          _.includes($auth.user().permissions, 'change_room')
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
                          _.includes($auth.user().permissions, 'add_prices')
                        "
                      >
                        <v-btn
                          @click="
                            $router.push({
                              name: 'prices',
                              params: {
                                id: item.id,
                                title: item.name,
                                code: item.code,
                                type: 'room',
                              },
                            })
                          "
                          color="cash"
                          icon
                          text
                          v-on="on"
                          v-show="$vuetify.breakpoint.smAndDown || hover"
                        >
                          <v-icon>mdi-cash</v-icon>
                        </v-btn>
                      </template>
                      <span>{{
                        $vuetify.lang.t("$vuetify.prices.title")
                      }}</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes($auth.user().permissions, 'delete_room')
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
      <form-bed
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="roomForm"
      ></form-bed>
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
import FormBed from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/rooms",
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
      name: null,
      type_room: null,
    },
    urlTypes_rooms: "types_rooms",
    isLoadingTypes_rooms: false,
    searchTypes_rooms: null,
    itemsTypes_rooms: [],
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.room.delete.success",
    },
  }),
  watch: {
    searchTypes_rooms(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingTypes_rooms = true;
      this.$store
        .dispatch("request", {
          url: self.urlTypes_rooms,
          params: params,
        })
        .then((response) => {
          self.itemsTypes_rooms = response.data.content;
        })
        .finally(() => (this.isLoadingTypes_rooms = false));
    },
  },

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
          text: "$vuetify.types_rooms.title",
          value: "types_rooms",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bed.cols.is_book.title",
          value: "is_book",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bed.cols.is_takes.title",
          value: "is_takes",
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
        title: "$vuetify.room.new.title",
        submit: "$vuetify.room.new.submit",
        success: "$vuetify.room.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editRoom(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.room.update.title",
        submit: "$vuetify.room.update.submit",
        success: "$vuetify.room.update.success",
      };
      this.$refs.roomForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.name !== null) {
        params["name"] = self.filter.name;
      }
      if (self.filter.type_room !== null) {
        params["type_room"] = self.filter.type_room;
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
    FormBed,
    DeleteItem,
  },
};
</script>

<style scoped></style>
