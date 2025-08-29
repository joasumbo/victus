<script setup>
import { ref, onMounted } from "vue"
import api from "@/api"
import { getUser } from "@/services/auth"
import { UsersIcon, BellIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'

const user = ref(null)
const lastPeso = ref(null)
const prevPeso = ref(null)
const pesoDiff = ref(0)
const borderColor = ref("border-gray-200")
const showError = ref(false)
const errorMessage = ref("")
const events = ref([])
const totalEvents = ref(0)
const lastFrase = ref(null)
const loading = ref(true)
const banners = ref([])

onMounted(async () => {
  try {
    // buscar user
    const responseUser = await getUser()
    user.value = responseUser

    // buscar pesos
    const response = await api.get("/pesos")
    const pesos = response.data

    if (pesos.length > 0) {
      lastPeso.value = pesos[0]
      prevPeso.value = pesos[1] || null

      if (prevPeso.value) {
        pesoDiff.value = lastPeso.value.kg - prevPeso.value.kg

        if (pesoDiff.value < 0) {
          borderColor.value = "border-green-500"
        } else if (pesoDiff.value > 0) {
          borderColor.value = "border-red-500"
        } else {
          borderColor.value = "border-gray-400"
        }
      }
    }
  } catch (err) {
    console.error("Erro ao carregar dados", err)
  }
})

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const fetchBanners = async () => {
  loading.value = true
  showError.value = false
  try {
    const response = await api.get("/banners")
    banners.value = response.data
  } catch (err) {
    showError.value = true
    errorMessage.value = err.response?.data?.error || "Erro ao carregar banners"
  } finally {
    loading.value = false
  }
}

const fetchUpcomingEvents = async () => {
  loading.value = true
  try {
    const response = await api.get("/eventos/upcoming")
    events.value = response.data.eventos
    totalEvents.value = response.data.total
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchLastFrase = async () => {
  loading.value = true
  showError.value = false
  try {
    const response = await api.get("/frases/last")
    lastFrase.value = response.data
  } catch (err) {
    showError.value = true
    errorMessage.value = err.response?.data?.error || "Erro ao carregar a frase"
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLastFrase()
  fetchUpcomingEvents()
  fetchBanners()

  new window.Swiper(".mySwiper", {
    loop: banners.value.length > 1,
    autoplay: banners.value.length > 1 ? {
      delay: 3000,
      disableOnInteraction: false,
    } : false,
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
        <h1 class="text-lg font-semibold">
          <template v-if="user">
            Olá, {{ user.name }}
          </template>
          <template v-else>
            <!-- Skeleton -->
            <span class="inline-block h-5 w-32 bg-gray-200 rounded animate-pulse"></span>
          </template>
        </h1>

        <div class="flex items-center space-x-4 text-gray-700">
          <!-- Grupo/Users -->
          <UsersIcon class="w-6 h-6" />
          <!-- Sino -->
          <BellIcon class="w-6 h-6" />
          <router-link to="/phrases/show">
            <!-- Chat/Mensagens -->
            <ChatBubbleLeftRightIcon class="w-6 h-6" />
          </router-link>
        </div>
      </div>


      <!-- Slider de boas-vindas -->
      <div class="swiper mySwiper">
        <div class="swiper-wrapper">
          <!-- Skeleton Loader -->
          <template v-if="loading">
            <div v-for="n in 2" :key="n"
              class="swiper-slide rounded-2xl shadow p-4 flex items-center justify-between bg-gray-200 animate-pulse h-[200px]">
              <div class="flex-1 space-y-2 p-4">
                <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                <div class="h-6 w-24 bg-gray-300 rounded mt-2"></div>
              </div>
              <div class="w-1/2 h-full bg-gray-300 rounded-lg"></div>
            </div>
          </template>

          <!-- Banner Content -->
          <template v-else-if="banners.length > 0">
            <div v-for="banner in banners" :key="banner.id" class="swiper-slide rounded-2xl shadow p-4 flex items-center justify-between 
           bg-gradient-to-r from-[#f9eeec]/60 to-[#f9eeec]/60 backdrop-blur-md 
           h-[200px] md:h-[550px]">

              <!-- Text Content (Left Side sempre em linha com a imagem) -->
              <div class="flex-1 w-1/2 p-2">
                <h2 class="font-semibold text-sm md:text-xl lg:text-3xl break-words">
                  {{ banner.titulo }}
                </h2>
                <br>
                <a v-if="banner.link" :href="banner.link" target="_blank" class="inline-block mt-2 bg-black text-white px-4 py-1 rounded-lg 
               text-xs md:text-sm font-medium hover:bg-gray-800 transition">
                  Saiba Mais
                </a>
              </div>

              <!-- Image -->
              <img :src="banner.imagem ? `${STORAGE_URL}/${banner.imagem}` : '/public/img/hero.png'" alt="Banner"
                class="w-1/2 h-full object-cover rounded-lg">
            </div>
          </template>


          <!-- Fallback for No Banners -->
          <template v-else>
            <div class="swiper-slide rounded-2xl shadow p-4 flex items-center justify-center bg-gray-100 h-[200px]">
              <p class="text-gray-400 text-center text-sm md:text-base lg:text-lg">
                Nenhum banner encontrado.
              </p>
            </div>
          </template>
        </div>


        <!-- Pagination -->
        <div v-if="banners.length > 1" class="swiper-pagination"></div>

        <!-- Modal de erro -->
        <div v-if="showError" class="text-red-500 mt-2 text-center">
          {{ errorMessage }}
        </div>
      </div>
      <!-- Grid geral -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-6xl mx-auto">

        <!-- Card frase -->
        <router-link to="/phrases/show">
          <div>
            <!-- Skeleton loader -->
            <div v-if="loading"
              class="bg-gray-200 animate-pulse p-4 rounded-2xl md:py-10 py-6 md:py-10 md:col-span-1 flex items-center justify-center">
              <span class="text-gray-400"></span>
            </div>

            <!-- Última frase -->
            <div v-else
              class="bg-gradient-to-r from-[#e0bfbb] to-[#edd8d3] rounded-2xl shadow p-4 text-center py-6 md:py-10 md:col-span-1">
              <h3 class="font-bold text-base md:text-xl">LEMBRETE DO DIA:</h3>
              <p class="text-black mt-2 text-sm md:text-lg">
                {{ lastFrase?.frase || 'Nenhuma frase registrada ainda.' }}
              </p>
            </div>

            <!-- Erro -->
            <div v-if="showError" class="text-red-500 mt-2 text-center">
              {{ errorMessage }}
            </div>
          </div>
        </router-link>

        <div class="grid grid-cols-2 gap-4 md:col-span-2">

          <!-- Peso perdido -->
          <RouterLink to="/weight/show" class="bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center 
         bg-gradient-to-r from-[#f9eeec]/60 to-[#f9eeec]/60 backdrop-blur-md cursor-pointer">
            <!-- Se já carregou peso -->
            <template v-if="lastPeso">
              <div class="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center relative"
                :class="borderColor + ' border-[8px]'">
                <div class="text-center">
                  <span class="text-base md:text-lg font-bold">
                    {{ lastPeso.kg }} kg
                  </span>
                  <p class="text-xs text-gray-600">
                    {{ pesoDiff > 0 ? '+' + pesoDiff : pesoDiff }} kg
                  </p>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-700">
                Último registado em: {{ lastPeso.data }}
              </p>
            </template>

            <!-- Skeleton -->
            <template v-else>
              <div
                class="w-24 h-24 md:w-32 md:h-32 rounded-full border-8 border-gray-200 flex items-center justify-center animate-pulse">
                <div class="text-center">
                  <span class="inline-block h-5 w-12 bg-gray-200 rounded"></span>
                  <p class="mt-2 text-xs text-gray-400">--</p>
                </div>
              </div>
              <p class="mt-2 text-sm text-gray-400">
                <span class="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse"></span>
              </p>
            </template>
          </RouterLink>

          <!-- Eventos -->
          <router-link to="/events/show">
            <div class="rounded-2xl shadow p-4 bg-gradient-to-r from-[#efdeda] to-[#efdeda]">

              <!-- Skeleton loader -->
              <template v-if="loading">
                <div class="space-y-2 text-xs md:text-sm">
                  <div v-for="n in 2" :key="n"
                    class="flex items-center gap-3 bg-gray-200 animate-pulse rounded-lg px-3 py-2">
                    <div class="w-8 h-5 bg-gray-300 rounded"></div>
                    <div class="w-20 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </template>

              <!-- Nenhum evento encontrado -->
              <template v-else-if="!events || events.length === 0">
                <h4 class="font-semibold text-sm md:text-lg mb-3">Próximos eventos:</h4>
                <div class="flex items-center justify-center text-gray-500 bg-white px-3 py-4 rounded-lg">
                  Nenhum evento encontrado
                </div>
              </template>

              <!-- Eventos reais -->
              <template v-else>
                <h4 class="font-semibold text-sm md:text-lg mb-3">Próximos eventos:</h4>
                <div class="space-y-2 text-xs md:text-sm">
                  <div v-for="(evento, index) in events.slice(0, 2)" :key="evento.id"
                    class="flex items-center gap-3 bg-white px-3 py-2 rounded-lg">
                    <div class="font-bold rounded-lg">
                      {{ new Date(evento.data).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }) }}
                    </div>
                    <span class="text-gray-700">{{ evento.titulo }}</span>
                  </div>

                  <!-- Se tiver mais eventos -->
                  <div v-if="totalEvents > 2" class="flex items-center gap-3 bg-white px-3 py-1 rounded-lg">
                    <div class="font-medium text-right">
                      + {{ totalEvents - 2 }} evento{{ totalEvents - 2 > 1 ? 's' : '' }}
                    </div>
                  </div>
                </div>
              </template>

            </div>
          </router-link>

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
