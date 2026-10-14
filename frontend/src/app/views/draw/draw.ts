import { Component, signal } from '@angular/core';

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
  currentPhase = signal<Phase>('intro');

  showCategories(): void {
    this.currentPhase.set('categories');
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
