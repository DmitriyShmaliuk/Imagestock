import Vue from "vue";
import Vuetify from "vuetify/lib";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";
import { store } from "./store/store";

Vue.use(Vuetify);
Vue.use(VueCompositionAPI);

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
