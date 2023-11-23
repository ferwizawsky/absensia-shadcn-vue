<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps(["modelValue", "edit", "image", "title"]);

const modelImage = ref("");
const image = ref("");

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
        modelImage.value = file;
        image.value = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }
}

onMounted(() => {
  if (typeof props.image == "string") {
    image.value = props.image;
    console.log(image.value);
  }
});

watch(
  () => props.image,
  (e) => {
    if (typeof e === "string") {
      image.value = e;
      console.log(e);
    }
  },
  {
    deep: true,
  }
);
watch(
  () => modelImage.value,
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
    <div
      :class="
        !image ? 'border border-gray-200 dark:border-gray-700' : 'shadow-md '
      "
      class="group relative overflow-hidden rounded-lg"
    >
      <img v-if="image" :src="image" class="h-[250px] object-cover w-full" />
      <div v-else class="h-[250px]"></div>
      <div
        v-if="props.edit"
        :class="!image ? '' : 'bg-black/50 '"
        class="w-full h-full backdrop-blur-sm absolute bottom-0 opacity-0 ease-in-out duration-500 group-hover:opacity-100 flex items-center justify-center"
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
