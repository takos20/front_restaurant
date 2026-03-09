<template>
  <v-dialog v-model="dialog.show" persistent max-width="880px">
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
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
                          {{
                            $vuetify.lang.t(
                              "$vuetify.permission.cols.model." +
                                permissions[content][0].model
                            )
                          }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content color="grey lighten-3">
                          <v-layout row wrap>
                            <v-flex
                              xs3
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
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <v-card-text> </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";

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
    permissions: {},
    permission: [],
    checkbox: true,
    urlContentType: "users/contentTypes/permissions",
    urlItems: "users/permissions",
    itemsPermission: [],
    // formR: {
    //   id: null,
    //   name: null
    // },
  }),
  watch: {},

  created() {
    this.getPermissions();
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
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
              if (!this.permissions[prop.content_type.id]) {
                this.permissions[prop.content_type.id] = [];
              }
              this.itemsPermission.push(prop.id);
              this.permissions[prop.content_type.id].push({
                name: prop.name,
                description: prop.codename,
                model: prop.content_type.model,
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
    // Fonction pour récuperer le contenu des champs du formulaire
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
