import { Component, Injector                    } from '@angular/core';
import { input, output, signal, inject, effect  } from '@angular/core';
import { ElementRef, ViewChild                  } from '@angular/core';
import { afterNextRender, runInInjectionContext } from '@angular/core';
import { SingleWord                             } from '../../../../models/word.model';
import { UpperCasePipe                          } from '@angular/common';

import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-draw-session',
  imports: [UpperCasePipe],
  templateUrl: './draw-session.html',
  styleUrl: './draw-session.css',
})
export class DrawSession {

  word = input.required<SingleWord>();
  finish = output<string | null>();

  // Drawing tools
  selectedColor = signal('#171717');
  selectedTool = signal<'pen' | 'eraser'>('pen');
  penSize = signal(2);
  eraserSize = signal(10);

  // Timer and countdown
  countdown = signal<number | null>(null);
  pause = signal<number | null>(null);
  timer = signal<number | null>(null);

  // Countdown
  startCountdown(): void {
    this.countdown.set(3);

    const interval = setInterval(() => {
      const current = this.countdown();
      if (current === null) {
        clearInterval(interval);
        return;
      }

      if (current > 1) { this.countdown.set(current - 1); }
      else {
        this.countdown.set(null);
        clearInterval(interval);
        this.startDrawingTimer();
      }
    }, 1000);
  }

  // Timer
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

  // Drawing end
  stopDrawing(): void {
    this.pause.set(3);

    const interval = setInterval(() => {
      const current = this.pause();

      if (current === null) {
        clearInterval(interval);
        return;
      }

      if (current > 1) { this.pause.set(current - 1); }
      else {
        this.pause.set(null);
        clearInterval(interval);
        this.emitDrawing();
      }
    }, 1000);
  }

  // Signature Pad
  @ViewChild('canvas') canvasRef?: ElementRef<HTMLCanvasElement>;

  private injector = inject(Injector);
  private signaturePad?: SignaturePad;

  constructor() { effect(() => {
    this.word();
    runInInjectionContext(this.injector, () => { afterNextRender(() => {
      this.initializeCanvas();
      this.startCountdown();
      });
      });
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
      minWidth: this.penSize(),
      maxWidth: this.penSize(),
      velocityFilterWeight: 1
    });
  }

  // Esportazione del disegno e comunicazione al padre
  private emitDrawing(): void {
    const canvas = this.canvasRef?.nativeElement;

    if (!canvas || !this.signaturePad || this.signaturePad.isEmpty()) {
      this.finish.emit(null);
      return;
    }

    const rect = canvas.getBoundingClientRect();

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = Math.round(rect.width);
    exportCanvas.height = Math.round(rect.height);

    const context = exportCanvas.getContext('2d');

    if (!context) {
      this.finish.emit(null);
      return;
    }

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    context.drawImage(
      canvas,
      0, 0, canvas.width, canvas.height,
      0, 0, exportCanvas.width, exportCanvas.height
    );

    this.finish.emit(exportCanvas.toDataURL('image/png'));
  }

  // Change color
  setPenColor(color: string): void {
    this.selectedColor.set(color);
    if (this.selectedTool() === 'eraser') { this.selectPen(); }
    if (this.signaturePad) { this.signaturePad.penColor = color; }
  }

  // Pen selection
  selectPen(): void {
    this.selectedTool.set('pen');

    if (this.signaturePad) {
      this.signaturePad.minWidth = this.penSize();
      this.signaturePad.maxWidth = this.penSize();
      this.signaturePad.penColor = this.selectedColor();
    }
  }

  // Eraser selection
  selectEraser(): void {
    this.selectedTool.set('eraser');

    if (this.signaturePad) {
      this.signaturePad.minWidth = this.eraserSize();
      this.signaturePad.maxWidth = this.eraserSize();
      this.signaturePad.penColor = '#ffffff';
    }
  }

  // Undo last action
  undo(): void {
    if (!this.signaturePad) return;
    const signs = this.signaturePad.toData();

    if (signs.length > 0) {
      signs.pop();
      this.signaturePad.fromData(signs);
    }
  }

  // Clear canvas
  clearCanvas(): void { this.signaturePad?.clear(); }

  // Change tool size
  changeToolSize(size: number): void {
    if (this.selectedTool() === 'pen') { this.penSize.set(size); }
    else { this.eraserSize.set(size); }

    if (this.signaturePad) {
      this.signaturePad.minWidth = size;
      this.signaturePad.maxWidth = size;
    }
  }
}