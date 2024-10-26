<template>
    <div class="flex flex-col items-center gap-4 mt-4">
      <p class="text-lg font-semibold">Seleziona il feedback per il tentativo corrente</p>
      <div class="flex gap-2">
        <button @click="$emit('feedback', 'correct')" class="feedback-btn bg-green-600 hover:bg-green-700">
          Corretti
        </button>
        <button @click="$emit('feedback', 'misplaced')" class="feedback-btn bg-yellow-600 hover:bg-yellow-700">
          Posizione Sbagliata
        </button>
      </div>
      <button @click="$emit('confirmFeedback')" class="action-btn bg-blue-500 hover:bg-blue-600 mt-2">
        Conferma Feedback
      </button>
      <button @click="$emit('resetFeedback')" class="action-btn bg-red-500 hover:bg-red-600 mt-2">
        Reset Feedback
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "FeedbackControl",
  });
  </script>
  
  <style scoped>
  .feedback-btn {
    @apply px-4 py-2 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:scale-105;
  }
  
  .action-btn {
    @apply px-5 py-2 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:scale-105;
  }
  </style>
  