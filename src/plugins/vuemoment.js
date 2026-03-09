import Vue from "vue";

const VueMoment = require("vue-moment");
const moment = require("moment");
require("moment/locale/fr");

Vue.use(VueMoment, { moment });
