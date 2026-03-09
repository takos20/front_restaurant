<template>
  <v-card max-width="880px" class="mx-auto">
    <v-form @submit.prevent="saveParameter">
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card-text>
              <span
                class="text-h7 text-center body-2 black--text text--darken-1"
              >
                {{ $vuetify.lang.t("$vuetify.doctor.title_basic") }}
              </span>
              <br />
              <br />
              <v-container class="mt-1">
                <v-row wrap>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.name"
                      color="primary"
                      :label="
                        $vuetify.lang.t('$vuetify.hospitals.cols.name.title')
                      "
                      @blur="$v.form.name.$touch()"
                      @input="$v.form.name.$touch()"
                      :error-messages="nameErrors"
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="4"
                    class="mb-0 py-0"
                    style="margin-top: -15px"
                  >
                    <v-file-input
                      accept="image/png"
                      prepend-icon="mdi-camera"
                      class="my-custom-placeholder"
                      :label="
                        $vuetify.lang.t('$vuetify.hospitals.cols.logo.title')
                      "
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
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-textarea
                      v-model="form.slogan"
                      color="primary"
                      :label="
                        $vuetify.lang.t('$vuetify.hospitals.cols.slogan.title')
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                      rows="2"
                    ></v-textarea> </v-col
                  ><v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.taxpayer"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.taxpayer.title'
                        )
                      "
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
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.address"
                      color="primary"
                      :label="
                        $vuetify.lang.t('$vuetify.hospitals.cols.address.title')
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                      :error-messages="addressErrors"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.email"
                      color="primary"
                      :label="
                        $vuetify.lang.t('$vuetify.hospitals.cols.email.title')
                      "
                      @blur="$v.form.email.$touch()"
                      @input="$v.form.email.$touch()"
                      :error-messages="emailErrors"
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
                    <v-text-field
                      v-model="form.zip_code"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.zip_code.title'
                        )
                      "
                      class="font-weight-bold"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-col>

          <v-col cols="12" style="margin-top: -50px">
            <v-card-text>
              <span
                class="text-h7 text-center body-2 black--text text--darken-1"
              >
                {{ $vuetify.lang.t("$vuetify.hospitals.titleOther") }}
              </span>
              <br />
              <br />
              <!--                      <span class="text-h7 text-center body-2 black&#45;&#45;text text&#45;&#45;darken-1">-->
              <!--                        {{ $vuetify.lang.t("$vuetify.hospitals.contact") }}-->
              <!--                      </span>-->
              <v-container>
                <v-row wrap>
                  <v-col cols="12" sm="6" class="mb-0 py-0">
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
                  <v-col cols="12" sm="6" class="mb-0 py-0">
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
                  <v-col cols="12" sm="3" class="mb-0 py-0">
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
                  <v-col cols="12" sm="3" class="mb-0 py-0">
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
                  <v-col
                    cols="12"
                    sm="6"
                    class="mb-0 py-0"
                    style="margin-top: -10px"
                  >
                    <v-switch
                      v-model="use_delivery"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.hospitals.cols.use_delivery.title'
                        )
                      "
                      outlined
                      dense
                    ></v-switch>
                  </v-col>

                  <v-col
                    cols="12"
                    style="margin-top: -10px"
                    v-if="this.use_delivery === true"
                  >
                    <v-card class="pa-4" outlined>
                      <!-- Header -->
                      <div
                        class="d-flex align-center justify-space-between mb-4"
                      >
                        <div>
                          <div class="text-h6 font-weight-bold">
                            {{
                              $vuetify.lang.t(
                                "$vuetify.hospitals.loyalty_rules"
                              )
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
                          <!-- <v-col cols="3">
                        <v-select
                          v-model="rule.type_advantage"
                          :items="optionAdvantage.type_advantage"
                          dense
                          outlined
                          hide-details
                          :label="
                            $vuetify.lang.t(
                              '$vuetify.hospitals.cols.type_advantage.title'
                            )
                          "
                        />
                      </v-col> -->

                          <v-col cols="5">
                            <v-text-field
                              v-model="rule.number_dishes"
                              dense
                              outlined
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.hospitals.cols.number_dishes.title'
                                )
                              "
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
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.hospitals.cols.reduction_percentage.title'
                                )
                              "
                              hide-details
                              type="number"
                              min="0"
                            />
                          </v-col>

                          <!-- <v-col cols="2">
                        <v-menu
          v-model="menu4"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="rule.start_date"
              outlined
              dense
              clearable
              hide-details
              :disabled="rule.type_advantage === 'FIDELITY'"
              class="my-2 font-weight-medium"
              :label="$vuetify.lang.t('$vuetify.bills.cols.startDate.title')"
              v-bind="attrs"
              v-on="on"
            />
          </template>

          <v-date-picker
            v-model="rule.start_date"
            color="primary"
            @input="men4 = false"
          />
        </v-menu> -->
                          <!-- <v-text-field
                          v-model="rule.start_date"
                          dense
                          outlined
                          hide-details
                          
                        /> -->
                          <!-- </v-col> -->

                          <!-- <v-col cols="2">
                        <v-menu
          v-model="menu3"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="rule.end_date"
              outlined
              dense
              clearable
              hide-details
              :disabled="rule.type_advantage === 'FIDELITY'"
              class="my-2 font-weight-medium"
              :label="$vuetify.lang.t('$vuetify.bills.cols.endDate.title')"
              v-bind="attrs"
              v-on="on"
            />
          </template>

          <v-date-picker
            v-model="rule.end_date"
            color="primary"
            scrollable
            @input="menu3 = false"
          />
        </v-menu> -->
                          <!-- <v-text-field
                          v-model="rule.end_date"
                          dense
                          outlined
                          hide-details
                          
                        /> -->
                          <!-- </v-col> -->

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
          </v-col>

          <v-col cols="12" style="margin-top: -30px">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-slide-x-transition v-if="this.form.id == null">
                <v-btn color="primary" dark type="submit">
                  {{ $vuetify.lang.t("$vuetify.btn.save") }}
                </v-btn>
              </v-slide-x-transition>

              <v-slide-x-reverse-transition v-else>
                <v-btn color="primary" dark @click="saveUpdateParameter">
                  {{ $vuetify.lang.t("$vuetify.btn.update") }}
                </v-btn>
              </v-slide-x-reverse-transition>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<!--<template>-->
<!--  <div class="d-flex align-center flex-column">-->

<!--    <v-card-title>-->
<!--      <div class="title">-->
<!--        {{ $vuetify.lang.t(messages.title) }}-->
<!--      </div>-->
<!--    </v-card-title>-->
<!--    <v-form>-->
<!--      -->
<!--      <v-card color="#f1f5fc" width="900px">-->

<!--      </v-card>-->
<!--      <v-card class="mt-5" width="900px" color="#f1f5fc">-->

<!--      </v-card>-->
<!--      <v-card class="mt-5" width="900px" color="#f1f5fc">-->
<!--      </v-card>-->
<!--    </v-form>-->
<!--  </div>-->
<!--</template>-->

<script>
// import FormDepartment from "./FormDepartment";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength, email } from "vuelidate/lib/validators";
import { phoneR, existNameHospital } from "../../helpers/Validator";
import axios from "axios";

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
          address: null,
          deductible_VAT: null,
          VAT_collected: null,
          consultation_time: null,
          days_before_expiry_date: null,
          zip_code: null,
          stock_min_peremption: null,
          start_day_work: null,
          end_day_work: null,
          logo: null,
          phone: null,
          email: null,
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
    urlDistrict: "districts",
    isLoadingDistrict: false,
    searchDistrict: null,
    itemsDistrict: [],
    selectedLogo: null,
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    menu: false,
    menu2: false,
    menu3: false,
    menu4: false,
    items: [],
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
    urlItems: "hospitals",
    urlUsers: "users",
    isLoading: false,
    use_delivery: true,
    search: null,
    itemsUsers: [],
  }),
  mounted() {
    this.getItems();
    this.getOptionsAdvantage();
  },
  watch: {
    searchDistrict(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDistrict = true;
      this.$store
        .dispatch("request", {
          url: self.urlDistrict,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDistrict = response.data.content;
        })
        .finally(() => (this.isLoadingDistrict = false));
    },
  },
  created() {},
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
    saveUpdateParameter() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        let formData = new FormData();
        formData.append("logo", this.currentFile);
        formData.append("taxpayer", this.form.taxpayer);
        formData.append("slogan", this.form.slogan);
        formData.append("address", this.form.address);
        formData.append("VAT_collected", this.form.VAT_collected);
        formData.append("deductible_VAT", this.form.deductible_VAT);
        formData.append("zip_code", this.form.zip_code);
        formData.append("start_day_work", this.form.start_day_work);
        formData.append("end_day_work", this.form.end_day_work);
        formData.append("name", this.form.name);
        formData.append("phone", this.form.phone);
        formData.append("use_delivery", this.use_delivery);
        formData.append("email", this.form.email);
        formData.append(
          "rules_reduction",
          JSON.stringify(this.rules_reduction)
        );
        formData.append("stock_min_peremption", this.form.stock_min_peremption);
        axios
          .put(this.urlItems + "/" + this.form.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            this.getItems();
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t("$vuetify.hospitals.updateInfo"),
            });
          })
          .catch((error) => {
            let message = "$vuetify.error_server";

            if (error.response) {
              if (error.response.status === 400) {
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              }
            }

            self.$store.dispatch("showNotification", {
              statut: true,
              text: message,
              color: "#B71C1C",
            });
          })
          .finally(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },

    getItems() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
          })
          .then((response) => {
            let data = response.data;
            if (data.content) {
              self.items = data.content;
              this.form.id = this.items[0]?.id;
              this.form.name = this.items[0]?.name;
              this.form["oldName"] = this.items[0]?.name;
              this.form.address = this.items[0]?.address;
              this.form.taxpayer = this.items[0]?.taxpayer;
              this.form.slogan = this.items[0]?.slogan;
              this.form.phone = this.items[0]?.phone;
              this.form.use_delivery = this.items[0]?.use_delivery;
              this.form.deductible_VAT = this.items[0]?.deductible_VAT;
              this.form.VAT_collected = this.items[0]?.VAT_collected;
              this.form.logo = this.items[0]?.logo;
              // this.form.logo = this.items[0].logo;
              this.form.email = this.items[0]?.email;
              this.form.zip_code = this.items[0]?.zip_code;
              this.form.stock_min_peremption =
                this.items[0]?.stock_min_peremption;

              this.rules_reduction = this.items[0]?.rules_reduction;
              this.form.start_day_work = this.items[0]?.start_day_work;
              this.form.end_day_work = this.items[0]?.end_day_work;
            }
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content[0]);
            resolve(response);
          })
          .catch((err) => {
            let message = this.$vuetify.lang.t("$vuetify.error_occured");
            if (err.response) {
              if (err.response.status === 400) {
                const fields = err.response.data;
                self.setFormErrors(fields);

                const firstField = Object.keys(fields)[0];

                if (firstField && Array.isArray(fields[firstField])) {
                  message = fields[firstField][0];
                }
              } else if (err.response.status === 403) {
                message = self.$vuetify.lang.t("$vuetify.error_denied");
              } else if (err.response.status === 500) {
                message = self.$vuetify.lang.t("$vuetify.error_server");
              }
            }
            self.$store.dispatch("showNotification", {
              status: true,
              text: message,
            });
            reject(err);
          })
          .then(() => {
            self.loading.list = false;
            resolve();
          });
      });
    },
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        name: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        consultation_time: this.form.consultation_time,
        stock_min_peremption: this.form.stock_min_peremption,
        days_before_expiry_date: this.form.days_before_expiry_date,
        start_day_work: this.form.start_day_work,
        end_day_work: this.form.end_day_work,
        VAT_collected: this.form.VAT_collected,
        deductible_VAT: this.form.deductible_VAT,
        taxpayer: this.form.taxpayer,
        use_delivery: this.form.use_delivery,
        slogan: this.form.slogan,
        address: this.form.address,
        logo: this.form.logo,
        zip_code: this.form.zip_code,
        name: this.form.name,
        phone: this.form.phone,
        email: this.form.email,
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
      this.form.slogan = item.slogan;
      this.form.phone = item.phone;
      this.form.logo = item.logo;
      this.form.use_delivery = item.use_delivery;
      this.form.email = item.email;
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
<style scoped>
.v-btn {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.v-btn:hover {
  transform: scale(1.05);
  background-color: #1976d2cc; /* Slightly lighter or transparent */
}

.v-file-input:hover {
  border-color: #42a5f5; /* Highlight color */
}

.v-file-input input:focus {
  border-color: #42a5f5; /* Focus border */
}

.v-file-input .v-input__control {
  border-radius: 12px;
}

.my-custom-placeholder input::placeholder {
  color: #888; /* Slight gray */
  opacity: 0.8; /* Slightly faded */
}
</style>
