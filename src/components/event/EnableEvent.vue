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
          color="primary"
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
          event_name: null,
          organizer: null,
          event_start: null,
          event_end: null,
          location: null,
          contract_amount: null,
          estimated_guests: null,
          paid: null,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "events",
  }),
  methods: {
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.event_start = item.event_start;
      this.form.event_end = item.event_end;
      this.form.event_name = item.event_name;
      this.form.organizer = item.organizer;
      this.form.location = item.location;
      this.form.contract_amount = item.contract_amount;
      this.form.estimated_guests = item.estimated_guests;
      this.form.paid = !item.paid;
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
