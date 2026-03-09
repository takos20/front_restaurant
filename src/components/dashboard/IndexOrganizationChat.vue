<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3" class="border">
          <v-app-bar flat color="rgba(0,0,0,0)">
            <template>
              <v-btn
                class="mr-2 my-2"
                @click="createRoom()"
                large
                block
                color="primary"
                dark
              >
                <v-icon left> mdi-account-multiple-plus mdi-18</v-icon>
                {{ $vuetify.lang.t("$vuetify.conversation.cols.bed.title") }}
              </v-btn>
            </template>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-btn tile color="white" @click="newMessage()" large block>
              {{ $vuetify.lang.t("$vuetify.conversation.new.title") }}
            </v-btn>
          </v-app-bar>

          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-toolbar-title class="title"> Chat </v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>fas fa-ellipsis-h</v-icon>
            </v-btn>
          </v-app-bar>
          <v-app-bar flat color="rgba(0,0,0,0)">
            <v-text-field
              v-model="filter.search"
              filled
              label="Search Here"
              append-icon="mdi-magnify"
              color="grey"
              clearable
              @input="searchchat()"
            ></v-text-field>
          </v-app-bar>

          <v-list two-line color="rgba(0,0,0,0)">
            <v-list-item-group
              v-model="selected"
              active-class="blue lighten-4"
              multiple
            >
              <template v-for="(item, index) in items">
                <v-list-item :key="item.receiver">
                  <v-badge
                    bordered
                    bottom
                    color="green"
                    dot
                    offset-x="22"
                    offset-y="26"
                    v-if="item.receiver.is_online === true"
                  >
                    <v-list-item-avatar>
                      <v-img :src="require('../../assets/user.png')"></v-img>
                    </v-list-item-avatar>
                  </v-badge>
                  <v-badge
                    bordered
                    bottom
                    color="grey"
                    dot
                    offset-x="22"
                    offset-y="26"
                    v-else
                  >
                    <v-list-item-avatar>
                      <v-img :src="require('../../assets/user.png')"></v-img>
                    </v-list-item-avatar>
                  </v-badge>
                  <template>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.receiver.username"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="item.message"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" sm="9" class="border">
          <v-app-bar color="rgba(0,0,0,0)" flat>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="11"
              offset-y="13"
            >
              <v-avatar class="mt-n7" size="40" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>
            <v-toolbar-title class="title pl-0 ml-2 mt-n4">
              Fernando Gaucho
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title class="title pl-0 mr-2 mt-n4">
              Members :
            </v-toolbar-title>
            <v-btn
              color="blue"
              icon
              class="mt-n5 mr-n2"
              outlined
              max-height="35"
              max-width="35"
            >
              <v-icon small>fas fa-plus</v-icon>
            </v-btn>
            <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
              <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
            </v-avatar>
            <v-divider vertical inset class="mt-n1"></v-divider>
            <v-btn color="black" icon class="mt-n5">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-spacer></v-spacer>
            <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">Good morning. How are you today?</div>
                  <v-list-item-subtitle
                    >16 mins ago
                    <span class="ml-16">Seen 1:03PM</span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
              </v-avatar>
            </v-badge>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="16"
              offset-y="9"
            >
              <v-avatar class="mt-n5 mr-2" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>
            <v-card class="mt-10" max-width="350px">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">
                    Hey! Very good.I'm taking a photos in the office
                  </div>
                  <v-list-item-subtitle>12 mins ago</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn color="black" icon class="mb-n10">
              <v-icon>fas fa-ellipsis-h</v-icon>
            </v-btn>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
              </v-avatar>
            </v-badge>
            <v-card class="mt-10 ml-2" max-width="350px">
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">
                    Fernando shared 3 photos :<br /><br />
                    <v-avatar size="60" tile class="mr-2">
                      <v-img src="1.jpg"></v-img>
                    </v-avatar>
                    <v-avatar size="60" tile class="mr-2">
                      <v-img src="2.jpg"></v-img>
                    </v-avatar>
                    <v-avatar size="60" tile>
                      <v-img src="3.jpg"></v-img>
                    </v-avatar>
                  </div>

                  <v-list-item-subtitle>12 mins ago</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-8">
            <v-spacer></v-spacer>
            <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">
                    There many variations of passages of Loream
                  </div>
                  <v-list-item-subtitle
                    >2 mins ago
                    <span class="ml-16">Seen 1:23PM</span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
              </v-avatar>
            </v-badge>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat class="mb-16">
            <v-spacer></v-spacer>
            <v-card class="mt-10 mr-2" max-width="350px" color="blue" dark>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="mb-4">God by !!!!!!!!!!!!!!</div>
                  <v-list-item-subtitle
                    >3 mins ago
                    <span class="ml-16">Seen 1:24PM</span></v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-badge
              bordered
              bottom
              color="green"
              dot
              offset-x="10"
              offset-y="10"
            >
              <v-avatar class="mt-n5" size="30" elevation="10">
                <img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
              </v-avatar>
            </v-badge>
          </v-app-bar>
          <v-app-bar color="rgba(0,0,0,0)" flat>
            <v-text-field
              v-model="message"
              append-icon="mdi-emoticon"
              :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Message"
              type="text"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
            ></v-text-field>
          </v-app-bar>
        </v-col>
        <!--        <v-col cols="12" sm="3">-->
        <!--          <v-card class="text-center mt-8 mb-3" shaped >-->
        <!--            <v-badge-->
        <!--                bordered-->
        <!--                bottom-->
        <!--                color="green"-->
        <!--                dot-->
        <!--                offset-x="11"-->
        <!--                offset-y="13"-->
        <!--            >-->
        <!--              <v-avatar class="mt-n7" size="60" elevation="10">-->
        <!--                <img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />-->
        <!--              </v-avatar>-->
        <!--            </v-badge>-->
        <!--            <v-card-title class="layout justify-center">Fernando Gaucho</v-card-title>-->
        <!--            <v-card-subtitle class="layout justify-center">CEO & Founder at Highly inc</v-card-subtitle>-->
        <!--            <v-list>-->
        <!--            </v-list>-->
        <!--          </v-card>-->
        <!--          <v-expansion-panels v-model="panel" multiple>-->
        <!--            <v-expansion-panel>-->
        <!--              <v-expansion-panel-header>-->
        <!--                <h3>Information</h3>-->
        <!--              </v-expansion-panel-header>-->
        <!--              <v-expansion-panel-content>-->

        <!--              </v-expansion-panel-content>-->
        <!--            </v-expansion-panel>-->
        <!--            <v-expansion-panel>-->
        <!--              <v-expansion-panel-header>-->
        <!--                <h3>Images(14)</h3>-->
        <!--              </v-expansion-panel-header>-->
        <!--              <v-expansion-panel-content>-->

        <!--              </v-expansion-panel-content>-->
        <!--            </v-expansion-panel>-->
        <!--            <v-expansion-panel >-->
        <!--              <v-expansion-panel-header>-->
        <!--                <h3>Files(3) </h3>-->
        <!--              </v-expansion-panel-header>-->
        <!--              <v-expansion-panel-content>-->
        <!--                <v-list shaped>-->
        <!--                  <v-list-item-group-->

        <!--                  >-->
        <!--                    <v-list-item-->
        <!--                        v-for="(item, i) in files"-->
        <!--                        :key="i"-->
        <!--                    >-->
        <!--                      <v-list-item-icon>-->
        <!--                        <v-icon v-text="item.icon" color="green"></v-icon>-->
        <!--                      </v-list-item-icon>-->
        <!--                      <v-list-item-content>-->
        <!--                        <v-list-item-title v-text="item.text"></v-list-item-title>-->
        <!--                      </v-list-item-content>-->
        <!--                    </v-list-item>-->
        <!--                  </v-list-item-group>-->
        <!--                </v-list>-->
        <!--              </v-expansion-panel-content>-->
        <!--            </v-expansion-panel>-->
        <!--            <v-expansion-panel>-->
        <!--              <v-expansion-panel-header>-->
        <!--                <h3>Pinned items</h3>-->
        <!--              </v-expansion-panel-header>-->
        <!--              <v-expansion-panel-content>-->

        <!--              </v-expansion-panel-content>-->
        <!--            </v-expansion-panel>-->

        <!--          </v-expansion-panels>-->

        <!--        </v-col>-->
      </v-row>
    </v-container>
    <form-message
      :dialog="dialogForm"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="messageForm"
    ></form-message>
    <form-room
      :dialog="dialogFormRoom"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="messageForm"
    ></form-room>
  </v-app>
</template>
<script>
import FormMessage from "./FormMessage";
import FormRoom from "./FormRoom";
import ListMixin from "./../../mixins/Common/List.vue";

export default {
  mixins: [ListMixin],
  data: () => ({
    selected: [2],
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    form: {
      id: null,
      members: null,
      name: null,
      sender: null,
      message: null,
      receiver: null,
    },
    messages: {
      title: "",
      submit: "",
      success: "",
    },
    dialogFormRoom: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    items: [],
    urlItemsMessages: "messages/myMessages",
    files: [
      { text: "Landing_page.zip", icon: " mdi-cloud-upload" },
      { text: "Requirements.pdf", icon: " mdi-cloud-upload" },
      { text: "Uwagi.docx", icon: " mdi-cloud-upload" },
    ],
    panel: [2],
    filter: {
      search: null,
    },
    password: "Password",
    show: false,
    message: "Type a message here",
    marker: true,
    iconIndex: 0,
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  mounted() {
    this.getItems();
    // this.sell_month_stat();
  },
  methods: {
    createRoom() {
      this.dialogFormRoom.show = true;
      this.messages = {
        title: "$vuetify.conversation.new.title",
        submit: "$vuetify.conversation.new.submit",
        success: "$vuetify.conversation.new.success",
      };
      this.form = {
        id: null,
        message: null,
        receiver: null,
      };
    },
    newMessage() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.conversation.new.title",
        submit: "$vuetify.conversation.new.submit",
        success: "$vuetify.conversation.new.success",
      };
      this.form = {
        id: null,
        message: null,
        receiver: null,
      };
    },
    getItems() {
      let self = this;
      const params = {};
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItemsMessages,
            method: "GET",
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content;
            // const finalData = JSON.parse(JSON.stringify(self.items.stat_product));
            // let statP = Object.entries(self.items?.stat_product);
            // self.chartData =
            //   statP.length === 1 ? [] : Object.entries(self.items.stat_product);
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
    searchchat() {
      let self = this;
      self.loading.list = true;
      let params = {};
      if (self.filter.search !== null) {
        params["search"] = self.filter.search;
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
    sendMessage() {
      this.resetIcon();
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
  },
  components: {
    FormMessage,
    FormRoom,
  },
};
</script>
<style scoped>
.border {
  border-right: 1px solid grey;
}
</style>
