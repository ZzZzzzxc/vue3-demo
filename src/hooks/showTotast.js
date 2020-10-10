import { ref, watch } from "vue";

export default function(time = 2000, defaultStatus = false) {
  const show = ref(defaultStatus);
  watch(show, v => {
    if (v) {
      setTimeout(() => {
        show.value = false;
      }, time);
    }
  });
  return {
    show,
  };
}
