<script setup>
import { ref } from "vue"
import api from "@/services/auth"
import Navigation from "@/components/Navigation.vue"

const form = ref({
    titulo: "",
    imagem: null,
    link: ""
})

const errors = ref({})
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref("")
const showSuccess = ref(false)
const successMessage = ref("Banner adicionado com sucesso!")

const handleFileChange = (e) => {
    form.value.imagem = e.target.files[0]
}

const handleSubmit = async () => {
    loading.value = true
    errors.value = {}
    showError.value = false
    showSuccess.value = false

    try {
        const data = new FormData()
        data.append("titulo", form.value.titulo)
        data.append("link", form.value.link)
        if (form.value.imagem) data.append("imagem", form.value.imagem)

        await api.post("/banners", data)

        showSuccess.value = true
        form.value.titulo = ""
        form.value.imagem = null
        form.value.link = ""
        setTimeout(() => showSuccess.value = false, 3000)
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        } else {
            showError.value = true
            errorMessage.value = err.response?.data?.error || "Erro ao criar banner"
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white min-h-screen">

        <!-- Modais de sucesso/erro -->
        <transition name="fade">
            <div v-if="showSuccess" class="fixed top-4 inset-x-0 flex justify-center z-50">
                <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                    <span class="font-semibold">{{ successMessage }}</span>
                    <button @click="showSuccess = false" class="ml-4 font-bold">×</button>
                </div>
            </div>
        </transition>
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
            <div class="w-full max-w-sm sm:max-w-md flex items-center">
                <button @click="$router.back()" class="text-gray-700 ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="flex-1 text-center text-lg font-semibold">Adicionar Banner</h2>
            </div>
        </header>

        <main class="flex-1 flex items-center justify-center px-6 mt-10">
            <div class="w-full max-w-sm sm:max-w-md">
                <form @submit.prevent="handleSubmit" class="space-y-5 px-8">

                    <!-- Título -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Título do Banner</label>
                        <input v-model="form.titulo" type="text" placeholder="Ex: Promoção do Mês" maxlength="51"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />

                        <!-- Contador -->
                        <p class="text-xs mt-1" :class="form.titulo.length >= 45 ? 'text-red-500' : 'text-gray-500'">
                            {{ form.titulo.length }}/51 caracteres
                        </p>

                        <!-- Erro vindo do backend -->
                        <p v-if="errors.titulo" class="text-sm text-red-500 mt-1">{{ errors.titulo[0] }}</p>
                    </div>

                    <!-- Link -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Link do Banner</label>
                        <input v-model="form.link" type="url" placeholder="Ex: https://example.com"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.link" class="text-sm text-red-500 mt-1">{{ errors.link[0] }}</p>
                    </div>

                    <!-- Imagem -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Imagem (selecione uma imagem sem fundo)</label>
                        <input type="file" @change="handleFileChange" required
                            class="w-full text-gray-700 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-white file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.imagem" class="text-sm text-red-500 mt-1">{{ errors.imagem[0] }}</p>
                    </div>

                    <!-- Botão -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
                        {{ loading ? "Aguarde..." : "Criar Banner" }}
                    </button>

                </form>
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