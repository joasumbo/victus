<script setup>
import { ref, onMounted } from "vue"
import Navigation from "@/components/Navigation.vue"
import api from "@/services/auth"

const frases = ref([])
const loading = ref(true)
const showError = ref(false)
const errorMessage = ref("")

const fetchFrases = async () => {
    loading.value = true
    showError.value = false
    try {
        const response = await api.get("/frases")
        frases.value = response.data
    } catch (err) {
        showError.value = true
        errorMessage.value = err.response?.data?.error || "Erro ao carregar frases"
    } finally {
        loading.value = false
    }
}

onMounted(fetchFrases)
</script>

<template>
    <div class="bg-white min-h-screen">

        <!-- Erro -->
        <transition name="fade">
            <div v-if="showError" class="fixed top-4 inset-x-0 flex justify-center z-50">
                <div class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    <span class="font-semibold">{{ errorMessage }}</span>
                    <button @click="showError = false" class="ml-4 font-bold">×</button>
                </div>
            </div>
        </transition>

        <!-- HEADER -->
        <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
            <div class="w-full flex items-center">
                <h2 class="flex-1 text-center text-lg font-bold">Frases do Dia</h2>

                <!-- Botão com ícone plus (SVG direto) -->
                <router-link to="/phrases/create"
                    class="ml-3 p-2 rounded-full bg-gray-100 hover:bg-gray-600 text-blak shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
                        <path fill-rule="evenodd"
                            d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
                            clip-rule="evenodd" />
                    </svg>
                </router-link>
            </div>
        </header>

        <!-- CONTEÚDO -->
        <main class="flex-1 flex flex-col items-center justify-start px-6 mt-6">
            <div class="w-full space-y-3">

                <!-- Skeleton -->
                <div v-if="loading" class="space-y-3">
                    <div v-for="n in 3" :key="n"
                        class="flex items-center bg-gray-100 rounded-2xl shadow p-3 animate-pulse h-16">
                        <div class="w-3/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>

                <!-- Frases -->
                <div v-else>
                    <div v-for="frase in frases" :key="frase.id" class="bg-items rounded-lg shadow p-3 mb-3">
                        <p class="text-gray-800 font-medium">"{{ frase.frase }}"</p>
                    </div>

                    <div v-if="frases.length === 0" class="text-center text-gray-400 mt-10">
                        Nenhuma frase encontrada.
                    </div>
                </div>
            </div>
        </main>

        <Navigation />
    </div>
</template>
