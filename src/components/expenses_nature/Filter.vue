<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.expenses_nature.filter") }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="12" sm="6">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.users.cols.code_user.title')
                  "
                  prepend-inner-icon="mdi-numeric"
                  outlined
                  dense
                  v-model="filter.code"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-select
                  v-model="filter.type"
                  color="primary"
                  :items="optionMovement.type_Movement"
                  :label="
                    $vuetify.lang.t('$vuetify.expenses_nature.cols.type.title')
                  "
                  dense
                  prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark mdi-18px"
                  outlined
                  class="font-weight-bold"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-text-field
                  v-model="filter.account_number"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.expenses_nature.cols.account_number.title'
                    )
                  "
                  prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                  class="font-weight-bold"
                  type="nature"
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
          account_number: null,
          type: null,
        };
      },
    },
  },
  created() {
    this.getOptionsMovement();
  },
  data: () => ({
    optionMovement: {
      type_Movement: [],
    },
    loadingBtn: false,
  }),
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    resetForm() {
      this.filter.code = null;
      this.filter.account_number = null;
      this.filter.type = null;
    },
  },
};
</script>
