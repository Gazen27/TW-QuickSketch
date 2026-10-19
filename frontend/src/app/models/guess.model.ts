export interface CreateGuess {
  sketchId: string;
  text: string;
}

export interface Guess {
  id: string;
  text: string;
  isCorrect: boolean;
  userId: string;
  sketchId: string;
}

export interface GuessResult {
  guess: Guess;
  attemptsLeft: number;
}