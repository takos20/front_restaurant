<template>
  <div v-if="_.includes($auth.user().permissions, 'view_dashboard_billing')">
    <!--    <v-btn-->
    <!--        :loading="loading.refresh"-->
    <!--        @click="getItems()"-->
    <!--        class="mr-2 my-2"-->
    <!--        depressed-->
    <!--        color="#f1f5fc"-->
    <!--    >-->
    <!--      <v-icon left color="primary">mdi-refresh</v-icon>-->
    <!--      {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
    <!--    </v-btn>-->
    <br />
    <v-row wrap>
      <v-col cols="12" sm="4" v-if="this.$auth.user().is_superuser">
        <v-autocomplete
          v-model="filter.hospital"
          :items="itemsHospital"
          :loading="isLoadingHospital"
          :search-input.sync="searchHospital"
          color="primary"
          item-text="name"
          item-value="id"
          clearable
          @change="performFilter"
          :label="$vuetify.lang.t('$vuetify.hospitals.title')"
          class="font-weight-bold"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn
          @click="refreshItems()"
          depressed
          class="font-weight-bold white--text"
          color="primary"
        >
          <v-icon left color="white">mdi-refresh</v-icon>
          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="5" class="py-0"></v-col>
      <v-col cols="12" sm="2" class="py-0">
        <v-menu
          v-model="menuAll1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date_month_all"
              outlined
              dense
              clearable
              color="primary"
              class="my-2 font-weight-medium"
              prepend-inner-icon="mdi-calendar-start"
              :label="$vuetify.lang.t('$vuetify.bills.cols.startDate.title')"
              v-bind="attrs"
              v-on="on"
              readonly
            />
          </template>

          <v-date-picker
            v-model="form.start_date_month_all"
            :max="maxDateStatMonthAll"
            color="primary"
            @change="performFilter"
            @input="menuAll1 = false"
          />
        </v-menu>
      </v-col>

      <v-col cols="12" sm="2" class="py-0">
        <v-menu
          v-model="menuAll2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date_month_all"
              outlined
              dense
              clearable
              color="primary"
              class="my-2 font-weight-medium"
              prepend-inner-icon="mdi-calendar-end"
              :label="$vuetify.lang.t('$vuetify.bills.cols.endDate.title')"
              v-bind="attrs"
              v-on="on"
              readonly
            />
          </template>

          <v-date-picker
            v-model="form.end_date_month_all"
            :max="maxDateStatMonthAll"
            :min="getminDateMonthAll"
            color="primary"
            @change="performFilter"
            scrollable
            @input="menuAll2 = false"
          />
        </v-menu>
      </v-col>
    </v-row>
    <v-card>
      <v-chip-group
        v-model="selectedFilter"
        active-class="primary brun--text"
        column
      >
        <v-chip value="today" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.today") }}</v-chip
        >
        <v-chip value="yesterday" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.yesterday") }}</v-chip
        >
        <v-chip value="week_current" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.week_current") }}</v-chip
        >
        <v-chip value="week_previous" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.week_previous") }}</v-chip
        >
        <v-chip value="week_rolling" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.week_rolling") }}</v-chip
        >
        <v-chip value="month_current" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.month_current") }}</v-chip
        >
        <v-chip value="month_previous" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.month_previous") }}</v-chip
        >
        <v-chip value="year_current" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.year_current") }}</v-chip
        >
        <v-chip value="year_previous" outlined class="ma-1">
          {{ $vuetify.lang.t("$vuetify.statistics.year_previous") }}</v-chip
        >
      </v-chip-group>
    </v-card>
    <!-- <v-btn-toggle
  v-model="selectedFilter"
  mandatory
  class="mb-4"
>
  <v-chip value="today" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.today") }}</v-chip>
  <v-chip value="yesterday" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.yesterday") }}</v-chip>
  <v-chip value="week_current" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.week_current") }}</v-chip>
  <v-chip value="week_previous" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.week_previous") }}</v-chip>
  <v-chip value="week_rolling" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.week_rolling") }}</v-chip>
  <v-chip value="month_current" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.month_current") }}</v-chip>
  <v-chip value="month_previous" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.month_previous") }}</v-chip>
  <v-chip value="year_current" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.year_current") }}</v-chip>
  <v-chip value="year_previous" outlined
    small
    class="ma-1"> {{ $vuetify.lang.t("$vuetify.statistics.year_previous") }}</v-chip>
</v-btn-toggle> -->
    <v-row wrap style="margin-top: 5px">
      <v-col cols="12" sm="12" style="margin-top: -25px">
        <strong>
          <h2 class="my-4">
            {{ $vuetify.lang.t("$vuetify.statistics.cash_movement_data") }}
          </h2>
        </strong>
        <v-row>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="primary" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.day_entry")
                    }}</strong>
                    <br />
                    <br />
                    <span style="color: white; font-size: 18px">{{
                      items.sale_of_the_day_domaine === null
                        ? 0
                        : Math.round(items.sale_of_the_day_entry * 100) / 100
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_sale_of_the_day_entry >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_sale_of_the_day_entry * 100) /
                            100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn>
                      </span>
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_day_entry * 100) /
                          100
                        }}
                        %</strong
                      >
                      <v-btn icon small>
                        <v-icon size="10" color="red" dark
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="btn_logout" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.day_exit")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.day_settlement === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.sale_of_the_day_exit * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_day_exit >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_sale_of_the_day_exit * 100) /
                            100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_day_exit * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="primary" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.month_entry")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month_entry === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.sale_of_the_month_entry * 100) /
                                100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_month_entry >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_month_entry * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_month_entry * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="btn_logout" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.month_exit")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month_exit === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.sale_of_the_month_exit * 100) /
                                100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_month_exit >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_month_exit * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_month_exit * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" style="margin-top: -25px">
        <strong>
          <h2 class="my-4">
            {{ $vuetify.lang.t("$vuetify.statistics.day_data") }}
          </h2>
        </strong>
        <v-row>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.sale_of_the_day_act"
                      )
                    }}</strong>
                    <br />
                    <br />
                    <span style="color: white; font-size: 18px">{{
                      items.sales_today === null
                        ? 0
                        : Math.round(items.sales_today * 100) / 100
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_sale_of_the_day >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_sale_of_the_day * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn>
                      </span>
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_day * 100) / 100
                        }}
                        %</strong
                      >
                      <v-btn icon small>
                        <v-icon size="10" color="red" dark
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.cost_production.title"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cost_production === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.cost_production * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_cost_production >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_cost_production * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_cost_production * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>

          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.day_settlement")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.day_settlement === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.day_settlement * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_day_settlement >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_day_settlement * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_day_settlement * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.daily_expenses")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.daily_expenses === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.daily_expenses * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_daily_expenses >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_daily_expenses * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_daily_expenses * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <!-- <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.statistics.cash_balance")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cash_balance === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.cash_balance * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_cash_balance >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_cash_balance * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_cash_balance * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col> -->
        </v-row>
      </v-col>
      <!--      <v-row wrap class="ml-5 mt-5"><v-col cols="12" sm="4" class="mb-0 py-0">-->
      <!--        <strong>-->
      <!--          <h2 class="my-4">-->
      <!--            {{ $vuetify.lang.t("$vuetify.statistics.month_data") }}-->
      <!--          </h2></strong-->
      <!--        >-->

      <!--      </v-col>-->
      <!--        <v-col cols="12" sm="3" class="mb-0 py-0">-->
      <!--          <v-menu-->
      <!--              v-model="menu"-->
      <!--              color="primary"-->
      <!--              :close-on-content-click="false"-->
      <!--              :nudge-right="40"-->
      <!--              transition="scale-transition"-->
      <!--              offset-y-->
      <!--          >-->
      <!--            <template v-slot:activator="{ on, attrs }">-->
      <!--              <v-text-field-->
      <!--                  v-model="form.start_date_month"-->
      <!--                  color="primary"-->
      <!--                  class="font-weight-bold my-2"-->
      <!--                  prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"-->
      <!--                  outlined-->
      <!--                  :label="-->
      <!--                        $vuetify.lang.t(-->
      <!--                          '$vuetify.appointment.cols.start_appointment_date.title'-->
      <!--                        )-->
      <!--                      "-->
      <!--                  v-bind="attrs"-->
      <!--                  v-on="on"-->
      <!--                  dense-->
      <!--                  readonly-->
      <!--              ></v-text-field>-->
      <!--            </template>-->
      <!--            <v-date-picker-->
      <!--                v-model="form.start_date_month"-->
      <!--                :max="maxDateStatMonth"-->
      <!--                color="primary"-->
      <!--                @input="menu = false"-->
      <!--            ></v-date-picker>-->
      <!--          </v-menu>-->
      <!--        </v-col>-->
      <!--        <v-col cols="12" sm="3" class="mb-0 py-0">-->
      <!--          <v-menu-->
      <!--              v-model="menu6"-->
      <!--              color="primary"-->
      <!--              :close-on-content-click="false"-->
      <!--              :nudge-right="40"-->
      <!--              transition="scale-transition"-->
      <!--              offset-y-->
      <!--          >-->
      <!--            <template v-slot:activator="{ on, attrs }">-->
      <!--              <v-text-field-->
      <!--                  v-model="form.end_date_month"-->
      <!--                  color="primary"-->
      <!--                  class="font-weight-bold my-2"-->
      <!--                  prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"-->
      <!--                  outlined-->
      <!--                  :label="-->
      <!--                        $vuetify.lang.t(-->
      <!--                          '$vuetify.appointment.cols.end_appointment_date.title'-->
      <!--                        )-->
      <!--                      "-->
      <!--                  v-bind="attrs"-->
      <!--                  v-on="on"-->
      <!--                  dense-->
      <!--                  readonly-->
      <!--              ></v-text-field>-->
      <!--            </template>-->
      <!--            <v-date-picker-->
      <!--                v-model="form.end_date_month"-->
      <!--                :max="maxDateStatMonth"-->
      <!--                :min="getminDateMonth"-->
      <!--                color="primary"-->
      <!--                @input="menu6 = false"-->
      <!--            ></v-date-picker>-->
      <!--          </v-menu>-->
      <!--        </v-col>-->
      <!--        <v-col cols="12" sm="2" class="mb-0 py-0">-->
      <!--          <v-btn-->
      <!--              class="font-weight-bold my-2 white&#45;&#45;text"-->
      <!--              @click="sell_month_dom()"-->
      <!--              color="primary"-->
      <!--              light-->
      <!--              :loading="loadingBtn"-->
      <!--              :disabled="-->
      <!--                    form.start_date_month === null ||-->
      <!--                      form.end_date_month === null-->
      <!--                  "-->
      <!--          >-->
      <!--            {{-->
      <!--              $vuetify.lang.t(-->
      <!--                  "$vuetify.statistics.sell_month_stat_launch"-->
      <!--              )-->
      <!--            }}-->
      <!--          </v-btn>-->
      <!--        </v-col>-->
      <!--      </v-row>-->
      <v-col cols="12" sm="12" style="margin-top: -25px">
        <strong>
          <h2 class="my-4">
            {{ $vuetify.lang.t("$vuetify.statistics.month_data") }}
          </h2>
        </strong>
        <v-row>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.sale_of_the_month")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.sale_of_the_month * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_month >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_sale_of_the_month * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_sale_of_the_month * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.bills.cols.cost_production.title"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.sale_cost_production_month === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.sale_cost_production_month * 100
                              ) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_cost_production_month >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_cost_production_month * 100) /
                            100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_cost_production_month * 100) /
                          100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.margin_of_the_month"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.month_margin === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.month_margin * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_month_margin >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_month_margin * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_month_margin * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="3" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="pink darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.cumulative_unpaid")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cumulative_unpaid === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.cumulative_unpaid * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.cumulative_month_unpaid"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.cumulative_month_unpaid === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.cumulative_month_unpaid * 100) /
                                100
                            )
                      }}</strong></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col cols="12" sm="12" style="margin-top:-25px"  v-if="this.$auth.user().type_enterprise === 'HOSPITAL'">
        <strong>
          <h2 class="my-4">
            {{ $vuetify.lang.t("$vuetify.statistics.month_insurance_tva") }}
          </h2>
        </strong>
        <v-row>
          <v-col lg="4" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.insurance_of_the_month"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white;font-size: 18px"
                      ><strong>{{
                        items.sale_of_the_month_insurance === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.sale_of_the_month_insurance * 100
                              ) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_sale_of_the_month_insurance >= 0">
                      <span style="color: white;font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_month_insurance * 100
                            ) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red;font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(
                            items.back_sale_of_the_month_insurance * 100
                          ) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col lg="4" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-3" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.tva_of_the_month")
                    }}</strong>
                    <br /><br />
                    <span style="color: white;font-size: 18px"
                      ><strong>{{
                        items.month_tva === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(items.month_tva * 100) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_month_tva >= 0">
                      <span style="color: white;font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_month_tva * 100) / 100
                          }}
                          %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red;font-size: 15px" v-else
                      ><strong
                        >{{
                          Math.round(items.back_month_tva * 100) / 100
                        }}
                        %</strong
                      ><v-btn icon small>
                        <v-icon size="10" color="red"
                          >mdi-arrow-down-bold</v-icon
                        >
                      </v-btn></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col> -->
      <!-- <v-col lg="4" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="pink darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                > -->
      <!-- <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.cumulative_unpaid")
                    }}</strong>
                    <br /><br />
                    <span style="color: white;font-size: 18px"><strong>{{
                      items.cumulative_unpaid_insurance === null
                      ? 0
                      : Intl.NumberFormat().format(
                        Math.round(items.cumulative_unpaid_insurance * 100) / 100
                      )
                    }}</strong></span>
                  </div> -->
      <!-- <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.cumulative_month_unpaid"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white;font-size: 18px"
                      ><strong>{{
                        items.cumulative_month_unpaid_insurance === null
                          ? 0
                          : Intl.NumberFormat().format(
                              Math.round(
                                items.cumulative_month_unpaid_insurance * 100
                              ) / 100
                            )
                      }}</strong></span
                    >
                  </div>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col> -->

      <!--      <v-col cols="12" sm="12">-->
      <!--        <v-card>-->
      <!--          <v-row wrap>-->
      <!--            <v-col cols="12" sm="6" class="mb-0 py-0">-->
      <!--              <h3 style="padding-left:15px;" class="my-4">-->
      <!--                {{ $vuetify.lang.t("$vuetify.statistics.sell_month_stat") }}-->
      <!--              </h3>-->
      <!--            </v-col>-->
      <!--            <v-col cols="12" sm="3" class="mb-0 py-0 my-2">-->
      <!--              <v-menu-->
      <!--                v-model="menu"-->
      <!--                color="primary"-->
      <!--                :close-on-content-click="false"-->
      <!--                :nudge-right="40"-->
      <!--                transition="scale-transition"-->
      <!--                offset-y-->
      <!--                min-width="auto"-->
      <!--              >-->
      <!--                <template v-slot:activator="{ on, attrs }">-->
      <!--                  <v-text-field-->
      <!--                    v-model="form.stat_date_month"-->
      <!--                    color="primary"-->
      <!--                    :label="-->
      <!--                      $vuetify.lang.t(-->
      <!--                        '$vuetify.statistics.sell_month_stat_date'-->
      <!--                      )-->
      <!--                    "-->
      <!--                    prepend-inner-icon="mdi-calendar mdi-dark mdi-18px"-->
      <!--                    class="font-weight-bold"-->
      <!--                    outlined-->
      <!--                    v-bind="attrs"-->
      <!--                    v-on="on"-->
      <!--                    dense-->
      <!--                  ></v-text-field>-->
      <!--                </template>-->
      <!--                <v-date-picker-->
      <!--                  v-model="form.stat_date_month"-->
      <!--                  color="primary"-->
      <!--                  :max="maxDateStatMonth"-->
      <!--                  type="month"-->
      <!--                  @input="menu = false"-->
      <!--                ></v-date-picker>-->
      <!--              </v-menu>-->
      <!--            </v-col>-->
      <!--            <v-col cols="12" sm="2" class="mb-0 py-0">-->
      <!--              <v-btn-->
      <!--                class="font-weight-bold my-2 light&#45;&#45;text"-->
      <!--                @click="sell_month_stat()"-->
      <!--                color="primary"-->
      <!--                light-->
      <!--                :loading="loadingBtn"-->
      <!--                :disabled="form.stat_date_month === null"-->
      <!--              >-->
      <!--                {{-->
      <!--                  $vuetify.lang.t("$vuetify.statistics.sell_month_stat_launch")-->
      <!--                }}-->
      <!--              </v-btn>-->
      <!--            </v-col>-->
      <!--          </v-row>-->
      <!--          <v-card-text v-if="chartData.length > 0">-->
      <!--            <GChart-->
      <!--              type="BarChart"-->
      <!--              :data="chartData"-->
      <!--              :options="chartOptions"-->
      <!--              style="margin-top: -25px"-->
      <!--            />-->
      <!--          </v-card-text>-->
      <!--          <v-card-text-->
      <!--            class="d-flex justify-center align-center"-->
      <!--            style="height: 100px"-->
      <!--            v-else-->
      <!--          >-->
      <!--            <v-progress-circular-->
      <!--              size="50"-->
      <!--              indeterminate-->
      <!--              color="primary"-->
      <!--              style="min-height: 100px"-->
      <!--              class="d-flex justify-center align-center"-->
      <!--            ></v-progress-circular>-->
      <!--          </v-card-text>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap style="margin-top: -10px">
              <v-col cols="12" sm="5" class="mb-0 py-0 my-2">
                <h3 style="padding-left: 15px" class="my-2">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_day") }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu7"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month_first"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_month_first"
                    :max="maxDateStatMonthFirst"
                    color="primary"
                    @change="sell_month_day"
                    @input="menu7 = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu15"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month_first"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_month_first"
                    :max="maxDateStatMonthFirst"
                    :min="getminDateMonthFirst"
                    color="primary"
                    scrollable
                    @change="sell_month_day"
                    @input="menu15 = false"
                  />
                </v-menu>
              </v-col>
              <v-menu
                right
                transition="scale-transition"
                :disabled="this.form.date_month === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    darkd
                    class="ml-3"
                    style="margin-top: -30px"
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsDays.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn dark color="primary" @click="export_month_day()">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_day()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="day_chart"
                style="margin-top: -70px"
              ></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--                        <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--                          <v-progress-circular-->
            <!--                              size="50"-->
            <!--                              indeterminate-->
            <!--                              color="primary"-->
            <!--                          ></v-progress-circular>-->
            <!--                        </v-card-text>-->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap style="margin-top: -10px">
              <v-col cols="12" sm="5" class="mb-0 py-0 my-2">
                <h3 style="padding-left: 15px" class="my-2">
                  {{
                    $vuetify.lang.t("$vuetify.statistics.sell_month_day_entry")
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu9"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month_entry"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_month_entry"
                    :max="maxDateStatMonthEntry"
                    color="primary"
                    @change="sell_month_day_entry"
                    @input="menu9 = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu14"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month_entry"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_month_entry"
                    :max="maxDateStatMonthEntry"
                    :min="getminDateMonthEntry"
                    color="primary"
                    scrollable
                    @change="sell_month_day_entry"
                    @input="menu14 = false"
                  />
                </v-menu>
              </v-col>
              <v-menu
                right
                transition="scale-transition"
                :disabled="this.form.start_date_month_entry === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    class="ml-3"
                    style="margin-top: -30px"
                    fab
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsDaysEntry.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_month_day_entry()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_day_entry()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="day_entry_chart"
                style="margin-top: -70px"
              ></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--                        <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--                          <v-progress-circular-->
            <!--                              size="50"-->
            <!--                              indeterminate-->
            <!--                              color="primary"-->
            <!--                          ></v-progress-circular>-->
            <!--                        </v-card-text>-->
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap style="margin-top: -10px">
              <v-col cols="12" sm="5" class="mb-0 py-0 my-2">
                <h3 style="padding-left: 15px" class="my-2">
                  {{
                    $vuetify.lang.t("$vuetify.statistics.sell_month_day_exit")
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu10"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month_exit"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_month_exit"
                    :max="maxDateStatMonthExit"
                    color="primary"
                    @change="sell_month_day_exit"
                    @input="menu10 = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu13"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month_exit"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_month_exit"
                    :max="maxDateStatMonthExit"
                    :min="getminDateMonthExit"
                    color="primary"
                    scrollable
                    @change="sell_month_day_exit"
                    @input="menu13 = false"
                  />
                </v-menu>
              </v-col>

              <v-menu
                right
                transition="scale-transition"
                :disabled="this.form.start_date_month_exit === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    class="ml-3"
                    style="margin-top: -30px"
                    fab
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsDaysExit.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_month_day_exit()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_day_exit()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="day_exit_chart"
                style="margin-top: -70px"
              ></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--                        <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--                          <v-progress-circular-->
            <!--                              size="50"-->
            <!--                              indeterminate-->
            <!--                              color="primary"-->
            <!--                          ></v-progress-circular>-->
            <!--                        </v-card-text>-->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap style="margin-top: 10px">
              <v-col cols="12" sm="5" class="mb-0 py-0 my-2">
                <h3 style="padding-left: 15px" class="my-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.statistic_payment_channel"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu_channel"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_channel"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_channel"
                    :max="maxDateChannel"
                    color="primary"
                    @change="sell_month_payment_channel"
                    @input="menu_channel = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu_channel_2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_channel"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_channel"
                    :max="maxDateChannel"
                    :min="getminDateChannel"
                    color="primary"
                    scrollable
                    @change="sell_month_payment_channel"
                    @input="menu_channel_2 = false"
                  />
                </v-menu>
              </v-col>

              <v-menu
                right
                transition="scale-transition"
                :disabled="this.form.start_date_channel === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    class="ml-3"
                    style="margin-top: -30px"
                    fab
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsPaymentChannel.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn dark color="primary" @click="export_channel()">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_payment_channel()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
            <br />
            <br />
          </v-card-text>
          <v-card-text>
            <canvas
              height="90vh"
              id="payment_channel_chart"
              style="margin-top: -70px"
            ></canvas>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap style="margin-top: -10px">
              <v-col cols="12" sm="5" class="mb-0 py-0 my-2">
                <h3 style="padding-left: 15px" class="my-2">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.statistic_payment_method"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu11"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month_payment_method"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_month_payment_method"
                    :max="maxDateStatMonthPayment"
                    color="primary"
                    @change="sell_month_payment_method"
                    @input="menu11 = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu12"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month_payment_method"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_month_payment_method"
                    :max="maxDateStatMonthPayment"
                    :min="getminDateMonthPayment"
                    color="primary"
                    scrollable
                    @change="sell_month_payment_method"
                    @input="menu12 = false"
                  />
                </v-menu>
              </v-col>

              <v-menu
                right
                transition="scale-transition"
                :disabled="this.form.start_date_month_payment_method === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    class="ml-3"
                    style="margin-top: -30px"
                    fab
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsPaymentMethod.content"
                        :fields="json_fields"
                        worksheet="My Worksheet"
                        name="Statistiques du mois.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_month_payment_method()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_month_payment_method()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="payment_method_chart"
                style="margin-top: -70px"
              ></canvas>
              <!--              <GChart-->
              <!--                  type="ColumnChart"-->
              <!--                  :data="barChart"-->
              <!--                  :options="chartOptions"-->
              <!--                  style="margin-top: -30px"-->
              <!--              />-->
            </v-card-text>
            <!--                        <v-card-text v-else style="height: 100px" class="text-center">-->
            <!--                          <v-progress-circular-->
            <!--                              size="50"-->
            <!--                              indeterminate-->
            <!--                              color="primary"-->
            <!--                          ></v-progress-circular>-->
            <!--                        </v-card-text>-->
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_dom") }}
                </h3>
              </v-col>
              <v-col cols="12" sm="3" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_month"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_month"
                    :max="maxDateStatMonth"
                    color="primary"
                    @change="sell_month_dom"
                    @input="menu = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu6"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_month"
                    :max="maxDateStatMonth"
                    :min="getminDateMonth"
                    color="primary"
                    scrollable
                    @change="sell_month_dom"
                    @input="menu6 = false"
                  />
                </v-menu>
              </v-col>

              <v-menu
                right
                transition="scale-transition"
                class="my-4"
                style="margin-top: -10px"
                :disabled="this.form.start_date_month === null"
              >
                <template v-slot:activator="{ on }">
                  <v-icon
                    dark
                    style="margin-top: -30px"
                    large
                    color="primary"
                    v-on="on"
                  >
                    mdi-format-list-bulleted
                  </v-icon>
                </template>
                <v-list class="menu-app-bar">
                  <v-list-item>
                    <v-list-item-title>
                      <download-excel
                        class="btn btn-default"
                        :data="itemsDomaine.content"
                        :fields="json_fields_dom"
                        worksheet="My Worksheet"
                        name="Statistiques par domaine.xls"
                      >
                        <v-btn color="primary" class="white--text">
                          {{
                            $vuetify.lang.t(
                              "$vuetify.product.cols.export.titleXLS"
                            )
                          }}
                        </v-btn>
                      </download-excel>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <!--          <v-list-item @click="() => {}" to="/logout">-->
                    <v-list-item-title>
                      <v-btn dark color="primary" @click="export_domaine()">
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePDF"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <v-btn
                        dark
                        color="primary"
                        @click="export_image_domaine()"
                      >
                        {{
                          $vuetify.lang.t(
                            "$vuetify.product.cols.export.titlePNG"
                          )
                        }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="90vh"
                id="domaine_chart"
                style="margin-top: -55px"
              ></canvas>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.titlestat_best_selling"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="3" class="py-0"></v-col>
              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_best_selling"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-start"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.startDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.start_date_best_selling"
                    color="primary"
                    scrollable
                    :max="maxDate"
                    @input="menu4 = false"
                  />
                </v-menu>
              </v-col>

              <v-col cols="12" sm="2" class="py-0">
                <v-menu
                  v-model="menu5"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_best_selling"
                      outlined
                      dense
                      clearable
                      color="primary"
                      class="my-2 font-weight-medium"
                      prepend-inner-icon="mdi-calendar-end"
                      :label="
                        $vuetify.lang.t('$vuetify.bills.cols.endDate.title')
                      "
                      v-bind="attrs"
                      v-on="on"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="form.end_date_best_selling"
                    color="primary"
                    scrollable
                    :max="maxDate"
                    :min="getminDateBestSell"
                    @change="stat_best_selling_products"
                    @input="menu5 = false"
                  />
                </v-menu>
              </v-col>

              <!--              <v-col cols="12" sm="2" class="mb-0 py-0">-->
              <!--                <v-btn-->
              <!--                  class="font-weight-bold my-2 white&#45;&#45;text"-->
              <!--                  @click="stat_best_selling_products()"-->
              <!--                  color="primary"-->
              <!--                  light-->
              <!--                  :loading="loadingBtn"-->
              <!--                  :disabled="-->
              <!--                    form.start_date_best_selling === null ||-->
              <!--                      form.end_date_best_selling === null-->
              <!--                  "-->
              <!--                >-->
              <!--                  {{-->
              <!--                    $vuetify.lang.t(-->
              <!--                      "$vuetify.statistics.sell_month_stat_launch"-->
              <!--                    )-->
              <!--                  }}-->
              <!--                </v-btn>-->
              <!--              </v-col>-->
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-row wrap style="margin-top: -25px">
              <v-spacer></v-spacer>

              <v-col cols="12" sm="3">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{
                    $vuetify.lang.t("$vuetify.statistics.total_gross_margin")
                  }}
                  : {{ Intl.NumberFormat().format(this.gross_margin) }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.statistics.total_ca") }}
                  : {{ Intl.NumberFormat().format(this.turnover) }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.statistics.total_pourcent_ca") }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_pourcent_ca_total * 100) / 100
                    )
                  }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
          <br />
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions,
              }"
              :headers="headers"
              :items="items_best_selling"
              :items-per-page="itemPerPage"
              :loading="loading.list"
              :options.sync="pagination"
              :server-items-length="meta.totalElements"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              item-key="name"
              multi-sort
              class="mb-15"
              style="margin-top: -25px"
            >
              <template v-slot:header.name="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.category="{ header }">
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
              <template v-slot:header.turnover="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.cost_production="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.gross_margin="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <!-- <template v-slot:header.percent_turnover="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template> -->
              <template v-slot:body="{ items }">
                <v-hover>
                  <tbody>
                    <tr :key="item.id" v-for="item in items">
                      <td class="subtitle-2">
                        {{ item.dish__name_language[0].name }}
                      </td>
                      <td class="subtitle-2">
                        {{ item.dish__category__name_language[0].name }}
                      </td>
                      <td class="subtitle-2">
                        {{ item.quantity_served }}
                      </td>
                      <td class="subtitle-2">{{ item.turnover }}</td>
                      <td class="subtitle-2">{{ item.cost_production }}</td>
                      <td class="subtitle-2">{{ item.margin }}</td>
                      <!-- <td class="subtitle-2">
                        {{ (item.turnover / get_ca_total).toFixed(2) }}
                      </td> -->
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
import Vue from "vue";
Vue.component("downloadExcel", JsonExcel);
const FileSaver = require("file-saver");
export default {
  name: "Dashboard",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          medical_act: null,
          productAvailable: null,
          start_date_dom: null,
          start_date: null,
          end_date: null,
          start_date_month: null,
          start_date_month_first: null,
          start_date_channel: null,
          start_date_month_all: null,
          end_date_month_all: null,
          end_date_channel: null,
          end_date_month_first: null,
          end_date_month: null,
          end_date_month_exit: null,
          start_date_month_exit: null,
          start_date_month_payment_method: null,
          end_date_month_payment_method: null,
          start_date_month_entry: null,
          end_date_month_entry: null,
          date_month: null,
          start_date_best_selling: null,
          end_date_dom: null,
          end_date_best_selling: null,
        };
      },
    },
  },
  data() {
    return {
      urlItemsStat_best_selling_products: "/bills/stat_best_selling_products",
      urlItemsStat_day_month: "/bills/stat_day_month",
      urlItems: "/bills/statistic",
      urlItemsDom: "/bills/statistic",
      urlItemsDays: "/bills/statistic_days",
      urlItemsDaysEntry: "/bills/statistic_days_entry",
      urlItemsDaysExit: "/bills/statistic_days_exit",
      urlItemsPayment: "/bills/statistic_payment_method",
      urlItemsPaymentChannel: "/bills/statistic_payment_channel",
      filter: {
        hospital: null,
        start_date: null,
        end_date: null,
      },
      loading: {
        list: false,
        refresh: false,
        filter: false,
      },
      selectedFilter: "today",
      loadingExit: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingEntry: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingPayment: {
        list: false,
        refresh: false,
        filter: false,
      },

      sortBy: "turnover",
      sortDesc: true,
      headers: [],
      events: [],
      items: [],
      itemsDays: [],
      itemsDaysEntry: [],
      itemsDaysExit: [],
      itemsPaymentMethod: [],
      itemsPaymentChannel: [],
      itemsDomaine: [],
      meta: {},
      labels: [],
      values: [],
      isLoadingHospital: false,
      searchHospital: null,
      itemsHospital: [],
      urlHospital: "hospitals",
      turnover: null,
      end_date: null,
      start_date: null,
      gross_margin: null,
      searchAvailable: null,
      isLoadingAvailable: false,
      itemsProductAvailable: [],
      urlProductPlus: "products",
      isLoadingMedical_act: false,
      searchMedical_act: null,
      itemsMedical_act: [],
      items_best_selling_all: [],
      urlMedical_act: "medical_act",
      pagination: {},
      supply: false,
      itemPerPage: 5,
      //itemPerPages: 3,
      itemPerPageOptions: [5, 10, 30],
      maxDateChannel: new Date().toISOString().substr(0, 10),
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateStatMonthAll: new Date().toISOString().substr(0, 10),
      maxDateStatMonthFirst: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 10),
      maxDateStatMonthPayment: new Date().toISOString().substr(0, 10),
      maxDateStatMonthEntry: new Date().toISOString().substr(0, 10),
      maxDateStatMonthExit: new Date().toISOString().substr(0, 10),
      loadingBtn: false,
      chartData: [],
      barChart: [],
      items_best_selling: [],
      menu: false,
      menu3: false,
      menu2: false,
      menu4: false,
      menu5: false,
      menu6: false,
      json_fields: {
        Date: "days",
        CA: "turnover",
      },
      json_fields_dom: {
        Domaine: "category",
        CA: "turnover",
      },
      labelsDays: [],
      valuesDays: [],
      labelsDaysEntry: [],
      valuesDaysEntry: [],
      labelsDaysExit: [],
      valuesDaysExit: [],
      labelsPayment: [],
      valuesPayment: [],
      labelsPaymentChannel: [],
      valuesPaymentChannel: [],
      menu7: false,
      menu9: false,
      menu10: false,
      menu11: false,
      menu12: false,
      menu_channel: false,
      menu_channel_2: false,
      menu13: false,
      menu14: false,
      menu15: false,
      menuAll1: false,
      menuAll2: false,
      chartOptions: {},
      chartOptionsUp: {},
    };
  },
  mounted() {
    this.getItems();
    this.stat_best_selling_products();
    // this.sell_month_stat();
    this.sell_month_dom();
    this.sell_month_day();
    this.sell_month_day_exit();
    this.sell_month_payment_method();
    this.sell_month_payment_channel();
    this.sell_month_day_entry();
    // this.timer = setInterval(this.stat_best_selling_products, 30000);
    // this.timer = setInterval(this.sell_month_day_exit, 30000);
    // this.timer = setInterval(this.sell_month_day_entry, 30000);
    // this.timer = setInterval(this.sell_month_day, 30000);
    // this.timer = setInterval(this.sell_month_dom, 30000);
    // if (window.location.reload()){
    // }
  },
  components: {},
  watch: {
    selectedFilter: {
      immediate: true,
      handler(filter) {
        this.updateDates(filter);
      },
    },
    searchHospital(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingHospital = true;
      this.$store
        .dispatch("request", {
          url: self.urlHospital,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsHospital = response.data.content;
        })
        .finally(() => (this.isLoadingHospital = false));
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
    searchAvailable(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingAvailable = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus,
          params: params,
        })
        .then((response) => {
          self.itemsProductAvailable = response.data.content;
        })
        .finally(() => (this.isLoadingAvailable = false));
    },
    pagination: {
      handler() {
        // this.getItems();
      },
      deep: true,
    },
  },
  created() {
    this.setHeaders();
    // window.addEventListener("beforeunload", function(event) {
    //   console.log("something");
    //   event.returnValue = "Write something";
    //   console.log("something");
    // });
    //this.setItemRoles();
  },
  computed: {
    getminDateChannel() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_channel)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonth() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonthEntry() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month_entry)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonthExit() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month_exit)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonthFirst() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month_first)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonthAll() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month_all)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateMonthPayment() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month_payment_method)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    get_ca_total() {
      let total = 0;
      this.items_best_selling_all.forEach((d) => {
        total += d.turnover;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_gross_margin_total() {
      let total = 0;
      this.items_best_selling_all.forEach((d) => {
        total += d.gross_margin;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_pourcent_ca_total() {
      let total = 0;
      this.items_best_selling_all.forEach((d) => {
        total += d.turnover / this.get_ca_total;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    getMinStatDate() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_dom)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDateBestSell() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_best_selling)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    updateDates(filter) {
      const today = dayjs();

      switch (filter) {
        case "today": {
          this.form.start_date_month_all = new Date(today)
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(today)
            ?.toISOString()
            .substr(0, 10);
          break;
        }
        case "yesterday": {
          const y = today.subtract(1, "day");
          this.form.start_date_month_all = new Date(y)
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(y)
            ?.toISOString()
            .substr(0, 10);
          break;
        }
        case "week_current": {
          this.form.start_date_month_all = new Date(today.startOf("week"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(today.endOf("week"))
            ?.toISOString()
            .substr(0, 10);
          break;
        }
        case "week_previous": {
          const wp = today.subtract(1, "week");
          this.form.start_date_month_all = new Date(wp.startOf("week"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(wp.endOf("week"))
            ?.toISOString()
            .substr(0, 10);

          break;
        }
        case "week_rolling": {
          this.form.start_date_month_all = new Date(
            today.subtract(6, "day").startOf("day")
          )
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(today)
            ?.toISOString()
            .substr(0, 10);

          break;
        }
        case "month_current": {
          this.form.start_date_month_all = new Date(today.startOf("month"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(today.endOf("month"))
            ?.toISOString()
            .substr(0, 10);

          break;
        }
        case "month_previous": {
          const mp = today.subtract(1, "month");
          this.form.start_date_month_all = new Date(mp.startOf("month"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(mp.endOf("month"))
            ?.toISOString()
            .substr(0, 10);

          break;
        }
        case "year_current": {
          this.form.start_date_month_all = new Date(today.startOf("year"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(today.endOf("year"))
            ?.toISOString()
            .substr(0, 10);
          break;
        }
        case "year_previous": {
          const yp = today.subtract(1, "year");
          this.form.start_date_month_all = new Date(yp.startOf("year"))
            ?.toISOString()
            .substr(0, 10);
          this.form.end_date_month_all = new Date(yp.endOf("year"))
            ?.toISOString()
            .substr(0, 10);
          break;
        }
      }

      // Exemple : appel API
      this.performFilter();
    },

    loadStats() {
      console.log(
        "FROM:",
        this.dateFrom.format("YYYY-MM-DD"),
        "TO:",
        this.dateTo.format("YYYY-MM-DD")
      );
    },
    refreshItems() {
      this.stat_best_selling_products();
      // this.sell_month_stat();
      this.sell_month_dom();
      this.sell_month_day();
      this.sell_month_day_exit();
      this.sell_month_payment_method();
      this.sell_month_payment_channel();
      this.sell_month_day_entry();
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.category.title",
          value: "category",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.recipe.cols.quantity.title",
          value: "quantity_served",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.turnover",
          value: "turnover",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.cost_production.title",
          value: "cost_production",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.gross_margin",
          value: "gross_margin",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.statistics.percent_turnover",
        //   value: "percent_turnover",
        //   align: "start",
        //   sortable: true,
        //   width: "1",
        //   class: "grey--text text--darken-3",
        // },
      ];
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.hospital !== null) {
        params["hospital"] = self.filter.hospital;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      Promise.all([
        self.getItems(),
        self.stat_best_selling_products(),
        self.sell_month_dom(),
        self.sell_month_day(),
        self.sell_month_day_exit(),
        self.sell_month_payment_method(),
        self.sell_month_payment_channel(),
        self.sell_month_day_entry(),
      ])
        .catch((err) => {
          console.error("Error fetching filtered data:", err);
          // optionally notify the user with a toast/snackbar
        })
        .finally(() => {
          self.$refs.filterForm.stopLoadingBtn();
          self.loading.list = false;
        });
    },
    getItems() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_day_month,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
            // let statP = Object.entries(self.items?.stat_product);
            // self.chartData =
            //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
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
    getDataForm() {
      let data = {};
      if (this.form.start_date_month_all) {
        data = {
          start_date: this.form.start_date_month_all,
          end_date: this.form.end_date_month_all,
          start_date_month_first: this.form.start_date_month_all,
          start_date_month_all: this.form.start_date_month_all,
          end_date_month_first: this.form.end_date_month_all,
          start_date_channel: this.form.start_date_month_all,
          end_date_channel: this.form.end_date_month_all,
          end_date_month_all: this.form.end_date_month_all,
          start_date_month: this.form.start_date_month_all,
          end_date_month: this.form.end_date_month_all,
          start_date_month_entry: this.form.start_date_month_all,
          end_date_month_entry: this.form.end_date_month_all,
          end_date_month_exit: this.form.end_date_month_all,
          start_date_month_exit: this.form.start_date_month_all,
          start_date_month_payment_method: this.form.start_date_month_all,
          end_date_month_payment_method: this.form.end_date_month_all,
          end_date_dom: this.form.end_date_month_all,
          start_date_dom: this.form.start_date_month_all,
          start_date_best_selling: this.form.start_date_month_all,
          end_date_best_selling: this.form.end_date_month_all,
        };
      } else {
        data = {
          start_date_month_first: this.form.start_date_month_first,
          start_date_month_all: this.form.start_date_month_all,
          end_date_month_first: this.form.end_date_month_first,
          start_date_channel: this.form.start_date_channel,
          end_date_channel: this.form.end_date_channel,
          end_date_month_all: this.form.end_date_month_all,
          start_date_month: this.form.start_date_month,
          end_date_month: this.form.end_date_month,
          start_date_month_entry: this.form.start_date_month_entry,
          end_date_month_entry: this.form.end_date_month_entry,
          end_date_month_exit: this.form.end_date_month_exit,
          start_date_month_exit: this.form.start_date_month_exit,
          start_date_month_payment_method:
            this.form.start_date_month_payment_method,
          end_date_month_payment_method:
            this.form.end_date_month_payment_method,
          end_date_dom: this.form.end_date_dom,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          start_date_dom: this.form.start_date_dom,
          start_date_best_selling: this.form.start_date_best_selling,
          end_date_best_selling: this.form.end_date_best_selling,
        };
      }

      return data;
    },
    // sell_month_stat() {
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     this.loading.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItems,
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         let data = response.data;
    //         let statP = Object.entries(data.content.stat_domaine);
    //         this.barChart =
    //           statP.length === 1
    //             ? []
    //             : Object.entries(data.content.stat_domaine);
    //         resolve(response);
    //       })
    //       .catch(err => {
    //         let message = this.$vuetify.lang.t("$vuetify.error_occured");
    //         if (err.response) {
    //           if (err.response.status === 400) {
    //             self.setApiFormErrors(err.response.data.data);
    //             message = self.$vuetify.lang.t("$vuetify.error_form");
    //           } else if (err.response.status === 403) {
    //             message = self.$vuetify.lang.t("$vuetify.error_denied");
    //           } else if (err.response.status === 500) {
    //             message = self.$vuetify.lang.t("$vuetify.error_server");
    //           }
    //         }
    //         self.$store.dispatch("showNotification", {
    //           status: true,
    //           text: message
    //         });
    //         reject(err);
    //       })
    //       .then(() => {
    //         self.loading.list = false;
    //         resolve();
    //       });
    //   });
    // },
    stat_best_selling_products() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_best_selling_products,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            self.items_best_selling = data.content.product;
            self.turnover = data.content.turnover;
            self.gross_margin = data.content.gross_margin;
            // let statP = Object.entries(data.content)
            // this.chartData=statP.length===1? []:Object.entries(data.content);
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
    sell_month_dom() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDom,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            self.itemsDomaine = response.data;
            let chartStatus = Chart.getChart("domaine_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labels = [];
            this.values = [];
            for (const prop of data.content) {
              this.labels.push(prop.dish__category__name);
              this.values.push(prop.total_amount);
            }
            new Chart(document.getElementById("domaine_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labels,
                datasets: [
                  {
                    label: "Chiffre d'affaires",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    pointBackgroundColor: "black",
                    data: this.values,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
    sell_month_day() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDays,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDays = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("day_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDays = [];
            this.valuesDays = [];
            for (const prop of data.content) {
              this.labelsDays.push(prop.days);
              this.valuesDays.push(prop.turnover);
            }
            new Chart(document.getElementById("day_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDays,
                datasets: [
                  {
                    label: "Chiffre d'affaires",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDays,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
    export_month_day() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDays,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    export_image_month_day() {
      let canvas = document.getElementById("day_chart").toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    sell_month_day_entry() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingEntry.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDaysEntry,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDaysEntry = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("day_entry_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDaysEntry = [];
            this.valuesDaysEntry = [];
            for (const prop of data.content) {
              this.labelsDaysEntry.push(prop.days);
              this.valuesDaysEntry.push(prop.turnover);
            }
            new Chart(document.getElementById("day_entry_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDaysEntry,
                datasets: [
                  {
                    label: "Montant",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDaysEntry,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
            self.loadingEntry.list = false;
            resolve();
          });
      });
    },
    export_month_day_entry() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDaysEntry,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    export_image_month_day_entry() {
      let canvas = document
        .getElementById("day_entry_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    sell_month_day_exit() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingExit.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDaysExit,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsDaysExit = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("day_exit_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsDaysExit = [];
            this.valuesDaysExit = [];
            for (const prop of data.content) {
              this.labelsDaysExit.push(prop.days);
              this.valuesDaysExit.push(prop.turnover);
            }
            new Chart(document.getElementById("day_exit_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsDaysExit,
                datasets: [
                  {
                    label: "Montant",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesDaysExit,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
            self.loadingExit.list = false;
            resolve();
          });
      });
    },
    sell_month_payment_method() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingPayment.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsPayment,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsPaymentMethod = response.data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("payment_method_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsPayment = [];
            this.valuesPayment = [];
            for (const prop of data.content) {
              this.labelsPayment.push(
                this.$vuetify.lang.t(
                  "$vuetify.bills.cols.payment_method." + prop.category
                )
              );
              this.valuesPayment.push(prop.turnover);
            }
            new Chart(document.getElementById("payment_method_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsPayment,
                datasets: [
                  {
                    label: "Montant",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesPayment,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
            self.loadingPayment.list = false;
            resolve();
          });
      });
    },
    sell_month_payment_channel() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingPayment.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsPaymentChannel,
            method: self.getMethod(),
            params: params,
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            this.itemsPaymentChannel = data;
            // let statP = Object.entries
            // (data.content.stat_category);

            let chartStatus = Chart.getChart("payment_channel_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labelsPaymentChannel = [];
            this.valuesPaymentChannel = [];
            for (const prop of data.content) {
              this.labelsPaymentChannel.push(
                this.$vuetify.lang.t(
                  "$vuetify.bills.cols.bill_type." + prop.category
                )
              );
              this.valuesPaymentChannel.push(prop.turnover);
            }
            new Chart(document.getElementById("payment_channel_chart"), {
              type: "bar",
              plugins: [ChartDataLabels],
              options: {
                plugins: {
                  datalabels: {
                    display: true,
                    align: "middle",
                    color: "white",
                    font: {
                      size: 15,
                    },
                  },
                },
              },
              data: {
                labels: this.labelsPaymentChannel,
                datasets: [
                  {
                    label: "Montant",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
                    data: this.valuesPaymentChannel,
                    borderWidth: 3,
                  },
                ],
              },
            });
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
            self.loadingPayment.list = false;
            resolve();
          });
      });
    },
    export_month_day_exit() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDaysExit,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    export_month_payment_method() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDaysExit,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    export_channel() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsChannel,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    export_image_month_day_exit() {
      let canvas = document
        .getElementById("day_exit_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_image_month_payment_method() {
      let canvas = document
        .getElementById("payment_method_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_image_month_payment_channel() {
      let canvas = document
        .getElementById("payment_channel_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_image_domaine() {
      let canvas = document
        .getElementById("domaine_chart")
        .toDataURL("image/png");
      let link = document.createElement("a");
      link.download = "image";
      link.href = canvas;
      link.click();
    },
    export_domaine() {
      let self = this;
      const params = {};
      params["type"] = "pdf";
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsDom,
          params: params,
          data: self.getDataForm(),
          method: self.getMethod(),
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Statistiques mensuel";
          let blob = new Blob([response.data], { type: response.data.type });
          // const objectUrl = URL.createObjectURL(blob);
          FileSaver.saveAs(blob, fileName);
          // this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
  },
};
</script>

<style scoped>
.overlap-icon {
  position: absolute;
  top: -33px;
  text-align: center;
  padding-top: 12px;
}
</style>
