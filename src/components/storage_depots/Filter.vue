<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.storage_depots.filter") }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="filter.code"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.storage_depots.cols.code.title')
                  "
                  prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="filter.username"
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
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-text-field
                  v-model="filter.name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.storage_depots.cols.name.title')
                  "
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
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
          code: null,
          username: null,
          name: null,
        };
      },
    },
  },
  created() {},
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
  data: () => ({
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
    loadingBtn: false,
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.username = null;
      this.filter.name = null;
      this.filter.code = null;
    },
  },
};
</script>
