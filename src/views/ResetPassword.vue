<template>
  <div class="min-h-screen flex flex-col justify-center bg-gradient-to-b from-[#f9f3f2] to-white px-6">
    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <h2 class="flex-1 text-center text-lg font-semibold">Recuperar palavra-passe</h2>
      </div>
    </header>

    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-sm sm:max-w-md px-6">
        <form @submit.prevent="handleReset" class="space-y-5">
          <input type="hidden" v-model="token" />
          <input type="hidden" v-model="email" />

          <div>
            <label class="block text-sm text-gray-700 mb-1">Nova palavra-passe</label>
            <input v-model="password" type="password"
              class="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <div>
            <label class="block text-sm text-gray-700 mb-1">Confirmar palavra-passe</label>
            <input v-model="password_confirmation" type="password"
              class="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium disabled:opacity-50">
            {{ loading ? "Aguarde..." : "Redefinir" }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          <router-link to="/login" class="text-pink-500">Voltar ao login</router-link>
        </p>

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
      email: this.$route.query.email ?? "",
      token: this.$route.query.token ?? "",
      password: "",
      password_confirmation: "",
      loading: false,
      success: null
    }
  },
  methods: {
    async handleReset() {
      this.loading = true
      try {
        console.log({
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        const response = await api.post("/reset-password", {
          email: this.email,
          token: this.token,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        this.success = response.data.message
        setTimeout(() => this.$router.push("/login"), 2000)
      } catch (err) {
        alert(err.response?.data?.error || "Erro ao redefinir senha")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
