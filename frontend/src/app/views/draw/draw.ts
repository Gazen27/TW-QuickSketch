import { Component                       } from '@angular/core';
import { signal, inject                  } from '@angular/core';
import { WordService                     } from '../../services/word.service';
import { SketchService                   } from '../../services/sketch.service';
import { SingleWord                      } from '../../models/word.model';
import { DialogComponent                 } from '../../components/dialog/dialog';
import { DrawIntro                       } from './phases/draw-intro/draw-intro';
import { DrawCategories                  } from './phases/draw-categories/draw-categories';
import { DrawWords                       } from './phases/draw-words/draw-words';
import { DrawSession                     } from './phases/draw-session/draw-session';
import { DrawPreview                     } from './phases/draw-preview/draw-preview';

type Phase =
  | 'intro'
  | 'categories'
  | 'words'
  | 'drawing'
  | 'preview';

@Component({
  selector: 'app-draw',
  imports: [DialogComponent, DrawIntro, DrawCategories, DrawWords, DrawSession, DrawPreview],
  templateUrl: './draw.html',
  styleUrl: './draw.css',
})
export class Draw {
  private wordService = inject(WordService);
  private sketchService = inject(SketchService);

  categories = signal<string[]>([]);
  words = signal<SingleWord[]>([]);
  selectedWord = signal<SingleWord | null>(null);
  sketchUrl = signal<string | null>(null);

  currentPhase = signal<Phase>('intro');

  showDeleteDialog = signal(false);
  showPublishSuccessDialog = signal(false);

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
    this.currentPhase.set('words');

    this.wordService.getRandomWords(category).subscribe({
      next: (response) => { this.words.set(response.data)},
      error: (error) => { console.error('Error loading random words:', error); }
    })
  }

  // Drawing selection phase
  startDrawing(word: SingleWord): void {
    this.selectedWord.set(word);
    this.sketchUrl.set(null);
    this.currentPhase.set('drawing');
  }

  onDrawingFinished(drawing: string | null): void {
    this.sketchUrl.set(drawing);
    this.currentPhase.set('preview');
  }

  // Sketch draft deletion
  deleteDraft(): void {
    this.showDeleteDialog.set(true);
  }

  confirmDeleteDraft(): void {
    this.showDeleteDialog.set(false);
    window.location.href = '/';
  }

  // Publish sketch
  publishSketch(): void {
    const word = this.selectedWord();
    const drawing = this.sketchUrl();

    if (!word || !drawing) { return; }

    this.sketchService.publishSketch({
      wordId: word.id,
      drawing: drawing
    }).subscribe({
      next: () => { this.showPublishSuccessDialog.set(true); },
      error: (error) => {
        console.error('Error publishing sketch:', error);
        window.alert('Unable to publish the sketch. Please try again.');
      }
    });
  }

  closePublishSuccessDialog(): void {
    this.showPublishSuccessDialog.set(false);
    window.location.href = '/';
  }
}
