<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="
            _.includes(this.$auth.user().permissions, 'add_promotionaction')
          "
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-bed-empty</v-icon>
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
          {{ $vuetify.lang.t("$vuetify.promotion_action.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="form.promotion"
              :items="itemsPromotion"
              :loading="isLoading"
              :search-input.sync="search"
              color="primary"
              item-text="name"
              item-value="id"
              @change="performFilter"
              :label="$vuetify.lang.t('$vuetify.promotion.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
            >
              <template #label>
                <span class="red--text"><strong>* </strong></span
                >{{ $vuetify.lang.t("$vuetify.promotion.title") }}
              </template></v-autocomplete
            >
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-select
              outlined
              dense
              @change="performFilter"
              v-model="filter.action_type"
              color="primary"
              :items="optionAction.action_type"
              :label="
                $vuetify.lang.t(
                  '$vuetify.promotion_action.cols.action_type.title'
                )
              "
              :placeholder="
                $vuetify.lang.t(
                  '$vuetify.promotion_action.cols.action_type.title'
                )
              "
              class="font-weight-bold"
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
        <template v-slot:header.promotion="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.value="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.action_type="{ header }">
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
                <td class="subtitle-2">
                  {{ item.promotion.name }}
                </td>

                <td class="subtitle-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.promotion_action.cols.action_type." +
                        item.action_type
                    )
                  }}
                </td>
                <td class="subtitle-2" v-if="item.value">
                  {{ item.value }}
                </td>
                <td class="subtitle-2" v-else>-</td>
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
                            'change_promotionaction'
                          )
                        "
                      >
                        <v-btn
                          @click="editPromotion(item)"
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
                    <!-- <v-tooltip bottom>
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
                                type: 'bed'
                              }
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
                    </v-tooltip> -->
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'delete_promotionaction'
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
      <form-room
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="promotionForm"
      ></form-room>
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
import FormRoom from "./Form";
import DeleteItem from "./../Common/Delete";

export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "/promotion_actions",
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
      name: null,
    },
    optionAction: {
      action_type: [],
    },
    filter: {
      promotion: null,
      action_type: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    urlPromotion: "promotions/all",
    isLoading: false,
    search: null,
    itemsPromotion: [],
    messagesDelete: {
      success: "$vuetify.promotion_action.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPromotion,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsPromotion = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getOptionsAction();
  },
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.promotion.title",
          value: "promotion",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion_action.cols.action_type.title",
          value: "action_type",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion_action.cols.value.title",
          value: "value",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion.cols.created.title",
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
          width: "80",
        },
      ];
    },
    getOptionsAction() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.action_type, (action_type) => {
        self.optionAction.action_type.push({
          text: self.$vuetify.lang.t(action_type.text),
          value: action_type.value,
        });
      });
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.promotion_action.new.title",
        submit: "$vuetify.promotion_action.new.submit",
        success: "$vuetify.promotion_action.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editPromotion(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.promotion_action.update.title",
        submit: "$vuetify.promotion_action.update.submit",
        success: "$vuetify.promotion_action.update.success",
      };
      this.$refs.promotionForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.promotion !== null) {
        params["promotion"] = self.filter.promotion;
      }
      if (self.filter.action_type !== null) {
        params["action_type"] = self.filter.action_type;
      }
      if (self.filter.is_book !== null) {
        params["is_book"] = self.filter.is_book;
      }
      if (self.filter.is_takes !== null) {
        params["is_takes"] = self.filter.is_takes;
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
    FormRoom,
    DeleteItem,
  },
};
</script>

<style scoped></style>
