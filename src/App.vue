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
        @signup="signup"
      >
      </v-registration-popup>
    </main>
  </v-app>
</template>

<script>
import { ref } from "@vue/composition-api";
import { useActions } from "vuex-composition-helpers";
import bcrypt from "bcryptjs";
import VApplicationBar from "./components/v-application-bar";
import VAuthenticationPopup from "./components/v-authentication-popup";
import VRegistrationPopup from "./components/v-registration-popup";
import axios from "axios";
import keys from "./keys";
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

    const { setUser, setError } = useActions(["setUser", "setError"]);

    const signup = async function ({ email, name, password }) {
      const hasPassword = await bcrypt.hash(password, 10);
      const requestBody = { email, name, password: hasPassword };
      const { status, data: { message, user }} = await axios.post(
        `${keys.serverURL}users/add`, requestBody, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        });

      closeRegistrationPopup()

      if (status !== 202) {
        setUser(user);
      } 
      else {
        setError(message);
      }
    };

    return {
      authPopupOpened,
      closeAuthPopup,
      openAuthPopup,
      registrationPopupOpened,
      openRegistrationPopup,
      closeRegistrationPopup,
      signup,
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