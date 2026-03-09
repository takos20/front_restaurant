<template>
  <v-dialog max-width="580" v-model="dialog.show">
    <v-card class="pa-3">
      <v-alert border="left" colored-border type="success" elevation="2">
        <div class="text-center font-weight-bold mb-2" style="font-size: 16px">
          {{ $vuetify.lang.t("$vuetify.promo.title") }}
        </div>

        <div
          class="text-center"
          style="font-size: 15px; line-height: 1.6"
          v-if="
            this.reduction.type === 'HALF' &&
            this.reduction.should_apply === true
          "
        >
          <!-- {{ $vuetify.lang.t('$vuetify.promo.message_50') }} -->
          {{ $vuetify.lang.t("$vuetify.promo.message_apply_50") }}
        </div>

        <div
          class="text-center"
          style="font-size: 15px; line-height: 1.6"
          v-if="
            this.reduction.type === 'HALF' &&
            this.reduction.should_notify === true
          "
        >
          <!-- {{ $vuetify.lang.t('$vuetify.promo.message_false') }} -->
          {{ $vuetify.lang.t("$vuetify.promo.message_notify_50") }}
        </div>
      </v-alert>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="closeWar()">
          {{ $vuetify.lang.t("$vuetify.btn.close") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import FormMixin from "../../mixins/Common/Form.vue";

export default {
  mixins: [FormMixin],
  name: "Infos",
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showInfo: false,
          },
        };
      },
    },
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          dish: null,
          cash: null,
          bill_type: null,
          patient: null,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    reduction: false,
    urlItems: "bills",
    itemsDish: [],
    isLoading: false,
    search: null,
    urlDish: "details_bills/favorite-dish",
    urlItemsDetails_bills: "details_bills",
  }),
  validations() {
    let validators = {
      form: {
        // session: {
        //   required,
        //   maxLength: maxLength(100)
        // },
        // cash_fund: {
        //   required,
        //   maxLength: maxLength(100)
        // },
        // wording: {
        //   required,
        //   maxLength: maxLength(10),
        //   minLength: minLength(3),
        // }
      },
    };
    return validators;
  },
  methods: {
    setForm(item) {
      // Données envoyées lors de la modification
      this.reduction = item.reduction;
      this.current_dish = item.current_dish;
      this.form.cash = item.cash;
      this.form.bills = item.bills;
      this.form.bill_type = item.bill_type;
      this.form.patient = item.patient;
      // console.log("cul", this.form.supplies);
    },
    closeWar() {
      this.dialog.show = false;
    },
    getDataFormdetails() {
      let data = {
        quantity_served: 1,
        bills: this.form.bills,
        cash: this.form.cash,
        dish: this.form.dish["dish_id"],
        pub: this.form.dish["dish__price"],
        pun: 0,
        bill_type: this.form.bill_type,
        delivery: 100,
        patient: this.form.patient,
        amount_gross: this.form.dish["dish__price"],
        amount_net: 0,
        tva: 0,
      };

      return data;
    },

    saveDetails() {
      let self = this;
      self.$store.dispatch("showNotification", {
        statut: false,
      });
      self.$v.$touch();
      if (!self.$v.$invalid) {
        self.loading = true;
        self.$store
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

            self.dialog.show = false;
            self.itemsDish = [];
            //console.log("Quantity", this.form.quantity);
            self.$emit("getItemsDetails");
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
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    send() {
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
  },
  watch: {
    search(value) {
      if (value === null) return;
      const params = { dish__name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDish + "?patient_id=" + this.form.patient,
          params: params,
        })
        .then((response) => {
          self.itemsDish = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  computed: {},
};
</script>
