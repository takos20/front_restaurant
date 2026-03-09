<template>
  <div>
    <v-card class="pb-4">
      <div class="mt-5 mx-5">
        <template
          v-if="_.includes(this.$auth.user().permissions, 'add_schedule')"
        >
          <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
            <v-icon left>mdi-calendar-check</v-icon>
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
    <v-card class="schedule-card">
      <v-container class="bg-surface-variant" style="margin-right: 80px">
        <div class="week-schedule-flex">
          <v-row no-gutters>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{ $vuetify.lang.t("$vuetify.days.MONDAY").toUpperCase() }}
                  </div>
                  <!-- <v-btn
        v-for="item in monday"
        :key="item.name"
        @click="editSchedule(item)"
        class="subtitle-2 mt-2 call-button-container  gray--text"
        depressed
        :style="{ backgroundColor: '#29A3D8' }"
      >
        {{ item.doctor.name.toUpperCase() }}
        ({{ item.start_time }} - {{ item.end_time }})
      </v-btn> -->
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in monday"
                    @click="editSchedule(item)"
                    style="background-color: #00acc1"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    ({{ item.start_time }} - {{ item.end_time }})
                  </div>
                </template>
              </div></v-col
            >
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{ $vuetify.lang.t("$vuetify.days.TUESDAY").toUpperCase() }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in tuesday"
                    style="background-color: #e0e0e0"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{
                      $vuetify.lang.t("$vuetify.days.WEDNESDAY").toUpperCase()
                    }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in wednesday"
                    style="background-color: green"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{
                      $vuetify.lang.t("$vuetify.days.THURSDAY").toUpperCase()
                    }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in thursday"
                    style="background-color: #455a64"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{ $vuetify.lang.t("$vuetify.days.FRIDAY").toUpperCase() }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in friday"
                    style="background-color: indigo"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{
                      $vuetify.lang.t("$vuetify.days.SATURDAY").toUpperCase()
                    }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in saturday"
                    style="background-color: grey"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 50px">
            </v-col>
            <v-col cols="12" sm="1" class="mb-0 py-0" style="max-width: 200px">
              <div class="day-column">
                <template>
                  <div
                    class="call-button-container white--text"
                    style="background-color: #455a64"
                  >
                    {{ $vuetify.lang.t("$vuetify.days.SUNDAY").toUpperCase() }}
                  </div>
                  <div
                    class="subtitle-2 mt-2 call-button-container gray--text"
                    :key="item.name"
                    v-for="item in sunday"
                    style="background-color: orange"
                  >
                    {{ item.doctor.name.toUpperCase() }}
                    {{ item.start_time }}-{{ item.end_time }}
                  </div>
                </template>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card>
    <form-schedule
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="scheduleForm"
    ></form-schedule>
  </div>
</template>

<script>
import FormSchedule from "./Form";
export default {
  data: () => ({
    itemsPerPage: 10,
    urlItems: "/schedules",
    sortBy: ["id"],
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
    form: {
      id: null,
      code_internal: null,
      coef: null,
      dateNaiss: null,
      dateService: null,
      intervention_days: null,
      position: null,
      address: null,
      speciality: null,
      phone: null,
      email: null,
      department: null,
    },
    filter: {
      username: null,
      role: null,
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.doctor.delete.success",
    },
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  }),
  mounted() {
    this.getItems();
  },
  methods: {
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.schedule.new.title",
        submit: "$vuetify.schedule.new.submit",
        success: "$vuetify.schedule.new.success",
      };
    },
    editSchedule(item) {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.schedule.update.title",
        submit: "$vuetify.schedule.update.submit",
        success: "$vuetify.schedule.update.success",
      };
      this.$refs.scheduleForm.setForm(item);
    },
    getItems() {
      let self = this;
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
          })
          .then((response) => {
            this.monday = [];
            this.tuesday = [];
            this.wednesday = [];
            this.thursday = [];
            this.friday = [];
            this.saturday = [];
            this.sunday = [];
            let data = response.data;
            self.items = data.content;
            const intervention_day = response.data.content;
            // for (const item of intervention_day) {
            //   if (item.intervention_days.includes("MONDAY")) {
            //     const name = item.name;
            //     this.monday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("TUESDAY")) {
            //     const name = item.name;
            //     this.tuesday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("WEDNESDAY")) {
            //     const name = item.name;
            //     this.wednesday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("THURSDAY")) {
            //     const name = item.name;
            //     this.thursday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("FRIDAY")) {
            //     const name = item.name;
            //     this.friday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("SATURDAY")) {
            //     const name = item.name;
            //     this.saturday.push({
            //       name
            //     });
            //   }
            //   if (item.intervention_days.includes("SUNDAY")) {
            //     const name = item.name;
            //     this.sunday.push({
            //       name
            //     });
            //   }
            // }

            for (const item of intervention_day) {
              if (item.day === "MONDAY") {
                this.monday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "TUESDAY") {
                this.tuesday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "WEDNESDAY") {
                this.wednesday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "THURSDAY") {
                this.thursday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "FRIDAY") {
                this.friday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "SATURDAY") {
                this.saturday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
              if (item.day === "SUNDAY") {
                this.sunday.push({
                  id: item.id,
                  doctor: item.doctor,
                  day: item.day,
                  start_time: item.start_time,
                  end_time: item.end_time,
                });
              }
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
    showFilter() {
      this.dialogForm.shows.showFilter = true;
    },
    performFilter() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.username !== null) {
        params["username"] = self.filter.username;
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
    assignEnterprise(item) {
      this.dialogEnt.show = true;
      this.$refs.assignForm.setForm(item);
    },
  },
  components: {
    FormSchedule,
  },
};
</script>

<style scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.call-button-container {
  padding: 8px;
  border-radius: 4px;
  max-width: 250px;
  text-align: center;
}
.week-schedule-flex {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.day-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style>
