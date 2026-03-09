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
      <v-col cols="12" sm="12" class="mb-0 py-0">
        <v-menu
          v-model="menu"
          color="primary"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          dense
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.expiry_date"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.product.cols.expiry_date.title')
              "
              prepend-inner-icon="mdi-clock-start"
              class="font-weight-bold"
              outlined
              v-bind="attrs"
              v-on="on"
              dense
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.expiry_date"
            color="primary"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>

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
          code_user: null,
          position_held: null,
          expiry_date: null,
          patient: null,
          username: null,
          password: null,
          re_password: null,
          role: null,
          is_active: false,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    menu: false,
    urlItems: "details_stocks",
  }),
  methods: {
    setForm(item) {
      this.form.id = item.id;
      this.form.expiry_date = item.expiry_date;
    },
    getDataForm() {
      let data = {
        expiry_date: this.form.expiry_date,
      };
      return data;
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
          self.$emit("getItemsStock");
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
