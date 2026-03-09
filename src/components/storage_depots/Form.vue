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
                      $vuetify.lang.t('$vuetify.storage_depots.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="5"
                  class="mb-0 py-0"
                  style="margin-top: -15px"
                >
                </v-col>
                <v-col
                  cols="12"
                  sm="3"
                  class="mb-0 py-0"
                  style="margin-top: -15px"
                >
                  <v-switch
                    v-model="form.is_default"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.storage_depots.cols.is_default.title'
                      )
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" style="margin-top: -25px">
                  <v-card class="pa-4" outlined>
                    <!-- Header -->
                    <div class="d-flex align-center justify-space-between mb-4">
                      <div>
                        <div class="text-h6 font-weight-bold">
                          {{ $vuetify.lang.t("$vuetify.dish.language") }}
                        </div>
                        <div class="grey--text text--darken-1 text-caption">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.dish.language_description"
                            )
                          }}
                        </div>
                      </div>

                      <v-btn color="primary" small @click="addColumnLanguage">
                        <v-icon left>mdi-plus</v-icon>
                        {{ $vuetify.lang.t("$vuetify.btn.add") }}
                      </v-btn>
                    </div>

                    <v-divider class="mb-4"></v-divider>

                    <!-- Lines -->
                    <v-card
                      v-for="(rule, index) in name_language"
                      :key="index"
                      class="mb-2 pa-2 rounded-lg"
                      outlined
                    >
                      <v-row dense align="center">
                        <!-- Language -->
                        <v-col cols="4">
                          <v-select
                            v-model="rule.language"
                            :items="optionLanguage.type_language"
                            item-text="text"
                            item-value="value"
                            outlined
                            dense
                            hide-details
                            :label="
                              $vuetify.lang.t(
                                '$vuetify.dish.cols.language.title'
                              )
                            "
                          />
                        </v-col>

                        <!-- Name -->
                        <v-col cols="7">
                          <v-text-field
                            v-model="rule.name"
                            outlined
                            dense
                            hide-details
                            :label="
                              $vuetify.lang.t('$vuetify.dish.cols.name.title')
                            "
                          />
                        </v-col>

                        <!-- Actions -->
                        <v-col cols="1" class="d-flex justify-end">
                          <!-- Save -->
                          <!-- <v-btn icon @click="saveLanguage(rule)">
            <v-icon :color="rule.saved ? 'green' : ''">
              mdi-content-save
            </v-icon>
          </v-btn> -->

                          <!-- Delete -->
                          <v-btn
                            icon
                            color="error"
                            @click="removeColumnLanguage(index)"
                          >
                            <v-icon>mdi-delete-outline</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-col>
                <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name_responsible"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.storage_depots.cols.name_responsible.title'
                      )
                    "
                    prepend-inner-icon="mdi-account-star mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="name_responsible"
                    outlined
                    dense
                  ></v-text-field>
                </v-col> -->
                <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.username"
                    :items="itemsUsers"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    item-text="username"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.storage_depots.cols.username.title'
                      )
                    "
                    prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-autocomplete>
                </v-col> -->
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="forceRefresh">
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

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          is_default: null,
          code: null,
          name: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    name_language: [],
    optionsLanguages: {
      text: {
        language: "",
        name: "",
        saved: false,
      },
    },
    is_active: true,
    optionLanguage: {
      type_language: [],
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "storage_depots",
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
  },

  created() {
    this.getOptionsLanguage();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
      this.name_language = [];
    },
    addColumnLanguage() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.name_language.push({
        ...this.optionsLanguages.text,
      });
    },
    removeColumnLanguage(index) {
      this.name_language.splice(index, 1);
    },
    getOptionsLanguage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_language, (type_language) => {
        self.optionLanguage.type_language.push({
          text: self.$vuetify.lang.t(type_language.text),
          value: type_language.value,
        });
      });
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        is_default: this.form.is_default,
        is_active: this.is_active,
        name_language: this.name_language,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.is_default = item.is_default;
      this.name_language = item.name_language;
      this.form["oldname"] = item.name;
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
          this.$vuetify.lang.t("$vuetify.storage_depots.cols.name.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
