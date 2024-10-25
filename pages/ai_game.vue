<!-- /pages/ai_game.vue -->
<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-3xl font-bold">Modalità Gioca contro l'IA</h1>
      <p class="mt-2 text-lg">Sfida l'intelligenza artificiale!</p>
      <button @click="$router.push('/')" class="btn mt-4">Torna alla Home</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'AiGamePage',
  });
  </script>
  
  <style scoped>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
  }
  </style>
  