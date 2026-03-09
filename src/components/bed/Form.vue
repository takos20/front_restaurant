<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="saveRadiography">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row wrap>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.code"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.nature_code.title'
                      )
                    "
                    prepend-inner-icon="mdi-code-array mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    filled
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0"></v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-autocomplete
                    dense
                    v-model="form.room"
                    :items="itemsRoom"
                    :loading="isLoadingRoom"
                    :search-input.sync="searchRoom"
                    @blur="$v.form.room.$touch()"
                    @input="$v.form.room.$touch()"
                    :error-messages="roomErrors"
                    :label="$vuetify.lang.t('$vuetify.room.title')"
                    color="primary"
                    item-text="name"
                    hide-no-data
                    item-value="id"
                    class="font-weight-bold"
                    prepend-inner-icon="mdi-code-array"
                    outlined
                    clearable
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.room.title") }}
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.room.cols.name.title')"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
                    <template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{ $vuetify.lang.t("$vuetify.room.cols.name.title") }}
                    </template>
                  </v-text-field>
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
    </v-card>
  </v-dialog>
</template>

<script>
import FormMixin from "./../../mixins/Common/Form.vue";
// import {mapGetters} from "vuex";
import { required } from "vuelidate/lib/validators";
import { existNameBed } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          room: null,
          code: null,
        };
      },
    },
  },
  data: () => ({
    formData: {
      id: null,
      name: null,
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlRoom: "rooms",
    isLoadingRoom: false,
    searchRoom: null,
    itemsRoom: [],
    urlItems: "beds",
    isLoading: false,
  }),
  watch: {
    searchRoom(value) {
      if (value === null) return;
      const params = { name: value };
      let self = this;
      this.isLoadingRoom = true;
      this.$store
        .dispatch("request", {
          url: self.urlRoom,
          params: params,
        })
        .then((response) => {
          self.itemsRoom = response.data.content;
        })
        .finally(() => (this.isLoadingRoom = false));
    },
  },

  created() {
    //this.setItemRoles();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameBed,
        },
        room: {
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
        name: this.form.name,
        room: this.form.room,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form.room = item.room["id"];
      this.itemsRoom.push(item.bed);
      this.form["oldName"] = item.name;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    roomErrors() {
      let errors = [];
      if (!this.$v.form.room.$dirty) return errors;

      !this.$v.form.room.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.room.required"));

      return errors;
    },
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.room.cols.name.required"));

      !this.$v.form.name.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.room.cols.name.unique"));
      return errors;
    },
  },
  components: {},
};
</script>
