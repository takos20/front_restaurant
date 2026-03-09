<template>
  <v-dialog v-model="dialog.show" persistent max-width="580px">
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
                    :label="$vuetify.lang.t('$vuetify.dci.cols.code.title')"
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
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
                  <v-autocomplete
                    v-model="form.department"
                    :items="itemsDepartments"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.departments.cols.name.title')
                    "
                    s
                    prepend-inner-icon="mdi-home-plus mdi-dark mdi-18px"
                    class="font-weight-bold"
                    @blur="$v.form.department.$touch()"
                    @input="$v.form.department.$touch()"
                    :error-messages="departmentErrors"
                    outlined
                    dense
                    clearable
                    :menu-props="{
                      closeOnClick: true,
                      closeOnContentClick: true,
                    }"
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.departments.cols.name.title")
                      }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.services.cols.name.title')
                    "
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.services.cols.name.title")
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
import { required, maxLength } from "vuelidate/lib/validators";
import { existNameDepart } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          department: null,
        };
      },
    },
  },
  data: () => ({
    is_active: true,
    urlItems: "services",
    urlDepartments: "departments/all",
    isLoading: false,
    search: null,
    itemsDepartments: [],
    selectDepartments: [],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepartments,
          params: params,
        })
        .then((response) => {
          //console.log("respp", response.data.content);
          self.itemsDepartments = response.data.content;
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
          maxLength: maxLength(100),
          unique: existNameDepart,
        },
        department: {
          required,
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
        name: this.form.name,
        department: this.form.department,
        is_active: this.is_active,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.name = item.name;
      this.form.code = item.code;
      this.form["oldName"] = item.name;
      this.form.department = item.department["id"];
      this.itemsDepartments.push(item.department);
      this.is_active = item.is_active;
    },
  },
  computed: {
    departmentErrors() {
      let errors = [];
      if (!this.$v.form.department.$dirty) return errors;
      !this.$v.form.department.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.doctor.cols.department.required")
        );
      return errors;
    },
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.services.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.services.cols.name.unique"));
      return errors;
    },
  },
};
</script>
