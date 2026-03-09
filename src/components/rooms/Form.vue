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
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-select
                    v-model="form.status"
                    outlined
                    color="primary"
                    required
                    dense
                    clearable
                    prepend-inner-icon="mdi-account-group-outline"
                    :items="optionRoomStatus.type_room_status"
                    :label="$vuetify.lang.t('$vuetify.room.cols.status.title')"
                  ></v-select>
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
                <v-col cols="12" sm="12" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.reason"
                    color="primary"
                    :label="$vuetify.lang.t('$vuetify.room.cols.reason.title')"
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                  >
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
import { existNameRoom } from "../../helpers/Validator";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          name: null,
          reason: null,
          status: null,
          type_room: null,
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
    optionRoomStatus: {
      type_room_status: [],
    },
    is_active: true,
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    urlItems: "rooms",
    urlTypes_rooms: "types_rooms",
    isLoadingTypes_rooms: false,
    searchTypes_rooms: null,
    itemsTypes_rooms: [],
    isLoading: false,
  }),
  watch: {
    searchTypes_rooms(value) {
      if (value === null) return;
      const params = { title: value };
      let self = this;
      this.isLoadingTypes_rooms = true;
      this.$store
        .dispatch("request", {
          url: self.urlTypes_rooms,
          params: params,
        })
        .then((response) => {
          self.itemsTypes_rooms = response.data.content;
        })
        .finally(() => (this.isLoadingTypes_rooms = false));
    },
  },

  created() {
    this.getOptionsRoomStatus();
  },
  validations() {
    let validators = {
      form: {
        name: {
          required,
          unique: existNameRoom,
        },
        type_room: {
          required,
        },
      },
    };
    return validators;
  },
  methods: {
    getOptionsRoomStatus() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_room_status, (type_room_status) => {
        self.optionRoomStatus.type_room_status.push({
          text: self.$vuetify.lang.t(type_room_status.text),
          value: type_room_status.value,
        });
      });
    },
    // Fonction pour récuperer les types de roles dans la store
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        name: this.form.name,
        reason: this.form.reason,
        status: this.form.status,
        type_room: this.form.type_room,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification

      this.form.id = item.id;
      this.form.code = item.code;
      this.form.name = item.name;
      this.form.reason = item.reason;
      this.form.status = item.status;
      this.form.type_room = item.types_rooms["id"];
      this.itemsTypes_rooms.push(item.types_rooms);
      this.form["oldName"] = item.name;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;

      !this.$v.form.name.required &&
        errors.push(this.$vuetify.lang.t("$vuetify.room.cols.name.required"));

      !this.$v.form.name.unique &&
        errors.push(this.$vuetify.lang.t("$vuetify.room.cols.name.unique"));
      return errors;
    },
    types_roomsErrors() {
      let errors = [];
      if (!this.$v.form.type_room.$dirty) return errors;

      !this.$v.form.type_room.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.room.cols.types_rooms.required")
        );

      return errors;
    },
  },
  components: {},
};
</script>
