<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <template>
            <v-btn class="mr-2 my-2" @click="create()" color="primary" dark>
              <v-icon left>mdi-calendar-check</v-icon>
              {{ $vuetify.lang.t("$vuetify.btn.add") }}
            </v-btn>
          </template>
          <v-btn
            :loading="loading.refresh"
            @click="refreshItemsEventsSurgical()"
            class="mr-2 my-2"
            depressed
            color="#f1f5fc"
          >
            <v-icon left color="primary">mdi-refresh</v-icon>
            {{ $vuetify.lang.t("$vuetify.btn.refresh") }}
          </v-btn>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          :loading="loading.list"
          @click:event="editAppointment"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
      </v-sheet>
    </v-col>
    <form-appointment
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItemsEvents="getItemsEvents"
      ref="appointmentForm"
    ></form-appointment>
    <delete-item
      :dialog="dialogDelete"
      :messages="messagesDelete"
      :urlItems="urlDeleteItems"
      @getItems="getItemsEvents"
    ></delete-item>
  </v-row>
</template>
<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormAppointment from "./Form";
import DeleteItem from "@/components/Common/Delete";

export default {
  components: {
    FormAppointment,
    DeleteItem,
  },
  mixins: [ListMixin],
  data: () => ({
    urlItems: "appointments",
    urlItemsAll: "appointments/all",
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    messagesDelete: {
      success: "$vuetify.doctor.delete.success",
    },
    form: {
      id: null,
      code_internal: null,
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
    loading: {
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
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.getItemsEventsSurgical();
  },
  methods: {
    editAppointment(event) {
      console.log("event", event);
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.appointment_surgery.update.title",
        submit: "$vuetify.appointment_surgery.update.submit",
        success: "$vuetify.appointment_surgery.update.success",
      };
      this.$refs.appointmentForm.setForm(event.event);
    },
    create() {
      this.form.id = null;
      this.form.problem = null;
      this.form.patient = null;
      this.form.other_participants = null;
      this.form.start_appointment_date = null;
      this.form.department = null;
      this.form.end_appointment_date = null;
      this.form.postpone = false;
      this.form.doctor = null;
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.appointment_surgery.new.title",
        submit: "$vuetify.appointment_surgery.new.submit",
        success: "$vuetify.appointment_surgery.new.success",
      };
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
};
</script>
