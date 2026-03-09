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
                      this.get_username
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
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="dialog-btn" @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.no") }}
            </v-btn>
            <v-btn
              class="dialog-btn"
              color="primary"
              :loading="loading"
              dark
              type="submit"
            >
              {{ $vuetify.lang.t("$vuetify.yes") }}
            </v-btn>
          </v-card-actions>
        </v-form>
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
    messages: {
      type: Object,
      default: function () {
        return {
          success: "",
        };
      },
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
  },
  data: () => ({
    urlItems: "bills",
    loading: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
  }),
  watch: {},

  created() {},
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
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        username: this.form.username ? this.form.username : this.get_username,
        password: this.form.password,
      };
      return data;
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.urlItems,
            method: "DELETE",
            data: self.getDataForm(),
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
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.username = item.username;
    },
  },
  computed: {
    get_username() {
      let username = this.$auth.user().username;
      return username;
    },
    usernameErrors() {
      let errors = [];
      if (!this.$v.form.username.$dirty) return errors;

      !this.$v.form.username.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.required")
        );

      !this.$v.form.username.minLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.minLength",
            this.$v.form.username.$params.minLength.min
          )
        );

      !this.$v.form.username.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.username.maxLength",
            this.$v.form.username.$params.maxLength.max
          )
        );
      return errors;
    },
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
  components: {},
};
</script>
<style scoped>
.dialog-card {
  transition: box-shadow 0.3s ease;
  will-change: box-shadow;
}
.dialog-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.dialog-btn {
  transition: transform 0.2s ease;
}
.dialog-btn:hover {
  transform: scale(1.05);
}

/* Subtle pulse animation for alert icon */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.alert-icon {
  animation: pulse 2.5s ease-in-out infinite;
}
</style>
