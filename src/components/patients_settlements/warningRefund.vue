<template>
  <v-dialog max-width="400" v-model="dialog.show" persistent>
    <v-card>
      <v-card-title class="orange white--text">
        {{ $vuetify.lang.t("$vuetify.bills.message_refund") }}
      </v-card-title>

      <v-card-text>
        <v-alert type="warning" border="left" colored-border dense class="mb-4">
          {{ $vuetify.lang.t("$vuetify.bills.message_find_refund") }}
          <strong>{{ form.refund }}</strong>
        </v-alert>

        <v-radio-group v-model="form.overpayment_action" column>
          <v-radio
            value="CASH"
            :label="$vuetify.lang.t('$vuetify.bills.cols.refund_now.title')"
          />
          <v-radio
            value="PREPAID"
            :label="$vuetify.lang.t('$vuetify.bills.cols.refund_prepaid.title')"
          />
        </v-radio-group>
      </v-card-text>

      <v-divider style="margin-top: -25px"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!form.overpayment_action"
          @click="save_print_bills"
          light
          class="white--text"
        >
          {{ $vuetify.lang.t("$vuetify.btn.save") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";

export default {
  mixins: [FormMixin],
  name: "Infos",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          bills_date: null,
          pub: null,
          tva: null,
          refund: null,
          overpayment_action: null,
          district: null,
          bill_type: null,
          transaction_ref_bank_card: null,
          district_default: null,
          patient_default: null,
          transaction_ref_om: null,
          transaction_ref_momo: null,
          amount_om: 0,
          amount_prepaid: 0,
          amount_momo: 0,
          amount_cash: 0,
          amount_bank_card: 0,
          phone_number_om: null,
          phone_number_momo: null,
          bank_card_number: null,
          had_been_paid: false,
          total_amount: null,
          delivery: null,
          quantity_served: null,
          product: null,
          subtotal: null,
          total: null,
          patients_settlements: null,
          bills_amount: null,
          code: null,
          cashier: null,
        };
      },
    },
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
  },
  data: () => ({
    loading: false,
    urlItems: "patients_settlements",
  }),
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.patients_settlements = item.id;
      // this.form.cash = item.cash;
      this.form.code = item.code;
      this.form.patients_settlements = item.patients_settlements;
      this.form.wordings = item.wordings;
      this.form.patient = item.patient;
      this.form.district = item.district;
      this.form.bank_card_number = item.bank_card_number;
      this.form.amount_received = item.amount_received;
      this.form.amount_paid = item.amount_paid;
      this.form.overpayment_action = item.overpayment_action;
      this.form.phone_number_momo = item.phone_number_momo;
      this.form.phone_number_om = item.phone_number_om;
      this.form.amount_om = item.amount_om;
      this.form.amount_momo = item.amount_momo;
      this.form.amount_prepaid = item.amount_prepaid;
      this.form.amount_bank_card = item.amount_bank_card;
      this.form.amount_cash = item.amount_cash;
      this.form.transaction_ref_om = item.transaction_ref_om;
      this.form.transaction_ref_momo = item.transaction_ref_momo;
      this.form.transaction_ref_bank_card = item.transaction_ref_bank_card;
      this.form.bills_date = item.createdAt;
      this.form.bill_type = item.bill_type;
      this.form.refund = item.refund;
      this.form.tva = item.tva;
      this.form.ttc = item.ttc;
      // console.log("cul", this.form.supplies);
    },
    closeWar() {
      this.dialog.show = false;
      this.$emit("resetFormPro");
    },
    getDataForm() {
      let data = {
        cashier: this.form.cashier,
        patient: this.form.patient,
        bills_date: this.form.bills_date,
        bill_type: this.form.bill_type,
        patients_settlements: this.form.patients_settlements,
        phone_number: this.form.phone_number,
        delivery: this.form.delivery,
        district: this.form.district,
        amount_bank_card: this.form.amount_bank_card,
        amount_om: this.form.amount_om,
        amount_momo: this.form.amount_momo,
        amount_prepaid: this.form.amount_prepaid,
        amount_cash: this.form.amount_cash,
        transaction_ref_bank_card: this.form.transaction_ref_bank_card,
        transaction_ref_om: this.form.transaction_ref_om,
        transaction_ref_momo: this.form.transaction_ref_momo,
        bank_card_number: this.form.bank_card_number,
        cash: this.form.cash,
        payment_method: this.form.payment_method,
        bills_amount: this.form.bills_amount,
        amount_paid: this.form.amount_paid,
        net_payable: this.form.net_payable,
        tva: this.form.tva,
        ttc: this.form.ttc,
        amount_received: this.form.amount_received,
        balance: this.form.balance,
        refund: this.form.refund,
        patient_balance: this.form.advances,
        wordings: this.form.wordings,
      };
      return data;
    },
    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            let blob = new Blob([response.data], { type: response.data.type });
            const blobUrl = URL.createObjectURL(blob);

            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            iframe.src = blobUrl;

            iframe.onload = () => {
              iframe.contentWindow.focus();
              iframe.contentWindow.print();

              // Détecter la fermeture du dialogue d'impression
              iframe.contentWindow.onafterprint = () => {
                document.body.removeChild(iframe);
                URL.revokeObjectURL(blobUrl);
              };

              // Fallback : nettoyer après 30 secondes
              setTimeout(() => {
                if (document.body.contains(iframe)) {
                  document.body.removeChild(iframe);
                  URL.revokeObjectURL(blobUrl);
                }
              }, 30000);
            };

            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.dialog.show = false;
              self.$emit("closed");
              self.$emit("getItems");
              // self.resetDataFormBills();
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
  },
  computed: {
    normalizedDishes() {
      return this.itemsDish.map((d) => ({
        id: d.id,
        name: d.dish__name,
        price: d.dish__price,
        category: d.category || "Plat du jour",
      }));
    },
  },
};
</script>
