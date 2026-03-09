<template>
  <v-dialog v-model="dialog.show" persistent max-width="680">
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
                    v-model="form.title"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.internalnote.cols.title.title')
                    "
                    @blur="$v.form.title.$touch()"
                    @input="$v.form.title.$touch()"
                    :error-messages="titleErrors"
                    prepend-inner-icon="mdi-account-multiple mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.internalnote.cols.title.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-textarea
                    v-model="form.description"
                    color="primary"
                    @blur="$v.form.description.$touch()"
                    @input="$v.form.description.$touch()"
                    :error-messages="descriptionErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.internalnote.cols.description.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    rows="2"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-checkbox
                    v-model="checkbox"
                    class="font-weight-bold"
                    outlined
                    dense
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.internalnote.cols.for_all.title'
                      )
                    "
                  ></v-checkbox>
                </v-col>

                <v-col
                  cols="12"
                  sm="12"
                  class="mb-0 py-0"
                  v-if="checkbox === false"
                >
                  <v-autocomplete
                    v-model="form.departments"
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
                    outlined
                    show-select
                    clearable
                    multiple
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.departments.cols.name.title")
                      }}
                    </template>
                  </v-autocomplete>
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
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          for_all: null,
          description: null,
          departments: [],
          title: null,
        };
      },
    },
  },
  data: () => ({
    e1: 1,
    isLoading: false,
    checkbox: true,
    urlItems: "internalNotes",
    loading: false,
    urlDepartments: "departments",
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
    // formR: {
    //   id: null,
    //   title: null
    // },
  }),
  created() {
    // this.getPermissions();
  },
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
  validations() {
    let validators = {
      form: {
        title: {
          required,
        },
        description: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
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
        title: this.form.title,
        for_all: this.checkbox,
        departments: this.form.departments,
        description: this.form.description,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.title = item.title;
      this.form.departments = item.departments["id"];
      this.itemsDepartments.push(item.departments);
      this.form.description = item.description;
      this.form.for_all = item.for_all;
      // this.form.permission = item.permissions;
      // let perm = [];

      // for (const prop of item.permissions) {
      //   this.itemsPermission.push({
      //     text:  prop.codetitle,
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
    descriptionErrors() {
      let errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      !this.$v.form.description.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.internalnote.cols.description.required"
          )
        );
      return errors;
    },
    titleErrors() {
      let errors = [];
      if (!this.$v.form.title.$dirty) return errors;

      !this.$v.form.title.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.internalnote.cols.title.required")
        );

      return errors;
    },
  },
  components: {},
};
</script>
