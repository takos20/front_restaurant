<template>
  <v-dialog max-width="420" persistent v-model="dialog.show">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold red--text" align="center">
          <br />
          <v-icon color="red" size="55">mdi-alert</v-icon>
          <br />
          <h2>
            {{ $vuetify.lang.t("$vuetify.inventory.isInventory") }}
          </h2>
          <div class="body-1 font-weight-bold">
            <h3>
              {{ $vuetify.lang.t("$vuetify.inventory.continueInventory") }}
            </h3>
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog.show = false">
          {{ $vuetify.lang.t("$vuetify.no") }}
        </v-btn>
        <v-btn
          color="#0984e3"
          :loading="loading"
          @click="send"
          dark
          type="submit"
        >
          {{ $vuetify.lang.t("$vuetify.yes") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <form-inventory
      :dialog="dialogFormInventory"
      :form="form"
      :messages="messages"
      @getItems="getInventory"
      ref="inventoryForm"
    ></form-inventory>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
import FormInventory from "./FormInventory";
export default {
  mixins: [FormMixin],
  name: "Infos",
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          shows: {
            showInfo: false,
          },
        };
      },
    },
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code_user: null,
          position_held: null,
          doctor: null,
          patient: null,
          username: null,
          password: null,
          re_password: null,
          role: null,
          is_active: false,
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "hospitals/isInventory",
    urlInventory: "inventories/get_inventory",
    dialogFormInventory: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
  }),
  methods: {
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
            url: self.urlInventory + "?id=" + this.$route.params.id,
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
    createInventory() {
      this.dialogFormInventory.show = true;
      this.messages = {
        title: "$vuetify.inventory.new.title",
        submit: "$vuetify.inventory.new.submit",
        success: "$vuetify.inventory.new.success",
      };
      this.$refs.inventoryForm.setForm();
    },
    getDataForm() {
      let data = {
        is_inventory: true,
      };
      return data;
    },
    send() {
      this.dialog.show = false;
      this.$store.dispatch("setNotification", {
        status: false,
      });
      let self = this;
      this.loading = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems,
          method: "PATCH",
          data: self.getDataForm(),
        })
        .then(() => {
          self.$store.dispatch("setNotification", {
            status: true,
            message: self.$vuetify.lang.t(self.messages.success),
          });
          this.createInventory();
          self.$emit("getOpenCash");
          self.$emit("getInventory");
        })
        .catch((error) => {
          console.log("error", error);
          let message = "$vuetify.error_occured";
          self.$store.dispatch("setNotification", {
            status: true,
            message: self.$vuetify.lang.t(message),
          });
        })
        .then(() => {
          self.loading = false;
        });
    },
  },
  components: {
    FormInventory,
  },
};
</script>
