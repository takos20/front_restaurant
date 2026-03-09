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
                  v-model="form.address"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.delivery.cols.address.title')
                  "
                  class="font-weight-bold"
                  @blur="$v.form.address.$touch()"
                  @input="$v.form.address.$touch()"
                  :error-messages="addressErrors"
                >
                  <template #label>
                    {{ $vuetify.lang.t("$vuetify.delivery.cols.address.title")
                    }}<span class="red--text"><strong>* </strong></span>
                  </template></v-text-field
                >
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.delivery_service"
                  color="primary"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.delivery.cols.delivery_service.title'
                    )
                  "
                  class="font-weight-bold"
                >
                  <!-- <template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.delivery.cols.delivery_service.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template> -->
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.delivery_man"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.delivery.cols.delivery_man.title')
                  "
                  @blur="$v.form.delivery_man.$touch()"
                  @input="$v.form.delivery_man.$touch()"
                  :error-messages="delivery_manErrors"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.delivery.cols.delivery_man.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.delivery_fee"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.delivery.cols.delivery_fee.title')
                  "
                  @blur="$v.form.delivery_fee.$touch()"
                  @input="$v.form.delivery_fee.$touch()"
                  :error-messages="delivery_feeErrors"
                  class="font-weight-bold"
                >
                  <template #label>
                    {{
                      $vuetify.lang.t(
                        "$vuetify.delivery.cols.delivery_fee.title"
                      )
                    }}<span class="red--text"><strong>* </strong></span>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  outlined
                  dense
                  v-model="form.expected_duration"
                  color="primary"
                  type="number"
                  min="0"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.delivery.cols.expected_time.title'
                    )
                  "
                  class="font-weight-bold"
                >
                </v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="mb-0 py-0"
                style="margin-top: -10px"
              >
                <v-switch
                  v-model="delivered"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.delivery.cols.delivered.title')
                  "
                  outlined
                  dense
                ></v-switch>
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
          address: null,
          bills: null,
          delivery_fee: null,
          delivery_service: null,
          delivery_man: null,
          expected_duration: null,
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
    delivered: true,
    urlItems: "deliveries",
    isLoadingBills: false,
    searchBills: null,
    itemsBills: [],
    urlBills: "bills/all",
  }),
  watch: {
    searchBills(value) {
      if (value === null) return;
      this.isLoadingBills = true;
      const params = { code: value, bill_type: "DELIVERY" };
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
        address: {
          required,
          maxLength: maxLength(255),
        },
        delivery_fee: {
          required,
        },
        delivery_man: {
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
        delivered: this.delivered,
        expected_duration: this.form.expected_duration,
        bills: this.form.bills["id"],
        delivery_man: this.form.delivery_man,
        delivery_service: this.form.delivery_service,
        delivery_fee: this.form.delivery_fee,
        address: this.form.address,
      };

      return data;
    },
    setForm(item) {
      this.delivered = item.delivered;
      // Données envoyées lors de la modification
      this.form.address = item.address;
      this.form.delivery_fee = item.delivery_fee;
      this.form.delivery_service = item.delivery_service;
      this.form.delivery_man = item.delivery_man;
      this.form.expected_duration = item.expected_duration;
      this.form.id = item.id;
      this.form.bills = item.bills
        ? item.bills["id"]
          ? item.bills["id"]
          : item.bills
        : item.bills;
      this.itemsBills.push(item.bills);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    addressErrors() {
      let errors = [];
      if (!this.$v.form.address.$dirty) return errors;

      !this.$v.form.address.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.delivery.cols.address.required")
        );

      return errors;
    },
    delivery_feeErrors() {
      let errors = [];
      if (!this.$v.form.delivery_fee.$dirty) return errors;

      !this.$v.form.delivery_fee.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.delivery.cols.delivery_fee.required")
        );

      return errors;
    },

    delivery_serviceErrors() {
      let errors = [];
      if (!this.$v.form.delivery_service.$dirty) return errors;
      !this.$v.form.delivery_service.required &&
        errors.push(
          this.$vuetify.lang.t(
            "$vuetify.delivery.cols.delivery_service.required"
          )
        );
      return errors;
    },
    billsErrors() {
      let errors = [];
      if (!this.$v.form.bills.$dirty) return errors;
      !this.$v.form.bills.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.delivery.cols.bills.required")
        );
      return errors;
    },
    delivery_manErrors() {
      let errors = [];
      if (!this.$v.form.delivery_man.$dirty) return errors;

      !this.$v.form.delivery_man.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.delivery.cols.delivery_man.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
