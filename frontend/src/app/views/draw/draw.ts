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
  currentPhase = signal<Phase>('intro');

  showCategories(): void {
    this.currentPhase.set('categories');

    this.wordService.getCategories().subscribe({
      next: (response) => { this.categories.set(response.data); },
      error: (error) => { console.error('Error loading categories:', error); }
    });
  }

  showWords(category: string): void {
    this.selectedCategory.set(category);
    this.currentPhase.set('words');

    this.wordService.getRandomWords(category).subscribe({
      next: (response) => { this.words.set(response.data)},
      error: (error) => { console.error('Error loading random words:', error); }
    })
  }

  startDrawing(): void {
    this.currentPhase.set('drawing');
  }

  showPreview(): void {
    this.currentPhase.set('preview');
  }

}
