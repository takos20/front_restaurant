<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.username.title')
                    "
                    @blur="$v.form.username.$touch()"
                    @input="$v.form.username.$touch()"
                    :error-messages="usernameErrors"
                    prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.users.cols.username.title")
                      }}
                    </template></v-text-field
                  >
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.password.title')
                    "
                    prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                    @blur="$v.form.password.$touch()"
                    @input="$v.form.password.$touch()"
                    :error-messages="passwordErrors"
                    class="font-weight-bold"
                    type="password"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.users.cols.password.title")
                      }}
                    </template></v-text-field
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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
          self.$emit("getItems");
          self.dialog.show = false;
        })
        .catch((errors) => {
          console.log("erreur delete", errors);
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
