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
      `/post?page=${page.value}&search=${search.value}&limit=8`
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
  getPost();
});
</script>
<template>
  <div class="min-h-screen bg-gray-100 pb-20 px-4 pt-10">
    <div class="max-w-xl mx-auto pt-10">
      <form @submit.prevent="">
        <input
          type="text"
          v-model="search"
          placeholder="Search....."
          class="w-full px-5 py-3 rounded-xl text-sm focus:outline-none"
        />
      </form>
      <div v-for="item in list" class="bg-white rounded-xl shadow-sm p-4 mt-6">
        <div class="flex justify-between text-xs items-center">
          <div class="text-gray-400">{{ dateFormatter(item?.created_at) }}</div>
          <div>
            <span
              v-if="item.tag"
              class="bg-primary px-4 py-1 rounded-lg text-white capitalize"
              >{{ item.tag }}</span
            >
          </div>
        </div>

        <div class="font-semibold mt-6 text-lg">{{ item.title }}</div>
        <div class="text-sm text-gray-500 font-thin">
          {{ limitting(item.content) }}
        </div>
        <div class="flex justify-between text-xs items-center mt-5">
          <div class="text-gray-400">
            <RouterLink :to="`/post/${item.id}`">Read More</RouterLink>
          </div>
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>
            <div class="text-xs ml-1 mr-4">{{ item.reactions.length }}</div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <div class="text-xs ml-1 mr-4">{{ item.comments.length }}</div>

            <div
              class="w-6 h-6 bg-amber-400 flex items-center justify-center rounded-full text-white"
            >
              {{ item.publisher?.name.substring(0, 1) }}
            </div>
            <span class="ml-2 font-semibold">{{ item.publisher?.name }}</span>
          </div>
        </div>
      </div>

      <Paginate @move="setPage($event)" :page="page" :list="meta?.links" />
    </div>
    <Navbar />
  </div>
</template>
