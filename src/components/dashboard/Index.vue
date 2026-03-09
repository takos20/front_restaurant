<template>
  <v-container
    class="grey lighten-4"
    fluid
    v-if="
      this.$route.params.idD !== 'secretariat' &&
      this.$route.params.idD !== 'organisation' &&
      this.$route.params.idD !== 'facturation' &&
      this.$route.params.idD !== 'pharmacie'
    "
    style="margin-top: 25px"
  >
    <v-card-actions style="margin-right: 25px">
      <v-row>
        <v-col
          ><v-btn
            @click="secretariat()"
            color="#0067CB"
            light
            height="120"
            width="290"
            elevation="10"
            class="btn text-center text-h4"
            v-if="_.includes(this.$auth.user().permissions, 'view_secretariat')"
          >
            {{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            @click="billing()"
            color="primary"
            dark
            height="120"
            width="290"
            elevation="10"
            class="btn text-center text-h4"
            v-if="_.includes(this.$auth.user().permissions, 'view_billing')"
          >
            {{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            @click="pharmacy()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            elevation="10"
            class="btn text-center text-h4"
            v-if="_.includes(this.$auth.user().permissions, 'view_pharmacy')"
          >
            {{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-container>
</template>

<script>
// import PanelGroupItem from './PanelGroupItem.vue';
export default {
  methods: {
    organisation() {
      this.$router.push({
        name: "dashboardOrganization",
        params: { idD: "organisation" },
      });
    },
    secretariat() {
      this.$router.push({
        name: "dashboardSecretariat",
        params: { idD: "secretariat" },
      });
    },
    billing() {
      this.$router.push({
        name: "dashboardBilling",
        params: { idD: "facturation" },
      });
    },
    pharmacy() {
      this.$router.push({
        name: "dashboardPharmacy",
        params: { idD: "pharmacie" },
      });
    },
  },
};
</script>
