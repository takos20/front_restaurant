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
                  v-model="form.event_name"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.event.cols.event_name.title')
                  "
                  class="font-weight-bold"
                  @blur="$v.form.event_name.$touch()"
                  @input="$v.form.event_name.$touch()"
                  :error-messages="event_nameErrors"
                  ><template #label>
                    {{ $vuetify.lang.t("$vuetify.event.cols.event_name.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template></v-text-field
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-switch
                  v-model="paid"
                  color="primary"
                  style="margin-top: -0px"
                  :label="$vuetify.lang.t('$vuetify.event.cols.paid.title')"
                  outlined
                  dense
                ></v-switch>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.organizer"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.event.cols.organizer.title')
                  "
                  @blur="$v.form.organizer.$touch()"
                  @input="$v.form.organizer.$touch()"
                  :error-messages="organizerErrors"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.event.cols.organizer.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.location"
                  color="primary"
                  :label="$vuetify.lang.t('$vuetify.event.cols.location.title')"
                  @blur="$v.form.location.$touch()"
                  @input="$v.form.location.$touch()"
                  :error-messages="locationErrors"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.event.cols.location.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.contract_amount"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.event.cols.contract_amount.title')
                  "
                  class="font-weight-bold"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.estimated_guests"
                  @blur="$v.form.estimated_guests.$touch()"
                  @input="$v.form.estimated_guests.$touch()"
                  :error-messages="estimated_guestsErrors"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.event.cols.estimated_guests.title'
                    )
                  "
                  class="font-weight-bold"
                >
                  <template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.event.cols.estimated_guests.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.event_start"
                      color="primary"
                      outlined
                      dense
                      readonly
                      v-bind="attrs"
                      class="font-weight-bold"
                      v-on="on"
                    >
                      <template #label>
                        {{
                          $vuetify.lang.t(
                            "$vuetify.event.cols.event_start.title"
                          )
                        }}
                        <span class="red--text"><strong>*</strong></span>
                      </template>
                    </v-text-field>
                  </template>

                  <v-card>
                    <v-date-picker
                      v-if="!menuTime"
                      v-model="date"
                      color="primary"
                      @input="menuTime = true"
                    />

                    <v-time-picker
                      v-else
                      v-model="time"
                      color="primary"
                      format="24hr"
                      @click:minute="saveDateTime"
                    />
                  </v-card>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.event_end"
                      color="primary"
                      outlined
                      class="font-weight-bold"
                      dense
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    >
                      <template #label>
                        {{
                          $vuetify.lang.t("$vuetify.event.cols.event_end.title")
                        }}
                        <span class="red--text"><strong>*</strong></span>
                      </template>
                    </v-text-field>
                  </template>

                  <v-card>
                    <v-date-picker
                      v-if="!menuTime2"
                      v-model="date2"
                      color="primary"
                      @input="menuTime2 = true"
                    />

                    <v-time-picker
                      v-else
                      v-model="time2"
                      color="primary"
                      format="24hr"
                      @click:minute="saveDateTime2"
                    />
                  </v-card>
                </v-menu>
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
          bills: null,
          event_name: null,
          organizer: null,
          event_start: null,
          event_end: null,
          location: null,
          contract_amount: null,
          estimated_guests: null,
          paid: null,
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
    menuTime: false,
    date: null,
    time: null,
    menu2: false,
    menuTime2: false,
    date2: null,
    time2: null,
    paid: true,
    urlItems: "events",
    isLoadingBills: false,
    searchBills: null,
    itemsBills: [],
    urlBills: "bills",
  }),
  watch: {
    searchBills(value) {
      if (value === null) return;
      this.isLoadingBills = true;
      const params = { code: value, bill_type: "EVENT" };
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
        event_name: {
          required,
          maxLength: maxLength(255),
        },
        location: {
          required,
        },
        bills: {
          required,
        },
        organizer: {
          required,
        },
        event_start: {
          required,
        },
        event_end: {
          required,
        },
        estimated_guests: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    saveDateTime() {
      this.form.event_start = `${this.date} ${this.time}`;
      this.menu = false;
      this.menuTime = false;
    },
    saveDateTime2() {
      this.form.event_end = `${this.date2} ${this.time2}`;
      this.menu2 = false;
      this.menuTime2 = false;
    },
    closeModals() {
      this.dialog.show = false;
      this.e1 = 1;
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        paid: this.paid,
        estimated_guests: this.form.estimated_guests,
        bills: this.form.bills["id"],
        contract_amount: this.form.contract_amount,
        location: this.form.location,
        event_end: this.form.event_end,
        event_start: this.form.event_start,
        organizer: this.form.organizer,
        event_name: this.form.event_name,
      };
      return data;
    },
    setForm(item) {
      this.paid = item.paid;
      // Données envoyées lors de la modification
      this.form.event_start = item.event_start;
      this.form.event_end = item.event_end;
      this.form.event_name = item.event_name;
      this.form.organizer = item.organizer;
      this.form.location = item.location;
      this.form.contract_amount = item.contract_amount;
      this.form.estimated_guests = item.estimated_guests;
      this.form.id = item.id;
      this.form.bills = item.bills["id"];
      this.itemsBills.push(item.bills);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    event_nameErrors() {
      let errors = [];
      if (!this.$v.form.event_name.$dirty) return errors;

      !this.$v.form.event_name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.event_name.required")
        );

      return errors;
    },
    organizerErrors() {
      let errors = [];
      if (!this.$v.form.organizer.$dirty) return errors;

      !this.$v.form.organizer.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.organizer.required")
        );

      return errors;
    },
    billsErrors() {
      let errors = [];
      if (!this.$v.form.bills.$dirty) return errors;
      !this.$v.form.bills.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.event.cols.bills.required"));
      return errors;
    },
    locationErrors() {
      let errors = [];
      if (!this.$v.form.location.$dirty) return errors;
      !this.$v.form.location.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.location.required")
        );
      return errors;
    },

    event_startErrors() {
      let errors = [];
      if (!this.$v.form.event_start.$dirty) return errors;

      !this.$v.form.event_start.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.event_start.required")
        );
      return errors;
    },
    event_endErrors() {
      let errors = [];
      if (!this.$v.form.event_end.$dirty) return errors;

      !this.$v.form.event_end.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.event_end.required")
        );
      return errors;
    },
    estimated_guestsErrors() {
      let errors = [];
      if (!this.$v.form.estimated_guests.$dirty) return errors;

      !this.$v.form.estimated_guests.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.event.cols.estimated_guests.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
