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
                      $vuetify.lang.t('$vuetify.cash_movement.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-select
                    v-model="form.type"
                    color="primary"
                    :items="optionMovement.type_Movement"
                    :label="
                      $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                    "
                    dense
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    class="font-weight-bold"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.cash_movement.cols.name.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.motive"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.motive.title'
                      )
                    "
                    prepend-inner-icon="mdi-text-shadow mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name_movement"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.name_movement.title'
                      )
                    "
                    prepend-inner-icon="mdi-lead-pencil mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.amount_movement"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.cash_movement.cols.amount_movement.title'
                      )
                    "
                    prepend-inner-icon="mdi-cash mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="motive"
                    outlined
                    dense
                    suffix="FCFA"
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
          type: null,
          name: null,
          motive: null,
          name_movement: null,
          amount_movement: null,
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
    optionMovement: {
      type_Movement: [],
    },
    urlItems: "cash_movements",
  }),
  watch: {},

  created() {
    this.getOptionsMovement();
  },
  validations() {
    let validators = {
      form: {
        type: {
          required,
          maxLength: maxLength(100),
        },
        name: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        cash: this.$route.params.id,
        amount_movement: this.form.amount_movement,
        type: this.form.type,
        name: this.form.name,
        name_movement: this.form.name_movement,
        motive: this.form.motive,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.cash = item.cash;
      this.form.type = item.type;
      this.form.amount_movement = item.amount_movement;
      this.form.name = item.name;
      this.form["oldname"] = item.name;
      this.form.motive = item.motive;
      this.form.name_movement = item.name_movement;
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
