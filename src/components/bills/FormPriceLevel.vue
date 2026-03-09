<template>
  <div style="margin-top: 25px">
    <div
      class="title mb-5 black--text blue lighten-5 text-right"
      style="height: 30px; margin-top: 30px"
    >
      {{ $vuetify.lang.t("$vuetify.bills.new.title") }}
    </div>
    <!--    <div-->
    <!--      class="title mb-5 black&#45;&#45;text red lighten-5 text-right"-->
    <!--      style="height: 30px; margin-top: 30px"-->
    <!--      v-if="this.isActive === 'false'"-->
    <!--    >-->
    <!--      {{ $vuetify.lang.t("$vuetify.cash_movement.title_warning_cash") }}-->
    <!--    </div>-->
    <v-card class="pb-4" v-if="this.isActive === 'true'">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-row wrap>
          <v-col
            cols="12"
            sm="6"
            v-if="
              _.includes(this.$auth.user().permissions, 'add_cash_movement')
            "
          >
            <template>
              <v-btn
                class="mr-2 my-2"
                color="primary"
                @click="createD()"
                dark
                dense
              >
                <v-icon dark> mdi-plus </v-icon>
                {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}
              </v-btn>
            </template>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            v-if="
              _.includes(this.$auth.user().permissions, 'add_patientsettlement')
            "
          >
            <template>
              <v-btn
                class="mr-2 my-2"
                color="primary"
                @click="createP()"
                dark
                dense
              >
                <v-icon dark> mdi-plus </v-icon>
                {{ $vuetify.lang.t("$vuetify.patients_settlements.title") }}
              </v-btn>
            </template>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_N.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0"></v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0">
              <v-menu
                v-model="menu3"
                color="primary"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.bills_date"
                    color="primary"
                    :label="
                      $vuetify.lang.t('$vuetify.bills.cols.date_bill.title')
                    "
                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    dense
                    light
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.bills_date"
                  :max="maxDate"
                  color="primary"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-select
                v-model="form.bill_type"
                color="primary"
                :items="optionBills.type_bills"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_type.title')"
                :placeholder="
                  $vuetify.lang.t('$vuetify.bills.cols.bill_type.title')
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="$auth.user().username"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.patient"
                :items="itemsPatient"
                :loading="isLoadingPatient"
                :search-input.sync="searchPatient"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_name.title')
                "
                prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                autofocus
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col
              cols="12"
              sm="4"
              class="mb-0 py-0"
              v-if="this.form.id === null"
            >
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.code_patient.title')
                "
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                v-model="get_patient_code"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" v-else>
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.code_patient.title')
                "
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                v-model="this.form.patient_name"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="_.includes(this.$auth.user().permissions, 'add_patient')"
            >
              <v-btn
                class="mr-8"
                dark
                dense
                @click="createPatient()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              v-if="this.form.id === null"
            >
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')
                "
                prepend-inner-icon="mdi-shape-circle-plus mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                v-model="get_patient_shape"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" v-else>
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')
                "
                prepend-inner-icon="mdi-shape-circle-plus mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                v-model="form.patient_type"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <!--            <v-col cols="12" sm="3" class="mb-0 py-0">-->
            <!--              <v-select-->
            <!--                v-model="form.patient_type"-->
            <!--                color="primary"-->
            <!--                :items="optionPatient_shape.type_Patient_shape"-->
            <!--                :label="-->
            <!--                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')-->
            <!--                "-->
            <!--                :placeholder="-->
            <!--                  $vuetify.lang.t('$vuetify.bills.cols.patient_type.title')-->
            <!--                "-->
            <!--                prepend-inner-icon="mdi-gender-male-female"-->
            <!--                class="font-weight-bold mdi-18px"-->
            <!--                outlined-->
            <!--                dense-->
            <!--              ></v-select>-->
            <!--            </v-col>-->

            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                color="primary"
                v-model="get_patient_solde"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.patient_balance.title')
                "
                prepend-inner-icon="mdi-credit-card mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                readonly
                suffix="FCFA"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-autocomplete
                v-model="form.doctor"
                :items="itemsDoctor"
                :loading="isLoadingDoctor"
                :search-input.sync="searchDoctor"
                color="primary"
                item-text="name"
                item-value="id"
                return-object
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.dealing_with.title')
                "
                prepend-inner-icon="mdi-account mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                clearable
                :readonly="supply"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" sm="4" class="mb-0 py-0">
              <v-text-field
                v-model="form.additional_info"
                color="primary"
                :label="
                  $vuetify.lang.t(
                    '$vuetify.supplies.cols.additional_info.title'
                  )
                "
                prepend-inner-icon="mdi-script-text mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                :readonly="supply"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              v-if="this.form.bill_type === 'pharmacy'"
            >
              <v-select
                v-model="form.bill_shape"
                color="primary"
                :items="optionShape.type_shape"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_shape.title')"
                :placeholder="
                  $vuetify.lang.t('$vuetify.bills.cols.bill_shape.title')
                "
                prepend-inner-icon="mdi-gender-male-female mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>
            <!--            <v-col-->
            <!--              cols="12"-->
            <!--              sm="1"-->
            <!--              class="mb-0 py-0"-->
            <!--              v-if="this.form.id === null"-->
            <!--            >-->
            <!--              <v-btn-->
            <!--                color="primary"-->
            <!--                :loading="loadingBtn"-->
            <!--                dark-->
            <!--                type="submit"-->
            <!--                dense-->
            <!--                max-width="2px"-->
            <!--                style="margin-top: 2px"-->
            <!--                depressed-->
            <!--                :disabled="-->
            <!--                  this.form.patient === null ||-->
            <!--                    this.form.doctor === null ||-->
            <!--                    this.form.patient_type === null ||-->
            <!--                    this.form.additional_info === null ||-->
            <!--                    supply-->
            <!--                "-->
            <!--              >-->
            <!--                <v-icon dark>-->
            <!--                  mdi-content-save-->
            <!--                </v-icon>-->
            <!--                &lt;!&ndash;{{ $vuetify.lang.t(messages.submit) }}&ndash;&gt;-->
            <!--              </v-btn>-->
            <!--            </v-col>-->
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="primary" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4" style="margin-top: -15px"></v-divider>
      </v-form>

      <v-form
        @submit.prevent="saveDetails"
        :disabled="
          (form.bills_date === null ||
            form.patient === null ||
            form.doctor === null ||
            form.additional_info === null ||
            form.bill_shape === null) &&
          (form.bills_date === null ||
            form.patient === null ||
            form.doctor === null ||
            form.additional_info === null)
        "
      >
        <v-card-text>
          <div class="d-flex wrap align-center">
            <v-autocomplete
              v-model="formData.details_stock"
              :items="itemsProduct"
              :loading="isLoading"
              :search-input.sync="search"
              color="primary"
              item-text="product_name"
              item-value="id"
              return-object
              :label="
                $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
              "
              class="font-weight-bold"
              outlined
              dense
              clearable
              style="max-width: 250px"
              v-if="this.form.bill_type === 'pharmacy'"
            ></v-autocomplete>
            <v-autocomplete
              v-model="formData.medical_act"
              :items="itemsMedical_act"
              :loading="isLoadingMedical_act"
              :search-input.sync="searchMedical_act"
              color="primary"
              item-text="name"
              item-value="id"
              return-object
              style="max-width: 300px"
              :label="$vuetify.lang.t('$vuetify.bills.cols.medical_act.title')"
              class="font-weight-bold ml-1"
              outlined
              dense
              clearable
              v-if="this.form.bill_type === 'medical_act'"
            ></v-autocomplete>
            <v-text-field
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.supplies.cols.product_code.title')
              "
              class="font-weight-bold ml-1"
              outlined
              dense
              style="max-width: 180px"
              :value="get_product_code"
              readonly
              filled
              v-if="this.form.bill_type === 'pharmacy'"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.bills.cols.medical_act.titleCode')
              "
              class="font-weight-bold ml-1"
              outlined
              dense
              v-if="this.form.bill_type === 'medical_act'"
              style="max-width: 220px"
              :value="get_act_code"
              readonly
              filled
            ></v-text-field>
            <v-text-field
              v-model="formData.quantity_ordered"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.bills.cols.quantity_ordered.title')
              "
              class="font-weight-bold ml-1"
              style="max-width: 100px"
              outlined
              dense
              type="number"
              min="0"
              :rules="[numberRuleQteOrdered]"
              v-if="this.form.bill_shape === 'ORDINANCE'"
            ></v-text-field>
            <v-text-field
              v-model="formData.quantity_served"
              color="primary"
              :label="
                $vuetify.lang.t('$vuetify.bills.cols.quantity_served.title')
              "
              class="font-weight-bold ml-1"
              outlined
              dense
              type="number"
              :rules="[numberRuleQteServed]"
              min="0"
              style="max-width: 80px"
            ></v-text-field>

            <v-text-field
              color="primary"
              class="font-weight-bold ml-1"
              outlined
              dense
              filled
              readonly
              style="max-width: 90px"
              v-if="this.form.bill_shape === 'ORDINANCE'"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.pub.title')"
              class="font-weight-bold ml-1"
              outlined
              dense
              :value="get_product_public_price"
              readonly
              v-if="form.bill_type === 'pharmacy'"
              filled
              style="max-width: 100px"
            ></v-text-field
            ><v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.pub.title')"
              class="font-weight-bold ml-1"
              outlined
              dense
              :value="get_product_public_price_act"
              readonly
              v-if="form.bill_type === 'medical_act'"
              filled
              style="max-width: 130px"
            ></v-text-field>
            <!--            <v-text-field-->
            <!--              color="primary"-->
            <!--              :label="$vuetify.lang.t('$vuetify.bills.cols.price.title')"-->
            <!--              class="font-weight-bold ml-1"-->
            <!--              outlined-->
            <!--              dense-->
            <!--              :value="get_act_price"-->
            <!--              readonly-->
            <!--              filled-->
            <!--              style="max-width: 210px"-->
            <!--              v-if="this.form.bill_type === 'MEDICAL_ACT'"-->
            <!--            ></v-text-field>-->
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.delivery.title')"
              class="font-weight-bold ml-1"
              outlined
              type="number"
              min="0"
              :rules="[numberRuleDelivery]"
              dense
              v-model="formData.delivery"
              style="max-width: 80px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.pun.title')"
              class="font-weight-bold ml-1"
              outlined
              dense
              readonly
              filled
              v-if="form.bill_type === 'pharmacy'"
              :value="get_pu_net"
              style="max-width: 155px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.amount_gross.title')"
              class="font-weight-bold ml-1"
              outlined
              :value="get_amount_gross"
              dense
              readonly
              filled
              v-if="form.bill_type === 'pharmacy'"
              style="max-width: 200px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.amount_net.title')"
              class="font-weight-bold ml-1"
              outlined
              :value="get_amount_net"
              dense
              readonly
              filled
              v-if="form.bill_type === 'pharmacy'"
              style="max-width: 200px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.pun.title')"
              class="font-weight-bold ml-1"
              outlined
              dense
              readonly
              v-if="form.bill_type === 'medical_act'"
              filled
              :value="get_pu_net_act"
              style="max-width: 155px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.amount_gross.title')"
              class="font-weight-bold ml-1"
              outlined
              :value="get_amount_gross_act"
              dense
              readonly
              v-if="form.bill_type === 'medical_act'"
              filled
              style="max-width: 200px"
            ></v-text-field>
            <v-text-field
              color="primary"
              :label="$vuetify.lang.t('$vuetify.bills.cols.amount_net.title')"
              class="font-weight-bold ml-1"
              outlined
              :value="get_amount_net_act"
              v-if="form.bill_type === 'medical_act'"
              dense
              readonly
              filled
              style="max-width: 200px"
            ></v-text-field>
            <v-tooltip top v-if="form.bill_type === 'pharmacy'">
              <template v-slot:activator="{ on }">
                <template>
                  <v-btn
                    icon
                    color="primary"
                    :loading="loadingBtn"
                    type="submit"
                    v-on="on"
                    style="margin-top: -25px"
                    class="font-weight-bold ml-5"
                    :disabled="
                      formData.details_stock === null ||
                      formData.quantity_served === null
                    "
                  >
                    <v-icon dark size="30"> mdi-content-save </v-icon>
                  </v-btn>
                </template>
              </template>
              <span
                class="text-center font-weight-bold body-2 withe--text text--d ken-1"
              >
                {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
              </span>
            </v-tooltip>
            <v-tooltip top v-else>
              <template v-slot:activator="{ on }">
                <template>
                  <v-btn
                    icon
                    color="primary"
                    :loading="loadingBtn"
                    type="submit"
                    v-on="on"
                    style="margin-top: -25px"
                    class="font-weight-bold ml-5"
                    :disabled="
                      formData.quantity_served === null ||
                      formData.medical_act === null
                    "
                  >
                    <v-icon dark size="30"> mdi-content-save </v-icon>
                  </v-btn>
                </template>
              </template>
              <span
                class="text-center font-weight-bold body-2 withe--text text--d ken-1"
              >
                {{ $vuetify.lang.t("$vuetify.bills.new.add_act") }}
              </span>
            </v-tooltip>
          </div>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
      </v-form>
      <v-form
        style="margin-top: 15px"
        :disabled="
          form.bills_date === null ||
          form.patient === null ||
          form.doctor === null ||
          form.additional_info === null ||
          form.bill_type === null ||
          this.get_bills_amount === 0
        "
      >
        <v-card-text style="background-color: #eeeeee">
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: 15px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.net_payable.title')
                "
                class="font-weight-bold"
                outlined
                dense
                :value="get_bills_amount"
                readonly
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: 15px">
              <v-text-field
                v-model="form.advances"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.advance.title')"
                class="font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRuleAdvances]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: 15px">
              <v-text-field
                v-model="get_balance"
                :value="get_balance"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.balance.title')"
                class="font-weight-bold"
                outlined
                dense
                readonly
                min="0"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: 15px">
              <v-select
                v-model="form.payment_method"
                color="primary"
                :items="optionPayment.type_Payment"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                "
                prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                :readonly="form.advances === 0"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="primary"
            @click="resetFormBills()"
            :loading="loadingBtn"
          >
            {{ $vuetify.lang.t("$vuetify.btn.reset") }}
          </v-btn>
          <v-btn
            dark
            color="primary"
            @click="save()"
            :loading="loadingBtn"
            :disabled="
              this.get_bills_amount === 0 || this.form.payment_method === null
            "
          >
            {{ $vuetify.lang.t("$vuetify.bills.new.save_bills") }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="loadingBtn"
            dark
            @click="save_print_bills()"
            :disabled="
              this.get_bills_amount === 0 || this.form.payment_method === null
            "
          >
            {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
          </v-btn>
          <!--          <v-btn-->
          <!--            color="primary"-->
          <!--            :loading="loadingBtn"-->
          <!--            dark-->
          <!--            @click="print_bills()"-->
          <!--            :disabled="this.get_bills_amount === 0"-->
          <!--          >-->
          <!--            {{ $vuetify.lang.t("$vuetify.bills.new.print_bills") }}-->
          <!--          </v-btn>-->
        </v-card-actions>
        <v-divider class="mx-4"></v-divider>
      </v-form>
      <v-card-text v-if="this.form.bill_type === 'pharmacy'">
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headers"
          :items="items"
          :items-per-page="itemPerPage"
          :loading="loadingDetails.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.product_name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_served="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.pub="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.pun="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.delivery="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount_gross="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount_net="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
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
                  <td class="subtitle-2" v-if="item.details_stock">
                    {{ item.details_stock.product.name }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.details_stock">
                    {{ item.details_stock.product.code }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>

                  <td class="subtitle-2">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pub }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.delivery }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pun }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_gross }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_net }}
                  </td>
                  <td class="subtitle-2" width="50px">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editDetails(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-update</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            dark
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-delete-outline</v-icon>
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
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItemsDetails="getItemsDetails"
        ></delete-item>
      </v-card-text>
      <v-card-text v-if="this.form.bill_type === 'medical_act'">
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headers_act"
          :items="items_act"
          :items-per-page="itemPerPage"
          :loading="loadingDetails.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity_served="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.pub="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.pun="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.delivery="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount_gross="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount_net="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
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
                  <td class="subtitle-2" v-if="item.medical_act">
                    {{ item.medical_act.name }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.medical_act">
                    {{ item.medical_act.code }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>

                  <td class="subtitle-2">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pub }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.delivery }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pun }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_gross }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_net }}
                  </td>
                  <td
                    class="subtitle-2"
                    v-if="_.includes($auth.user().permissions, 'change_bills')"
                    width="50px"
                  >
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editDetails(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-update</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes($auth.user().permissions, 'delete_bills')
                          "
                        >
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            dark
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon mdi-18px>mdi-delete-outline</v-icon>
                          </v-btn>
                        </template>
                        <span>{{
                          $vuetify.lang.t("$vuetify.btn.remove")
                        }}</span>
                      </v-tooltip>
                    </template>
                  </td>
                  <td class="subtitle-2" v-else></td>
                </tr>
              </tbody>
            </v-hover>
          </template>
        </v-data-table>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItemsDetails="getItemsDetails"
        ></delete-item>
      </v-card-text>
    </v-card>
    <form-cmv :dialog="dialogFormCMV" :messages="messages"></form-cmv>
    <form-warning
      :dialog="dialogFormWarning"
      @resetFormPro="resetFormPro"
      ref="warningForm"
    ></form-warning>
    <form-cash
      :dialog="dialogFormCash"
      ref="cashForm"
      :messages="messages"
      @getItems="getOpenCash"
    ></form-cash>
    <form-patient :dialog="dialogForm" :messages="messages"></form-patient>
    <form-settlement
      :dialog="dialogFormSet"
      :messages="messages"
    ></form-settlement>
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    <!--    <pdf :src="pdfsrc"></pdf>-->
  </div>
</template>

<script>
import FormCmv from "./../cash_movement/Form";
import FormWarning from "./warningQte_stock";
import FormSettlement from "./../patients_settlements/Form";
import FormPatient from "./../patient/Form";
import FormCash from "./../cash/Form";
// import axios from "axios";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
import FormPdf from "./../bills/Pdf";
// const FileSaver = require("file-saver");
// import pdf from 'vue-pdf'
export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          patient: null,
          doctor: null,
          medical_act: null,
          patient_name: null,
          patient_balance: null,
          net_payable: null,
          patient_type: null,
          bills_date: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          pub: null,
          pun: null,
          amount_gross: null,
          payment_method: "CASH",
          quantity_ordered: null,
          amount_net: null,
          total_amount: null,
          quantity_served: null,
          details_stock: null,
          delivery: null,
          balance: null,
          bills: null,
          reference_no: null,
          additional_info: "R.A.S",
          bills_amount: null,
          code: null,
          cashier: null,
          bill_type: "pharmacy",
          advances: 0,
          bill_shape: "CLASSIC",
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      patient: null,
      doctor: null,
      medical_act: null,
      patient_name: null,
      patient_balance: null,
      sales_packaging: null,
      net_payable: null,
      patient_type: null,
      bills_date: null,
      pub: null,
      pun: null,
      amount_gross: null,
      payment_method: null,
      quantity_ordered: null,
      amount_net: null,
      total_amount: null,
      quantity_served: null,
      details_stock: null,
      delivery: null,
      balance: null,
      bills: null,
      reference_no: null,
      additional_info: null,
      patient_solde: null,
      bills_amount: null,
      code: null,
      cashier: null,
      bill_type: null,
      is_accounted: null,
      advances: null,
      bill_shape: null,
    },
    maxDate: new Date().toISOString().substr(0, 10),
    optionPayment: {
      type_Payment: [],
    },
    pdfsrc: null,
    headers: [],
    headers_act: [],
    items: [],
    items_act: [],
    meta: {},
    patient_solde: null,
    sum: "",
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 10,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    urlDeleteItems: "",
    sortDesc: true,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,

    isLoadingDoctor: false,
    isLoadingMedical_act: false,
    isLoading: false,
    searchSales_packaging: null,
    itemsSales_packaging: [],
    urlSales_packaging: "sales_packaging",
    isLoadingSales_packaging: false,
    search: null,

    searchMedical_act: null,
    numberRuleDelivery: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteOrdered: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleQteServed: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleAdvances: (val) => {
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    searchDoctor: null,
    isActive: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    dialogFormCMV: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormCash: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormWarning: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormPdf: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormSet: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },

    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    optionBills: {
      type_bills: [],
    },
    optionShape: {
      type_shape: [],
    },
    optionPatient_shape: {
      type_Patient_shape: [],
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
    },
    loadingBtn: false,
    // formR: {
    //   id: null,
    //   name: null
    // },
    loadingDetails: {
      list: false,
      refresh: false,
      filter: false,
    },
    itemsDoctor: [],

    itemsMedical_act: [],
    itemsProduct: [],
    product_public_price: "",
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    urlPatient: "patients",
    urlItemsPatientSolde: "patients/solde",
    urlDoctor: "doctors",
    urlItemsCash: "cashs/isOpen",
    urlProduct: "details_stocks",
    urlMedical_act: "medical_act",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsDetails();
      },
      deep: true,
    },
    searchMedical_act(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlMedical_act,
          params: params,
        })
        .then((response) => {
          self.itemsMedical_act = response.data.content;
          // console.log(this.form.product);
        })
        .finally(() => (this.isLoading = false));
    },
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "?storage_depots=" +
            this.$auth.user().storage_depots.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
          this.reset_product_detail_act();
        })
        .finally(() => (this.isLoading = false));
    },
    searchPatient(value) {
      if (value === null) return;
      this.isLoadingPatient = true;
      const params = { name: value };
      let self = this;
      this.$store
        .dispatch("request", {
          url: self.urlPatient,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsPatient = response.data.content;
        })
        .finally(() => (this.isLoadingPatient = false));
    },
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDoctor = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctor,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoadingDoctor = false));
    },
  },
  created() {
    this.setHeaders();
    this.setHeadersAct();
    this.getOptionsBill();
    this.getOptionsShape();
    this.getOptionsPatient_shape();
    this.getOptionsPayment();

    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    reset_product_detail() {
      this.formData.details_stock = null;
      this.formData.sales_packaging = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
    },
    reset_product_detail_act() {
      this.formData.medical_act = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
    },
    resetFormPro() {
      this.formData.details_stock = null;
      this.formData.quantity_served = null;
    },
    get_qte_stock() {
      if (
        this.formData.details_stock?.qte_stock === 0 ||
        this.formData.quantity_served > this.formData.details_stock?.qte_stock
      ) {
        this.dialogFormWarning.show = true;
      } else {
        this.dialogFormWarning.show = false;
      }
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    getOptionsPayment() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.payment, (type_Payment) => {
        self.optionPayment.type_Payment.push({
          text: self.$vuetify.lang.t(type_Payment.text),
          value: type_Payment.value,
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
    getOptionsBill() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_bills, (type_bills) => {
        self.optionBills.type_bills.push({
          text: self.$vuetify.lang.t(type_bills.text),
          value: type_bills.value,
        });
      });
    },
    getOptionsShape() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_shape, (type_shape) => {
        self.optionShape.type_shape.push({
          text: self.$vuetify.lang.t(type_shape.text),
          value: type_shape.value,
        });
      });
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    deleteItem(item) {
      this.urlDeleteItems = this.urlItemsDetails_bills + "/" + item.id;
      this.dialogDelete.show = true;
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.bills.cols.product_name.title",
          value: "product_name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "80",
        },
      ];
    },
    setHeadersAct() {
      this.headers_act = [
        {
          text: "$vuetify.medical_act.cols.name.title",
          value: "name",
          align: "start",
          sortable: false,
          width: "120",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: false,
          width: "20",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.bills.cols.quantity_served.title",
          value: "quantity_served",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pub.title",
          value: "pub",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.delivery.title",
          value: "delivery",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.pun.title",
          value: "pun",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_gross.title",
          value: "amount_gross",
          align: "start",
          sortable: false,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.amount_net.title",
          value: "amount_net",
          align: "start",
          sortable: false,
          width: "60",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: false,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: false,
          width: "80",
        },
      ];
    },
    createPatient() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.patient.new.title",
        submit: "$vuetify.patient.new.submit",
        success: "$vuetify.patient.new.success",
      };
    },
    createCash() {
      this.dialogFormCash.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    createD() {
      this.dialogFormCMV.show = true;
      this.messages = {
        title: "$vuetify.cash_movement.new.title",
        submit: "$vuetify.cash_movement.new.submit",
        success: "$vuetify.cash_movement.new.success",
      };
    },
    createP() {
      this.dialogFormSet.show = true;
      this.messages = {
        title: "$vuetify.patients_settlements.new.title",
        submit: "$vuetify.patients_settlements.new.submit",
        success: "$vuetify.patients_settlements.new.success",
      };
      this.form = {
        id: null,
        patient: null,
        doctor: null,
        patient_name: null,
        patient_balance: null,
        net_payable: null,
        patient_type: null,
        pub: null,
        pun: null,
        amount_gross: null,
        quantity_ordered: null,
        amount_net: null,
        total_amount: null,
        quantity_served: null,
        product: null,
        delivery: null,
        patients_settlements: null,
        reference_no: null,
        additional_info: null,
        patients_settlements_amount: null,
        code: null,
        cashier: null,
        bill_type: null,
        advances: null,
        bill_shape: null,
      };
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        doctor:
          this.form.id === null ? this.form.doctor["id"] : this.form.doctor,
        patient:
          this.form.id === null ? this.form.patient["id"] : this.form.patient,
        cashier: this.$auth.user().id,
        patient_type: this.form.patient_type,
        createdAt: this.form.bills_date,
        bill_type: this.form.bill_type,
        bill_shape: this.form.bill_shape,
        additional_info: this.form.additional_info,
        payment_method:
          this.form.advances === 0 ? "NO_PAY" : this.form.payment_method,
        net_payable: this.get_bills_amount,
        advances: this.form.advances === null ? 0 : this.form.advances,
        balance: this.get_balance,
      };
      return data;
    },
    resetDataForm() {
      this.form.id = null;
      this.formData.details_stock = null;
      this.form.patient = null;
      this.patient_solde == null;
      this.form.medical_act = null;
      this.form.doctor = null;
      this.items = [];
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
      this.form.bills_date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.resetItemsDetails();
      this.form.bill_type = "pharmacy";
      this.form.bill_shape = "CLASSIC";
      this.form.additional_info = "R.A.S";
      this.form.payment_method = "NO_PAY";
      this.patient_solde == null;
    },
    resetFormBills() {
      this.form.id = null;
      this.formData.details_stock = null;
      this.formData.quantity_served = null;
      this.formData.delivery = null;
      this.form.patient = null;
      this.patient_solde == null;
      this.form.medical_act = null;
      this.form.doctor = null;
      this.items = [];
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
      this.form.bill_type = "pharmacy";
      this.form.bill_shape = "CLASSIC";
      this.form.additional_info = "R.A.S";
      this.form.payment_method = "CASH";
      this.form.bills_date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
    },
    resetItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills + "?bills=reset",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },

    getDataFormdetails() {
      let data = {
        quantity_served: this.formData.quantity_served,
        bill_type: this.form.bill_type,
        details_stock:
          this.formData.details_stock === undefined ||
          this.formData.details_stock === null
            ? ""
            : this.formData.details_stock["id"],
        quantity_ordered:
          this.formData.quantity_ordered === null
            ? 0
            : this.formData.quantity_ordered,
        pub:
          this.form.bill_type === "pharmacy"
            ? this.get_product_public_price
            : this.get_product_public_price_act,
        pun:
          this.form.bill_type === "pharmacy"
            ? this.get_pu_net
            : this.get_pu_net_act,
        delivery:
          this.formData.delivery === null || this.formData.delivery === ""
            ? 0
            : this.formData.delivery,
        amount_gross:
          this.form.bill_type === "pharmacy"
            ? this.get_amount_gross
            : this.get_amount_gross_act,
        amount_net:
          this.form.bill_type === "pharmacy"
            ? this.get_amount_net
            : this.get_amount_net_act,
        createdAt: this.form.bills_date,
        product: this.form.patient["id"],
        medical_act:
          this.formData.medical_act === undefined ||
          this.formData.medical_act === null
            ? ""
            : this.formData.medical_act["id"],
        // pub:this.get_product_public_price,0
        // pub_act:this.get_product_public_price_act,
        // pun:this.get_pu_net,
        // pun_act:this.get_pu_net_act,
        // delivery:
        //     this.formData.delivery === null || this.formData.delivery === ""
        //         ? 0
        //         : this.formData.delivery,
        // amount_gross:this.get_amount_gross,
        // amount_gross_act:this.get_amount_gross_act,
        // amount_net:this.get_amount_net,
        // amount_net_act:this.get_amount_net_act,
      };

      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.bills = item.id;
      this.form.code = item.code;
      this.form.patient = item.patient["id"];
      this.itemsPatient.push(item.patient);
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
      this.form.patient_name = item.patient["name"];
      this.form.patient_type = item.patient["shape"];
      this.form.is_accounted = item.is_accounted;
      this.form.details_stock = item.details_stock;
      this.form.advances = item.advances;
      this.form.bills_date = item.createdAt;
      this.form.payment_method = item.payment_method;
      this.form.bill_type = item.bill_type;
      this.form.bill_shape = item.bill_shape;
      this.form.additional_info = item.additional_info;
      this.getItemsDetails();
      // console.log("cul", this.form.supplies);
    },
    getRouteDetails() {
      if (this.form.id) {
        return this.urlItemsDetails_bills + "/" + this.form.id;
      } else {
        return this.urlItemsDetails_bills;
      }
    },
    getRoute() {
      if (this.form.id) {
        return this.urlItems + "/" + this.form.id;
      } else {
        return this.urlItems;
      }
    },
    refreshItemsDetail() {
      let self = this;
      this.loadingDetails.refresh = true;
      this.getItemsDetails()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingDetails.refresh = false;
        });
    },
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsCash,
          })
          .then((response) => {
            let data = response.data;
            self.isActive = data.content.is_active;
            if (self.isActive === "false") {
              this.createCash();
            } else {
              self.isActive = data.content.is_active;
            }

            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    save() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute(),
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
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
    save_print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(self.messages.success),
            });
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
    print_bills() {
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRoute() + "?just_print=1",
            method: self.getMethod(),
            data: self.getDataForm(),
            responseType: "blob",
          })
          .then((response) => {
            // let fileName = "Facture" + new Date().toISOString().substr(0, 10);
            let blob = new Blob([response.data], { type: response.data.type });
            const objectUrl = URL.createObjectURL(blob);
            this.editPdf(objectUrl);
            if (this.getMethod() === "PUT") {
              self.$emit("getItems");
            } else {
              self.$emit("getItems");
              self.resetDataForm();
            }
            // this.pdfsrc = URL.createObjectURL(blob);
            // FileSaver.saveAs(blob, fileName);
            // self.$emit("getItems");
            // self.resetDataForm();
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
    getItemsDetails() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsDetails_bills + "?bills=" + this.form.bills,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            if (data.content[0]?.details_stock === null) {
              self.items_act = data.content;
            } else {
              self.items = data.content;
            }

            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data);
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
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    getSoldePatient() {
      let self = this;

      // console.log(page);
      // console.log(itemsPerPage);
      return new Promise((resolve) => {
        this.loadingDetails.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlItemsPatientSolde +
              "?patient_id=" +
              this.form.patient?.["id"],
          })
          .then((response) => {
            let data = response.data;
            self.patient_solde = data.content.solde_patient;
            // console.log("meta", data);
            resolve(response);
          })
          .then(() => {
            self.loadingDetails.list = false;
            resolve();
          });
      });
    },
    editDetails(item) {
      console.log(item.details_stock);
      // this.itemsProduct = [];
      // this.itemsProduct.push(item.details_stock);
      this.formData.details_stock = item.details_stock;
      this.formData.quantity_served = item.quantity_served;
      this.formData.quantity_ordered = item.quantity_ordered;
      this.formData.delivery = item.delivery;
    },
    resetDataFormProduct() {
      this.formData.quantity_served = 0;
      this.formData.details_stock = null;
      this.formData.medical_act = null;
      this.formData.delivery = 0;
    },
    saveDetails() {
      // console.log(this.getDataFormdetails());
      this.$store.dispatch("showNotification", {
        statut: false,
      });
      let self = this;
      self.$v.$touch();
      if (!self.$v.$invalid) {
        this.loading = true;
        this.$store
          .dispatch("request", {
            url: self.getRouteDetails(),
            method: self.getMethod(),
            data: self.getDataFormdetails(),
          })
          .then(() => {
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(
                "$vuetify.supplies.new.successDetails"
              ),
            });
            //console.log("Quantity", this.form.quantity);
            this.getItemsDetails();
            self.resetDataFormProduct();
          })
          .catch((error) => {
            let message;
            if (error.response) {
              if (error.response.status === 400) {
                message = "$vuetify.error_occured";
                const fields = error.response.data;
                self.setFormErrors(fields);
                this.$forceUpdate();
              } else {
                message = "$vuetify.error_server";
              }
            }
            self.$store.dispatch("showNotification", {
              statut: true,
              text: self.$vuetify.lang.t(message),
              color: "#B71C1C",
            });
          })
          .then(() => {
            self.loading = false;
          });
      }
      /*else {
               console.log(self.$v);
             }*/
    },
  },
  computed: {
    get_patient_code() {
      let patient_code = "";
      patient_code = this.form.patient === null ? "" : this.form.patient?.code;
      return patient_code;
    },
    get_patient_shape() {
      let patient_shape = "";

      patient_shape =
        this.form.patient === null ? "" : this.form.patient?.shape;
      return patient_shape;
    },
    get_product_code() {
      let product_code = "";
      product_code =
        this.formData.details_stock === null ||
        this.formData.details_stock === undefined
          ? ""
          : this.formData.details_stock?.product.code;
      let product_stock = "";
      product_stock =
        this.formData.details_stock === null ||
        this.formData.details_stock === undefined
          ? ""
          : this.formData.details_stock?.qte_stock;
      let code_stock = "";
      code_stock = product_code + "  /  " + product_stock;
      // eslint-disable-next-line vue/no-async-in-computed-properties
      return code_stock;
    },
    get_patient_solde() {
      this.getSoldePatient();
      if (this.patient_solde == null) {
        return 0;
      } else {
        return this.patient_solde;
      }
    },
    get_act_code() {
      let act_code = "";
      act_code =
        this.formData.medical_act === null
          ? ""
          : this.formData.medical_act?.code;
      return act_code;
    },
    get_product_public_price() {
      let product_stock = "";
      product_stock =
        this.formData.details_stock === null ||
        this.formData.details_stock === undefined
          ? ""
          : this.formData.details_stock?.qte_stock;
      if (this.formData.quantity_served > product_stock) {
        this.get_qte_stock();
      }
      if (
        this.formData.quantity_served === undefined ||
        this.formData.quantity_served === null
      ) {
        return 0;
      }
      if (
        this.formData.details_stock?.product.price_level === undefined ||
        this.formData.details_stock?.product.price_level === null
      ) {
        return 0;
      }
      for (const prop of this.formData.details_stock?.product.price_level) {
        if (
          this.formData.quantity_served >= prop.quantity_min &&
          this.formData.quantity_served <= prop.quantity_max
        ) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.product_public_price = prop.public_price;
        }
      }
      // this.reset_product_detail_act();

      return this.product_public_price;
      // let product_public_price = "";
    },
    get_product_public_price_act() {
      let result = "";
      let product_public_price = "";
      product_public_price =
        this.formData.medical_act === null
          ? ""
          : this.formData.medical_act?.price *
            this.formData.medical_act?.[this.form.patient?.shape.toLowerCase()];
      this.reset_product_detail();
      result = Math.round(product_public_price * 100) / 100;
      return result;
    },

    get_bills_amount() {
      let total = 0;
      if (this.form.bill_type === "pharmacy") {
        this.items.forEach((d) => {
          total += d.amount_net;
        });
      } else {
        this.items_act.forEach((d) => {
          total += d.amount_net;
        });
      }

      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_pu_net() {
      if (
        this.formData.delivery === undefined ||
        this.formData.delivery === null
      ) {
        return this.get_product_public_price;
      } else {
        let pun = "";
        pun = this.get_product_public_price * this.formData.delivery;
        let PUN = "";
        PUN = pun / 100;
        let PUNT = "";
        PUNT = this.get_product_public_price - PUN;
        return PUNT;
      }
    },
    get_pu_net_act() {
      if (
        this.formData.delivery === undefined ||
        this.formData.delivery === null
      ) {
        return this.get_product_public_price_act;
      } else {
        let pun = "";
        pun = this.get_product_public_price_act * this.formData.delivery;
        let PUN = "";
        PUN = pun / 100;
        let PUNT = "";
        PUNT = this.get_product_public_price_act - PUN;
        return PUNT;
      }
    },
    get_amount_gross() {
      if (
        this.formData.quantity_served === undefined ||
        this.get_product_public_price === undefined
      ) {
        return 0;
      } else {
        let amount_gross = "";
        amount_gross =
          this.formData.quantity_served * this.get_product_public_price;
        return amount_gross;
      }
    },
    get_amount_gross_act() {
      // console.log("hum",this.form.product.purchase_price);
      if (
        this.formData.quantity_served === undefined ||
        this.get_product_public_price_act === undefined
      ) {
        return 0;
      } else {
        let amount_gross = "";

        amount_gross =
          this.formData.quantity_served * this.get_product_public_price_act;

        return amount_gross;
      }
    },
    get_amount_net() {
      // console.log("hum",this.form.product.purchase_price);
      if (
        this.formData.quantity_served === undefined ||
        this.get_pu_net === 0
      ) {
        return this.get_amount_gross;
      } else {
        let amount_net = "";
        amount_net = this.get_pu_net * this.formData.quantity_served;
        return amount_net;
      }
    },
    get_amount_net_act() {
      // console.log("hum",this.form.product.purchase_price);
      if (
        this.formData.quantity_served === undefined ||
        this.get_pu_net_act === 0
      ) {
        return this.get_amount_gross_act;
      } else {
        let amount_net = "";
        amount_net = this.get_pu_net_act * this.formData.quantity_served;
        return amount_net;
      }
    },
    get_balance() {
      // console.log("hum",this.form.product.purchase_price);
      if (this.form.advances === undefined) {
        return this.get_bills_amount;
      } else {
        let balance = "";
        balance = this.get_bills_amount - this.form.advances;
        return balance;
      }
    },

    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.name.required")
        );
      // !this.$v.form.name.unique &&
      //   errors.push(
      //     this.$vuetify.lang.t("$vuetify.supplies.cols.name.unique")
      //   );
      return errors;
    },
    reference_noErrors() {
      let errors = [];
      if (!this.$v.form.reference_no.$dirty) return errors;
      !this.$v.form.reference_no.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.reference_no.required")
        );
      return errors;
    },
    total_amountErrors() {
      let errors = [];
      if (!this.$v.form.total_amount.$dirty) return errors;
      !this.$v.form.total_amount.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.supplies.cols.total_amount.required")
        );
      return errors;
    },
  },
  mounted() {
    this.getOpenCash();
    window.addEventListener("keydown", function (event) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.keyCode === "r".charCodeAt(0)
      ) {
        event.preventDefault();
        this.resetFormBills();
      }
    });
  },
  components: {
    DeleteItem,
    FormCmv,
    FormCash,
    FormWarning,
    FormPdf,
    FormSettlement,
    FormPatient,
  },
};
</script>
