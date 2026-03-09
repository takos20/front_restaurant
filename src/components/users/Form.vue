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
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.status.title2')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.username"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.users.cols.username.title')
                    "
                    clearable
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
                <v-col cols="12" sm="10" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.groups"
                    :items="itemsRole"
                    :loading="isLoadingRole"
                    :search-input.sync="searchRole"
                    color="primary"
                    item-text="group_name"
                    return-object
                    clearable
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.users.cols.role.title')"
                    prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.users.cols.role.title") }}
                    </template></v-autocomplete
                  >
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="mb-0 py-0"
                  v-if="this.$auth.user().is_superuser"
                >
                  <v-autocomplete
                    v-model="form.hospital"
                    :items="itemsHospital"
                    :loading="isLoadingHospital"
                    :search-input.sync="searchHospital"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    clearable
                    :label="$vuetify.lang.t('$vuetify.users.cols.role.title')"
                    prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.hospitals.title") }}
                    </template></v-autocomplete
                  >
                </v-col>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-btn
                    dark
                    dense
                    @click="createPermission()"
                    color="primary"
                    v-if="
                      _.includes(
                        this.$auth.user().permissions,
                        'add_permission'
                      )
                    "
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="mb-0 py-0"
                  v-if="this.$auth.user().is_superuser"
                >
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
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.users.cols.password.title")
                      }}
                    </template></v-text-field
                  >
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
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.users.cols.re_password.title")
                      }}
                    </template></v-text-field
                  >
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  class="mb-0 py-0"
                  v-if="form.type === 'PATIENT'"
                >
                  <v-autocomplete
                    outlined
                    dense
                    v-model="form.patient"
                    :items="itemsPatient"
                    required
                    :loading="isLoadingPatient"
                    :search-input.sync="searchPatient"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.appointment.cols.patient.title')
                    "
                    class="font-weight-bold"
                    clearable
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
    <form-permission :dialog="dialogFormPermission"></form-permission>
  </v-dialog>
</template>

<script>
import FormPermission from "./Permission";

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
          hospital: null,
          patient: null,
          username: null,
          password: null,
          type: null,
          groups: null,
          re_password: null,
          role: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    is_active: true,
    isLoadingD: false,
    isLoadingP: false,
    urlRole: "users/roles",
    itemsRole: [],
    searchRole: null,
    isLoadingRole: false,
    search: null,
    dialogFormPermission: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
    searchDepart: null,
    isLoadingDepot: false,
    searchDepot: null,
    itemsDepot: [],
    isLoadingHospital: false,
    searchHospital: null,
    itemsHospital: [],
    urlDepot: "storage_depots",
    urlPatients: "patients",
    urlHospital: "hospitals",
    urlDoctors: "doctors",
    isLoadingPatient: false,
    isLoadingDoctor: false,
    searchPatient: null,
    searchDoctor: null,
    itemsPatient: [],
    itemsDoctor: [],
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
    optionType: {
      type_Role: [],
    },
    urlItems: "users",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {
    searchPatient(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlPatients,
          params: params,
        })
        .then((response) => {
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctors,
          params: params,
        })
        .then((response) => {
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchDepot(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDepot = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot = response.data.content;
        })
        .finally(() => (this.isLoadingDepot = false));
    },
    searchHospital(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingHospital = true;
      this.$store
        .dispatch("request", {
          url: self.urlHospital,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsHospital = response.data.content;
        })
        .finally(() => (this.isLoadingHospital = false));
    },
    searchRole(value) {
      if (value === null) return;
      const params = { group_name: value };
      let self = this;
      this.isLoadingRole = true;
      this.$store
        .dispatch("request", {
          url: self.urlRole,
          params: params,
          limit: 50,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsRole = response.data.content;
        })
        .finally(() => (this.isLoadingRole = false));
    },
  },

  created() {
    this.getOptionsRole();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        username: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
          unique: existUsername,
        },
        groups: {
          required,
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
    createPermission() {
      this.dialogFormPermission.show = true;
    },
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
        self.optionType.type_Role.push({
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
        hospital: this.form.hospital,
        type: this.form.type,
        patient: this.form.patient,
        groups: this.form.groups["group"]["id"],
        is_active: this.is_active,
      };
      if (!this._.isNull(this.form.password)) {
        data.password = this.form.password;
      }
      if (!this._.isNull(this.form.re_password)) {
        data.re_password = this.form.re_password;
      }
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.type = item.type;
      this.form.username = item.username;
      this.form.patient = item.patient === null ? "" : item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.hospital = item.hospital === null ? "" : item.hospital["id"];
      this.itemsHospital.push(item.hospital);
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
      this.is_active = item.is_active;
      this.form.groups = item.groups?.[0]?.id;
      this.itemsRole.push(item.groups?.[0]);
    },
  },
  computed: {
    get_patient_code() {
      let role_user = "";
      role_user = this.form.groups?.name === "CAISSIER";
      return role_user;
    },
    // Gestion des erreurs du formulaire
    roleErrors() {
      let errors = [];
      if (!this.$v.form.groups.$dirty) return errors;
      !this.$v.form.groups.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.role.required"));
      return errors;
    },
    typeErrors() {
      let errors = [];
      if (!this.$v.form.type.$dirty) return errors;
      !this.$v.form.type.required &&
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
  components: { FormPermission },
};
</script>
