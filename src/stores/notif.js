import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotif = defineStore("notif", () => {
  const listNotif = ref([]);
  function make(
    text,
    opt = {
      delay: 5000,
      type: "info",
      reverse: false,
    }
  ) {
    if (opt?.reverse) {
      listNotif.value.push({
        text: text,
        option: opt,
      });
      setTimeout(() => {
        listNotif.value.splice(0, 1);
      }, opt?.delay);
    } else {
      listNotif.value.unshift({
        text: text,
        option: opt,
      });
      setTimeout(() => {
        listNotif.value.splice(listNotif.value.length - 1, 1);
      }, opt?.delay);
    }
  }

  return { listNotif, make };
});
