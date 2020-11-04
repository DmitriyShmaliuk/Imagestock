<template>
  <v-app>
    <header>
      <v-application-bar @open-auth-popup="openAuthPopup"></v-application-bar>
    </header>

    <main>
      <v-authentication-popup
        :opened="authPopupOpened"
        @close="closeAuthPopup"
        @open-registration-popup="openRegistrationPopup"
      ></v-authentication-popup>

      <v-registration-popup
        :opened="registrationPopupOpened"
        @close="closeRegistrationPopup"
      >
      </v-registration-popup>
    </main>
  </v-app>
</template>

<script>
import { ref } from "@vue/composition-api";
import VApplicationBar from "./components/v-application-bar";
import VAuthenticationPopup from "./components/v-authentication-popup";
import VRegistrationPopup from "./components/v-registration-popup";
import "./main.css";

export default {
  name: "app",
  components: {
    VApplicationBar,
    VAuthenticationPopup,
    VRegistrationPopup,
  },
  setup() {
    const authPopupOpened = ref(false);

    const closeAuthPopup = function () {
      authPopupOpened.value = false;
    };

    const openAuthPopup = function () {
      authPopupOpened.value = true;
    };

    const registrationPopupOpened = ref(false);

    const openRegistrationPopup = function () {
      registrationPopupOpened.value = true;
    };

    const closeRegistrationPopup = function () {
      registrationPopupOpened.value = false;
    };

    return {
      authPopupOpened,
      closeAuthPopup,
      openAuthPopup,
      registrationPopupOpened,
      openRegistrationPopup,
      closeRegistrationPopup,
    };
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  background: rgba(250, 250, 250, 1);
}
</style>