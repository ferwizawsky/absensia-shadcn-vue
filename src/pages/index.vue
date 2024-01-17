<script setup>
import { ref, onMounted, watch } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import Navbar from "@/components/Navbar.vue";
import Paginate from "@/components/UI/Paginate.vue";
import { dateFormatter } from "@/composables/timeFormatter.js";

const search = ref("");
const page = ref(1);
const list = ref([]);
const notif = useNotif();
const meta = ref({
  links: [],
});
const wait = ref(false);
async function getPost() {
  if (notif.loading) return;
  wait.value = false;
  notif.loading = true;
  list.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/student?page=${page.value}&search=${search.value}&limit=8`
    );
    list.value = [...data.absensi];
    meta.value = data.meta;
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

async function getJadwal() {
  wait.value = false;
  notif.loading = true;
  list.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/student/jadwal?page=${page.value}&search=${search.value}&limit=8`
    );
    console.log(data);
    // list.value = [...data.absensi];
    // meta.value = data.meta;
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

watch(
  () => search.value,
  (e) => {
    if (wait.value) return;
    wait.value = true;
    delay(1000).then(() => getPost());
  }
);

// function waited(){
//   if(wait.value){
//     delay(1000).then(() =>
// waited()
//     );
// }else{
// wait.value = false;
// getPost()
// }
// }

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function setPage(index) {
  page.value = index.url.split("=")[1];
  getPost();
}

function limitting(e) {
  let str = e;
  if (str.length > 200) str = str.substring(0, 200) + ".......";
  return str;
}
onMounted(() => {
  getPost();
  getJadwal();
});
</script>
<template>
  <div
    class="max-w-lg mx-auto pt-20 relative text-gray-600 min-h-screen pb-20 text-xs"
  >
    <Navbar />

    <div class="px-4">
      <div class="pt-2 flex items-center justify-between">
        <div class="text-xl">Hey there !</div>
        <div>
          <!-- <div
            class="tracking-[7px] mb-2 font-semibold text-primary text-center"
          >
            POIN
          </div>
          <div
            class="w-[75px] h-[75px] flex items-center justify-center text-3xl font-semibold text-white rounded-full bg-primary"
          >
            50
          </div> -->
        </div>
      </div>

      <div class="pt-6">
        <div
          v-for="index in list"
          class="bg-white mb-4 p-4 rounded-xl border border-gray-200 flex items-center justify-between relative"
        >
          <div class="pl-2">
            <div class="font-semibold text-sm">
              {{ index.kelas?.title }}
            </div>
            <div class="text-xs">
              <span class="text-gray-400 font-semibold">
                {{ index.kelas?.author?.name }}</span
              >
            </div>
            <div class="pt-2 text-xs">
              <span class="text-gray-400"> pada {{ index.kelas?.day }}</span>
            </div>
          </div>
          <div
            :class="
              index.status == 'Belum Cukup'
                ? 'bg-rose-400/20 text-rose-400'
                : 'bg-primary/20 text-primary'
            "
            class="absolute top-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-lg"
          >
            {{ index.status }}
          </div>

          <div
            :class="
              index.status == 'Belum Cukup'
                ? ' text-gray-300'
                : ' text-gray-700'
            "
            class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 mr-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div>{{ index.total }} / {{ index.min }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
