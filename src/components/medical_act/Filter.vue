<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.medical_act.filter") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.medical_act.cols.name.title')
                  "
                  prepend-inner-icon="mdi-rename-box"
                  v-model="filter.name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="filter.medical_areas"
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
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.medical_act.cols.price.title')
                  "
                  prepend-inner-icon="mdi-cash"
                  v-model="filter.price"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.code.title')
                  "
                  prepend-inner-icon="mdi-numeric"
                  v-model="filter.code"
                  outlined
                  dense
                ></v-text-field>
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
          <v-btn :loading="loadingBtn" dark color="primary" type="submit">
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
    filter: {
      type: Object,
      default: function () {
        return {
          name: null,
          medical_areas: null,
          price: null,
          code: null,
        };
      },
    },
  },
  created() {},
  data: () => ({
    loadingBtn: false,
    urlMedical_areas: "medical_areas",
    isLoading: false,
    search: null,
    itemsMedical_areas: [],
  }),
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
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.code = null;
      this.filter.name = null;
      this.filter.medical_areas = null;
      this.filter.price = null;
    },
  },
};
</script>
