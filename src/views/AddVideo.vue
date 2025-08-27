<script setup>
import { ref } from "vue"
import api from "@/services/auth"

// Formulário de vídeo
const form = ref({
    title: "",
    description: "",
    video: null,
    library_id: "" 
})

const errors = ref({})
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref("")

const showSuccess = ref(false)
const successMessage = ref("Vídeo adicionado com sucesso!")

const handleFileChange = (e) => {
    form.value.video = e.target.files[0]
}

// Submissão do formulário
const handleSubmit = async () => {
    loading.value = true
    errors.value = {}
    showError.value = false
    showSuccess.value = false

    try {
        const data = new FormData()
        data.append("title", form.value.title)
        data.append("description", form.value.description)
        data.append("library_id", form.value.library_id)
        if (form.value.video) data.append("video", form.value.video)

        await api.post("/videos", data)

        showSuccess.value = true

        // Limpar formulário
        form.value.title = ""
        form.value.description = ""
        form.value.video = null

        setTimeout(() => showSuccess.value = false, 3000)

    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.messages
        } else {
            showError.value = true
            errorMessage.value = err.response?.data?.message || "Erro ao enviar vídeo"
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white min-h-screen">
        <!-- Modal de sucesso -->
        <transition name="fade">
            <div v-if="showSuccess" class="fixed top-4 inset-x-0 flex justify-center z-50">
                <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                    <span class="font-semibold">{{ successMessage }}</span>
                    <button @click="showSuccess = false" class="ml-4 font-bold">×</button>
                </div>
            </div>
        </transition>

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
            <div class="w-full max-w-sm sm:max-w-md flex items-center">
                <button @click="$router.back()" class="text-gray-700 ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="flex-1 text-center text-lg font-semibold">Adicionar Vídeo</h2>
            </div>
        </header>

        <main class="flex-1 flex items-center justify-center px-6 mt-10">
            <div class="w-full max-w-sm sm:max-w-md">
                <form @submit.prevent="handleSubmit" class="space-y-5 px-8">

                    <!-- Biblioteca -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Selecione a biblioteca</label>
                        <select v-model="form.library_id" 
                                class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300">
                            <option value="" disabled>Escolha a biblioteca</option>
                            <option v-for="lib in libraries" :key="lib.id" :value="lib.id">
                                {{ lib.name }}
                            </option>
                        </select>
                        <p v-if="errors.library_id" class="text-sm text-red-500 mt-1">{{ errors.library_id[0] }}</p>
                    </div>

                    <!-- Título -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Título do vídeo</label>
                        <input v-model="form.title" type="text" placeholder="Ex: Treino HIIT"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.title" class="text-sm text-red-500 mt-1">{{ errors.title[0] }}</p>
                    </div>

                    <!-- Descrição -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Descrição (opcional)</label>
                        <textarea v-model="form.description" placeholder="Descrição do vídeo"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"></textarea>
                        <p v-if="errors.description" class="text-sm text-red-500 mt-1">{{ errors.description[0] }}</p>
                    </div>

                    <!-- Upload de vídeo -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Selecione o vídeo</label>
                        <input type="file" accept="video/*" @change="handleFileChange"
                            class="w-full text-gray-700 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-white file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.video" class="text-sm text-red-500 mt-1">{{ errors.video[0] }}</p>
                    </div>

                    <!-- Botão -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
                        {{ loading ? "Aguarde..." : "Enviar Vídeo" }}
                    </button>

                </form>
            </div>
        </main>

        <Navigation />
    </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { getUser } from "@/services/auth"

export default {
    name: 'AddVideo',
    components: { Navigation },
    data() {
        return {
            user: null,
            libraries: []
        }
    },
    async mounted() {
        this.user = await getUser()
        const res = await api.get('/libraries')
        this.libraries = res.data
    }
}
</script>

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
