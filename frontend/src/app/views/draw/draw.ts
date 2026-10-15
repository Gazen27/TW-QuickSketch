import { Component, signal, inject } from '@angular/core';
import { WordService               } from '../../services/word.service';
import { UpperCasePipe             } from '@angular/common';
import { SingleWord                } from '../../models/word.model';

type Phase =
  | 'intro'
  | 'categories'
  | 'words'
  | 'drawing'
  | 'preview';

@Component({
  selector: 'app-draw',
  imports: [UpperCasePipe],
  templateUrl: './draw.html',
  styleUrl: './draw.css',
})
export class Draw {
  private wordService = inject(WordService);

  categories = signal<string[]>([]);
  words = signal<SingleWord[]>([]);

  selectedCategory = signal<string | null>(null);
  selectedWord = signal<SingleWord | null>(null);

  countdown = signal<number | null>(null);
  timer = signal<number | null>(null);

  currentPhase = signal<Phase>('intro');

  // Pre-drawing countdown
  startCountdown(): void {
    this.countdown.set(3);
    const interval = setInterval(() => {
      const current = this.countdown();
      if(current === null){
        clearInterval(interval);
        return;
      }
      
      if(current > 1){ this.countdown.set(current-1);}
      
      else{
        this.countdown.set(null);
        clearInterval(interval);
        this.startDrawingTimer();
      }
    }, 1000);
  }

  // Drawing timer
  startDrawingTimer(): void {
    this.timer.set(90);

    const interval = setInterval(() => {
      const current = this.timer();

      if (current === null || current <= 1) {
        this.timer.set(0);
        clearInterval(interval);
        this.showPreview();
        return;
      }

      this.timer.set(current - 1);
    }, 1000);
  }

  // Category selection phase
  showCategories(): void {
    this.currentPhase.set('categories');

    this.wordService.getCategories().subscribe({
      next: (response) => { this.categories.set(response.data); },
      error: (error) => { console.error('Error loading categories:', error); }
    });
  }

  // Words selection phase
  showWords(category: string): void {
    this.selectedCategory.set(category);
    this.currentPhase.set('words');

    this.wordService.getRandomWords(category).subscribe({
      next: (response) => { this.words.set(response.data)},
      error: (error) => { console.error('Error loading random words:', error); }
    })
  }

  // Drawing selection phase
  startDrawing(word: SingleWord): void {
    this.selectedWord.set(word);
    this.currentPhase.set('drawing');
    this.startCountdown();
  }

  // Showing results
  showPreview(): void {
    this.currentPhase.set('preview');
  }

}
