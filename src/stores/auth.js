import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const name = ref("");
  const token = ref("");

  if (localStorage.token) token.value = localStorage.token;
  return { token, name };
});
