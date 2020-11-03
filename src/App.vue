<template>
  <v-app>
    <header>
      <v-application-bar @open-auth-popup="openAuthPopup"></v-application-bar>
    </header>

    <main>
      <v-authentication-popup
        :opened="authPopupOpened"
        @close="closeAuthPopup"
      ></v-authentication-popup>
    </main>
  </v-app>
</template>

<script>
import { ref } from "@vue/composition-api";
import VApplicationBar from "./components/v-application-bar";
import VAuthenticationPopup from "./components/v-authentication-popup";
import "./main.css";

export default {
  name: "app",
  components: {
    VApplicationBar,
    VAuthenticationPopup,
  },
  setup() {
    const authPopupOpened = ref(false);

    const closeAuthPopup = function () {
      authPopupOpened.value = false;
    };
    const openAuthPopup = function (){
      authPopupOpened.value = true;
    };

    return {
      authPopupOpened,
      closeAuthPopup,
      openAuthPopup
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