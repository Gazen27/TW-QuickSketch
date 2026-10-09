import { Injectable, inject     } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable             } from 'rxjs';
import { ApiResponse            } from '../models/leaderboard.model';
import { PlayersLeaderboard     } from '../models/leaderboard.model'; 
import { ArtistsLeaderboard     } from '../models/leaderboard.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private http = inject(HttpClient);
  private playersLeaderboardUrl = 'http://localhost:3000/leaderboard/players';
  private artistsLeaderboardUrl = 'http://localhost:3000/leaderboard/artists';

  // Players
  getPlayersLeaderboard(
    page: number,
    limit: number
  ): Observable<ApiResponse<PlayersLeaderboard>> {

    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<ApiResponse<PlayersLeaderboard>>(this.playersLeaderboardUrl, { params });
  }

  // Artists
  getArtistsLeaderboard(
    page: number,
    limit: number
  ): Observable<ApiResponse<ArtistsLeaderboard>> {

    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<ApiResponse<ArtistsLeaderboard>>(this.artistsLeaderboardUrl, { params });
  }
}