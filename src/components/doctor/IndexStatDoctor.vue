<template>
  <div>
    <div
      class="title mb-5 black--text green lighten-5 text-center"
      style="height: 30px; margin-top: 30px"
    >
      DR. {{ this.$route.params.name }}
    </div>
    <br />
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
    <v-row wrap>
      <v-col cols="12" sm="12">
        <v-row>
          <v-col lg="3" cols="4">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-1" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.doctor.cols.statistiques.patient_month"
                      )
                    }}</strong>
                    <br />
                    <br />
                    <span style="color: white; font-size: 18px">{{
                      items.patient_month === null ? 0 : items.patient_month
                    }}</span>
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br />
                    <br />
                    <div v-if="items.back_patient >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_patient * 100) / 100
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
                          Math.round(items.back_patient * 100) / 100
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
          <v-col lg="3" cols="4">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="cyan darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.doctor.cols.statistiques.CA_month"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.CA_month === null ? 0 : items.CA_month
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_ca >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{ Math.round(items.back_ca * 100) / 100 }} %</strong
                        ><v-btn icon small>
                          <v-icon size="10" color="white"
                            >mdi-arrow-up-bold</v-icon
                          >
                        </v-btn></span
                      >
                    </div>
                    <span style="color: red; font-size: 15px" v-else
                      ><strong
                        >{{ Math.round(items.back_ca * 100) / 100 }} %</strong
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
          <v-col lg="3" cols="4">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="green darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.doctor.cols.statistiques.share")
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.share === null ? 0 : items.share
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_share >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_share * 100) / 100
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
                        >{{ Math.round(items.back_ca * 100) / 100 }} %</strong
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
          <v-col lg="3" cols="4">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card color="blue darken-2" :elevation="hover ? 16 : 2">
                <v-card-text
                  class="d-flex justify-space-between align-center white--text"
                >
                  <div>
                    <strong>{{
                      $vuetify.lang.t(
                        "$vuetify.doctor.cols.statistiques.acts_carried_out"
                      )
                    }}</strong>
                    <br /><br />
                    <span style="color: white; font-size: 18px"
                      ><strong>{{
                        items.acts_carried_out === null
                          ? 0
                          : items.acts_carried_out
                      }}</strong></span
                    >
                  </div>
                  <div>
                    <strong>{{
                      $vuetify.lang.t("$vuetify.product.stat.back")
                    }}</strong>
                    <br /><br />
                    <div v-if="items.back_acts_carried >= 0">
                      <span style="color: white; font-size: 15px"
                        ><strong
                          >{{
                            Math.round(items.back_acts_carried * 100) / 100
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
                          Math.round(items.back_acts_carried * 100) / 100
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
    </v-row>
    <v-row wrap>
      <v-col cols="12" sm="6" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.doctor.cols.statistiques.medical_areas"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
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
                      v-model="form.start_date"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.start_date"
                    :max="maxDate"
                    color="primary"
                    @change="stat_medical_areas"
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
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
                      v-model="form.end_date"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.end_date"
                    :max="maxDate"
                    :min="getminDate"
                    @change="stat_medical_areas"
                    color="primary"
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions,
              }"
              :headers="headers"
              :items="items_medical_areas"
              :items-per-page="itemPerPage"
              :loading="loading.list"
              :options.sync="pagination"
              :server-items-length="meta.totalElements"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              item-key="name"
              class="mb-15"
              style="margin-top: -25px"
            >
              <template v-slot:header.medical_areas="{ header }">
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
              <template v-slot:header.quotas="{ header }">
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
                      <td class="subtitle-2">
                        {{ item.category }}
                      </td>
                      <td class="subtitle-2">{{ item.turnover }}</td>
                      <td class="subtitle-2">{{ item.gross_margin }}</td>
                      <td class="subtitle-2">{{ item.turnover / 100 }}</td>
                      <td class="subtitle-2">
                        {{ item.coef_doc * item.turnover }}
                      </td>
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="mt-5">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.doctor.cols.statistiques.acts_carried_out"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-menu
                  v-model="menu_act"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_act"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.start_date_act"
                    :max="maxDateAct"
                    color="primary"
                    @change="stat_medical_act"
                    @input="menu_act = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-menu
                  v-model="menu_act2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_act"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.end_date_act"
                    :max="maxDateAct"
                    :min="getminDateAct"
                    color="primary"
                    @change="stat_medical_act"
                    @input="menu_act2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions,
              }"
              :headers="headersAct"
              :items="items_medical_act"
              :items-per-page="itemPerPage"
              :loading="loading.list"
              :options.sync="pagination"
              :server-items-length="meta.totalElements"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              item-key="name"
              class="mb-15"
              style="margin-top: -25px"
            >
              <template v-slot:header.medical_act="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.number="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr> </template
              ><template v-slot:header.turnover="{ header }">
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
              <template v-slot:header.quotas="{ header }">
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
                      <td class="subtitle-2">{{ item.number }}</td>
                      <td class="subtitle-2">{{ item.turnover }}</td>
                      <td class="subtitle-2">{{ item.gross_margin }}</td>
                      <td class="subtitle-2">{{ item.turnover / 100 }}</td>
                      <td class="subtitle-2">
                        {{ item.coef_doc * item.turnover }}
                      </td>
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row wrap style="margin-top: -40px">
      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="8" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.doctor.cols.statistiques.CA_month_kf"
                    )
                  }}
                </h3>
              </v-col>

              <v-col cols="12" sm="4" class="mb-0 py-0 my-2">
                <v-menu
                  v-model="menu"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.stat_date_month"
                      color="primary"
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.statistics.sell_month_stat_date'
                        )
                      "
                      prepend-inner-icon="mdi-calendar mdi-dark mdi-18px"
                      class="font-weight-bold"
                      outlined
                      v-bind="attrs"
                      v-on="on"
                      dense
                      readonly
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.stat_date_month"
                    color="primary"
                    :max="maxDateStatMonth"
                    type="month"
                    @change="sell_month_mecdical_act"
                    @input="menu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-card-text>
              <canvas
                height="100vh"
                id="doctor_chart"
                style="margin-top: -50px"
              ></canvas>
            </v-card-text>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <h3 style="padding-left: 15px" class="my-4">
                  {{
                    $vuetify.lang.t(
                      "$vuetify.doctor.cols.statistiques.patients_treated"
                    )
                  }}
                </h3>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-menu
                  v-model="menu_patient"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.start_date_patient"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.start_date_patient"
                    :max="maxDatePatient"
                    color="primary"
                    @change="stat_doctor_patient"
                    @input="menu_patient = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="4" class="mb-0 py-0">
                <v-menu
                  v-model="menu_patient2"
                  color="primary"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.end_date_patient"
                      color="primary"
                      class="font-weight-bold my-2"
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
                    v-model="form.end_date_patient"
                    :max="maxDatePatient"
                    :min="getminDatePatient"
                    color="primary"
                    @change="stat_doctor_patient"
                    @input="menu_patient2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :footer-props="{
                'items-per-page-options': itemPerPageOptions,
              }"
              :headers="headersPatient"
              :items="items_doctor_patient"
              :items-per-page="itemPerPage"
              :loading="loading.list"
              :options.sync="pagination"
              :server-items-length="meta.totalElements"
              :sort-by="sortByPatient"
              :sort-desc="sortDesc"
              item-key="name"
              class="mb-15"
              style="margin-top: -25px"
            >
              <template v-slot:header.patient="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.net_payable="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr> </template
              ><template v-slot:header.advance="{ header }">
                <tr>
                  {{
                    $vuetify.lang.t(header.text)
                  }}
                </tr>
              </template>
              <template v-slot:header.balance="{ header }">
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
                      <td class="subtitle-2">{{ item.net_payable }}</td>
                      <td class="subtitle-2">{{ item.advances }}</td>
                      <td class="subtitle-2">{{ item.balance }}</td>
                    </tr>
                  </tbody>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <surgery color="black"></surgery>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <radiography color="black"></radiography>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <pregnant color="black"></pregnant>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <laboratory color="black"></laboratory>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <investigation color="black"></investigation>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <diagnostic color="black"></diagnostic>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <consultation color="black"></consultation>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" class="mt-10">
        <v-card>
          <v-card-text>
            <certificat color="black"></certificat>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import Surgery from "./IndexSurgery";
import Radiography from "./IndexRadiography";
import Pregnant from "./IndexPregnant";
import Laboratory from "./IndexLaboratory";
import Investigation from "./IndexInvestigation";
import Diagnostic from "./IndexDiagnostic";
import Consultation from "./IndexConsultation";
import Certificat from "./IndexCertificat";
export default {
  name: "Dashboard",
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          stat_date_month: new Date().toISOString().substring(0, 7),
          start_date_cat: null,
          start_date: null,
          start_date_act: null,
          start_date_patient: null,
          end_date_cat: null,
          end_date_act: null,
          end_date_patient: null,
          end_date: null,
        };
      },
    },
  },
  data() {
    return {
      urlItemsStat_medical_areas: "/bills/stat_medical_areas",
      urlItemsStat_medical_act: "/bills/stat_medical_act",
      urlItemsStat_doctor_patient: "/bills/stat_doctor_patient",
      urlItemsStat_month_doctor: "/bills/stat_month_doctor",
      urlItems: "/bills/statistic_product",
      urlItemsMedicalActMonth: "/bills/statistic_doctor_turnover",
      loading: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingMonth: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingMedical: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingAct: {
        list: false,
        refresh: false,
        filter: false,
      },
      loadingDP: {
        list: false,
        refresh: false,
        filter: false,
      },
      sortBy: "turnover",
      sortByPatient: "net_payable",
      headers: [],
      headersAct: [],
      headersPatient: [],
      events: [],
      items: [],
      labels: [],
      values: [],
      meta: {},
      pagination: {},
      supply: false,
      sortDesc: true,
      itemPerPage: 5,
      //itemPerPages: 3,
      itemPerPageOptions: [5, 10, 30],
      maxDate: new Date().toISOString().substr(0, 10),
      maxDateAct: new Date().toISOString().substr(0, 10),
      maxDatePatient: new Date().toISOString().substr(0, 10),
      maxDateStatMonth: new Date().toISOString().substr(0, 7),
      loadingBtn: false,
      chartData: [],
      barChart: [],
      items_medical_areas: [],
      items_medical_act: [],
      items_doctor_patient: [],
      menu: false,
      menu3: false,
      menu2: false,
      menu4: false,
      menu_act: false,
      menu_patient: false,
      menu_act2: false,
      menu_patient2: false,
      menu5: false,
      chartOptions: {},
    };
  },
  mounted() {
    this.getItems();
    this.stat_medical_areas();
    this.stat_medical_act();
    this.stat_doctor_patient();
    // this.sell_month_stat();
    this.sell_month_mecdical_act();
  },
  created() {
    this.setHeaders();
    this.setHeadersAct();
    this.setHeadersPatient();

    //this.setItemRoles();
  },
  watch: {
    pagination: {
      handler() {
        this.getItems();
      },
      deep: true,
    },
  },
  components: {
    Surgery,
    Radiography,
    Pregnant,
    Laboratory,
    Investigation,
    Diagnostic,
    Consultation,
    Certificat,
  },
  computed: {
    getMinStatDate() {
      let minDateStat = "";
      minDateStat = new Date(this.form.start_date_cat)
        ?.toISOString()
        .substr(0, 10);
      return minDateStat;
    },
    getminDate() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
    getminDateAct() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_act)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
    getminDatePatient() {
      let minDateBestSell = "";
      minDateBestSell = new Date(this.form.start_date_patient)
        ?.toISOString()
        .substr(0, 10);
      return minDateBestSell;
    },
  },
  methods: {
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.medical_areas.title",
          value: "medical_areas",
          align: "start",
          sortable: true,
          width: "15",
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
        {
          text: "$vuetify.statistics.quotas",
          value: "quotas",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    setHeadersAct() {
      this.headersAct = [
        {
          text: "$vuetify.medical_act.title",
          value: "medical_act",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.medical_act.number",
          value: "number",
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
        {
          text: "$vuetify.statistics.quotas",
          value: "quotas",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    setHeadersPatient() {
      this.headersPatient = [
        {
          text: "$vuetify.patients_settlements.cols.patient_name.title",
          value: "patient",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.net_payable.title",
          value: "net_payable",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.advance.title",
          value: "advance",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.bills.cols.balance.title",
          value: "balance",
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
            url:
              self.urlItemsStat_month_doctor + "?id=" + this.$route.params.id,
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
        stat_date_month: this.form.stat_date_month,
        start_date_dom: this.form.start_date_cat,
        start_date: this.form.start_date,
        start_date_act: this.form.start_date_act,

        start_date_patient: this.form.start_date_patient,
        end_date_patient: this.form.end_date_patient,

        start_date_certificat: this.form.start_date_certificat,
        end_date_certificat: this.form.end_date_certificat,

        start_date_consultation: this.form.start_date_consultation,
        end_date_consultation: this.form.end_date_consultation,

        start_date_diagnostic: this.form.start_date_diagnostic,
        end_date_diagnostic: this.form.end_date_diagnostic,

        start_date_investigation: this.form.start_date_investigation,
        end_date_investigation: this.form.end_date_investigation,

        start_date_laboratory: this.form.start_date_laboratory,
        end_date_laboratory: this.form.end_date_laboratory,

        start_date_pregnant: this.form.start_date_pregnant,
        end_date_pregnant: this.form.end_date_pregnant,

        start_date_radiography: this.form.start_date_radiography,
        end_date_radiography: this.form.end_date_radiography,

        start_date_surgery: this.form.start_date_surgery,
        end_date_surgery: this.form.end_date_surgery,

        doctor: this.$route.params.id,
        end_date: this.form.end_date,
        end_date_act: this.form.end_date_act,
        end_date_dom: this.form.end_date_cat,
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
    //         let statP = Object.entries(data.content.stat_category);
    //         this.barChart =
    //           statP.length === 1
    //             ? []
    //             : Object.entries(data.content.stat_category);
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
    stat_medical_areas() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingMedical.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_medical_areas,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            if (data.content.length > 50) {
              data.content.length = 50;
              self.items_medical_areas = data.content;
            } else {
              self.items_medical_areas = data.content;
            }

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
            self.loadingMedical.list = false;
            resolve();
          });
      });
    },
    stat_medical_act() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingAct.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_medical_act,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            if (data.content.length > 50) {
              data.content.length = 50;
              self.items_medical_act = data.content;
            } else {
              self.items_medical_act = data.content;
            }

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
            self.loadingAct.list = false;
            resolve();
          });
      });
    },
    stat_doctor_patient() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingDP.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsStat_doctor_patient,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            if (data.content.length > 50) {
              data.content.length = 50;
              self.items_doctor_patient = data.content;
            } else {
              self.items_doctor_patient = data.content;
            }

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
            self.loadingDP.list = false;
            resolve();
          });
      });
    },
    sell_month_mecdical_act() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loadingMonth.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsMedicalActMonth + "?id=" + this.$route.params.id,
            method: self.getMethod(),
            data: self.getDataForm(),
          })
          .then((response) => {
            let data = response.data;
            let chartStatus = Chart.getChart("doctor_chart");
            if (chartStatus !== undefined) {
              chartStatus.destroy();
            }
            this.labels = [];
            this.values = [];
            for (const prop of data.content) {
              this.labels.push(prop.category);
              this.values.push(prop.turnover);
            }
            new Chart(document.getElementById("doctor_chart"), {
              type: "bar",
              data: {
                labels: this.labels,
                datasets: [
                  {
                    label: "Chiffre d'affaires",
                    backgroundColor: ["#006B98"],
                    borderColor: ["#E9EEF4"],
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
            self.loadingMonth.list = false;
            resolve();
          });
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
