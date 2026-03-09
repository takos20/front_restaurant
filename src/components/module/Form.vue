<template>
  <v-dialog v-model="dialog.show" persistent max-width="1000px">
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
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.module.cols.name.title')"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-account-multiple mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.module.cols.name.title") }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.contentType"
                    :items="itemsContentType"
                    :loading="isLoadingContentType"
                    :search-input.sync="searchContentType"
                    color="primary"
                    @blur="$v.form.contentType.$touch()"
                    @input="$v.form.contentType.$touch()"
                    :error-messages="contentTypeErrors"
                    :label="
                      $vuetify.lang.t('$vuetify.module.cols.contentType.title')
                    "
                    prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark"
                    class="font-weight-bold"
                    outlined
                    show-select
                    item-text="text"
                    item-value="value"
                    clearable
                    multiple
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.module.cols.contentType.title"
                        )
                      }}
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="close_modal">
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
import { existModule } from "@/helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          contentType: [],
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
    urlContentType: "users/contentTypes",
    itemsContentType: [],
    searchContentType: null,
    isLoadingContentType: false,
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
    loading: false,
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
    urlItems: "modules",
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {
    searchContentType(value) {
      if (value === null) return;
      const params = { model: value };
      let self = this;
      this.isLoadingContentType = true;
      this.$store
        .dispatch("request", {
          url: self.urlContentType,
          params: params,
        })
        .then((response) => {
          for (const prop of response.data.content) {
            self.itemsContentType.push({
              text: this.$vuetify.lang.t(
                "$vuetify.permission.cols.model." + prop.model
              ),
              value: prop.id,
            });
          }
          // self.itemsContentType = response.data.content;
        })
        .finally(() => (this.isLoadingContentType = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        contentType: {
          required,
        },
        name: {
          required,
          unique: existModule,
        },
      },
    };
    return validators;
  },
  methods: {
    close_modal() {
      this.dialog.show = false;
      this.itemsContentType = [];
    },
    toggle() {
      let permis = [];
      this.itemsPermission.forEach((p) => {
        permis.push(p.value);
      });
      this.form.permission = [];
      this.form.permission = permis;
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });

            self.$emit("getItems");
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        name: this.form.name,
        contentType: this.form.contentType,
      };
      return data;
    },
    setItemsContent(use) {
      let self = this;
      self.form.contentType = [];
      use.forEach((content) => {
        self.itemsContentType.push(content);
        self.form.contentType.push(content.value);
      });
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      // this.form.permission = item.permissions;
      // let perm = [];
      // console.log(item.contentType)
      this.form.contentType = item.contentType;
      //
      // this.itemsContentType.push(item.contentType);

      let content_type = [];
      item.contentType.forEach((prop) => {
        content_type.push({
          text: this.$vuetify.lang.t(
            "$vuetify.permission.cols.model." + prop.model
          ),
          value: prop.id,
        });
        // this.permission.push(p.id);
      });
      this.setItemsContent(content_type);

      //.itemsPermission=perm;
    },
  },
  computed: {
    icon() {
      return "mdi-checkbox-blank-outline";
    },
    // Gestion des erreurs du formulaire
    permissionErrors() {
      let errors = [];
      if (!this.$v.form.permission.$dirty) return errors;
      !this.$v.form.permission.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.permission.cols.permis.required")
        );
      return errors;
    },
    contentTypeErrors() {
      let errors = [];
      if (!this.$v.form.contentType.$dirty) return errors;
      !this.$v.form.contentType.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.permission.cols.contentType.required")
        );
      return errors;
    },
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.permission.cols.name.required")
        );

      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.permission.cols.name.unique")
        );
      return errors;
    },
  },
  components: {},
};
</script>
