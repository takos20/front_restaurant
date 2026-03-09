import Vue from "vue";
import Vuetify from "vuetify/lib";

import fr from "./../i18n/fr";
import en from "./../i18n/en";
//import i18n from "./../i18n"
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  lang: {
    locales: { fr, en },
    current: "fr",
    //t: (key, ...params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      light: {
        primary: "#4E342E",
        // primary: "#00AEFF",
        secondary: "#00897B",
        error: "#B71C1C",
        cash: "#a9bf7f",
        details: "primary",
        accent: "#9E9E9E",
        orange: "#241104",
        navbar: "#E9EEF4",
        navigation: "#00C4FF",
        btn_logout: "#0F83FF",
        login2card: "#F5F5F5",
        color: "#e9ebef", // #212130 #545464
      },
    },
  },
});
