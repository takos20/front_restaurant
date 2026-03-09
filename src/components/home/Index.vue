<template>
  <v-container
    fluid
    class="pa-2"
    v-if="
      this.$route.params.idD !== 'secretariat' &&
      this.$route.params.idD !== 'organization' &&
      this.$route.params.idD !== 'billing' &&
      this.$route.params.idD !== 'diagnostic' &&
      this.$route.params.idD !== 'stock'
    "
  >
    <!-- <v-card-title class="black--text font-weight-bold text-center">{{
      $vuetify.lang.t("$vuetify.menu.home")
    }}</v-card-title> -->

    <v-row justify="center">
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-if="
          get_permissions_organization ||
          $auth.check(['admin']) ||
          $auth.user().is_superuser
        "
      >
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-col cols="12">
            <v-card
              @click="organization()"
              :elevation="hover ? 16 : 2"
              width="300px"
            >
              <v-img
                src="@/assets/organisation.png"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                cover
              >
                <v-card-title
                  class="white--text font-weight-bold text-center"
                  >{{
                    $vuetify.lang.t("$vuetify.hospitals.titleO")
                  }}</v-card-title
                >
              </v-img>
            </v-card>
          </v-col>
        </v-hover>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-if="
          get_permissions_pharmacy ||
          $auth.check(['admin']) ||
          $auth.user().is_superuser
        "
      >
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-col cols="12">
            <v-card
              @click="pharmacy()"
              :elevation="hover ? 16 : 2"
              width="300px"
            >
              <v-img
                src="@/assets/module.jpg"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                width="300px"
                cover
              >
                <v-card-title
                  class="white--text font-weight-bold text-center"
                  >{{
                    $vuetify.lang.t("$vuetify.hospitals.pharmacy")
                  }}</v-card-title
                >
              </v-img>
            </v-card>
          </v-col>
        </v-hover>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-if="
          get_permissions_billing ||
          $auth.check(['admin']) ||
          $auth.user().is_superuser
        "
      >
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-col cols="12">
            <v-card
              @click="billing()"
              :elevation="hover ? 16 : 2"
              width="300px"
            >
              <v-img
                src="@/assets/billing1.png"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="150px"
                width="300px"
                cover
              >
                <v-card-title
                  class="white--text font-weight-bold text-center"
                  >{{
                    $vuetify.lang.t("$vuetify.hospitals.titleF")
                  }}</v-card-title
                >
              </v-img>
            </v-card>
          </v-col>
        </v-hover>
      </v-col>
    </v-row>
    <form-note
      :dialog="dialogFormNote"
      ref="cashForm"
      :messages="messages"
      @getItems="getItemsNote"
    ></form-note>
  </v-container>
</template>

<script>
import FormNote from "./../internal_note/FormNote";
import ListMixin from "./../../mixins/Common/List.vue";
// import PanelGroupItem from './PanelGroupItem.vue';
export default {
  mixins: [ListMixin],
  data: () => ({
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogFormNote: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    sortBy: "id",
    headers: [],
    itemsNote: [],
    meta: {},
    pagination: {},
    supply: false,
    itemPerPage: 5,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    drawer: true,
    urlItemsNote: "userNotes/getNotes",
    crm: false,
  }),
  computed: {
    get_permissions_billing() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_billing_module"
      );
      return result;
    },
    get_permissions_diagnostic() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_diagnostic_module"
      );
      return result;
    },
    get_permissions_radiography() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_radiography_module"
      );
      return result;
    },
    get_permissions_investigation() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_investigation_module"
      );
      return result;
    },
    get_permissions_hospitalization() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_hospitalization_module"
      );
      return result;
    },
    get_permissions_consultation() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_consultation_module"
      );
      return result;
    },
    get_permissions_organization() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_organisation_module"
      );
      return result;
    },
    get_permissions_laboratory() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_laboratory_module"
      );
      return result;
    },
    get_permissions_secretariat() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_secretariat_module"
      );
      return result;
    },
    get_permissions_surgery() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_surgery_module"
      );
      return result;
    },
    get_permissions_grh() {
      let result = "";
      result = this._.includes(this.$auth.user().permissions, "view_rh_module");
      return result;
    },
    get_permissions_insurance() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_insurance_module"
      );
      return result;
    },
    get_permissions_pharmacy() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_pharmacy_module"
      );
      return result;
    },
  },
  mounted() {
    this.getItemsNote();
  },
  components: {
    FormNote,
  },
  methods: {
    createDialog() {
      this.dialogFormNote.show = true;
      this.messages = {
        title: "$vuetify.internalnote.list.title2",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    getItemsNote() {
      let self = this;
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
            url: self.urlItemsNote + "?id=" + this.$auth.user().id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsNote = data.content;

            if (
              self.itemsNote.length > 0 &&
              this._.includes(this.$auth.user().permissions, "view_usernote")
            ) {
              this.createDialog();
            } else {
              this.currentInventory();
            }
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
    consultation() {
      this.$router.push({
        name: "dashboardConsultation",
        params: { idD: "consultation" },
      });
    },
    hospitalization() {
      this.$router.push({
        name: "dashboardHospitalization",
        params: { idD: "hospitalization" },
      });
    },
    investigation() {
      this.$router.push({
        name: "dashboardInvestigation",
        params: { idD: "investigation" },
      });
    },
    radiography() {
      this.$router.push({
        name: "dashboardRadiography",
        params: { idD: "radiography" },
      });
    },
    surgery() {
      this.$router.push({
        name: "dashboardSurgery",
        params: { idD: "surgery" },
      });
    },
    grh() {
      this.$router.push({
        name: "dashboardGrh",
        params: { idD: "grh" },
      });
    },
    insurance() {
      this.$router.push({
        name: "dashboardInsurance",
        params: { idD: "insurance" },
      });
    },
    diagnostic() {
      this.$router.push({
        name: "dashboardDiagnostic",
        params: { idD: "diagnostic" },
      });
    },
    laboratory() {
      this.$router.push({
        name: "dashboardLaboratory",
        params: { idD: "laboratory" },
      });
    },
    organization() {
      this.$router.push({
        name: "dashboardOrganization",
        params: { idD: "organization" },
      });
    },
    secretariat() {
      this.$router.push({
        name: "dashboardSecretariat",
        params: { idD: "secretariat" },
      });
    },
    billing() {
      this.$router.push({
        name: "dashboardBilling",
        params: { idD: "billing" },
      });
    },
    pharmacy() {
      this.$router.push({
        name: "dashboardPharmacy",
        params: { idD: "stock" },
      });
    },
  },
};
</script>

<style scoped>
.grayscale {
  filter: grayscale(100%);
}
</style>
