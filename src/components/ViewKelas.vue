<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const data = ref({});

onMounted(() => {
  data.value = props.modelValue;
});
// watch(
//   () => props.modelValue,
//   (e) => {
//     data.value = e;
//   }
// );

watch(
  () => data.value,
  (e) => {
    emit("update:modelValue", e?.id);
  },
  {
    deep: true,
  }
);
</script>
<template>
  <div>
    <div class="cardia">
      <form>
        <div class="item-input">
          <span>Nama Kelas</span>
          <input v-model="data.title" type="text" class="inputan" disabled />
        </div>
        <div class="item-input">
          <span>Min. Kehadiran</span>
          <input v-model="data.min" type="text" class="inputan" disabled />
        </div>
      </form>
    </div>
    <div
      v-for="item in data?.students"
      class="cardia flex items-center justify-between flex-wrap relative"
    >
      {{ item.name }}
      <div></div>
      <div></div>
      <div
        :class="
          list.find((x) => x.kelas?.id == index.id)?.status == 'Cukup'
            ? 'bg-primary/20 text-primary'
            : 'bg-rose-400/20 text-rose-400'
        "
        class="absolute bottom-2 right-2 py-1 text-xs px-3 flex items-center justify-center font-medium rounded-2xl"
      >
        {{ data.find((x) => x.kelas?.id == index.id)?.status ?? "Belum Cukup" }}
      </div>
    </div>
  </div>
</template>
