<template>
  <v-dialog max-width="450" v-model="dialog.show" persistent>
    <v-row>
      <v-card-actions>
        <v-btn color="orange lighten-2" text>
          {{
            $vuetify.lang.t(
              "$vuetify.background.cols.category.OBSTETRICAL_GYNECOLOGISTS"
            )
          }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-container class="mt-3">
            <v-row wrap>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.firstPeriodAge"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.consultation.cols.firstPeriodAge.title'
                    )
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.gestitis"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.gestitis.title')
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.parity"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.parity.title')
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.numberLivingChildren"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.consultation.cols.numberLivingChildren.title'
                    )
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.numberDeceasedChildren"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t(
                      '$vuetify.consultation.cols.numberDeceasedChildren.title'
                    )
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="mb-0 py-0">
                <v-text-field
                  dense
                  v-model="form.ivg"
                  color="#49c5b6"
                  :label="
                    $vuetify.lang.t('$vuetify.consultation.cols.ivg.title')
                  "
                  class="font-weight-bold"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-expand-transition>
      <v-col cols="12" sm="6" class="mb-0 py-0">
        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            {{ $vuetify.lang.t("$vuetify.background.cols.category.MEDICAL") }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="showMedical = !showMedical">
            <v-icon>{{
              showMedical ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showMedical">
            <v-divider></v-divider>
            <v-container class="mt-3">
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-select
                  dense
                  v-model="form.tbm"
                  color="#49c5b6"
                  :items="optionTBM.typeTBM"
                  multiple
                  deletable-chips
                  chips
                  clearable
                  :label="$vuetify.lang.t('$vuetify.background.cols.tbm.title')"
                  class="font-weight-bold"
                ></v-select>
              </v-col>
              <v-textarea
                dense
                rows="3"
                v-model="form.description_bm"
                color="#49c5b6"
                :label="
                  $vuetify.lang.t('$vuetify.background.cols.description.title')
                "
                outlined
                clearable
                class="font-weight-bold"
              ></v-textarea>
            </v-container>
          </div>
        </v-expand-transition>
      </v-col>
      <v-col cols="12" sm="6" class="mb-0 py-0">
        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            {{ $vuetify.lang.t("$vuetify.background.cols.category.SURGICAL") }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="showSurgical = !showSurgical">
            <v-icon>{{
              showSurgical ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showSurgical">
            <v-divider></v-divider>
            <v-container class="mt-3">
              <v-col cols="12" sm="12" class="mb-0 py-0">
                <v-select
                  dense
                  v-model="form.tbs"
                  color="#49c5b6"
                  :items="optionTBS.typeTBS"
                  :label="$vuetify.lang.t('$vuetify.background.cols.tbs.title')"
                  multiple
                  deletable-chips
                  chips
                  clearable
                  class="font-weight-bold"
                ></v-select>
              </v-col>
              <v-textarea
                rows="3"
                dense
                v-model="form.description_bs"
                color="#49c5b6"
                :label="
                  $vuetify.lang.t('$vuetify.background.cols.description.title')
                "
                outlined
                clearable
                class="font-weight-bold"
              ></v-textarea>
            </v-container>
          </div>
        </v-expand-transition>
      </v-col>
      <v-col cols="12" sm="6" class="mb-0 py-0">
        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            {{ $vuetify.lang.t("$vuetify.background.cols.category.FAMILY") }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="showFamily = !showFamily">
            <v-icon>{{
              showFamily ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showFamily">
            <v-divider></v-divider>
            <v-container class="mt-3">
              <v-textarea
                rows="3"
                dense
                v-model="form.description_family"
                color="#49c5b6"
                :label="
                  $vuetify.lang.t('$vuetify.background.cols.description.title')
                "
                outlined
                clearable
                class="font-weight-bold"
              ></v-textarea>
            </v-container>
          </div>
        </v-expand-transition>
      </v-col>
      <v-col cols="12" sm="6" class="mb-0 py-0">
        <v-card-actions>
          <v-btn color="orange lighten-2" text>
            {{ $vuetify.lang.t("$vuetify.background.cols.category.ALLERGY") }}
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn icon @click="showAllergy = !showAllergy">
            <v-icon>{{
              showAllergy ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showAllergy">
            <v-divider></v-divider>
            <v-container class="mt-3">
              <v-textarea
                rows="3"
                dense
                v-model="form.description_allergy"
                color="#49c5b6"
                :label="
                  $vuetify.lang.t('$vuetify.background.cols.description.title')
                "
                outlined
                clearable
                class="font-weight-bold"
              ></v-textarea>
            </v-container>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>

    <div v-for="(category, index) in categoryBackground" :key="index">
      <div class="align-center mt-3" style="height: 40px">
        <v-row>
          <v-col cols="12" sm="11" class="mb-0 py-0">
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-select
                dense
                v-model="category.categoryBack"
                color="#49c5b6"
                :items="optionCategory.typeCategory"
                deletable-chips
                clearable
                :label="$vuetify.lang.t('$vuetify.background.cols.tbm.title')"
                class="font-weight-bold"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12" class="mb-0 py-0">
              <v-row
                wrap
                v-if="category.categoryBack === 'OBSTETRICAL_GYNECOLOGISTS'"
              >
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.firstPeriodAge"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.firstPeriodAge.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.gestitis"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.gestitis.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.parity"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t('$vuetify.consultation.cols.parity.title')
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.numberLivingChildren"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.numberLivingChildren.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.numberDeceasedChildren"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t(
                        '$vuetify.consultation.cols.numberDeceasedChildren.title'
                      )
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="mb-0 py-0">
                  <v-text-field
                    dense
                    v-model="category.ivg"
                    color="#49c5b6"
                    :label="
                      $vuetify.lang.t('$vuetify.consultation.cols.ivg.title')
                    "
                    class="font-weight-bold"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="12" sm="1" class="mb-0 py-0">
            <v-icon
              class="ml-1 mb-2"
              style="width: 10px"
              v-if="index > 0"
              @click="removeColumnCategoryBackground(index)"
            >
              mdi-minus-circle-outline
            </v-icon>
          </v-col>
        </v-row>
      </div>
    </div>
    <v-card>
      <v-card-title>
        <div class="title">
          {{ $vuetify.lang.t("$vuetify.users.detail") }}
        </div>
        <v-spacer></v-spacer>
        <v-icon color="red" @click="dialog.show = false">
          mdi-close-circle
        </v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          :label="$vuetify.lang.t('$vuetify.users.cols.username.title')"
          prepend-icon="mdi-account-outline"
          class="font-weight-medium mb-0 mt-3"
          readonly
          v-model="form.username"
        ></v-text-field>
        <v-text-field
          :label="$vuetify.lang.t('$vuetify.users.cols.role.title')"
          prepend-icon="mdi-account-group-outline"
          class="font-weight-medium mb-0 mt-3"
          readonly
          :value="$vuetify.lang.t('$vuetify.roles.' + form.role)"
        ></v-text-field>
        <v-text-field
          :label="$vuetify.lang.t('$vuetify.users.cols.phone.title')"
          prepend-icon="mdi-phone-outline"
          class="font-weight-medium mb-0 mt-3"
          readonly
          v-model="form.phone"
        ></v-text-field>
        <p class="mb-0 mt-3">
          <v-icon class="mr-3 mb-1">mdi-home-outline</v-icon>
          <span>
            {{ $vuetify.lang.t("$vuetify.users.cols.enterprises.title2") }}
            <template v-for="enterprises in form.enterprises">
              <v-chip
                class="ma-2"
                color="secondary"
                text-color="white"
                small
                :key="enterprises.id"
                v-if="!enterprises.deleted"
              >
                {{ enterprises.name }}
              </v-chip>
            </template>
          </span>
        </p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      default: function () {
        return {
          show: false,
        };
      },
    },
    form: {
      type: Object,
      default: function () {
        return {
          role: null,
          is_active: false,
          username: null,
          phone: null,
          enterprises: [],
        };
      },
    },
  },
  methods: {
    setForm(item) {
      this.form.username = item.username;
      this.form.role = item.role;
      this.form.is_active = item.is_active;
      this.form.phone = item.profile.phone;
      this.form.enterprises = item.enterprises;
    },
  },
};
</script>
