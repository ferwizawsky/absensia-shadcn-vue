<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/vue/24/outline";
import OptionStudent from "../../components/option/OptionStudent.vue";

const router = useRouter();
const notif = useNotif();
const route = useRoute();
const kelas = ref({});
const absensi = ref([]);

async function store() {
  if (notif.loading) return;
  notif.loading = true;
  let url = "/kelas";
  if (route.params.id) {
    url = `/kelas/${route.params.id}/update`;
  }
  // console.log(jsonFormData(item.value));
  let item = { ...kelas.value };
  if (kelas.value.students.length != 0) {
    item.students = [];
    for (let x in kelas.value.students) {
      item.students.push(kelas.value.students[x].id);
    }
  }
  try {
    const { data } = await useMyFetch("POST", url, jsonFormData(item));
    if (!route.params.id) notif.make("Succed Create Data!");
    else notif.make("Succed Update Data!");
    router.go(-1);
  } catch (error) {
  } finally {
    // console.log(notif.loading);
    notif.loading = false;
  }
}

async function getPost() {
  if (notif.loading) return;
  notif.loading = true;
  kelas.value = {};
  absensi.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/absen?kelas_id=${route.params.id}`
    );
    kelas.value = { ...data.kelas };
    absensi.value = [...data.absensi];
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

onMounted(() => {
  //   kelas.value = props.modelValue;
  getPost();
});
</script>
<template>
  <div class="px-4">
    <div class="text-center mb-4">
      <div class="text-lg font-semibold capitalize">
        {{ route.query.type }} Kelas Absensi
      </div>
    </div>
    <div class="cardia pt-8 relative z-10">
      <form @submit.prevent="store()">
        <div class="item-input">
          <span>Nama Kelas</span>
          <input
            v-model="kelas.title"
            type="text"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>
        <div class="item-input">
          <span>Min. Kehadiran</span>
          <input
            v-model="kelas.min"
            type="text"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>

        <div class="item-input">
          <span>Hari Matkul</span>
          <input
            v-model="kelas.day"
            type="text"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>

        <!-- <div class="item-input">
          <span>Dosen</span>
          <div class="inputan">{{ kelas?.author?.name }}</div>
        </div> -->

        <div class="item-input">
          <span>Matkul Aktif</span>
          <select
            v-model="kelas.isUnactive"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          >
            <option :value="0">Aktif</option>
            <option :value="1">Libur</option>
          </select>
        </div>

        <div class="item-input" v-if="kelas.students && $route.query.type">
          <span>Mahasiswa</span>
          <OptionStudent
            @add="kelas.students.unshift($event)"
            :list="kelas.students"
          />
        </div>
        <div class="text-center" v-if="$route.query.type">
          <button class="btn-lg">Simpan</button>
        </div>
      </form>
    </div>

    <div v-for="item in kelas?.students" class="cardia">
      <!-- {{ item.id }} -->
      <div class="font-medium text-base">{{ item.name }}</div>
      <div class="text-xs flex items-center text-gray-400 pt-1">
        <ClockIcon class="w-4 h-4 mr-1" />
        <div class="">
          {{
            absensi.find((x) => x.user?.username == item.username)?.total ?? 0
          }}
          / {{ kelas?.min }} Kehadiran
          <span
            :class="
              absensi.find((x) => x.user?.username == item.username)?.status ==
              'Cukup'
                ? 'text-primary'
                : 'text-rose-600'
            "
          >
            {{
              absensi.find((x) => x.user?.username == item.username)?.status ??
              "Belum Cukup"
            }}
          </span>
        </div>
      </div>
      <div></div>
      <!-- <div
        :class="
          list.find((x) => x.kelas?.id == index.id)?.status == 'Cukup'
            ? 'bg-primary/20 text-primary'
            : 'bg-rose-400/20 text-rose-400'
        "
        class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
      >
        {{
          kelas.find((x) => x.kelas?.id == index.id)?.status ?? "Belum Cukup"
        }}
      </div> -->
    </div>
  </div>
</template>
