<script setup>
import { ref, onMounted } from "vue"
import { getUser, updateProfile } from "@/services/auth"
import Navigation from "@/components/Navigation.vue"

// Form
const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})

const errors = ref({})
const loading = ref(false)
const showError = ref(false)
const errorMessage = ref("")
const showSuccess = ref(false)
const successMessage = ref("Perfil atualizado com sucesso!")

onMounted(async () => {
    try {
        const user = await getUser()
        if (user) {
            form.value.name = user.name
            form.value.email = user.email
        }
    } catch (err) {
        console.error("Erro ao carregar perfil:", err)
    }
})

const handleSubmit = async () => {
    loading.value = true
    errors.value = {}
    showError.value = false
    showSuccess.value = false

    try {
        await updateProfile(form.value)

        showSuccess.value = true
        form.value.password = ""
        form.value.password_confirmation = ""

        setTimeout(() => (showSuccess.value = false), 3000)
    } catch (err) {
        if (err.response?.status === 422) {
            errors.value = err.response.data.errors
        } else {
            showError.value = true
            errorMessage.value = err.response?.data?.error || "Erro ao atualizar perfil"
        }
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white min-h-screen">

        <!-- Sucesso -->
        <transition name="fade">
            <div v-if="showSuccess" class="fixed top-4 inset-x-0 flex justify-center z-50">
                <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
                    <span class="font-semibold">{{ successMessage }}</span>
                    <button @click="showSuccess = false" class="ml-4 font-bold">×</button>
                </div>
            </div>
        </transition>

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
            <div class="w-full max-w-sm sm:max-w-md flex items-center">
                <button @click="$router.back()" class="text-gray-700 ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="flex-1 text-center text-lg font-semibold">Editar Perfil</h2>
            </div>
        </header>

        <!-- FORM -->
        <main class="flex-1 flex items-center justify-center px-6 mt-10">
            <div class="w-full max-w-sm sm:max-w-md">
                <form @submit.prevent="handleSubmit" class="space-y-5 px-8">

                    <!-- Nome -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Nome</label>
                        <input v-model="form.name" type="text"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name[0] }}</p>
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Email</label>
                        <input v-model="form.email" type="email"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email[0] }}</p>
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Nova Senha (opcional)</label>
                        <input v-model="form.password" type="password"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                        <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password[0] }}</p>
                    </div>

                    <!-- Confirm Password -->
                    <div>
                        <label class="block text-sm text-gray-700 mb-1">Confirmar Senha</label>
                        <input v-model="form.password_confirmation" type="password"
                            class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300" />
                    </div>

                    <!-- Botão -->
                    <button type="submit" :disabled="loading"
                        class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
                        {{ loading ? "Aguarde..." : "Salvar Alterações" }}
                    </button>
                </form>
            </div>
        </main>

        <Navigation />
    </div>
</template>
