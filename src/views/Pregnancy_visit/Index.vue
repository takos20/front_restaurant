<template>
  <div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
    >
      {{ $vuetify.lang.t("$vuetify.pregnancy_visit.list.title") }}
    </div>
    <pregnancy color="black"></pregnancy>
    <!--    <v-speed-dial v-model="fab" absolute bottom right>-->
    <!--      <template v-slot:activator class="">-->
    <!--        <v-btn v-model="fab" color="#49c5b6" dark fab>-->
    <!--          <v-icon v-if="fab">-->
    <!--            mdi-close-->
    <!--          </v-icon>-->
    <!--          <v-icon v-else>-->
    <!--            mdi-account-circle-->
    <!--          </v-icon>-->
    <!--        </v-btn>-->
    <!--      </template>-->
    <!--      <v-tooltip left>-->
    <!--        <template v-slot:activator="{ on }">-->
    <!--          <v-btn fab dark small color="green" @click="patients()" v-on="on">-->
    <!--            <v-icon>mdi-account-alert</v-icon>-->
    <!--          </v-btn>-->
    <!--        </template>-->
    <!--        <span-->
    <!--          class="-->
    <!--                        text-center-->
    <!--                        font-weight-bold-->
    <!--                        body-2-->
    <!--                        white&#45;&#45;text-->
    <!--                        text&#45;&#45;d-->
    <!--                        ken-1-->
    <!--                      "-->
    <!--        >-->
    <!--          {{ $vuetify.lang.t("$vuetify.patient.title") }}-->
    <!--        </span>-->
    <!--      </v-tooltip>-->
    <!--      <v-tooltip left>-->
    <!--        <template v-slot:activator="{ on }">-->
    <!--          <v-btn fab dark small color="red" @click="appointments()" v-on="on">-->
    <!--            <v-icon>mdi-calendar-check</v-icon>-->
    <!--          </v-btn>-->
    <!--        </template>-->
    <!--        <span-->
    <!--          class="-->
    <!--                        text-center-->
    <!--                        font-weight-bold-->
    <!--                        body-2-->
    <!--                        white&#45;&#45;text-->
    <!--                        text&#45;&#45;d-->
    <!--                        ken-1-->
    <!--                      "-->
    <!--        >-->
    <!--          {{ $vuetify.lang.t("$vuetify.appointment.title") }}-->
    <!--        </span>-->
    <!--      </v-tooltip>-->
    <!--      <v-tooltip left>-->
    <!--        <template v-slot:activator="{ on }">-->
    <!--          <v-btn fab dark small color="indigo" @click="doctors()" v-on="on">-->
    <!--            <v-icon>mdi-doctor</v-icon>-->
    <!--          </v-btn>-->
    <!--        </template>-->
    <!--        <span-->
    <!--          class="-->
    <!--                        text-center-->
    <!--                        font-weight-bold-->
    <!--                        body-2-->
    <!--                        white&#45;&#45;text-->
    <!--                        text&#45;&#45;d-->
    <!--                        ken-1-->
    <!--                      "-->
    <!--        >-->
    <!--          {{ $vuetify.lang.t("$vuetify.doctor.title") }}-->
    <!--        </span>-->
    <!--      </v-tooltip>-->
    <!--    </v-speed-dial>-->
  </div>
</template>

<script>
import Pregnancy from "./../../components/pregnancy_visit/Index";
export default {
  metaInfo() {
    return {
      title: this.$vuetify.lang.t("$vuetify.pregnancy_visit.title"),
    };
  },
  data: () => ({}),
  components: {
    Pregnancy,
  },
};
</script>
