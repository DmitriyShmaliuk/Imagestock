import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: [],
    },
    mutations: {
        addImage(state, element){
            state.images.push(element);
        }
    },
    actions: {
        addImage({state,commit}, element){
            commit('addImage', element);
            localStorage.setItem("images-store", JSON.stringify(state.images));
        }
    }
});