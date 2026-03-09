<script>
export default {
  created() {
    this.initErrors();
  },
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    dialogset: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    dialogcmv: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    form: {
      type: Object,
      default: function () {
        return {
          name: null,
        };
      },
    },
    messagesDosage: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    messagesQte: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    messages: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    messagesSet: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    messagesCMV: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    messagesD: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
  },
  data: () => ({
    loading: false,
    loadingOd: false,
    loadingOg: false,
    loadingOrdinance: false,
    loadingLaboratory: false,
    loadinginvest: false,
    loadingSurgery: false,
    loadingRadiography: false,
    urlItems: "",
    urlItemsBonus: "",
    urlItemsDetailsConsultation: "",
    urlItemsBackground: "",
    reset: false,
    errors: {},
  }),
  watch: {
    form: {
      handler() {
        let self = this;
        this._.each(this.errors, (_error, key) => {
          self.errors[key] = null;
        });
      },
      deep: true,
    },
  },
  methods: {
    createDiagnosticOd() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingOd = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=diagnostic",
            method: "POST",
            data: self.getDataFormDetailsOd(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.diagnostic.new.success"),
            });
            response.data;
            // self.$emit("getItemsDetailsDiagnosticOd");
            self.getItemsDetailsDiagnosticOd();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingOd = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createFunctional_exploration() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingOd = true;
        this.$store
          .dispatch("request", {
            url:
              self.urlItemsDetailsConsultation + "?type=functional_exploration",
            method: "POST",
            data: self.getDataFormDetailsFunctional_exploration(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.function_exploration.new.success"
              ),
            });
            response.data;
            // self.$emit("getItemsDetailsDiagnosticOd");
            self.getItemsDetailsFunctional_exploration();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingOd = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },

    createEmployeeBonus() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingBonus = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsBonus,
            method: "POST",
            data: self.getDataFormDetailsBonus(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.performanceBonus.new.success"
              ),
            });
            response.data;
            // self.$emit("getItemsDetailsDiagnosticOd");
            self.getItemsDetailsBonus();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingBonus = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createEmployeeTaxe() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingTaxe = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsTaxe,
            method: "POST",
            data: self.getDataFormDetailsTaxe(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.performanceBonus.new.success"
              ),
            });
            response.data;
            // self.$emit("getItemsDetailsDiagnosticOd");
            self.getItemsDetailsBonus();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingTaxe = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveAcounted() {
      this.$store.dispatch("setNotification", {
        status: false,
      });
      let self = this;
      this.loading = true;
      this.$store
        .dispatch("request", {
          url: self.getRoute(),
          method: "PATCH",
          data: self.getDataForm(),
        })
        .then(() => {
          self.$store.dispatch("setNotification", {
            status: true,
            message: self.$vuetify.lang.t(self.messages.success),
          });
          self.$emit("getItems");
        })
        .catch((error) => {
          console.log("error", error);
          let message = "$vuetify.error_occured";
          self.$store.dispatch("setNotification", {
            status: true,
            message: self.$vuetify.lang.t(message),
          });
        })
        .then(() => {
          self.loading = false;
        });
    },
    saveDetails() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingOrdinance = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: "POST",
            data: self.getDataFormdetails(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetailsOrdinance();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingOrdinance = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },

    create() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingLaboratory = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=laboratory",
            method: "POST",
            data: self.getDataFormDetails(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.laboratory.new.success"),
            });
            response.data;
            this.getItemsDetailsLaboratory();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingLaboratory = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createSurgery() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingSurgery = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=surgery",
            method: "POST",
            data: self.getDataFormDetails(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.surgery.new.success"),
            });
            response.data;
            this.getItemsDetailsSurgery();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingSurgery = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createRadiography() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingRadiography = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=radiography",
            method: "POST",
            data: self.getDataFormDetails(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.radiography.new.success"),
            });
            response.data;
            self.getItemsDetailsRadiography();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingRadiography = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createDiagnosticOg() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingOg = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=diagnostic",
            method: "POST",
            data: self.getDataFormDetailsOg(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.diagnostic.new.success"),
            });
            response.data;
            // self.$emit("getItemsDetailsDiagnosticOg");
            self.getItemsDetailsDiagnosticOg();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingOg = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    createInvest() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingInvest = true;
        this.$store
          .dispatch("request", {
            url: self.urlItemsDetailsConsultation + "?type=investigation",
            method: "POST",
            data: self.getDataFormDetails(),
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.exam_investigation.new.success"
              ),
            });
            response.data;
            // self.$emit("getItemsDetailsInvest");
            self.getItemsDetailsInvest();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadinginvest = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    save_background() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteBackground(),
            method: "POST",
            data: self.getDataFormBackground(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    savePermission() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: false,
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.security.form.bad_credentials";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveEvents() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItemsEvents");
            } else {
              self.$emit("getItemsEvents");
              self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveAll() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethodDetail(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    canceled_appointment() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataFormCanceled(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItemsEvents");
            } else {
              self.$emit("getItemsEvents");
              self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    cancel() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataFormCanceled(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItem");
              self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveRadiography() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              // self.resetDataForm();
            }
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    saveParameter() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    updatePassword() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoutePassword(),
            method: "PUT",
            data: self.getDataFormPassword(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.users.cols.password.success"
              ),
            });
            self.$emit("getItems");
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    savep() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: "PATCH",
            data: self.getDataFormP(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.users.update.success"),
            });
            self.$emit("getItems");
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    send() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteBuyingPrice(),
            method: "POST",
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            self.$emit("getItems");
            self.resetDataForm();
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getRouteBackground() {
      if (this.form.id) {
        return this.urlItemsBackground + "/" + this.form.id;
      } else {
        return this.urlItemsBackground;
      }
    },
    getRouteDetails() {
      if (this.formDetails.id) {
        return this.urlItemsDetails_ordinance + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_ordinance;
      }
    },
    getRoutePassword() {
      if (this.form.id) {
        return this.urlItemsPassword + "/" + this.form.id;
      } else {
        return this.urlItemsPassword;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getMethodDetail() {
      //this.reset = this.form.id === undefined
      return this.form.consult ? "PATCH" : "POST";
    },
    getDataForm() {
      return this.form;
    },
    getDataFormCanceled() {
      return this.form;
    },
    getDataFormBackground() {
      return this.form;
    },
    getDataFormDetailsOd() {
      return this.form;
    },
    getDataFormBonus() {
      return this.form;
    },
    getDataFormDetailsOg() {
      return this.form;
    },
    getDataFormDetails() {
      return this.form;
    },
    initErrors() {
      this._.each(this.form, (value, key) => {
        this.errors[key] = null;
      });
    },
    setFormErrors(errors) {
      let self = this;
      this._.each(errors, (_error, key) => {
        if (self._.hasIn(self.errors, key)) {
          self.errors[key] = _error;
          //console.log("back error", errors[key]);
        }
      });
    },
    resetDataForm() {
      this.form.id = null;
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
    },
    resetDataFormAct() {
      this.form.id = null;
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
    },
  },
};
</script>
