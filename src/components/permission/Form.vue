<template>
  <v-dialog v-model="dialog.show" persistent max-width="1200">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon light @click="dialog.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
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
                    prepend-inner-icon="mdi-account-multiple mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.permission.cols.name.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-checkbox
                    v-model="checkbox"
                    class="font-weight-bold"
                    outlined
                    @change="expandAll"
                    dense
                    :label="$vuetify.lang.t('$vuetify.permission.all')"
                  ></v-checkbox>
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                  class="mb-0 py-0"
                  v-if="checkbox === false"
                >

                  <!-- Module Panels -->
                  <v-expansion-panels v-model="activePanels" multiple>
                    <template
                      v-for="(models, moduleName) in groupedPermissions"
                    >
                      <v-expansion-panel :key="moduleName">
                      

                        <v-expansion-panel-content>
                          <v-row dense>
                            <v-col
                              v-for="(permissions, modelName) in models"
                              :key="modelName"
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-expansion-panels multiple>
                                <v-expansion-panel>
                                  <v-expansion-panel-header>
                                    {{
                                      $vuetify.lang.t(
                                        `$vuetify.permission.cols.model.${modelName}`
                                      )
                                    }}
                                    <!-- {{ formatModelName(modelName) }} -->
                                  </v-expansion-panel-header>

                                  <v-expansion-panel-content>
                                    <v-row dense>
                                      <v-col
                                        v-for="permissionItem in permissions"
                                        :key="permissionItem.permissionId"
                                        cols="6"
                                        sm="6"
                                        md="6"
                                      >
                                        <v-checkbox
                                          dense
                                          hide-details
                                          :label="
                                            getPermissionLabel(
                                              permissionItem.description
                                            )
                                          "
                                          :value="permissionItem.permissionId"
                                          v-model="permission"
                                        />
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </template>
                  </v-expansion-panels>
            
                </v-col>
              </v-row>
              <br />
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
// import { required } from "vuelidate/lib/validators";
// import { existRole } from "@/helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          permission: [],
          name: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    permissions: [],
    permission: [],
    checkbox: true,
    urlContentType: "users/contentTypes/permissions",
    urlItems: "users/permissions",
    itemsPermission: [],
    isLoadingD: false,
    isLoadingP: false,

    // searchPermission: null,
    isLoadingPermission: false,
    search: null,
    searchDoctor: null,
    searchPatient: null,
    searchDepart: null,
    menu2: false,
    menu3: false,
    menu4: false,
    menu: false,
    loading: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    activePanels: [],
    // formR: {
    //   id: null,
    //   name: null
    // },
    optionRole: {
      type_Role: [],
    },
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {},

  created() {
    this.getPermissions();
  },
  validations() {
    let validators = {
      form: {
        // name: {
        //   required,
        //   unique: existRole,
        // },
      },
    };
    return validators;
  },
  methods: {
    // getPermissionLabel(desc) {
    //   return this.$vuetify.lang.t(`$vuetify.permission.cols.allPermissiion.${desc}`);
    // },
    // expandAll() {
    //   this.activePanels = Object.keys(this.groupedPermissions);
    // },
    // collapseAll() {
    //   this.activePanels = [];
    // },

    getPermissionLabel(desc) {
      // Fallback for missing translation
      const key = `$vuetify.permission.cols.allPermissiion.${desc}`;
      const translation = this.$vuetify.lang.t(key);
      return translation || desc.replace(/_/g, " ");
    },
    expandAll() {
      // Expand all panel indices
      this.activePanels = Object.keys(this.groupedPermissions).map(
        (_, index) => index
      );
    },
    collapseAll() {
      this.activePanels = [];
    },
    formatModuleName(name) {
      // Capitalize module name for header
      return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    },
    formatModelName(name) {
      return name.toUpperCase();
    },
    getPermissions() {
      let self = this;
      // console.log(page);
      // console.log(itemsPerPage);
      return new Promise((resolve, reject) => {
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlContentType,
          })
          .then((response) => {
            console.log(response.data.content);
            // const resources = {};
            for (const prop of response.data.content) {
              this.permissions.push({
                name: prop.name,
                description: prop.codename,
                model_name: prop.model,
                permissionId: prop.id,
                isChecked: false,
              });
            }
            // let data = response.data;
            // self.items = data.content;
            // self.meta = { totalElements: data.totalElements };
            resolve(response);
          })
          .catch((err) => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                const fields = err.response.data;
                self.setFormErrors(fields);

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message,
            });
            reject(err);
          })
          .then(() => {
            resolve();
          });
      });
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "?id=" + this.form.id;
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
        checkbox: this.checkbox,
        permission: this.permission,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.name = item.group_name;
      this.form["oldRole"] = item.name;
      // this.form.permission = item.permissions;
      // let perm = [];
      this.permission = [];
      item.permissions.forEach((p) => {
        this.itemsPermission.push({
          text: this.$vuetify.lang.t(
            "$vuetify.permission.cols.allPermissiion." + p.codename
          ),
          value: p.id,
        });
        this.permission.push(p.id);
      });
      // for (const prop of item.permissions) {
      //   this.itemsPermission.push({
      //     text:  prop.codename,
      //     value:prop.id
      //   })
      // };
      //console.log(perm)
      //.itemsPermission=perm;
    },
  },
  computed: {
    icon() {
      return "mdi-checkbox-blank-outline";
    },
    groupedPermissions() {
      const grouped = {};

      this.permissions.forEach((p) => {
        if (!grouped[p.module_name]) {
          grouped[p.module_name] = {};
        }

        if (!grouped[p.module_name][p.model_name]) {
          grouped[p.module_name][p.model_name] = [];
        }

        grouped[p.module_name][p.model_name].push(p);
      });

      return grouped;
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
<style scoped>
.v-expansion-panel-header {
  font-weight: 500;
  font-size: 1.1rem;
}
.v-subheader {
  font-size: 1rem;
}
</style>
