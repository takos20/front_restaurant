<template>
  <div>
    <v-container class="grey lighten-4" fluid style="margin-top: 25px">
      <template>
        <v-card class="pb-4" height="105" style="margin-top: 35px">
          <div class="mt-5 mx-5 my-8">
            <v-row wrap>
              <div v-on:click="showStock_available"></div>
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0 my-1"
                style="margin-top: -30px"
              >
                <template>
                  <v-btn
                    class="mr-2 my-2"
                    @click="showAvailable() + getItemsStock()"
                    color="primary"
                    dark
                    height="80"
                  >
                    <v-icon left>mdi-archive</v-icon>
                    <v-icon left style="margin-left: -10px"
                      >mdi-check-bold</v-icon
                    >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.stock_management.title_stocks_available"
                      )
                    }}
                  </v-btn>
                </template></v-col
              >
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0 my-1"
                style="margin-top: -30px"
              >
                <template>
                  <v-btn
                    class="mr-2 my-2"
                    @click="showSmovements"
                    color="primary"
                    dark
                    height="80"
                  >
                    <v-icon left>mdi-archive</v-icon>
                    <v-icon left style="margin-left: -10px"
                      >mdi-arrow-split-vertical</v-icon
                    >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.stock_management.title_stocks_movements"
                      )
                    }}
                  </v-btn>
                </template>
              </v-col>

              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0 my-1"
                style="margin-top: -30px"
              >
                <template>
                  <v-btn
                    class="mr-2 my-2"
                    @click="showInventory"
                    color="primary"
                    height="80"
                    dark
                  >
                    <v-icon left>mdi-shape</v-icon>
                    <v-icon left style="margin-left: -10px"
                      >mdi-arrow-split-vertical</v-icon
                    >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.stock_management.title_inventories"
                      )
                    }}
                  </v-btn>
                </template>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0 my-1"
                style="margin-top: -30px"
              >
                <template>
                  <v-btn
                    class="mr-2 my-2"
                    @click="showItemMovements"
                    color="primary"
                    dark
                    height="80"
                  >
                    <v-icon left>mdi-arrow-split-horizontal</v-icon>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.stock_management.title_item_movements"
                      )
                    }}
                  </v-btn>
                </template></v-col
              >
            </v-row>
            <v-spacer></v-spacer>
          </div>
        </v-card>
      </template>
      <!--<v-btn-->
      <!--:loading="loading.refresh"-->
      <!--@click="refreshItems()"-->
      <!--class="mr-2 my-2"-->
      <!--depressed-->
      <!--&gt;-->
      <!--<v-icon left color="primary">mdi-refresh</v-icon>-->
      <!--{{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
      <!--</v-btn>-->
      <!--<v-btn @click="showFilter()" class="mr-2 my-2" depressed>-->
      <!--<v-icon color="primary" left>mdi-filter-outline</v-icon>-->
      <!--{{ $vuetify.lang.t("$vuetify.users.btn.filter.title") }}-->
      <!--</v-btn>-->
      <!--<v-spacer></v-spacer>-->
    </v-container>
  </div>
</template>

<script>
//import ListMixin from "./../../mixins/Common/List.vue";
import { setLocaleBCP47 } from "./../../helpers/Utils";
export default {
  //mixins: [ListMixin],
  data: () => ({
    urlItems: "",
    receivedCall: "",
    totalMinute: "",
    tempsMoyen: "",
    pack: "",
    loading: false,
    images: [
      {
        src: require("./../../assets/kids-ROI-banner.jpg"),
      },
      {
        src: require("./../../assets/passport vaccins.jpg"),
      },
      {
        src: require("./../../assets/vaccines-explainedresize.jpg"),
      },
      {
        src: require("./../../assets/vaccination-que-contiennent-les-vaccins-do.jpg"),
      },
    ],
  }),
  components: {},
  created() {
    this.locale = setLocaleBCP47(this.$vuetify.lang.current);
    // this.getStats();
  },
  methods: {
    organisation() {
      this.$router.push({
        name: "dashboardFolder",
        params: { idD: "organisation" },
      });
    },
    secretariat() {
      this.$router.push({
        name: "dashboardFolder",
        params: { idD: "secretariat" },
      });
    },
    facturation() {
      this.$router.push({
        name: "dashboardFolder",
        params: { idD: "facturation" },
      });
    },
    pharmacy() {
      this.$router.push({
        name: "dashboardFolder",
        params: { idD: "pharmacie" },
      });
    },
  },
};
</script>
<style scoped>
.center {
  margin-left: 6.8rem;
}
.btn {
  font-size: 25px;
}
</style>
