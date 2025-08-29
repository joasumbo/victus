<template>
  <div class="min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#f9f3f2] to-white px-6">

    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <h2 class="flex-1 text-center text-lg font-semibold">Recuperar palavra-passe</h2>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-sm sm:max-w-md px-6">
        <form @submit.prevent="handleForgot" class="space-y-5">
          <div>
            <label class="block text-sm text-gray-700 mb-1">Email</label>
            <input v-model="email" type="email" placeholder="teuemail@gmail.com"
              class="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
            <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium disabled:opacity-50">
            {{ loading ? "Aguarde..." : "Enviar link de recuperação" }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          <router-link to="/login" class="text-pink-500">Voltar ao login</router-link>
        </p>

        <!-- Notificação -->
        <transition name="fade">
          <div v-if="success" class="fixed top-4 inset-x-0 flex justify-center z-50">
            <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
              {{ success }}
            </div>
          </div>
        </transition>
      </div>
    </main>

  </div>
</template>

<script>
import api from "@/services/auth"

export default {
  data() {
    return {
      email: "",
      loading: false,
      error: null,
      success: null
    }
  },
  methods: {
    async handleForgot() {
      this.loading = true
      this.error = null
      try {
        const response = await api.post("/forgot-password", { email: this.email })
        setTimeout(() => {
          this.$router.push("/reset-link-success")
        }, 1500)
      } catch (err) {
        this.error = err.response?.data?.error || "Erro ao enviar link"
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
