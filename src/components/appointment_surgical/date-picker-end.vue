<template>
  <div>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on"> mdi-calendar-outline </v-icon>
      </template>
      <v-date-picker
        v-model="date"
        @input="menu2 = false"
        no-title
      ></v-date-picker>
    </v-menu>
    <v-menu
      ref="menu"
      v-model="menu3"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-x
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" class="ml-2">
          mdi-clock-outline
        </v-icon>
      </template>
      <v-time-picker
        v-if="menu3"
        v-model="time"
        full-width
        @click:minute="$refs.menu.save(time)"
      ></v-time-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    menu2: false,
    menu3: false,
    time: null,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  watch: {
    date(val) {
      console.log(val);
      this.$emit("getdatetime_end", val + " " + this.time);
    },
    time(val) {
      console.log(val);
      this.$emit("getdatetime_end", this.date + " " + val);
    },
  },
};
</script>
