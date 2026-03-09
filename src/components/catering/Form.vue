<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form>
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.bills"
                  :items="itemsBills"
                  :loading="isLoadingBills"
                  :search-input.sync="searchBills"
                  @blur="$v.form.bills.$touch()"
                  @input="$v.form.bills.$touch()"
                  :error-messages="billsErrors"
                  color="primary"
                  item-text="code"
                  item-value="id"
                  return-object
                  :label="$vuetify.lang.t('$vuetify.bills.title')"
                  prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  autofocus
                  clearable
                >
                  <template slot="selection" slot-scope="data">
                    {{ data.item.code }} - {{ data.item.patient.name }}
                  </template>
                  <template v-slot:item="data">
                    {{ data.item.code }} - {{ data.item.patient.name }}
                  </template>
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.bills.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.company_name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.catering.cols.company_name.title')
                  "
                  class="font-weight-bold"
                  @blur="$v.form.company_name.$touch()"
                  @input="$v.form.company_name.$touch()"
                  :error-messages="company_nameErrors"
                  ><template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.catering.cols.company_name.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template></v-text-field
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu"
                  color="#4E342E"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.event_date"
                      color="#4E342E"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.catering.cols.event_date.title'
                        )
                      "
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      @blur="$v.form.event_date.$touch()"
                      @input="$v.form.event_date.$touch()"
                      :error-messages="event_dateErrors"
                      class="font-weight-bold"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      ><template #label>
                        {{
                          $vuetify.lang.t(
                            "$vuetify.catering.cols.event_date.title"
                          )
                        }}<span class="red--text"><strong>* </strong></span>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.event_date"
                    color="#4E342E"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.event_location"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.catering.cols.event_location.title'
                    )
                  "
                  class="font-weight-bold"
                  @blur="$v.form.event_location.$touch()"
                  @input="$v.form.event_location.$touch()"
                  :error-messages="event_locationErrors"
                  ><template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.catering.cols.event_location.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template></v-text-field
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.balance_due"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.catering.cols.balance_due.title')
                  "
                  class="font-weight-bold"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.contact_person"
                  @blur="$v.form.contact_person.$touch()"
                  @input="$v.form.contact_person.$touch()"
                  :error-messages="contact_personErrors"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.catering.cols.contact_person.title'
                    )
                  "
                  class="font-weight-bold"
                >
                  <template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.catering.cols.contact_person.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.advance_payment"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.catering.cols.advance_payment.title'
                    )
                  "
                  class="font-weight-bold"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions style="margin-bottom: -5px">
          <v-spacer></v-spacer>
          <v-btn @click="closeModals">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>

          <v-btn color="primary" :loading="loading" @click="save">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          company_name: null,
          bills: null,
          event_location: null,
          contact_person: null,
          advance_payment: null,
          event_date: null,
          balance_due: null,
        };
      },
    },
  },
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    e1: 1,
    isLoading: false,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    menu: false,
    paid: true,
    urlItems: "caterings",
    isLoadingBills: false,
    searchBills: null,
    itemsBills: [],
    urlBills: "bills",
  }),
  watch: {
    searchBills(value) {
      if (value === null) return;
      this.isLoadingBills = true;
      const params = { code: value, bill_type: "CATERING" };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlBills,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsBills = response.data.content;
        })
        .finally(() => (this.isLoadingBills = false));
    },
  },
  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        bills: {
          required,
        },
        company_name: {
          required,
          maxLength: maxLength(255),
        },
        event_date: {
          required,
          maxLength: maxLength(255),
        },
        event_location: {
          required,
          maxLength: maxLength(255),
        },
        advance_payment: {
          required,
        },
        contact_person: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    closeModals() {
      this.dialog.show = false;
      this.e1 = 1;
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        event_date: this.form.event_date,
        bills: this.form.bills["id"],
        balance_due: this.form.balance_due,
        advance_payment: this.form.advance_payment,
        contact_person: this.form.contact_person,
        event_location: this.form.event_location,
        company_name: this.form.company_name,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.contact_person = item.contact_person;
      this.form.advance_payment = item.advance_payment;
      this.form.company_name = item.company_name;
      this.form.balance_due = item.balance_due;
      this.form.event_date = item.event_date;
      this.form.event_location = item.event_location;
      this.form.id = item.id;
      this.form.bills = item.bills["id"];
      this.itemsBills.push(item.bills);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    company_nameErrors() {
      let errors = [];
      if (!this.$v.form.company_name.$dirty) return errors;

      !this.$v.form.company_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.catering.cols.company_name.required")
        );

      return errors;
    },
    event_locationErrors() {
      let errors = [];
      if (!this.$v.form.event_location.$dirty) return errors;

      !this.$v.form.event_location.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.catering.cols.event_location.required")
        );

      return errors;
    },
    billsErrors() {
      let errors = [];
      if (!this.$v.form.bills.$dirty) return errors;
      !this.$v.form.bills.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.catering.cols.bills.required")
        );
      return errors;
    },
    contact_personErrors() {
      let errors = [];
      if (!this.$v.form.contact_person.$dirty) return errors;

      !this.$v.form.contact_person.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.catering.cols.contact_person.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
