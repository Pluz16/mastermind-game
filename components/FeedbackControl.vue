<template>
    <div class="flex flex-col items-center gap-4 mt-6 p-4 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <p class="text-xl font-semibold text-gray-800">Seleziona il Feedback per il Tentativo Corrente</p>
      
      <div class="flex gap-3">
        <button 
          @click="$emit('feedback', 'correct')" 
          class="btn-feedback bg-green-600 hover:bg-green-700"
        >
          Corretti
        </button>
        <button 
          @click="$emit('feedback', 'misplaced')" 
          class="btn-feedback bg-yellow-600 hover:bg-yellow-700"
        >
          Posizione Sbagliata
        </button>
        <button 
          @click="$emit('feedback', 'none')" 
          class="btn-feedback bg-gray-500 hover:bg-gray-600"
        >
          Nessun Colore Corretto
        </button>
      </div>
  
      <div class="flex gap-3 mt-4">
        <button 
          @click="$emit('confirmFeedback')" 
          class="btn-action bg-blue-600 hover:bg-blue-700"
        >
          Conferma Feedback
        </button>
        <button 
          @click="$emit('resetFeedback')" 
          class="btn-action bg-red-600 hover:bg-red-700"
        >
          Reset Feedback
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "FeedbackControl",
  });
  </script>
  
  <style scoped>
  .btn-feedback {
    @apply px-4 py-2 text-white font-medium text-lg rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300;
  }
  
  .btn-action {
    @apply px-6 py-2 w-full text-white font-semibold text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400;
  }
  </style>
  