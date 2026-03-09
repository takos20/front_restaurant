<template>
  <v-dialog max-width="700" v-model="dialog.shows.showInfo">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold">
          <br />
          <h3>
            {{ $vuetify.lang.t(messages.title) }}
          </h3>
        </div>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="my-3">
        <v-container>
          <v-row wrap>
            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.expenses_nature.cols.nature_code.title'
                  )
                "
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="8" class="mb-0 py-0"> </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-text-field
                v-model="form.cashier"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.cash.cols.cashier_name.title')
                "
                prepend-inner-icon=" mdi-rename-box mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-text-field
                v-model="form.close_date"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.cash.cols.close_date.title')"
                prepend-inner-icon="mdi-timetable mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-text-field
                v-model="form.open_date"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.cash.cols.open_date.title')"
                prepend-inner-icon="mdi-timetable mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" class="mb-0 py-0">
              <v-text-field
                v-model="form.password"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.users.cols.password.title')"
                prepend-inner-icon="mdi-shield-account mdi-dark mdi-18px"
                class="font-weight-bold"
                type="password"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
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
    urlItems: "cashs/open",
  }),
  methods: {
    getDataForm() {
      let data = {
        id: this.form.id,
        password: this.form.password,
        cash_fund: this.form.cash_fund,
        cashier: this.form.cashier,
        is_active: true,
      };
      return data;
    },
    setForm(item) {
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash_fund = item.cash_fund;
      this.form.cashier = item.user["username"];
      this.form.open_date = new Date().toJSON().slice(0, 10);
      this.form.close_date = item.close_date;
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
