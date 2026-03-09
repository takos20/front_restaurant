<template>
  <v-container
    fluid
    v-if="
      this.$route.params.idD !== 'secretariat' ||
      this.$route.params.idD !== 'organization' ||
      this.$route.params.idD !== 'billing' ||
      this.$route.params.idD !== 'hospitalization' ||
      this.$route.params.idD !== 'consultation' ||
      this.$route.params.idD !== 'investigation' ||
      this.$route.params.idD !== 'radiography' ||
      this.$route.params.idD !== 'surgery' ||
      this.$route.params.idD !== 'diagnostic' ||
      this.$route.params.idD !== 'pharmacy'
    "
  >
    <v-card-title class="black--text font-weight-bold text-center">{{
      $vuetify.lang.t("$vuetify.menu.home")
    }}</v-card-title>

    <v-card-actions>
      <v-row>
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_organization ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="organization()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/organisation.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.titleO")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
              <!-- <v-card
              @click="organization()"
              color="#0F83FF" :elevation="hover ? 16 : 2"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h6 mb-1">
                    {{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}
                  </v-card-title>
                  </div>
  
                <v-avatar
                  class="ma-3"
                  size="125"
                  rounded="0"
                >
                <v-img src="@/assets/organisation.png"></v-img>
                </v-avatar>
              </div>
            </v-card> -->

              <!-- <v-list-item three-line @click="organization()">
                <v-list-item-content>
                  <div class="mb-4">
                    <v-btn fab color="#0F83FF" elevation="0">
                      <v-icon color="white">mdi-cog</v-icon>
                    </v-btn>
                  </div>
                  <v-list-item-title class="text-h6 mb-1 white--text">
                    {{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item> -->
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                
                <v-col cols="12" sm="4" @click="organization()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/organisation.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="organization()"
            color="primary"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_organization || !$auth.check(['admin'])"
            class="btn text-center white--text text-h5"
            ><v-icon left large> mdi-cog </v-icon><v-icon left> </v-icon>

            {{ $vuetify.lang.t("$vuetify.hospitals.titleO") }}
          </v-btn></v-col
        > -->
        <!-- <v-col
          ><v-btn
            @click="secretariat()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_secretariat || !$auth.check(['admin'])"
            class="btn text-center text-h5"
            ><v-icon left large> mdi-clipboard-text </v-icon
            ><v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}
          </v-btn></v-col
        > -->
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_secretariat ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="secretariat()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/secretariat.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.titleSM")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="secretariat()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-clipboard-text</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class=" white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.titleSM") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="secretariat()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/secretariat.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_pharmacy ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="pharmacy()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/pharmacy1.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.pharmacy")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="pharmacy()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-hospital-box</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="pharmacy()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/pharmacy1.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row> -->
          </v-hover>
        </v-col>
        <!-- <v-col>

          <v-btn
            @click="pharmacy()"
            color="primary"
            light
            height="120"
            :disabled="!get_permissions_pharmacy || !$auth.check(['admin'])"
            width="290"
            elevation="10"
            class="btn text-center white--text text-h5"
          >
            <v-icon left large>
              mdi-hospital-box
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.pharmacy") }}
          </v-btn>
        </v-col> -->
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_billing ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="billing()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/billing1.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.titleF")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="billing()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-cart</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="billing()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/billing1.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col
          ><v-btn
            @click="billing()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            :disabled="!get_permissions_billing || !$auth.check(['admin'])"
            elevation="10"
            class="btn text-center black--text text-h5"
            ><v-icon left large> mdi-cart </v-icon><v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.titleF") }}
          </v-btn></v-col
        > -->
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_consultation ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="consultation()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/consultation.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.consultation")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="consultation()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-file-document-edit</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.consultation") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="consultation()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/consultation.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="consultation()"
            color="primary"
            light
            height="120"
            width="290"
            :disabled="!get_permissions_consultation || !$auth.check(['admin'])"
            elevation="10"
            class="btn text-center white--text text-h5"
          >
            <v-icon left large>
              mdi-file-document-edit
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.consultation") }}
          </v-btn>
        </v-col> -->

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_hospitalization ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="hospitalization()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/hospitalization.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.hospitalization")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="hospitalization()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-bed</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{
                          $vuetify.lang.t("$vuetify.hospitals.hospitalization")
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="hospitalization()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/hospitalization.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="hospitalization()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_hospitalization || !$auth.check(['admin'])"
            class="btn text-center text-h5"
          >
            <v-icon left large>
              mdi-bed
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.hospitalization") }}
          </v-btn>
        </v-col> -->

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_laboratory ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="laboratory()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/laboratory.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.laboratory")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="laboratory()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-atom-variant</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.laboratory") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="laboratory()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/laboratory.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="laboratory()"
            color="primary"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_laboratory || !$auth.check(['admin'])"
            class="btn text-center white--text text-h5"
          >
            <v-icon left large>
              mdi-atom-variant
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.laboratory") }}
          </v-btn>
        </v-col> -->
        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_diagnostic ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="diagnostic()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/diagnostic.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.diagnostic")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="diagnostic()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-script</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.diagnostic") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="diagnostic()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/diagnostic.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="diagnostic()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_diagnostic || !$auth.check(['admin'])"
            class="btn text-center black--text text-h5"
          >
            <v-icon left large>
              mdi-script
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.diagnostic") }}
          </v-btn>
        </v-col> -->

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_radiography ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="radiography()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/radiography.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.radiography")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="radiography()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-altimeter</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.radiography") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="radiography()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/radiography.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="radiography()"
            color="primary"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_radiography || !$auth.check(['admin'])"
            class="btn text-center white--text text-h5"
          >
            <v-icon left large>
              mdi-altimeter
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.radiography") }}
          </v-btn>
        </v-col> -->

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_investigation ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="investigation()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/investigation.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.investigation")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="investigation()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-magnify</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{
                          $vuetify.lang.t("$vuetify.hospitals.investigation")
                        }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="investigation()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/investigation.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="investigation()"
            color="#f5f5f5"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_investigation || !$auth.check(['admin'])"
            class="btn text-center black--text text-h5"
          >
            <v-icon left large>
              mdi-magnify
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.investigation") }}
          </v-btn>
        </v-col> -->

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_surgery ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card
                @click="surgery()"
                :elevation="hover ? 16 : 2"
                width="300px"
              >
                <v-img
                  src="@/assets/surgery.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.surgery")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="surgery()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-seat-flat-angled</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.surgery") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="surgery()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/surgery.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>

        <v-col
          cols="12"
          sm="3"
          v-if="
            get_permissions_grh ||
            $auth.check(['admin']) ||
            $auth.check(['super_admin'])
          "
        >
          <v-hover v-slot="{ hover }" open-delay="200">
            <v-col cols="12">
              <v-card @click="grh()" :elevation="hover ? 16 : 2" width="300px">
                <v-img
                  src="@/assets/rh.png"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="150px"
                  width="300px"
                  cover
                >
                  <v-card-title
                    class="white--text font-weight-bold text-center"
                    >{{
                      $vuetify.lang.t("$vuetify.hospitals.grh")
                    }}</v-card-title
                  >
                </v-img>
              </v-card>
            </v-col>
            <!-- <v-card color="#0F83FF" :elevation="hover ? 16 : 2">
              <v-row>
                <v-col cols="12" sm="8">
                  <v-list-item three-line @click="grh()">
                    <v-list-item-content>
                      <div class="mb-4">
                        <v-btn fab color="#0F83FF" elevation="0">
                          <v-icon color="white">mdi-seat-flat-angled</v-icon>
                        </v-btn>
                      </div>
                      <v-list-item-title class="text-h6 mb-1 white--text">
                        {{ $vuetify.lang.t("$vuetify.hospitals.grh") }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" sm="4" @click="grh()">
                  <v-avatar size="100" class="ml-n10 mt-6" tile>
                    <v-img src="@/assets/grh2.png"></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card> -->
          </v-hover>
        </v-col>
        <!-- <v-col>
          <v-btn
            @click="surgery()"
            color="primary"
            light
            height="120"
            width="290"
            elevation="10"
            :disabled="!get_permissions_surgery || !$auth.check(['admin'])"
            class="btn text-center white--text text-h5"
          >
            <v-icon left large>
              mdi-seat-flat-angled
            </v-icon>
            <v-icon left> </v-icon>
            {{ $vuetify.lang.t("$vuetify.hospitals.surgery") }}
          </v-btn>
        </v-col> -->
      </v-row>
    </v-card-actions>
    <form-note
      :dialog="dialogFormNote"
      ref="cashForm"
      :messages="messages"
      @getItems="getItemsNote"
    ></form-note>
  </v-container>
</template>

<script>
import FormNote from "./../internal_note/FormNote";
import ListMixin from "./../../mixins/Common/List.vue";
// import PanelGroupItem from './PanelGroupItem.vue';
export default {
  mixins: [ListMixin],
  data: () => ({
    loading: {
      list: false,
      refresh: false,
      filter: false,
    },
    dialogFormNote: {
      show: false,
      shows: {
        showFilter: false,
        showInfo: false,
      },
    },
    sortBy: "id",
    headers: [],
    itemsNote: [],
    meta: {},
    pagination: {},
    supply: false,
    itemPerPage: 5,
    //itemPerPages: 3,
    itemPerPageOptions: [5, 10, 30],
    drawer: true,
    urlItemsNote: "userNotes/getNotes",
    crm: false,
  }),
  computed: {
    get_permissions_billing() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_billing_module"
      );
      return result;
    },
    get_permissions_diagnostic() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_diagnostic_module"
      );
      return result;
    },
    get_permissions_radiography() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_radiography_module"
      );
      return result;
    },
    get_permissions_investigation() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_investigation_module"
      );
      return result;
    },
    get_permissions_hospitalization() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_hospitalization_module"
      );
      return result;
    },
    get_permissions_consultation() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_consultation_module"
      );
      return result;
    },
    get_permissions_organization() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_organisation_module"
      );
      return result;
    },
    get_permissions_laboratory() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_laboratory_module"
      );
      return result;
    },
    get_permissions_secretariat() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_secretariat_module"
      );
      return result;
    },
    get_permissions_surgery() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_surgery_module"
      );
      return result;
    },
    get_permissions_grh() {
      let result = "";
      result = this._.includes(this.$auth.user().permissions, "view_rh_module");
      return result;
    },
    get_permissions_pharmacy() {
      let result = "";
      result = this._.includes(
        this.$auth.user().permissions,
        "view_pharmacy_module"
      );
      return result;
    },
  },
  mounted() {
    this.getItemsNote();
  },
  components: {
    FormNote,
  },
  methods: {
    createDialog() {
      this.dialogFormNote.show = true;
      this.messages = {
        title: "$vuetify.internalnote.list.title2",
        submit: "$vuetify.cash.new.submit",
        success: "$vuetify.cash.new.success",
      };
    },
    getItemsNote() {
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
            url: self.urlItemsNote + "?id=" + this.$auth.user().id,
            params: params,
          })
          .then((response) => {
            let data = response.data;
            self.itemsNote = data.content;

            if (
              self.itemsNote.length > 0 &&
              this._.includes(this.$auth.user().permissions, "view_usernote")
            ) {
              this.createDialog();
            } else {
              this.currentInventory();
            }
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
    grh() {
      this.$router.push({
        name: "dashboardGrh",
        params: { idD: "grh" },
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
        params: { idD: "pharmacy" },
      });
    },
  },
};
</script>
