<template>
  <v-app
    id="inspire"
    :style="{ background: $vuetify.theme.themes.dark.background }"
  >
    <SideBar />
    <v-divider color="white" class="mt-1" dark></v-divider>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-toolbar flat color="rgba(0,0,0,0)" class="mt-n5">
            <v-toolbar-title>Dashboard</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-row class="px-5 mt-n6 ml-5">
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="#2EBFAF"> mdi-clipboard-text </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.consultation.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="#2EBFAF"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.consultation }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="#2EBFAF"> mdi-sign-text </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.ordinance.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="#2EBFAF"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.ordinance }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="#2EBFAF"> mdi-note-text </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.certificate.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="#2EBFAF"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.certificate }}</h2>
                </v-btn>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card
                align="center"
                color="#F9FAFC"
                class="rounded-circle border pt-10"
                width="200"
                height="200"
                flat
              >
                <v-icon size="60" color="#2EBFAF"> mdi-human-pregnant </v-icon>

                <v-card-text class="grey--text text-lg-h6">
                  {{ $vuetify.lang.t("$vuetify.pregnancy_visit.title") }}
                </v-card-text>

                <v-btn
                  absolute
                  color="#2EBFAF"
                  class="white--text"
                  fab
                  left
                  top
                >
                  <h2>{{ this.items.pregnancy_visit }}</h2>
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mt-n5">
            <v-col cols="12" sm="7">
              <History />
            </v-col>
            <v-col cols="12" sm="5">
              <Appointment />
            </v-col>
          </v-row>
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

export default {
  name: "Home",
  data: () => ({
    urlItemsStat: "/consultations/statistiques",
    items: [],
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
            url: self.urlItemsStat,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            // let chartStatus = Chart.getChart("status_chart");
            // if (chartStatus !== undefined) {
            //   chartStatus.destroy();
            // }
            // this.labels = [];
            // this.values = [];
            // for (const prop of data.content.statStatus) {
            //   this.labels.push(
            //       this.$vuetify.lang.t(
            //           "$vuetify.hospitalization.cols.status_occupation." + prop.type
            //       )
            //   );
            //   this.values.push(prop.total);
            // }
            // new Chart(document.getElementById("status_chart"), {
            //   // type:'radar',
            //   type: "doughnut",
            //   data: {
            //     labels: this.labels,
            //     datasets: [
            //       {
            //         label: "Total",
            //         backgroundColor: [
            //           "#3a90cd",
            //           "#8e5ea2"
            //         ],
            //         borderColor: ["#E9EEF4"],
            //         data: this.values,
            //         borderWidth: 3
            //       }
            //     ]
            //   },
            //   options: {
            //     plugins: {
            //       doughnutlabel: {
            //         labels: [
            //           { text: "550", font: { size: 20 } },
            //           { text: "total" }
            //         ]
            //       }
            //     }
            //   }
            // }),

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
  components: {},
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
