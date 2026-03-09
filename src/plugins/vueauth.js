import Vue from "vue";
import Auth from "@websanova/vue-auth";
import authBearer from "./bearer";
import httpAxios from "@websanova/vue-auth/drivers/http/axios.1.x.js";
import routerVueRouter from "@websanova/vue-auth/drivers/router/vue-router.2.x.js";

const tokenName = "_rent_token";
Vue.use(Auth, {
  // Variables
  auth: authBearer,
  http: httpAxios,
  router: routerVueRouter,
  rolesKey: "role",
  rememberKey: "user_remember",
  staySignedInKey: "user_stay_signed_in",
  tokenDefaultKey: tokenName,
  tokenImpersonateKey: "user_token_impersonate",
  stores: ["storage"],
  cookie: {
    Path: "/",
    Domain: null,
    Secure: false,
    Expires: 12096e5,
    SameSite: "None",
  },

  // Http
  loginData: {
    url: "/login",
    method: "POST",
    redirect: "/",
    fetchUser: true,
    staySignedIn: false,
  },
  logoutData: {
    url: "/logout",
    method: "POST",
    redirect: "/login",
    makeRequest: false,
    //JSON.stringify converti une valeurr javascript en chzine JSON
    //JSON.parse analyse une chaine JSON et construit la valeur javascript
    transformRequest: function (data) {
      const token = Vue.auth.token();
      data = JSON.stringify({
        refresh: JSON.parse(token).refresh,
      });
      return data;
    },
  },
  fetchData: {
    url: "users/me",
    method: "GET",
    enabled: true,
  },
  refreshData: {
    url: "/refresh",
    method: "POST",
    enabled: true,
    interval: 10,
    transformRequest: function (data) {
      //console.log("TOKEN", Vue.auth.token());
      const token = Vue.auth.token();
      data = JSON.stringify({
        refresh: JSON.parse(token).refresh,
      });
      return data;
    },
  },
  parseUserData: (data) => data,
});
