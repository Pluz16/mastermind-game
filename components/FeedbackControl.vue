<template>
    <div class="flex flex-col items-center gap-2 mt-4">
      <p class="text-lg font-semibold">Seleziona il feedback per il tentativo corrente</p>
      
      <div class="flex gap-2">
        <button @click="$emit('feedback', 'correct')" class="btn bg-green-600">Corretti</button>
        <button @click="$emit('feedback', 'misplaced')" class="btn bg-yellow-600">Posizione Sbagliata</button>
        <button @click="$emit('feedback', 'none')" class="btn bg-gray-500">Nessun Colore Corretto</button>
      </div>
      <button @click="$emit('confirmFeedback')" class="btn bg-blue-500 mt-2">Conferma Feedback</button>
      <button @click="$emit('resetFeedback')" class="btn bg-red-500 mt-2">Reset Feedback</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "FeedbackControl",
  });
  </script>
  