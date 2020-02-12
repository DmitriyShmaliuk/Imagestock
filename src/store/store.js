import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        images: [],
    },
    mutations: {
        addImage({images}, element){
            images.push(element);
        },
        incrementLikes({images},index){
            images[index].countOfLike++;
            images[index].isLikeClicked = true;
        },
        incrementDislikes({images}, index){
            images[index].countOfDislike++;
            images[index].isDislikeClicked = true;
        },
        decrementLikes({images}, index){
            images[index].countOfLike--;
            images[index].isLikeClicked = false;
        },
        decrementDislikes({images}, index){
            images[index].countOfDislike--;
            images[index].isDislikeClicked = false;
        },
        addComment({images}, {index, commentData}){
            images[index].comments.push(commentData);
        }
    },
    actions: {
        addImage({state,commit}, element){
            commit('addImage', element);
            localStorage.setItem("images-store", JSON.stringify(state.images));
        },
        incrementLikes({state,commit}, index){
            const {images} = state;
            if (!images[index].isLikeClicked){
                commit('incrementLikes', index);

                if(images[index].isDislikeClicked){
                    commit('decrementDislikes', index)
                }

                localStorage.setItem("images-store", JSON.stringify(state.images));
            }
        },
        incrementDislikes({state,commit}, index){
            const {images} = state;
            if(!images[index].isDislikeClicked){
                commit('incrementDislikes', index);

                if (images[index].isLikeClicked){
                    commit('decrementLikes', index);
                }

                localStorage.setItem("images-store", JSON.stringify(state.images));
            }
        },
        addComment({state,commit},{index, commentData}){
            commit('addComment', {index, commentData});
            localStorage.setItem("images-store", JSON.stringify(state.images));
        }
    }
});