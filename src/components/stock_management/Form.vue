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
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.storage_depots.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="8" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.storage_depots.cols.name.title')
                    "
                    prepend-inner-icon="mdi-account-outline"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name_responsible"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.storage_depots.cols.name_responsible.title'
                      )
                    "
                    prepend-inner-icon="mdi-shield-account-outline"
                    class="font-weight-bold"
                    type="name_responsible"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.username"
                    :items="itemsUsers"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    item-text="username"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.storage_depots.cols.username.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-autocomplete>
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
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          name: null,
          name_responsible: null,
          username: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "storage_depots",
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { username: value, role: "RESPONSIBLE" };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlUsers,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsUsers = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  created() {},
  validations() {
    let validators = {
      form: {
        code: {
          required,
          maxLength: maxLength(100),
        },
        name: {
          required,
          maxLength: maxLength(10),
          minLength: minLength(3),
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        code: this.form.code,
        name: this.form.name,
        username: this.form.username,
        name_responsible: this.form.name_responsible,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldname"] = item.name;
      this.form.name_responsible = item.name_responsible;
      this.form.username = item.username["id"];
      this.itemsUsers.push(item.username);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    roleErrors() {
      let errors = [];
      if (!this.$v.form.role.$dirty) return errors;
      !this.$v.form.role.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.role.required"));
      return errors;
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
      !this.$v.form.username.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.username.unique")
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
    rePasswordErrors() {
      let errors = [];
      if (!this.$v.form.re_password.$dirty) return errors;

      !this.$v.form.re_password.sameAsPassword &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.re_password.error")
        );
      return errors;
    },

    firstnameErrors() {
      let errors = [];
      if (!this.$v.form.code_user.$dirty) return errors;
      !this.$v.form.code_user.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.code_user.required")
        );

      !this.$v.form.code_user.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.code_user.maxLength",
            this.$v.form.code_user.$params.maxLength.max
          )
        );
      return errors;
    },
    lastnameErrors() {
      let errors = [];
      if (!this.$v.form.position_held.$dirty) return errors;
      !this.$v.form.position_held.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.users.cols.position_held.required")
        );

      !this.$v.form.position_held.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.users.cols.position_held.maxLength",
            this.$v.form.position_held.$params.maxLength.max
          )
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.required"));

      !this.$v.form.email.maxLength &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.email &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.invalid"));

      !this.$v.form.email.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.unique"));
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
    other_phoneErrors() {
      let errors = [];
      if (!this.$v.form.other_phone.$dirty) return errors;
      !this.$v.form.other_phone.phoneR &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.invalid"));

      !this.$v.form.other_phone.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.phone.unique"));
      return errors;
    },
  },
  components: {},
};
</script>
