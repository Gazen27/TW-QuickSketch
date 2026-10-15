import { Injectable, inject } from '@angular/core';
import { HttpClient         } from '@angular/common/http';
import { Categories         } from '../models/word.model';
import { Observable         } from 'rxjs';
import { Words              } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private http = inject(HttpClient);

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>('http://localhost:3000/words/categories');
  }

  getRandomWords(category: string): Observable<Words> {
    return this.http.get<Words>('http://localhost:3000/words/random', {params: { category }});
  }

}