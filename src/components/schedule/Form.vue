<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.doctor"
                    :items="itemsDoctor"
                    outlined
                    :loading="isLoadingDoctor"
                    :search-input.sync="searchDoctor"
                    color="primary"
                    dense
                    item-text="name"
                    item-value="id"
                    :label="$vuetify.lang.t('$vuetify.doctor.title')"
                    class="font-weight-bold"
                    clearable
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-select
                    v-model="form.day"
                    color="primary"
                    outlined
                    dense
                    :items="optionDays.type_Days"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.doctor.cols.intervention_days.title'
                      )
                    "
                    :placeholder="
                      $vuetify.lang.t('$vuetify.doctor.cols.role.title2')
                    "
                    class="font-weight-bold"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        v-model="form.start_time"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t(
                            '$vuetify.meeting.cols.startTime.title'
                          )
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      :min="start_day_work"
                      :max="end_day_work"
                      v-model="form.start_time"
                      color="primary"
                      @input="menu = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
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
                        v-model="form.end_time"
                        color="primary"
                        class="font-weight-bold"
                        prepend-inner-icon="mdi-clock-time-four-outline mdi-18px"
                        outlined
                        :label="
                          $vuetify.lang.t('$vuetify.meeting.cols.endTime.title')
                        "
                        v-bind="attrs"
                        v-on="on"
                        dense
                        readonly
                        clearable
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      :min="start_day_work"
                      :max="end_day_work"
                      v-model="form.end_time"
                      color="primary"
                      @input="menu2 = false"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="deleteItem()"
              class="white--text"
              v-if="this.form.id !== null"
              color="red"
            >
              {{ $vuetify.lang.t("$vuetify.schedule.delete.title") }}
            </v-btn>
            <v-btn @click="dialog.show = false">
              {{ $vuetify.lang.t("$vuetify.btn.close") }}
            </v-btn>
            <v-btn color="primary" :loading="loading" dark type="submit">
              {{ $vuetify.lang.t(messages.submit) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import FormMixin from "./../../mixins/Common/Form.vue";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          start_time: null,
          end_time: null,
          available: null,
          day: null,
          doctor: null,
        };
      },
    },
  },
  data: () => ({
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    messagesDelete: {
      success: "$vuetify.appointment.cols.cancel_appointment.success",
    },
    dialogDelete: {
      show: false,
    },
    urlItemsHospital: "hospitals",
    period_time: null,
    start_day_work: null,
    end_day_work: null,
    menu2: false,
    optionDays: {
      type_Days: [],
    },
    menu: false,
    urlItems: "schedules",
    urlDoctors: "doctors",
    urlDeleteItems: "",
    isLoadingDoctor: false,
    searchDoctor: null,
    itemsDoctor: [],
  }),

  watch: {
    searchDoctor(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlDoctors,
          params: params,
        })
        .then((response) => {
          self.itemsDoctor = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {
    this.getOptionsJour();
    this.getOpenCash();
  },
  validations() {
    let validators = {
      form: {},
    };
    return validators;
  },
  methods: {
    deleteItem() {
      let self = this;
      this.loading = true;
      this.$store
        .dispatch("request", {
          url: self.urlItems + "/" + this.form.id,
          method: "DELETE",
          data: self.urlDeleteItems,
        })
        .then(() => {
          // console.log("delete", this.urlItems);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(self.messages.success),
          });
          self.$emit("getItems");
          self.resetDataForm();
          self.dialog.show = false;
        })
        .catch((errors) => {
          console.log("erreur delete", errors);
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t("$vuetify.deletedErrors"),
          });
        })
        .then(() => {
          self.loading = false;
          // self.dialog.show = false;
        });
    },
    getOptionsJour() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.days, (type_Days) => {
        self.optionDays.type_Days.push({
          text: self.$vuetify.lang.t(type_Days.text),
          value: type_Days.value,
        });
      });
    },
    getOpenCash() {
      let self = this;
      return new Promise((resolve) => {
        self.$store
          .dispatch("request", {
            url: self.urlItemsHospital,
          })
          .then((response) => {
            let data = response.data;
            self.period_time = data.content[0].consultation_time;
            self.start_day_work = data.content[0].start_day_work;
            self.end_day_work = data.content[0].end_day_work;
            // console.log("meta", data);
            resolve(response);
          });
      });
    },
    createD() {
      this.dialogForm.show = true;
      this.formData = {
        id: null,
        doctor: null,
        day: null,
      };
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        doctor: this.form.doctor,
        day: this.form.day,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.day = item.day;
      this.form.start_time = item.start_time;
      this.form.end_time = item.end_time;
      this.form.doctor = item.doctor["id"];
      this.itemsDoctor.push(item.doctor);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
  },
  components: {},
};
</script>
