<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
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
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                    filled
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="mb-0 py-0"
                  style="margin-top: -10px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.status.enabled')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  class="mb-0 py-0"
                  style="margin-top: -10px"
                >
                  <v-switch
                    v-model="is_default"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.district.cols.is_default.title')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.name.title')
                    "
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.suppliers.cols.name.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.phone"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.phone.title')
                    "
                    @blur="$v.form.phone.$touch()"
                    @input="$v.form.phone.$touch()"
                    :error-messages="phoneErrors"
                    prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.suppliers.cols.phone.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name_representative"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.suppliers.cols.name_representative.title'
                      )
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.phone_representative"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.suppliers.cols.phone_representative.title'
                      )
                    "
                    prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.mailbox"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.mailbox.title')
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.city"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.city.title')
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.country"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.country.title')
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.fax"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.fax.title')
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.taxpayer_number"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.suppliers.cols.taxpayer_number.title'
                      )
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.email"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.suppliers.cols.email.title')
                    "
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-email mdi-dark mdi-18px"
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
import { required } from "vuelidate/lib/validators";
import { phoneR, existNamesuppliers } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          phone_representative: null,
          name_representative: null,
          code: null,
          phone: null,
          name: null,
          mailbox: null,
          city: null,
          country: null,
          fax: null,
          email: null,
          taxpayer_number: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    is_default: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "suppliers",
    isLoading: false,
  }),
  watch: {},

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNamesuppliers,
        },
        phone: {
          phoneR,
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
        name_representative: this.form.name_representative,
        phone_representative: this.form.phone_representative,
        phone: this.form.phone,
        name: this.form.name,
        is_active: this.is_active,
        is_default: this.is_default,
        email: this.form.email,
        taxpayer_number: this.form.taxpayer_number,
        fax: this.form.fax,
        country: this.form.country,
        mailbox: this.form.mailbox,
        city: this.city,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form.name_representative = item.name_representative;
      this.form.phone = item.phone;
      this.form.phone_representative = item.phone_representative;
      this.form["oldName"] = item.name;
      this.is_active = item.is_active;
      this.is_default = item.is_default;
      this.form.mailbox = item.mailbox;
      this.form.city = item.city;
      this.form.country = item.country;
      this.form.fax = item.fax;
      this.form.taxpayer_number = item.taxpayer_number;
      this.form.email = item.email;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.suppliers.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.suppliers.cols.name.unique")
        );
      return errors;
    },
    codeErrors() {
      let errors = [];
      if (!this.$v.form.code.$dirty) return errors;
      !this.$v.form.code.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.suppliers.cols.code.required")
        );

      !this.$v.form.code.maxLength &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.suppliers.cols.code.maxLength",
            this.$v.form.code.$params.maxLength.max
          )
        );
      return errors;
    },
     phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.suppliers.cols.phone.invalid")
        );
      return errors;
    },
    // phonerepresentativeErrors() {
    //   let errors = [];
    //   if (!this.$v.form.phone_representative.$dirty) return errors;
    //   !this.$v.form.phone_representative.phoneR &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.suppliers.cols.phone.invalid")
    //     );
    //   return errors;
    // }
  },
  components: {},
};
</script>
