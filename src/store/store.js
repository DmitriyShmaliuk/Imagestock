import Vuex from "vuex";
import {
  ADD_IMAGE,
  INCREMENT_LIKES,
  INCREMENT_DISLIKES,
  DECREMENT_LIKES,
  DECREMENT_DISLIKES,
  ADD_COMMENT,
} from "./mutation-types";

export const store = new Vuex.Store({
  state: {
    images: [],
  },
  getters: {
    images({ images }) {
      return images;
    },
  },
  mutations: {
    [ADD_IMAGE]({ images }, element) {
      images.push(element);
    },
    [INCREMENT_LIKES]({ images }, index) {
      images[index].countOfLike++;
      images[index].isLikeClicked = true;
    },
    [INCREMENT_DISLIKES]({ images }, index) {
      images[index].countOfDislike++;
      images[index].isDislikeClicked = true;
    },
    [DECREMENT_LIKES]({ images }, index) {
      images[index].countOfLike--;
      images[index].isLikeClicked = false;
    },
    [DECREMENT_DISLIKES]({ images }, index) {
      images[index].countOfDislike--;
      images[index].isDislikeClicked = false;
    },
    [ADD_COMMENT]({ images }, { index, commentData }) {
      images[index].comments.push(commentData);
    },
  },
  actions: {
    addImage({ state, commit }, element) {
      commit(ADD_IMAGE, element);
      localStorage.setItem("images-store", JSON.stringify(state.images));
    },
    incrementLikes({ state, commit }, index) {
      const { images } = state;
      if (!images[index].isLikeClicked) {
        commit(INCREMENT_LIKES, index);

        if (images[index].isDislikeClicked) {
          commit(DECREMENT_DISLIKES, index);
        }

        localStorage.setItem("images-store", JSON.stringify(state.images));
      }
    },
    incrementDislikes({ state, commit }, index) {
      const { images } = state;
      if (!images[index].isDislikeClicked) {
        commit(INCREMENT_DISLIKES, index);

        if (images[index].isLikeClicked) {
          commit(DECREMENT_LIKES, index);
        }

        localStorage.setItem("images-store", JSON.stringify(state.images));
      }
    },
    addComment({ state, commit }, { index, commentData }) {
      commit(ADD_COMMENT, { index, commentData });
      localStorage.setItem("images-store", JSON.stringify(state.images));
    },
  },
});
