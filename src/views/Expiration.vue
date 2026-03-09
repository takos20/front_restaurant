<template>
  <v-app fluid fill-height class="bg-error">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="3">
        <v-card class="elevation-12">
          <!-- Header avec icône d'avertissement -->
          <v-toolbar color="error" dark>
            <v-toolbar-title>Attention</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-alert-circle</v-icon>
              </template>
              <span>Licence expirée</span>
            </v-tooltip>
          </v-toolbar>

          <!-- Contenu principal -->
          <v-card-text class="pt-6 text-center">
            <div class="mb-4">
              <v-icon size="64" color="error">mdi-lock-alert</v-icon>
            </div>

            <h2 class="headline mb-2 white--text">Votre licence est expirée</h2>
            <p class="subtitle-1 grey--text text--lighten-1">
              Votre accès au système a été suspendu en raison de l'expiration de
              votre licence.
            </p>

            <!-- Informations sur la licence -->
            <v-list class="bg-white rounded-lg mt-4">
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-calendar-clock</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Date d'expiration</v-list-item-title>
                  <v-list-item-subtitle>{{
                    this.$route.params.date
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <!-- <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-key</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>ID de licence</v-list-item-title>
                  <v-list-item-subtitle>{{ licenseId }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item> -->
            </v-list>

            <!-- Actions -->
            <div class="mt-6 text-center">
              <!-- <v-btn color="primary" large @click="renewLicense" class="mr-2">
                Renouveler la licence
              </v-btn> -->

              <v-btn color="secondary" large outlined @click="contactSupport">
                Contacter le support
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "LicenseExpiredPage",
  data() {
    return {
      expirationDate: "2025-04-17",
      licenseId: "LIC-XXXX-YYYY-ZZZZ",
    };
  },
  methods: {
    renewLicense() {
      // Navigation vers la page de renouvellement
      this.$router.push({ name: "license-renewal" });
    },
    contactSupport() {
      // Ouvrir le formulaire de support ou envoyer un email
      window.location.href = "mailto:support@entreprise.com";
    },
  },
};
</script>

<style scoped>
.bg-error {
  background-color: #ff5252 !important;
}
</style>
