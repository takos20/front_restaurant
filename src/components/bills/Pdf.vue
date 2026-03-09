<template>
  <v-dialog v-model="dialog.show" persistent max-width="900px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template>
          <v-btn
            class="mr-2 my-2"
            @click="$refs.billPdf.print()"
            color="#4E342E"
            dark
          >
            <v-icon size="35" left>mdi-printer</v-icon>
            <!--            {{ $vuetify.lang.t("$vuetify.btn.print") }}-->
          </v-btn>
        </template>
      </v-card-actions>
      <!--      <vue-pdf-app pdf="http://example.com/sample.pdf"></vue-pdf-app>-->
      <pdf ref="billPdf" :src="pdfsrc"></pdf>
    </v-card>
  </v-dialog>
</template>

<script>
import pdf from "vue-pdf";
import FormMixin from "@/mixins/Common/Form";

export default {
  mixins: [FormMixin],
  components: {
    pdf,
  },
  data() {
    return {
      pdfsrc: null,
      rotate: 0,
    };
  },
  methods: {
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
      this.active = false;
    },
    setForm(objectUrl) {
      // Données envoyées lors de la modification
      this.pdfsrc = objectUrl;
      // console.log("cul", this.form.supplies);
    },
  },
};
</script>
