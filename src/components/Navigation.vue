<script setup>
import { ref } from "vue";
import { HomeIcon, PlusIcon, BookOpenIcon, UserIcon } from '@heroicons/vue/24/outline';

</script>

<template>
  <nav
    class="w-full py-2 mx-auto border-t border-gray-200 bg-white h-16 fixed bottom-0 left-0 right-0 flex justify-around text-gray-500"
    style="z-index: 9999 !important;">

    <!-- Home -->
    <div class="flex flex-col items-center text-pink-600">
      <router-link to="/dashboard" class="text-gray-500">
        <center>
          <HomeIcon class="w-6 h-6" />
          <span class="text-xs">Home</span>
        </center>
      </router-link>
    </div>

    <!-- Plano -->
    <div class="flex flex-col items-center">
      <router-link to="/events/show">
        <center>
          <BookOpenIcon class="w-6 h-6" />
          <span class="text-xs">Plano</span>
        </center>
      </router-link>
    </div>

    <!-- Botão + -->
    <div class="flex flex-col items-center -mt-6">
      <router-link :to="{ name: 'weight-create' }" class="text-gray-500">
        <center>
          <div class="cursor-pointer bg-text-primary rounded-full p-3 shadow-lg"
            style="padding: 0.8rem 0.9rem !important;">
            <PlusIcon class="w-6 h-6 text-white" />
          </div>
        </center>
      </router-link>
    </div>

    <!-- Biblioteca -->
    <div class="flex flex-col items-center">
      <router-link to="/libraries" class="text-gray-500">
        <center>
          <BookOpenIcon class="w-6 h-6" />
          <span class="text-xs">Biblioteca</span>
        </center>
      </router-link>
    </div>

    <!-- Perfil -->
    <div class="flex flex-col items-center">
      <router-link to="/profile" class="text-gray-500">
        <center>
          <UserIcon class="w-6 h-6" />
          <span class="text-xs">Perfil</span>
        </center>
      </router-link>
    </div>
  </nav>

</template>