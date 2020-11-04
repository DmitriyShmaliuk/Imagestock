import Vue from "vue";
import Vuex from "vuex";
import { SET_USER } from "./mutation-types";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isAuth: ({ user }) => user !== null,
  },
  mutations: {
    [SET_USER](state, userData) {
      state.user = userData;
    },
  },
  actions: {
    setUser({ commit }, userData) {
      const { name } = userData;

      if (name) {
        commit(SET_USER, { name });
      }
    },
  },
});
