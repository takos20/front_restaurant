<script>

export default {
  created() {
    this.setHeaders();
    this.setHeadersWaiting();
    this.setHeadersStock_movement();
    this.setHeadersInventory();
  },
  data: () => ({
    headers: [],
    headersWaiting: [],
    headersOrdinance: [],
    events: [],
    items: [],
    itemsLaboaratory: [],
    itemsWaiting: [],
    itemsRDV: [],
    itemsDiagnosticOd: [],
    meta: {},
    supply: false,
    itemPerPage: 5,
    itemPerPageSettlement: 5,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    itemPerPageOptionsSettlement: [5, 10, 30],
    urlItems: "",
    urlItemsAll: "",
    urlItemsGet: "",
    urlItemsDetails: "",
    urlItemsDetails_diagnostic: "",
    urlItemsBonus: "",
    urlItemsLabo: "",
    urlItemsDetails_labo: "",
    urlItemsDetails_radiography: "",
    urlItemsDetails_invest: "",
    urlItemsDetails_surgery: "",
    urlItemsDetails_ordinance: "",
    urlDeleteItems: "",
    sortBy: "id",
    sortDesc: false,
    loading: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingSettlement: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsInvest: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsDiagnostic: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsDiagnosticOd: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsBonus: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsDiagnosticOg: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsSurgery: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsRadiography: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDetailsOrdinance: {
      list: false,
      refresh: false,
      filter: false
    },
    itemsSurgery: [],
    itemsDiagnosticOg: [],
    itemsBonus: [],
    itemsDetailsBonus: [],
    itemsOrdinance: [],
    itemsInvestigation: [],
    itemsRadiography: [],
    loadingLabo: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingRadiography: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingSurgery: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingInvest: {
      list: false,
      refresh: false,
      filter: false
    },
    loadingDiagnostic: {
      list: false,
      refresh: false,
      filter: false
    },
    dialogDelete: {
      show: false
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success"
    },
    messagesDeleteInvest: {
      success: "$vuetify.exam_investigation.delete.success"
    },
    messagesDeleteLaboratory: {
      success: "$vuetify.laboratory.delete.success"
    },
    messagesDeleteSurgery: {
      success: "$vuetify.surgery.delete.success"
    },
    messagesDeleteRadiography: {
      success: "$vuetify.radiography.delete.success"
    },
    messagesDeleteOrdinance: {
      success: "$vuetify.ordinance.delete.success"
    },
    messagesDeleteDiagnostic: {
      success: "$vuetify.diagnostic.delete.success"
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {}
  }),
  watch: {
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true
    },
    paginationSettlement: {
      handler() {
        this.getItems();
      },
      deep: true
    },
  },
  methods: {
    setHeaders() {
      this.headers = [];
      this.headersOrdinance = [];
    },
    setHeadersWaiting() {
      this.headersWaiting = [];
    },
    setHeadersStock_movement() {
      this.headersStock_movement = [];
    },
    setHeadersInventory() {
      this.headersInventory = [];
    },
    refreshItemsEvents() {
      let self = this;
      this.loading.refresh = true;
      this.getItemsEvents()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    refreshItemsSurgery() {
      let self = this;
      this.loadingSurgery.refresh = true;
      this.getItemsDetailsSurgery()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingSurgery.refresh = false;
        });
    },
    refreshItemsRadiography() {
      let self = this;
      this.loadingRadiography.refresh = true;
      this.getItemsDetailsRadiography()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingRadiography.refresh = false;
        });
    },
    refreshItemsInvest() {
      let self = this;
      this.loadingInvest.refresh = true;
      this.getItemsDetailsInvest()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingInvest.refresh = false;
        });
    },
    refreshItems() {
      let self = this;
      this.loading.refresh = true;
      this.getItems()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    refreshItemsGet() {
      let self = this;
      this.loading.refresh = true;
      this.getItems()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loading.refresh = false;
        });
    },
    refreshItemsDetails() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
    },
    refreshItemsLaboratory() {
      let self = this;
      this.loadingLabo.refresh = true;
      this.getItemsDetailsLaboratory()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingLabo.refresh = false;
        });
    },
    refreshItemsDiagnosticOd() {
      let self = this;
      this.loadingDetailsDiagnosticOd.refresh = true;
      this.getItemsDetailsDiagnosticOd()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetailsDiagnosticOd.refresh = false;
        });
    },
    refreshItemsBonus() {
      let self = this;
      this.loadingDetailsBonus.refresh = true;
      this.getItemsDetailsBonus()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetailsBonus.refresh = false;
        });
    },
    refreshItemsDiagnosticOg() {
      let self = this;
      this.loadingDetailsDiagnosticOg.refresh = true;
      this.getItemsDetailsDiagnosticOg()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetailsDiagnosticOg.refresh = false;
        });
    },
    getItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        self.$store
          .dispatch("request", {
            url: "details_supplies" + "?supplies=" + this.form.id_supplies,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    getItemsEvents() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsAll,
            params: params
          })
         .then(response => {
            this.events = [];
            let data = response.data;
            self.items = data.content;
            const events = response.data.content;
            for (const item of events) {
              const department = item.department;
              const appointment_status = item.appointment_status;
              const appointment_type = item.appointment_type;
              const patient_shape = item.patient_shape;

              const problem = item.problem;
              const start_appointment_date = item.start_appointment_date;
              const end_appointment_date = item.end_appointment_date;
              const start_appointment_hour = item.start_appointment_hour;
              const end_appointment_hour = item.end_appointment_hour;
              const patient = item.patient;
              const doctor = item.doctor;
              const id = item.id;

              const start = item.start_appointment_date + " " + item.start_appointment_hour;
              const end = item.end_appointment_date + " " + item.end_appointment_hour;
              const color = item.color;
              const name = item.patient.name + " / " + item.doctor.name;
              this.events.push({
                department,
                appointment_status,
                appointment_type,
                patient_shape,
                problem,
                start_appointment_date,
                start_appointment_hour,
                end_appointment_hour,
                patient,
                doctor,
                end_appointment_date,
                id,
                name,
                start,
                end,
                color
              });
            }
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    getItemsPlus() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems + "?id=" + this.$route.params.id,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.items = data;
            self.meta = { totalElements: data.totalElements };
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },

    getItemsDetailsDiagnosticOd() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsDiagnosticOd.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_diagnostic +
              "?details_consultation=" +
              this.form.consult +
              "&type_diagnostic=RIGHT_EYE",
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsDiagnosticOd = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsDiagnosticOd.list = false;
            resolve();
          });
      });
    },
    getItemsDetailsLaboratory() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_labo +
              "?details_consultation=" +
              this.form.consult,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsLaboaratory = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
<!--    getItemsDetailsInvest() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsInvest.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_invest +
              "?details_consultation=" +
              this.form.consult,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsInvestigation = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsInvest.list = false;
            resolve();
          });
      });
    },-->
    getItemsDetailsSurgery() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsSurgery.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_surgery +
              "?details_consultation=" +
              this.form.consult,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsSurgery = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsSurgery.list = false;
            resolve();
          });
      });
    },
    getItemsDetailsOrdinance() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsOrdinance.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_ordinance +
              "?details_consultation=" +
              this.form.consult,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsOrdinance = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsOrdinance.list = false;
            resolve();
          });
      });
    },
    getItemsDetailsRadiography() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsRadiography.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_radiography +
              "?details_consultation=" +
              this.form.consult,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsRadiography = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsRadiography.list = false;
            resolve();
          });
      });
    },
    getItemsDetailsDiagnosticOg() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsDiagnosticOg.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsDetails_diagnostic +
              "?details_consultation=" +
              this.form.consult +
              "&type_diagnostic=LEFT_EYE",
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsDiagnosticOg = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsDiagnosticOg.list = false;
            resolve();
          });
      });
    },
    getItemsDetailsBonus() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetailsBonus.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsBonus + "?employee=" +
              this.form.employee["id"]+
              "&monthDate=" + this.form.monthDate,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.itemsDetailsBonus = data.content;

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loadingDetailsBonus.list = false;
            resolve();
          });
      });
    },
    getItemsGet() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsGet,
            params: params
          })
          .then(response => {
            let data = response.data;
            self.items = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
            resolve(response);
          })
          .catch(err => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                self.setApiFormErrors(err.response.data.data);
                message = self.$vuetify.lang.t("$vuetify.error_form");
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItems + "/" + item.id;
      this.dialogDelete.show = true;
    },
    deleteItemInvest(item) {
      let self = this;
      this.loadingDetailsInvest.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_invest + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteInvest.success)
          });
          this.getItemsDetailsInvest();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsInvest.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemLaboratory(item) {
      let self = this;
      this.loadingDetails.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_labo + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteLaboratory.success)
          });
          this.getItemsDetailsLaboratory();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetails.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemRadiography(item) {
      let self = this;
      this.loadingDetailsRadiography.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_radiography + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteRadiography.success)
          });
          this.getItemsDetailsRadiography();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsRadiography.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemDiagnosticOd(item) {
      let self = this;
      this.loadingDetailsDiagnosticOd.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_diagnostic + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteDiagnostic.success)
          });
          this.getItemsDetailsDiagnosticOd();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsDiagnosticOd.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemDiagnosticOg(item) {
      let self = this;
      this.loadingDetailsDiagnosticOg.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_diagnostic + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteDiagnostic.success)
          });
          this.getItemsDetailsDiagnosticOg();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsDiagnosticOg.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemOrdinance(item) {
      let self = this;
      this.loadingDetailsOrdinance.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_ordinance + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteOrdinance.success)
          });
          this.getItemsDetailsOrdinance();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsOrdinance.refresh = false;
          // self.dialog.show = false;
        });
    },
    deleteItemSurgery(item) {
      let self = this;
      this.loadingDetailsSurgery.refresh = true;
      this.$store
        .dispatch("request", {
          url: self.urlItemsDetails_surgery + "/"+item.id,
          method: "DELETE"
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messagesDeleteSurgery.success)
          });
          this.getItemsDetailsSurgery();
        })
        .catch(errors => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors")
          });
        })
        .then(() => {
          self.loadingDetailsSurgery.refresh = false;
          // self.dialog.show = false;
        });
    },
    queueItem() {
      // this.urlDeleteItems = this.urlItems + "/" + item.id;
      this.dialogQueue.show = true;
    },
    deleteItemUpdate(item) {
      this.urlDeleteItems = this.urlItems + "?id=" + item.id;
      this.dialogDelete.show = true;
    },
    getSorts(sortBy, sortDesc) {
      let sorts = {};
      if (this._.has(sortBy, "length") && this._.has(sortDesc, "length")) {
        if (sortBy.length > 0 && sortDesc.length > 0) {
          sortBy.forEach((s, k) => {
            sorts["_sorts[" + s + "]"] = sortDesc[k] ? "DESC" : "ASC";
          });
        }
      }
      return sorts;
    }
  }
};
</script>
