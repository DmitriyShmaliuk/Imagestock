import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: []
    },
    mutations: {
        add(state, element){
            state.images.push(element);
        }
    },
    actions: {
        add({commit}, element){
            commit('add', element);
        }
    }
});