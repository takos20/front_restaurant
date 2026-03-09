<template>
  <v-dialog v-model="dialog.show" persistent max-width="680px">
    <v-card>
      <v-toolbar dark color="#f5f5f5" dense>
        <div class="title" style="color: black">
          {{ $vuetify.lang.t("$vuetify.conversation.new.title") }}
        </div>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn icon light @click="dialog.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      </v-card-actions>
      <v-form @submit.prevent="save">
        <v-card-text>
          <v-container>
            <v-row wrap>
              <v-col cols="12" sm="5" class="mb-0 py-0">
                <v-autocomplete
                  v-model="form.receiver"
                  :items="itemsUsers"
                  :loading="isLoading"
                  :search-input.sync="search"
                  color="primary"
                  item-text="username"
                  @blur="$v.form.receiver.$touch()"
                  @input="$v.form.receiver.$touch()"
                  :error-messages="receiverErrors"
                  item-value="id"
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
              <v-col cols="12" sm="7" class="mb-0 py-0"> </v-col>
              <v-col cols="12" sm="10" class="mb-0 py-0">
                <v-textarea
                  rows="2"
                  v-model="form.message"
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
              <v-col cols="12" sm="1" class="mb-0 py-0">
                <v-btn color="primary" :loading="loading" dark type="submit">
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
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
          message: null,
          receiver: null,
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
    urlItems: "messages",
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
        message: {
          required,
          maxLength: maxLength(1200),
        },
        receiver: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store

    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        receiver: this.form.receiver,
        message: this.form.message,
        sender: this.$auth.user().id,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.form.id = item.id;
      this.form.message = item.message;
      this.form.receiver = item.receiver["id"];
      this.itemsUsers.push(item.receiver);
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    messageErrors() {
      let errors = [];
      if (!this.$v.form.message.$dirty) return errors;
      !this.$v.form.message.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.conversation.cols.message.required")
        );

      return errors;
    },
    receiverErrors() {
      let errors = [];
      if (!this.$v.form.receiver.$dirty) return errors;
      !this.$v.form.receiver.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.conversation.cols.receiver.required")
        );

      return errors;
    },
  },
};
</script>
