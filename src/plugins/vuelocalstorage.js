import Storage from "vue-ls";
import Vue from "vue";

const options = {
  namespace: process.env.VUE_APP_LOCALSTORAGE_NAMESPACE, // key prefix
  name: "ls", // name variable Vue.[ls] or this.[$ls],
  storage: "local", // storage name session, local, memory
};

Vue.use(Storage, options);
