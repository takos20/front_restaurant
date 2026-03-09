<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.permission.title") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.permission.cols.name.title')
                    "
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.permission"
                    :items="itemsPermission"
                    :loading="isLoadingPermission"
                    :search-input.sync="searchPermission"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.permission.cols.permis.title')
                    "
                    prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    clearable
                    chips
                    multiple
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
              {{ $vuetify.lang.t("$vuetify.btn.save") }}
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
import { existNamePermission } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          permission: null,
          name: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    isLoadingD: false,
    isLoadingP: false,
    urlPermission: "users/permissions",
    itemsPermission: [],
    searchPermission: null,
    isLoadingPermission: false,
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
  watch: {
    searchPermission(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingPermission = true;
      this.$store
        .dispatch("request", {
          url: self.urlPermission,
          params: params,
          limit: 50,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsPermission = response.data.content;
        })
        .finally(() => (this.isLoadingPermission = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        permission: {
          required,
        },
        name: {
          required,
          unique: existNamePermission,
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
        permission: this.form.permission,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.name = item.name;
      this.form.permission = item.permission;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    // permssionErrors() {
    //   let errors = [];
    //   if (!this.$v.form.permission.$dirty) return errors;
    //   !this.$v.form.permission.required &&
    //     errors.push(this.$vuetify.lang.t("$vuetify.permission.cols.permis.required"));
    //   return errors;
    // },
    // nameErrors() {
    //   let errors = [];
    //   if (!this.$v.form.name.$dirty) return errors;
    //
    //   !this.$v.form.name.required &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.users.cols.name.required")
    //     );
    //   !this.$v.form.name.unique &&
    //     errors.push(
    //       this.$vuetify.lang.t("$vuetify.users.cols.name.unique")
    //     );
    //   return errors;
    // },
  },
  components: {},
};
</script>
