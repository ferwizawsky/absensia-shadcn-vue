<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { useAuth } from "@/stores/auth.js";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();
const notif = useNotif();
const item = ref({
  name: "",
  email: "",
  username: "",
  password: "",
});

onMounted(() => {
  if (route.params.id) {
    getPost();
  }
});

async function getPost() {
  if (notif.loading) return;
  notif.loading = true;
  item.value = {};
  try {
    const { data } = await useMyFetch("GET", `/user/${route.params.id}`);
    item.value = { ...data.data };
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

async function store() {
  if (notif.loading) return;
  notif.loading = true;
  let url = "/user";

  if (route.params.id) {
    url = `/user/${route.params.id}/update`;
  }
  try {
    const { data } = await useMyFetch("POST", url, item.value);
    if (!route.params.id) notif.make("Succed Create Data!");
    else notif.make("Succed Update Data!");
    router.go(-1);
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}
</script>
<template>
  <div class="p-6">
    <form @submit.prevent="store()">
      <div>
        <div class="mb-3">
          Name<br />
          <input
            required
            type="text"
            name="name"
            autocomplete="name"
            v-model="item.name"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>
        <div class="mb-3">
          Username<br />
          <input
            required
            type="text"
            name="username"
            autocomplete="username"
            v-model="item.username"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>
        <div class="my-3">
          Password <br />
          <input
            type="text"
            :required="$route.query.type == 'add' ? true : false"
            name="password"
            autocomplete="current-password"
            v-model="item.password"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          />
        </div>

        <div class="item-input">
          <span>Role</span>
          <select
            v-model="item.role_id"
            class="inputan"
            :disabled="!$route.query.type ? true : false"
          >
            <option :value="0">Mahasiswa</option>
            <option :value="1">Dosen</option>
            <option :value="2">Admin</option>
          </select>
        </div>
      </div>
      <button class="btn">Add User</button>
    </form>
  </div>
</template>
