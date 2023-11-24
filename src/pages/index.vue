<script setup>
import { ref, onMounted } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import Navbar from "../components/Navbar.vue";

const list = ref([]);
const notif = useNotif();

async function getPost() {
  if (notif.loading) return;
  notif.loading = true;
  list.value = [];
  try {
    const { data } = await useMyFetch("GET", "/post");

    console.log(data);
    list.value = [...data.data];
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

function limitting(e) {
  let str = e;
  if (str.length > 10) str = str.substring(0, 200) + ".......";
  return str;
}
onMounted(() => {
  getPost();
});
</script>
<template>
  <div class="min-h-screen bg-gray-100 pb-20 px-4">
    <div class="max-w-xl mx-auto pt-10">
      <div
        v-for="item in list"
        class="bg-white min-h-[200px] rounded-xl shadow-sm p-4 mt-6"
      >
        <div class="flex justify-between text-xs items-center">
          <div class="text-gray-400">27 May 2023</div>
          <div>
            <span
              class="bg-primary px-4 py-1 rounded-lg text-white capitalize"
              >{{ item.tag }}</span
            >
          </div>
        </div>

        <div class="font-semibold mt-6 text-lg">{{ item.title }}</div>
        <div class="text-sm text-gray-400 font-thin">
          {{ limitting(item.content) }}
        </div>
        <div class="flex justify-between text-xs items-center mt-5">
          <div class="text-gray-400">Read More</div>
          <div class="flex items-center">
            <div
              class="w-6 h-6 bg-amber-400 flex items-center justify-center rounded-full text-white"
            >
              {{ item.publisher?.name.substring(0, 1) }}
            </div>
            <span class="ml-2 font-semibold">{{ item.publisher?.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <Navbar />
  </div>
</template>
