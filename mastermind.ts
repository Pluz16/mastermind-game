// mastermind.ts (file separato per la logica di gioco)
export function generateSecretCode(): number[] {
    const code = [];
    for (let i = 0; i < 4; i++) {
      code.push(Math.floor(Math.random() * 10));  // Genera un numero casuale da 0 a 9
    }
    return code;
  }
  