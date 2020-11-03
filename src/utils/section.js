import { ref } from "@vue/composition-api";
import { useActions } from "vuex-composition-helpers";

export function useSection() {
  const sectionIndex = ref(null);
  const { addComment, incrementLikes, incrementDislikes } = useActions([
    "addComment",
    "incrementLikes",
    "incrementDislikes",
  ]);

  function comment({ userName, userComment }) {
    const commentData = {
      userName,
      userComment,
      date: new Date().toString(),
    };

    addComment({ index: sectionIndex.value, commentData });
  }

  function like() {
    incrementLikes(sectionIndex.value);
  }

  function dislike() {
    incrementDislikes(sectionIndex.value);
  }

  return {
    sectionIndex,
    comment,
    like,
    dislike,
  };
}
