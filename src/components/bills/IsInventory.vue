<template>
  <v-dialog max-width="420" persistent v-model="dialog.show">
    <v-card>
      <v-card-text>
        <div class="body-1 font-weight-bold red--text" align="center">
          <br />
          <v-icon color="red" size="55">mdi-alert</v-icon>
          <br />
          <br />
          <h2>
            {{ $vuetify.lang.t("$vuetify.inventory.isInventory") }}
          </h2>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="dialog.show = false">
          {{ $vuetify.lang.t("$vuetify.btn.close") }}
        </v-btn>
        <!--        <v-btn-->
        <!--          color="#0984e3"-->
        <!--          :loading="loading"-->
        <!--          @click="send"-->
        <!--          dark-->
        <!--          type="submit"-->
        <!--        >-->
        <!--          {{ $vuetify.lang.t("$vuetify.yes") }}-->
        <!--        </v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
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
        };
      },
    },
  },
  data: () => ({
    loading: false,
    urlItems: "hospitals/isInventory",
    dialogFormInventory: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
  }),
  methods: {},
  components: {},
};
</script>
