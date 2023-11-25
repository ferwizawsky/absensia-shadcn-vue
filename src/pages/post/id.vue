<script setup>
import { ref, onMounted } from "vue";
import { useNotif } from "@/stores/notif.js";
import { useMyFetch, jsonFormData } from "@/composables/fetch.js";
import { dateFormatter } from "@/composables/timeFormatter.js";
import Navbar from "@/components/Navbar.vue";
import { useRoute } from "vue-router";

const item = ref();
const notif = useNotif();
const route = useRoute();
const comment = ref("");

async function getPost() {
  if (notif.loading) return;
  notif.loading = true;
  item.value = {};
  try {
    const { data } = await useMyFetch("GET", `/post/${route.params.id}`);
    item.value = { ...data.data };
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}
async function storeComment() {
  if (notif.loading) return;
  notif.loading = true;
  try {
    const { data } = await useMyFetch("POST", "/comment", {
      content: comment.value,
      post_id: route.params.id,
    });
    item.value?.comments?.push(data.data);
    // console.log(data);
    // location.reload();
  } catch (error) {
  } finally {
    notif.loading = false;
  }
}
onMounted(() => {
  getPost();
});
</script>
<template>
  <div class="min-h-screen bg-gray-100 pb-20 px-4 pt-6">
    <div class="max-w-xl mx-auto pt-10">
      <div v-if="item" class="bg-white rounded-xl shadow-sm p-4 mt-6">
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
        <div class="text-sm text-gray-400 font-thin">
          {{ item.content }}
        </div>
        <div class="flex justify-between text-xs items-center mt-5">
          <div class="text-gray-400"></div>
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
            <div class="text-xs ml-1 mr-4">{{ item?.reactions?.length }}</div>

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
            <div class="text-xs ml-1 mr-4">{{ item?.comments?.length }}</div>

            <div
              class="w-6 h-6 bg-amber-400 flex items-center justify-center rounded-full text-white"
            >
              {{ item.publisher?.name.substring(0, 1) }}
            </div>
            <span class="ml-2 font-semibold">{{ item?.publisher?.name }}</span>
          </div>
        </div>
      </div>

      <div
        v-for="index in item?.comments"
        class="bg-white rounded-xl shadow-sm p-4 mt-6"
      >
        <div class="flex items-center text-xs">
          <div
            class="w-6 h-6 translate-y-4 bg-amber-400 flex items-center justify-center rounded-full text-white"
          >
            {{ item.publisher?.name.substring(0, 1) }}
          </div>
          <span class="ml-3 text-amber-500">{{ item?.publisher?.name }}</span>
        </div>
        <div class="text-sm font-thin pl-9">
          {{ index.content }}
        </div>
        <div class="flex justify-between text-xs items-center mt-2">
          <div></div>
          <div class="text-gray-400">
            {{ dateFormatter(index?.created_at) }}
          </div>
        </div>
      </div>

      <form @submit.prevent="storeComment()" class="mt-4 relative">
        <input
          type="text"
          v-model="comment"
          placeholder="Write Comment....."
          class="w-full px-5 py-3 rounded-xl text-sm focus:outline-none"
        />

        <button class="w-6 h-6 absolute right-4 top-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
    <Navbar />
  </div>
</template>
