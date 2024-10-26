<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold">Game of minds</h1>
    <NuxtLink to="/multiplayer" class="btn mt-4">Multiplayer</NuxtLink>
    <NuxtLink to="/ai_game" class="btn mt-4">Gioca contro l'IA</NuxtLink>
  </div>
</template>

<script lang="ts">
export default {
  name: 'IndexPage',
};
</script>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
}
</style>
