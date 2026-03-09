<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
    v-if="_.includes($auth.user().permissions, 'view_dashboard_secretariat')"
  >
    <v-divider color="white" class="mt-1" dark></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-toolbar flat color="rgba(0,0,0,0)" class="mt-n5">
            <!--            <v-toolbar-title>Dashboard</v-toolbar-title>-->
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-row class="px-5 mt-n6 ml-5">
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="170"
                height="170"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-atom-variant
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.reagent.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.reagent }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="170"
                height="170"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-food
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.consumable.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.consumable }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="170"
                height="170"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-ev-plug-ccs2
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.bills.cols.bill_type.exam_laboratory"
                    )
                  }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.laboratory }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="170"
                height="170"
                flat
              >
                <v-icon size="60" color="primary">
                  mdi-calendar-check
                  <!--                  {{ list.icon }}-->
                </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.appointment.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="primary"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.appointments }}</h2>
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
      <!--      <v-card-->
      <!--        height=""-->
      <!--        flat-->
      <!--        color="transparent"-->
      <!--        style="margin-left: -15px"-->
      <!--        class="mt-n5"-->
      <!--      >-->
      <!--        <v-toolbar color="rgba(0,0,0,0)" flat> </v-toolbar>-->

      <!--        <div-->
      <!--          style="border: 0px #CCC solid;-->
      <!--  width: 330px;"-->
      <!--        >-->
      <!--          <canvas height="1vh" id="genderChart"></canvas>-->
      <!--        </div>-->
      <!--      </v-card>-->
    </v-container>
  </v-app>
</template>

<script>
// import Table from "./Table";
// import History from "./History";
// import Appointment from "./Appointment";
import Chart from "chart.js/auto";
export default {
  name: "Home",
  data: () => ({
    urlItemsStatLabo: "/laboratories/statistics",
    items: [],
    labels: [],
    values: [],
  }),
  mounted() {
    this.getItems();
    // if (window.location.reload()){
    // }
  },
  methods: {
    getItems() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsStatLabo,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            let chartStatus = Chart.getChart("genderChart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labels = [];
            this.values = [];
            for (const prop of data.content.statGender) {
              this.labels.push(
                this.$vuetify.lang.t("$vuetify.users.cols.gender." + prop.type)
              );
              this.values.push(prop.total);
            }
            new Chart(document.getElementById("genderChart"), {
              // type:'radar',
              type: "polarArea",
              data: {
                labels: this.labels,
                datasets: [
                  {
                    label: "Total",
                    backgroundColor: ["#c45850", "#3a90cd"],
                    borderColor: ["#E9EEF4"],
                    data: this.values,
                    borderWidth: 3,
                  },
                ],
              },
            }),
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
