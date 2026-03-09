<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.conversation.new.titleRoom") }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <!--              <template-->
              <!--                  v-if="_.includes(this.$auth.user().permissions, 'add_chatroom')"-->
              <!--              >-->
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.member"
                  :items="itemsUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="username"
                  item-value="id"
                  @blur="$v.form.member.$touch()"
                  @input="$v.form.member.$touch()"
                  :error-messages="memberErrors"
                  multiple
                  :label="
                    $vuetify.lang.t('$vuetify.conversation.cols.receiver.title')
                  "
                  prepend-inner-icon="mdi-hospital mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                  clearable
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-text-field
                  v-model="form.name"
                  rows="2"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.conversation.cols.name.title')
                  "
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  @blur="$v.form.name.$touch()"
                  @input="$v.form.name.$touch()"
                  :error-messages="nameErrors"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-textarea
                  v-model="form.message"
                  rows="2"
                  color="primary"
                  :label="
                    $vuetify.lang.t('$vuetify.conversation.cols.message.title')
                  "
                  @blur="$v.form.message.$touch()"
                  @input="$v.form.message.$touch()"
                  :error-messages="messageErrors"
                  prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                  class="font-weight-bold"
                  outlined
                  dense
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider class="mx-4" style="margin-top: -25px"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.show = false">
            {{ $vuetify.lang.t("$vuetify.btn.close") }}
          </v-btn>
          <v-btn color="primary" :loading="loading" dark type="submit">
            {{ $vuetify.lang.t(messages.submit) }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          sender: null,
          member: [],
          name: null,
          message: null,
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
    is_active: true,
    urlItems: "chatrooms",
    urlUsers: "users",
    isLoading: false,
    search: null,
    itemsUsers: [],
  }),
  watch: {
    search(value) {
      if (value === null) return;
      const params = { username: value };
      let self = this;
      this.isLoading = true;
      this.$store
        .dispatch("request", {
          url: self.urlUsers,
          params: params,
        })
        .then((response) => {
          self.itemsUsers = response.data.content;
        })
        .finally(() => (this.isLoading = false));
    },
  },
  created() {},
  validations() {
    let validators = {
      form: {
        name: {
          required,
          maxLength: maxLength(255),
        },
        member: {
          required,
        },
        message: {
          required,
          maxLength: maxLength(1200),
        },
      },
    };
    return validators;
  },
  methods: {
    setItemsUsers(use) {
      let self = this;
      self.form.user = [];
      use.forEach((user) => {
        self.itemsUsers.push(user);
        self.form.user.push(user.id);
      });
    },
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        name: this.form.name,
        member: this.form.member,
        message: this.form.message,
        sender: this.form.member,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.message = item.message;
      this.form.name = item.name;
      this.setItemsUsers(item.member);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.conversation.cols.name.required")
        );

      return errors;
    },
    messageErrors() {
      let errors = [];
      if (!this.$v.form.message.$dirty) return errors;
      !this.$v.form.message.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.conversation.cols.message.required")
        );

      return errors;
    },
    memberErrors() {
      let errors = [];
      if (!this.$v.form.member.$dirty) return errors;
      !this.$v.form.member.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.conversation.cols.receiver.required")
        );

      return errors;
    },
  },
};
</script>
