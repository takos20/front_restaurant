<template>
  <v-dialog
    v-model="dialog.show"
    persistent
    max-width="680px"
    transition="dialog-bottom-transition"
  >
    <v-scale-transition>
      <v-card v-if="dialog.show" class="dialog-card">
        <v-card-title class="d-flex align-center pb-2">
          <v-icon color="red" class="mr-2">mdi-alert-circle</v-icon>
          <span class="title font-weight-bold">
            {{ $vuetify.lang.t("$vuetify.delete.confirm") }}
          </span>
        </v-card-title>

        <v-divider></v-divider>

        <!-- Content -->
        <v-card-text class="pt-4">
          <div class="d-flex align-center">
            <v-icon color="red" size="32" class="mr-3">
              mdi-delete-alert
            </v-icon>

            <h4 class="red--text font-weight-medium mb-0">
              {{ $vuetify.lang.t("$vuetify.delete.bill") }}
            </h4>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <v-form @submit.prevent="save">
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.username.title') +
                      ' : ' +
                      this.$auth.user().username
                    "
                    prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
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
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.users.cols.password.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
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
    </v-scale-transition>
  </v-dialog>
</template>

<script>
import FormMixin from "../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [FormMixin],
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
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          username: null,
          password: null,
        };
      },
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
  validations() {
    let validators = {
      form: {
        password: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getDataForm() {
      let data = {
        username: this.form.username ? this.form.username : this.$auth.user().username,
        password: this.form.password,
      };
      return data;
    },
    deleteItem() {
      let self = this;
      this.loading = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems,
          method: "DELETE",
          data: self.getDataForm(),
          // self.urlDeleteItems
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
        .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
    },
  },
    computed: {
    
    passwordErrors() {
      let errors = [];
      if (!this.$v.form.password.$dirty) return errors;

      !this.$v.form.password.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.password.required")
        );

      return errors;
    },
  },
};
</script>
