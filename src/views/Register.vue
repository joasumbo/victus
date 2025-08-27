<template>
  <div class="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white">

    <!-- HEADER -->
    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <button @click="$router.back()" class="text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="flex-1 text-center text-lg font-semibold">Criar conta</h2>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-sm sm:max-w-md px-6">

        <!-- Formulário -->
        <form @submit.prevent="handleRegister" class="space-y-5 mt-6">

          <!-- Nome -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Nome</label>
            <input v-model="form.name" type="text" placeholder="Seu nome"
              class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
            <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name[0] }}</p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" placeholder="exemploemail@gmail.com"
              class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
            <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email[0] }}</p>
          </div>

          <!-- Palavra-passe -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Palavra-passe</label>
            <div class="relative">
              <input v-model="form.password" type="password" placeholder="Inserir palavra-passe"
                class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
              <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
                       9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password[0] }}</p>
          </div>

          <!-- Confirmar Palavra-passe -->
          <div>
            <label class="block text-sm text-gray-700 mb-1">Confirmar palavra-passe</label>
            <input v-model="form.password_confirmation" type="password" placeholder="Confirmar palavra-passe"
              class="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300" />
          </div>

          <!-- Botão -->
          <button type="submit" :disabled="loading"
            class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
            {{ loading ? 'Aguarde...' : 'Criar conta' }}
          </button>

          <!-- Links -->
          <p class="text-center text-sm text-gray-500">
            Já tem uma conta?
            <router-link to="/login" class="text-pink-500 font-medium">
              Iniciar sessão
            </router-link>
          </p>
        </form>
      </div>
    </main>

    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import api from "@/services/auth"

export default {
  name: 'Register',
  components: { Footer },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {},
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.errors = {}

      try {
        const response = await api.post("/register", this.form)

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        this.$router.push({
          path: "/login",
          query: { success: "Conta criada com sucesso! Faça login." }
        })

      } catch (error) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.messages
        } else {
          alert(error.response?.data?.message || "Erro no registro")
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
