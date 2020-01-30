import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: [],
        currentIndex: null,
    },
    mutations: {
        addImage({images}, element){
            images.push(element);
        },
        setCurrentIndex(state, index){
            state.currentIndex = (index >=0 && index < state.images.length)? index: state.currentIndex;
        },
        incrementLikes({images,currentIndex}){
            images[currentIndex].countOfLike++;
            images[currentIndex].isLikeClicked = true;
        }
    },
    actions: {
        addImage({state,commit}, element){
            commit('addImage', element);
            localStorage.setItem("images-store", JSON.stringify(state.images));
        },
        setCurrentIndex({commit}, index){
            commit('setCurrentIndex', index);
        },
        incrementLikes({state,commit}){
            const {images,currentIndex} = state;
            if (!images[currentIndex].isLikeClicked){
                commit('incrementLikes');
                localStorage.setItem("images-store", JSON.stringify(state.images));
            }
        }
    }
});