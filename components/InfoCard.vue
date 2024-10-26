<template>
    <transition name="fade">
      <div v-if="showInfo" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Regolamento del Gioco</h2>
          <p class="text-gray-700 mb-2">
            Scopo del gioco: Indovina la sequenza segreta di colori entro il numero di tentativi disponibili.
          </p>
          <ul class="list-disc list-inside text-gray-600 mb-4">
            <li>Seleziona una sequenza di 4 colori.</li>
            <li>Ricevi un feedback per ogni tentativo:</li>
            <ul class="list-disc list-inside pl-4">
              <li>Pallino bianco per colore giusto nella posizione corretta.</li>
              <li>Pallino grigio per colore giusto ma nella posizione sbagliata.</li>
            </ul>
          </ul>
          <p class="text-gray-700">Usa il pulsante di "Reset Tentativo" se vuoi cambiare la sequenza corrente.</p>
          <button @click="$emit('close')" class="btn mt-4 bg-red-500 text-white w-full">Chiudi</button>
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
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  