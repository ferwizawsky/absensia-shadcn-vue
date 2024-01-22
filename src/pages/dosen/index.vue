<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import Paginate from "@/components/UI/Paginate.vue";
import { dateFormatter } from "@/composables/timeFormatter.js";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  Squares2X2Icon,
} from "@heroicons/vue/24/outline";
import ViewKelas from "@/components/ViewKelas.vue";
// const ViewKelas = defineAsyncComponent(() =>
//   import("@/components/ViewKelas.vue")
// );
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
      `/kelas?page=${page.value}&search=${search.value}&limit=8`
    );
    list.value = [...data.data];
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
  // getKelas();
  getPost();
  // getJadwal();
});
</script>
<template>
  <div class="px-4">
    <div class="text-center">
      <div class="text-lg font-semibold">Kelas</div>
    </div>
    <div class="pt-3">
      <div
        v-for="index in list"
        class="bg-white mb-4 drop-shadow-md p-4 rounded-2xl flex items-center justify-between flex-wrap relative"
      >
        <div class="pl-2">
          <div class="text-sm">
            {{ index?.title }}
          </div>
          <div class="text-xs flex items-center pt-2 pb-1 text-gray-400">
            <UserIcon class="w-4 h-4 mr-1" />
            <span class="font-medium text-primary">
              {{ index?.author?.name }}</span
            >
          </div>
          <div class="text-xs flex items-center text-gray-400">
            <ClockIcon class="w-4 h-4 mr-1" />
            <span class=""> {{ index?.day }}</span>
          </div>
          <div class="text-xs flex items-center text-gray-400">
            <CalendarIcon class="w-4 h-4 mr-1" />
            <span class="font-light"> Min. {{ index?.min }} Kehadiran</span>
          </div>
        </div>
        <div class="absolute bottom-2 right-2 py-1 text-xs px-3 text-right">
          <div :class="!index.isUnactive ? ' text-gray-700' : ' text-rose-600'">
            {{ !index.isUnactive ? "Aktif" : "Libur" }}
          </div>
          <div class="flex items-center justify-center">
            <UserIcon class="w-4 h-4 mr-1" />
            {{ index.students.length }}
          </div>
        </div>
        <div
          class="absolute top-1 right-0 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
        >
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <MenuButton
                class="p-1 cursor-pointer hover:brightness-50 text-white bg-primary flex items-center justify-center rounded-lg"
              >
                <Squares2X2Icon class="w-5 h-5" />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems
                class="absolute border border-gray-200 right-0 mt-0 w-40 origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
              >
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      @click="$router.push(`/dosen/kelas/${index.id}`)"
                      :class="[
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      Absen Kehadiran
                    </button>
                  </MenuItem>

                  <MenuItem v-slot="{ active }">
                    <button
                      @click="
                        $router.push(`/dosen/kelas/${index.id}?type=edit`)
                      "
                      :class="[
                        active ? 'bg-primary text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      ]"
                    >
                      Edit
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>
