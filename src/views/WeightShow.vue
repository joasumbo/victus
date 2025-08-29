<script setup>
import { ref, onMounted } from "vue"
import Navigation from "@/components/Navigation.vue"
import api from "@/services/auth"

// Estados
const pesos = ref([])
const loading = ref(true)
const showError = ref(false)
const errorMessage = ref("")

// Buscar pesos
const fetchPesos = async () => {
  loading.value = true
  showError.value = false
  try {
    const response = await api.get("/show-pesos")
    pesos.value = response.data
  } catch (err) {
    showError.value = true
    errorMessage.value = err.response?.data?.message || "Erro ao carregar pesos"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPesos()
})
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Modal de erro -->
    <transition name="fade">
      <div v-if="showError" class="fixed top-4 inset-x-0 flex justify-center z-50">
        <div class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <span class="font-semibold">{{ errorMessage }}</span>
          <button @click="showError = false" class="ml-4 font-bold">×</button>
        </div>
      </div>
    </transition>

    <!-- HEADER -->
    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full flex items-center">
        <h2 class="flex-1 text-center text-lg font-bold">Pesos</h2>
      </div>
    </header>

    <br>

    <!-- CONTEÚDO -->
    <main class="flex-1 flex flex-col items-center justify-start px-6 mt-6">
      <div class="w-full space-y-3">

        <!-- Skeleton -->
        <div v-if="loading" class="space-y-3">
          <div v-for="n in 3" :key="n"
            class="flex items-center bg-gray-100 rounded-2xl shadow p-3 space-x-4 animate-pulse">
            <div class="w-24 h-20 bg-gray-300 rounded-lg"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Pesos reais -->
        <div v-else>
          <div v-for="peso in pesos" :key="peso.id"
            class="flex items-center bg-items rounded-lg shadow p-3 space-x-4 mb-3">

            <!-- Exemplo: mostrar data e valor -->
            <div class="flex-1">
              <h2 class="font-semibold text-gray-800">
                {{ peso.valor }} kg
              </h2>
              <p class="text-sm text-gray-600">
                Registrado em: {{ new Date(peso.data).toLocaleDateString() }}
              </p>
            </div>
          </div>

          <!-- Caso não haja pesos -->
          <div v-if="pesos.length === 0" class="text-center text-gray-400 mt-10">
            Nenhum peso encontrado.
          </div>
        </div>
      </div>
    </main>

    <!-- MENU FIXO -->
    <Navigation />
  </div>
</template>
