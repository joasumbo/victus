<script setup>
import { onMounted } from "vue"

import { UsersIcon, BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'


onMounted(() => {
  //(window.Swiper)
  new window.Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
</script>


<template>
  <div class="min-h-screen flex flex-col bg-white">

    <!-- CONTEÚDO -->
    <main class="flex-1 px-4 py-6 mx-auto w-full space-y-4 pb-20">


      <!-- Header -->
      <div class="flex items-center justify-between">
        <h1 class="text-lg font-semibold">Olá, {{ user?.name || '' }}</h1>

        <div class="flex items-center space-x-4 text-gray-700">
          <!-- Grupo/Users -->
          <UsersIcon class="w-6 h-6" />

          <!-- Sino -->
          <BellIcon class="w-6 h-6" />

          <!-- Chat/Mensagens -->
          <ChatBubbleLeftRightIcon class="w-6 h-6" />
        </div>
      </div>

      <!-- Slider de boas-vindas -->
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">

          <!-- Slide 1 -->
          <div
            class="swiper-slide rounded-2xl shadow p-4 flex items-center justify-between bg-gradient-to-r from-[#f9eeec]/60 to-[#f9eeec]/60 backdrop-blur-md">

            <div class="flex-1">
              <h2 class="font-semibold text-lg md:text-2xl lg:text-3xl">
                Bem-vinda à minha App!
              </h2>
              <p class="text-sm md:text-base lg:text-lg text-gray-700">
                Clica aqui para iniciares a tua jornada
              </p>
              <br>
              <button
                class="mt-4 text-xs md:text-sm lg:text-base bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded-lg">
                Começa aqui
              </button>
            </div>

            <img src="/public/img/hero.png" alt="Mulher feliz"
              class="h-full max-w-[20%] object-cover self-end rounded-r-2xl">
          </div>

          <!-- Slide 2 -->
          <div
            class="swiper-slide rounded-2xl shadow p-4 flex items-center justify-between bg-gradient-to-r from-[#f9eeec]/60 to-[#f9eeec]/60 backdrop-blur-md">

            <div class="flex-1">
              <h2 class="font-semibold text-lg md:text-2xl lg:text-3xl">
                Descobre os teus objetivos!
              </h2>
              <p class="text-sm md:text-base lg:text-lg text-gray-700">
                Vê o que já conquistaste até agora
              </p>
              <br>
              <button
                class="mt-2 text-xs md:text-sm lg:text-base bg-black text-white px-3 py-1 md:px-4 md:py-2 rounded-lg">
                Explorar
              </button>
            </div>

            <img src="/public/img/hero.png" alt="Mulher feliz"
              class="h-full max-w-[20%] object-cover self-end rounded-r-2xl">
          </div>

        </div>
      </div>
      <!-- Grid geral -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-6xl mx-auto">

        <!-- Card lembrete -->
        <div class="bg-gradient-to-r from-[#e0bfbb] to-[#edd8d3] rounded-2xl shadow p-4 text-center 
        py-6 md:py-10 md:col-span-1">
          <h3 class="font-bold text-base md:text-xl">LEMBRETE DO DIA:</h3>
          <p class="text-black mt-2 text-sm md:text-lg">
            É importante agradecer pelo hoje,<br>
            sem nunca desistir do amanhã!
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4 md:col-span-2">

          <!-- Peso perdido -->
          <div class="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center 
             bg-gradient-to-r from-[#f9eeec]/60 to-[#f9eeec]/60 backdrop-blur-md">
            <div
              class="w-20 h-20 md:w-28 md:h-28 rounded-full border-8 border-gray-200 flex items-center justify-center relative">
              <div class="rounded-full px-2 py-1 text-center">
                <span class="text-xs md:text-sm font-semibold">2kg<br>perdidos</span>
              </div>
              <div
                class="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border-[8px] border-transparent border-t-yellow-600 border-l-yellow-600">
              </div>
            </div>
          </div>

          <!-- Eventos -->
          <div class="rounded-2xl shadow p-4 bg-gradient-to-r from-[#efdeda] to-[#efdeda]">
            <h4 class="font-semibold text-sm md:text-lg mb-3">Próximos eventos:</h4>
            <div class="space-y-2 text-xs md:text-sm">
              <div class="flex items-center gap-3 bg-white px-3 py-2 rounded-lg">
                <div class="font-bold rounded-lg">23/05</div>
                <span class="text-gray-700">Masterclass</span>
              </div>
              <div class="flex items-center gap-3 bg-white px-3 py-2 rounded-lg">
                <div class="font-bold rounded-lg">23/05</div>
                <span class="text-gray-700">Masterclass</span>
              </div>
              <div class="flex items-center gap-3 bg-white px-3 py-1 rounded-lg">
                <div class="font-medium text-right">+ 1 evento</div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </main>
    <br><br>
    <br><br>
    <!-- MENU FIXO -->
    <Navigation />

  </div>
</template>


<script>
import Navigation from "@/components/Navigation.vue";
import { getUser } from "@/services/auth"

export default {
  name: 'Dashboard',
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
