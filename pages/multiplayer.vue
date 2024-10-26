<template>
    <div class="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">Mastermind - Modalità Multiplayer</h1>
  
      <!-- Messaggio di Turno -->
      <p v-if="turn === 'setup'" class="text-lg text-gray-700">È il turno di Giocatore 1: Seleziona il codice segreto</p>
      <p v-if="turn === 'guess'" class="text-lg text-gray-700">È il turno di Giocatore 2: Prova a indovinare la sequenza</p>
      <p v-if="turn === 'feedback'" class="text-lg text-gray-700">È il turno di Giocatore 1: Fornisci il feedback</p>
  
      <!-- Selezione Modalità -->
      <div v-if="turn === 'modeSelection'" class="flex gap-4 mt-4">
        <button @click="selectMode(5, 15)" class="btn-mode bg-blue-600 text-white">
          Modalità 5 Colori - 15 Tentativi
        </button>
        <button @click="selectMode(8, 25)" class="btn-mode bg-green-600 text-white">
          Modalità 8 Colori - 25 Tentativi
        </button>
      </div>
  
      <div v-if="turn === 'victory'" class="text-4xl font-bold text-green-500 victory-animation mt-8">
        Congratulazioni! Hai Vinto!
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
  
      <!-- Pulsante per Confermare il Turno -->
      <button v-if="currentAttempt.length === 4 && (turn === 'setup' || turn === 'guess')" @click="submitTurn" class="btn-action mt-4">
        Conferma Turno
      </button>
  
      <!-- Pulsante per visualizzare il codice segreto nel turno di feedback -->
      <button v-if="turn === 'feedback'" @click="toggleSecretVisibility" class="btn-action mt-4">
        {{ showSecretCode ? "Nascondi Codice" : "Mostra Codice" }}
      </button>
  
      <!-- Visualizzazione del Codice Segreto (solo durante feedback) -->
      <SecretCodeDisplay :secretCode="secretCode" :showSecretCode="showSecretCode" />
  
      <!-- Controllo del Feedback -->
      <FeedbackControl v-if="turn === 'feedback'" @feedback="addFeedback" @confirmFeedback="confirmFeedback" @resetFeedback="resetFeedback" />
  
      <!-- Componente Campo di Gioco (GameBoard) -->
      <GameBoard :attempts="attempts" :maxAttempts="maxAttempts" />
  
      <!-- Bottoni per Tornare alla Home e Ricominciare -->
      <div class="flex gap-4 mt-6">
        <button @click="restartGame" class="btn-action bg-red-600 text-white">Ricomincia</button>
        <NuxtLink to="/" class="btn-action bg-gray-600 text-white">Torna alla Home</NuxtLink> <!-- Pulsante per mostrare il regolamento -->
    <button @click="toggleInfo" class="btn-action bg-blue-500 text-white">Mostra Regolamento</button>
      </div>

      <InfoCard :showInfo="showInfo" @close="toggleInfo" />

  
      <p v-if="errorMessage" class="text-red-500 font-semibold mt-4">{{ errorMessage }}</p>
    </div>
  </template>
  
  
  
  <script lang="ts">
  import { defineComponent, ref, reactive } from "vue";
  import GameBoard from "../components/GameBoard.vue";
  import ColorSelector from "../components/ColorSelector.vue";
  import SecretCodeDisplay from "../components/SecretCodeDisplay.vue";
  import FeedbackControl from "../components/FeedbackControl.vue";
  import InfoCard from "../components/InfoCard.vue";
  
  export default defineComponent({
    name: "MultiplayerPage",
    components: { GameBoard, ColorSelector, SecretCodeDisplay, FeedbackControl, InfoCard },
    setup() {
      const maxAttempts = ref(15);
      const attempts = reactive<Array<{ colors: string[]; feedback: string[] }>>([]);
      const availableColors = ref<string[]>(["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"]);
      const secretCode = ref<string[]>([]);
      const currentAttempt = ref<string[]>([]);
        const turn = ref<"modeSelection" | "setup" | "guess" | "feedback" | "victory" | "defeat">("modeSelection");
      const showSecretCode = ref(false);
      const errorMessage = ref<string | null>(null);
      const showInfo = ref(false);
      
  
      // Funzioni per gestire il gioco
      const addFeedback = (feedbackType: string) => {
  const lastAttempt = attempts[attempts.length - 1];
  if (lastAttempt && lastAttempt.feedback.length < 4) {
    lastAttempt.feedback.push(feedbackType);
    if (feedbackType === "none") {
      lastAttempt.feedback = []; // Nessun pallino da mostrare
    }
    errorMessage.value = null;
  } else {
    errorMessage.value = "Hai già fornito il feedback completo!";
  }
};
  
const confirmFeedback = () => {
  const lastAttempt = attempts[attempts.length - 1];
  if (lastAttempt) {
    // Se il feedback è vuoto o ha meno di 4 palline, è comunque accettato
    turn.value = "guess"; 
    errorMessage.value = null;

    // Controllo della vittoria
    if (lastAttempt.feedback.filter((f) => f === "correct").length === 4) {
      turn.value = "victory"; // Attiva animazione di vittoria
      setTimeout(() => restartGame(), 5000); // Reset dopo 5 secondi
    } else if (attempts.length >= maxAttempts.value) {
      turn.value = "defeat"; // Attiva animazione di sconfitta
      setTimeout(() => restartGame(), 5000); // Reset dopo 5 secondi
    }
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


const toggleInfo = () => {
      showInfo.value = !showInfo.value;
    };



  
const toggleSecretVisibility = () => {
  if (turn.value === "feedback") {
    showSecretCode.value = true;
    setTimeout(() => (showSecretCode.value = false), 4000);
  }
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
        showInfo,
        toggleInfo,
      };
    },
  });
  </script>
  
  
  <style scoped>
  .btn {
    @apply px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600;
  }

  .btn-mode {
    @apply px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .btn-action {
    @apply px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  @keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes victoryBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
.victory-animation {
  animation: victoryBounce 1s ease-in-out infinite;
}


@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 1s infinite;
}
  </style>
  