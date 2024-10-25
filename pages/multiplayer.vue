<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 class="text-3xl font-bold">Modalità Multiplayer</h1>
      <p class="mt-2 text-lg">Sfida un amico!</p>
      <NuxtLink to="/" class="btn mt-4">Torna alla Home</NuxtLink>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'MultiplayerPage',
  };
  </script>
  
  <style scoped>
  .btn {
    @apply px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600;
  }
  </style>
  