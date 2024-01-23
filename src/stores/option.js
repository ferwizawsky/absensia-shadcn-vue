import { defineStore } from "pinia";
import { ref } from "vue";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";

export const useOption = defineStore("option", () => {
  const url = ref("");
  const name = ref("");
  const listUser = ref([]);
  const listKelas = ref([]);

  async function getStudent() {
    listUser.value = [];
    try {
      const tmp = await useMyFetch("GET", `/kelas/student?limit=10000`);
      listUser.value = [...tmp.data.data];
    } catch (error) {
    } finally {
    }
  }
  async function getKelas() {
    listKelas.value = [];
    try {
      const tmp = await useMyFetch("GET", `/kelas/option?limit=10000`);
      listKelas.value = [...tmp.data.data.data];
    } catch (error) {
    } finally {
    }
  }

  return { url, name, getStudent, listUser, listKelas, getKelas };
});
