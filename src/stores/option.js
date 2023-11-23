import { defineStore } from "pinia";
import { ref } from "vue";

export const useOption = defineStore("option", () => {
  const url = ref("");
  const name = ref("");
  return { url, name };
});
