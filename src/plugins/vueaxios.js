import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import i18n from "../i18n"; // <- instance i18n

Vue.use(VueAxios, axios);

// Vue.axios.defaults.baseURL = "http://127.0.0.1:8016/api/v1";
// Vue.axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.axios.defaults.headers.common["Accept-Language"] = i18n.locale; // <-- ok

// Mettre à jour l'en-tête si l'utilisateur change de langue
if (i18n.vm) {
  i18n.vm.$watch("locale", (newLocale) => {
    Vue.axios.defaults.headers.common["Accept-Language"] = newLocale;
  });
}
Vue.axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? window.location.origin + "/api/v1" + window.location.pathname
    : process.env.VUE_APP_BASE_URL; //process.env.VUE_APP_BASE_URL;
Vue.axios.defaults.headers.post["Content-Type"] = "application"