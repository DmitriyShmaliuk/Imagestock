import { ref } from "@vue/composition-api";

export function usePopup() {
  const opened = ref(false);

  const close = function() {
    opened.value = false;
  };

  const open = function() {
    opened.value = true;
  };

  return {
    opened,
    close,
    open,
  };
}
