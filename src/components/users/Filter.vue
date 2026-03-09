<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">{{ $vuetify.lang.t("$vuetify.users.filter") }}</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.users.cols.username.title2')
                  "
                  prepend-inner-icon="mdi-account-outline"
                  outlined
                  v-model="filter.username"
                ></v-text-field> </v-col
              ><v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.users.cols.code_user.title')
                  "
                  prepend-inner-icon="mdi-numeric"
                  outlined
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
          username: null,
          code: null,
        };
      },
    },
  },
  created() {
    this.getTypesRole();
  },
  data: () => ({
    types: {
      role: [],
    },
    loadingBtn: false,
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    getTypesRole() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      if (this.$auth.user().role === "ENTERPRISE_ADMIN")
        this._.each(this.$store.getters.rolesEnt, (r) => {
          self.types.role.push({
            text: self.$vuetify.lang.t(r.text),
            value: r.value,
          });
        });
      if (this.$auth.user().role === "ADMINISTRATOR")
        this._.each(this.$store.getters.rolesADM, (r) => {
          self.types.role.push({
            text: self.$vuetify.lang.t(r.text),
            value: r.value,
          });
        });
      if (this.$auth.user().role === "SUPER_ADMINISTRATOR")
        this._.each(this.$store.getters.roles, (r) => {
          self.types.role.push({
            text: self.$vuetify.lang.t(r.text),
            value: r.value,
          });
        });
    },
    resetForm() {
      this.filter.username = null;
      this.filter.code = null;
    },
  },
};
</script>
