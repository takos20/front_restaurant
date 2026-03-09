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
              :label="$vuetify.lang.t('$vuetify.meeting.cols.startDate.title')"
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
              :label="$vuetify.lang.t('$vuetify.meeting.cols.endDate.title')"
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
    <v-row wrap style="margin-top: -15px">
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
                      items.sale_of_the_day_domaine === null
                        ? 0
                        : Math.round(items.sale_of_the_day_domaine * 100) / 100
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_sale_of_the_day_domaine >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(
                              items.back_sale_of_the_day_domaine * 100
                            ) / 100
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
                          Math.round(items.back_sale_of_the_day_domaine * 100) /
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
          <v-col lg="3" cols="6">
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
          </v-col>
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
          <v-col lg="4" cols="6">
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
          <v-col lg="4" cols="6">
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
          <v-col lg="4" cols="6">
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.startDate.title')
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
                        $vuetify.lang.t('$vuetify.meeting.cols.endDate.title')
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

              o
            </v-row></v-card-text
          ></v-card
        ></v-col
      ></v-row
    >
  </div>
</template>
