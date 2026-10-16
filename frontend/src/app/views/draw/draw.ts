import { Component                       } from '@angular/core';
import { signal, inject, effect          } from '@angular/core';
import { WordService                     } from '../../services/word.service';
import { SketchService                   } from '../../services/sketch.service';
import { UpperCasePipe                   } from '@angular/common';
import { SingleWord                      } from '../../models/word.model';
import { ElementRef                      } from '@angular/core';
import { ViewChild, afterNextRender      } from '@angular/core';
import { Injector, runInInjectionContext } from '@angular/core';

import SignaturePad from 'signature_pad';

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
  private sketchService = inject(SketchService);

  categories = signal<string[]>([]);
  words = signal<SingleWord[]>([]);

  selectedCategory = signal<string | null>(null);
  selectedWord = signal<SingleWord | null>(null);
  
  selectedColor = signal('#171717');
  selectedTool = signal<'pen' | 'eraser'>('pen');
  penSize = signal(2);
  eraserSize = signal(10);

  sketchUrl = signal<string | null>(null);

  countdown = signal<number | null>(null);
  pause = signal<number | null>(null);
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

  // Post-drawing pause
  stopDrawing(): void {
    this.pause.set(3);

    const interval = setInterval(() => {
      const current = this.pause();
      if(current === null){
        clearInterval(interval);
        return;
      }
      
      if(current > 1){ this.pause.set(current-1);}
      
      else{
        this.pause.set(null);
        clearInterval(interval);
        this.showPreview();
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
        this.stopDrawing();
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
    const canvas = this.canvasRef?.nativeElement;

    if (canvas && this.signaturePad && !this.signaturePad.isEmpty()) {
    const rect = canvas.getBoundingClientRect();

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = Math.round(rect.width);
    exportCanvas.height = Math.round(rect.height);

    const context = exportCanvas.getContext('2d');

    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      context.drawImage(
        canvas,
        0, 0, canvas.width, canvas.height,
        0, 0, exportCanvas.width, exportCanvas.height
      );

      this.sketchUrl.set(exportCanvas.toDataURL('image/png'));
    } 
    else { this.sketchUrl.set(null); }

    }
    else { this.sketchUrl.set(null); }
    
    this.currentPhase.set('preview');
  }

  deleteDraft(): void {
    const confirmed = window.confirm('Are you sure you want to delete your drawing?');
    if(confirmed){ window.location.href = '/'; }
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
      next: () => {
        window.alert('Sketch published successfully!');
        window.location.href = '/';
      },
      error: (error) => {
        console.error('Error publishing sketch:', error);
        window.alert('Unable to publish the sketch. Please try again.');
      }
    });
  }

  ///////////////////////////// Signature Pad /////////////////////////////
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;
  private injector = inject(Injector);
  private signaturePad?: SignaturePad;

  constructor() {
    effect(() => {
      if (this.currentPhase() === 'drawing') {
        runInInjectionContext(this.injector, () => { afterNextRender(() => { this.initializeCanvas();});});
      }
    });
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);

    const context = canvas.getContext('2d');
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.signaturePad?.off();

    this.signaturePad = new SignaturePad(canvas, {
      penColor: this.selectedColor(),
      minWidth: 2,
      maxWidth: 2,
      velocityFilterWeight: 1
    });
  }

  // Pen color selection
  setPenColor(color: string): void {
    this.selectedColor.set(color);
    if (this.selectedTool() === 'eraser') { this.selectPen() }
    if (this.signaturePad) { this.signaturePad.penColor = color; }
  }

  // Tool selection
  selectPen(): void {
    this.selectedTool.set('pen');

    if (this.signaturePad) {
      this.signaturePad.minWidth = this.penSize();
      this.signaturePad.maxWidth = this.penSize();
      this.signaturePad.penColor = this.selectedColor();
    }
  }

  selectEraser(): void {
    this.selectedTool.set('eraser');

    if (this.signaturePad) {
      this.signaturePad.minWidth = this.eraserSize();
      this.signaturePad.maxWidth = this.eraserSize();
      this.signaturePad.penColor = '#ffffff';
    }
  }

  undo(): void {
    if(!this.signaturePad) { return; }

    const signs = this.signaturePad.toData();
    if(signs.length > 0) {
      signs.pop();
      this.signaturePad.fromData(signs);
    }
  }

  clearCanvas(): void {
    this.signaturePad?.clear();
  }

  // Change current tool size
  changeToolSize(size: number): void {
    if (this.selectedTool() === 'pen') { this.penSize.set(size); }
    else { this.eraserSize.set(size); }

    if (this.signaturePad) {
      this.signaturePad.minWidth = size;
      this.signaturePad.maxWidth = size;
    }
  }
}
