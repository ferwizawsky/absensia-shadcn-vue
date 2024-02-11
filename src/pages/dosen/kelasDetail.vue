<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";

import OptionStudent from "../../components/option/OptionStudent.vue";
import StudentList from "@/components/option/StudentList.vue";

const router = useRouter();
const notif = useNotif();
const route = useRoute();
const kelas = ref({ students: [] });

const selectedStudents = ref([]);
const absensi = ref([]);
const backStudent = ref([]);

async function store() {
  if (notif.loading) return;
  notif.loading = true;
  let url = "/kelas";
  if (route.params.id) {
    url = `/kelas/${route.params.id}/update`;
  }
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

async function absen() {
  let text = `Absen Mahasiswa dari List ?`;
  let tmp1 = [];
  for (let x in selectedStudents.value) {
    tmp1.push({
      id: selectedStudents.value[x],
      status: "",
    });
  }

  if (confirm(text) == true) {
    try {
      const { data } = await useMyFetch(
        "POST",
        `/absen`,
        jsonFormData({
          user: tmp1,
          kelas_id: route.params.id,
        })
      );
      selectedStudents.value = [];
      getPost();
    } catch (e) {
      // console.log(e);
      // notif.make("Failed Delete Data", { type: "danger" });
    }
  }
}

async function deleteData() {
  let text = `Delete Data Mahasiswa dari List ?`;
  if (confirm(text) == true) {
    try {
      const { data } = await useMyFetch(
        "POST",
        `/kelas/${route.params.id}/remove`,
        jsonFormData({
          students: selectedStudents.value,
        })
      );
      getPost();
    } catch (e) {
      // console.log(e);
      // notif.make("Failed Delete Data", { type: "danger" });
    }
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
    backStudent.value = [...data.kelas.students];
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

onMounted(() => {
  //   kelas.value = props.modelValue;
  if (route.params.id) getPost();
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

        <div class="item-input" v-if="route.query.type">
          <span>Mahasiswa</span>
          <OptionStudent
            @add="kelas.students.unshift($event)"
            :list="kelas.students"
          />
        </div>
        <div class="text-center mt-6" v-if="$route.query.type">
          <button class="btn-lg">Simpan</button>
        </div>
      </form>
    </div>

    <div class="pt-4">
      <StudentList
        v-model="selectedStudents"
        :absensi="absensi"
        :kelas="kelas"
        :students="kelas?.students"
        @remove="kelas?.students?.splice($event, 1)"
      >
        <button class="btn" @click="absen()" v-if="!route.query.type">
          Absen
        </button>
        <button
          class="btn-danger"
          @click="deleteData()"
          v-if="route.query.type && route.params.id"
        >
          Delete
        </button>
      </StudentList>
    </div>
  </div>
</template>
