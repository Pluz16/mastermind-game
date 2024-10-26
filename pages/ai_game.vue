<template>
    <div class="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-50 to-green-50 p-6">
      <h1 class="text-4xl font-extrabold mb-8 text-gray-800">Mastermind - Modalità IA</h1>
  
      <!-- Pulsante per mostrare il regolamento -->
      <button @click="toggleInfo" class="px-6 py-3 mb-6 text-lg bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 hover:scale-105">
        Mostra Regolamento
      </button>
  
      <!-- Scheda Info -->
      <InfoCard :showInfo="showInfo" @close="toggleInfo" />
  
      <!-- Selettore dei Colori -->
      <ColorSelector :colors="availableColors" @colorSelected="selectColor" />
  
      <!-- Visualizzazione del Tentativo Corrente -->
      <div v-if="currentAttempt.length > 0" class="flex gap-2 mt-6">
        <div
          v-for="(color, index) in currentAttempt"
          :key="index"
          :class="['w-8 h-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105', color]"
        ></div>
      </div>
  
      <!-- Pulsanti per Confermare o Resettare il Tentativo -->
      <div class="flex gap-4 mt-4">
        <button v-if="currentAttempt.length === 4" @click="submitTurn" class="btn-action bg-green-500 text-white">
          Conferma Tentativo
        </button>
        <button v-if="currentAttempt.length > 0" @click="resetAttempt" class="btn-action bg-yellow-500 text-white">
          Reset Tentativo
        </button>
      </div>
  
      <!-- Messaggio di Vittoria o Tentativi Rimanenti -->
      <p v-if="isGameOver" class="text-3xl font-bold text-green-600 mt-8 animate-bounce">Complimenti! Hai Vinto!</p>
      <p v-else class="text-md text-gray-700 mt-2">Tentativi rimanenti: {{ remainingAttempts }}</p>
  
      <!-- Componente Campo di Gioco (GameBoard) -->
      <GameBoard :attempts="attempts" :maxAttempts="maxAttempts" />
  
      <!-- Bottoni per Tornare alla Home e Ricominciare -->
      <div class="flex gap-4 mt-10">
        <button @click="restartGame" class="btn-large bg-red-500 text-white">Ricomincia</button>
        <NuxtLink to="/" class="btn-large bg-gray-700 text-white">Torna alla Home</NuxtLink>
      </div>
  
      <p v-if="errorMessage" class="text-red-600 font-semibold mt-4">{{ errorMessage }}</p>
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
    const availableColors = ref([
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
    ]);
    const currentAttempt = ref<string[]>([]);
    const attempts = reactive<Array<{ colors: string[]; feedback: string[] }>>(
      []
    );
    const secretCode = ref<string[]>(generateSecretCode());
    const isGameOver = ref(false);
    const errorMessage = ref<string | null>(null);
    const showInfo = ref(false);
    const feedback = generateFeedback(secretCode.value, currentAttempt.value);


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
        const feedback = generateFeedback(secretCode.value, currentAttempt.value);
      attempts.push({ colors: [...currentAttempt.value], feedback });
      remainingAttempts.value--;

      if (feedback.filter((f) => f === "correct").length === 4) {
        isGameOver.value = true;
        errorMessage.value = "Complimenti! Hai indovinato la sequenza!";
      } else if (remainingAttempts.value <= 0) {
        errorMessage.value = "Tentativi esauriti! L'IA ha vinto!";
        isGameOver.value = true;
      } else {
        currentAttempt.value = [];
      }
    }

    function generateFeedback(secretCode: string[], userAttempt: string[]): string[] {
  const feedback: string[] = Array(4).fill(''); // Array di stringhe inizializzato con stringhe vuote
  const tempSecret = [...secretCode]; // Copia della sequenza segreta per tracciare i colori già usati

  // Step 1: Colori corretti nella posizione corretta
  for (let i = 0; i < userAttempt.length; i++) {
    if (userAttempt[i] === tempSecret[i]) {
      feedback[i] = 'correct';
      tempSecret[i] = ''; // Segna il colore come già usato
    }
  }

  // Step 2: Colori corretti ma posizionati male
  for (let i = 0; i < userAttempt.length; i++) {
    if (feedback[i] === '' && tempSecret.includes(userAttempt[i])) {
      feedback[i] = 'misplaced';
      tempSecret[tempSecret.indexOf(userAttempt[i])] = ''; // Segna il colore come già usato
    }
  }

  return feedback;
}


// Funzione di feedback per il turno dell'IA
const aiProvideFeedback = (userAttempt: string[]) => {
  const feedback = generateFeedback(secretCode.value, userAttempt);
  attempts.push({ colors: [...userAttempt], feedback });
};

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
      generateFeedback
    };
  },
});
</script>

<style scoped lang="postcss">
.btn-action {
  @apply px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
}

.btn-large {
  @apply px-6 py-2 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
}
</style>

