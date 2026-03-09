<template>
  <v-dialog v-model="dialog.show" max-width="300px">
    <v-card>
      <v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <div class="body-1 font-weight-bold">
            <br />
            <h3>
              {{
                $vuetify.lang.t(
                  "$vuetify.appointment.cols.cancel_appointment.confirm"
                )
              }}
            </h3>
          </div>
        </v-card-text>
        <!--<div class="font-weight-medium body-1">-->
        <!--{{ $vuetify.lang.t("$vuetify.delete.confirm") }}-->
        <!--</div>-->
      </v-card-text>
      <v-divider class="mx-4" style="margin-top: -30px"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" @click="dialog.show = false">
          {{ $vuetify.lang.t("$vuetify.no") }}
        </v-btn>
        <v-btn :loading="loading" dark color="#0984e3" @click="deleteItem()">
          {{ $vuetify.lang.t("$vuetify.yes") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    urlItems: {
      type: String,
      default: "",
    },
    messages: {
      type: Object,
      default: function () {
        return {
          success: "",
        };
      },
    },
  },
  data: () => ({
    loading: false,
  }),
  methods: {
    deleteItem() {
      let self = this;
      this.loading = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems,
          method: "DELETE",
          data: self.urlDeleteItems,
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messages.success),
          });
          this.$router.push({
            name: "appointment",
          });
        })
        .catch((errors) => {
          console.log("eeur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors"),
          });
        })
        .then(() => {
          self.loading = false;
          // self.dialog.show = false;
        });
    },
  },
};
</script>
