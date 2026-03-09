import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from "./plugins/vuetify";
import "./plugins/vuelodash";
import "./plugins/vueaxios";
import "./plugins/vueauth";
import "./plugins/vuemeta";
import "./plugins/vuemoment";
import "./plugins/vuedatetime";
import "./plugins/vuejsonexcel";
import Vuelidate from "vuelidate";
//import i18n from "./i18n";
// require("typeface-roboto");
require("typeface-lato");
// require("typeface-montserrat");

Vue.use(Vuelidate);
Vue.config.productionTip = false;
//Vue.prototype.$axios = axios;

new Vue({
  router,
  vuetify,
  store,
  //i18n,
  render: (h) => h(App),
}).$mount("#app");
