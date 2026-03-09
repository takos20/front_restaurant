<template>
  <v-dialog max-width="300" v-model="dialog.shows.showInfo">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold">
          <br />
          <h3>
            {{ $vuetify.lang.t(messages.title) }}
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
          @click="send"
          dark
          type="submit"
        >
          {{ $vuetify.lang.t(messages.submit) }}
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
          name: null,
          is_active: null,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "products",
  }),
  methods: {
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.expiry_date = item.expiry_date;
      this.form.public_ptrice = item.public_ptrice;
      this.form.quantity = item.quantity;
      this.form.purchase_ptrice = item.purchase_ptrice;
      this.form.margin = item.margin;
      this.form.dosage = item.dosage;
      this.form.conditioning = item.conditioning;
      this.form.barcode = item.barcode;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.is_active = !item.is_active;
      this.form.category = item.category["id"];
      this.form.dci1 = item.dci1["id"];
      this.form.shape = item.shape["id"];
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    send() {
      this.$store.dispatch("showNotification", {
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
          self.$store.dispatch("showNotification", {
            status: true,
            message: self.$vuetify.lang.t(self.messages.success),
          });
          self.$emit("getItems");
        })
        .catch((error) => {
          console.log("error", error);
          let message = "$vuetify.error_occured";
          self.$store.dispatch("showNotification", {
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
