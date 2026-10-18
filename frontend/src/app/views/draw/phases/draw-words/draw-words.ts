import { Component, input, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { SingleWord } from '../../../../models/word.model';

@Component({
  selector: 'app-draw-words',
  imports: [UpperCasePipe],
  templateUrl: './draw-words.html',
  styleUrl: './draw-words.css',
})
export class DrawWords {
  
  words = input<SingleWord[]>([]);
  wordSelected = output<SingleWord>();
}