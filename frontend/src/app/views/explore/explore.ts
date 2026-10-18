import { Component, inject, OnInit, signal } from '@angular/core';
import { SketchService, SketchSortBy, SortOrder } from '../../services/sketch.service.js';
import { ExploreSketch } from '../../models/sketch.model.js';

type ExploreSort = 'newest' | 'oldest' | 'most-guessed' | 'least-guessed';

@Component({
  selector: 'app-explore',
  imports: [],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore implements OnInit {

  // Sketches displayed in the gallery
  sketches = signal<ExploreSketch[]>([]);

  // Pagination
  currentPage = signal(1);
  totalPages = signal(0);
  totalSketches = signal(0);
  readonly pageSize = 10;

  // Sorting
  selectedSort = signal<ExploreSort>('newest');

  // Loading and error handling
  loading = signal(false);
  errorMessage = signal('');

  private sketchService = inject(SketchService);

  ngOnInit(): void {
    this.loadSketches();
  }

  // Loading sketches
  loadSketches(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    const sortOptions: Record<
      ExploreSort,
      { sortBy: SketchSortBy; order: SortOrder }
    > = {
      newest: {
        sortBy: 'createdAt',
        order: 'desc'
      },
      oldest: {
        sortBy: 'createdAt',
        order: 'asc'
      },
      'most-guessed': {
        sortBy: 'guessCount',
        order: 'desc'
      },
      'least-guessed': {
        sortBy: 'guessCount',
        order: 'asc'
      }
    };

    const sort = sortOptions[this.selectedSort()];

    this.sketchService
      .getExploreSketches(
        this.currentPage(),
        this.pageSize,
        sort.sortBy,
        sort.order
      )
      .subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.sketches.set(response.data.items);
            this.currentPage.set(response.data.page);
            this.totalPages.set(response.data.totalPages);
            this.totalSketches.set(response.data.total);
          } else {
            this.errorMessage.set(response.message);
          }

          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading sketches:', error);
          this.errorMessage.set('Impossibile caricare i disegni.');
          this.loading.set(false);
        }
      });
  }

  // Changing sorting
  changeSort(sort: string): void {
    this.selectedSort.set(sort as ExploreSort);
    this.currentPage.set(1);
    this.loadSketches();
  }

  // Pagination: next page
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
      this.loadSketches();
    }
  }

  // Pagination: previous page
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      this.loadSketches();
    }
  }
}
