<script setup>
import { ref } from "vue"
import api from "@/services/auth"

// Formulário
const form = ref({
    name: "",
    description: "",
    thumb: null
})

const errors = ref({})
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref("")

const showSuccess = ref(false)
const successMessage = ref("Biblioteca adicionada com sucesso!")

const handleFileChange = (e) => {
    form.value.thumb = e.target.files[0]
}

// Submissão do formulário
const handleSubmit = async () => {
    loading.value = true
    errors.value = {}
    showError.value = false
    showSuccess.value = false

    try {
        const data = new FormData()
        data.append("name", form.value.name)
        data.append("description", form.value.description)
        if (form.value.thumb) data.append("thumb", form.value.thumb)

        await api.post("/libraries", data) 

        showSuccess.value = true 

        form.value.name = ""
        form.value.description = ""
        form.value.thumb = null

        setTimeout(() => showSuccess.value = false, 3000)

    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.messages
        } else {
            showError.value = true
            errorMessage.value = err.response?.data?.message || "Erro ao criar biblioteca"
        }
    } finally {
        loading.value = false
    }
}
</script>


<template>
    <div class=" bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white">
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
                <h2 class="flex-1 text-center text-lg font-semibold">Adicionar Biblioteca</h2>
            </div>
        </header>

        <br>

        <!-- CONTEÚDO -->
        <main class="flex-1 flex items-center justify-center px-6 mt-6 mt-10">
            <div class="w-full max-w-sm sm:max-w-md">

                <form @submit.prevent="handleSubmit" class="space-y-5 px-8">

                    <!-- Nome -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Nome da biblioteca</label>
                        <input v-model="form.name" type="text" placeholder="Ex: Receitas Fitness"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name[0] }}</p>
                    </div>

                    <!-- Descrição -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Descrição</label>
                        <textarea v-model="form.description" placeholder="Ex: Vídeos de treino e alimentação saudável"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"></textarea>
                        <p v-if="errors.description" class="text-sm text-red-500 mt-1">{{ errors.description[0] }}</p>
                    </div>

                    <!-- Thumb -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Thumbnail (opcional)</label>
                        <input type="file" @change="handleFileChange"
                            class="w-full text-gray-700 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-white file:text-gray-700 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.thumb" class="text-sm text-red-500 mt-1">{{ errors.thumb[0] }}</p>
                    </div>

                    <!-- Botão -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
                        {{ loading ? "Aguarde..." : "Criar Biblioteca" }}
                    </button>

                </form>
            </div>
        </main>

        <!-- MENU FIXO -->
        <Navigation />
    </div>
</template>


<script>
import Navigation from "@/components/Navigation.vue";
import { getUser } from "@/services/auth"

export default {
    name: 'AddLibrary',
    components: { Navigation },
    data() {
        return {
            user: null
        }
    },
    async mounted() {
        this.user = await getUser()
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
