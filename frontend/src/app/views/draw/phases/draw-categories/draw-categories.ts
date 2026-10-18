
import { Component, input, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-draw-categories',
  imports: [UpperCasePipe],
  templateUrl: './draw-categories.html',
  styleUrl: './draw-categories.css',
})
export class DrawCategories {
  
  categories = input<string[]>([]);
  categorySelected = output<string>();
}