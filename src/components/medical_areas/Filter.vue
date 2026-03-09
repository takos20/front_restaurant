<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.medical_areas.filter") }}
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
                    $vuetify.lang.t('$vuetify.medical_areas.cols.code.title')
                  "
                  prepend-inner-icon="mdi-numeric"
                  v-model="filter.code"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.medical_areas.cols.name.title')
                  "
                  prepend-inner-icon="mdi-format-italic"
                  v-model="filter.name"
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
          code: null,
        };
      },
    },
  },
  created() {},
  data: () => ({
    types: {
      role: [],
    },
    loadingBtn: false,
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.code = null;
      this.filter.name = null;
    },
  },
};
</script>
