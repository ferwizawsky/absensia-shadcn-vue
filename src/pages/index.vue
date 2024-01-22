<script setup>
import { ref, onMounted, watch } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import Topbar from "@/components/Topbar.vue";
import Paginate from "@/components/UI/Paginate.vue";
import { dateFormatter } from "@/composables/timeFormatter.js";
import { useRouter } from "vue-router";

const router = useRouter();
const search = ref("");
const page = ref(1);

const list = ref([]);
const listJadwal = ref([]);
const listKelas = ref([]);

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

async function getKelas() {
  if (notif.loading) return;
  wait.value = false;
  list.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/student/kelas?page=${page.value}&search=${search.value}&limit=80`
    );
    listKelas.value = [...data.data];
    meta.value = data.meta;
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

async function getJadwal() {
  wait.value = false;
  listJadwal.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/student/jadwal?page=${page.value}&search=${search.value}&limit=80`
    );
    listJadwal.value = [...data.data];
    // meta.value = data.meta;
  } catch (error) {}
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
  getKelas();
  getPost();
  getJadwal();
  if (localStorage.getItem("role_id") == "1") router.push("/dosen");
});
</script>
<template>
  <div class="max-w-lg mx-auto pt-20 relative min-h-screen pb-20 text-xs">
    <Topbar />

    <div class="px-4">
      <div>
        <div class="text-center">
          <div class="text-lg font-semibold">Jadwal</div>
        </div>
        <div class="pt-3">
          <div
            v-for="index in listJadwal"
            class="bg-white mb-4 drop-shadow-md p-1.5 rounded-full flex items-center justify-start flex-wrap relative"
          >
            <div class="p-4 bg-primary rounded-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>
            <div class="pl-3">
              <div class="text-gray-400">
                {{ index.title }} ({{ index?.author?.name }})
              </div>
              <div>
                {{ index?.kelas?.title }}
              </div>
              <div class="text-xs font-semibold">16 Februari 2024</div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-8 text-center">
        <div class="text-lg font-semibold">Absensi</div>
      </div>

      <div class="pt-3">
        <div
          v-for="index in listKelas"
          class="bg-white mb-4 drop-shadow-md p-4 rounded-2xl flex items-center justify-between flex-wrap relative"
        >
          <div class="pl-2">
            <div class="text-sm">
              {{ index?.title }}
            </div>
            <div class="text-xs flex items-center pt-2 pb-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-4 h-4 mr-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <span class="font-medium text-primary">
                {{ index?.author?.name }}</span
              >
            </div>
            <div class="text-xs flex items-center text-gray-400">
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
              <span class=""> {{ index?.day }}</span>
            </div>
          </div>
          <div
            :class="
              list.find((x) => x.kelas?.id == index.id)?.status == 'Cukup'
                ? 'bg-primary/20 text-primary'
                : 'bg-rose-400/20 text-rose-400'
            "
            class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
          >
            {{
              list.find((x) => x.kelas?.id == index.id)?.status ?? "Belum Cukup"
            }}
          </div>

          <div
            :class="
              index.status == 'Belum Cukup'
                ? ' text-gray-300'
                : ' text-gray-700'
            "
            class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
          >
            <!-- <div>{{ index.total }} / {{ index.min }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
