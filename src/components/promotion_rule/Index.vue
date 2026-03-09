<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_promotionrule')"
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
          {{ $vuetify.lang.t("$vuetify.promotion_rule.filter") }}
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
              :label="$vuetify.lang.t('$vuetify.promotion.title')"
              @change="performFilter"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="form.type_patient"
              :items="itemsType_patient"
              :loading="isLoadingType_patient"
              :search-input.sync="searchType_patient"
              @change="performFilter"
              color="primary"
              item-text="title"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.type_patient.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="form.category"
              :items="itemsCategory"
              :loading="isLoadingCategory"
              :search-input.sync="searchCategory"
              @change="performFilter"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.category.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="form.dish"
              :items="itemsDish"
              :loading="isLoadingDish"
              :search-input.sync="searchDish"
              @change="performFilter"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.dish.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              dense
            ></v-autocomplete>
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
        <template v-slot:header.type_patient="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.category="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.dish="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.start_hour="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.end_hour="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.min_quantity="{ header }">
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

                <td class="subtitle-2" v-if="item.type_patient">
                  {{ item.type_patient.title }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2" v-if="item.category">
                  {{ item.category.name }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2" v-if="item.dish">
                  {{ item.dish.name }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2" v-if="item.start_hour">
                  {{ item.start_hour }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2" v-if="item.end_hour">
                  {{ item.end_hour }}
                </td>
                <td class="subtitle-2" v-else>-</td>
                <td class="subtitle-2" v-if="item.min_quantity">
                  {{ item.min_quantity }}
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
                            'change_promotionrule'
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
                            'delete_promotionrule'
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
    urlItems: "/promotion_rules",
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
    searchDish: null,
    itemsDish: [],
    isLoadingDish: false,
    isLoading: false,
    urlItemsDish: "dishes/all",
    urlPromotion: "promotions/all",
    search: null,
    itemsPromotion: [],
    searchCategory: null,
    itemsCategory: [],
    isLoadingCategory: false,
    urlCategory: "categories/all",
    searchType_patient: null,
    itemsType_patient: [],
    isLoadingType_patient: false,
    urlType_patient: "type_patients/all",
    filter: {
      promotion: null,
      type_patient: null,
      category: null,
      dish: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.promotion_rule.delete.success",
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
    searchDish(value) {
      if (value === null) return;
      const params = { name_language: value };
      let self = this;
      this.isLoadingDish = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDish,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoadingDish = false));
    },
    searchCategory(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCategory = true;
      this.$store
        .dispatch("request", {
          url: self.urlCategory,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsCategory = response.data.content;
        })
        .finally(() => (this.isLoadingCategory = false));
    },
    searchType_patient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingType_patient = true;
      this.$store
        .dispatch("request", {
          url: self.urlType_patient,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsType_patient = response.data.content;
        })
        .finally(() => (this.isLoadingType_patient = false));
    },
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
          text: "$vuetify.type_patient.title",
          value: "type_patient",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.title",
          value: "category",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.dish.title",
          value: "dish",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion_rule.cols.start_hour.title",
          value: "start_hour",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion_rule.cols.end_hour.title",
          value: "end_hour",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.promotion_rule.cols.min_quantity.title",
          value: "min_quantity",
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
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.promotion_rule.new.title",
        submit: "$vuetify.promotion_rule.new.submit",
        success: "$vuetify.promotion_rule.new.success",
      };
      this.form = {
        id: null,
        title: null,
      };
    },
    editPromotion(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.promotion_rule.update.title",
        submit: "$vuetify.promotion_rule.update.submit",
        success: "$vuetify.promotion_rule.update.success",
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
      if (self.filter.type_patient !== null) {
        params["type_patient"] = self.filter.type_patient;
      }
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }
      if (self.filter.dish !== null) {
        params["dish"] = self.filter.dish;
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
