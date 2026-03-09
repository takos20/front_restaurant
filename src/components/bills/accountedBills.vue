<template>
  <v-dialog max-width="300" v-model="dialog.shows.showInfo">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold">
          <br />
          <h3>
            {{ $vuetify.lang.t("$vuetify.bills.cols.is_accounted.title1") }}
          </h3>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog.shows.showInfo = false">
          {{ $vuetify.lang.t("$vuetify.btn.close") }}
        </v-btn>
        <v-btn
          color="#0984e3"
          :loading="loading"
          @click="saveAcounted"
          dark
          type="submit"
        >
          {{ $vuetify.lang.t("$vuetify.btn.update") }}
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
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "bills",
  }),
  methods: {
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.code = item.code;
      this.form.storage_depots = item.storage_depots["id"];
      this.form.patient = item.patient["id"];
      this.form.doctor = item.doctor["id"];
      this.form.patient_type = item.patient_type;
      this.form.is_accounted = !item.is_accounted;
      this.form.details_stock = item.details_stock;
      this.form.cashier = this.$auth.user().id;
      this.form.bills_date = item.bills_date;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      this.form.advances = item.advances;
      this.form.bill_shape = item.bill_shape;
      this.form.additional_info = item.additional_info;
    },
  },
};
</script>
