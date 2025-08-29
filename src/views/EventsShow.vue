<script setup>
import { ref, onMounted } from "vue"
import Navigation from "@/components/Navigation.vue"
import api from "@/services/auth"

const eventos = ref([])
const loading = ref(true)
const showError = ref(false)
const errorMessage = ref("")

const fetchEventos = async () => {
    loading.value = true
    showError.value = false
    try {
        const response = await api.get("/eventos")
        eventos.value = response.data
    } catch (err) {
        showError.value = true
        errorMessage.value = err.response?.data?.error || "Erro ao carregar eventos"
    } finally {
        loading.value = false
    }
}

const removeEvento = async (id) => {
    try {
        await api.delete(`/eventos/${id}`)
        eventos.value = eventos.value.filter(e => e.id !== id)
    } catch (err) {
        alert(err.response?.data?.error || "Erro ao remover evento")
    }
}

onMounted(() => {
    fetchEventos()
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
                <h2 class="flex-1 text-center text-lg font-bold">Eventos</h2>

                <router-link to="/events/create"
                    class="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-600 text-blak shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
                            clip-rule="evenodd" />
                    </svg>
                </router-link>
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

                <!-- Eventos reais -->
                <div v-else>
                    <div v-for="evento in eventos" :key="evento.id"
                        class="flex items-center bg-items rounded-lg shadow p-3 space-x-4 mb-3 relative">

                        <div class="flex-1">
                            <h2 class="font-semibold text-gray-800">{{ evento.titulo }}</h2>
                            <p class="text-sm text-gray-600">
                                {{ evento.descricao || 'Sem descrição' }}
                            </p>
                            <p class="text-xs text-gray-400 mt-1">
                                {{ new Date(evento.data).toLocaleDateString() }}
                            </p>
                        </div>

                        <button @click="removeEvento(evento.id)"
                            class="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold">
                            ×
                        </button>
                    </div>

                    <div v-if="eventos.length === 0" class="text-center text-gray-400 mt-10">
                        Nenhum evento encontrado.
                    </div>
                </div>
            </div>
        </main>

        <!-- MENU FIXO -->
        <Navigation />
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
