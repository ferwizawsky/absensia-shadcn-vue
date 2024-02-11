<script setup>
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginate from "@/components/ui/Paginate.vue";
import { Trash2, Pencil } from "lucide-vue-next";
import { ref, onMounted } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";

const search = ref("");
const page = ref(1);

const list = ref([]);
const listJadwal = ref([]);
const listKelas = ref([]);

const notif = useNotif();
const meta = ref({
  links: [],
});

async function getPost() {
  if (notif.loading) return;
  notif.loading = true;
  list.value = [];
  try {
    const { data } = await useMyFetch(
      "GET",
      `/user?page=${page.value}&search=${search.value}&limit=80`
    );
    list.value = [...data.data];
    meta.value = data.meta;
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}

async function deleteData(e) {
  let text = `Delete Data ${e.name} ?`;
  if (confirm(text) == true) {
    try {
      const { data } = await useMyFetch("delete", `/user/${e.id}/delete`);
      getPost();
      notif.make("Succed Delete Data");
    } catch (e) {
      // console.log(e);
      notif.make("Failed Delete Data", { type: "danger" });
    }
  }
}

onMounted(() => {
  getPost();
});

function setPage(index) {
  page.value = index.url.split("=")[1];
  getPost();
}

function getRole(e) {
  if (e == 0) return "Mahasiswa";
  if (e == 1) return "Dosen";
  return "Admin";
}
</script>

<template>
  <div class="p-4">
    <div class="mb-5">
      <div class="text-center font-semibold text-lg hidden md:block">
        User Management
      </div>
      <div class="text-right -mt-6">
        <RouterLink to="/admin/user-make?type=add">
          <button class="btn">Make User</button>
        </RouterLink>
      </div>
    </div>
    <Table>
      <!-- <TableCaption>A list of your recent invoices.</TableCaption> -->
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> Invoice </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead> Role </TableHead>
          <TableHead> Aksi </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in list">
          <TableCell class="font-medium">
            {{ (page - 1) * 10 + index + 1 }}
          </TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>{{ item.username }}</TableCell>
          <TableCell>
            {{ getRole(item.role_id) }}
          </TableCell>
          <TableCell class="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              @click="$router.push(`${$route.path}/${item.id}?type=edit`)"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 mr-2 text-primary cursor-pointer hover:opacity-45 ease-in-out duration-200"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <svg
              @click="deleteData(item)"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 text-rose-500 cursor-pointer hover:opacity-45 ease-in-out duration-200"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Paginate
      @move="setPage($event)"
      :page="page"
      :list="meta?.links"
      :meta="meta"
    />
  </div>
</template>
