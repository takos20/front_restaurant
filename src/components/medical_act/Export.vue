<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.medical_act.export") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="performExport()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-autocomplete
                  v-model="exports.medical_areas"
                  :items="itemsMedical_areas"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.name.title')
                  "
                  prepend-inner-icon="mdi-hospital mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.shows.showFilter = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn @click="resetForm">
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn dark color="primary" type="submit">
            {{ $vuetify.lang.t("$vuetify.btn.validate") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FilterMixin from "../../mixins/Common/Filters";
export default {
  mixins: [FilterMixin],
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showFilter: false,
          },
        };
      },
    },
    exports: {
      type: Object,
      default: function () {
        return {
          name: null,
          price: null,
          medical_areas: null,
          code: null,
        };
      },
    },
  },
  created() {},
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlMedical_areas,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_areas = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  data: () => ({
    loadingBtn: false,
    urlMedical_areas: "medical_areas",
    isLoading: false,
    search: null,
    itemsMedical_areas: [],
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.exports.code = null;
      this.exports.name = null;
      this.exports.medical_areas = null;
      this.exports.price = null;
    },
  },
};
</script>
