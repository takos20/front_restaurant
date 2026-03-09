<template>
  <v-card-text style="margin-top: -25px">
    <v-btn
      :loading="loading.refresh"
      @click="refreshItemsCat()"
      class="mr-2 my-1"
      depressed
      color="#f1f5fc"
    >
      <v-icon left color="#4E342E">mdi-refresh</v-icon>
      {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
    </v-btn>
    <span class="text-right body-2 black--text text--darken-1 text-h6">
      {{ $vuetify.lang.t("$vuetify.category.list.title") }}
    </span>
    <v-data-iterator
      :footer-props="{
        'items-per-page-options': itemPerPageOptions,
      }"
      :items="itemsCategory"
      :items-per-page="itemPerPage"
      :server-items-length="meta.totalElements"
      :loading="loading.list"
      :options.sync="pagination"
      style="background-color: #eceff1"
    >
      <template v-slot:default="props">
        <v-container>
          <v-row>
            <v-col
              v-for="itemCat in props.items"
              :key="itemCat.id"
              cols="12"
              sm="1"
              md="1"
              lg="3"
            >
              <v-card color="transparent" hover>
                <v-divider></v-divider>
                <div style="background-color: white" class="text-center">
                  <v-card-text>
                    <div
                      class="text-center font-weight-bold black--text mt-5"
                      style="font-size: 15px"
                    >
                      {{ itemCat.name.toUpperCase() }}
                    </div>
                  </v-card-text>
                  <v-card-text class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-badge
                          :content="itemCat.products_count"
                          color="green"
                          overlap
                        >
                          <v-btn
                            class="font-weight-black"
                            large
                            @click="sendCatId(itemCat)"
                            v-on="on"
                            light
                            block
                            color="#d19b6f"
                          >
                            {{ $vuetify.lang.t("$vuetify.dish.titleA") }}
                          </v-btn>
                        </v-badge>
                      </template>
                      <span
                        class="text-center font-weight-bold body-2 white--text text--d ken-1"
                      >
                        {{ $vuetify.lang.t("$vuetify.dish.showProduct") }}
                      </span>
                    </v-tooltip>
                  </v-card-text>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <!--                  <template v-slot:footer>-->
      <!--                    <v-row-->
      <!--                        class="mt-2"-->
      <!--                        align="center"-->
      <!--                        justify="center"-->
      <!--                    >-->

      <!--                      <v-spacer></v-spacer>-->
      <!--                      <v-btn-->
      <!--                          fab-->
      <!--                          light-->
      <!--                          x-small-->
      <!--                          color="#d19b6f"-->
      <!--                          class="mr-5"-->
      <!--                          @click="formerPage"-->
      <!--                      >-->
      <!--                        <v-icon>mdi-chevron-left</v-icon>-->
      <!--                      </v-btn>-->
      <!--                      <v-btn-->
      <!--                          fab-->
      <!--                          light-->
      <!--                          x-small-->
      <!--                          color="#d19b6f"-->
      <!--                          class="mr-5"-->
      <!--                          @click="nextPage"-->
      <!--                      >-->
      <!--                        <v-icon>mdi-chevron-right</v-icon>-->
      <!--                      </v-btn>-->
      <!--                    </v-row>-->
      <!--                  </template>-->
    </v-data-iterator>
  </v-card-text>
</template>

<script>
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
// const FileSaver = require("file-saver");

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          bills_date: null,
          pub: null,
          tva: null,
          payment_method: null,
          had_been_paid: false,
          total_amount: null,
          quantity_served: null,
          product: null,
          subtotal: null,
          total: null,
          bills: null,
          bills_amount: null,
          code: null,
          cashier: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
      coefficient: null,
      number_account: null,
      quote_internal: null,
      quote_external: null,
    },
    headers: [],
    itemsCategory: [],
    meta: {},
    sum: "",
    itemPerPage: 4,
    // pageCat: 1,
    sortByCat: "id",
    sortByProd: "id",
    //itemPerPages: 3,
    itemPerPageOptions: [4, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    paginationCategory: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    isLoading: false,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    itemsProduct: [],
    urlProduct: "products",
    urlItemsCategory: "categories",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsCategory();
      },
      deep: true,
    },
  },
  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    sendCatId(val) {
      this.$emit("getItemsProduct", val);
    },
    refreshItemsCat() {
      let self = this;
      this.loading.refresh = true;
      this.getItemsCategory()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getItemsCategory() {
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
            url: self.urlItemsCategory,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsCategory = data.content;
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
  },
  computed: {},
  components: {},
};
</script>
