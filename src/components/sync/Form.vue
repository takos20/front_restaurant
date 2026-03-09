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
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.hospital"
                    :items="itemshospital"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    
                    :label="$vuetify.lang.t('$vuetify.hospitals.title')"
                    outlined
                    dense
                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.hospitals.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
<v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-switch
                    v-model="auto_sync"
                    color="primary"
                    style="margin-top: -0px"
                    :label="
                      $vuetify.lang.t('$vuetify.sync.cols.auto_sync.title')
                    "
                    outlined
                    dense
                  ></v-switch>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.remote_api_url"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.sync.cols.remote_api_url.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.local_api_url"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.sync.cols.local_api_url.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.sync.cols.local_api_url.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.api_token"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.sync.cols.api_token.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t("$vuetify.sync.cols.api_token.title")
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.sync_interval"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.sync.cols.sync_interval.title')
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.sync.cols.sync_interval.title"
                        )
                      }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.models_to_sync"
                    :items="itemsContentType"
                    :loading="isLoadingContentType"
                    :search-input.sync="searchContentType"
                    multiple
                    color="primary"
                    item-text="model"
                    item-value="model"
                    
                    :label="$vuetify.lang.t('$vuetify.sync.cols.models_to_sync.title')"
                    outlined
                    dense
                    prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                    class="font-weight-bold"
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.sync.cols.models_to_sync.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="forceRefresh()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
    <form-translation
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      ref="translationForm"
    ></form-translation>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
// import { existNamesync } from "../../helpers/Validator";
import FormTranslation from "./FormTranslation.vue";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          local_api_url: null,
          hospital: null,
          api_token: null,
          auto_sync: null,
          remote_api_url: null,
          models_to_sync: null,
          sync_interval: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItemsTranslate: "synces/translations",
    auto_sync: true,
    urlItems: "sync",
    urlhospital: "hospitals",
    isLoading: false,
    search: null,
    itemshospital: [],    
    urlContentType: "users/contentTypes",
    isLoadingContentType: false,
    searchContentType: null,
    itemsContentType: [],
    types: {
      role: [],
    },
    itemsRoles: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlhospital,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemshospital = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
    searchContentType(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingContentType = true;
      this.$store
        .dispatch("request", {
          url: self.urlContentType,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsContentType = response.data.content;
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
      },
    };
    return validators;
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
      this.name_language = [];
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        hospital: this.form.hospital,
        remote_api_url: this.form.remote_api_url,
        api_token: this.form.api_token,
        local_api_url: this.form.local_api_url,
        models_to_sync: this.form.models_to_sync,
        sync_interval: this.sync_interval,
        auto_sync: this.auto_sync,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.remote_api_url = item.remote_api_url;
      this.form.local_api_url = item.local_api_url;
      this.form.api_token = item.api_token;
      this.form.sync_interval = item.sync_interval;
      this.form.models_to_sync = item.models_to_sync;
      this.auto_sync = item.auto_sync;
      this.form.hospital = item.hospital["id"];
      this.itemshospital.push(item.hospital);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    sync_intervalErrors() {
      let errors = [];
      if (!this.$v.form.sync_interval.$dirty) return errors;

      !this.$v.form.sync_interval.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.sync_interval.required")
        );

      return errors;
    },
    models_to_syncErrors() {
      let errors = [];
      if (!this.$v.form.models_to_sync.$dirty) return errors;
      !this.$v.form.models_to_sync.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.models_to_sync.required")
        );

      return errors;
    },
    hospitalErrors() {
      let errors = [];
      if (!this.$v.form.hospital.$dirty) return errors;
      !this.$v.form.hospital.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.hospital.required")
        );
      return errors;
    },
    local_api_urlErrors() {
      let errors = [];
      if (!this.$v.form.local_api_url.$dirty) return errors;
      !this.$v.form.local_api_url.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.local_api_url.required")
        );
      return errors;
    },    
    remote_api_urlErrors() {
      let errors = [];
      if (!this.$v.form.remote_api_url.$dirty) return errors;
      !this.$v.form.remote_api_url.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.remote_api_url.required")
        );
      return errors;
    },
    api_tokenErrors() {
      let errors = [];
      if (!this.$v.form.api_token.$dirty) return errors;
      !this.$v.form.api_token.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.sync.cols.api_token.required")
        );
      return errors;
    },
  },
  components: { FormTranslation },
};
</script>
