<script setup>
import { ref, onMounted } from "vue"
import Navigation from "@/components/Navigation.vue"
import api from "@/services/auth"
import { useRouter } from 'vue-router'

import ModalAdd from "@/components/ModalAdd.vue";

const libraries = ref([])
const loading = ref(true)
const showError = ref(false)
const errorMessage = ref("")

const isModalOpen = ref(false);

const router = useRouter()

const goToLibrary = (id) => {
  router.push({ name: 'LibraryVideo', params: { id } })
}

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL
const DEFAULT_IMAGE = "https://cdn1.iconfinder.com/data/icons/kuru-media/100/media_player_thin_convert-512.png"

const selectedLibrary = ref(null)

// buscar bibliotecas
const fetchLibraries = async () => {
  loading.value = true
  showError.value = false
  try {
    const response = await api.get("/libraries")
    libraries.value = response.data
  } catch (err) {
    showError.value = true
    errorMessage.value = err.response?.data?.message || "Erro ao carregar bibliotecas"
  } finally {
    loading.value = false
  }
}

// funções do modal
const openMenu = (library) => {
  selectedLibrary.value = library
}
const closeMenu = () => {
  selectedLibrary.value = null
}

// remover biblioteca
const removeLibrary = async (id) => {
  try {
    await api.delete(`/libraries/${id}`)
    libraries.value = libraries.value.filter(l => l.id !== id)
    selectedLibrary.value = null
  } catch (error) {
    console.error(error)
    alert("Erro ao remover a biblioteca")
  }
}

// função para montar URL da thumb
const getLibraryImage = (library) => {
  return library.thumb ? `${STORAGE_URL}/${library.thumb}` : DEFAULT_IMAGE
}

onMounted(() => {
  fetchLibraries()
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
        <h2 class="flex-1 text-center text-lg font-bold">Bibliotecas</h2>

        <!-- Botão com ícone plus (SVG direto) -->
        <button class="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-600 text-blak shadow"
          @click="isModalOpen = true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
            <path fill-rule="evenodd"
              d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </header>

    <br>

    
  <ModalAdd v-model="isModalOpen" />

    <!-- CONTEÚDO -->
    <main class="flex-1 flex flex-col items-center justify-start px-6 mt-6">
      <div class="w-full space-y-3">

        <!-- Skeleton enquanto carrega -->
        <div v-if="loading" class="space-y-3">
          <div v-for="n in 3" :key="n"
            class="flex items-center bg-gray-100 rounded-2xl shadow p-3 space-x-4 animate-pulse">
            <!-- Thumb fake -->
            <div class="w-24 h-20 bg-gray-300 rounded-lg"></div>

            <!-- Texto fake -->
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              <div class="h-2 bg-gray-200 rounded w-1/3 mt-2"></div>
            </div>
          </div>
        </div>

        <!-- Bibliotecas reais -->
        <div v-else>
          <div v-for="library in libraries" :key="library.id"
            class="flex items-center bg-items rounded-2xl shadow p-3 space-x-4 mb-3 relative">

            <!-- Imagem clicável -->
            <img :src="getLibraryImage(library)" alt="Imagem da biblioteca"
              class="w-24 h-20 rounded-lg object-cover cursor-pointer" @click="goToLibrary(library.id)" />

            <!-- Info -->
            <div class="flex-1">
              <h2 class="font-semibold text-gray-800 cursor-pointer" @click="goToLibrary(library.id)">
                {{ library.name }}
              </h2>
              <p class="text-sm text-gray-600" v-if="library.description">
                {{ library.description.length > 35 ? library.description.slice(0, 35) + '...' : library.description }}
              </p>

              <p class="text-xs text-gray-400 mt-1">{{ library.videos.length }} vídeos</p>
            </div>

            <button @click="openMenu(library)" class="absolute top-3 right-3 text-gray-600 hover:text-black">
              ⋮
            </button>

            <!-- Modal -->
            <div v-if="selectedLibrary && selectedLibrary.id === library.id"
              class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
              <div class="bg-white p-4 rounded-lg shadow w-64">
                <h4 class="font-semibold mb-3">Opções</h4>
                <button @click="removeLibrary(library.id)"
                  class="block w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600">
                  Remover
                </button>
                <button @click="closeMenu" class="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <!-- Caso não haja bibliotecas -->
          <div v-if="libraries.length === 0" class="text-center text-gray-400 mt-10">
            Nenhuma biblioteca encontrada.
          </div>
        </div>
      </div>
    </main>

    <!-- MENU FIXO -->
    <Navigation />
  </div>
</template>
