import { ref } from "@vue/composition-api";

export function usePopup() {
  const opened = ref(false);

  function openPopup() {
    opened.value = true;
  }

  return {
    openPopup,
    opened,
  };
}
