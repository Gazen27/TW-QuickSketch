import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute                    } from '@angular/router';
import { SketchService                     } from '../../services/sketch.service';

@Component({
  selector: 'app-guess',
  standalone: true,
  imports: [],
  templateUrl: './guess.html',
  styleUrl: './guess.css'
})
export class Guess implements OnInit {
  private route = inject(ActivatedRoute);
  private sketchService = inject(SketchService);

  sketchId = signal<string | null>(null);

  sketch = signal<{
    id: string;
    drawing: string;
    createdAt: string;
    guessCount: number;
    author: {
      username: string;
    };
  } | null>(null);

  errorMessage = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.sketchId.set(id);

    if (!id) {
      this.errorMessage.set('Missing sketch ID');
      return;
    }

    this.sketchService.getSketchById(id).subscribe({
      next: (response) => {
        this.sketch.set(response.data);
      },
      error: () => {
        this.errorMessage.set('Error loading selcted sketch');
      }
    });
  }
}