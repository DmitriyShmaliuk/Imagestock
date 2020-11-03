<template>
  <v-app>
    <header>
      <v-application-bar></v-application-bar>
    </header>

    <main></main>
  </v-app>
</template>

<script>
import { useGetters } from "vuex-composition-helpers";
import VApplicationBar from "./components/v-application-bar";
import "./main.css";

export default {
  name: "app",
  components: {
    VApplicationBar,
  },
  setup() {
    const { isAuth } = useGetters(["isAuth"]);
    console.log(isAuth);
    return {};
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