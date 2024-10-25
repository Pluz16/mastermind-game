<!-- /pages/index.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold">Mastermind</h1>
    <button @click="$router.push('/multiplayer')" class="btn mt-4">Multiplayer</button>
    <button @click="$router.push('/ai_game')" class="btn mt-4">Gioca contro l'IA</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',
});
</script>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
}
</style>
