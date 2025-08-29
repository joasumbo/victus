<script setup>
import { ref, onMounted } from "vue"
import api from "@/services/auth"
import Navigation from "@/components/Navigation.vue"

const banners = ref([])
const loading = ref(true)
const showError = ref(false)
const errorMessage = ref("")
const selectedBanner = ref(null)

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const fetchBanners = async () => {
    loading.value = true
    showError.value = false
    try {
        const response = await api.get("/banners")
        banners.value = response.data
    } catch (err) {
        showError.value = true
        errorMessage.value = err.response?.data?.error || "Erro ao carregar banners"
    } finally {
        loading.value = false
    }
}

const removeBanner = async (id) => {
    if (!confirm("Tem certeza que deseja remover este banner?")) return
    try {
        await api.delete(`/banners/${id}`)
        banners.value = banners.value.filter(b => b.id !== id)
        selectedBanner.value = null
    } catch (err) {
        console.error(err)
        alert("Erro ao remover banner")
    }
}

onMounted(() => fetchBanners())
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

        <!-- Header -->
        <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
            <div class="w-full flex items-center">
                <h2 class="flex-1 text-center text-lg font-bold">Banners</h2>

                <router-link to="/banner/create"
                    class="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-600 text-blak shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
                            clip-rule="evenodd" />
                    </svg>
                </router-link>
            </div>
        </header>

        <main class="flex-1 flex flex-col items-center justify-start px-6 mt-6 w-full space-y-3">

            <!-- Skeleton loader -->
            <div v-if="loading" class="space-y-3 w-full max-w-sm sm:max-w-md">
                <div v-for="n in 3" :key="n"
                    class="flex items-center bg-gray-100 rounded-2xl shadow p-3 space-x-4 animate-pulse">
                    <div class="w-24 h-20 bg-gray-300 rounded-lg"></div>
                    <div class="flex-1 space-y-2">
                        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            <!-- Banners reais -->
            <div v-else class="w-full space-y-3">
                <div v-for="banner in banners" :key="banner.id"
                    class="flex items-center bg-items rounded-2xl shadow p-3 space-x-4 relative">

                    <img :src="banner.imagem ? `${STORAGE_URL}/${banner.imagem}` : ''" alt="Banner"
                        class="w-24 h-20 rounded-lg object-cover" />

                    <div class="flex-1">
                        <h2 class="font-semibold text-gray-800">{{ banner.titulo }}</h2>
                    </div>

                    <button @click="selectedBanner = banner"
                        class="absolute top-3 right-3 text-gray-600 hover:text-black">
                        ⋮
                    </button>

                    <!-- Modal de opções -->
                    <div v-if="selectedBanner && selectedBanner.id === banner.id"
                        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div class="bg-white p-4 rounded-lg shadow w-64">
                            <h4 class="font-semibold mb-3">Opções</h4>
                            <button @click="removeBanner(banner.id)"
                                class="block w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-600">
                                Remover
                            </button>
                            <button @click="selectedBanner = null"
                                class="block w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="banners.length === 0" class="text-center text-gray-400 mt-10">
                    Nenhum banner encontrado.
                </div>
            </div>
        </main>

        <Navigation />
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
