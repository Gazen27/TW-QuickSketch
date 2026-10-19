import { Injectable, inject             } from '@angular/core';
import { HttpClient                     } from '@angular/common/http';
import { Observable, map                } from 'rxjs';
import { ApiResponse                    } from '../models/leaderboard.model';
import { CreateGuess, GuessResult, Guess} from '../models/guess.model';

@Injectable({
  providedIn: 'root'
})
export class GuessService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/guesses';

  postGuess(data: CreateGuess): Observable<GuessResult> {
    return this.http
      .post<ApiResponse<GuessResult>>(this.apiUrl, data)
      .pipe(map(response => response.data));
  }

  getGuessHistory(sketchId: string): Observable<Guess[]> {
    return this.http
      .get<ApiResponse<Guess[]>>(`${this.apiUrl}/${sketchId}`)
      .pipe(map(response => response.data));
  }
}