<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
    v-if="_.includes($auth.user().permissions, 'view_dashboard_organization')"
  >
    <br />
    <v-card height="50px" flat color="#FAFAFA">
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="2" style="margin-top: -10px">
            <v-btn
              @click="refreshItems()"
              depressed
              class="font-weight-bold"
              color="#f1f5fc"
            >
              <v-icon left color="primary">mdi-refresh</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
            </v-btn>
          </v-col>
          <v-col cols="12" sm="10" class="mb-0 py-0"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <br />
    <v-divider color="white" class="mt-1" dark></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-toolbar flat color="rgba(0,0,0,0)" class="mt-n5">
            <!--            <v-toolbar-title>Dashboard</v-toolbar-title>-->
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-row class="px-5 mt-n6 ml-5">
            <!--  -->
            <v-col cols="12" sm="4">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-12"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-account-group
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.users.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.user }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="4">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-12"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-arrow-decision-outline
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.expenses_nature.list.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.expenses_nature }}</h2>
                </v-btn>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-12"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-adjust
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.users.cols.role.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.role }}</h2>
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
          <!--          <v-row class="mt-n5">-->
          <!--            <v-col cols="12" sm="7">-->
          <!--              <History />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="5">-->
          <!--              <Appointment />-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <!--          <v-row class="mt-n12">-->
          <!--            <v-col cols="12" sm="12">-->
          <!--              <Table />-->
          <!--            </v-col>-->
          <!--          </v-row>-->
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// import Table from "./Table";
// import History from "./History";
// import Appointment from "./Appointment";
export default {
  name: "Home",
  data: () => ({
    urlItemsStatSecretariat: "/hospitals/statistiques",
    items: [],
    labels: [],
    values: [],
  }),
  mounted() {
    this.getItems();
    // this.timer = setInterval(this.getItems, 30000);
    // if (window.location.reload()){
    // }
  },
  methods: {
    refreshItems() {
      this.getItems();
    },
    getItems() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsStatSecretariat,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
            // let statP = Object.entries(self.items?.stat_product);
            // self.chartData =
            //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
            // console.log("meta", data.content[0]);
            resolve(response);
          });
      });
    },
  },
  components: {
    // History,
    // Appointment,
    // Table
  },
};
</script>
<style scoped>
.border {
  border: 2px solid #2ebfaf !important;
}
.v-btn--fab.v-size--default.v-btn--absolute.v-btn--top {
  top: 65px !important;
}
.v-btn--absolute.v-btn--left,
.v-btn--fixed.v-btn--left {
  left: -26px !important;
}
</style>
