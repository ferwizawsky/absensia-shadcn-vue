<script setup>
import { ref, onMounted } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { dateFormatter } from "@/composables/timeFormatter.js";
import { useRoute, useRouter } from "vue-router";
import OptionKelas from "@/components/option/OptionKelas.vue";

const item = ref({
  title: "",
  day: new Date().toISOString().split("T")[0],
  kelas_id: 0,
});
const notif = useNotif();
const route = useRoute();
const router = useRouter();
// async function getPost() {
//   if (notif.loading) return;
//   notif.loading = true;
//   item.value = {};
//   try {
//     const { data } = await useMyFetch("GET", `/jadwal/${route.params.id}`);
//     item.value = { ...data.data };
//     // location.reload();
//   } catch (error) {
//   } finally {
//     notif.loading = false;
//   }
// }

async function store() {
  if (notif.loading) return;
  notif.loading = true;
  let url = "/jadwal";
  if (route.params.id) {
    url = `/jadwal/${route.params.id}`;
  }
  try {
    const { data } = await useMyFetch("POST", url, item.value);
    notif.make("Succed Update Post!");
    router.go(-1);
    // if (route.params.id) {
    // } else {
    //   router.push(`/admin/jadwal`);
    // }
    // console.log(data);
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

onMounted(() => {
  // if (route.params.id) {
  //   getPost();
  // }
});
</script>
<template>
  <div class="">
    <div class="px-4">
      <div>
        <button @click="$router.go(-1)" class="flex items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back
        </button>
      </div>
      <form
        class="bg-white rounded-xl shadow-xl border border-gray-100 p-4 mt-6"
      >
        <div class="text-center text-lg">Jadwal</div>

        <div class="mt-4">
          <label>Judul</label>
          <input
            type="text"
            v-model="item.title"
            class="inputan"
            required
            :disabled="!$route.query.type ? true : false"
          />
        </div>
        <div class="mt-4">
          <label>Hari / Tanggal</label>
          <input
            type="date"
            v-model="item.day"
            class="inputan"
            required
            :disabled="!$route.query.type ? true : false"
          />
        </div>
        <div class="mt-4">
          <label>Kelas</label>
          <OptionKelas v-model="item.kelas_id" />
        </div>
      </form>

      <div class="pt-4 text-center">
        <button @click="store()" class="btn">Simpan</button>
      </div>
    </div>
  </div>
</template>
