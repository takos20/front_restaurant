<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.stock_movement.filter") }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-select
                  v-model="filter.type_movement"
                  color="primary"
                  :items="optionMovement.type_Movement"
                  :label="
                    $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                  "
                  dense
                  prepend-inner-icon="mdi-account-supervisor-circle"
                  outlined
                  class="font-weight-bold"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider style="margin-top: -25px"></v-divider>
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
          type_movement: null,
        };
      },
    },
  },
  created() {
    this.getOptionsMovement();
    //this.setItemRoles();
  },
  data: () => ({
    loadingBtn: false,
    optionMovement: {
      type_Movement: [],
    },
    urlItems: "stock_movements",
  }),
  methods: {
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement_stock, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.type_movement = null;
    },
  },
};
</script>
