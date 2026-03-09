<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveRadiography">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.employeeBonus.cols.code.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"></v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col> -->
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.employee"
                    :items="itemsEmployee"
                    :loading="isLoadingEmployee"
                    :search-input.sync="searchEmployee"
                    :label="$vuetify.lang.t('$vuetify.employee.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.lastName }} - {{ data.item.firstName }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.lastName }} - {{ data.item.firstName }}
                    </template>
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.employee.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.bonus"
                    :items="itemsbonus"
                    :loading="isLoadingbonus"
                    :search-input.sync="searchbonus"
                    :label="$vuetify.lang.t('$vuetify.performanceBonus.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.performanceBonus.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import { required } from "vuelidate/lib/validators";

// import {mapGetters} from "vuex";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          epmployee: null,
          bonus: null,
        };
      },
    },
  },
  data: () => ({
    minDateStart: new Date().toISOString().substr(0, 10),
    menuStart: false,
    menuEnd: false,
    formData: {
      id: null,
      name: null,
    },
    urlEmployee: "employees/all",
    isLoadingEmployee: false,
    searchEmployee: null,
    itemsEmployee: [],
    urlbonus: "performanceBonus/all",
    isLoadingbonus: false,
    searchbonus: null,
    itemsbonus: [],
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    numberRule: (val) => {
      if (val < 0) return "Veuillez entrer un nombre positif";
      return true;
    },
    urlItems: "employeeBonus",
    isLoading: false,
  }),
  watch: {
    searchEmployee(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingEmployee = true;
      this.$store
        .dispatch("request", {
          url: self.urlEmployee,
          params: params,
        })
        .then((response) => {
          self.itemsEmployee = response.data.content;
        })
        .finally(() => (this.isLoadingEmployee = false));
    },
    searchbonus(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingbonus = true;
      this.$store
        .dispatch("request", {
          url: self.urlbonus,
          params: params,
        })
        .then((response) => {
          self.itemsbonus = response.data.content;
        })
        .finally(() => (this.isLoadingbonus = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        employee: {
          required,
        },
        bonus: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        employee: this.form.employee,
        bonus: this.form.bonus,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.employee = item.employee["id"];
      this.itemsEmployee.push(item.employee);
      this.form.bonus = item.bonus["id"];
      this.itemsbonus.push(item.bonus);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    employeeErrors() {
      let errors = [];
      if (!this.$v.form.employee.$dirty) return errors;

      !this.$v.form.employee.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.employee.required")
        );
      return errors;
    },
    bonusErrors() {
      let errors = [];
      if (!this.$v.form.bonus.$dirty) return errors;

      !this.$v.form.bonus.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.bonus.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
