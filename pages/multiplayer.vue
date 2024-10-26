<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-300 p-4">
      <h1 class="text-3xl font-bold mb-6">Mastermind - Modalità Multiplayer</h1>
  
      <!-- Messaggio per identificare il turno corrente -->
      <p v-if="turn === 'setup'" class="text-lg">Giocatore 1: Seleziona la sequenza segreta</p>
      <p v-if="turn === 'guess'" class="text-lg">Giocatore 2: Prova a indovinare la sequenza</p>
      <p v-if="turn === 'feedback'" class="text-lg">Giocatore 1: Fornisci il feedback</p>
  
      <!-- Selettore dei colori -->
      <div v-if="turn === 'setup' || turn === 'guess'" class="flex gap-2 mt-6">
        <button v-for="color in availableColors" :key="color" @click="selectColor(color)" :class="`w-10 h-10 rounded-full ${color}`"></button>
      </div>
  
      <!-- Visualizzazione del tentativo corrente -->
      <div v-if="turn === 'setup' || turn === 'guess'" class="flex gap-2 mt-4">
        <div v-for="(color, index) in currentAttempt" :key="index" :class="`w-8 h-8 rounded-full ${color}`"></div>
      </div>

      <!--!-- Bottone per mostrare temporaneamente il codice segreto (solo nel turno di feedback) -->
    <div v-if="turn === 'feedback'" class="flex flex-col items-center gap-2 mt-4">
      <button @click="toggleSecretVisibility" class="btn mt-4">
        {{ showSecretCode ? "Nascondi Codice" : "Mostra Codice" }}
      </button>
      <div v-if="showSecretCode" class="text-gray-700 mt-2">
        <p>Codice Segreto: <span class="font-bold">{{ secretCode.join(", ") }}</span></p>
      </div>
    </div>

    <!-- Componente Campo di Gioco (GameBoard) -->
    <GameBoard :attempts="attempts" />
  
      <!-- Bottone per confermare il turno -->
      <button v-if="turn !== 'feedback'" @click="submitTurn" class="btn mt-4">Conferma</button>
  
      <!-- Feedback manuale per il turno di feedback -->
      <div v-if="turn === 'feedback'" class="flex flex-col items-center gap-2 mt-4">
        <p class="text-lg font-semibold">Seleziona il feedback per il tentativo corrente</p>
        <div class="flex gap-2">
          <button @click="addFeedback('correct')" class="btn bg-white text-black">Corretti</button>
          <button @click="addFeedback('misplaced')" class="btn bg-gray-500">Posizione Sbagliata</button>
        </div>
  
        <!-- Mostra il feedback selezionato finora -->
        <div class="flex gap-1 mt-2">
          <div v-for="(feedback, i) in attempts[attempts.length - 1].feedback" :key="i" :class="feedback === 'correct' ? 'bg-white border-black' : 'bg-gray-500'" class="w-4 h-4 rounded-full border"></div>
        </div>
        <button @click="confirmFeedback" :disabled="!isFeedbackComplete" class="btn bg-blue-500 mt-2">Conferma Feedback</button>
        <button @click="resetFeedback" class="btn bg-red-500 mt-2">Reset Feedback</button>
      </div>
  
      <!-- Messaggio di errore -->
      <p v-if="errorMessage" class="text-red-500 font-semibold">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, reactive, computed } from "vue";
  import GameBoard from "../components/GameBoard.vue";
  
  export default defineComponent({
  name: "MultiplayerPage",
  components: { GameBoard },
  setup() {
    const attempts = reactive<Array<{ colors: string[]; feedback: string[] }>>([]);
    const currentAttempt = ref<string[]>([]);
    const secretCode = ref<string[]>([]);
    const turn = ref<"setup" | "guess" | "feedback">("setup");
    const errorMessage = ref<string | null>(null);
    const showSecretCode = ref(false);
  
      const selectColor = (color: string) => {
        if (currentAttempt.value.length < 4) {
          currentAttempt.value.push(color);
          errorMessage.value = null;
        } else {
          errorMessage.value = "Hai già selezionato 4 colori!";
        }
      };

      const availableColors = ref<string[]>([
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
]);


  
      const submitTurn = () => {
        if (turn.value === "setup" && currentAttempt.value.length === 4) {
          secretCode.value = [...currentAttempt.value];
          currentAttempt.value = [];
          turn.value = "guess";
        } else if (turn.value === "guess" && currentAttempt.value.length === 4) {
          attempts.push({ colors: [...currentAttempt.value], feedback: [] });
          currentAttempt.value = [];
          turn.value = "feedback";
        } else {
          errorMessage.value = "Devi selezionare esattamente 4 colori!";
        }
      };
  
      const addFeedback = (type: "correct" | "misplaced") => {
        const lastAttempt = attempts[attempts.length - 1];
        if (lastAttempt && lastAttempt.feedback.length < 4) {
          lastAttempt.feedback.push(type);
          console.log(`Added feedback: ${type}`); // Log per debug
          errorMessage.value = null;
        } else {
          errorMessage.value = "Hai già fornito il feedback completo!";
        }
      };
  
      const confirmFeedback = () => {
        const lastAttempt = attempts[attempts.length - 1];
        if (lastAttempt && lastAttempt.feedback.length === 4) {
          turn.value = "guess"; // Prosegue al turno successivo
          errorMessage.value = null;
        } else {
          errorMessage.value = "Devi fornire esattamente 4 feedback per confermare!";
        }
      };
  
      const resetFeedback = () => {
        const lastAttempt = attempts[attempts.length - 1];
        if (lastAttempt) {
          lastAttempt.feedback = [];
          errorMessage.value = null;
        }
      };
  
      const isFeedbackComplete = computed(() => {
        const lastAttempt = attempts[attempts.length - 1];
        return lastAttempt && lastAttempt.feedback.length === 4;
      });

       // Funzione per mostrare temporaneamente il codice segreto
    const toggleSecretVisibility = () => {
      if (turn.value === "feedback") {
        showSecretCode.value = true;
        setTimeout(() => (showSecretCode.value = false), 4000); // Nasconde il codice dopo 4 secondi
      }
    };
  
    return {
  attempts,
  availableColors,
  currentAttempt,
  secretCode,
  turn,
  errorMessage,
  showSecretCode,
  toggleSecretVisibility,
  selectColor,
  submitTurn,
  addFeedback,
  confirmFeedback,
  isFeedbackComplete,
  resetFeedback,
};
    }
  });
  </script>
  
  <style scoped>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
  }
  </style>
  