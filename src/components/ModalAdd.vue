<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(["update:modelValue"]);
const router = useRouter();

const close = () => emit("update:modelValue", false);

const goTo = (route) => {
  close();
  router.push(route);
};
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-2xl shadow-lg w-80 p-6 space-y-4 relative">
      <!-- Botão fechar -->
      <button @click="close" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 font-bold">×</button>

      <h2 class="text-lg font-semibold text-center">O que deseja fazer?</h2>

      <div class="flex flex-col gap-3 mt-4">
        <button @click="goTo('/libraries/create')"
                class="w-full py-2 bg-text-primary text-white rounded-lg hover:bg-text-primary transition">
          Adicionar biblioteca
        </button>
        <button @click="goTo('/videos/upload')"
                class="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Carregar novo vídeo
        </button>
      </div>
    </div>
  </div>
</template>