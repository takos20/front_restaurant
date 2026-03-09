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
          stock_movement: null,
          total_amount: null,
          storage_depots_dest: null,
          quantity: null,
          details_stock: null,
          is_valid: null,
          product_code: null,
          date_movement: new Date().toISOString().substr(0, 10),
          type_movement: null,
          reason_movement: "RAS",
          movement_value: null,
          code: null,
          storage_depots: null,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "stock_movements",
    itemsRole: [],
  }),
  methods: {
    setForm(item) {
      this.form.id = item.id;
      this.form.stock_movement = item.id;
      this.form.type_movement = item.type_movement;
      this.form.date_movement = item.createdAt;
      this.form.movement_value = item.movement_value;
      this.form.reason_movement = item.reason_movement;
      this.form.is_valid = !item.is_valid;
      this.form.storage_depots =
        item.storage_depots === null ? "" : item.storage_depots["id"];
      this.form.code = item.code;
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
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
};
</script>
