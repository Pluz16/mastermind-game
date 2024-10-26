// Funzione per generare il codice segreto
export function generateSecretCode(): number[] {
  const code = [];
  for (let i = 0; i < 4; i++) {
    code.push(Math.floor(Math.random() * 10));  // Genera un numero casuale da 0 a 9
  }
  return code;
}

// Funzione per confrontare il tentativo con il codice segreto
export function checkGuess(guess: number[], secretCode: number[]): { correct: number, misplaced: number } {
  let correct = 0;
  let misplaced = 0;

  const guessChecked = new Array(4).fill(false);
  const codeChecked = new Array(4).fill(false);

  // Controllo dei numeri corretti nella posizione giusta
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secretCode[i]) {
      correct++;
      guessChecked[i] = true;
      codeChecked[i] = true;
    }
  }

  // Controllo dei numeri corretti nella posizione sbagliata
  for (let i = 0; i < 4; i++) {
    if (!guessChecked[i]) {
      for (let j = 0; j < 4; j++) {
        if (!codeChecked[j] && guess[i] === secretCode[j]) {
          misplaced++;
          codeChecked[j] = true;
          break;
        }
      }
    }
  }

  return { correct, misplaced };
}
