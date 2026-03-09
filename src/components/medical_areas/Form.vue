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
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.code"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.expenses_nature.cols.nature_code.title'
                    )
                  "
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  filled
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="5" class="mb-0 py-0"> </v-col>
              <v-col
                cols="12"
                sm="3"
                class="mb-0 py-0"
                style="margin-top: -20px"
              >
                <v-switch
                  v-model="is_active"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.status.enabled'
                    )
                  "
                  outlined
                  dense
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.name"
                  color="primary"
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  ><template #label>
                    <span class="red--text"><strong>* </strong></span
                    >{{
                      $vuetify.lang.t("$vuetify.medical_areas.cols.name.title")
                    }}
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.number_account"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.number_account.title'
                    )
                  "
                  prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.normal"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.normal.title')
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!--              <v-col cols="12" sm="3" class="mb-0 py-0">-->
              <!--                <v-text-field-->
              <!--                  v-model="form.covered"-->
              <!--                  color="primary"-->
              <!--                  :label="-->
              <!--                    $vuetify.lang.t('$vuetify.medical_areas.cols.covered.title')-->
              <!--                  "-->
              <!--                  class="font-weight-bold"-->
              <!--                  outlined-->
              <!--                  dense-->
              <!--                ></v-text-field>-->
              <!--              </v-col>-->
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.employee"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.employee.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.indigent"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.medical_areas.cols.indigent.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -35px"></v-divider>
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
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
import { existNameAreas } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          normal: null,
          employee: null,
          indigent: null,
          number_account: null,
        };
      },
    },
  },
  data: () => ({
    urlItems: "medical_areas",
    urlUsers: "users",
    isLoading: false,
    is_active: true,
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
        name: {
          required,
          unique: existNameAreas,
          maxLength: maxLength(255),
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
        normal: this.form.normal,
        indigent: this.form.indigent,
        employee: this.form.employee,
        number_account: this.form.number_account,
        name: this.form.name,
        is_active: this.is_active ? this.is_active : false,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.number_account = item.number_account;
      this.form.employee = item.employee;
      this.form.normal = item.normal;
      this.form.indigent = item.indigent;
      this.is_active = item.is_active;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.name.unique")
        );
      return errors;
    },
    number_accountErrors() {
      let errors = [];
      if (!this.$v.form.number_account.$dirty) return errors;
      !this.$v.form.number_account.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_areas.cols.number_account.required"
          )
        );

      return errors;
    },
    quote_externalErrors() {
      let errors = [];
      if (!this.$v.form.quote_external.$dirty) return errors;

      !this.$v.form.quote_external.quote_external &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.medical_areas.cols.quote_external.invalid"
          )
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.medical_areas.cols.phone.invalid")
        );
      return errors;
    },
  },
};
</script>
