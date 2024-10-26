<template>
    <div class="mt-4">
      <h2 class="text-2xl font-bold mb-2">Tentativi Passati</h2>
      <div v-for="(attempt, index) in attempts" :key="index" class="flex items-center gap-4 mb-2">
        <!-- Colori del Tentativo -->
        <div class="flex gap-1">
          <div v-for="(color, i) in attempt.colors" :key="i" :class="`w-8 h-8 rounded-full ${color}`"></div>
        </div>
        <!-- Feedback (Pallini Bianchi e Grigi) -->
        <div class="flex gap-1">
          <div
            v-for="(feedback, i) in attempt.feedback"
            :key="i"
            :class="feedback === 'correct' ? 'bg-white border-black' : 'bg-gray-500'"
            class="w-4 h-4 rounded-full border"
          ></div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'GameBoard',
    props: {
      attempts: {
        type: Array as () => Array<{ colors: string[]; feedback: string[] }>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  /* Aggiungi stili specifici per la GameBoard se necessario */
  </style>
  