<template>
  <v-dialog v-model="dialog.show" persistent max-width="980px">
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
                <v-col cols="12" sm="5" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.employee"
                    :items="itemsEmployee"
                    :loading="isLoadingEmployee"
                    :search-input.sync="searchEmployee"
                    @blur="$v.form.employee.$touch()"
                    @input="$v.form.employee.$touch()"
                    :error-messages="employeeErrors"
                    :label="$vuetify.lang.t('$vuetify.employee.title')"
                    color="primary"
                    item-text="name"
                    return-object
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
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    readonly
                    v-model="get_basesalary"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.employee.cols.baseSalary.title')
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    outlined
                    dense
                    v-model="get_dateentry"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.employee.cols.dateEntryService.title'
                      )
                    "
                    class="font-weight-bold"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-menu
                    v-model="menuStart"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.monthDate"
                        color="primary"
                        class="font-weight-bold"
                        @blur="$v.form.monthDate.$touch()"
                        @input="$v.form.monthDate.$touch()"
                        :error-messages="monthDateErrors"
                        prepend-inner-icon="mdi-clock mdi-dark mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.payslips.cols.monthDate.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="form.monthDate"
                      type="month"
                      color="primary"
                      width="290"
                      @change="getItemsDetailsBonus"
                      class="mt-4"
                      @input="menuStart = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.startDate"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.payslips.cols.startDate.title')
                    "
                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.endDate"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.payslips.cols.endDate.title')
                    "
                    prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.cimirRate"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.payslips.cols.cimirRate.title')
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.sickenessInsuranceRate"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.payslips.cols.sickenessInsuranceRate.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.retirementInsurance"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.payslips.cols.retirementInsurance.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-card style="margin-top: 8px">
                    <v-card-text>
                      <v-btn
                        :loading="loading.refresh"
                        @click="refreshItemsBonus()"
                        class="mr-2 my-2"
                        depressed
                        color="#f1f5fc"
                      >
                        <v-icon left color="primary">mdi-refresh</v-icon>
                        {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
                      </v-btn>

                      <div class="d-flex justify-space-around">
                        <v-row wrap>
                          <v-col cols="12" sm="6" class="my-2">
                            <v-autocomplete
                              dense
                              v-model="form.bonus"
                              :items="itemsBonus"
                              :loading="isLoadingBonus"
                              :search-input.sync="searchBonus"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.performanceBonus.title'
                                )
                              "
                              color="primary"
                              item-text="name"
                              return-object
                              hide-no-data
                              item-value="id"
                              class="font-weight-bold"
                              outlined
                              clearable
                            >
                              <template slot="selection" slot-scope="data">
                                {{ data.item.name }} (
                                {{
                                  $vuetify.lang.t(
                                    "$vuetify.performanceBonus.cols.type." +
                                      data.item.type
                                  )
                                }})
                              </template>
                              <template v-slot:item="data">
                                {{ data.item.name }} (
                                {{
                                  $vuetify.lang.t(
                                    "$vuetify.performanceBonus.cols.type." +
                                      data.item.type
                                  )
                                }})
                              </template>
                              <template #label>
                                <span class="red--text"
                                  ><strong>* </strong></span
                                >{{
                                  $vuetify.lang.t(
                                    "$vuetify.performanceBonus.title"
                                  )
                                }}
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="2" class="my-2">
                            <v-text-field
                              v-model="form.rate_bonus"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.taxeContribution.cols.rate.title'
                                ) +
                                ' : ' +
                                this.get_rate_bonus
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col>
                          <!-- <v-col cols="12" sm="2" class="my-2">
                            <v-text-field
                              v-model="form.rate_employer_bonus"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.taxeContribution.cols.rate_employer.title'
                                ) +
                                  ' : ' +
                                  this.get_rate_employer_bonus
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col> -->
                          <v-col cols="12" sm="3" class="my-2">
                            <v-text-field
                              v-model="form.price"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.performanceBonus.cols.price.title'
                                ) +
                                ' : ' +
                                this.get_price
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="1" class="my-4">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon
                                  @click="createEmployeeBonus()"
                                  v-on="on"
                                >
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <span>{{
                                $vuetify.lang.t("$vuetify.btn.add")
                              }}</span>
                            </v-tooltip>
                          </v-col>

                          <!-- <v-btn
          :loading="loadingDiagnostic.refresh"
          @click="refreshItemsDiagnostic()"
          depressed
          color="#f1f5fc"
        >
          <v-icon left color="primary">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn> -->
                        </v-row>
                      </div>
                      <div
                        class="d-flex justify-space-around"
                        style="margin-top: -30px"
                      >
                        <v-row wrap>
                          <v-col cols="12" sm="4" class="my-2">
                            <v-autocomplete
                              dense
                              v-model="form.taxe"
                              :items="itemsTaxe"
                              :loading="isLoadingTaxe"
                              :search-input.sync="searchTaxe"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.taxeContribution.title'
                                )
                              "
                              color="primary"
                              item-text="name"
                              hide-no-data
                              return-object
                              item-value="id"
                              class="font-weight-bold"
                              outlined
                              clearable
                            >
                              <template slot="selection" slot-scope="data">
                                {{ data.item.name }}
                              </template>

                              <template #label>
                                <span class="red--text"
                                  ><strong>* </strong></span
                                >{{
                                  $vuetify.lang.t(
                                    "$vuetify.taxeContribution.title"
                                  )
                                }}
                              </template>
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="2" class="my-2">
                            <v-text-field
                              v-model="form.rate"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.taxeContribution.cols.rate.title'
                                ) +
                                ' : ' +
                                this.get_rate
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="2" class="my-2">
                            <v-text-field
                              v-model="form.rate_employer"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.taxeContribution.cols.rate_employer.title'
                                ) +
                                ' : ' +
                                this.get_rate_employer
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="3" class="my-2">
                            <v-text-field
                              v-model="form.price_taxe"
                              color="primary"
                              :label="
                                $vuetify.lang.t(
                                  '$vuetify.performanceBonus.cols.price.title'
                                ) +
                                ' : ' +
                                this.get_price_taxe
                              "
                              prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                              class="font-weight-bold"
                              outlined
                              dense
                            >
                            </v-text-field>
                          </v-col>

                          <v-col cols="12" sm="1" class="my-4">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon @click="createEmployeeTaxe()" v-on="on">
                                  mdi-plus-circle-outline
                                </v-icon>
                              </template>
                              <span>{{
                                $vuetify.lang.t("$vuetify.btn.add")
                              }}</span>
                            </v-tooltip>
                          </v-col>

                          <!-- <v-btn
          :loading="loadingDiagnostic.refresh"
          @click="refreshItemsDiagnostic()"
          depressed
          color="#f1f5fc"
        >
          <v-icon left color="primary">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn> -->
                        </v-row>
                      </div>
                      <v-data-table
                        :footer-props="{
                          'items-per-page-options': itemPerPageOptions,
                        }"
                        :headers="headers"
                        :items="itemsDetailsBonus"
                        :items-per-page="itemPerPage"
                        :loading="loadingDetailsBonus.list"
                        :options.sync="pagination"
                        :server-items-length="meta.totalElements"
                        :sort-by="sortBy"
                        :sort-desc="sortDesc"
                        item-key="name"
                      >
                        <template v-slot:header.name="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <template v-slot:header.type="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <template v-slot:header.price="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <template v-slot:header.rate="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <template v-slot:header.rate_employer="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <!-- <template v-slot:header.results="{ header }">
                            <tr>
                              {{
                                $vuetify.lang.t(header.text)
                              }}
                            </tr>
                          </template> -->
                        <template v-slot:header.null="{ header }">
                          <tr>
                            {{
                              $vuetify.lang.t(header.text)
                            }}
                          </tr>
                        </template>
                        <template v-slot:body="{ items }">
                          <v-hover>
                            <tbody slot-scope="{ hover }">
                              <tr :key="item.id" v-for="item in items">
                                <td class="subtitle-2">
                                  {{
                                    item.bonus
                                      ? item.bonus.name
                                      : item.taxe
                                      ? item.taxe.name
                                      : "-"
                                  }}
                                </td>
                                <td class="subtitle-2" v-if="item.bonus">
                                  {{
                                    $vuetify.lang.t(
                                      "$vuetify.performanceBonus.cols.type." +
                                        item.bonus.type
                                    )
                                  }}
                                </td>
                                <td class="subtitle-2" v-else>-</td>
                                <td class="subtitle-2">
                                  {{ item.price ? item.price : "-" }}
                                </td>
                                <td class="subtitle-2">
                                  {{ item.rate ? item.rate : "-" }}
                                </td>
                                <td class="subtitle-2">
                                  {{
                                    item.rate_employer
                                      ? item.rate_employer
                                      : "-"
                                  }}
                                </td>
                                <!-- <td class="subtitle-2">
                                  {{ item.results }}
                                </td> -->
                                <!-- <td class="subtitle-2">{{ item.normal_value }}</td>
              <td class="subtitle-2">{{ item.interpretation }}</td>
              <td class="subtitle-2">{{ item.conclusion }}</td> -->

                                <td class="subtitle-2" width="50px">
                                  <template>
                                    <v-tooltip bottom>
                                      <template v-slot:activator="{ on }">
                                        <v-btn
                                          @click="deleteItemBonus(item)"
                                          color="red"
                                          icon
                                          text
                                          v-on="on"
                                          dark
                                          v-show="
                                            $vuetify.breakpoint.smAndDown ||
                                            hover
                                          "
                                        >
                                          <v-icon mdi-18px
                                            >mdi-delete-outline</v-icon
                                          >
                                        </v-btn>
                                      </template>
                                      <span>{{
                                        $vuetify.lang.t("$vuetify.btn.remove")
                                      }}</span>
                                    </v-tooltip>
                                  </template>
                                </td>
                              </tr>
                            </tbody>
                          </v-hover>
                        </template>
                      </v-data-table>
                      <delete-item
                        :dialog="dialogDeleteBonus"
                        :messages="messagesDelete"
                        :urlItems="urlDeleteItems"
                        @getItemsDetails="getItemsDetailsBonus"
                      ></delete-item>
                      <form-pdf
                        :dialog="dialogFormPdf"
                        ref="pdfForm"
                      ></form-pdf>
                    </v-card-text>
                  </v-card>

                  <br />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="forceRefresh()">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn
              color="secondary"
              @click="print()"
              class="mr-2 my-2 white--test"
              :loading="loadingBtn"
              depressed
            >
              <v-icon left>mdi-printer</v-icon>
              {{ $vuetify.lang.t("$vuetify.payslips.new.simulate") }}
            </v-btn>
            <v-btn
              color="primary"
              :loading="loading"
              class="mr-2 my-2"
              dark
              type="submit"
            >
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
import DeleteItem from "./../Common/DeleteDetails";
import FormPdf from "./../bills/Pdf";
import { required } from "vuelidate/lib/validators";
import ListMixin from "./../../mixins/Common/List.vue";

// import {mapGetters} from "vuex";

export default {
  mixins: [FormMixin, ListMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          epmployee: null,
          monthDate: null,
          bonus: null,
          taxe: null,
          cimirRate: null,
          sickenessInsuranceRate: null,
          retirementInsurance: null,
          enddate: null,
          startdate: null,
        };
      },
    },
  },
  data: () => ({
    minDateStart: new Date().toISOString().substr(0, 10),
    menuStart: false,
    menuEnd: false,
    loading: false,
    loadingBtn: false,
    dialogDeleteBonus: {
      show: false,
    },
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    formData: {
      id: null,
      name: null,
    },
    urlEmployee: "employees",
    isLoadingEmployee: false,
    searchEmployee: null,
    urlDeleteItems: "",
    itemsEmployee: [],
    urlBonus: "performanceBonus",
    urlItemsBonus: "employeeBonus",
    isLoadingBonus: false,
    searchBonus: null,
    itemsBonus: [],
    itemsDetailsBonus: [],
    urlTaxe: "taxeContributions",
    urlItemsTaxe: "employeeBonus",
    isLoadingTaxe: false,
    searchTaxe: null,
    itemsTaxe: [],
    itemsDetailsTaxe: [],
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

    urlItems: "payslips",
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
    searchBonus(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingBonus = true;
      this.$store
        .dispatch("request", {
          url: self.urlBonus,
          params: params,
        })
        .then((response) => {
          self.itemsBonus = response.data.content;
        })
        .finally(() => (this.isLoadingBonus = false));
    },
    searchTaxe(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingTaxe = true;
      this.$store
        .dispatch("request", {
          url: self.urlTaxe,
          params: params,
        })
        .then((response) => {
          self.itemsTaxe = response.data.content;
        })
        .finally(() => (this.isLoadingTaxe = false));
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
        monthDate: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
      this.resetDataForm();
    },
    resetDataForm() {
      this.itemsDetailsBonus = [];
      this.itemsDetailsTaxe = [];
      this.form.id = null;
      if (this.form.id) return;
      let self = this;
      this.$v.form.$reset();
      this._.each(this.form, (field, k) => {
        if (typeof self.form[k] === "object") {
          self._.each(self.form[k], (subField, i) => {
            if (typeof self.form[k][i] === "boolean") {
              self.form[k][i] = false;
            } else {
              self.form[k][i] = null;
            }
          });
        } else {
          if (typeof self.form[k] === "boolean") {
            self.form[k] = false;
          } else {
            self.form[k] = null;
          }
        }
      });
    },
    print() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loadingBtn = true;
        this.$store
          .dispatch("request", {
            url: self.urlItems + "/print",
            method: "POST",
            data: self.getDataForm(),
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
          })
          .catch((error) => {
            let message;
            if (error.response.status === 400) {
              message = "$vuetify.error_occured";
              const fields = error.response.data;
              self.setFormErrors(fields);
              this.$forceUpdate();
            } else {
              message = "$vuetify.error_server";
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loadingBtn = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
    deleteItemBonus(item) {
      this.urlDeleteItems = this.urlItemsBonus + "/" + item.id;
      this.dialogDeleteBonus.show = true;
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        employee: this.form.employee["id"],
        monthDate: this.form.monthDate,
        cimirRate: this.form.cimirRate,
        bonus: this.form.bonus,
        sickenessInsuranceRate: this.form.sickenessInsuranceRate,
        retirementInsurance: this.form.retirementInsurance,
        requestDate: this.form.requestDate,
      };
      return data;
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    getDataFormDetailsBonus() {
      let data = {
        // employee: this.form.id ? this.form.employee : this.form.employee["id"],
        employee: this.form.employee["id"],
        price: this.form.price ? this.form.price : this.get_price,
        rate: this.form.rate_bonus ? this.form.rate_bonus : this.get_rate_bonus,
        rate_employer: this.form.rate_employer_bonus
          ? this.form.rate_employer_bonus
          : this.get_rate_employer_bonus,
        monthDate: this.form.monthDate,
        bonus: this.form.bonus?.["id"],
      };
      return data;
    },
    getDataFormDetailsTaxe() {
      let data = {
        // employee: this.form.id ? this.form.employee : this.form.employee["id"],
        employee: this.form.employee["id"],
        price: this.form.price_taxe
          ? this.form.price_taxe
          : this.get_price_taxe,
        rate: this.form.rate ? this.form.rate : this.get_rate,
        rate_employer: this.form.rate_employer
          ? this.form.rate_employer
          : this.get_rate_employer,
        monthDate: this.form.monthDate,
        taxe: this.form.taxe?.["id"],
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.employee = item.employee;
      this.itemsEmployee.push(item.employee);
      this.form.monthDate = item.monthDate;
      this.form.cimirRate = item.cimirRate;
      this.form.sickenessInsuranceRate = item.sickenessInsuranceRate;
      this.form.retirementInsurance = item.retirementInsurance;
      this.form.startDate = item.startDate;
      this.form.endDate = item.endDate;
      this.getItemsDetailsBonus();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.performanceBonus.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.performanceBonus.cols.type.title",
          value: "type",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.performanceBonus.cols.price.title",
          value: "price",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.taxeContribution.cols.rate.title",
          value: "rate",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.taxeContribution.cols.rate_employer.title",
          value: "rate_employer",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.shape.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "80",
        },
      ];
    },
  },
  computed: {
    get_price() {
      let price = 0;
      price = this.form.price === null ? 0 : this.form.bonus?.price;
      console.log(price);
      return price;
    },
    get_price_taxe() {
      let price = 0;
      price = this.form.price_taxe === null ? 0 : this.form.taxe?.price;
      return price;
    },
    get_rate() {
      let rate = 0;
      rate = this.form.rate === null ? 0 : this.form.taxe?.rate;
      return rate;
    },
    get_rate_bonus() {
      let rate = 0;
      rate = this.form.rate === null ? 0 : this.form.taxe?.rate;
      return rate;
    },
    get_rate_employer() {
      let rate_employer = 0;
      rate_employer =
        this.form.rate_employer === null ? 0 : this.form.taxe?.rate_employer;
      return rate_employer;
    },
    get_rate_employer_bonus() {
      let rate_employer = 0;
      rate_employer =
        this.form.rate_employer === null ? 0 : this.form.taxe?.rate_employer;
      return rate_employer;
    },
    get_basesalary() {
      let salary = "";
      salary =
        this.form.employee === null || this.form.employee === undefined
          ? ""
          : this.form.employee?.baseSalary;
      return salary;
    },
    get_dateentry() {
      let salary = "";
      salary =
        this.form.employee === null || this.form.employee === undefined
          ? ""
          : this.form.employee?.dateEntryService;
      return salary;
    },
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
    monthDateErrors() {
      let errors = [];
      if (!this.$v.form.monthDate.$dirty) return errors;

      !this.$v.form.monthDate.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.payslips.cols.monthDate.required")
        );
      return errors;
    },
    priceErrors() {
      let errors = [];
      if (!this.$v.form.price.$dirty) return errors;

      !this.$v.form.price.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.radiography.cols.price.required")
        );
      return errors;
    },
  },
  components: {
    FormPdf,
    DeleteItem,
  },
};
</script>
