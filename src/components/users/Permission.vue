<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.permission.title") }}
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
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-account-multiple mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-checkbox
                    v-model="checkbox"
                    class="font-weight-bold"
                    outlined
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
                  <div>
                    <v-expansion-panels multiple>
                      <v-expansion-panel
                        v-for="(module, content) in permissions"
                        :key="content.id"
                      >
                        <v-expansion-panel-header>
                          <!--                          {{-->
                          <!--                            $vuetify.lang.t(-->
                          <!--                              "$vuetify.permission.cols.model." +-->
                          <!--                                permissions[content][0].model-->
                          <!--                            )-->
                          <!--                          }}                          -->
                          {{ permissions[content][0].module_name }}
                          <!--                          <template v-slot:actions>-->
                          <!--                            <v-btn  color="primary" dark > Voir </v-btn>-->
                          <!--                          </template>-->
                        </v-expansion-panel-header>
                        <v-expansion-panel-content color="grey lighten-3">
                          <!--                          <v-expansion-panels multiple>-->
                          <!--                            <v-expansion-panel-->
                          <!--                                v-for="(permission_module, content) in module"-->
                          <!--                                :key="content.content_type"-->
                          <!--                            >-->
                          <!--                              {{module[content].content_type}}-->
                          <!--                              <v-expansion-panel-header >-->
                          <!--                                                          {{-->
                          <!--                                                            $vuetify.lang.t(-->
                          <!--                                                              "$vuetify.permission.cols.model." +-->
                          <!--                                                                module[content].model-->
                          <!--                                                            )-->
                          <!--                                                          }}-->
                          <!--                                &lt;!&ndash;                          <template v-slot:actions>&ndash;&gt;-->
                          <!--                                &lt;!&ndash;                            <v-btn  color="primary" dark > Voir </v-btn>&ndash;&gt;-->
                          <!--                                &lt;!&ndash;                          </template>&ndash;&gt;-->
                          <!--                              </v-expansion-panel-header>-->
                          <!--&lt;!&ndash;                              <v-expansion-panel-content color="grey lighten-3">&ndash;&gt;-->
                          <!--&lt;!&ndash;                                <v-layout row wrap>&ndash;&gt;-->
                          <!--&lt;!&ndash;                                  <v-flex xs6 v-for="(value, index) in permission_module" :key="index">&ndash;&gt;-->
                          <!--&lt;!&ndash;                                    <v-checkbox&ndash;&gt;-->
                          <!--&lt;!&ndash;                                        :label="&ndash;&gt;-->
                          <!--&lt;!&ndash;                                $vuetify.lang.t(&ndash;&gt;-->
                          <!--&lt;!&ndash;                                  '$vuetify.permission.cols.allPermissiion.' +&ndash;&gt;-->
                          <!--&lt;!&ndash;                                    value.description&ndash;&gt;-->
                          <!--&lt;!&ndash;                                )&ndash;&gt;-->
                          <!--&lt;!&ndash;                              "&ndash;&gt;-->
                          <!--&lt;!&ndash;                                        :value="value.permissionId"&ndash;&gt;-->
                          <!--&lt;!&ndash;                                        multiple&ndash;&gt;-->
                          <!--&lt;!&ndash;                                        v-model="permission"&ndash;&gt;-->
                          <!--&lt;!&ndash;                                    >&ndash;&gt;-->
                          <!--&lt;!&ndash;                                    </v-checkbox>&ndash;&gt;-->
                          <!--&lt;!&ndash;                                  </v-flex>&ndash;&gt;-->
                          <!--&lt;!&ndash;                                </v-layout>&ndash;&gt;-->
                          <!--&lt;!&ndash;                              </v-expansion-panel-content>&ndash;&gt;-->
                          <!--                            </v-expansion-panel>-->
                          <!--                          </v-expansion-panels>-->

                          <v-layout row wrap>
                            <v-flex
                              xs2
                              v-for="(value, index) in module"
                              :key="index"
                            >
                              <v-checkbox
                                :label="
                                  $vuetify.lang.t(
                                    '$vuetify.permission.cols.allPermissiion.' +
                                      value.description
                                  )
                                "
                                :value="value.permissionId"
                                multiple
                                v-model="permission"
                              >
                              </v-checkbox>
                            </v-flex>
                          </v-layout>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
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
import { existRole } from "@/helpers/Validator";

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
    permissions: {},
    permission: [],
    checkbox: true,
    isLoadingD: false,
    isLoadingP: false,
    urlContentType: "users/contentTypes/permissions",
    itemsPermission: [],
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
    // formR: {
    //   id: null,
    //   name: null
    // },
    optionRole: {
      type_Role: [],
    },
    urlItems: "users/permissions",
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
        name: {
          required,
          unique: existRole,
        },
      },
    };
    return validators;
  },
  methods: {
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
            // const resources = {};
            for (const prop of response.data.content) {
              if (!this.permissions[prop.module?.id]) {
                this.permissions[prop.module?.id] = [];
              }
              this.permissions[prop.module?.id].push({
                name: prop.name,
                description: prop.codename,
                module_id: prop.module?.id,
                module_name: prop.module?.name,
                permissionId: prop.id,
                isChecked: false,
              });
            }
            // let data = response.data;
            // self.items = data.content;
            // self.meta = { totalElements: data.totalElements };
            // console.log("meta", this.itemsPermissionAll);
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
      this.form.name = item.name;
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
