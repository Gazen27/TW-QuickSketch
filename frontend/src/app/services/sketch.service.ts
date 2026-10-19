import { Injectable, inject                    } from '@angular/core';
import { HttpClient, HttpParams                } from '@angular/common/http';
import { Observable, map                       } from 'rxjs';
import { CreateSketch, Sketch, ExploreSketches } from '../models/sketch.model';
import { ApiResponse                           } from '../models/leaderboard.model';

interface CreateSketchResponse {
  status: 'success';
  message: string;
  data: Sketch;
}

export type SketchSortBy = 'createdAt' | 'guessCount';
export type SortOrder = 'asc' | 'desc';

@Injectable({
  providedIn: 'root'
})
export class SketchService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/sketches';

  publishSketch(data: CreateSketch): Observable<Sketch> {
    return this.http
      .post<CreateSketchResponse>(this.apiUrl, data)
      .pipe(map(response => response.data));
  }

  getExploreSketches(
    page: number,
    limit: number,
    sortBy: SketchSortBy,
    order: SortOrder
  ): Observable<ApiResponse<ExploreSketches>> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('sortBy', sortBy)
      .set('order', order);
    
      return this.http.get<ApiResponse<ExploreSketches>>(this.apiUrl, { params }).pipe(
      map(response => {
        console.log('RISPOSTA GET SKETCHES:', response);
      return response;
  })
);
    //return this.http.get<ApiResponse<ExploreSketches>>(this.apiUrl, { params });
  }

  getSketchById(id: string): Observable<ApiResponse<{
    id: string;
    drawing: string;
    createdAt: string;
    guessCount: number;
    author: {
      username: string;
    };
  }>> {
    return this.http.get<ApiResponse<{
      id: string;
      drawing: string;
      createdAt: string;
      guessCount: number;
      author: {
        username: string;
      };
    }>>(`${this.apiUrl}/${id}`);
  }
}