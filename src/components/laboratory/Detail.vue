<template>
  <v-dialog max-width="450" v-model="dialog.show" persistent>
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
