import { Component, output } from '@angular/core';

@Component({
  selector: 'app-draw-intro',
  imports: [],
  templateUrl: './draw-intro.html',
  styleUrl: './draw-intro.css',
})
export class DrawIntro {
  start = output<void>();
}
