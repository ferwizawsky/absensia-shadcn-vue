import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const name = ref("");
  const token = ref("");
  const isAuthenticated = computed(() => {
    return token.value ? true : false;
  });
  if (localStorage.token) token.value = localStorage.token;
  return { token, name, isAuthenticated };
});
