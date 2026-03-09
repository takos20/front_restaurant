<template>
  <v-app class="app">
    <v-app-bar app flat color="white" elevate-on-scroll class="px-4">
      <!-- Logo / Title -->
      <v-toolbar-title class="font-weight-bold primary--text">
        MATRIIX-RESTAURANT
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- ================= DESKTOP MODULE NAVIGATION ================= -->
      <v-sheet
        class="mx-4 hidden-sm-and-down"
        max-width="1000"
        color="transparent"
      >
        <v-slide-group show-arrows center-active>
          <!-- ORGANIZATION -->
          <v-slide-item>
            <v-btn
              class="mx-1 text-none"
              rounded
              small
              elevation="0"
              color="primary"
              :class="{ 'elevation-3': $route.params.idD === 'organization' }"
              :disabled="
                !_.includes(
                  $auth.user().permissions,
                  'view_organisation_module'
                )
              "
              @click="organization()"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}
            </v-btn>
          </v-slide-item>

          <!-- BILLING -->
          <v-slide-item>
            <v-btn
              class="mx-1 text-none"
              rounded
              small
              elevation="0"
              color="primary"
              :class="{ 'elevation-3': $route.params.idD === 'billing' }"
              :disabled="
                !_.includes($auth.user().permissions, 'view_billing_module')
              "
              @click="billing()"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}
            </v-btn>
          </v-slide-item>

          <!-- PHARMACY -->
          <v-slide-item>
            <v-btn
              class="mx-1 text-none"
              rounded
              small
              elevation="0"
              color="primary"
              :class="{ 'elevation-3': $route.params.idD === 'stock' }"
              :disabled="
                !_.includes($auth.user().permissions, 'view_pharmacy_module')
              "
              @click="pharmacy()"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>

      <!-- ================= MOBILE MODULE MENU ================= -->
      <v-menu offset-y class="hidden-md-and-up">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="primary">mdi-view-grid</v-icon>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item
            v-if="
              _.includes($auth.user().permissions, 'view_organisation_module')
            "
            @click="organization()"
          >
            <v-list-item-title>
              {{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="_.includes($auth.user().permissions, 'view_billing_module')"
            @click="billing()"
          >
            <v-list-item-title>
              {{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="_.includes($auth.user().permissions, 'view_pharmacy_module')"
            @click="pharmacy()"
          >
            <v-list-item-title>
              {{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- ================= ADD BILL BUTTON ================= -->
      <template v-if="_.includes($auth.user().permissions, 'add_bills')">
        <v-btn
          class="mx-2 hidden-sm-and-down"
          color="primary"
          dark
          small
          @click="createBills()"
        >
          <v-icon left small>mdi-content-paste</v-icon>
          {{ $vuetify.lang.t("$vuetify.bills.new.add_product") }}
        </v-btn>
      </template>

      <!-- ================= NOTIFICATIONS ================= -->
      <v-menu
        bottom
        left
        transition="scale-transition"
        v-if="['billing', 'pharmacy'].includes($route.params.idD)"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="create">
            <v-badge
              :content="numberItems"
              :value="numberItems > 0"
              color="red"
              overlap
            >
              <v-icon color="primary">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
      </v-menu>

      <!-- ================= LANGUAGE SWITCH ================= -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="changeLanguage">
            <v-icon color="primary">mdi-earth</v-icon>
          </v-btn>
        </template>
        <span class="font-weight-bold body-2">
          {{ $vuetify.lang.t("$vuetify.btn.change_language") }}
        </span>
      </v-tooltip>

      <!-- ================= USER MENU ================= -->
      <v-menu bottom offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn class="ml-3" fab small color="primary" v-on="on">
            <v-icon dark>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list class="menu-app-bar">
          <v-list-item @click="my_account">
            <v-list-item-icon>
              <v-icon color="primary">mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $vuetify.lang.t("$vuetify.menu.settings_account") }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="log_out">
            <v-list-item-icon>
              <v-icon color="error">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $vuetify.lang.t("$vuetify.menu.logout") }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Drawer Toggle -->
      <v-app-bar-nav-icon @click="drawer = !drawer" color="primary" />
    </v-app-bar>
    <v-card-text class="text-right mb-0"> </v-card-text>
    <!--    <v-navigation-drawer-->
    <!--        v-model="drawer"-->
    <!--        :mini-variant.sync="mini"-->
    <!--        height="100vh"-->
    <!--        permanent-->
    <!--        color="blue-grey darken-4"-->
    <!--    >-->
    <!--      <v-list-item class="px-2">-->
    <!--        <v-list-item-avatar>-->
    <!--          <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />-->
    <!--        </v-list-item-avatar>-->

    <!--        <v-list-item-title class="ListItemClass">-->
    <!--          John Leider-->
    <!--        </v-list-item-title>-->

    <!--        <v-btn-->
    <!--            icon-->
    <!--            @click.stop="mini = !mini"-->
    <!--            color="blue-grey lighten-5"-->
    <!--        >-->
    <!--          <v-icon>mdi-chevron-left</v-icon>-->
    <!--        </v-btn>-->
    <!--      </v-list-item>-->

    <!--      <v-list-item class="mb-1 px-2">-->
    <!--        <v-list-item-icon>-->
    <!--          <v-btn-->
    <!--              icon-->
    <!--              @click.stop="mini = !mini"-->
    <!--              color="blue-grey lighten-5"-->
    <!--          >-->
    <!--            <v-icon>mdi-arrow-expand-horizontal</v-icon>-->
    <!--          </v-btn>-->
    <!--        </v-list-item-icon>-->
    <!--      </v-list-item>-->
    <!--      <div-->
    <!--          id="divider"-->
    <!--          style="background-color:#f5f5f5; height: 2px; width:80%;margin: 0 auto;;"-->
    <!--      />-->

    <!--      <v-list dense>-->
    <!--        <v-list-item-->
    <!--            class="SelectedTile"-->
    <!--            v-for="item in items"-->
    <!--            :key="item.title"-->
    <!--            link-->
    <!--        >-->
    <!--          <v-list-item-icon>-->
    <!--            <v-icon color="blue-grey lighten-5">-->
    <!--              {{ item.icon }}-->
    <!--            </v-icon>-->
    <!--          </v-list-item-icon>-->

    <!--          <v-list-item-content color="blue-grey lighten-5">-->
    <!--            <v-list-item-title class="ListItemClass">-->
    <!--              {{ item.title }}-->
    <!--            </v-list-item-title>-->
    <!--          </v-list-item-content>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <v-navigation-drawer
      app
      v-model="drawer"
      color="navbar"
      width="250"
      class="elevation-2"
      v-if="$route.params.idD"
    >
      <div class="text-center mt-5 pa-2">
        <!-- Logo -->
        <!-- <img
          :src="require('../assets/logo-masys.png')"
          style="width: 230px"
          alt="Logo"
        /> -->

        <!-- User Avatar & Info -->
        <v-avatar class="my-1 mx-auto" size="80">
          <v-img :src="require('../assets/user.png')" alt="User avatar"></v-img>
        </v-avatar>

        <!-- Hospital Name -->
        <div
          v-if="this.$auth.user().hospital !== null"
          class="text-h8 font-weight-medium mb-2"
        >
          {{ $auth.user().hospital.name }}
        </div>

        <!-- Username or UNKNOWN -->
        <div class="text-h6 font-weight-bold">
          <span v-if="$auth.user() !== null">
            {{ $auth.user().username }}
          </span>
          <span v-else>UNKNOWN</span>
        </div>

        <!-- Email or UNKNOWN -->
        <div class="text-caption grey--text">
          <span v-if="$auth.user() !== null">
            {{ $auth.user().email }}
          </span>
          <span v-else>UNKNOWN</span>
        </div>

        <v-divider color="white" class="my-3"></v-divider>
        <!-- <v-sheet
          class="mx-auto"
          max-width="1000"
          color="#E9EEF4"
          mobile-breakpoint="600"
        >
          <v-slide-group
            multiple
            show-arrows
            center-active
            mobile-breakpoint="1000"
          >
            <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                rounded
                small
                color="primary"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_organisation_module'
                  )
                "
                @click="organization()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}</v-btn
              >
            </v-slide-item>
             <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                rounded
                small
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_secretariat_module'
                  )
                "
                color="primary"
                @click="secretariat()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}</v-btn
              >
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                rounded
                small
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_billing_module'
                  )
                "
                color="primary"
                @click="billing()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}</v-btn
              >
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                rounded
                small
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_pharmacy_module'
                  )
                "
                color="primary"
                @click="pharmacy()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}</v-btn
              >
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(this.$auth.user().permissions, 'view_rh_module')
                "
                color="primary"
                rounded
                small
                @click="grh()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.grh") }}</v-btn
              >
            </v-slide-item>
            <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_consultation_module'
                  )
                "
                rounded
                small
                color="primary"
                @click="consultation()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.consultation") }}</v-btn
              >
            </v-slide-item> -->

        <!-- <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_laboratory_module'
                  )
                "
                color="primary"
                @click="laboratory()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.laboratory") }}</v-btn
              >
            </v-slide-item> -->
        <!-- <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_radiography_module'
                  )
                "
                color="primary"
                @click="radiography()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.radiography") }}</v-btn
              >
            </v-slide-item> -->
        <!-- <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_diagnostic_module'
                  )
                "
                color="primary"
                @click="diagnostic()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.diagnostic") }}</v-btn
              >
            </v-slide-item> -->

        <!-- <v-slide-item>
              <v-btn
                class="mx-1 white--text"
                :disabled="
                  !_.includes(
                    this.$auth.user().permissions,
                    'view_surgery_module'
                  )
                "
                color="primary"
                @click="surgery()"
                >{{ $vuetify.lang.t("$vuetify.hospitals.surgery") }}</v-btn
              >
            </v-slide-item>
          </v-slide-group>
        </v-sheet> -->
        <!-- <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'organization'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'secretariat'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            v-if="this.$route.params.idD === 'billing'"
            class="font-weight-black title text-center"
            >{{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'stock'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'consultation'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.consultation") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'hospitalization'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.hospitalization") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'laboratory'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.laboratory") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'radiography'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.radiography") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'diagnostic'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.diagnostic") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'investigation'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.investigation") }}</v-btn
          >
          <v-btn
            color="primary"
            dark
            outlined
            block
            class="font-weight-black title"
            v-if="this.$route.params.idD === 'surgery'"
            >{{ $vuetify.lang.t("$vuetify.hospitals.surgery") }}</v-btn
          > -->
      </div>
      <div class="pa-2">
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'organization'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'secretariat'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          v-if="this.$route.params.idD === 'billing'"
          class="font-weight-black title text-center"
          >{{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'stock'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}</v-btn
        >
        <!-- <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'consultation'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.consultation") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'hospitalization'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.hospitalization") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'laboratory'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.laboratory") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'radiography'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.radiography") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'diagnostic'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.diagnostic") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'investigation'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.investigation") }}</v-btn
        ><v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'insurance'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.insurance") }}</v-btn
        >
        <v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'surgery'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.surgery") }}</v-btn
        ><v-btn
          color="primary"
          dark
          outlined
          block
          class="font-weight-black title"
          v-if="this.$route.params.idD === 'grh'"
          >{{ $vuetify.lang.t("$vuetify.hospitals.grh") }}</v-btn
        > -->
      </div>
      <v-list dense nav>
        <v-list-item
          :to="{ name: 'dashboardOrganization' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_organization'
            ) && this.$route.params.idD === 'organization'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardRadiography' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_radiography'
            ) && this.$route.params.idD === 'radiography'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardDiagnostic' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_diagnostic'
            ) && this.$route.params.idD === 'diagnostic'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardInvestigation' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_investigation'
            ) && this.$route.params.idD === 'investigation'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardInsurance' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_insurance'
            ) && this.$route.params.idD === 'insurance'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardConsultation' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_consultation'
            ) && this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardHospitalization' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_hospitalization'
            ) && this.$route.params.idD === 'hospitalization'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardLaboratory' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_laboratory'
            ) && this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardSurgery' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_surgery'
            ) && this.$route.params.idD === 'surgery'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!--        <v-list-item-->
        <!--          :to="{ name: 'dashboardBilling' }"-->
        <!--          exact-->
        <!--          exact-active-class="grey lighten-5"-->
        <!--          link-->
        <!--          style="margin-top: 15px"-->
        <!--          v-if="-->
        <!--             this.$route.params.idD === 'billing'-->
        <!--          "-->
        <!--        >-->
        <!--          <v-list-item-icon>-->
        <!--            <v-icon class="mb-2">mdi-finance</v-icon>-->
        <!--          </v-list-item-icon>-->
        <!--          <v-list-item-content style="margin-left: -30px">-->
        <!--            <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}-->
        <!--            </v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <v-list-item
          :to="{ name: 'dashboardBilling' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_billing'
            ) && this.$route.params.idD === 'billing'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardPatient' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_patient'
            ) &&
            this.$route.params.idD === 'secretariat' &&
            this.$auth.user().type === 'PATIENT'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardDoctor' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_doctor'
            ) &&
            this.$route.params.idD === 'secretariat' &&
            this.$auth.user().type === 'DOCTOR'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardSecretariat' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_secretariat'
            ) && this.$route.params.idD === 'secretariat'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--        <v-list-item-->
        <!--          :to="{ name: 'dashboardPharmacy' }"-->
        <!--          exact-->
        <!--          exact-active-class="grey lighten-5"-->
        <!--          link-->
        <!--          style="margin-top: 15px"-->
        <!--          v-if="-->
        <!--            this.$route.params.idD === 'stock'-->
        <!--          "-->
        <!--        >-->
        <!--          <v-list-item-icon>-->
        <!--            <v-icon class="mb-2">mdi-microsoft-windows</v-icon>-->
        <!--          </v-list-item-icon>-->
        <!--          <v-list-item-content style="margin-left: -30px">-->
        <!--            <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}-->
        <!--            </v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <v-list-item
          :to="{ name: 'dashboardPharmacy' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_dashboard_pharmacy'
            ) && this.$route.params.idD === 'stock'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'dashboardGrh' }"
          exact
          exact-active-class="grey lighten-5"
          link
          style="margin-top: 15px"
          v-if="
            _.includes(this.$auth.user().permissions, 'view_dashboard_rh') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon>
            <v-icon class="mb-2">mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.dashboard") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-hospital-building mdi-15px"
          no-action
          v-if="this.$route.params.idD === 'organization'"
        >
          <template v-slot:activator>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.hospitals.titleFOSA") }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <!-- <v-list-item
            :to="{ name: 'departments' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_departments') &&
                this.$route.params.idD === 'organization' &&
                this.$auth.user().type_enterprise === 'HOSPITAL') ||
              $auth.check(['admin']) ||
              $auth.user().is_superuser
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.menu.departments") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <!-- <v-list-item
            :to="{ name: 'services' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_services') &&
                this.$route.params.idD === 'organization' &&
                this.$auth.user().type_enterprise === 'HOSPITAL') ||
              $auth.check(['admin']) ||
              $auth.user().is_superuser
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.menu.services") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item
            :to="{ name: 'hospitals_info' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              $auth &&
              $auth.user() &&
              Array.isArray($auth.user().permissions) &&
              $auth.user().permissions.includes('view_info_hospitals') &&
              $route &&
              $route.params &&
              $route.params.idD === 'organization' &&
              $auth.check(['admin']) &&
              $auth.user().hospital !== null
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.hospitals.titleI") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'hospitals' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_permission') &&
              this.$route.params.idD === 'organization' &&
              $auth.user().is_superuser
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.hospitals.titleI") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item
            :to="{ name: 'modules' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_permission') &&
                this.$route.params.idD === 'organization') ||
                $auth.check(['admin']) || $auth.check(['super_admin'])
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.module.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item
            :to="{ name: 'permissions' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_permission') &&
                this.$route.params.idD === 'organization') ||
              $auth.check(['admin']) ||
              $auth.user().is_superuser
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.permission.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-account-multiple mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_patient') &&
            this.$route.params.idD === 'organization'
          "
        >
          <template v-slot:activator>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.patient.titleG") }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="{ name: 'type_patient' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_type_patient') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--            <v-list-item-icon class="pt-2">-->
            <!--              <v-icon class="mb-2">mdi-account-alert</v-icon>-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.type_patient.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'patient' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_patient') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--            <v-list-item-icon class="pt-2">-->
            <!--              <v-icon class="mb-2">mdi-account-alert</v-icon>-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.patient.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="{ name: 'patientaccount' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_patientaccount'
              ) && this.$route.params.idD === 'organization'
            "
          >
            <!--            <v-list-item-icon class="pt-2">-->
            <!--              <v-icon class="mb-2">mdi-account-alert</v-icon>-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.patientaccount.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'supply_patient' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_patient') &&
              this.$route.params.idD === 'organization'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.supplies.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--          <v-list-item-->
          <!--            :to="{ name: 'checkup_patients' }"-->
          <!--            exact-->
          <!--            exact-active-class="accent lighten-5"-->
          <!--            link-->
          <!--            v-if="-->
          <!--              _.includes(-->
          <!--                this.$auth.user().permissions,-->
          <!--                'view_checkuppatient'-->
          <!--              ) && this.$route.params.idD === 'secretariat'-->
          <!--            "-->
          <!--          >-->
          <!--            &lt;!&ndash;            <v-list-item-icon class="pt-2">&ndash;&gt;-->
          <!--            &lt;!&ndash;              <v-icon class="mb-2">mdi-blur-radial</v-icon>&ndash;&gt;-->
          <!--            &lt;!&ndash;            </v-list-item-icon>&ndash;&gt;-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.checkup.titlePatient") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-alpha-s-circle"
          no-action
          v-if="this.$route.params.idD === 'stock'"
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.kitchen") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'category' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_category') &&
              this.$route.params.idD === 'stock'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.category.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'ingredients' }"
            exact
            exact-active-class="accent lighten-5"
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.ingredient.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'compose_ingredient' }"
            exact
            exact-active-class="accent lighten-5"
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.compose_ingredient.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'compose_preparation' }"
            exact
            exact-active-class="accent lighten-5"
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.compose_preparation.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'dishes' }"
            exact
            exact-active-class="accent lighten-5"
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.dish.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'prices' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_structurearticle'
              ) && this.$route.params.idD === 'stock'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.prices.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'recipes' }"
            exact
            exact-active-class="accent lighten-5"
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.recipe.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--                    <v-list-item-->
          <!--                      :to="{ name: 'price_level' }"-->
          <!--                      exact-->
          <!--                      exact-active-class="accent lighten-5"-->
          <!--                      link-->
          <!--                      v-if="-->
          <!--                          this.$route.params.idD === 'stock'-->
          <!--                      "-->
          <!--                    >-->
          <!--                      <v-list-item-content style="margin-left: -30px">-->
          <!--                        <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                          {{ $vuetify.lang.t("$vuetify.price_level.title") }}-->
          <!--                        </v-list-item-title>-->
          <!--                      </v-list-item-content>-->
          <!--                    </v-list-item>-->
        </v-list-group>

        <v-list-item
          :to="{ name: 'reagent' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_reagent') &&
            this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-atom-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.reagent.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'consumable' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_consumable') &&
            this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-food</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.consumable.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-store"
          no-action
          v-if="
            this.$route.params.idD === 'stock' ||
            (this.$route.params.idD === 'laboratory' &&
              _.includes(this.$auth.user().permissions, 'view_supplies'))
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.purchasing_management") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'suppliers' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_suppliers') &&
                this.$route.params.idD === 'stock') ||
              this.$route.params.idD === 'laboratory'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.suppliers.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item
            :to="{ name: 'supplies' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_supplies') &&
                this.$route.params.idD === 'stock' || this.$route.params.idD === 'laboratory'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.supplies.new.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item
            :to="{ name: 'list_supplies' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(this.$auth.user().permissions, 'view_supplies') &&
                this.$route.params.idD === 'stock') ||
              this.$route.params.idD === 'laboratory'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.supplies.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item
            :to="{ name: 'purchase_order' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              (_.includes(
                this.$auth.user().permissions,
                'view_purchase_order'
              ) &&
                this.$route.params.idD === 'stock') ||
              this.$route.params.idD === 'laboratory'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.purchase.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <!--          <v-list-item-->
          <!--            :to="{ name: 'medical_areas' }"-->
          <!--            exact-->
          <!--            exact-active-class="accent lighten-5"-->
          <!--            link-->
          <!--            v-if="-->
          <!--              _.includes(this.$auth.user().permissions,'view_medical_areas') &&-->
          <!--                this.$route.params.idD === 'secretariat'-->
          <!--            "-->
          <!--          >-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.medical_areas.titles") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
          <!--          <v-list-item-->
          <!--            :to="{ name: 'medical_act' }"-->
          <!--            exact-->
          <!--            exact-active-class="accent lighten-5"-->
          <!--            link-->
          <!--            v-if="-->
          <!--              _.includes(this.$auth.user().permissions,'view_medical_act') &&-->
          <!--                this.$route.params.idD === 'secretariat'-->
          <!--            "-->
          <!--          >-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.medical_act.titles") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
          <!--          <v-list-item-->
          <!--            :to="{ name: 'users' }"-->
          <!--            exact-->
          <!--            exact-active-class="accent lighten-5"-->
          <!--            link-->
          <!--            v-if="-->
          <!--              _.includes(this.$auth.user().permissions,'view_user') &&-->
          <!--                this.$route.params.idD === 'secretariat'-->
          <!--            "-->
          <!--          >-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.menu.user") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
        </v-list-group>
        <v-list-item
          :to="{ name: 'storage_depots' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_storage_depots') &&
            this.$route.params.idD === 'stock'
          "
        >
          <!-- <v-list-item-icon class="pt-2">
          <v-icon class="mb-2" >mdi-account-convert</v-icon>
          </v-list-item-icon> -->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-basket-fill</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.storage_depots") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- v-if="
            _.includes(this.$auth.user().permissions, 'view_movementstock') &&
            this.$route.params.idD === 'stock'
          " -->
        <v-list-item
          :to="{ name: 'stock_analysis' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="this.$route.params.idD === 'stock'"
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-chart-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.stock_movement.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'insurance' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_insurance') &&
            this.$route.params.idD === 'organization'
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-shield-half-full</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.insurance.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'insurance_agency' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_insuranceagency') &&
            this.$route.params.idD === 'insurance' &&
            this.$auth.user().type_enterprise === 'HOSPITAL'
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.insurance_agency") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'proforma' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_proforma') &&
            this.$route.params.idD === 'insurance' &&
            this.$auth.user().type_enterprise === 'HOSPITAL'
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.proforma") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'insurance_settlements' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_insurance') &&
            this.$route.params.idD === 'insurance' &&
            this.$auth.user().type_enterprise === 'HOSPITAL'
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-shield-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.insurance_settlements") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-nature mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_region') &&
            this.$route.params.idD === 'organization'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.hospitals.geolocalisation") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'regions' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_region') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-nature</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.menu.region") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'city' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_city') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.menu.city") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'district' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_district') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.district.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group
          prepend-icon="mdi-sale mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_promotion') &&
            this.$route.params.idD === 'organization'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.promotion.titleManage") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'promotion' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_promotion') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-nature</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.promotion.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'promotion_rule' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_promotionrule') &&
              this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.promotion_rule.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'promotion_action' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_promotionaction'
              ) && this.$route.params.idD === 'organization'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.promotion_action.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- <v-list-item
          :to="{ name: 'medical_areas' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_medical_areas') &&
              this.$route.params.idD === 'secretariat' &&
              this.$auth.user().type_enterprise === 'HOSPITAL'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-domain</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.medical_areas.titles") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          :to="{ name: 'expenses_nature' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_expenses_nature') &&
            this.$route.params.idD === 'billing'
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-arrow-decision-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.expenses_nature") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="mdi-cash mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_cash') &&
            this.$route.params.idD === 'billing'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.cash.title") }}
            </v-list-item-title>
          </template>

          <v-list-item
            :to="{ name: 'cash_position' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_cash_position') &&
              this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.cash_position.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- <v-list-item
            :to="{ name: 'bills' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_bills') &&
                this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.bills.new.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item
            :to="{ name: 'list_bills' }"
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_bills') &&
              this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.bills.list.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-content-paste mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_bills') &&
            this.$route.params.idD === 'billing'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.bills.cols.bill_type.title") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'caterings' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_cateringinfo') &&
              this.$route.params.idD === 'billing'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-nature</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.catering.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'deliveries' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_deliveryinfo') &&
              this.$route.params.idD === 'billing'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.delivery.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'events' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_eventinfo') &&
              this.$route.params.idD === 'billing'
            "
          >
            <!--<v-list-item-icon class="pt-2">-->
            <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
            <!--</v-list-item-icon>-->
            <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-city</v-icon>
          </v-list-item-icon> -->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.event.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group
          prepend-icon="mdi-cash-multiple mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_cash_control') &&
            this.$route.params.idD === 'billing'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
            >
              {{ $vuetify.lang.t("$vuetify.cash.titleCash_control") }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="{ name: 'sessions_analysis' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_session_analysis'
              ) && this.$route.params.idD === 'billing'
            "
            class="my-3"
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.cash.titleSession_analysis") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'bills_analysis' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_bills_analysis'
              ) && this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.cash.titleBills_analysis") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'movements_analysis' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_movements_analysis'
              ) && this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.cash.titleMovement_analysis") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'treasury_journal' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_treasury_journal'
              ) && this.$route.params.idD === 'billing'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.cash.titleTreasury_journal") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- <v-list-item
          :to="{ name: 'medical_act' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_medical_act') &&
              this.$route.params.idD === 'secretariat' &&
              this.$auth.user().type_enterprise === 'HOSPITAL'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-hospital</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.medical_act.titles") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item
          :to="{ name: 'users' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            $route.params.idD === 'organization' &&
            (_.includes($auth.user().permissions, 'view_user') ||
              $auth.check(['admin']) ||
              $auth.user().is_superuser)
          "
        >
          <!--<v-list-item-icon class="pt-2">-->
          <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
          <!--</v-list-item-icon>-->
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.user") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item
          :to="{ name: 'archives' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_archive') &&
            this.$route.params.idD === 'organization'
          "
        > -->
        <!--<v-list-item-icon class="pt-2">-->
        <!--<v-icon class="mb-2" >mdi-account-convert</v-icon>-->
        <!--</v-list-item-icon>-->
        <!-- <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-archive</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.archive") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          :to="{ name: 'backupfiles' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_backupfile') &&
              this.$route.params.idD === 'organization'
          "
        >
          
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-database</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.menu.backupfile") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-group
          prepend-icon="mdi-meteor mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_dosage') &&
            this.$route.params.idD === 'secretariat'
          "
        >
          <template v-slot:activator>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.menu.config") }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <!--          <v-list-item-->
          <!--            :to="{ name: 'checkups' }"-->
          <!--            exact-->
          <!--            exact-active-class="accent lighten-5"-->
          <!--            link-->
          <!--            v-if="-->
          <!--              // _.includes(this.$auth.user().permissions, 'view_checkup') &&-->
          <!--                this.$route.params.idD === 'secretariat'-->
          <!--            "-->
          <!--          >-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.checkup.title") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->
          <v-list-item
            :to="{ name: 'prices' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="this.$route.params.idD === 'organization'"
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.prices.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!--          <v-list-item-->
          <!--              :to="{ name: 'qteDosage' }"-->
          <!--              exact-->
          <!--              exact-active-class="accent lighten-5"-->
          <!--              link-->
          <!--              v-if="this.$route.params.idD === 'secretariat'"-->
          <!--          >-->
          <!--            <v-list-item-content style="margin-left: -30px">-->
          <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
          <!--                {{ $vuetify.lang.t("$vuetify.qteDosage.title") }}-->
          <!--              </v-list-item-title>-->
          <!--            </v-list-item-content>-->
          <!--          </v-list-item>-->

          <v-list-item
            :to="{ name: 'dosage' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_dosage') &&
              this.$route.params.idD === 'secretariat'
            "
          >
            <!--            <v-list-item-icon class="pt-2">-->
            <!--              <v-icon class="mb-2">mdi-medical-bag</v-icon>-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.dosage.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          prepend-icon="mdi-doctor mdi-15px"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_doctor') &&
            this.$route.params.idD === 'secretariat'
          "
        >
          <template v-slot:activator>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.doctor.titleManage") }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="{ name: 'type_doctor' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_type_doctor') &&
              this.$route.params.idD === 'secretariat'
            "
          >
            <!--            <v-list-item-icon class="pt-2">-->
            <!--              <v-icon class="mb-2">mdi-account-alert</v-icon>-->
            <!--            </v-list-item-icon>-->
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.type_doctor.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'doctor' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_doctor') &&
              this.$route.params.idD === 'secretariat'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.doctor.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'schedule' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_doctor') &&
              this.$route.params.idD === 'secretariat'
            "
            class="mr-5"
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title
                class="font-weight-bold subtitle-1 black--text"
              >
                {{ $vuetify.lang.t("$vuetify.doctor.schedule") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!--        <v-list-group-->
        <!--          prepend-icon="mdi-clipboard-text"-->
        <!--          no-action-->
        <!--          v-if="-->
        <!--            _.includes(this.$auth.user().permissions, 'view_consultation') &&-->
        <!--              this.$route.params.idD === 'secretariat'-->
        <!--          "-->
        <!--        >-->
        <!--          <template v-slot:activator>-->
        <!--            <v-list-item-title class="font-weight-bold subtitle-1">{{-->
        <!--              $vuetify.lang.t("$vuetify.consultation.title")-->
        <!--            }}</v-list-item-title>-->
        <!--          </template>-->
        <!--          <v-list-item :to="{ name: 'medical_consultation' }" exact link>-->
        <!--            <v-list-item-content style="margin-left: -30px">-->
        <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--                {{ $vuetify.lang.t("$vuetify.consultation.titleM") }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--          <v-list-item :to="{ name: 'prenatal_consultation' }" exact link>-->
        <!--            <v-list-item-content style="margin-left: -30px">-->
        <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--                {{ $vuetify.lang.t("$vuetify.consultation.titleP") }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--          <v-list-item :to="{ name: 'pregnancy_visits' }" exact link>-->
        <!--            <v-list-item-content style="margin-left: -30px">-->
        <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--                {{ $vuetify.lang.t("$vuetify.pregnancy_visit.title") }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--          <v-list-item :to="{ name: 'ophtamological_consultation' }" exact link>-->
        <!--            <v-list-item-content style="margin-left: -30px">-->
        <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--                {{ $vuetify.lang.t("$vuetify.consultation.titleO") }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->
        <!--        </v-list-group>-->

        <v-list-item
          :to="{ name: 'radiographs' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_radiography') &&
            this.$route.params.idD === 'radiography'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.radiography.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          :to="{ name: 'function_exploration' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_functional_exploration'
            ) && this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.function_exploration.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          :to="{ name: 'radio_patients' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_radiopatient') &&
            this.$route.params.idD === 'radiography'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-blur-radial</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.radiography.titlePatient") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'function' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_function') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-dots-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.function.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'typeContract' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_typecontract') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-file-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.typeContract.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'sanction' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_sanction') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-alert-decagram</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.sanction.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'mySanction' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_sanction') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-alert-decagram</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.sanction.mySanction") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'leave' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_leave') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-leaf-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.leave.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'myLeave' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_leave') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-leaf-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.leave.myLeave") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'performanceBonus' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_performancebonus'
            ) && this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-medal</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.performanceBonus.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'taxeContribution' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_taxecontribution'
            ) && this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-medal</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.taxeContribution.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'myBonus' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_bonus') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-medal</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.performanceBonus.myBonus") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'employee' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_employee') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-human-male-female</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.employee.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'internalnote' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_internalnote') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.internalnote.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'usernote' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_note') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.internalnote.myNote") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'myMission' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_mission') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.employeeMission.myMission") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          :to="{ name: 'myMeeting' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_meeting') &&
              this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.meeting.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          :to="{ name: 'myPayslips' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_my_payslips') &&
            this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.payslips.myPayslips") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-account-settings"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_employee') &&
            this.$route.params.idD === 'grh'
          "
        >
          <template v-slot:activator style="margin-left: -30px">
            <v-list-item-title
              class="font-weight-bold subtitle-1"
              style="margin-left: -30px"
              >{{
                $vuetify.lang.t("$vuetify.employee.title_manage_employee")
              }}</v-list-item-title
            >
          </template>
          <v-list-item
            :to="{ name: 'discipline' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_discipline') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.discipline.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item
            :to="{ name: 'usernote' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_usernote') &&
                this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.internalnote.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item
            :to="{ name: 'presence' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_presence') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.presence.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'employeeLeave' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_employeeleave') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.employeeLeave.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'employeeBonus' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_employeebonus') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.employeeBonus.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="{ name: 'employeeMission' }"
            exact
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_employeemission'
              ) && this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.employeeMission.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'meeting' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_meeting') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.meeting.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'payslips' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_payslips') &&
              this.$route.params.idD === 'grh'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.payslips.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <!-- <v-list-item
          :to="{ name: 'discipline' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_discipline') &&
              this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.discipline.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'employeeLeave' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_employeeleave') &&
              this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.employeeLeave.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'employeeBonus' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_employeebonus') &&
              this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.employeeBonus.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'payslips' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_payslips') &&
              this.$route.params.idD === 'grh'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.payslips.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item
          :to="{ name: 'type_investigation' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_type_exam_investigation'
            ) && this.$route.params.idD === 'investigation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-float-center</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.type_investigation.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'exam_investigation' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_exam_investigation'
            ) && this.$route.params.idD === 'investigation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-float-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.exam_investigation.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'exam_investigation_patients' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_exam_investigationpatient'
            ) && this.$route.params.idD === 'investigation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-float-none</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.exam_investigation.titlePatient") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          :to="{ name: 'type_diagnostic' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_type_diagnostic') &&
              this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-list-bulleted</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.type_diagnostic.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          :to="{ name: 'diagnostic' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_diagnostic') &&
              this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-align-left</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.diagnostic.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          :to="{ name: 'diagnostic_patients' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_diagnosticpatient'
            ) && this.$route.params.idD === 'diagnostic'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-format-align-right</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.diagnostic.titlePatient") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <v-list-item
          :to="{ name: 'type_exam' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_type_exam') &&
            this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-type2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.type_exam.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'laboratories' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_laboratory') &&
            this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-ev-plug-ccs2</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.laboratory.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'laboratory_patients' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_laboratorypatient'
            ) && this.$route.params.idD === 'laboratory'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-account-heart</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.laboratory.titlePatient") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'type_surgery' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_type_surgery') &&
            this.$route.params.idD === 'surgery'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-menu </v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.type_surgery.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'surgeries' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_surgery') &&
            this.$route.params.idD === 'surgery'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-seat-flat</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.surgery.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-calendar-check"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_appointment') &&
            this.$route.params.idD === 'surgery'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
              >{{
                $vuetify.lang.t("$vuetify.appointment_surgery.title")
              }}</v-list-item-title
            >
          </template>
          <v-list-item
            :to="{ name: 'appointment_surgical' }"
            exact
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_all_appointment'
              ) && this.$route.params.idD === 'surgery'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.appointment_surgery.new.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'appointment_surgical_list' }" exact link>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.appointment_surgery.list.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
          :to="{ name: 'surgery_patients' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_surgerypatient') &&
            this.$route.params.idD === 'surgery'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-seat-flat-angled</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.surgery.titlePatient") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-home-modern"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_room') &&
            this.$route.params.idD === 'secretariat'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
              >{{
                $vuetify.lang.t("$vuetify.room.titleManage")
              }}</v-list-item-title
            >
          </template>
          <v-list-item
            :to="{ name: 'types_rooms' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_room') &&
              this.$route.params.idD === 'secretariat'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.types_rooms.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'rooms' }"
            exact
            exact-active-class="accent lighten-5"
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_room') &&
              this.$route.params.idD === 'secretariat'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.room.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- <v-list-item
          :to="{ name: 'types_rooms' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_room') &&
              this.$route.params.idD === 'secretariat'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-home-modern</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.types_rooms.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :to="{ name: 'rooms' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_room') &&
              this.$route.params.idD === 'secretariat'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-home-modern</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.room.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          :to="{ name: 'beds' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_bed') &&
              this.$route.params.idD === 'hospitalization'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-bed-empty</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.bed.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          :to="{ name: 'hospitalizations' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_hospitalization') &&
            this.$route.params.idD === 'hospitalization'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-bed</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.hospitalization.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'type_consultation' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(
              this.$auth.user().permissions,
              'view_typeconsultation'
            ) && this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-clipboard-flow</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.type_consultation.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'consultation' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_consultation') &&
            this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.consultation.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item
          :to="{ name: 'ordinance' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_ordinance') &&
              this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-sign-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.ordinance.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <!-- <v-list-item
          :to="{ name: 'certificate' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_certificate') &&
              this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-note-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.certificate.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!--       <v-list-item
          :to="{ name: 'pregnancy_visits' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_pregnancyvisit') &&
              this.$route.params.idD === 'consultation'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-human-pregnant</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.pregnancy_visit.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>-->
        <!--          <v-list-item-->
        <!--              :to="{ name: 'prenatal_consultation' }"-->
        <!--              exact-->
        <!--              link-->
        <!--          >-->
        <!--            <v-list-item-content style="margin-left: -30px">-->
        <!--              <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--                {{ $vuetify.lang.t("$vuetify.consultation.title2") }}-->
        <!--              </v-list-item-title>-->
        <!--            </v-list-item-content>-->
        <!--          </v-list-item>-->

        <v-list-group
          prepend-icon="mdi-calendar-check"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_appointment') &&
            this.$route.params.idD === 'secretariat'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
              >{{
                $vuetify.lang.t("$vuetify.appointment.title")
              }}</v-list-item-title
            >
          </template>
          <v-list-item
            :to="{ name: 'appointment' }"
            exact
            link
            v-if="
              _.includes(
                this.$auth.user().permissions,
                'view_all_appointment'
              ) && this.$route.params.idD === 'secretariat'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.appointment.new.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'appointment_list' }" exact link>
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.appointment.list.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!--        <v-list-item-->
        <!--          :to="{ name: 'appointment' }"-->
        <!--          exact-->
        <!--          exact-active-class="accent lighten-5"-->
        <!--          link-->
        <!--          v-if="-->
        <!--            _.includes(this.$auth.user().permissions, 'view_appointment') &&-->
        <!--              this.$route.params.idD === 'secretariat'-->
        <!--          "-->
        <!--        >-->
        <!--          <v-list-item-icon class="pt-2">-->
        <!--            <v-icon class="mb-2">mdi-calendar-check</v-icon>-->
        <!--          </v-list-item-icon>-->
        <!--          <v-list-item-content style="margin-left: -30px">-->
        <!--            <v-list-item-title class="font-weight-bold subtitle-1">-->
        <!--              {{ $vuetify.lang.t("$vuetify.appointment.title") }}-->
        <!--            </v-list-item-title>-->
        <!--          </v-list-item-content>-->
        <!--        </v-list-item>-->
        <v-list-item
          :to="{ name: 'prescription' }"
          exact
          exact-active-class="accent lighten-5"
          link
          v-if="
            _.includes(this.$auth.user().permissions, 'view_presciption') &&
            this.$route.params.idD === 'secretariat'
          "
        >
          <v-list-item-icon class="pt-2">
            <v-icon class="mb-2">mdi-clipboard-text</v-icon>
          </v-list-item-icon>
          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.prescription.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'history' }"
          exact
          link
          exact-active-class="accent lighten-5"
          v-if="
            _.includes($auth.user().permissions, 'view_history') &&
            this.$route.params.idD === 'organization'
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-radar</v-icon>
          </v-list-item-icon>

          <v-list-item-content style="margin-left: -30px">
            <v-list-item-title class="font-weight-bold subtitle-1">
              {{ $vuetify.lang.t("$vuetify.history.title") }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-calendar-check"
          no-action
          v-if="
            _.includes(this.$auth.user().permissions, 'view_syncconfig') &&
            this.$route.params.idD === 'organization'
          "
        >
          <template v-slot:activator>
            <v-list-item-title
              style="margin-left: -30px"
              class="font-weight-bold subtitle-1"
              >{{
                $vuetify.lang.t("$vuetify.sync.title_manage")
              }}</v-list-item-title
            >
          </template>
          <v-list-item
            :to="{ name: 'sync' }"
            exact
            link
            v-if="
              _.includes(this.$auth.user().permissions, 'view_syncconfig') &&
              this.$route.params.idD === 'organization'
            "
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.sync.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            :to="{ name: 'sync_log' }"
            v-if="
              _.includes(this.$auth.user().permissions, 'view_synclog') &&
              this.$route.params.idD === 'organization'
            "
            exact
            link
          >
            <v-list-item-content style="margin-left: -30px">
              <v-list-item-title class="font-weight-bold subtitle-1">
                {{ $vuetify.lang.t("$vuetify.sync_log.list.title") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <form-product
          :dialog="dialogForm"
          @getItems="getItemsGet"
          ref="productForm"
        ></form-product>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" dark block @click="home">
            <v-icon color="white" left>mdi-logout</v-icon>
            {{ $vuetify.lang.t("$vuetify.menu.home") }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main color="#E9EEF4">
      <v-container class="pt-5 px-5" fluid height="888" width="55">
        <router-view></router-view>
      </v-container>
    </v-main>
    <form-bills
      :dialog="dialogFormBill"
      :form="form"
      :messages="messages"
      @getItems="getItems"
      ref="billsForm"
    ></form-bills>
  </v-app>
</template>

<script>
import ListMixin from "../mixins/Common/List";
import FormProduct from "./../components/ingredient/IndexPeremption";
import FormBills from "./../components/bills/Form";
import FormMixin from "./../mixins/Common/Form.vue";
import axios from "axios";
export default {
  mixins: [ListMixin, FormMixin],
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    sortBy: "id",
    headers: [],
    dialogForm: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    dialogFormBill: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    events: [],
    items: [],
    itemsNote: [],
    meta: {},
    pagination: {},
    supply: false,
    itemPerPage: 5,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    drawer: true,
    urlItems: "details_stocks/peremption",
    crm: false,
  }),
  mounted() {
    // this.getItemsNote();
  },
  created() {
    this.getItems();
    // this.get_licence();
    // this.timer = setInterval(this.getItems, 20000);
  },
  computed: {
    numberItems() {
      return this.items.length;
    },
  },
  components: {
    FormProduct,
    FormBills,
  },
  watch: {},
  methods: {
    createBills() {
      this.dialogFormBill.show = true;
      this.messages = {
        title: "$vuetify.bills.new.title",
        submit: "$vuetify.bills.new.submit",
        success: "$vuetify.bills.new.success",
      };
      this.form = {
        id: null,
        patient: null,
        doctor: null,
        patient_name: null,
        patient_balance: null,
        net_payable: null,
        patient_type: null,
        pub: null,
        pun: null,
        amount_gross: null,
        quantity_ordered: null,
        amount_net: null,
        total_amount: null,
        quantity_served: null,
        product: null,
        delivery: null,
        bills: null,
        reference_no: null,
        additional_info: null,
        bills_amount: null,
        code: null,
        cashier: null,
        bill_type: null,
        amount_paid: null,
        bill_shape: null,
        storage_depots: null,
      };
    },
    get_licence() {
      // Define your target date
      const TARGET_DATE = new Date("2025-05-31");
      // Get current date and convert to YYYY-MM-DD format for comparison
      const currentDate = new Date();
      const formattedCurrentDate = currentDate.toISOString().split("T")[0];
      const formattedTargetDate = TARGET_DATE.toISOString().split("T")[0];
      // Check if dates match
      if (formattedCurrentDate > formattedTargetDate) {
        if (this.$route.path !== "/Expiration") {
          this.$router.push({
            name: "Expiration",
            params: { date: formattedTargetDate },
          });
        }
      } else {
        if (this.$route.path !== "/dashboard") {
          this.$router.push({
            name: "dashboard",
          });
        }
        return 200;
      }
    },
    getItems() {
      let self = this;
      const { page, itemsPerPage } = this.pagination;
      let params = {
        page: page,
        size: itemsPerPage,
      };
      if (!this._.isEmpty(this._search)) {
        this._search = this._.merge(params, this._search);
      }
      return new Promise((resolve, reject) => {
        this.loading.list = true;
        self.$store
          .dispatch("request", {
            url: self.urlItems,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.items = data.content.qty;
            self.itemsDate = data.content.date;
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
    consultation() {
      this.$router.push({
        name: "dashboardConsultation",
        params: { idD: "consultation" },
      });
    },
    hospitalization() {
      this.$router.push({
        name: "dashboardHospitalization",
        params: { idD: "hospitalization" },
      });
    },
    investigation() {
      this.$router.push({
        name: "dashboardInvestigation",
        params: { idD: "investigation" },
      });
    },
    radiography() {
      this.$router.push({
        name: "dashboardRadiography",
        params: { idD: "radiography" },
      });
    },
    surgery() {
      this.$router.push({
        name: "dashboardSurgery",
        params: { idD: "surgery" },
      });
    },
    diagnostic() {
      this.$router.push({
        name: "dashboardDiagnostic",
        params: { idD: "diagnostic" },
      });
    },
    laboratory() {
      this.$router.push({
        name: "dashboardLaboratory",
        params: { idD: "laboratory" },
      });
    },
    organization() {
      this.$router.push({
        name: "dashboardOrganization",
        params: { idD: "organization" },
      });
    },
    secretariat() {
      this.$router.push({
        name: "dashboardSecretariat",
        params: { idD: "secretariat" },
      });
    },
    billing() {
      this.$router.push({
        name: "dashboardBilling",
        params: { idD: "billing" },
      });
    },
    pharmacy() {
      this.$router.push({
        name: "dashboardPharmacy",
        params: { idD: "stock" },
      });
    },
    grh() {
      this.$router.push({
        name: "dashboardGrh",
        params: { idD: "grh" },
      });
    },
    create() {
      this.dialogForm.show = true;
      this.messages = {
        title: "$vuetify.product.new.title",
        submit: "$vuetify.product.new.submit",
        success: "$vuetify.product.new.success",
      };
      this.form = {
        id: null,
        code: null,
        name: null,
        is_active: false,
      };
    },
    log_out() {
      //this.$refs.userMenu.isActive = false;
      axios
        .post("logout")
        .then((response) => {
          this.response = response;
          this.$router.push({
            name: "Logout",
          });
        })
        .catch((error) => {
          let message;
          if (error.response.status === 400) {
            message = "$vuetify.error_occured";
            const fields = error.response.data;
            self.setFormErrors(fields);
            this.$forceUpdate();
          } else {
            message = "$vuetify.error_server";
          }
          self.$store.dispatch("showNotification", {
            statut: true,
            text: self.$vuetify.lang.t(message),
            color: "#B71C1C",
          });
        })
        .then(() => {
          self.loading = false;
        });
    },
    home() {
      this.$router.push({
        name: "home",
      });
    },
    my_account() {
      this.$router.push({
        name: "profile",
      });
    },
    changeLanguage() {
      let lang;
      if (this.$vuetify.lang.current === "fr") {
        lang = "en";
      } else {
        lang = "fr";
      }

      // Update Vuetify
      this.$vuetify.lang.current = lang;

      // Store in localStorage
      window.localStorage.setItem("lang", lang);

      // Update Axios header
      this.axios.defaults.headers.common["Accept-Language"] = lang;

      // Optional: if using i18n instance too
      // Optional: if using i18n instance too
      if (this.$i18n) {
        this.$i18n.locale = lang;
      }
    },
    // async getCrmStatus() {
    //   let self = this;
    //   let resp = await self.$store.dispatch("request", {
    //     url: self.urlItems
    //   });
    //   resp.data.content.forEach(item => {
    //     if (this.crm === item.crm) {
    //       console.log("nonnn actif");
    //     } else {
    //       this.crm = item.crm;
    //     }
    //   });
    // }
  },
};
</script>
<style scoped>
.center {
  margin-left: 6.8rem;
}
</style>

<!--<style scoped>-->
<!--.ListItemClass {-->
<!--  color: #f5f5f5;-->
<!--}-->
<!--.SelectedTile:hover {-->
<!--  border-radius: 4px;-->
<!--  background: #455A64-->
<!--}-->
<!--.SelectedTile:active {-->
<!--  border-radius: 4px;-->
<!--  background: rgba(10, 204, 117, 0.19)-->
<!--}-->
<!--</style>-->
