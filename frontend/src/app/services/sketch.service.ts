
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { CreateSketch, Sketch } from '../models/sketch.model';

interface CreateSketchResponse {
  status: 'success';
  message: string;
  data: Sketch;
}

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
}
