import { Injectable, inject } from '@angular/core';
import { HttpClient         } from '@angular/common/http';
import { Categories         } from '../models/word.model';
import { Observable         } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private http = inject(HttpClient);

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>('http://localhost:3000/words/categories');
  }
}