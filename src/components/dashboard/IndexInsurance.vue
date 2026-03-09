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
    <v-card height="50px" flat color="#FAFAFA">
      <br />
      <v-card-text>
        <v-row wrap>
          <v-col cols="12" sm="2" style="margin-top: -22px">
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
          <v-col cols="12" sm="10" class="mb-0 py-0"> </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row wrap style="margin-top: 5px">
      <!-- <v-col cols="12" sm="12" style="margin-top:-25px">
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
                    <span style="color: white;font-size: 18px">{{
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
      <v-col cols="12" sm="12" style="margin-top:-25px">
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
                    <span style="color: white;font-size: 18px">{{
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
      </v-col> -->
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
      <!-- <v-col cols="12" sm="12" style="margin-top:-25px">
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                      <span style="color: white;font-size: 15px"
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
                    <span style="color: red;font-size: 15px" v-else
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
                    <span style="color: white;font-size: 18px"
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
                    <span style="color: white;font-size: 18px"
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
      </v-col> -->
      <v-col
        cols="12"
        sm="12"
        style="margin-top: -25px"
        v-if="this.$auth.user().type_enterprise === 'HOSPITAL'"
      >
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
                    <span style="color: white; font-size: 18px"
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
                      <span style="color: white; font-size: 15px"
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
                    <span style="color: red; font-size: 15px" v-else
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
                    <span style="color: white; font-size: 18px"
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
                      <span style="color: white; font-size: 15px"
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
                    <span style="color: red; font-size: 15px" v-else
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
          </v-col>
          <v-col lg="4" cols="6">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="pink darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
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
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.product.stat.cumulative_month_unpaid"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
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
      </v-col>
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
              <v-col cols="12" sm="5">
                <v-menu
                  ref="menu7"
                  v-model="menu7"
                  :close-on-content-click="false"
                  :return-value.sync="form.date_month"
                  transition="scale-transition"
                  offset-y
                  class="white--text"
                  max-width="290px"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.date_month"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      outlined
                      :label="
                        $vuetify.lang.t('$vuetify.statistics.cols.month.title')
                      "
                      dense
                      background-color="white"
                      style="width: 200px; margin-top: -10px"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date_month"
                    type="month"
                    no-title
                    :max="maxDate"
                    class="white--text"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu7 = false">
                      {{ $vuetify.lang.t("$vuetify.btn.cancel") }}
                    </v-btn>
                    <v-btn text color="primary" @click="sell_month_day()">
                      {{ $vuetify.lang.t("$vuetify.ok") }}
                    </v-btn>
                  </v-date-picker>
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
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px">
                  {{ $vuetify.lang.t("$vuetify.statistics.sell_month_dom") }}
                </h3>
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
                      v-model="form.start_date_month"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.start_appointment_date.title'
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
                    v-model="form.start_date_month"
                    :max="maxDateStatMonth"
                    color="primary"
                    @change="sell_month_dom"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-menu
                  v-model="menu6"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_month"
                      color="primary"
                      class="font-weight-bold"
                      prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.appointment.cols.end_appointment_date.title'
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
                    v-model="form.end_date_month"
                    :max="maxDateStatMonth"
                    :min="getminDateMonth"
                    color="primary"
                    @change="sell_month_dom"
                    @input="menu6 = false"
                  ></v-date-picker>
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
          <!-- <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left:15px;" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.statistics.titlestat_best_selling"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.medical_act"
                  :items="itemsMedical_act"
                  :loading="isLoadingMedical_act"
                  :search-input.sync="searchMedical_act"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  style="max-width: 300px"
                  :label="
                    $vuetify.lang.t('$vuetify.bills.cols.medical_act.title')
                  "
                  class="font-weight-bold my-2"
                  outlined
                  dense
                  @change="stat_best_selling_products"
                  clearable
                  :disabled="this.form.productAvailable !== null"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.productAvailable"
                  :items="itemsProductAvailable"
                  :loading="isLoadingAvailable"
                  :search-input.sync="searchAvailable"
                  color="primary"
                  item-text="name"
                  item-value="id"
                  outlined
                  dense
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold my-2"
                  clearable
                  @change="stat_best_selling_products"
                  :disabled="this.form.medical_act !== null"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu4"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_best_selling"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-start mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.meeting.cols.startDate.title'
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
                    v-model="form.start_date_best_selling"
                    :max="maxDate"
                    color="primary"
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu5"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_best_selling"
                      color="primary"
                      class="font-weight-bold my-2"
                      prepend-inner-icon="mdi-clock-end mdi-dark mdi-18px"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.meeting.cols.endDate.title'
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
                    v-model="form.end_date_best_selling"
                    :max="maxDate"
                    :min="getminDateBestSell"
                    color="primary"
                    @change="stat_best_selling_products"
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col> -->

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
          <!-- </v-row>
          </v-card-text> -->
          <!-- <v-card-text>
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
                  : {{ Intl.NumberFormat().format(this.gross_margin) }} -->
          <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
          <!-- </v-chip>
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
                  : {{ Intl.NumberFormat().format(this.turnover) }} -->
          <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
          <!-- </v-chip>
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
                  }} -->
          <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
          <!-- </v-chip>
              </v-col>
            </v-row>
          </v-card-text> -->
          <!-- <br />
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions
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
              <template v-slot:header.gross_margin="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.percent_turnover="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:body="{ items }">
                <v-hover>
                  <tbody>
                    <tr :key="item.id" v-for="item in items">
                      <td class="subtitle-2">{{ item.name }}</td>
                      <td class="subtitle-2">
                        {{ item.category }}
                      </td>
                      <td class="subtitle-2">
                        {{ item.quantity_served }}
                      </td>
                      <td class="subtitle-2">{{ item.turnover }}</td>
                      <td class="subtitle-2">{{ item.gross_margin }}</td>
                      <td class="subtitle-2">
                        {{ (item.turnover / get_ca_total).toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
           -->
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import JsonExcel from "vue-json-excel";
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
          start_date_month: null,
          end_date_month: null,
          date_month_exit: null,
          date_month_entry: null,
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
      // urlItemsStat_best_selling_products: "/bills/stat_best_selling",
      urlItemsStat_day_month: "/bills/stat_day_month",
      urlItems: "/bills/statistic_insurance",
      urlItemsDom: "/bills/statistic_insurance",
      urlItemsDays: "/bills/statistic_days_insuance",
      // urlItemsDaysEntry: "/bills/statistic_days_entry",
      // urlItemsDaysExit: "/bills/statistic_days_exit",
      loading: {
        list: false,
        refresh: false,
        filter: false,
      },
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

      sortBy: "turnover",
      sortDesc: true,
      headers: [],
      events: [],
      items: [],
      itemsDays: [],
      itemsDaysEntry: [],
      itemsDaysExit: [],
      itemsDomaine: [],
      meta: {},
      labels: [],
      values: [],
      turnover: null,
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
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 10),
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
      menu7: false,
      menu9: false,
      menu10: false,
      chartOptions: {},
      chartOptionsUp: {},
    };
  },
  mounted() {
    this.getItems();
    // this.stat_best_selling_products();
    // this.sell_month_stat();
    this.sell_month_dom();
    this.sell_month_day();
    // this.sell_month_day_exit();
    // this.sell_month_day_entry();
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
        this.getItems();
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
    getminDateMonth() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_month)
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
    refreshItems() {
      // this.stat_best_selling_products();
      // this.sell_month_stat();
      this.sell_month_dom();
      this.sell_month_day();
      // this.sell_month_day_exit();
      // this.sell_month_day_entry();
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
          text: "$vuetify.category.cols.medical_areas.title",
          value: "category",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.cols.quantity_served.title",
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
          text: "$vuetify.statistics.gross_margin",
          value: "gross_margin",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.statistics.percent_turnover",
          value: "percent_turnover",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getItems() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_day_month,
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
      let data = {
        start_date_month: this.form.start_date_month,
        end_date_month: this.form.end_date_month,
        date_month_entry: this.form.date_month_entry,
        date_month_exit: this.form.date_month_exit,
        date_month: this.form.date_month,
        start_date_dom: this.form.start_date_dom,
        medical_act: this.form.medical_act,
        product_available: this.form.productAvailable,
        start_date_best_selling: this.form.start_date_best_selling,
        end_date_best_selling: this.form.end_date_best_selling,
        end_date_dom: this.form.end_date_dom,
      };
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

    // stat_best_selling_products() {
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     this.loading.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItemsStat_best_selling_products,
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         let data = response.data;
    //         if (data.content.medical_act.length > 30) {
    //           data.content.medical_act.length = 30;
    //           self.turnover = data.content.turnover;
    //           self.gross_margin = data.content.gross_margin;
    //           self.items_best_selling = data.content.medical_act;
    //         } else {
    //           self.items_best_selling = data.content.medical_act;
    //           self.turnover = data.content.turnover;
    //           self.gross_margin = data.content.gross_margin;
    //         }
    //         // let statP = Object.entries(data.content)
    //         // this.chartData=statP.length===1? []:Object.entries(data.content);
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
    sell_month_dom() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDom,
            method: self.getMethod(),
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
              this.labels.push(prop.category);
              this.values.push(prop.turnover);
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
      this.$refs.menu7.save(this.form.date_month);
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsDays,
            method: self.getMethod(),
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
    // sell_month_day_entry() {
    //   this.$refs.menu9.save(this.form.date_month_entry);
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     this.loadingEntry.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItemsDaysEntry,
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         let data = response.data;
    //         this.itemsDaysEntry = response.data;
    //         // let statP = Object.entries
    //         // (data.content.stat_category);

    //         let chartStatus = Chart.getChart("day_entry_chart");
    //         if (chartStatus !== undefined) {
    //           chartStatus.destroy();
    //         }
    //         this.labelsDaysEntry = [];
    //         this.valuesDaysEntry = [];
    //         for (const prop of data.content) {
    //           this.labelsDaysEntry.push(prop.days);
    //           this.valuesDaysEntry.push(prop.turnover);
    //         }
    //         new Chart(document.getElementById("day_entry_chart"), {
    //           type: "bar",
    //           plugins: [ChartDataLabels],
    //           options: {
    //             plugins: {
    //               datalabels: {
    //                 display: true,
    //                 align: 'middle',
    //                 color: 'white',
    //                 font: {
    //                   size: 15,
    //                 },
    //               },
    //             },
    //           },
    //           data: {
    //             labels: this.labelsDaysEntry,
    //             datasets: [
    //               {
    //                 label: "Montant",
    //                 backgroundColor: ["#006B98"],
    //                 borderColor: ["#E9EEF4"],
    //                 data: this.valuesDaysEntry,
    //                 borderWidth: 3
    //               }
    //             ]
    //           }
    //         });
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
    //         self.loadingEntry.list = false;
    //         resolve();
    //       });
    //   });
    // },
    // export_month_day_entry() {
    //   let self = this;
    //   const params = {};
    //   params["type"] = "pdf";
    //   if (!this._.isEmpty(this._search)) {
    //     this._search = this._.merge(params, this._search);
    //   }
    //   self.$store
    //     .dispatch("request", {
    //       url: self.urlItemsDaysEntry,
    //       params: params,
    //       data: self.getDataForm(),
    //       method: self.getMethod(),
    //       responseType: "blob"
    //     })
    //     .then(response => {
    //       let fileName = "Statistiques mensuel";
    //       let blob = new Blob([response.data], { type: response.data.type });
    //       // const objectUrl = URL.createObjectURL(blob);
    //       FileSaver.saveAs(blob, fileName);
    //       // this.editPdf(objectUrl);
    //       // this.dialogFormExport.shows.showFilter = false;
    //     });
    //   this.$store.dispatch("showNotification", {
    //     statut: false
    //   });
    // },
    // export_image_month_day_entry() {
    //   let canvas = document
    //     .getElementById("day_entry_chart")
    //     .toDataURL("image/png");
    //   let link = document.createElement("a");
    //   link.download = "image";
    //   link.href = canvas;
    //   link.click();
    // },
    // sell_month_day_exit() {
    //   this.$refs.menu10.save(this.form.date_month_exit);
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     this.loading.list = true;
    //     self.$store
    //       .dispatch("request", {
    //         url: self.urlItemsDaysExit,
    //         method: self.getMethod(),
    //         data: self.getDataForm()
    //       })
    //       .then(response => {
    //         let data = response.data;
    //         this.itemsDaysExit = response.data;
    //         // let statP = Object.entries
    //         // (data.content.stat_category);

    //         let chartStatus = Chart.getChart("day_exit_chart");
    //         if (chartStatus !== undefined) {
    //           chartStatus.destroy();
    //         }
    //         this.labelsDaysExit = [];
    //         this.valuesDaysExit = [];
    //         for (const prop of data.content) {
    //           this.labelsDaysExit.push(prop.days);
    //           this.valuesDaysExit.push(prop.turnover);
    //         }
    //         new Chart(document.getElementById("day_exit_chart"), {
    //           type: "bar",
    //           plugins: [ChartDataLabels],
    //           options: {
    //             plugins: {
    //               datalabels: {
    //                 display: true,
    //                 align: 'middle',
    //                 color: 'white',
    //                 font: {
    //                   size: 15,
    //                 },
    //               },
    //             },
    //           },
    //           data: {
    //             labels: this.labelsDaysExit,
    //             datasets: [
    //               {
    //                 label: "Montant",
    //                 backgroundColor: ["#006B98"],
    //                 borderColor: ["#E9EEF4"],
    //                 data: this.valuesDaysExit,
    //                 borderWidth: 3
    //               }
    //             ]
    //           }
    //         });
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
    //         self.loadingExit.list = false;
    //         resolve();
    //       });
    //   });
    // },
    // export_month_day_exit() {
    //   let self = this;
    //   const params = {};
    //   params["type"] = "pdf";
    //   if (!this._.isEmpty(this._search)) {
    //     this._search = this._.merge(params, this._search);
    //   }
    //   self.$store
    //     .dispatch("request", {
    //       url: self.urlItemsDaysExit,
    //       params: params,
    //       data: self.getDataForm(),
    //       method: self.getMethod(),
    //       responseType: "blob"
    //     })
    //     .then(response => {
    //       let fileName = "Statistiques mensuel";
    //       let blob = new Blob([response.data], { type: response.data.type });
    //       // const objectUrl = URL.createObjectURL(blob);
    //       FileSaver.saveAs(blob, fileName);
    //       // this.editPdf(objectUrl);
    //       // this.dialogFormExport.shows.showFilter = false;
    //     });
    //   this.$store.dispatch("showNotification", {
    //     statut: false
    //   });
    // },
    // export_image_month_day_exit() {
    //   let canvas = document
    //     .getElementById("day_exit_chart")
    //     .toDataURL("image/png");
    //   let link = document.createElement("a");
    //   link.download = "image";
    //   link.href = canvas;
    //   link.click();
    // },
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
