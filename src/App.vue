<template>
  <v-app id="app">
    <v-snackbar
      :color="notification.color"
      :bottom="notification.bottom"
      :left="notification.left"
      :right="notification.right"
      :top="notification.top"
      v-model="notification.statut"
      :timeout="-1"
    >
      {{ notification.text }}
      <v-icon @click="closeSnackbar()" class="white--text" right>
        mdi-close
      </v-icon>
    </v-snackbar>
    <template v-if="$auth.ready()">
      <router-view></router-view>
    </template>
    <template v-else>
      <div class="text-center mt-5">
        <v-progress-circular
          color="secondary"
          indeterminate
          size="80"
          width="3"
        ></v-progress-circular>
      </div>
    </template>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  // metaInfo() {
  //   return {
  //     title: "Rent A Call",
  //     titleTemplate: "%s - " + this.$vuetify.lang.t("$vuetify.app.title")
  //   };
  // },
  data: () => ({}),
  mounted() {
    let current_lang = localStorage.getItem("lang");
    let defaultLang = this.$store.getters.defaultLang;
    let allowedLanguage = this.$store.getters.allowedLanguage;
    //console.log("current_lang", current_lang);
    if (current_lang && allowedLanguage.indexOf(current_lang) > -1) {
      this.$vuetify.lang.current = current_lang;
      this.$moment.locale(current_lang);
    } else {
      window.localStorage.setItem("lang", defaultLang);
      this.$vuetify.lang.current = defaultLang;
      this.$moment.locale(defaultLang);
    }
  },
  computed: {
    ...mapGetters(["notification"]),
  },
  methods: {
    closeSnackbar() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
  },
};
</script>
