<template>
  <v-dialog v-model="dialog.show" persistent max-width="780px">
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t(messages.title) }}
        </div>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-form @submit.prevent="save">
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
                  ></v-text-field> </v-col
                ><v-col cols="12" sm="4" class="mb-0 py-0"> </v-col>
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-select
                    v-model="form.type"
                    color="primary"
                    :items="optionMovement.type_Movement"
                    @blur="$v.form.type.$touch()"
                    @input="$v.form.type.$touch()"
                    :error-messages="typeErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.type.title'
                      )
                    "
                    dense
                    prepend-inner-icon="mdi-format-list-bulleted-type mdi-dark mdi-18px"
                    outlined
                    class="font-weight-bold"
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.expenses_nature.cols.type.title"
                        )
                      }}
                    </template></v-select
                  >
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.name"
                    color="primary"
                    @blur="$v.form.name.$touch()"
                    @input="$v.form.name.$touch()"
                    :error-messages="nameErrors"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.name.title'
                      )
                    "
                    prepend-inner-icon="mdi-rename-box mdi-dark mdi-18px"
                    class="font-weight-bold"
                    outlined
                    dense
                    ><template #label>
                      <span class="red--text"><strong>* </strong></span
                      >{{
                        $vuetify.lang.t(
                          "$vuetify.expenses_nature.cols.name.title"
                        )
                      }}
                    </template></v-text-field
                  >
                </v-col>
                <!--<v-col cols="12" sm="6" class="mb-0 py-0">-->
                <!--<v-text-field-->
                <!--v-model="form.nature"-->
                <!--color="primary"-->
                <!--:label="-->
                <!--$vuetify.lang.t(-->
                <!--'$vuetify.expenses_nature.cols.nature.title'-->
                <!--)-->
                <!--"-->
                <!--prepend-inner-icon="mdi-shield-account-outline"-->
                <!--class="font-weight-bold"-->
                <!--type="nature"-->
                <!--outlined-->
                <!--dense-->
                <!--&gt;</v-text-field>-->
                <!--</v-col>-->
                <v-col cols="12" sm="4" class="mb-0 py-0">
                  <v-text-field
                    v-model="form.account_number"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.expenses_nature.cols.account_number.title'
                      )
                    "
                    prepend-inner-icon="mdi-numeric mdi-dark mdi-18px"
                    class="font-weight-bold"
                    type="nature"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                  class="mb-0 py-0"
                  style="margin-top: -20px"
                >
                  <v-switch
                    v-model="is_active"
                    color="primary"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.medical_areas.cols.status.enabled'
                      )
                    "
                    outlined
                    dense
                  ></v-switch>
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
import { required, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [FormMixin],
  props: {
    form: {
      type: Object,
      default: function () {
        return {
          id: null,
          code: null,
          type: null,
          name: null,
          account_number: null,
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
    optionMovement: {
      type_Movement: [],
    },
    urlItems: "expenses_nature",
  }),
  watch: {},

  created() {
    this.getOptionsMovement();
  },
  validations() {
    let validators = {
      form: {
        type: {
          required,
          maxLength: maxLength(100),
        },
        name: {
          required,
          maxLength: maxLength(255),
          minLength: minLength(3),
        },
      },
    };
    return validators;
  },
  methods: {
    // Fonction pour récuperer les types de roles dans la store
    getOptionsMovement() {
      // On pouvait aussi utliser le forEach au lieu de   _.eaach
      let self = this;
      this._.each(this.$store.getters.type_Movement, (type_Movement) => {
        self.optionMovement.type_Movement.push({
          text: self.$vuetify.lang.t(type_Movement.text),
          value: type_Movement.value,
        });
      });
    },
    // Fonction pour récuperer le contenu des champs du formulaire
    getDataForm() {
      let data = {
        account_number: this.form.account_number,
        is_active: this.is_active,
        type: this.form.type,
        name: this.form.name,
        role: this.form.role,
      };
      return data;
    },
    setForm(item) {
      // Données envoyées lors de la modification
      this.is_active = item.is_active;
      this.form.id = item.id;
      this.form.code = item.code;
      this.form.type = item.type;
      this.form.name = item.name;
      this.form["oldname"] = item.name;
      this.form.account_number = item.account_number;
    },
  },
  computed: {
    // Gestion des erreurs du formulaire
    typeErrors() {
      let errors = [];
      if (!this.$v.form.type.$dirty) return errors;
      !this.$v.form.type.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.expenses_nature.cols.type.required")
        );
      return errors;
    },
    nameErrors() {
      let errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required &&
        errors.push(
          this.$vuetify.lang.t("$vuetify.expenses_nature.cols.name.required")
        );
      return errors;
    },
  },
  components: {},
};
</script>
