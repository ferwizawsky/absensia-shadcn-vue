<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "edit", "listImg", "title"]);

const list = ref([]);
const listImg = ref([]);

function removeObjects(x) {
  list.value.splice(x, 1);
  listImg.value.splice(x, 1);
  console.log(listImg.value);
}

function addImage(event) {
  const files = event.target.files;
  if (files) {
    Array.from(files).forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        console.error(`File at index ${index} is not an image.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        list.value.push(file);
        listImg.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
}

watch(
  () => list.value,
  (e) => {
    emit("update:modelValue", e);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div>
    <div>{{ props.title ?? "Image" }}</div>
    <div v-if="!props.edit" class="grid grid-cols-5 gap-4 max-w-[1024px]">
      <div
        class="group relative overflow-hidden rounded-lg shadow-md"
        v-for="(index, x) in props.listImg"
      >
        <img :src="index" class="h-[250px] object-cover w-full" />
      </div>
    </div>
    <div v-else class="grid grid-cols-5 gap-4 max-w-[1024px]">
      <div
        class="group relative overflow-hidden rounded-lg shadow-md"
        v-for="(index, x) in listImg"
      >
        <img :src="index" class="h-[250px] object-cover w-full" />
        <div
          v-if="props.edit"
          class="w-full h-full bg-black/50 backdrop-blur-sm absolute bottom-0 opacity-0 ease-in-out duration-500 group-hover:opacity-100 flex items-center justify-center"
        >
          <span
            @click="removeObjects(x)"
            class="bg-rose-500 hover:brightness-125 text-white p-3 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        class="h-[250px] border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center"
      >
        <div
          class="bg-secondary hover:brightness-110 relative text-white p-3 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <input
            @change="addImage"
            class="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
            type="file"
            accept="image/*"
            multiple
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
input[type="file"]::file-selector-button {
  display: none;
}
</style>
