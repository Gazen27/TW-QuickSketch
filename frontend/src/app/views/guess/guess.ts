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

    this.sketchService.getSketchById(id).subscribe({
      next: (response) => {
        this.sketch.set(response.data);
      },
      error: () => {
        this.errorMessage.set('Error loading selcted sketch');
      }
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