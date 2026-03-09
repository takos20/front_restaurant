<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.name"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.hospitals.cols.name.title')"
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="nameErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.phone"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.phone.title')
                  "
                  @blur="$v.form.phone.$touch()"
                  @input="$v.form.phone.$touch()"
                  :error-messages="phoneErrors"
                  prepend-inner-icon="mdi-phone mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.address"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.address.title')
                  "
                  prepend-inner-icon="mdi-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  :error-messages="addressErrors"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.email"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.email.title')
                  "
                  @blur="$v.form.email.$touch()"
                  @input="$v.form.email.$touch()"
                  :error-messages="emailErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.consultation_time"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.consultation_time.title'
                    )
                  "
                  @blur="$v.form.consultation_time.$touch()"
                  @input="$v.form.consultation_time.$touch()"
                  :error-messages="consultation_timeErrors"
                  prepend-inner-icon="mdi-at mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.owner"
                  :items="itemsUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.owner.title')
                  "
                  @blur="$v.form.owner.$touch()"
                  @input="$v.form.owner.$touch()"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-autocomplete>
              </v-col> -->
              <v-col
                cols="12"
                sm="4"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-file-input
                  accept="image/png"
                  prepend-icon="mdi-camera"
                  class="my-custom-placeholder"
                  :label="$vuetify.lang.t('$vuetify.hospitals.cols.logo.title')"
                  :placeholder="form.logo"
                  @change="selectFile"
                  v-model="selectedLogo"
                >
                  <template v-slot:append>
                    <v-img
                      v-if="selectedLogo"
                      :src="selectedLogo"
                      max-width="50"
                      max-height="50"
                    ></v-img>
                  </template>
                </v-file-input>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                class="mb-0 py-0"
                style="margin-top: -25px"
              >
                <img
                  class="preview my-3"
                  height="50px"
                  width="100px"
                  :src="form.logo"
                  alt=""
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.slogan"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.slogan.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field> </v-col
              ><v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.taxpayer"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.taxpayer.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.zip_code"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.hospitals.cols.zip_code.title')
                  "
                  prepend-inner-icon="mdi-shield-account-outline mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.VAT_collected"
                  color="primary"
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.VAT_collected.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-text-field
                  v-model="form.deductible_VAT"
                  color="primary"
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.deductible_VAT.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  v-model="form.stock_min_peremption"
                  color="primary"
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.stock_min_peremption.title'
                    )
                  "
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12" sm="6" class="mb-0 py-0" style="margin-top: -10px">
                <v-text-field
                  v-model="form.days_before_expiry_date"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.days_before_expiry_date.title'
                    )
                  "
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->
              <!-- <span
                          class="text-right body-2 black--text text--darken-1 text-h6"
                      >
                        {{ $vuetify.lang.t("$vuetify.hospitals.loyalty_rules") }}
                      </span> -->

              <!-- <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.number_dishes"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.number_dishes.title'
                    )
                  "
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-select
                        outlined
                        dense
                        v-model="form.type_advantage"
                        color="primary"
                        :items="optionAdvantage.type_advantage"
                        :label="
                          $vuetify.lang.t('$vuetify.hospitals.cols.type_advantage.title')
                        "
                        class="font-weight-bold"
                      ></v-select>
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-text-field
                  v-model="form.reduction_percentage"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.hospitals.cols.reduction_percentage.title'
                    )
                  "
                  type="number"
                  :rules="[numberRuleAdvances]"
                  :min="0"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-text-field>
              </v-col> -->
              <!-- <span
                          class="text-right body-2 black--text text--darken-1 text-h6"
                      >
                        {{ $vuetify.lang.t("$vuetify.hospitals.work_hour") }}
                      </span> -->
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_day_work"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.start_day_work.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="form.start_day_work"
                    color="primary"
                    @input="menu = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-menu
                  v-model="menu2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_day_work"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.end_day_work.title'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      clearable
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    :min="form.start_day_work"
                    v-model="form.end_day_work"
                    color="primary"
                    @input="menu2 = false"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" style="margin-top: -10px">
                <v-card class="pa-4" outlined>
                  <!-- Header -->
                  <div class="d-flex align-center justify-space-between mb-4">
                    <div>
                      <div class="text-h6 font-weight-bold">
                        {{
                          $vuetify.lang.t("$vuetify.hospitals.loyalty_rules")
                        }}
                      </div>
                      <div class="grey--text text--darken-1 text-caption">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.hospitals.loyalty_rules_description"
                          )
                        }}
                      </div>
                    </div>

                    <v-btn color="primary" small @click="addColumnRule">
                      <v-icon left>mdi-plus</v-icon>
                      {{ $vuetify.lang.t("$vuetify.btn.add") }}
                    </v-btn>
                  </div>

                  <v-divider class="mb-4"></v-divider>

                  <!-- Headers -->
                  <!-- <v-row dense class="mb-2 px-2">
                    <v-col cols="4" class="font-weight-bold grey--text">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.hospitals.cols.type_advantage.title"
                        )
                      }}
                    </v-col>
                    <v-col cols="4" class="font-weight-bold grey--text">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.hospitals.cols.number_dishes.title"
                        )
                      }}
                    </v-col>
                    <v-col cols="3" class="font-weight-bold grey--text">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.hospitals.cols.reduction_percentage.title"
                        )
                      }}
                    </v-col>
                    <v-col cols="4" class="font-weight-bold grey--text">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.bills.cols.startDate.title"
                        )
                      }}
                    </v-col>
                    <v-col cols="3" class="font-weight-bold grey--text">
                      {{
                        $vuetify.lang.t(
                          "$vuetify.bills.cols.endDate.title"
                        )
                      }}
                    </v-col>
                    <v-col cols="1"></v-col>
                  </v-row> -->

                  <!-- Rules -->
                  <v-card
                    v-for="(rule, index) in rules_reduction"
                    :key="index"
                    class="mb-2 pa-2 rounded-lg"
                    outlined
                  >
                    <v-row dense align="center">
                      <v-col cols="5">
                        <v-text-field
                          v-model="rule.number_dishes"
                          dense
                          outlined
                          hide-details
                          type="number"
                          min="0"
                        />
                      </v-col>

                      <v-col cols="6">
                        <v-text-field
                          v-model="rule.reduction_percentage"
                          dense
                          outlined
                          hide-details
                          type="number"
                          min="0"
                        />
                      </v-col>
                      <v-col cols="1" class="text-right">
                        <v-btn
                          v-if="index > 0"
                          icon
                          color="error"
                          @click="removeColumnRule(index)"
                        >
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
// import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { phoneR, existNameHospital } from "../../helpers/Validator";
// import { rules } from "eslint-plugin-prettier";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          taxpayer: null,
          slogan: null,
          stock_min_peremption: null,
          zip_code: null,
          start_day_work: null,
          end_day_work: null,
          type_enterprise: null,
          VAT_collected: null,
          deductible_VAT: null,
          rules_reduction: null,
          address: null,
          logo: null,
          phone: null,
          email: null,
          owner: null,
          // depart: null
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    menu2: false,
    menu: false,
    menu3: false,
    menu4: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    rules_reduction: [],
    optionsRules: {
      text: {
        number_dishes: "",
        reduction_percentage: "",
      },
    },
    optionAdvantage: {
      type_advantage: [],
    },
    selectedLogo: null,
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    urlDepartments: "departments",
    search_: null,
    itemsDepartments: [],
    urlItems: "hospitals",
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
  }),
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
    // search_(value) {
    //   if (value === null) return;
    //   const params = { name: value };
    //   let self = this;
    //   this.isLoading = true;
    //   this.$store
    //     .dispatch("request", {
    //       url: self.urlDepartments,
    //       params: params
    //     })
    //     .then(response => {
    //       //console.log("respp", response.data.content);
    //       self.itemsDepartments = response.data.content;
    //     })
    //     .finally(() => (this.isLoading = false));
    // }
  },
  created() {
    this.getOptionsAdvantage();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameHospital,
          maxLength: maxLength(255),
        },
        email: {
          email,
          maxLength: maxLength(255),
        },
        phone: {
          required,
          phoneR,
        },
        address: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    addColumnRule() {
      // this.uuid=uid();

      // Random UUID
      //       console.log(uid());
      this.rules_reduction.push({
        ...this.optionsRules.text,
      });
    },

    removeColumnRule(index) {
      this.rules_reduction.splice(index, 1);
    },
    removeColumnGuests(index) {
      this.externalGuests.splice(index, 1);
    },
    getOptionsAdvantage() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_advantage, (type_advantage) => {
        self.optionAdvantage.type_advantage.push({
          text: self.$vuetify.lang.t(type_advantage.text),
          value: type_advantage.value,
        });
      });
    },
    selectFile(file) {
      this.currentFile = file;

      if (file && file instanceof File) {
        this.selectedLogo = URL.createObjectURL(file);
      } else {
        console.error("Invalid file selected", file);
      }
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        taxpayer: this.form.taxpayer,
        slogan: this.form.slogan,
        address: this.form.address,
        zip_code: this.form.zip_code,
        logo: this.form.logo,
        stock_min_peremption: this.form.stock_min_peremption,
        type_enterprise: this.form.type_enterprise,
        start_day_work: this.form.start_day_work,
        end_day_work: this.form.end_day_work,
        name: this.form.name,
        VAT_collected: this.form.VAT_collected,
        rules_reduction: this.rules_reduction,
        deductible_VAT: this.form.deductible_VAT,
        phone: this.form.phone,
        email: this.form.email,
        owner: this.form.owner,
        // depart: this.form.depart
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.name = item.name;
      this.form["oldName"] = item.name;
      this.form.address = item.address;
      this.form.taxpayer = item.taxpayer;
      this.form.start_day_work = item.start_day_work;
      this.form.end_day_work = item.end_day_work;
      this.form.VAT_collected = item.VAT_collected;
      this.form.days_before_expiry_date = item.days_before_expiry_date;
      this.form.type_enterprise = item.type_enterprise;
      this.form.slogan = item.slogan;
      this.form.deductible_VAT = item.deductible_VAT;
      this.form.phone = item.phone;
      this.form.logo = item.logo;
      this.form.email = item.email;
      this.rules_reduction = item.rules_reduction;
      this.stock_min_peremption = item.stock_min_peremption;
      // this.form.depart = item.depart["id"];
      // this.itemsDepartments.push(item.depart);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.required")
        );
      !this.$v.form.name.unique &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.name.unique")
        );

      return errors;
    },
    addressErrors() {
      let errors = [];
      if (!this.$v.form.address.$dirty) return errors;
      !this.$v.form.address.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.address.required")
        );

      return errors;
    },
    consultation_timeErrors() {
      let errors = [];
      if (!this.$v.form.consultation_time.$dirty) return errors;
      !this.$v.form.consultation_time.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.hospitals.cols.consultation_time.required"
          )
        );

      return errors;
    },
    emailErrors() {
      let errors = [];
      if (!this.$v.form.email.$dirty) return errors;

      !this.$v.form.email.email &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.email.invalid")
        );
      return errors;
    },
    phoneErrors() {
      let errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.phoneR &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.hospitals.cols.phone.invalid")
        );
      return errors;
    },
  },
  components: {
    // FormDepartment
  },
};
</script>
