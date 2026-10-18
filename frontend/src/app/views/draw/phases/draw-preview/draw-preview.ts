import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-draw-preview',
  imports: [],
  templateUrl: './draw-preview.html',
  styleUrl: './draw-preview.css',
})
export class DrawPreview {

  sketchUrl = input.required<string>();

  delete = output<void>();
  publish = output<void>();
}