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
});
</script>
<template>
  <div
    class="max-w-lg mx-auto pt-20 relative text-gray-600 min-h-screen bg-gray-100 pb-20 text-xs"
  >
    <Navbar />

    <div class="px-4">
      <div class="pt-6 flex items-center justify-between">
        <div class="text-xl">
          Hai, <br />
          <span class="font-semibold">Ferry</span>
        </div>
        <div>
          <div
            class="tracking-[7px] mb-2 font-semibold text-primary text-center"
          >
            POIN
          </div>
          <div
            class="w-[75px] h-[75px] flex items-center justify-center text-3xl font-semibold text-white rounded-full bg-primary"
          >
            50
          </div>
        </div>
      </div>

      <div class="pt-10">
        <div
          v-for="index in list"
          class="bg-white mb-4 p-2 rounded-full flex items-center justify-between"
        >
          <div class="pl-4">
            <div class="font-semibold">
              Pelatihan Nasional Pembuatan Desain...
            </div>
            <div>
              <span class="text-primary">Raden Mas Ferry</span>
              <span> - </span>
              <span class="text-gray-400">17 Agustus 2024</span>
            </div>
          </div>

          <div
            class="w-[55px] text-lg h-[55px] bg-primary flex items-center justify-center text-white font-semibold rounded-full"
          >
            +25
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
