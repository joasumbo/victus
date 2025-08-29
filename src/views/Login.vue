<template>
  <div class="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#f9f3f2] via-[#fdfdfd] to-white">

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
          <span class="font-semibold">Credenciais inválidas</span>
          <button @click="showError = false" class="ml-4 font-bold">×</button>
        </div>
      </div>
    </transition>

    <!-- HEADER -->
    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <button @click="$router.back()" class="text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 class="flex-1 text-center text-lg font-semibold">Entra na tua conta</h2>
      </div>
    </header>

    <!-- CONTEÚDO -->
    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-sm sm:max-w-md px-6">

        <!-- Formulário -->
        <form @submit.prevent="handleLogin" class="space-y-5 mt-6">

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
                <!-- Ícone olho -->
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
                       9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-red-500 mt-1">{{ errors.password[0] }}</p>
          </div>

          <!-- Botão -->
          <button type="submit" :disabled="loading"
            class="w-full bg-[#e8bdb8] text-white py-3 rounded-lg font-medium cursor-pointer disabled:opacity-50">
            {{ loading ? "Aguarde..." : "Entrar" }}
          </button>

          <!-- Links -->
          <p class="text-center text-sm text-gray-500">
            Esqueceste-te da palavra-passe?
            <router-link to="/forgot-password" class="text-pink-500 font-medium">Recuperar</router-link>
          </p>

          <p class="text-center text-sm text-gray-500">
            Não tem uma conta?
            <router-link to="/register" class="text-pink-500 font-medium">
              Criar agora
            </router-link>
          </p>
        </form>
      </div>
    </main>

    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue"
import api from "@/services/auth"

export default {
  name: 'Login',
  components: { Footer },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errors: {},
      loading: false,
      showError: false,
      successMessage: "",
      showSuccess: false,
    }
  },
  mounted() {
    if (this.$route.query.success) {
      this.successMessage = this.$route.query.success
      this.showSuccess = true
      this.$router.replace({ path: this.$route.path })
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errors = {}
      this.showError = false

      try {
        const response = await api.post("/login", this.form)

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        this.$router.push("/dashboard")

      } catch (error) {
        if (error.response?.status === 422) {
          this.errors = error.response.data.errors
        } else if (error.response?.status === 401) {
          this.showError = true
        } else {
          this.showError = true
        }
      } finally {
        this.loading = false
      }
    }
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