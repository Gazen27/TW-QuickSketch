import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute                    } from '@angular/router';
import { SketchService                     } from '../../services/sketch.service';
import { GuessService                      } from '../../services/guess.service';
import { Guess as GuessAttempt             } from '../../models/guess.model';
import { FormsModule                       } from '@angular/forms';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guess.html',
  styleUrl: './guess.css'
})
export class Guess implements OnInit {
  private route = inject(ActivatedRoute);
  private sketchService = inject(SketchService);
  private guessService = inject(GuessService);

  sketchId = signal<string | null>(null);

  sketch = signal<{
    id: string;
    drawing: string;
    createdAt: string;
    guessCount: number;
    author: {
      username: string;
    };
  } | null>(null);

  errorMessage = signal('');
  guessInput = signal('');
  guessError = signal('');
  guessHistory = signal<GuessAttempt[]>([]);
  attemptsLeft = signal(10);
  isSubmitting = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.sketchId.set(id);
    if (!id) {
      this.errorMessage.set('Missing sketch ID');
      return;
    }

    this.loadSketch(id);
  }

  // loading selected sketch from explore view
  private loadSketch(id: string): void {
    this.sketchService.getSketchById(id).subscribe({
      next: (response) => {
        this.sketch.set(response.data);
        this.loadGuessHistory(id);
      },
      error: () => { this.errorMessage.set('Error loading selected sketch'); }
    });
  }

  // loading attempts history of the current user refered to the selected sketch
  private loadGuessHistory(sketchId: string): void {
    this.guessService.getGuessHistory(sketchId).subscribe({
      next: (guesses) => {
        this.guessHistory.set(guesses);
        this.attemptsLeft.set(10 - guesses.length);
      },
      error: () => { this.guessError.set('Unable to load your guess history'); }
    });
  }
  
  // Guess toUppercase
  onGuessInput(value: string): void {
    this.guessInput.set(value.toUpperCase());
  }

  // Posting guess
  submitGuess(): void {
    const text = this.guessInput().trim();
    const sketchId = this.sketchId();

    if (!text) {
      this.guessError.set('Please enter a guess');
      return;
    }

    if (!sketchId) {
      this.guessError.set('Missing sketch ID');
      return;
    }

    if (this.isSubmitting()) { return; }

    this.guessError.set('');
    this.isSubmitting.set(true);

    this.guessService.postGuess({ sketchId, text }).subscribe({
      next: (result) => {
        this.guessHistory.update(history => [
          ...history,
          result.guess
        ]);

        this.attemptsLeft.set(result.attemptsLeft);
        this.guessInput.set('');

        if (result.guess.isCorrect) { this.guessError.set('Correct! You guessed the word!'); }
      },
      error: (error) => {
        this.guessError.set(
        error.error?.message ?? 'Unable to submit your guess'
      );
      this.isSubmitting.set(false);
    },
    complete: () => { this.isSubmitting.set(false); }
    });
  }
}