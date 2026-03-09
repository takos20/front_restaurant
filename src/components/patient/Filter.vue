<template>
  <v-dialog max-width="450" v-model="dialog.shows.showFilter">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.patient.filter") }}
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-form @submit.prevent="performFilter()">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col class="mb-0 py-0" cols="6" sm="6">
                <v-text-field
                  :label="$vuetify.lang.t('$vuetify.patient.cols.code.title')"
                  v-model="filter.code"
                  outlined
                  dense
                  prepend-inner-icon="mdi-code-array"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-select
                  v-model="filter.shape"
                  outlined
                  color="primary"
                  dense
                  prepend-inner-icon="mdi-account-group-outline"
                  :items="optionPatient_shape.type_Patient_shape"
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.patient_shape.title')
                  "
                  :placeholder="
                    $vuetify.lang.t('$vuetify.patient.cols.patient_shape.title')
                  "
                ></v-select>
              </v-col>
              <v-col class="mb-0 py-0" cols="12" sm="8">
                <v-text-field
                  :label="
                    $vuetify.lang.t('$vuetify.patient.cols.first_name.title')
                  "
                  v-model="filter.name"
                  prepend-inner-icon="mdi-rename-box"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-select
                  outlined
                  dense
                  v-model="filter.gender"
                  color="primary"
                  :items="optionGender.type_Gender"
                  :label="$vuetify.lang.t('$vuetify.patient.cols.gender.title')"
                  :placeholder="
                    $vuetify.lang.t('$vuetify.patient.cols.gender.title')
                  "
                  class="font-weight-bold"
                ></v-select>
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
          gender: null,
          shape: null,
          name: null,
          code: null,
        };
      },
    },
  },
  created() {
    this.getOptionsPatient_shape();
    this.getOptionsGender();
  },
  data: () => ({
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    optionGender: {
      type_Gender: [],
    },
    loadingBtn: false,
  }),
  methods: {
    getOptionsGender() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Gender, (type_Gender) => {
        self.optionGender.type_Gender.push({
          text: self.$vuetify.lang.t(type_Gender.text),
          value: type_Gender.value,
        });
      });
    },
    getOptionsPatient_shape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(
        this.$store.getters.type_Patient_shape,
        (type_Patient_shape) => {
          self.optionPatient_shape.type_Patient_shape.push({
            text: self.$vuetify.lang.t(type_Patient_shape.text),
            value: type_Patient_shape.value,
          });
        }
      );
    },
    // Fonction pour récuperer les types de roles dans la store
    resetForm() {
      this.filter.name = null;
      this.filter.shape = null;
      this.filter.gender = null;
      this.filter.code = null;
    },
  },
};
</script>
