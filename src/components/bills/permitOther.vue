<template>
  <v-dialog max-width="400" v-model="dialog.shows.showInfo">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold">
          <br />
          <h3>
            {{ $vuetify.lang.t("$vuetify.users.cols.re_password.title") }}
          </h3>
        </div>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="my-3">
        <v-text-field
          v-model="form.password"
          color="primary"
          :label="$vuetify.lang.t('$vuetify.users.cols.password.title')"
          prepend-inner-icon="mdi-shield-account mdi-dark mdi-18px"
          class="font-weight-bold"
          type="password"
          @blur="$v.form.password.$touch()"
          @input="$v.form.password.$touch()"
          outlined
          dense
        ></v-text-field>
      </v-card-text>
      <v-divider class="mx-4" style="margin-top: -45px"></v-divider>
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
          :disabled="
            form.cashier === null ||
            form.open_date === null ||
            form.code === null ||
            form.password === null
          "
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
          cashier: null,
          password: null,
          cash_fund: null,
          open_date: null,
          close_date: null,
          is_active: false,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "cashs/close",
  }),
  methods: {
    getDataForm() {
      let data = {
        id: this.form.id,
        password: this.form.password,
        cash_fund: this.form.cash_fund,
        close_date: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        cashier: this.form.cashier,
        is_active: false,
      };
      return data;
    },
    setForm(item) {
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash_fund = item.cash_fund;
      this.form.cashier = item.user["username"];
      this.form.open_date = item.open_date;
      this.form.close_date = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      this.form.is_active = item.is_active;
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
          method: "POST",
          data: self.getDataForm(),
        })
        .then(() => {
          self.$store.dispatch("showNotification", {
            status: true,
            message: self.$vuetify.lang.t(self.messages.success),
          });
          self.dialog.shows.showInfo = false;
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
