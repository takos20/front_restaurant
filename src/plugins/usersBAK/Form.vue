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
                      $vuetify.lang.t('$vuetify.users.cols.code_user.title')
                    "
                    prepend-inner-icon="mdi-text-short mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="form.is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.status.title2')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-select
                    v-model="form.role"
                    color="primary"
                    :items="optionRole.type_Role"
                    :label="$vuetify.lang.t('$vuetify.users.cols.role.title')"
                    :placeholder="
                      $vuetify.lang.t('$vuetify.users.cols.role.title2')
                    "
                    @blur="$v.form.role.$touch()"
                    @input="$v.form.role.$touch()"
                    :error-messages="roleErrors"
                    prepend-inner-icon="mdi-account-group-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-select>
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.re_password"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.re_password.title')
                    "
                    @blur="$v.form.re_password.$touch()"
                    @input="$v.form.re_password.$touch()"
                    :error-messages="rePasswordErrors"
                    prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="password"
                    outlined
                    dense
                  ></v-text-field>
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
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
import { existUsername } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          position_held: null,
          doctor: null,
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
    e1: 1,
    isLoading: false,
    isLoadingD: false,
    isLoadingP: false,
    search: null,
    searchDoctor: null,
    searchPatient: null,
    searchDepart: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
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
    // formR: {
    //   id: null,
    //   name: null
    // },
    optionRole: {
      type_Role: [],
    },
    urlItems: "users",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {},

  created() {
    this.getOptionsRole();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        role: {
          required,
        },
        username: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
          unique: existUsername,
        },
        password: {
          required: requiredIf((component) => {
            return !component["id"];
          }),
        },
        re_password: {
          sameAsPassword: sameAs("password"),
        },
      },
    };
    return validators;
  },
  methods: {
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store
    getOptionsRole() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.roles, (type_Role) => {
        self.optionRole.type_Role.push({
          text: self.$vuetify.lang.t(type_Role.text),
          value: type_Role.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        username: this.form.username,
        role: this.form.role,
        is_active: this.form.is_active ? this.form.is_active : false,
      };
      if (
        !this._.isEmpty(this.form.password) ||
        !this._.isNull(this.form.password)
      ) {
        data.password = this.form.password;
      }
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.username = item.username;
      this.form["oldUsername"] = item.username;
      if (!this._.isEmpty(item.password) || !this._.isNull(item.password)) {
        this.form.password = item.password;
      }
      if (
        !this._.isEmpty(item.re_password) ||
        !this._.isNull(item.re_password)
      ) {
        this.form.re_password = item.re_password;
      }
      this.form.role = item.role;
      this.form.is_active = item.is_active;
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
