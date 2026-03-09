<template>
  <v-dialog v-model="dialog.show" persistent max-width="870px">
    <!--    <v-card>-->

    <!--      <div class="mt-1 mx-5">-->
    <!--        &lt;!&ndash;        <template v-if="_.includes($auth.user().permissions, 'add_structure')">&ndash;&gt;-->
    <!--        &lt;!&ndash;          <v-btn class="mr-2 my-2" @click="create()" color="#006B98" dark>&ndash;&gt;-->
    <!--        &lt;!&ndash;            <v-icon left>mdi-alpha-s-circle-outline</v-icon>&ndash;&gt;-->
    <!--        &lt;!&ndash;            {{ $vuetify.lang.t("$vuetify.btn.add") }}&ndash;&gt;-->
    <!--        &lt;!&ndash;          </v-btn>&ndash;&gt;-->
    <!--        &lt;!&ndash;        </template>&ndash;&gt;-->
    <!--        <v-btn-->
    <!--            :loading="loading.refresh"-->
    <!--            @click="refreshItems()"-->
    <!--            class="mr-2 my-2"-->
    <!--            depressed-->
    <!--            color="#f1f5fc"-->
    <!--        >-->
    <!--          <v-icon left color="#006B98">mdi-refresh</v-icon>-->
    <!--          {{ $vuetify.lang.t("$vuetify.btn.refresh") }}-->
    <!--        </v-btn>-->
    <!--        <v-spacer></v-spacer>-->
    <!--      </div>-->
    <!--    </v-card>-->
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t("$vuetify.radiography.cols.image.title") }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon light @click="forceRefresh()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <br />
          <!--          <v-row>-->
          <!--            <v-col-->
          <!--                cols="12"-->
          <!--                sm="6"-->
          <!--                class="mb-0 py-0 mt-2"-->
          <!--                v-for="(item, index) in this.attachments"-->
          <!--                :key="index"-->
          <!--            >-->
          <!--              <v-card @click="downloadWithAxios(item)">-->
          <!--                <v-list-item>-->
          <!--                  <v-list-item-title>-->
          <!--                    {{ item.file.split("/").slice(-1)[0] }}-->
          <!--                  </v-list-item-title>-->
          <!--                  <v-list-item-icon>-->
          <!--                    <v-icon class="primary&#45;&#45;text">mdi-download</v-icon>-->

          <!--                  </v-list-item-icon>-->
          <!--                </v-list-item>-->
          <!--              </v-card>-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <v-layout wrap>
            <v-flex
              v-for="(item, index) in this.attachments"
              :key="index"
              xs12
              md12
            >
              <v-card @click="downloadWithAxios(item)">
                <v-list>
                  <v-list-item>
                    <v-list-item-title>
                      <img
                        class="preview"
                        style="width: 745px; height: auto"
                        :src="'http://127.0.0.1:8012/' + item.file"
                        alt=""
                      />
                      <!--                    {{item.file.split("/").slice(-1)[0]}}-->
                    </v-list-item-title>
                    <v-list-item-icon>
                      <v-icon class="primary--text">mdi-download</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
              <!--              <a :href="'http://127.0.0.1:8017/media'+item.file" download>File Template</a>-->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ListMixin from "./../../mixins/Common/List.vue";
import FormMixin from "@/mixins/Common/Form";
import axios from "axios";
export default {
  mixins: [ListMixin, FormMixin],
  data: () => ({
    urlItems: "/alerts",
    sortBy: ["id"],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    is_visible: false,
    singleExpand: true,
    dialogDelete: {
      show: false,
    },
    attachments: [],
    items: [],
    itemsReport: [],

    filter: {
      name: null,
      billable: null,
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    loadingReport: {
      list: false,
      refresh: false,
      filter: false,
    },
    messagesDelete: {
      success: "$vuetify.notification.delete.success",
    },
  }),
  methods: {
    downloadWithAxios(item) {
      let url = "http://127.0.0.1:8012/" + item.file;
      // let url = window.location.origin + window.location.pathname + 'media' + item.file
      let title = item.file.split("/").slice(-1)[0];
      console.log("urlFile", url);
      axios({
        method: "GET",
        url,
        responseType: "blob",
      })
        .then((response) => {
          const urlFile = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = urlFile;
          link.setAttribute("download", title);
          document.body.appendChild(link);
          link.click();
          // this.forceFileDownload(response)
        })
        .catch(() => console.log("error occured"));
    },
    forceRefresh() {
      this.dialog.show = false;
      this.items = [];
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.attachments = [];
      this.attachments = item.attachments;
    },
  },
  components: {},
  computed: {},
};
</script>

<style scoped></style>
