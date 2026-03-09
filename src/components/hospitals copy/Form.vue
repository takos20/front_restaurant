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
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.name"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.hospitals.cols.name.title')"
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
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
                    $vuetify.lang.t('$vuetify.hospitals.cols.phone.title')
                  "
                  @blur="$v.form.phone.$touch()"
                  @input="$v.form.phone.$touch()"
                  :error-messages="phoneErrors"
                  prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.address"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.address.title')
                  "
                  prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  :error-messages="addressErrors"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.email"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.email.title')
                  "
                  @blur="$v.form.email.$touch()"
                  @input="$v.form.email.$touch()"
                  :error-messages="emailErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.consultation_time"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.consultation_time.title'
                    )
                  "
                  @blur="$v.form.consultation_time.$touch()"
                  @input="$v.form.consultation_time.$touch()"
                  :error-messages="consultation_timeErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.owner"
                  :items="itemsUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.owner.title')
                  "
                  @blur="$v.form.owner.$touch()"
                  @input="$v.form.owner.$touch()"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.logo"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.hospitals.cols.logo.title')"
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field> </v-col
              ><v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.slogan"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.slogan.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field> </v-col
              ><v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.taxpayer"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.taxpayer.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.zip_code"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.zip_code.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -30px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <form-department :dialog="dialogForm"></form-department>
  </v-dialog>
</template>

<script>
// import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { phoneR, existNameHospital } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          taxpayer: null,
          slogan: null,
          consultation_time: null,
          address: null,
          logo: null,
          phone: null,
          email: null,
          owner: null,
          // depart: null
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
    urlDepartments: "departments",
    search_: null,
    itemsDepartments: [],
    urlItems: "hospitals",
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
    // search_(value) {
    //   if (value === null) return;
    //   const params = { name: value };
    //   let self = this;
    //   this.isLoading = true;
    //   this.$store
    //     .dispatch("request", {
    //       url: self.urlDepartments,
    //       params: params
    //     })
    //     .then(response => {
    //       //console.log("respp", response.data.content);
    //       self.itemsDepartments = response.data.content;
    //     })
    //     .finally(() => (this.isLoading = false));
    // }
  },
  created() {},
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameHospital,
          maxLength: maxLength(255),
        },
        email: {
          email,
          maxLength: maxLength(255),
        },
        phone: {
          required,
          phoneR,
        },
        address: {
          required,
        },
        consultation_time: {
          required,
        },
        owner: {
          required,
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

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        taxpayer: this.form.taxpayer,
        slogan: this.form.slogan,
        address: this.form.address,
        logo: this.form.logo,
        consultation_time: this.form.consultation_time,
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
        owner: this.form.owner,
        // depart: this.form.depart
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.address = item.address;
      this.form.taxpayer = item.taxpayer;
      this.form.slogan = item.slogan;
      this.form.consultation_time = item.consultation_time;
      this.form.phone = item.phone;
      this.form.logo = item.logo;
      this.form.email = item.email;
      this.form.owner = item.owner["id"];
      this.itemsUsers.push(item.owner);
      // this.form.depart = item.depart["id"];
      // this.itemsDepartments.push(item.depart);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.unique")
        );

      return errors;
    },
    addressErrors() {
      let errors = [];
      if (!this.$v.form.address.$dirty) return errors;
      !this.$v.form.address.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.address.required")
        );

      return errors;
    },
    consultation_timeErrors() {
      let errors = [];
      if (!this.$v.form.consultation_time.$dirty) return errors;
      !this.$v.form.consultation_time.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitals.cols.consultation_time.required"
          )
        );

      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.email.invalid")
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: {
    // FormDepartment
  },
};
</script>
