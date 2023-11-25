<script setup>
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { ref, onMounted } from "vue";
const item = ref();

async function getUser() {
  if (notif.loading) return;
  notif.loading = true;
  item.value = {};
  try {
    const { data } = await useMyFetch("GET", `/auth/profile`);
    item.value = { ...data.data };
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}
onMounted(() => {});
</script>
<template>
  <div
    class="w-full bg-white/20 backdrop-blur-sm fixed top-0 left-0 min-h-[65px] flex items-center justify-center"
  >
    <div></div>
    <div
      class="w-6 h-6 bg-amber-400 flex items-center justify-center rounded-full text-white"
    >
      {{ item.publisher?.name.substring(0, 1) }}
    </div>
  </div>
</template>
