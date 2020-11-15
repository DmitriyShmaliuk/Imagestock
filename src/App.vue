<template>
  <v-app>
    <header>
      <v-application-bar @open-auth-popup="openAuthPopup"></v-application-bar>
    </header>

    <main>
      <v-alert type="warning" icon="mdi-information-outline" v-show="isError">
        {{ errorMessage }}
      </v-alert>

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
import { watch, computed } from "@vue/composition-api";
import { useActions, useState } from "vuex-composition-helpers";
import bcrypt from "bcryptjs";
import VApplicationBar from "./components/v-application-bar";
import VAuthenticationPopup from "./components/v-authentication-popup";
import VRegistrationPopup from "./components/v-registration-popup";
import { usePopup } from './utils/usePopup';
import axios from "axios";
import keys from "./keys";
import { errorAlert } from "./config";
import "./main.css";

export default {
  name: "app",
  components: {
    VApplicationBar,
    VAuthenticationPopup,
    VRegistrationPopup,
  },
  setup() {
    const { 
      opened: authPopupOpened, 
      close: closeAuthPopup, 
      open: openAuthPopup
    } = usePopup ();

    const { 
      opened: registrationPopupOpened, 
      close: closeRegistrationPopup, 
      open: openRegistrationPopup
    } = usePopup ();

    const { setUser, setError } = useActions(["setUser", "setError"]);

    const signup = async function ({ email, name, password }) {
      const hasPassword = await bcrypt.hash(password, 10);
      const requestBody = { email, name, password: hasPassword };

      try {
        const { data: { user }} = await axios.post(
          `${keys.serverURL}users/add`, 
          requestBody, 
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setUser(user);
      } 
      catch (err) {
        const { data: { message: errorMessage }} = err.response;
        const message = errorMessage ? errorMessage : "Error";

        setError(message);  
      }

      closeRegistrationPopup();
    };

    const { error: errorMessage } = useState(['error']);
    const isError = computed(() => errorMessage.value !== null);
    const { resetError } = useActions(["resetError"]);

    watch (
      () => isError.value,
      (to) => {
        if (to){
          setTimeout(() => resetError(), errorAlert.activeTime);
        }
      }
    );

    return {
      authPopupOpened,
      closeAuthPopup,
      openAuthPopup,
      registrationPopupOpened,
      openRegistrationPopup,
      closeRegistrationPopup,
      signup,
      errorMessage,
      isError,
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