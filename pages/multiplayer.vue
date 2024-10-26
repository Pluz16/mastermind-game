<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 class="text-3xl font-bold mb-6">Mastermind - Modalità Multiplayer</h1>
  
      <!-- Selezione Modalità -->
      <div v-if="turn === 'modeSelection'" class="flex gap-4 mt-4">
        <button @click="selectMode(5, 15)" class="btn-large bg-blue-600 text-white">
          Modalità 5 Colori - 15 Tentativi
        </button>
        <button @click="selectMode(8, 25)" class="btn-large bg-green-600 text-white">
          Modalità 8 Colori - 25 Tentativi
        </button>
      </div>
  
      <!-- Selettore dei Colori -->
      <ColorSelector v-if="turn === 'setup' || turn === 'guess'" :colors="availableColors" @colorSelected="selectColor" />
  
      <!-- Visualizzazione del Tentativo Corrente -->
      <div v-if="currentAttempt.length > 0" class="flex gap-2 mt-4">
        <div
          v-for="(color, index) in currentAttempt"
          :key="index"
          :class="['w-8 h-8 rounded-full', color]"
        ></div>
      </div>
  
      <!-- Pulsante per Confermare il Turno (mostrato durante setup o guess) -->
      <button v-if="turn !== 'feedback'" @click="submitTurn" class="btn mt-4">
        Conferma Turno
      </button>
  
      <!-- Visualizzazione del Codice Segreto (solo durante feedback) -->
      <SecretCodeDisplay :secretCode="secretCode" :showSecretCode="showSecretCode" />
  
      <!-- Controllo del Feedback -->
      <FeedbackControl v-if="turn === 'feedback'" @feedback="addFeedback" @confirmFeedback="confirmFeedback" @resetFeedback="resetFeedback" />
  
      <!-- Componente Campo di Gioco (GameBoard) -->
      <GameBoard :attempts="attempts" />
  
      <!-- Bottoni per Tornare alla Home e Ricominciare -->
      <div class="flex gap-4 mt-6">
        <button @click="restartGame" class="btn-large bg-red-600 text-white">Ricomincia</button>
        <NuxtLink to="/" class="btn-large bg-gray-600 text-white">Torna alla Home</NuxtLink>
      </div>
  
      <p v-if="errorMessage" class="text-red-500 font-semibold mt-4">{{ errorMessage }}</p>
    </div>
  </template>
  
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import GameBoard from "../components/GameBoard.vue";
  import ColorSelector from "../components/ColorSelector.vue";
  import SecretCodeDisplay from "../components/SecretCodeDisplay.vue";
  import FeedbackControl from "../components/FeedbackControl.vue";
  
  export default defineComponent({
    name: "MultiplayerPage",
    components: { GameBoard, ColorSelector, SecretCodeDisplay, FeedbackControl },
    setup() {
      const maxAttempts = ref(15);
      const attempts = reactive<Array<{ colors: string[]; feedback: string[] }>>([]);
      const availableColors = ref<string[]>(["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]);
      const secretCode = ref<string[]>([]);
      const currentAttempt = ref<string[]>([]);
      const turn = ref<"modeSelection" | "setup" | "guess" | "feedback">("modeSelection");
      const showSecretCode = ref(false);
      const errorMessage = ref<string | null>(null);
  
      // Funzioni per gestire il gioco
      const addFeedback = (feedbackType: string) => {
      const lastAttempt = attempts[attempts.length - 1];
      if (lastAttempt && lastAttempt.feedback.length < 4) {
        lastAttempt.feedback.push(feedbackType);
        errorMessage.value = null;
      } else {
        errorMessage.value = "Hai già fornito il feedback completo!";
      }
    };
  
    const confirmFeedback = () => {
      const lastAttempt = attempts[attempts.length - 1];
      if (lastAttempt && lastAttempt.feedback.length === 4) {
        turn.value = "guess";
        errorMessage.value = null;
      } else {
        errorMessage.value = "Devi fornire esattamente 4 feedback per confermare!";
      }
    };
  
      const resetFeedback = () => {
        const lastAttempt = attempts[attempts.length - 1];
        if (lastAttempt) lastAttempt.feedback = [];
      };

       // Funzione per selezionare il colore e aggiungerlo al tentativo corrente
    const selectColor = (color: string) => {
      if (currentAttempt.value.length < 4) {
        currentAttempt.value.push(color);
      } else {
        errorMessage.value = "Hai già selezionato 4 colori!";
      }
    };
  
      const restartGame = () => {
        attempts.splice(0, attempts.length);
        currentAttempt.value = [];
        secretCode.value = [];
        turn.value = "modeSelection";
        errorMessage.value = null;
      };

      // Funzione per iniziare la selezione del codice segreto
    const selectMode = (colorCount: number, attemptsAllowed: number) => {
      maxAttempts.value = attemptsAllowed;
      availableColors.value = colorCount === 5
        ? ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]
        : ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-orange-500", "bg-teal-500", "bg-pink-500"];
      turn.value = "setup";
      errorMessage.value = null;
    };


    const submitTurn = () => {
  if (turn.value === "setup" && currentAttempt.value.length === 4) {
    // Salva la sequenza segreta e passa al turno di guess
    secretCode.value = [...currentAttempt.value];
    currentAttempt.value = []; // Resetta il tentativo corrente
    turn.value = "guess";
  } else if (turn.value === "guess" && currentAttempt.value.length === 4) {
    // Aggiunge il tentativo attuale agli attempts e passa a feedback
    attempts.push({
      colors: [...currentAttempt.value],
      feedback: [],
    });
    currentAttempt.value = []; // Resetta il tentativo corrente
    turn.value = "feedback";
  } else {
    errorMessage.value = "Devi selezionare esattamente 4 colori!";
  }
};



  
      const toggleSecretVisibility = () => {
        showSecretCode.value = true;
        setTimeout(() => (showSecretCode.value = false), 4000);
      };
  
      return {
        maxAttempts,
        attempts,
        availableColors,
        currentAttempt,
        secretCode,
        turn,
        errorMessage,
        showSecretCode,
        addFeedback,
        confirmFeedback,
        resetFeedback,
        restartGame,
        toggleSecretVisibility,
        selectMode,
        selectColor,
        submitTurn,
      };
    },
  });
  </script>
  
  
  <style scoped>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
  }
  </style>
  