<template>
    <div class="mt-8 w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Tentativi Passati</h2>
      <div v-for="(attempt, index) in attempts" :key="index" class="flex items-center justify-between mb-4">
        
        <!-- Colori del Tentativo -->
        <div class="flex gap-2">
          <div 
            v-for="(color, i) in attempt.colors" 
            :key="i" 
            :class="['w-8 h-8 rounded-full', color, 'shadow']"
          ></div>
        </div>
        
        <!-- Feedback (Pallini Bianchi e Grigi) -->
        <div class="flex gap-1">
  <div
    v-for="(feedback, i) in attempt.feedback"
    :key="i"
    :class="feedback === 'correct' ? 'bg-white border-black' : feedback === 'misplaced' ? 'bg-gray-500' : ''"
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
  /* Ombreggiatura per i pallini colorati */
  .shadow {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  