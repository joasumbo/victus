<script setup>
import { ref } from "vue"
import Navigation from "@/components/Navigation.vue"
import api from "@/services/auth"
import { useRouter } from "vue-router"

const router = useRouter()

// estados para mensagens
const showError = ref(false)
const errorMessage = ref("")
const showSuccess = ref(false)
const successMessage = ref("")

// opções do perfil
const profileOptions = ref([ 
  { name: "Editar Perfil", action: () => router.push("/profile/edit") },
  { name: "Alterar Senha", action: () => router.push("/profile/edit") },
  { name: "Configurar Banner", action: () => router.push("/banner/show") },
  { name: "Sair", action: () => handleLogout() }
])

// função de logout
const handleLogout = async () => {
  try {
    await api.post("/logout")

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    successMessage.value = "Logout efetuado com sucesso!"
    showSuccess.value = true

    setTimeout(() => {
      router.push("/login")
    }, 1200)
  } catch (err) {
    showError.value = true
    errorMessage.value = err.response?.data?.message || "Erro ao sair"
  }
}
</script>

<template>
  <div class="bg-white min-h-screen">

    <!-- Toast erro -->
    <transition name="fade">
      <div v-if="showError" class="fixed top-4 inset-x-0 flex justify-center z-50">
        <div class="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <span class="font-semibold">{{ errorMessage }}</span>
          <button @click="showError = false" class="ml-4 font-bold">×</button>
        </div>
      </div>
    </transition>

    <!-- Toast sucesso -->
    <transition name="fade">
      <div v-if="showSuccess" class="fixed top-4 inset-x-0 flex justify-center z-50">
        <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <span class="font-semibold">{{ successMessage }}</span>
          <button @click="showSuccess = false" class="ml-4 font-bold">×</button>
        </div>
      </div>
    </transition>

    <!-- HEADER -->
    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <h2 class="flex-1 text-center text-lg font-bold">Meu Perfil</h2>
      </div>
    </header>

    <br>

    <!-- CONTEÚDO -->
    <main class="flex-1 flex flex-col items-center justify-start px-6 mt-6">
      <div class="w-full max-w-sm space-y-3">

        <div v-for="(option, index) in profileOptions" :key="index"
          class="flex items-center justify-between bg-items rounded-lg px-4 py-3 shadow cursor-pointer hover:bg-gray-200"
          @click="option.action">

          <span class="text-gray-800 font-medium">{{ option.name }}</span>
          <span class="text-gray-500">›</span>
        </div>

      </div>
    </main>

    <!-- MENU FIXO -->
    <Navigation />
  </div>
</template>
