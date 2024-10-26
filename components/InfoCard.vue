<template>
    <transition name="fade">
      <div v-if="showInfo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl transform transition duration-300 scale-100 hover:scale-105">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Regolamento del Gioco</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">
            Indovina la sequenza segreta di colori entro il numero di tentativi disponibili.
          </p>
          <ul class="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>Seleziona una sequenza di 4 colori.</li>
            <li>Ricevi un feedback per ogni tentativo:</li>
            <ul class="list-disc list-inside pl-4 space-y-1">
              <li><span class="text-green-500 font-semibold">Pallino bianco</span> per colore giusto nella posizione corretta.</li>
              <li><span class="text-yellow-500 font-semibold">Pallino grigio</span> per colore giusto nella posizione sbagliata.</li>
            </ul>
          </ul>
          <button @click="$emit('close')" class="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200">
            Chiudi
          </button>
        </div>
      </div>
    </transition>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "InfoCard",
    props: {
      showInfo: {
        type: Boolean,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  