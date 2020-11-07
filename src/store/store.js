import Vue from "vue";
import Vuex from "vuex";
import { SET_USER, SET_ERROR } from "./mutation-types";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  getters: {
    isAuth: ({ user }) => user !== null,
  },
  mutations: {
    [SET_USER](state, userData) {
      state.user = userData;
    },
    [SET_ERROR](state, error) {
      state.error = error;
    },
  },
  actions: {
    setUser({ commit }, userData) {
      if (userData) {
        commit(SET_USER, userData);
      }
    },
    setError({ commit }, error) {
      commit(SET_ERROR, error.toString());
    },
    resetError({ commit }) {
      commit(SET_ERROR, null);
    },
  },
});
