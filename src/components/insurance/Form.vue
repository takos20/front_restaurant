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
                      $vuetify.lang.t('$vuetify.insurance.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="2" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.name.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.insurance.cols.name.title")
                      }}
                    </template></v-text-field
                  >
                </v-col>
                <!--<v-col cols="12" sm="6" class="mb-0 py-0">-->
                <!--<v-text-field-->
                <!--v-model="form.nature"-->
                <!--color="primary"-->
                <!--:label="-->
                <!--$vuetify.lang.t(-->
                <!--'$vuetify.expenses_nature.cols.nature.title'-->
                <!--)-->
                <!--"-->
                <!--prepend-inner-icon="mdi-shield-account-outline"-->
                <!--class="font-weight-bold"-->
                <!--type="nature"-->
                <!--outlined-->
                <!--dense-->
                <!--&gt;</v-text-field>-->
                <!--</v-col>-->
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.number"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.number.title')
                    "
                    @blur="$v.form.number.$touch()"
                    @input="$v.form.number.$touch()"
                    :error-messages="numberErrors"
                    prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="nature"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.percent"
                    color="primary"
                    type="number"
                    :min="0"
                    @blur="$v.form.percent.$touch()"
                    @input="$v.form.percent.$touch()"
                    :error-messages="percentErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.percent.title')
                    "
                    prepend-inner-icon="mdi-percent mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.phone"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.phone.title')
                    "
                    @blur="$v.form.phone.$touch()"
                    @input="$v.form.phone.$touch()"
                    :error-messages="phoneErrors"
                    prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="nature"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.email"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.email.title')
                    "
                    @blur="$v.form.email.$touch()"
                    @input="$v.form.email.$touch()"
                    :error-messages="emailErrors"
                    prepend-inner-icon="mdi-mail mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="nature"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.location"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.insurance.cols.location.title')
                    "
                    @blur="$v.form.location.$touch()"
                    @input="$v.form.location.$touch()"
                    :error-messages="locationErrors"
                    prepend-inner-icon="mdi-map mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="nature"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
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
                <v-col cols="12" sm="8" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.responsible"
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
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";
import {
  existEmailInsurance,
  existNumberInsurance,
  existPhoneInsurance,
  existNameInsurance,
} from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          percent: null,
          email: null,
          name: null,
          location: null,
          phone: null,
          start_date: null,
          end_date: null,
          responsible: null,
          mailbox: null,
          city: null,
          number: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    isLoadingCity: false,
    menu5: false,
    menu4: false,
    searchCity: null,
    itemsCity: [],
    urlCity: "cities",
    is_active: true,
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
    urlItems: "insurances",
  }),
  watch: {
    searchCity(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingCity = true;
      this.$store
        .dispatch("request", {
          url: self.urlCity,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsCity = response.data.content;
        })
        .finally(() => (this.isLoadingCity = false));
    },
  },

  created() {},
  validations() {
    let validators = {
      form: {
        percent: {
          required,
          maxLength: maxLength(100),
        },
        name: {
          required,
          maxLength: maxLength(255),
          unique: existNameInsurance,
          minLength: minLength(3),
        },
        email: {
          email,
          required,
          unique: existEmailInsurance,
        },
        number: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
          unique: existNumberInsurance,
        },
        phone: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
          unique: existPhoneInsurance,
        },
        location: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        number: this.form.number,
        email: this.form.email,
        percent: this.form.percent,
        start_date: this.form.start_date,
        end_date: this.form.end_date,
        name: this.form.name,
        phone: this.form.phone,
        location: this.form.location,
        responsible: this.form.responsible,
        mailbox: this.form.mailbox,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.is_active = item.is_active;
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.email = item.email;
      this.form["oldInsuranceEmail"] = item.email;
      this.form.percent = item.percent;
      this.form.mailbox = item.mailbox;
      this.form.start_date = item.start_date;
      this.form.end_date = item.end_date;
      this.form.responsible = item.responsible;
      this.form.location = item.location;
      this.form.phone = item.phone;
      this.form["oldInsurancePhone"] = item.phone;
      this.form.name = item.name;
      this.form["oldInsuranceName"] = item.name;
      this.form.number = item.number;
      this.form["oldInsuranceNumber"] = item.number;
      // this.form.city = item.city["id"];
      // this.itemsCity.push(item.city);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    percentErrors() {
      let errors = [];
      if (!this.$v.form.percent.$dirty) return errors;
      !this.$v.form.percent.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.percent.required")
        );
      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.required"));

      !this.$v.form.email.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.users.cols.email.unique"));
      return errors;
    },
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.name.required")
        );

      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.name.unique")
        );
      return errors;
    },
    numberErrors() {
      let errors = [];
      if (!this.$v.form.number.$dirty) return errors;
      !this.$v.form.number.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.number.required")
        );

      !this.$v.form.number.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.number.unique")
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.phone.required")
        );

      !this.$v.form.phone.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.phone.unique")
        );
      return errors;
    },
    locationErrors() {
      let errors = [];
      if (!this.$v.form.location.$dirty) return errors;
      !this.$v.form.location.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.insurance.cols.location.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
