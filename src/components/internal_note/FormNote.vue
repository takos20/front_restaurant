<template>
  <v-dialog max-width="300" persistent v-model="dialog.show">
    <v-card>
      <v-alert outlined type="warning" prominent border="left">
        {{ $vuetify.lang.t("$vuetify.internalnote.exist") }}
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="viewNote()" dense color="primary">
            {{ $vuetify.lang.t("$vuetify.btn.view") }}
          </v-btn>
        </v-card-actions>
      </v-alert>
    </v-card>
    <!-- <v-card>
      <v-alert border="top" type="warning">{{
        $vuetify.lang.t("$vuetify.internalnote.exist")
      }}</v-alert>
      <v-divider></v-divider>
      <v-card-actions color="orange">
        <v-spacer></v-spacer>

        <v-btn @click="closeWar()">
          {{ $vuetify.lang.t("$vuetify.btn.close") }}
        </v-btn>
        <v-btn @click="viewNote()" color="primary">
          {{ $vuetify.lang.t("$vuetify.btn.view") }}
        </v-btn>
      </v-card-actions>
    </v-card> -->
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
    urlItems: "userNotes/getNotes",
  }),
  methods: {
    closeWar() {
      this.dialog.show = false;
      this.$emit("resetFormPro");
    },
    viewNote() {
      this.$router.push({
        name: "usernote",
        params: { idD: "grh" },
      });
      this.send();
    },
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
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "?read=true" + "&id=" + this.$auth.user().id;
      } else {
        return this.urlItems;
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
          url: self.urlItems + "?read=true" + "&id=" + this.$auth.user().id,
          method: "GET",
        })
        .then(() => {
          self.$store.dispatch("setNotification", {
            status: true,
            message: self.$vuetify.lang.t(self.messages.success),
          });
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
};
</script>
