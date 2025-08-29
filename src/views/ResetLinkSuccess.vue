<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#f9f3f2] to-white px-6">

    <header class="w-full flex justify-center px-6 py-4 border-b border-gray-100">
      <div class="w-full max-w-sm sm:max-w-md flex items-center">
        <h2 class="flex-1 text-center text-lg font-semibold">Recuperar palavra-passe</h2>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center text-center">
      <!-- Ícone animado de sucesso -->
      <div class="w-20 h-20 mb-6">
        <svg class="w-full h-full animate-bounce" viewBox="0 0 24 24" fill="none" stroke="#22c55e"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" stroke="#22c55e" />
          <path d="M9 12l2 2l4-4" />
        </svg>
      </div>

      <h1 class="text-2xl font-semibold text-gray-800 mb-2">Link enviado com sucesso!</h1>
      <p class="text-gray-600 mb-6 max-w-sm">
        Enviamos um e-mail com instruções para redefinir a tua palavra-passe.
        Verifique a sua caixa de entrada ou a pasta de spam.
      </p>

      <router-link
        to="/login"
        class="bg-[#e8bdb8] text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#e2aaa4] transition"
      >
        Voltar ao login
      </router-link>
    </main>

  </div>
</template>

<script>
export default {
  name: "ResetLinkSuccess"
}
</script>

<style scoped>
/* Animação mais suave para o SVG */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>
