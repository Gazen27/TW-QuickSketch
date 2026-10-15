import { Component, signal, inject } from '@angular/core';
import { WordService               } from '../../services/word.service';

type Phase =
  | 'intro'
  | 'categories'
  | 'words'
  | 'drawing'
  | 'preview';

@Component({
  selector: 'app-draw',
  imports: [],
  templateUrl: './draw.html',
  styleUrl: './draw.css',
})
export class Draw {
  private wordService = inject(WordService);
  categories = signal<string[]>([]);
  
  currentPhase = signal<Phase>('intro');

  showCategories(): void {
    this.currentPhase.set('categories');

    this.wordService.getCategories().subscribe({
      next: (response) => { this.categories.set(response.data); },
      error: (error) => { console.error('Error loading categories:', error); }
    });
  }

  showWords(): void {
    this.currentPhase.set('words');
  }

  startDrawing(): void {
    this.currentPhase.set('drawing');
  }

  showPreview(): void {
    this.currentPhase.set('preview');
  }

}
