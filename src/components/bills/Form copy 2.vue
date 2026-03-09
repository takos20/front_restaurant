<template>
  <v-dialog v-model="dialog.show" persistent max-width="1300px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
        <!--        <v-spacer></v-spacer>-->
        <!--        <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])">-->
        <!--          <v-btn-->
        <!--            class="mr-2 my-2"-->
        <!--            color="#4E342E"-->
        <!--            @click="createD()"-->
        <!--            dark-->
        <!--            dense-->
        <!--            small-->
        <!--          >-->
        <!--            <v-icon dark>-->
        <!--              mdi-plus-->
        <!--            </v-icon>-->
        <!--            {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}-->
        <!--          </v-btn>-->
        <!--        </template>-->
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh() + resetDataForm()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form style="margin-top: 15px">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="form.code"
                color="#4E342E"
                :label="$vuetify.lang.t('$vuetify.bills.cols.bill_N.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-menu
                v-model="menu3"
                color="#4E342E"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.bills_date"
                    color="#4E342E"
                    :label="
                      $vuetify.lang.t('$vuetify.bills.cols.date_bill.title')
                    "
                    prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                    dense
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.bills_date"
                  color="#4E342E"
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-select
                v-model="form.bill_type"
                color="primary"
                autofocus
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
            <!-- <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_delivery') ||
                form.bill_type === 'DELIVERY'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createDelivery()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_catering') ||
                form.bill_type === 'CATERING'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createCatering()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="1"
              class="mb-0 py-0"
              v-if="
                _.includes(this.$auth.user().permissions, 'add_event') ||
                form.bill_type === 'EVENT'
              "
            >
              <v-btn
                class="mr-8 white--text"
                dense
                @click="createEvent()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col> -->
            <v-col cols="12" sm="3" class="mb-0 py-0">
              <v-text-field
                v-model="$auth.user().username"
                color="#4E342E"
                :label="$vuetify.lang.t('$vuetify.bills.cols.cashier.title')"
                prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                class="font-weight-bold"
                outlined
                dense
                filled
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" style="margin-top: -15px">
              <v-autocomplete
                v-model="form.district"
                :items="itemsDistrict"
                :loading="isLoadingDistrict"
                :search-input.sync="searchDistrict"
                color="primary"
                item-text="name"
                item-value="id"
                :label="$vuetify.lang.t('$vuetify.district.title')"
                outlined
                dense
                prepend-inner-icon="mdi-chart-areaspline mdi-dark mdi-18px"
                class="font-weight-bold"
                clearable
              >
                <template #label>
                  <span class="red--text"><strong>* </strong></span
                  >{{ $vuetify.lang.t("$vuetify.district.title") }}
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" class="mb-0 py-0" style="margin-top: -15px">
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
                clearable
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="margin-top: -15px">
              <v-btn
                class="mr-8 white--text"
                :disabled="
                  !_.includes(this.$auth.user().permissions, 'add_patient')
                "
                dense
                @click="createPatient()"
                color="primary"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <!--<v-card-actions style="margin-top: -45px">-->
        <!--<v-spacer></v-spacer>-->
        <!--<v-btn color="#4E342E" :loading="loading" dark type="submit" small style="margin-left: 18px">-->
        <!--{{ $vuetify.lang.t(messages.submit) }}-->
        <!--</v-btn>-->
        <!--</v-card-actions>-->
        <v-divider class="mx-4"></v-divider>
      </v-form>
      <v-form>
        <v-stepper v-model="e1">
          <v-stepper-items>
            <v-stepper-content step="1" :disabled="!form.patient">
              <form-category
                @getItemsProduct="getItemsProduct"
                :disabled="!form.patient"
              ></form-category>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-btn @click="backTo" class="ml-6" color="#4E342E" dark>
                {{ $vuetify.lang.t("$vuetify.category.list.title") }}
              </v-btn>
              <v-card-text>
                <v-data-iterator
                  :footer-props="{
                    'items-per-page-options': itemPerPageOptionsProd,
                  }"
                  :items="itemsProducts"
                  :items-per-page="itemsPerPageProd"
                  :server-items-length="meta.totalElements"
                  :loading="loadingProduct.list"
                  :options.sync="paginationProduct"
                  :sort-by="sortByProd.toLowerCase()"
                  style="background-color: #eceff1"
                >
                  <template v-slot:default="props">
                    <v-container>
                      <v-row>
                        <v-col
                          v-for="(itemProd, key) in props.items"
                          :key="key"
                          cols="12"
                          sm="1"
                          md="1"
                          lg="3"
                        >
                          <v-card class="pa-2" hover outlined>
                            <v-chip
                              small
                              color="#4E342E"
                              text-color="white"
                              class="d-flex justify-center align-center"
                            >
                              {{ itemProd.category.name }}
                              {{ itemProd.qte_served_fake }}
                            </v-chip>
                            <v-card-title
                              class="subheading font-weight-bold d-flex justify-center align-center"
                            >
                              {{ itemProd.name }}
                            </v-card-title>

                            <v-divider style="margin-top: -18px"></v-divider>
                            <v-list dense>
                              <!-- <v-list-item style="margin-bottom: -20px">
                                <v-list-item-content>{{ $vuetify.lang.t("$vuetify.price_level.cols.public_price.title") }}:</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ itemProd.public_price }}
                                </v-list-item-content>
                              </v-list-item> -->

                              <v-card-title
                                class="subheading font-weight-bold d-flex justify-center align-center"
                              >
                                {{ itemProd.price }} XAF
                              </v-card-title>
                              <!-- <v-list-item>
                                <v-list-item-content>{{ $vuetify.lang.t("$vuetify.product.cols.quantity.title") }}:</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ itemProd.qte_stock }}
                                </v-list-item-content>
                              </v-list-item> -->
                              <v-list-item>
                                <v-text-field
                                  v-model="itemProd.qte_served_fake"
                                  color="#4E342E"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.bills.cols.quantity_served.title'
                                    )
                                  "
                                  class="font-weight-bold"
                                  outlined
                                  type="number"
                                  :rules="[numberRuleQteServed]"
                                  dense
                                  min="0"
                                  style="margin-bottom: -20px"
                                ></v-text-field>
                              </v-list-item>
                              <v-list-item>
                                <v-text-field
                                  color="primary"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.bills.cols.delivery.title'
                                    )
                                  "
                                  class="font-weight-bold"
                                  outlined
                                  type="number"
                                  min="0"
                                  :rules="[numberRuleDelivery]"
                                  dense
                                  style="margin-bottom: -20px"
                                  v-model="itemProd.delivery"
                                ></v-text-field>
                              </v-list-item>
                              <v-list-item>
                                <v-text-field
                                  color="primary"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.bills.cols.delivery.title_cash'
                                    )
                                  "
                                  class="font-weight-bold"
                                  outlined
                                  type="number"
                                  min="0"
                                  :rules="[numberRuleDeliveryCash]"
                                  dense
                                  style="margin-bottom: -20px"
                                  v-model="itemProd.delivery_cash"
                                ></v-text-field>
                              </v-list-item>
                              <v-list-item>
                                <v-text-field
                                  color="#4E342E"
                                  :label="
                                    $vuetify.lang.t(
                                      '$vuetify.bills.cols.amount_gross.title'
                                    )
                                  "
                                  class="font-weight-bold"
                                  outlined
                                  :value="get_subtotal(itemProd)"
                                  dense
                                  readonly
                                  filled
                                  style="margin-bottom: -25px"
                                ></v-text-field>
                              </v-list-item>

                              <v-list-item
                                style="margin-bottom: -40px; margin-top: -35px"
                              >
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <template>
                                      <v-btn
                                        color="#d19b6f"
                                        :loading="loadingBtn"
                                        light
                                        dense
                                        class="ma-10 font-weight-black d-flex justify-center align-center"
                                        v-on="on"
                                        small
                                        @click="saveDetails(itemProd)"
                                        :disabled="
                                          form.bill_type === null ||
                                          form.district === null ||
                                          itemProd.qte_served_fake === 0 ||
                                          get_subtotal(itemProd) === 0 ||
                                          !form.patient
                                        "
                                      >
                                        {{
                                          $vuetify.lang.t("$vuetify.btn.add")
                                        }}
                                        <!--{{ $vuetify.lang.t(messages.submit) }}-->
                                      </v-btn>
                                    </template>
                                  </template>
                                  <span
                                    class="text-center font-weight-bold body-2 withe--text text--d ken-1"
                                  >
                                    {{
                                      $vuetify.lang.t(
                                        "$vuetify.bills.new.add_product"
                                      )
                                    }}
                                  </span>
                                </v-tooltip>
                              </v-list-item>
                            </v-list>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                  <template v-slot:footer>
                    <v-row align="center" justify="center">
                      <v-spacer></v-spacer>
                    </v-row>
                  </template>
                </v-data-iterator>
              </v-card-text>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-form>
      <v-form :disabled="this.get_bills_amount == 0">
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.net_payable.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                :value="get_bills_amount"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.tva.title')"
                class="text-h6 font-weight-bold"
                filled
                readonly
                outlined
                :value="get_bills_tva"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.ttc.title')"
                class="text-h6 font-weight-bold"
                outlined
                :value="get_bills_ttc"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.delivery.title')"
                class="text-h6 font-weight-bold"
                outlined
                type="number"
                min="0"
                :rules="[numberRuleDelivery]"
                dense
                v-model="form.delivery"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.delivery.title_cash')
                "
                class="text-h6 font-weight-bold"
                outlined
                type="number"
                min="0"
                :rules="[numberRuleDeliveryCash]"
                dense
                v-model="form.delivery_cash"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: 5px">
              <v-text-field
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.net_payable.title2')
                "
                class="text-h6 font-weight-bold"
                outlined
                :value="get_bills_amount_net"
                readonly
                filled
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="form.amount_received"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.amount_received.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRuleamount_received]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                :value="get_bills_amount_paid"
                color="success"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.amount_paid.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRuleamount_paid]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="get_balance"
                :value="get_balance"
                hide-details
                persistent-hint
                color="error"
                :label="$vuetify.lang.t('$vuetify.bills.cols.balance.title')"
                class="text-h6 font-weight-bold"
                outlined
                dense
                readonly
                min="0"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" class="mb-0 py-0" style="margin-top: -15px">
              <v-text-field
                v-model="get_refund"
                :value="get_refund"
                color="primary"
                :label="$vuetify.lang.t('$vuetify.bills.cols.refund.title')"
                class="text-h6 font-weight-bold"
                outlined
                dense
                disabled
                min="0"
                filled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" class="mb-0 py-0" style="margin-top: -15px">
              <v-select
                v-model="form.payment_method"
                color="primary"
                :items="optionPayment.type_Payment"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.payment_method.title')
                "
                prepend-inner-icon="mdi-account-cash mdi-dark mdi-18px"
                class="text-h7 font-weight-bold"
                outlined
                dense
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO'
              "
            >
              <v-text-field
                v-model="form.phone_number"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.phone_number.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRulephone_number]"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="2"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="this.form.payment_method === 'BANK_CARD'"
            >
              <v-text-field
                v-model="form.bank_card_number"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.bank_card_number.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                dense
                type="number"
                min="0"
                :rules="[numberRulebank_card_number]"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="3"
              class="mb-0 py-0"
              style="margin-top: -15px"
              v-if="
                this.form.payment_method === 'OM' ||
                this.form.payment_method === 'MOMO' ||
                this.form.payment_method === 'BANK_CARD'
              "
            >
              <v-text-field
                v-model="form.transaction_ref"
                color="primary"
                :label="
                  $vuetify.lang.t('$vuetify.bills.cols.transaction_ref.title')
                "
                class="text-h6 font-weight-bold"
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions style="margin-top: -25px">
          <v-btn
            :loading="loading.refresh"
            @click="refreshItemsCat()"
            class="ml-2 my-1"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="#4E342E">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-spacer></v-spacer>
          <!-- <v-btn dark color="#4E342E" @click="save()" :loading="loadingBtn">
            {{ $vuetify.lang.t("$vuetify.bills.new.save_bills") }}
          </v-btn> -->
          <v-btn
            color="#4E342E"
            :loading="loadingBtn"
            class="white--text"
            light
            @click="save_print_bills()"
            :disabled="
              form.bill_type === null ||
              form.district === null ||
              form.amount_received == null ||
              form.payment_method == 'NO_PAY' ||
              !form.patient
            "
          >
            {{ $vuetify.lang.t("$vuetify.bills.new.save_print_bills") }}
          </v-btn>
        </v-card-actions>
        <v-divider class="mx-3"></v-divider>
      </v-form>
      <v-card-text style="margin-top: -20px">
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
          <template v-slot:header.delivery="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.delivery_cash="{ header }">
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
          <template v-slot:header.tva="{ header }">
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
            <tbody>
              <tr :key="item.id" v-for="item in items">
                <td class="subtitle-2">
                  {{ item.dish ? item.dish.name : "-" }}
                </td>
                <!-- <td class="subtitle-2">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pub }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.amount_gross }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.delivery }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.pun }}
                  </td>

                  <td class="subtitle-2">
                    {{ item.amount_net }}
                  </td> -->
                <!-- Editable Quantity -->
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.quantity_served"
                      dense
                      hide-details
                      type="number"
                      style="max-width: 80px"
                    />
                  </div>
                  <div v-else>
                    {{ item.quantity_served }}
                  </div>
                </td>
                <td class="subtitle-2">
                  {{ item.delivery }}
                </td>
                <!-- Editable Delivery -->
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.delivery"
                      dense
                      hide-details
                      @input="setFormData(item)"
                      style="max-width: 100px"
                    />
                  </div>
                  <div v-else>
                    {{ item.delivery }}
                  </div>
                </td>
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      v-model="editedRow.delivery_cash"
                      dense
                      hide-details
                      @input="setFormData(item)"
                      style="max-width: 100px"
                    />
                  </div>
                  <div v-else>
                    {{ item.delivery_cash }}
                  </div>
                </td>

                <!-- Editable Pun -->
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      :value="calculatedPuNet"
                      dense
                      hide-details
                      type="number"
                      style="max-width: 100px"
                    />
                  </div>
                  <div v-else>
                    {{ item.pun }}
                  </div>
                </td>

                <!-- Repeat for other fields -->
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field
                      :value="calculatedAmountNet"
                      readonly
                      dense
                      hide-details
                    />
                  </div>
                  <div v-else>
                    {{ item.amount_net }}
                  </div>
                </td>
                <td class="subtitle-2">
                  <div v-if="editedRowId === item.id">
                    <v-text-field v-model="editedRow.tva" dense hide-details />
                  </div>
                  <div v-else>
                    {{ item.tva }}
                  </div>
                </td>
                <!-- Action Buttons -->
                <td class="subtitle-2">
                  <template v-if="editedRowId === item.id">
                    <v-btn icon color="green" @click="saveRowEdit">
                      <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                    <v-btn icon color="grey" @click="cancelRowEdit">
                      <v-icon>mdi-cancel</v-icon>
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-btn icon color="secondary" @click="editDetails(item)">
                      <v-icon>mdi-update</v-icon>
                    </v-btn>
                    <v-btn icon color="orange" @click="addIngredient(item)">
                      <v-icon>mdi-food-variant</v-icon>
                    </v-btn>
                    <v-btn icon color="red" @click="deleteItem(item)">
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                </td>
              </tr>
            </tbody>
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

    <!-- <form-cmv :dialog="dialogFormCMV"></form-cmv> -->
    <form-pdf :dialog="dialogFormPdf" ref="pdfForm"></form-pdf>
    <form-patient :dialog="dialogForm" :messages="messages"></form-patient>
    <form-delivery
      :dialog="dialogFormDelivery"
      :messages="messages"
    ></form-delivery>
    <form-catering
      :dialog="dialogFormCatering"
      :messages="messages"
    ></form-catering>
    <form-event :dialog="dialogFormEvent" :messages="messages"></form-event>
    <form-ingredient
      :dialog="dialogFormIngredient"
      :messages="messages"
      @getItems="getItemsDetails"
      ref="ingredientForm"
    ></form-ingredient>
    <form-cash
      :dialog="dialogFormCash"
      ref="cashForm"
      :messages="messages"
      @getItems="getOpenCash"
    ></form-cash>
    <form-inv :dialog="dialogFormInv" ref="invForm"></form-inv>
  </v-dialog>
</template>

<script>
import FormCategory from "./../bills/FormCategory";
// import FormCmv from "./../bills/FormCashMovement";
import FormPdf from "./../bills/Pdf";
import FormPatient from "./../patient/Form";
import FormIngredient from "./FormIngredient";
import FormCatering from "./../catering/Form";
import FormEvent from "./../event/Form";
import FormDelivery from "./../delivery/Form";
// import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "./../../mixins/Common/Form.vue";
import FormCash from "./../cash/Form";
import FormInv from "./IsInventory";
// import {mapGetters} from "vuex";
// import { required } from "vuelidate/lib/validators";
import DeleteItem from "./../Common/DeleteDetails";
// const FileSaver = require("file-saver");

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          bills_date: null,
          pub: null,
          tva: null,
          payment_method: 'CASH',
          district: null,
          bill_type: null,
          transaction_ref: null,
          phone_number: null,
          bank_card_number: null,
          had_been_paid: false,
          total_amount: null,
          delivery: null,
          delivery_cash: null,
          quantity_served: null,
          product: null,
          subtotal: null,
          total: null,
          bills: null,
          bills_amount: null,
          code: null,
          cashier: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
      coefficient: null,
      number_account: null,
      quote_internal: null,
      quote_external: null,
    },
    optionPayment: {
      type_Payment: [],
    },
    urlDistrict: "districts",
    isLoadingDistrict: false,
    searchDistrict: null,
    itemsDistrict: [],
    headers: [],
    items: [],
    isLoadingPatient: false,
    searchPatient: null,
    itemsPatient: [],
    urlPatient: "patients/allPatients",
    itemsCategory: [],
    itemsProducts: [],
    meta: {},
    sum: "",
    urlProducts: "dishes",
    next_beneficiary: "",
    current_contribution: "",
    itemPerPage: 6,
    // pageCat: 1,
    itemsPerPageProd: 6,
    tva_collected: null,
    sortByCat: "id",
    sortByProd: "id",
    //itemPerPages: 3,
    itemPerPageOptionsProd: [6, 10, 30],
    itemPerPageOptions: [1000],
    urlDeleteItems: "",
    sortDesc: true,
    had_paid: false,
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingProduct: {
      list: false,
      refresh: false,
      filter: false,
    },
    pagination: {},
    paginationCategory: {},
    paginationProduct: {},
    selectedItem: false,
    _search: {},
    _sorts: {},
    dialogDelete: {
      show: false,
    },
    sortBy: ["id"],
    e1: 1,
    urlItemsCash: "cashs/isOpen",
    urlItemsHospital: "hospitals",
    isLoading: false,
    search: null,
    menu2: false,
    supply: false,
    active: false,
    menu3: false,
    menu4: false,
    menu: false,
    numberRuleDelivery: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleDeliveryCash: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    dialogFormCMV: {
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
    dialogFormDelivery: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isActive: false,
    dialogFormDetails: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    editedRowId: null,
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
    dialogFormEvent: {
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
    dialogFormIngredient: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormCatering: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
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
    numberRuleQteServed: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_received: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRuleamount_paid: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulephone_number: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    numberRulebank_card_number: (val) => {
      if (val === null || val === '' || isNaN(val)) return "Valeur invalide";
      if (val < 0) return "Entrer un nombre positif";
      return true;
    },
    itemsProduct: [],
    urlProduct: "products",
    urlItemsCategory: "categories",
    urlItems: "bills",
    urlItemsDetails_bills: "details_bills",
  }),
  watch: {
    pagination: {
      handler() {
        this.getItemsDetails();
        this.getItemsCategory();
        this.getItemsProduct();
      },
      deep: true,
    },
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
    paginationProduct: {
      handler() {
        this.getItemsProduct();
      },
      deep: true,
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
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProduct,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getItemsCategory();
    this.setHeaders();
    this.getOptionsBill();
    this.getOptionsPayment();
    this.resetItemsDetails();

    //this.setItemRoles();
  },
  mounted() {
    this.getOpenCash();
    this.getHospital();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    getHospital() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.tva_collected = data.content[0].VAT_collected;
            resolve(response);
          });
      });
    },
    setFormData(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.editedRow.pun -
        ((this.editedRow.pun || 0) * (this.editedRow.delivery || 0)) / 100;
    },
    setFormDataAmount(item) {
      this.editedRow.pun = item.pun;
      this.editedRow.pun =
        this.{"remainingRequest":"G:\\Restaurants\\front\\node_modules\\vue-loader\\lib\\index.js??vue-loader-options!G:\\Restaurants\\front\\src\\components\\patient_account\\Index.vue?vue&type=script&lang=js&","dependencies":[{"path":"G:\\Restaurants\\front\\src\\components\\patient_account\\Index.vue","mtime":1769515104535},{"path":"G:\\Restaurants\\front\\node_modules\\cache-loader\\dist\\cjs.js","mtime":1672327032702},{"path":"G:\\Restaurants\\front\\node_modules\\babel-loader\\lib\\index.js","mtime":1672327035719},{"path":"G:\\Restaurants\\front\\node_modules\\vuetify-loader\\lib\\loader.js","mtime":1672327041623},{"path":"G:\\Restaurants\\front\\node_modules\\cache-loader\\dist\\cjs.js","mtime":1672327032702},{"path":"G:\\Restaurants\\front\\node_modules\\vue-loader\\lib\\index.js","mtime":1672327039532}],"contextDependencies":[],"result":[{"type":"Buffer","data":"base64:Ly8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KLy8KCmltcG9ydCBMaXN0TWl4aW4gZnJvbSAiLi8uLi8uLi9taXhpbnMvQ29tbW9uL0xpc3QudnVlIjsKaW1wb3J0IEZvcm1BY2NvdW50IGZyb20gIi4vRm9ybSI7CmltcG9ydCBEZWxldGVJdGVtIGZyb20gIi4vLi4vQ29tbW9uL0RlbGV0ZSI7CmltcG9ydCBheGlvcyBmcm9tICJheGlvcyI7CmV4cG9ydCBkZWZhdWx0IHsKICBtaXhpbnM6IFtMaXN0TWl4aW5dLAogIGRhdGE6ICgpID0+ICh7CiAgICB1cmxJdGVtczogIi9wYXRpZW50X2FjY291bnRzIiwKICAgIHNvcnRCeTogWyJpZCJdLAogICAgZGlhbG9nRm9ybTogewogICAgICBzaG93OiBmYWxzZSwKICAgICAgc2hvd3M6IHsKICAgICAgICBzaG93RmlsdGVyOiBmYWxzZSwKICAgICAgICBzaG93SW5mbzogZmFsc2UsCiAgICAgIH0sCiAgICB9LAogICAgZGlhbG9nRGVsZXRlOiB7CiAgICAgIHNob3c6IGZhbHNlLAogICAgfSwKICAgIGRpYWxvZ0RldGFpbDogewogICAgICBzaG93OiBmYWxzZSwKICAgIH0sCiAgICBkaWFsb2dFbnQ6IHsKICAgICAgc2hvdzogZmFsc2UsCiAgICB9LAogICAgdXJscGF0aWVudDogInBhdGllbnRzL2FsbCIsCiAgICBpc0xvYWRpbmdQYXRpZW50OiBmYWxzZSwKICAgIHNlYXJjaFBhdGllbnQ6IG51bGwsCiAgICBpdGVtc1BhdGllbnQ6IFtdLAogICAgb3B0aW9uVHlwZV9hY2NvdW50OiB7CiAgICAgIHR5cGVfYWNjb3VudDogW10sCiAgICB9LAogICAgY3VycmVudEZpbGU6IHVuZGVmaW5lZCwKICAgIGZvcm06IHsKICAgICAgaWQ6IG51bGwsCiAgICAgIHRpdGxlOiBudWxsLAogICAgfSwKICAgIGZpbGVJbmZvczogW10sCiAgICBmaWx0ZXI6IHsKICAgICAgcGF0aWVudDogbnVsbCwKICAgICAgdHlwZV9hY2NvdW50OiBudWxsLAogICAgfSwKICAgIG1lc3NhZ2VzOiB7CiAgICAgIHRpdGxlOiAiIiwKICAgICAgc3VibWl0OiAiIiwKICAgICAgc3VjY2VzczogIiIsCiAgICB9LAogICAgbG9hZGluZ0ltcG9ydDogZmFsc2UsCiAgICBtZXNzYWdlc0RlbGV0ZTogewogICAgICBzdWNjZXNzOiAiJHZ1ZXRpZnkucGF0aWVudGFjY291bnQuZGVsZXRlLnN1Y2Nlc3MiLAogICAgfSwKICB9KSwKICB3YXRjaDogewogICAgc2VhcmNoUGF0aWVudCh2YWx1ZSkgewogICAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybjsKICAgICAgY29uc3QgcGFyYW1zID0geyBuYW1lOiB2YWx1ZSB9OwogICAgICBsZXQgc2VsZiA9IHRoaXM7CiAgICAgIHRoaXMuaXNMb2FkaW5nUGF0aWVudCA9IHRydWU7CiAgICAgIHRoaXMuJHN0b3JlCiAgICAgICAgLmRpc3BhdGNoKCJyZXF1ZXN0IiwgewogICAgICAgICAgdXJsOiBzZWxmLnVybHBhdGllbnQsCiAgICAgICAgICBwYXJhbXM6IHBhcmFtcywKICAgICAgICB9KQogICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gewogICAgICAgICAgc2VsZi5pdGVtc1BhdGllbnQgPSByZXNwb25zZS5kYXRhLmNvbnRlbnQ7CiAgICAgICAgfSkKICAgICAgICAuZmluYWxseSgoKSA9PiAodGhpcy5pc0xvYWRpbmdQYXRpZW50ID0gZmFsc2UpKTsKICAgIH0sCiAgfSwKICBjcmVhdGVkKCkgewogICAgdGhpcy5nZXRPcHRpb25zVHlwZV9hY2NvdW50KCk7CiAgfSwKICBtZXRob2RzOiB7CiAgICBkZXRhaWxzUGF0aWVudChpdGVtKSB7CiAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsKICAgICAgICBuYW1lOiAiZGV0YWlsc1BhdGllbnRBY2NvdW50IiwKICAgICAgICBwYXJhbXM6IHsgaWQ6IGl0ZW0uaWQgfSwKICAgICAgfSk7CiAgICB9LAogICAgZ2V0T3B0aW9uc1R5cGVfYWNjb3VudCgpIHsKICAgICAgLy8gT24gcG91dmFpdCBhdXNzaSB1dGxpc2VyIGxlIGZvckVhY2ggYXUgbGlldSBkZSAgIF8uZWFhY2gKICAgICAgbGV0IHNlbGYgPSB0aGlzOwogICAgICB0aGlzLl8uZWFjaCh0aGlzLiRzdG9yZS5nZXR0ZXJzLnR5cGVfYWNjb3VudCwgKHR5cGVfYWNjb3VudCkgPT4gewogICAgICAgIHNlbGYub3B0aW9uVHlwZV9hY2NvdW50LnR5cGVfYWNjb3VudC5wdXNoKHsKICAgICAgICAgIHRleHQ6IHNlbGYuJHZ1ZXRpZnkubGFuZy50KHR5cGVfYWNjb3VudC50ZXh0KSwKICAgICAgICAgIHZhbHVlOiB0eXBlX2FjY291bnQudmFsdWUsCiAgICAgICAgfSk7CiAgICAgIH0pOwogICAgfSwKICAgIHVwbG9hZCgpIHsKICAgICAgbGV0IHNlbGYgPSB0aGlzOwogICAgICBzZWxmLmxvYWRpbmdJbXBvcnQgPSB0cnVlOwogICAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTsKICAgICAgZm9ybURhdGEuYXBwZW5kKCJmaWxlIiwgdGhpcy5jdXJyZW50RmlsZSk7CiAgICAgIGF4aW9zCiAgICAgICAgLnBvc3QoInN1cmdlcmllcy91cGxvYWQiLCBmb3JtRGF0YSwgewogICAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICAiQ29udGVudC1UeXBlIjogIm11bHRpcGFydC9mb3JtLWRhdGEiLAogICAgICAgICAgfSwKICAgICAgICB9KQogICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHsKICAgICAgICAgIGxldCBtZXNzYWdlOwogICAgICAgICAgaWYgKGVycm9yLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7CiAgICAgICAgICAgIG1lc3NhZ2UgPSAiJHZ1ZXRpZnkuZXJyb3Jfb2NjdXJlZCI7CiAgICAgICAgICAgIGNvbnN0IGZpZWxkcyA9IGVycm9yLnJlc3BvbnNlLmRhdGE7CiAgICAgICAgICAgIHNlbGYuc2V0Rm9ybUVycm9ycyhmaWVsZHMpOwogICAgICAgICAgICB0aGlzLiRmb3JjZVVwZGF0ZSgpOwogICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgbWVzc2FnZSA9ICIkdnVldGlmeS5lcnJvcl9zZXJ2ZXIiOwogICAgICAgICAgfQogICAgICAgICAgc2VsZi4kc3RvcmUuZGlzcGF0Y2goInNob3dOb3RpZmljYXRpb24iLCB7CiAgICAgICAgICAgIHN0YXR1dDogdHJ1ZSwKICAgICAgICAgICAgdGV4dDogc2VsZi4kdnVldGlmeS5sYW5nLnQobWVzc2FnZSksCiAgICAgICAgICAgIGNvbG9yOiAiI0I3MUMxQyIsCiAgICAgICAgICB9KTsKICAgICAgICB9KQogICAgICAgIC50aGVuKCgpID0+IHsKICAgICAgICAgIHNlbGYubG9hZGluZ0ltcG9ydCA9IGZhbHNlOwogICAgICAgIH0pOwogICAgfSwKICAgIHNlbGVjdEZpbGUoZmlsZSkgewogICAgICB0aGlzLnByb2dyZXNzID0gMDsKICAgICAgdGhpcy5jdXJyZW50RmlsZSA9IGZpbGU7CiAgICB9LAogICAgc2V0SGVhZGVycygpIHsKICAgICAgdGhpcy5oZWFkZXJzID0gWwogICAgICAgIHsKICAgICAgICAgIHRleHQ6ICIkdnVldGlmeS5leHBlbnNlc19uYXR1cmUuY29scy5uYXR1cmVfY29kZS50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogImNvZGUiLAogICAgICAgICAgYWxpZ246ICJzdGFydCIsCiAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSwKICAgICAgICAgIHdpZHRoOiAiMTUiLAogICAgICAgICAgY2xhc3M6ICJncmV5LS10ZXh0IHRleHQtLWRhcmtlbi0zIiwKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgIHRleHQ6ICIkdnVldGlmeS5wYXRpZW50YWNjb3VudC5jb2xzLnR5cGVfYWNjb3VudC50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogInR5cGVfYWNjb3VudCIsCiAgICAgICAgICBhbGlnbjogInN0YXJ0IiwKICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLAogICAgICAgICAgd2lkdGg6ICI1MCIsCiAgICAgICAgICBjbGFzczogImdyZXktLXRleHQgdGV4dC0tZGFya2VuLTMiLAogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgdGV4dDogIiR2dWV0aWZ5LnBhdGllbnRhY2NvdW50LmNvbHMucGF0aWVudC50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogInBhdGllbnQiLAogICAgICAgICAgYWxpZ246ICJzdGFydCIsCiAgICAgICAgICBzb3J0YWJsZTogdHJ1ZSwKICAgICAgICAgIHdpZHRoOiAiNTAiLAogICAgICAgICAgY2xhc3M6ICJncmV5LS10ZXh0IHRleHQtLWRhcmtlbi0zIiwKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgIHRleHQ6ICIkdnVldGlmeS5iaWxscy5jb2xzLnBhdGllbnRfYmFsYW5jZS50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogInBhdGllbnRfYmFsYW5jZSIsCiAgICAgICAgICBhbGlnbjogInN0YXJ0IiwKICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLAogICAgICAgICAgd2lkdGg6ICI1MCIsCiAgICAgICAgICBjbGFzczogImdyZXktLXRleHQgdGV4dC0tZGFya2VuLTMiLAogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgdGV4dDogIiR2dWV0aWZ5LnNoYXBlLmNvbHMuY3JlYXRlZC50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogImNyZWF0ZV9kYXRlIiwKICAgICAgICAgIGFsaWduOiAic3RhcnQiLAogICAgICAgICAgc29ydGFibGU6IHRydWUsCiAgICAgICAgICB3aWR0aDogIjEwNSIsCiAgICAgICAgICBjbGFzczogImdyZXktLXRleHQgdGV4dC0tZGFya2VuLTMiLAogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgdGV4dDogIiR2dWV0aWZ5LnNoYXBlLmNvbHMuYWN0aW9ucy50aXRsZSIsCiAgICAgICAgICB2YWx1ZTogbnVsbCwKICAgICAgICAgIGFsaWduOiAic3RhcnQiLAogICAgICAgICAgc29ydGFibGU6IHRydWUsCiAgICAgICAgICB3aWR0aDogIjgwIiwKICAgICAgICB9LAogICAgICBdOwogICAgfSwKICAgIGNyZWF0ZSgpIHsKICAgICAgdGhpcy5kaWFsb2dGb3JtLnNob3cgPSB0cnVlOwogICAgICB0aGlzLm1lc3NhZ2VzID0gewogICAgICAgIHRpdGxlOiAiJHZ1ZXRpZnkucGF0aWVudGFjY291bnQubmV3LnRpdGxlIiwKICAgICAgICBzdWJtaXQ6ICIkdnVldGlmeS5wYXRpZW50YWNjb3VudC5uZXcuc3VibWl0IiwKICAgICAgICBzdWNjZXNzOiAiJHZ1ZXRpZnkucGF0aWVudGFjY291bnQubmV3LnN1Y2Nlc3MiLAogICAgICB9OwogICAgICB0aGlzLmZvcm0gPSB7CiAgICAgICAgaWQ6IG51bGwsCiAgICAgICAgdGl0bGU6IG51bGwsCiAgICAgIH07CiAgICB9LAogICAgZWRpdHBhdGllbnRhY2NvdW50KGl0ZW0pIHsKICAgICAgdGhpcy5kaWFsb2dGb3JtLnNob3cgPSB0cnVlOwogICAgICB0aGlzLm1lc3NhZ2VzID0gewogICAgICAgIHRpdGxlOiAiJHZ1ZXRpZnkucGF0aWVudGFjY291bnQudXBkYXRlLnRpdGxlIiwKICAgICAgICBzdWJtaXQ6ICIkdnVldGlmeS5wYXRpZW50YWNjb3VudC51cGRhdGUuc3VibWl0IiwKICAgICAgICBzdWNjZXNzOiAiJHZ1ZXRpZnkucGF0aWVudGFjY291bnQudXBkYXRlLnN1Y2Nlc3MiLAogICAgICB9OwogICAgICB0aGlzLiRyZWZzLmFjY291bnRGb3JtLnNldEZvcm0oaXRlbSk7CiAgICB9LAogICAgcGVyZm9ybUZpbHRlcigpIHsKICAgICAgbGV0IHNlbGYgPSB0aGlzOwogICAgICBzZWxmLmxvYWRpbmcubGlzdCA9IHRydWU7CiAgICAgIGxldCBwYXJhbXMgPSB7fTsKICAgICAgaWYgKHNlbGYuZmlsdGVyLnBhdGllbnQgIT09IG51bGwpIHsKICAgICAgICBwYXJhbXNbInBhdGllbnQiXSA9IHNlbGYuZmlsdGVyLnBhdGllbnQ7CiAgICAgIH0KCiAgICAgIGlmIChzZWxmLmZpbHRlci50eXBlX2FjY291bnQgIT09IG51bGwpIHsKICAgICAgICBwYXJhbXNbInR5cGVfYWNjb3VudCJdID0gc2VsZi5maWx0ZXIudHlwZV9hY2NvdW50OwogICAgICB9CiAgICAgIHNlbGYuX3NlYXJjaCA9IHBhcmFtczsKICAgICAgLy9jb25zb2xlLmxvZygiRklMVFJFIiwgdGhpcy5fc2VhcmNoKTsKICAgICAgc2VsZgogICAgICAgIC5nZXRJdGVtcygpCiAgICAgICAgLnRoZW4oKCkgPT4gewogICAgICAgICAgc2VsZi4kcmVmcy5maWx0ZXJGb3JtLmNsb3NlRGlhbG9nKCk7CiAgICAgICAgfSkKICAgICAgICAuZmluYWxseSgoKSA9PiB7CiAgICAgICAgICBzZWxmLiRyZWZzLmZpbHRlckZvcm0uc3RvcExvYWRpbmdCdG4oKTsKICAgICAgICB9KTsKICAgIH0sCiAgfSwKICBjb21wb25lbnRzOiB7CiAgICBGb3JtQWNjb3VudCwKICAgIERlbGV0ZUl0ZW0sCiAgfSwKfTsK"},{"version":3,"sources":["Index.vue"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA6QA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA","file":"Index.vue","sourceRoot":"src/components/patient_account","sourcesContent":["<template>\n  <div>\n    <v-card class=\"pb-4\">\n      <v-row wrap>\n        <div class=\"mt-5 mx-5\">\n          <template\n            v-if=\"\n              _.includes(this.$auth.user().permissions, 'add_patientaccount')\n            \"\n          >\n            <v-btn class=\"mr-2 my-2\" @click=\"create()\" color=\"primary\" dark>\n              <v-icon left>mdi-blur-radial</v-icon>\n              {{ $vuetify.lang.t(\"$vuetify.btn.add\") }}\n            </v-btn>\n          </template>\n          <v-btn\n            :loading=\"loading.refresh\"\n            @click=\"refreshItems()\"\n            class=\"mr-2 my-2\"\n            depressed\n            color=\"#f1f5fc\"\n          >\n            <v-icon left color=\"primary\">mdi-refresh</v-icon>\n            {{ $vuetify.lang.t(\"$vuetify.btn.refresh\") }}\n          </v-btn>\n        </div>\n      </v-row>\n    </v-card>\n    <br />\n    <v-card class=\"pb-4\">\n      <v-card-title>\n        <div class=\"title\">\n          {{ $vuetify.lang.t(\"$vuetify.patientaccount.infos.title\") }}\n        </div>\n        <div class=\"title\">\n          {{ $vuetify.lang.t(\"$vuetify.patientaccount.infos.description\") }}\n        </div>\n      </v-card-title>\n    </v-card>\n    <br />\n    <v-card class=\"pb-4\">\n      <v-card-title>\n        <div class=\"title\">\n          {{ $vuetify.lang.t(\"$vuetify.patientaccount.filter\") }}\n        </div>\n      </v-card-title>\n      <v-card-text>\n        <v-row wrap>\n          <v-col cols=\"12\" sm=\"6\" class=\"mb-0 py-0\">\n            <v-autocomplete\n              dense\n              v-model=\"filter.patient\"\n              :items=\"itemsPatient\"\n              :loading=\"isLoadingPatient\"\n              :search-input.sync=\"searchPatient\"\n              :label=\"$vuetify.lang.t('$vuetify.patient.title')\"\n              color=\"primary\"\n              item-text=\"name\"\n              hide-no-data\n              item-value=\"id\"\n              class=\"font-weight-bold\"\n              prepend-inner-icon=\"mdi-code-array\"\n              outlined\n              clearable\n            >\n              <template #label>\n                <span class=\"red--text\"><strong>* </strong></span\n                >{{ $vuetify.lang.t(\"$vuetify.patient.title\") }}\n              </template>\n            </v-autocomplete>\n          </v-col>\n          <v-col cols=\"12\" sm=\"6\" class=\"mb-0 py-0\">\n            <v-select\n              v-model=\"filter.type_account\"\n              color=\"primary\"\n              :items=\"optionType_account.type_account\"\n              :label=\"\n                $vuetify.lang.t(\n                  '$vuetify.patientaccount.cols.type_account.title'\n                )\n              \"\n              dense\n              prepend-inner-icon=\"mdi-account-supervisor-circle\"\n              outlined\n              class=\"font-weight-bold\"\n            ></v-select>\n          </v-col>\n        </v-row>\n      </v-card-text>\n    </v-card>\n    <v-card>\n      <v-data-table\n        :footer-props=\"{\n          'items-per-page-options': itemPerPageOptions,\n        }\"\n        :headers=\"headers\"\n        :items=\"items\"\n        :items-per-page=\"itemPerPage\"\n        :loading=\"loading.list\"\n        :options.sync=\"pagination\"\n        :server-items-length=\"meta.totalElements\"\n        :sort-by=\"sortBy\"\n        :sort-desc=\"sortDesc\"\n        item-key=\"name\"\n        class=\"mt-5\"\n      >\n        <template v-slot:header.code=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n        <template v-slot:header.type_account=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n        <template v-slot:header.patient=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n\n        <template v-slot:header.patient_balance=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n        <template v-slot:header.create_date=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n        <template v-slot:header.null=\"{ header }\">\n          <tr>\n            {{\n              $vuetify.lang.t(header.text)\n            }}\n          </tr>\n        </template>\n        <template v-slot:body=\"{ items }\">\n          <v-hover>\n            <tbody slot-scope=\"{ hover }\">\n              <tr :key=\"item.id\" v-for=\"item in items\">\n                <td class=\"subtitle-2\">{{ item.code }}</td>\n                <td class=\"subtitle-2\">\n                  {{\n                    $vuetify.lang.t(\n                      \"$vuetify.patientaccount.cols.type_account.\" +\n                        item.type_account\n                    )\n                  }}\n                </td>\n                <td class=\"subtitle-2\">\n                  {{ item.patient.name }}\n                </td>\n                <td class=\"subtitle-2\">\n                  {{ item.balance }}\n                </td>\n                <td class=\"subtitle-2\">\n                  {{ $moment(item.createdAt).format(\"YYYY-MM-DD\") }}\n                  {{ item.timeAt }}\n                </td>\n                <td class=\"subtitle-2\">\n                  <template>\n                    <v-tooltip bottom>\n                      <template\n                        v-slot:activator=\"{ on }\"\n                        v-if=\"\n                          _.includes(\n                            $auth.user().permissions,\n                            'change_patientaccount'\n                          )\n                        \"\n                      >\n                        <v-btn\n                          @click=\"editpatientaccount(item)\"\n                          color=\"secondary\"\n                          icon\n                          text\n                          v-on=\"on\"\n                          v-show=\"$vuetify.breakpoint.smAndDown || hover\"\n                        >\n                          <v-icon>mdi-update</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>{{ $vuetify.lang.t(\"$vuetify.btn.edit\") }}</span>\n                    </v-tooltip>\n                    <v-tooltip bottom>\n                      <template\n                        v-slot:activator=\"{ on }\"\n                        v-if=\"\n                          _.includes(\n                            $auth.user().permissions,\n                            'view_patientaccount'\n                          )\n                        \"\n                      >\n                        <v-btn\n                          @click=\"detailsPatient(item)\"\n                          color=\"details\"\n                          icon\n                          text\n                          v-on=\"on\"\n                          v-show=\"$vuetify.breakpoint.smAndDown || hover\"\n                        >\n                          <v-icon>mdi-details</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>{{ $vuetify.lang.t(\"$vuetify.btn.detail\") }}</span>\n                    </v-tooltip>\n                    <v-tooltip bottom>\n                      <template\n                        v-slot:activator=\"{ on }\"\n                        v-if=\"\n                          _.includes(\n                            $auth.user().permissions,\n                            'delete_patientaccount'\n                          )\n                        \"\n                      >\n                        <v-btn\n                          @click=\"deleteItem(item)\"\n                          color=\"red\"\n                          icon\n                          text\n                          v-on=\"on\"\n                          v-show=\"$vuetify.breakpoint.smAndDown || hover\"\n                          dark\n                        >\n                          <v-icon>mdi-delete-outline</v-icon>\n                        </v-btn>\n                      </template>\n                      <span>{{ $vuetify.lang.t(\"$vuetify.btn.remove\") }}</span>\n                    </v-tooltip>\n                  </template>\n                </td>\n              </tr>\n            </tbody>\n          </v-hover>\n        </template>\n      </v-data-table>\n      <form-account\n        :dialog=\"dialogForm\"\n        :form=\"form\"\n        :messages=\"messages\"\n        @getItems=\"getItems\"\n        ref=\"accountForm\"\n      ></form-account>\n      <delete-item\n        :dialog=\"dialogDelete\"\n        :messages=\"messagesDelete\"\n        :urlItems=\"urlDeleteItems\"\n        @getItems=\"getItems\"\n      ></delete-item>\n    </v-card>\n  </div>\n</template>\n\n<script>\nimport ListMixin from \"./../../mixins/Common/List.vue\";\nimport FormAccount from \"./Form\";\nimport DeleteItem from \"./../Common/Delete\";\nimport axios from \"axios\";\nexport default {\n  mixins: [ListMixin],\n  data: () => ({\n    urlItems: \"/patient_accounts\",\n    sortBy: [\"id\"],\n    dialogForm: {\n      show: false,\n      shows: {\n        showFilter: false,\n        showInfo: false,\n      },\n    },\n    dialogDelete: {\n      show: false,\n    },\n    dialogDetail: {\n      show: false,\n    },\n    dialogEnt: {\n      show: false,\n    },\n    urlpatient: \"patients/all\",\n    isLoadingPatient: false,\n    searchPatient: null,\n    itemsPatient: [],\n    optionType_account: {\n      type_account: [],\n    },\n    currentFile: undefined,\n    form: {\n      id: null,\n      title: null,\n    },\n    fileInfos: [],\n    filter: {\n      patient: null,\n      type_account: null,\n    },\n    messages: {\n      title: \"\",\n      submit: \"\",\n      success: \"\",\n    },\n    loadingImport: false,\n    messagesDelete: {\n      success: \"$vuetify.patientaccount.delete.success\",\n    },\n  }),\n  watch: {\n    searchPatient(value) {\n      if (value === null) return;\n      const params = { name: value };\n      let self = this;\n      this.isLoadingPatient = true;\n      this.$store\n        .dispatch(\"request\", {\n          url: self.urlpatient,\n          params: params,\n        })\n        .then((response) => {\n          self.itemsPatient = response.data.content;\n        })\n        .finally(() => (this.isLoadingPatient = false));\n    },\n  },\n  created() {\n    this.getOptionsType_account();\n  },\n  methods: {\n    detailsPatient(item) {\n      this.$router.push({\n        name: \"detailsPatientAccount\",\n        params: { id: item.id },\n      });\n    },\n    getOptionsType_account() {\n      // On pouvait aussi utliser le forEach au lieu de   _.eaach\n      let self = this;\n      this._.each(this.$store.getters.type_account, (type_account) => {\n        self.optionType_account.type_account.push({\n          text: self.$vuetify.lang.t(type_account.text),\n          value: type_account.value,\n        });\n      });\n    },\n    upload() {\n      let self = this;\n      self.loadingImport = true;\n      let formData = new FormData();\n      formData.append(\"file\", this.currentFile);\n      axios\n        .post(\"surgeries/upload\", formData, {\n          headers: {\n            \"Content-Type\": \"multipart/form-data\",\n          },\n        })\n        .catch((error) => {\n          let message;\n          if (error.response.status === 400) {\n            message = \"$vuetify.error_occured\";\n            const fields = error.response.data;\n            self.setFormErrors(fields);\n            this.$forceUpdate();\n          } else {\n            message = \"$vuetify.error_server\";\n          }\n          self.$store.dispatch(\"showNotification\", {\n            statut: true,\n            text: self.$vuetify.lang.t(message),\n            color: \"#B71C1C\",\n          });\n        })\n        .then(() => {\n          self.loadingImport = false;\n        });\n    },\n    selectFile(file) {\n      this.progress = 0;\n      this.currentFile = file;\n    },\n    setHeaders() {\n      this.headers = [\n        {\n          text: \"$vuetify.expenses_nature.cols.nature_code.title\",\n          value: \"code\",\n          align: \"start\",\n          sortable: true,\n          width: \"15\",\n          class: \"grey--text text--darken-3\",\n        },\n        {\n          text: \"$vuetify.patientaccount.cols.type_account.title\",\n          value: \"type_account\",\n          align: \"start\",\n          sortable: true,\n          width: \"50\",\n          class: \"grey--text text--darken-3\",\n        },\n        {\n          text: \"$vuetify.patientaccount.cols.patient.title\",\n          value: \"patient\",\n          align: \"start\",\n          sortable: true,\n          width: \"50\",\n          class: \"grey--text text--darken-3\",\n        },\n        {\n          text: \"$vuetify.bills.cols.patient_balance.title\",\n          value: \"patient_balance\",\n          align: \"start\",\n          sortable: true,\n          width: \"50\",\n          class: \"grey--text text--darken-3\",\n        },\n        {\n          text: \"$vuetify.shape.cols.created.title\",\n          value: \"create_date\",\n          align: \"start\",\n          sortable: true,\n          width: \"105\",\n          class: \"grey--text text--darken-3\",\n        },\n        {\n          text: \"$vuetify.shape.cols.actions.title\",\n          value: null,\n          align: \"start\",\n          sortable: true,\n          width: \"80\",\n        },\n      ];\n    },\n    create() {\n      this.dialogForm.show = true;\n      this.messages = {\n        title: \"$vuetify.patientaccount.new.title\",\n        submit: \"$vuetify.patientaccount.new.submit\",\n        success: \"$vuetify.patientaccount.new.success\",\n      };\n      this.form = {\n        id: null,\n        title: null,\n      };\n    },\n    editpatientaccount(item) {\n      this.dialogForm.show = true;\n      this.messages = {\n        title: \"$vuetify.patientaccount.update.title\",\n        submit: \"$vuetify.patientaccount.update.submit\",\n        success: \"$vuetify.patientaccount.update.success\",\n      };\n      this.$refs.accountForm.setForm(item);\n    },\n    performFilter() {\n      let self = this;\n      self.loading.list = true;\n      let params = {};\n      if (self.filter.patient !== null) {\n        params[\"patient\"] = self.filter.patient;\n      }\n\n      if (self.filter.type_account !== null) {\n        params[\"type_account\"] = self.filter.type_account;\n      }\n      self._search = params;\n      //console.log(\"FILTRE\", this._search);\n      self\n        .getItems()\n        .then(() => {\n          self.$refs.filterForm.closeDialog();\n        })\n        .finally(() => {\n          self.$refs.filterForm.stopLoadingBtn();\n        });\n    },\n  },\n  components: {\n    FormAccount,\n    DeleteItem,\n  },\n};\n
</script>
\n"]}]}
