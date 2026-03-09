<template>
  <v-dialog v-model="dialog.show" persistent max-width="870px">
    <v-card style="background-color: #eceff1">
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-form @submit.prevent="save">
        <v-card max-width="820px" class="ml-6">
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-autocomplete
                    v-model="form.guests"
                    :items="itemsGuests"
                    :loading="isLoadingGuests"
                    :search-input.sync="searchGuests"
                    color="primary"
                    item-text="name"
                    item-value="id"
                    :label="
                      $vuetify.lang.t('$vuetify.meeting.cols.guests.title')
                    "
                    prepend-inner-icon="mdi-account-multiple-plus mdi-dark mdi-18px"
                    class="font-weight-bold"
                    @blur="$v.form.guests.$touch()"
                    @input="$v.form.guests.$touch()"
                    :error-messages="guestsErrors"
                    outlined
                    dense
                    multiple
                    chips
                    clearable
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.profile.name }}
                    </template>
                    <template v-slot:item="data">
                      {{ data.item.profile.name }}
                    </template>
                  </v-autocomplete>
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
        </v-card>
      </v-form>
      <v-card-text> </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          guests: null,
          committee: null,
        };
      },
    },
  },
  data: () => ({
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    isLoadingGuests: false,
    searchGuests: null,
    itemsGuests: [],
    urlGuests: "users",
    // formR: {
    //   id: null,
    //   name: null
    // },
    urlItems: "meetings",
  }),
  watch: {
    searchGuests(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingGuests = true;
      this.$store
        .dispatch("request", {
          url: self.urlGuests,
          params: params,
        })
        .then((response) => {
          // console.log("respp", response.data.content);
          self.itemsGuests = response.data.content;
        })
        .finally(() => (this.isLoadingGuests = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        guests: {
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
        guests: this.form.guests,
        committee: this.$route.params.id,
      };
      return data;
    },
    setItemsGuests(use) {
      let self = this;
      self.form.guests = [];
      use.forEach((user) => {
        self.itemsGuests.push(user);
        self.form.guests.push(user.id);
      });
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.guests = item.guests;
      this.setItemsGuests(item.guests);
    },
  },
  computed: {
    guestsErrors() {
      let errors = [];
      if (!this.$v.form.guests.$dirty) return errors;
      !this.$v.form.guests.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.meeting.cols.guests.required")
        );
      return errors;
    },
    // Gestion des erreurs du formulaire
  },
  components: {},
};
</script>
