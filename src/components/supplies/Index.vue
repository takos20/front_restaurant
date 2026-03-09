<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_supplies')"
        >
          <!-- <template v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])"></template> -->
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-briefcase-plus</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.add") }}
          </v-btn>
        </template>
        <v-btn
          :loading="loading.refresh"
          @click="refreshItems()"
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
    <br />
    <v-card class="pb-4">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.supplies.filter") }}
        </div>
      </v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-col class="mb-0 py-0" cols="12" sm="6">
            <v-text-field
              :label="$vuetify.lang.t('$vuetify.category.cols.code.title')"
              prepend-inner-icon="mdi-code-array"
              v-model="filter.code"
              clearable
              dense
              outlined
              @input="performFilter"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="filter.suppliers"
              :items="itemsSuppliers"
              :loading="isLoadingSuppliers"
              :search-input.sync="searchSuppliers"
              color="primary"
              item-text="name"
              item-value="id"
              :label="$vuetify.lang.t('$vuetify.supplies.cols.supplier.title')"
              prepend-inner-icon="mdi-account mdi-dark mdi-18px"
              class="font-weight-bold"
              outlined
              autofocus
              @change="performFilter"
              dense
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <v-data-table
        :footer-props="{
          'items-per-page-options': itemPerPageOptions,
        }"
        :headers="headers"
        :items="items"
        :items-per-page="itemPerPage"
        :loading="loading.list"
        :options.sync="pagination"
        :server-items-length="meta.totalElements"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        item-key="name"
        class="mt-5"
        v-if="this.isInventory === false"
      >
        <template v-slot:header.code="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <template v-slot:header.arrival_date="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        ><template v-slot:header.suppliers="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.storage_depot="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->
        <template v-slot:header.supply_amount="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.reference_no="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr> </template
        > -->
        <template v-slot:header.additional_info="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template>
        <!-- <template v-slot:header.is_accounted="{ header }">
          <tr>
            {{
              $vuetify.lang.t(header.text)
            }}
          </tr>
        </template> -->

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
                <td class="subtitle-2" v-if="item.suppliers">
                  {{ item.suppliers ? item.suppliers.name : "-" }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.storage_depots ? item.storage_depots.name : "-" }}
                </td> -->
                <td class="subtitle-2">
                  {{ item.supply_amount }}
                </td>
                <!-- <td class="subtitle-2">
                  {{ item.reference_no }}
                </td> -->
                <td class="subtitle-2">
                  {{ item.additional_info }}
                </td>

                <td class="subtitle-2">
                  <template>
                    <v-tooltip bottom>
                      <template
                        v-slot:activator="{ on }"
                        v-if="
                          _.includes(
                            $auth.user().permissions,
                            'change_supplies'
                          )
                        "
                      >
                        <v-btn
                          @click="editSupplies(item)"
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
                    <!--<v-tooltip bottom>-->
                    <!--<template-->
                    <!--v-slot:activator="{ on }"-->
                    <!--v-if="$auth.check(['ADMIN', 'RESPONSIBLE'])"-->
                    <!--&gt;-->
                    <!--<v-btn-->
                    <!--@click="deleteItem(item)"-->
                    <!--color="red"-->
                    <!--icon-->
                    <!--text-->
                    <!--v-on="on"-->
                    <!--v-show="$vuetify.breakpoint.smAndDown || hover"-->
                    <!--dark-->
                    <!--&gt;-->
                    <!--<v-icon>mdi-delete-outline</v-icon>-->
                    <!--</v-btn>-->
                    <!--</template>-->
                    <!--<span>{{ $vuetify.lang.t("$vuetify.btn.remove") }}</span>-->
                    <!--</v-tooltip>-->
                  </template>
                </td>
              </tr>
            </tbody>
          </v-hover>
        </template>
      </v-data-table>
      <form-supplies
        :dialog="dialogForm"
        :form="form"
        :messages="messages"
        @getItems="getItems"
        ref="suppliesForm"
      ></form-supplies>
      <form-enable
        :dialog="dialogForm"
        ref="accountedSupplies"
        :messages="messages"
        @getItems="getItems"
      ></form-enable>
      <delete-item
        :dialog="dialogDelete"
        :messages="messagesDelete"
        :urlItems="urlDeleteItems"
        @getItems="getItems"
      ></delete-item>
      <form-inv :dialog="dialogFormInv" ref="invForm"></form-inv>
    </v-card>
  </div>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormSupplies from "./FormUpdate";
import DeleteItem from "./../Common/Delete";
import FormEnable from "./accountedSupplies";
import FormInv from "./../bills/IsInventory";
export default {
  mixins: [ListMixin],
  data: () => ({
    urlItems: "supplies",
    sortBy: ["createdAt"],
    dialogForm: {
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
    isInventory: false,
    dialogFormInv: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isLoadingDepot: false,
    searchDepot: null,
    itemsDepot: [],
    urlDepot: "storage_depots",
    urlSuppliers: "suppliers",
    itemsSuppliers: [],
    searchSuppliers: null,
    isLoadingSuppliers: false,
    urlItemsCash: "cashs/isOpen",
    form: {
      id: null,
      pasysto: null,
      padiasto: null,
      temperature: null,
      bpm: null,
      size: null,
      electrophoresis: null,
      weight: null,
      blood_group: null,
      allergies: null,
      pathologies: null,
      name: null,
      religion: null,
      type_id: null,
      mother_name: null,
      emergency_name: null,
      emergency_contact: null,
      maritalStatus: null,
      number_id: null,
      email: null,
      date_id: null,
      child: null,
      dateNaiss: null,
      reference_no: null,
      other_phone: null,
      phone: null,
      insurance_name: null,
      insurance_number: null,
      code: null,
      age: null,
      gender: null,
      shape: null,
    },
    filter: {
      code: null,
      storage_depots: null,
      suppliers: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.supplies.delete.success",
    },
  }),
  watch: {
    searchSuppliers(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingSuppliers = true;
      this.$store
        .dispatch("request", {
          url: self.urlSuppliers,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsSuppliers = response.data.content;
        })
        .finally(() => (this.isLoadingSuppliers = false));
    },
    searchDepot(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingDepot = true;
      this.$store
        .dispatch("request", {
          url: self.urlDepot,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsDepot = response.data.content;
        })
        .finally(() => (this.isLoadingDepot = false));
    },
  },
  methods: {
    currentInventory() {
      this.dialogFormInv.show = true;
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
            self.isInventory = data.content.is_inventory;

            if (self.isInventory === true) {
              this.currentInventory();
            }

            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    enabled(item) {
      this.dialogForm.shows.showInfo = true;
      this.$refs.accountedSupplies.setForm(item);
    },
    setHeaders() {
      this.headers = [
        {
          text: "$vuetify.supplies.cols.code.title",
          value: "code",
          align: "start",
          sortable: true,
          width: "15",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.arrival_date.title",
          value: "arrival_date",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        {
          text: "$vuetify.supplies.cols.supplier.title",
          value: "suppliers",
          align: "start",
          sortable: true,
          width: "50",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.storage_depot.title",
        //   value: "storage_depot",
        //   align: "start",
        //   sortable: true,
        //   width: "50",
        //   class: "grey--text text--darken-3",
        // },

        {
          text: "$vuetify.supplies.cols.supply_amount.title",
          value: "supply_amount",
          align: "start",
          sortable: true,
          width: "30",
          class: "grey--text text--darken-3",
        },

        // {
        //   text: "$vuetify.supplies.cols.reference_no.title",
        //   value: "reference_no",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3",
        // },
        {
          text: "$vuetify.supplies.cols.additional_info.title",
          value: "additional_info",
          align: "start",
          sortable: true,
          width: "6",
          class: "grey--text text--darken-3",
        },
        // {
        //   text: "$vuetify.supplies.cols.is_accounted.title",
        //   value: "is_accounted",
        //   align: "start",
        //   sortable: true,
        //   width: "6",
        //   class: "grey--text text--darken-3",
        // },
        {
          text: "$vuetify.supplies.cols.actions.title",
          value: null,
          align: "start",
          sortable: true,
          width: "6",
        },
      ];
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.supplies.new.title",
        submit: "$vuetify.supplies.new.submit",
        success: "$vuetify.supplies.new.success",
      };
      this.form = {
        id: null,
        pasysto: null,
        padiasto: null,
        temperature: null,
        bpm: null,
        size: null,
        electrophoresis: null,
        weight: null,
        blood_group: null,
        allergies: null,
        pathologies: null,
        name: null,
        religion: null,
        type_id: null,
        mother_name: null,
        emergency_name: null,
        emergency_contact: null,
        maritalStatus: null,
        number_id: null,
        email: null,
        date_id: null,
        child: null,
        dateNaiss: null,
        reference_no: null,
        other_phone: null,
        phone: null,
        insurance_name: null,
        insurance_number: null,
        code: null,
        age: null,
        gender: null,
        shape: null,
      };
    },
    editSupplies(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.supplies.update.title",
        submit: "$vuetify.supplies.update.submit",
        success: "$vuetify.supplies.update.success",
      };
      this.$refs.suppliesForm.setForm(item);
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.storage_depots !== null) {
        params["storage_depots"] = self.filter.storage_depots;
      }
      if (self.filter.suppliers !== null) {
        params["suppliers"] = self.filter.suppliers;
      }
      if (self.filter.code !== null) {
        params["code"] = self.filter.code;
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
    FormSupplies,
    DeleteItem,
    FormInv,
    FormEnable,
  },
};
</script>

<style scoped></style>
