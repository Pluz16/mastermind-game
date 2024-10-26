<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Mastermind - Modalità IA</h1>
  
      <!-- Messaggio di Turno -->
      <p class="text-lg text-gray-700">
        Tenta di indovinare la sequenza segreta generata dall'IA!
      </p>

      
  
      <!-- Selettore dei Colori -->
      <ColorSelector :colors="availableColors" @colorSelected="selectColor" />
  
      <!-- Visualizzazione del Tentativo Corrente -->
      <div v-if="currentAttempt.length > 0" class="flex gap-2 mt-4">
        <div
          v-for="(color, index) in currentAttempt"
          :key="index"
          :class="['w-8 h-8 rounded-full', color]"
        ></div>
      </div>
  
      <!-- Pulsanti per Confermare o Resettare il Tentativo -->
      <div class="flex gap-4 mt-4">
        <button v-if="currentAttempt.length === 4" @click="submitTurn" class="btn-action">
          Conferma Tentativo
        </button>
        <button v-if="currentAttempt.length > 0" @click="resetAttempt" class="btn-action bg-yellow-500 hover:bg-yellow-600">
          Reset Tentativo
        </button>
      </div>
  
      <!-- Messaggio di Vittoria o Tentativi Rimanenti -->
      <p v-if="isGameOver" class="text-xl font-bold text-green-500 mt-4">Complimenti! Hai vinto!</p>
      <p v-else class="text-md text-gray-700 mt-2">Tentativi rimanenti: {{ remainingAttempts }}</p>
  
      <!-- Componente Campo di Gioco (GameBoard) -->
      <GameBoard :attempts="attempts" :maxAttempts="maxAttempts" />
  
      <!-- Bottoni per Tornare alla Home e Ricominciare -->
      <div class="flex gap-4 mt-6">
        <button @click="restartGame" class="btn-large bg-red-600 text-white">Ricomincia</button>
        <NuxtLink to="/" class="btn-large bg-gray-600 text-white">Torna alla Home</NuxtLink> <!-- Pulsante per mostrare il regolamento -->
    <button @click="toggleInfo" class="btn-action bg-blue-500 text-white">Mostra Regolamento</button>
      </div>

      <InfoCard :showInfo="showInfo" @close="toggleInfo" />


      <p v-if="errorMessage" class="text-red-500 font-semibold mt-4">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import ColorSelector from "../components/ColorSelector.vue";
  import GameBoard from "../components/GameBoard.vue";
  import InfoCard from "../components/InfoCard.vue";
  
  export default defineComponent({
    name: "AIGamePage",
    components: { ColorSelector, GameBoard, InfoCard },
    setup() {
      const maxAttempts = ref(15);
      const remainingAttempts = ref(15);
      const availableColors = ref(["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]);
      const currentAttempt = ref<string[]>([]);
      const attempts = reactive<Array<{ colors: string[]; feedback: string[] }>>([]);
      const secretCode = ref<string[]>(generateSecretCode());
      const isGameOver = ref(false);
      const errorMessage = ref<string | null>(null);
        const showInfo = ref(false);
  
      // Funzione per generare casualmente il codice segreto dell'IA
      function generateSecretCode() {
        const colors = availableColors.value;
        const code = [];
        for (let i = 0; i < 4; i++) {
          code.push(colors[Math.floor(Math.random() * colors.length)]);
        }
        return code;
      }

      const toggleInfo = () => {
      showInfo.value = !showInfo.value;
    };
  
      const selectColor = (color: string) => {
        if (currentAttempt.value.length < 4) {
          currentAttempt.value.push(color);
          errorMessage.value = null;
        } else {
          errorMessage.value = "Hai già selezionato 4 colori!";
        }
      };
  
      const submitTurn = () => {
        if (currentAttempt.value.length === 4) {
          checkAttempt();
        } else {
          errorMessage.value = "Devi selezionare esattamente 4 colori!";
        }
      };

      
  
      const resetAttempt = () => {
        currentAttempt.value = [];
        errorMessage.value = null;
      };
  
      function checkAttempt() {
        const feedback = generateFeedback();
        attempts.push({ colors: [...currentAttempt.value], feedback });
        remainingAttempts.value--;
  
        if (feedback.filter(f => f === "correct").length === 4) {
          isGameOver.value = true;
          errorMessage.value = "Complimenti! Hai indovinato la sequenza!";
        } else if (remainingAttempts.value <= 0) {
          errorMessage.value = "Tentativi esauriti! L'IA ha vinto!";
          isGameOver.value = true;
        } else {
          currentAttempt.value = [];
        }
      }
  
      function generateFeedback() {
        const feedback = [];
        const codeCheck = Array(4).fill(false);
        const attemptCheck = Array(4).fill(false);
  
        // Prima passata: verifica colori e posizioni corrette
        for (let i = 0; i < 4; i++) {
          if (currentAttempt.value[i] === secretCode.value[i]) {
            feedback.push("correct");
            codeCheck[i] = true;
            attemptCheck[i] = true;
          }
        }
  
        // Seconda passata: verifica colori corretti in posizioni sbagliate
        for (let i = 0; i < 4; i++) {
          if (!attemptCheck[i]) {
            for (let j = 0; j < 4; j++) {
              if (!codeCheck[j] && currentAttempt.value[i] === secretCode.value[j]) {
                feedback.push("misplaced");
                codeCheck[j] = true;
                break;
              }
            }
          }
        }
  
        // Riempie feedback con "none" per nessun colore corretto
        while (feedback.length < 4) {
          feedback.push("none");
        }
  
        return feedback;
      }
  
      const restartGame = () => {
        remainingAttempts.value = maxAttempts.value;
        attempts.splice(0, attempts.length);
        currentAttempt.value = [];
        secretCode.value = generateSecretCode();
        isGameOver.value = false;
        errorMessage.value = null;
      };
  
      return {
        maxAttempts,
        remainingAttempts,
        availableColors,
        currentAttempt,
        attempts,
        secretCode,
        isGameOver,
        errorMessage,
        selectColor,
        submitTurn,
        resetAttempt,
        restartGame,
        showInfo,
        toggleInfo,
      };
    },
  });
  </script>
  
  <style scoped>
  .btn-action {
    @apply px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-large {
    @apply px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  </style>
  