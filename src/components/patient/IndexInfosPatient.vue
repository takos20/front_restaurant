<template>
  <div>
    <div
      class="title mb-5 black--text green lighten-5 text-center"
      style="height: 30px; margin-top: 30px"
    >
      {{ $vuetify.lang.t("$vuetify.storage_depots.title") }}:{{
        this.$route.params.name
      }}
    </div>
    <v-card class="pb-4" style="margin-top: 35px">
      <div class="mt-5 mx-5">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="2"
            md="3"
            v-if="_.includes($auth.user().permissions, 'view_stock_available')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="showAvailable() + getItemsStock()"
              color="primary"
              dark
              block
            >
              <v-icon left>mdi-archive</v-icon>
              <v-icon left style="margin-left: -10px">mdi-check-bold</v-icon>
              {{
                $vuetify.lang.t(
                  "$vuetify.stock_management.title_stocks_available"
                )
              }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="2"
            md="3"
            v-if="_.includes($auth.user().permissions, 'view_stock_movement')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="showStock_movements() + getStockMovement()"
              color="primary"
              dark
              block
            >
              <v-icon left>mdi-archive</v-icon>
              <v-icon left style="margin-left: -10px"
                >mdi-arrow-split-vertical</v-icon
              >
              {{
                $vuetify.lang.t(
                  "$vuetify.stock_management.title_stocks_movements"
                )
              }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="2"
            md="3"
            v-if="_.includes($auth.user().permissions, 'view_inventory')"
          >
            <template>
              <v-btn
                class="mr-2 my-2"
                @click="showInventory() + getInventory()"
                color="primary"
                dark
                block
              >
                <v-icon left>mdi-shape</v-icon>
                <v-icon left style="margin-left: -10px"
                  >mdi-arrow-split-vertical</v-icon
                >
                {{
                  $vuetify.lang.t("$vuetify.stock_management.title_inventories")
                }}
              </v-btn>
            </template>
          </v-col>
          <v-col
            cols="12"
            sm="2"
            md="3"
            v-if="_.includes($auth.user().permissions, 'view_items_movements')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="showItemMovements"
              color="primary"
              dark
              block
            >
              <v-icon left>mdi-arrow-split-horizontal</v-icon>
              {{
                $vuetify.lang.t(
                  "$vuetify.stock_management.title_item_movements"
                )
              }}
            </v-btn>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showStock_available"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_available')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_stocks_available") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showStocks_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_movement')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_stocks_movements") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showInventories"
      v-if="_.includes(this.$auth.user().permissions, 'view_inventory')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_inventories") }}
    </div>
    <div
      class="title mb-5 black--text lighten-5 text-center"
      style="height: 30px; margin-top: 30px; background-color: #e9eef4"
      v-show="showItem_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_items_movements')"
    >
      {{ $vuetify.lang.t("$vuetify.stock_management.title_item_movements") }}
    </div>
    <div
      v-show="showStock_available"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_available')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <v-form>
            <v-row wrap>
              <!--              <v-col cols="12" sm="2" class="mb-0 py-0">-->
              <!--                <v-btn-->
              <!--                  :loading="loadingStockAvailable.refresh"-->
              <!--                  @click="refreshItemsAvailable()"-->
              <!--                  class="mr-2 my-2"-->
              <!--                  depressed-->
              <!--                  color="#f1f5fc"-->
              <!--                >-->
              <!--                  <v-icon left color="primary">mdi-refresh</v-icon>-->
              <!--                  {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
              <!--                </v-btn>-->
              <!--              </v-col>-->
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-autocomplete
                  v-model="formData.productAvailable"
                  :items="itemsProductAvailable"
                  :loading="isLoadingAvailable"
                  :search-input.sync="searchAvailable"
                  color="primary"
                  return-object
                  item-text="product_name"
                  item-value="id"
                  @change="getItemsStock"
                  :label="
                    $vuetify.lang.t('$vuetify.supplies.cols.product_name.title')
                  "
                  class="font-weight-bold my-2"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2" class="mb-0 py-0">
                <v-menu
                  v-model="menu5"
                  color="primary"
                  ::close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.date"
                      color="primary"
                      class="font-weight-bold my-2"
                      outlined
                      :label="
                        $vuetify.lang.t(
                          '$vuetify.statistics.sell_month_stat_date'
                        )
                      "
                      v-bind="attrs"
                      v-on="on"
                      dense
                      clearable
                      readonly
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.date"
                    :max="maxDate"
                    color="primary"
                    @change="getItemsStock"
                    @input="menu5 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!--              <v-menu bottom right transition="scale-transition" style="margin-left: 450px">-->
              <!--                <template v-slot:activator="{ on }">-->
              <!--                  <v-btn icon v-on="on">-->
              <!--                    <v-icon size="30">mdi-menu</v-icon>-->
              <!--                  </v-btn>-->
              <!--                </template>-->
              <!--                <v-list class="menu-app-bar">-->
              <!--                <v-list-item>-->
              <!--                  <download-excel-->
              <!--                      class="btn btn-default"-->
              <!--                      :data="itemsStock_available"-->
              <!--                      :fields="json_fields"-->
              <!--                      worksheet="My Worksheet"-->
              <!--                      name="Liste des categories.xls"-->
              <!--                  >-->
              <!--                    <v-btn color="success" class="mr-6">-->
              <!--                      Export xls <i class="mdi mdi-export-variant" aria-hidden="true"></i>-->
              <!--                    </v-btn>-->
              <!--                  </download-excel>-->
              <!--                </v-list-item>-->
              <!--              </v-list><v-list class="menu-app-bar">-->
              <!--                <v-list-item>-->
              <!--                  <vue-json-to-csv-->
              <!--                      :json-data="itemsStock_available"-->
              <!--                      :labels="{ code: { title: 'Code' },name: { title: 'Name' },billable: { title: 'Facturable' } }"-->
              <!--                      :csv-title="'Liste des categories'"-->
              <!--                  >-->
              <!--                    <v-btn color="success" class="mr-6">-->
              <!--                      Export csv <i class="mdi mdi-export-variant" aria-hidden="true"></i>-->
              <!--                    </v-btn>-->
              <!--                  </vue-json-to-csv>-->

              <!--                </v-list-item>-->
              <!--              </v-list>-->
              <!--              </v-menu>-->

              <!--              <v-col cols="12" sm="3" class="mb-0 py-0">-->
              <!--                <v-btn-->
              <!--                  class="my-2 white&#45;&#45;text"-->
              <!--                  @click="getItemsStock()"-->
              <!--                  color="teal darken-1"-->
              <!--                  light-->
              <!--                  :loading="loadingBtn"-->
              <!--                >-->
              <!--                  {{-->
              <!--                    $vuetify.lang.t(-->
              <!--                      "$vuetify.item_movements.cols.period_of.title5"-->
              <!--                    )-->
              <!--                  }}-->
              <!--                </v-btn> </v-col-->
              <!--              >-->
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <download-excel
                  class="btn btn-default"
                  :data="stockAvailableWithTotal"
                  :fields="json_fields"
                  worksheet="My Worksheet"
                  name="Liste des categories.xls"
                >
                  <v-btn color="teal darken-1" class="mt-2 white--text">
                    Export xls
                    <i class="mdi mdi-export-variant" aria-hidden="true"></i>
                  </v-btn>
                </download-excel>
              </v-col>
            </v-row>
            <v-row wrap>
              <v-col cols="12" sm="6">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{ $vuetify.lang.t("$vuetify.product.cols.quantity.titleT") }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_quantity_total * 100) / 100
                    )
                  }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6">
                <v-chip
                  class="subtitle-1 font-weight-bold green lighten-5"
                  text-color="black"
                  color="#f1f5fc"
                  medium
                  label
                >
                  {{
                    $vuetify.lang.t("$vuetify.product.cols.quantity.amountT")
                  }}
                  :
                  {{
                    Intl.NumberFormat().format(
                      Math.round(get_amount_total * 100) / 100
                    )
                  }}
                  <!--{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}-->
                </v-chip>
              </v-col></v-row
            >
          </v-form>
          <v-spacer></v-spacer>
        </div>
      </v-card>

      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersStock_available"
          :items="stockAvailableWithTotal"
          :items-per-page="itemPerPage"
          :loading="loadingStockAvailable.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
          v-show="showStock_available"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.dci1="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.shape="{ header }">
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
          <template v-slot:header.conditioning="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.cmup="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.amount="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:body="{ items }">
            <!--<v-hover>-->
            <tbody>
              <tr :key="item.id" v-for="item in items">
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.code }}
                </td>
                <td class="subtitle-2" v-else>
                  {{ item.code }}
                </td>
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.name }}
                </td>
                <td class="subtitle-2" v-else>{{ item.name }}</td>
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.dci1.name }}
                </td>
                <td class="subtitle-2" v-else>{{ item.dci1.name }}</td>
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.shape.name }}
                </td>
                <td class="subtitle-2" v-else>{{ item.shape.name }}</td>
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.category.name }}
                </td>
                <td class="subtitle-2" v-else>{{ item.category.name }}</td>
                <td class="subtitle-2" v-if="item.product">
                  {{ item.product.conditioning }}
                </td>
                <td class="subtitle-2" v-else>{{ item.conditioning }}</td>
                <td class="subtitle-2">{{ item.qte_stock }}</td>
                <td class="subtitle-2">
                  {{ item.cmup.toFixed(2) }}
                </td>
                <td class="subtitle-2">
                  {{ item.subtotal }}
                </td>
              </tr>
            </tbody>
            <!--</v-hover>-->
          </template>
        </v-data-table>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItems"
        ></delete-item>
      </v-card>
    </div>
    <div
      v-show="showStocks_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_stock_movement')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <template
            v-if="_.includes($auth.user().permissions, 'add_stock_movement')"
          >
            <v-btn
              class="mr-2 my-2"
              @click="createMovement()"
              color="primary"
              dark
            >
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loadingStockMovement.refresh"
            @click="refreshStockMovement()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-btn
            color="teal darken-1"
            @click="showExportMovement()"
            class="white--text"
          >
            {{ $vuetify.lang.t("$vuetify.product.cols.export.title") }}

            <v-icon right dark>mdi-export-variant</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </div>
      </v-card>
      <br />
      <v-card class="pb-4">
        <v-card-title>
          <div class="title">
            {{ $vuetify.lang.t("$vuetify.stock_movement.filter") }}
          </div>
        </v-card-title>
        <v-card-text>
          <v-row wrap>
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-select
                v-model="filter.type_movement"
                color="primary"
                :items="optionMovement.type_Movement"
                :label="
                  $vuetify.lang.t('$vuetify.cash_movement.cols.type.title')
                "
                dense
                prepend-inner-icon="mdi-account-supervisor-circle"
                outlined
                @change="performFilterMovement"
                class="font-weight-bold"
                clearable
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions style="margin-top: -30px">
          <v-spacer></v-spacer>
          <v-btn dark color="primary" @click="exportPrint()">
            <v-icon color="white" left>mdi-printer</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePrint") }}
          </v-btn>
          <v-btn dark color="primary" @click="exportPDF()">
            <v-icon color="white" left>mdi-file</v-icon>
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titlePDF") }}
          </v-btn>
          <v-btn dark color="primary" @click="performExportMovement">
            {{ $vuetify.lang.t("$vuetify.product.cols.export.titleXLS") }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersStock_movement"
          :items="itemsStock_movement"
          :items-per-page="itemPerPage"
          :loading="loading.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.date_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.type_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.reason_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.product_code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr> </template
          ><template v-slot:header.movement_value="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.create_date="{ header }">
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
                  <td class="subtitle-2">{{ item.code }}</td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2">
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="item.type_movement === 'ENTRY'"
                      >
                        <v-icon
                          color="teal darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon> </template
                      ><template
                        v-slot:activator="{ on }"
                        v-else-if="item.type_movement === 'TRANSFER'"
                      >
                        <v-icon
                          color="green darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                      <template v-slot:activator="{ on }" v-else>
                        <v-icon
                          color="red accent-4"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </td>
                  <td class="subtitle-2">
                    {{ item.reason_movement }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.product_code }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.movement_value }}
                  </td>
                  <td class="subtitle-2">
                    <template>
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes(
                              $auth.user().permissions,
                              'change_stock_movement'
                            )
                          "
                        >
                          <v-btn
                            @click="editStock_movement(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon>mdi-update</v-icon>
                          </v-btn>
                        </template>
                        <span>{{ $vuetify.lang.t("$vuetify.btn.edit") }}</span>
                      </v-tooltip>
                      <!--                    <v-tooltip top>-->
                      <!--                      <template-->
                      <!--                        v-slot:activator="{ on }"-->
                      <!--                        v-if="$auth.check(['ADMIN'])"-->
                      <!--                      >-->
                      <!--                        <v-icon-->
                      <!--                          @click="detailsCash(item)"-->
                      <!--                          color="secondary"-->
                      <!--                          v-on="on"-->
                      <!--                          dark-->
                      <!--                          v-show="$vuetify.breakpoint.smAndDown || hover"-->
                      <!--                        >-->
                      <!--                          mdi-clipboard-outline-->
                      <!--                        </v-icon>-->
                      <!--                      </template>-->
                      <!--                      <span>-->
                      <!--                        {{ $vuetify.lang.t("$vuetify.cash_movement.title") }}-->
                      <!--                      </span>-->
                      <!--                    </v-tooltip>-->
                      <v-tooltip bottom>
                        <template
                          v-slot:activator="{ on }"
                          v-if="
                            _.includes(
                              $auth.user().permissions,
                              'delete_stock_movement'
                            )
                          "
                        >
                          <v-btn
                            @click="deleteItem(item)"
                            color="red"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                            dark
                          >
                            <v-icon>mdi-delete-outline</v-icon>
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
        <form-movement
          :dialog="dialogFormStock_movement"
          :form="form"
          :messages="messages"
          @getItems="getStockMovement"
          ref="stock_movementForm"
        ></form-movement>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItems"
        ></delete-item>
      </v-card>
    </div>
    <div
      v-show="showInventories"
      v-if="_.includes(this.$auth.user().permissions, 'view_inventory')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <!--          <template-->
          <!--            v-if="_.includes(this.$auth.user().permissions, 'add_inventory')"-->
          <!--          >-->
          <!--            <v-btn-->
          <!--              class="mr-2 my-2"-->
          <!--              @click="createInventory()"-->
          <!--              color="primary"-->
          <!--              dark-->
          <!--            >-->
          <!--              {{ $vuetify.lang.t("$vuetify.btn.add") }}-->
          <!--            </v-btn>-->
          <!--          </template>-->
          <v-btn
            :loading="loadingInventory.refresh"
            @click="refreshInventory()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-spacer></v-spacer>
        </div>
      </v-card>
      <v-card>
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersInventory"
          :items="itemsInventory"
          :items-per-page="itemPerPage"
          :loading="loadingInventory.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.date_inventory="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.reason_inventory="{ header }">
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
                  <td class="subtitle-2">{{ item.code }}</td>
                  <td class="subtitle-2">
                    {{ $moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2">
                    {{ item.reason_inventory }}
                  </td>

                  <td class="subtitle-2">
                    <template>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            @click="editInventory(item)"
                            color="secondary"
                            icon
                            text
                            v-on="on"
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                          >
                            <v-icon>mdi-update</v-icon>
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
                            v-show="$vuetify.breakpoint.smAndDown || hover"
                            dark
                          >
                            <v-icon>mdi-delete-outline</v-icon>
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
        <form-inventory
          :dialog="dialogFormInventory"
          :form="form"
          :messages="messages"
          @getItems="getInventory"
          ref="inventoryForm"
        ></form-inventory>
        <delete-item
          :dialog="dialogDelete"
          :messages="messagesDelete"
          :urlItems="urlDeleteItems"
          @getItems="getItems"
        ></delete-item>
      </v-card>
    </div>
    <div
      v-show="showItem_movements"
      v-if="_.includes(this.$auth.user().permissions, 'view_items_movements')"
    >
      <v-card class="pb-4">
        <div class="mt-5 mx-5">
          <template>
            <v-form>
              <v-row wrap>
                <v-col cols="12" sm="2" class="mb-0 py-0">
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
                        v-model="formData.start_date"
                        color="primary"
                        class="font-weight-bold my-2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.item_movements.cols.period_of.title'
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
                      v-model="formData.start_date"
                      :max="maxDate"
                      @change="getItemBills"
                      color="primary"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-menu
                    v-model="menu2"
                    color="primary"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formData.end_date"
                        color="primary"
                        class="font-weight-bold my-2"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.item_movements.cols.period_of.title2'
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
                      v-model="formData.end_date"
                      :min="getMinStartDate"
                      :max="maxDate"
                      @change="getItemBills"
                      color="primary"
                      @input="menu2 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="2" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="formData.product"
                    :items="itemsProduct"
                    :loading="isLoading"
                    :search-input.sync="search"
                    color="primary"
                    return-object
                    item-text="product_name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.supplies.cols.product_name.title'
                      )
                    "
                    class="font-weight-bold my-2"
                    outlined
                    dense
                    clearable
                    @change="getItemBills"
                  ></v-autocomplete>
                </v-col>
                <!--                <v-col cols="12" sm="1" class="mb-0 py-0">-->
                <!--                <v-chip-->
                <!--                  class="subtitle-1 font-weight-bold my-3"-->
                <!--                  text-color="black"-->
                <!--                  color="#f1f5fc"-->
                <!--                  medium-->
                <!--                  label-->
                <!--                >-->
                <!--                  {{-->
                <!--                    $vuetify.lang.t(-->
                <!--                      "$vuetify.item_movements.cols.period_of.title"-->
                <!--                    )-->
                <!--                  }}-->
                <!--                  :-->
                <!--                  &lt;!&ndash;{{ sum_zero| numberformat(locale, 0, "currency", "XAF")  }}&ndash;&gt;-->
                <!--                </v-chip>-->
                <!--                </v-col>-->

                <!--                <v-col cols="12" sm="2" class="mb-0 py-0">-->
                <!--                  <v-select-->
                <!--                      v-model="formData.optionExport"-->
                <!--                      color="primary"-->
                <!--                      :items="optionsExport.type_Export"-->
                <!--                      prepend-inner-icon="mdi-file mdi-dark mdi-18px"-->
                <!--                      class="font-weight-bold my-2"-->
                <!--                      outlined-->
                <!--                      dense-->
                <!--                      :disabled="-->
                <!--                      formData.product === null ||-->
                <!--                        formData.start_date === null ||-->
                <!--                        formData.end_date === null-->
                <!--                    "-->
                <!--                  ></v-select>-->
                <!--                </v-col>-->
                <v-col cols="12" sm="1" class="mb-0 py-0"
                  ><v-btn
                    class="font-weight-bold my-2 white--text"
                    @click="exportItemMovement()"
                    color="teal darken-1"
                    light
                    :loading="loadingBtn"
                    :disabled="
                      formData.product === null ||
                      formData.start_date === null ||
                      formData.end_date === null
                    "
                  >
                    {{
                      $vuetify.lang.t(
                        "$vuetify.item_movements.cols.period_of.title4"
                      )
                    }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </template>
          <v-spacer></v-spacer>
        </div>
      </v-card>

      <v-card class="pb-4">
        <v-data-table
          :footer-props="{
            'items-per-page-options': itemPerPageOptions,
          }"
          :headers="headersItemBills"
          :items="itemsItemBills"
          :items-per-page="itemPerPage"
          :loading="loadingItemBills.list"
          :options.sync="pagination"
          :server-items-length="meta.totalElements"
          :sort-by="sortBy"
          :sort-desc="sortDesc"
          item-key="name"
          class="mt-5"
        >
          <template v-slot:header.code="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.type_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.name="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.date_movement="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.stock_initial="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:header.quantity_used="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>
          <template v-slot:header.quantity="{ header }">
            <tr>
              {{
                $vuetify.lang.t(header.text)
              }}
            </tr>
          </template>

          <template v-slot:body="{ items }">
            <v-hover>
              <tbody>
                <tr :key="key" v-for="(item, key) in items">
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.bills.code }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.supplies.code }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.stock_movement.code }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ $vuetify.lang.t("$vuetify.bills.bills") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ $vuetify.lang.t("$vuetify.supplies.title") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ $vuetify.lang.t("$vuetify.stock_movement.title") }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.bills.patient.name }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.supplies.suppliers.name }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    <v-tooltip top>
                      <template
                        v-slot:activator="{ on }"
                        v-if="item.stock_movement.type_movement === 'ENTRY'"
                      >
                        <v-icon
                          color="teal darken-1"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.stock_movement.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                      <template v-slot:activator="{ on }" v-else>
                        <v-icon
                          color="red accent-4"
                          class="pointer"
                          dark
                          v-on="on"
                          style="font-size: 15px"
                        >
                          {{
                            $vuetify.lang.t(
                              "$vuetify.cash_movement.cols.type." +
                                item.stock_movement.type_movement
                            )
                          }}
                        </v-icon>
                      </template>
                    </v-tooltip>
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ $moment(item.bills.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ $moment(item.supplies.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{
                      $moment(item.stock_movement.createdAt).format(
                        "YYYY-MM-DD"
                      )
                    }}
                    {{ item.timeAt }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>

                  <td class="subtitle-2">
                    {{ item.stock_initial }}
                  </td>

                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.quantity_served }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
                  <td class="subtitle-2" v-if="item.bills">
                    {{ item.stock_initial - item.quantity_served }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.supplies">
                    {{ item.stock_initial + item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else-if="item.stock_movement">
                    {{ item.stock_initial + item.quantity }}
                  </td>
                  <td class="subtitle-2" v-else>/</td>
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
      </v-card>
      <form-inv
        :dialog="dialogFormInv"
        ref="invForm"
        :messages="messagesInv"
      ></form-inv>
      <form-invent :dialog="dialogFormInvent" ref="invForm"></form-invent>
    </div>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormInvent from "./../bills/IsInventory";
// import FormUser from "./Form";
import DeleteItem from "./../Common/Delete";
const FileSaver = require("file-saver");
// import VueJsonToCsv from "vue-json-to-csv";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  mixins: [ListMixin],
  data: () => ({
    maxDate: new Date().toISOString().substr(0, 10),
    formData: {
      start_date: null,
      end_date: null,
      product: null,
      productAvailable: null,
      date: null,
      optionExport: null,
    },
    optionMovement: {
      type_Movement: [],
    },
    itemsStock_available: [],
    itemsStock_movement: [],
    itemsInventory: [],
    itemsItemBills: [],
    itemsItemSupplies: [],
    itemsItemStock_movement: [],
    headersStock_available: [],
    headersItemStock_movement: [],
    headersItemSupplies: [],
    headersItemBills: [],
    headersStock_movement: [],
    headersInventory: [],
    itemsProduct: [],
    messagesInv: {
      type: Object,
      default: function () {
        return {
          title: "",
          success: "",
          submit: "",
        };
      },
    },
    isInventory: false,
    dialogFormInvent: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItemsCash: "cashs/isOpen",
    showStock_available: false,
    showStocks_movements: false,
    showInventories: false,
    showItem_movements: false,
    urlProduct: "products",
    urlProductPlus: "details_stocks/all",
    urlItemsBills: "details_bills/get_items",
    urlItemsSupplies: "details_supplies/get_items",
    urlItemsStock_movement: "details_stock_movement/get_items",
    urlItemsExportStock_movement: "stock_movements",
    urlItemsStock: "details_stocks/stock_available",
    urlStock_movement: "stock_movements",
    urlInventory: "inventories",
    sortBy: ["createdAt", "timeAt"],
    menu5: false,
    menu2: false,
    search: null,
    isLoading: false,
    searchAvailable: null,
    isLoadingAvailable: false,
    itemsProductAvailable: [],
    menu: false,
    optionsExport: {
      type_Export: [],
    },
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    loadingStockAvailable: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingBtn: false,
    loadingItemStock_movement: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingItemSupplies: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingItemBills: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingInventory: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingStockMovement: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    json_fields: {
      Code: "product.code",
      Name: "product.name",
      DCI: "product.dci1.name",
      Forme: "product.shape.name",
      Categorie: "product.category.name",
      Conditionnement: "product.conditioning",
      Quantite: "qte_stock",
      CMUP: "cmup",
      MontantT: "total",
    },
    dialogFormInventory: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormExportMovement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormFilterMov: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormStock_movement: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogDelete: {
      show: false,
    },
    dialogDetail: {
      show: false,
    },
    dialogEnt: {
      show: false,
    },
    exports: {
      id: null,
      type_movement: null,
      email: null,
      code: null,
      password: null,
      role: null,
      is_active: null,
    },
    form: {
      type_movement: null,
      role: null,
    },
    filter: {
      type_movement: null,
      role: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.storage_depots.delete.success",
    },
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlProductPlus + "?storage_depots=" + this.$route.params.id,
          params: params,
        })
        .then((response) => {
          self.itemsProduct = response.data.content;
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
          url: self.urlProductPlus + "?storage_depots=" + this.$route.params.id,
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
    this.setHeadersItemBills();
    this.setHeadersItemSupplies();
    this.setHeadersItemStock_movement();
    this.getOptionsExport();
    this.getOptionsMovement();

    //this.setItemRoles();
  },
  methods: {
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement_stock, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    editPdf(objectUrl) {
      this.dialogFormPdf.show = true;
      this.$refs.pdfForm.setForm(objectUrl);
    },
    exportPrint() {
      let self = this;
      const params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          // let fileName = "Listes des Porduits";
          let blob = new Blob([response.data], { type: response.data.type });
          const objectUrl = URL.createObjectURL(blob);
          // FileSaver.saveAs(blob, fileName);
          this.editPdf(objectUrl);
          // this.dialogFormExport.shows.showFilter = false;
        });
      this.$store.dispatch("showNotification", {
        statut: false,
      });
    },
    exportPDF() {
      let self = this;
      const params = {};
      if (self.filter.category !== null) {
        params["category"] = self.filter.category;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/print",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Listes des produits";
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
    showExportMovement() {
      this.dialogFormExportMovement.shows.showFilter = true;
    },
    performExportMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getItemsExportMovement();

      // .then(() => {
      //   self.$refs.exportForm.closeDialog();
      // })
      // .finally(() => {
      //   self.$refs.exportForm.stopLoadingBtn();
      // });
    },
    getItemsExportMovement() {
      let self = this;
      let params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      self.$store
        .dispatch("request", {
          url: self.urlItemsExportStock_movement + "/export",
          params: params,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Liste des mouvements de stock";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
          this.dialogFormExportMovement.shows.showFilter = false;
        });
    },
    currentInventory() {
      this.dialogFormInvent.show = true;
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
            self.isInventory = data.content.is_inventory;
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    // searchBarcode() {
    //   axios
    //       .get('api/Products/SearchProductBarcode/' + this.code)
    //       .then(function(response) {
    //         this.addDetail(response.data)
    //       })
    //       .catch(function(error) {
    //         console.log(error)
    //       })
    // },
    resetDate() {
      this.formData.date = null;
      this.menu5 = false;
      this.$refs.menu5.save(this.formData.date);
    },
    getOptionsExport() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.export, (type_Export) => {
        self.optionsExport.type_Export.push({
          text: self.$vuetify.lang.t(type_Export.text),
          value: type_Export.value,
        });
      });
    },
    itemMovement() {
      // let self = this;
      // this.getItemBills();
      // this.getItemStock_movement();
      // this.getItemSupplies();
      this.loadingItemBills.refresh = true;
      this.getItemBills()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingItemBills.refresh = false;
        });
      // this.loadingItemSupplies.refresh = true;
      // this.getItemSupplies()
      //   .then(() => {})
      //   .catch(() => {})
      //   .then(() => {
      //     self.loadingItemSupplies.refresh = false;
      //   });
      // this.loadingItemStock_movement.refresh = true;
      // this.getItemStock_movement()
      //   .then(() => {})
      //   .catch(() => {})
      //   .then(() => {
      //     self.loadingItemStock_movement.refresh = false;
      //   });
    },
    exportItemMovement() {
      let self = this;
      self.$store
        .dispatch("request", {
          url:
            self.urlProduct +
            "/" +
            "export_items" +
            "?product=" +
            this.formData.product.product.id +
            "&start_date=" +
            this.formData.start_date +
            "&end_date=" +
            this.formData.end_date +
            "&id=" +
            this.$route.params.id,
          //   +
          // "&optionExport=" +
          // this.formData.optionExport,
          responseType: "blob",
        })
        .then((response) => {
          let fileName = "Historique des sessions";
          let blob = new Blob([response.data], { type: response.data.type });
          FileSaver.saveAs(blob, fileName);
        });
    },
    getDataForm() {
      let data = {
        product: this.formData.product.product["id"],
        end_date: this.formData.end_date,
        storage_depots: this.$route.params.id,
        start_date: this.formData.start_date,
      };
      return data;
    },
    getMethod() {
      //this.reset = this.form.id === undefined
      return this.form.id ? "PUT" : "POST";
    },
    getItemBills() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      params["storage_depots"] = this.$route.params.id;
      if (self.formData.start_date !== null) {
        params["start_date"] = self.formData.start_date;
      }
      if (self.formData.end_date !== null) {
        params["end_date"] = self.formData.end_date;
      }
      if (self.formData.product !== null) {
        params["product"] = self.formData.product.product.id;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loadingItemBills.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsStock_movement,
            method: "GET",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsItemBills = data.content.bills;
            // self.itemsItemSupplies = data.content.supplies;
            // self.itemsItemStock_movement = data.content.stock;
            self.meta = { totalElements: data.totalElements };
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
            self.loadingItemBills.list = false;
            resolve();
          });
      });
    },

    setHeadersItemBills() {
      this.headersItemBills = [
        {
          text: "$vuetify.bills.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "80",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.expenses_nature.title",
          value: "type_movement",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.stock_initial.title",
          value: "stock_initial",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.quantity_used.title",
          value: "quantity_used",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.bills.cols.pub.title",
        //   value: "pub",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.delivery.title",
        //   value: "delivery",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.pun.title",
        //   value: "pun",
        //   align: "start",
        //   sortable: true,
        //   width: "80",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.amount_gross.title",
        //   value: "amount_gross",
        //   align: "start",
        //   sortable: true,
        //   width: "100",
        //   class: "grey--text text--darken-3"
        // },
        // {
        //   text: "$vuetify.bills.cols.amount_net.title",
        //   value: "amount_net",
        //   align: "start",
        //   sortable: true,
        //   width: "60",
        //   class: "grey--text text--darken-3"
        // }

        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    setHeadersItemSupplies() {
      this.headersItemSupplies = [
        {
          text: "$vuetify.supplies.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "80",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.supplier.title",
          value: "suppliers",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.created.title",
          value: "createdAt",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.stock_initial.title",
          value: "stock_initial",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.arrival_price.title",
          value: "arrival_price",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    setHeadersItemStock_movement() {
      this.headersItemStock_movement = [
        {
          text: "$vuetify.stock_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "150",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.stock_initial.title",
          value: "stock_initial",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "100",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.unit_price.title",
          value: "unit_price",
          align: "start",
          sortable: true,
          width: "20",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.total_amount.title",
          value: "total_amount",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.stock_movement.cols.created.title",
        //   value: "create_date",
        //   align: "start",
        //   sortable: true,
        //   width: "105",
        //   class: "grey--text text--darken-3"
        // },
      ];
    },
    // refreshItemsAvailable() {
    //   let self = this;
    //   this.loadingStockAvailable.refresh = true;
    //   this.getItemsStock()
    //     .then(() => {})
    //     .catch(() => {})
    //     .then(() => {
    //       self.loadingStockAvailable.refresh = false;
    //     });
    // },
    refreshInventory() {
      let self = this;
      this.loadingInventory.refresh = true;
      this.getInventory()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingInventory.refresh = false;
        });
    },
    refreshStockMovement() {
      let self = this;
      this.loadingStockMovement.refresh = true;
      this.getStockMovement()
        .then(() => {})
        .catch(() => {})
        .then(() => {
          self.loadingStockMovement.refresh = false;
        });
    },
    getItemsStock() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      // console.log(page);
      // console.log(itemsPerPage);
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (self.formData.date !== null) {
        params["date"] = self.formData.date;
      }
      if (self.formData.productAvailable !== null) {
        params["product"] = self.formData.productAvailable.product.id;
      }
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlItemsStock + "?id=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsStock_available = data.content;
            self.meta = { totalElements: data.totalElements };
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
    getInventory() {
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
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url: self.urlInventory + "?storage_depots=" + this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsInventory = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content);
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
    getStockMovement() {
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
        this.loading.list = true;
        //console.log("ls params", params);
        //console.log("Sorts", sortBy, sortDesc);
        self.$store
          .dispatch("request", {
            url:
              self.urlStock_movement +
              "?storage_depots=" +
              this.$route.params.id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsStock_movement = data.content;
            self.meta = { totalElements: data.totalElements };
            // console.log("meta", data.content);
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
    showAvailable() {
      this.showStock_available = true;
      this.showItem_movements = false;
      this.showStocks_movements = false;
      this.showInventories = false;
    },
    showStock_movements() {
      if (this.isInventory == false) {
        this.showStocks_movements = true;
        this.showStock_available = false;
        this.showItem_movements = false;
        this.showInventories = false;
      } else {
        this.currentInventory();
      }

      // this.getItemsMovement();
    },
    showInventory() {
      if (this.isInventory == true) {
        this.createInventory();
      } else {
        this.createInv();
        this.showInventories = true;
        this.showStock_available = false;
        this.showItem_movements = false;
        this.showStocks_movements = false;
      }
    },
    showItemMovements() {
      this.showItem_movements = true;
      this.showStock_available = false;
      this.showStocks_movements = false;
      this.showInventories = false;
    },
    createInv() {
      this.dialogFormInv.show = true;
      this.messagesInv = {
        title: "$vuetify.cash_movement.title_warning_cash",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    setHeaders() {
      this.headersStock_available = [
        {
          text: "$vuetify.product.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.name.title",
          value: "name",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.product.cols.dci1.title",
          value: "dci1",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.product.cols.shape.title",
          value: "shape",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.category.title",
          value: "category",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.conditioning.title",
          value: "conditioning",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.quantity.title",
          value: "quantity",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.cmup.title",
          value: "cmup",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.amount.title",
          value: "amount",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
      ];
    },
    setHeadersStock_movement() {
      this.headersStock_movement = [
        {
          text: "$vuetify.stock_movement.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.date_movement.title",
          value: "date_movement",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.type_movement.title",
          value: "type_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },

        {
          text: "$vuetify.stock_movement.cols.reason_movement.title",
          value: "reason_movement",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.product_code.title",
          value: "product_code",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.stock_movement.cols.movement_value.title",
          value: "movement_value",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "12",
        },
      ];
    },
    setHeadersInventory() {
      this.headersInventory = [
        {
          text: "$vuetify.inventory.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.date_inventory.title",
          value: "date_inventory",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.inventory.cols.reason_inventory.title",
          value: "reason_inventory",
          align: "start",
          sortable: true,
          width: "1",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.product.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "12",
        },
      ];
    },
    createMovement() {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.new.title",
        submit: "$vuetify.stock_movement.new.submit",
        success: "$vuetify.stock_movement.new.success",
      };
    },
    createInventory() {
      this.dialogFormInventory.show = true;
      this.messages = {
        title: "$vuetify.inventory.new.title",
        submit: "$vuetify.inventory.new.submit",
        success: "$vuetify.inventory.new.success",
      };
    },
    editStock_movement(item) {
      this.dialogFormStock_movement.show = true;
      this.messages = {
        title: "$vuetify.stock_movement.update.title",
        submit: "$vuetify.stock_movement.update.submit",
        success: "$vuetify.stock_movement.update.success",
      };
      this.$refs.stock_movementForm.setForm(item);
    },
    editInventory(item) {
      this.dialogFormInventory.show = true;
      this.messages = {
        title: "$vuetify.inventory.update.title",
        submit: "$vuetify.inventory.update.submit",
        success: "$vuetify.inventory.update.success",
      };
      this.$refs.inventoryForm.setForm(item);
    },
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    showFilterMovement() {
      this.dialogFormFilterMov.shows.showFilter = true;
    },
    getItems() {
      let self = this;
      let url;
      url =
        this.$auth.user().type == "DOCTOR"
          ? self.urlItems +
            "?doctor=" +
            this.$auth.user().doctor.id +
            "&&patient=" +
            this.id
          : self.urlItems + "?patient=" + this.id;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: url,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
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
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
      }
      if (self.filter.role !== null) {
        params["role"] = self.filter.role;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self
        .getItems()
        .then(() => {
          self.$refs.filterForm.closeDialog();
        })
        .finally(() => {
          self.$refs.filterForm.stopLoadingBtn();
        });
    },
    performFilterMovement() {
      let self = this;
      let params = {};
      if (self.filter.type_movement !== null) {
        params["type_movement"] = self.filter.type_movement;
      }
      self._search = params;
      //console.log("FILTRE", this._search);
      self.getStockMovement();
    },
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  computed: {
    stockAvailableWithTotal() {
      // Each new added detail, updates the stockAvailableWithTotal
      // computed property, so you have the total calc in
      // each stockAvailable
      return this.itemsStock_available.map((stockAvailable) => ({
        ...stockAvailable,
        total: stockAvailable.qte_stock * stockAvailable.cmup,
      }));
    },
    get_amount_total() {
      let total = 0;
      this.itemsStock_available.forEach((d) => {
        total += d.qte_stock * d.cmup;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    get_quantity_total() {
      let total = 0;
      this.itemsStock_available.forEach((d) => {
        total += d.qte_stock;
      });
      // let sum = this.items.reduce((a, b) => a + (b[key] || 0), 0)
      // console.log("hum",total);
      return total;
    },
    getMinStartDate() {
      let minDateStart = "";
      minDateStart = new Date(this.formData.start_date)
        ?.toISOString()
        .substr(0, 10);
      return minDateStart;
    },
    get_product_code() {
      let product_code = "";
      product_code =
        this.formData.product === null
          ? ""
          : this.formData.product?.product.code;
      return product_code;
    },
  },
  mounted() {
    this.getOpenCash();
    this.showAvailable();
    this.getItemsStock();
  },
  components: {
    FormInvent,
    DeleteItem,
  },
};
</script>

<style scoped></style>
