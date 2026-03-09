<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">{{ $vuetify.lang.t("$vuetify.dci.filter") }}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="$vuetify.lang.t('$vuetify.category.cols.name.title')"
                  prepend-icon="mdi-rename-box"
                  v-model="filter.name"
                ></v-text-field>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="$vuetify.lang.t('$vuetify.category.cols.code.title')"
                  prepend-icon="mdi-code-array"
                  v-model="filter.code"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.shows.showFilter = false" text>
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn @click="resetForm" text>
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn :loading="loadingBtn" color="secondary" text type="submit">
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
    loadingBtn: false,
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.name = null;
      this.filter.code = null;
    },
  },
};
</script>
