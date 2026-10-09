import { Component, inject, OnInit } from '@angular/core';
import { signal                    } from '@angular/core';
import { LeaderboardService        } from '../../services/leaderboard.service.js';
import { Artist, Player            } from '../../models/leaderboard.model.js';

@Component({
  selector: 'app-leaderboard',
  imports: [],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard implements OnInit{

  // Players leaderboard
  players = signal<Player[]>([]);
  playersCurrentPage = signal(1);
  playersTotalPages = signal(0);
  playersPageSize = 10;

  // Artists leaderboard
  artists = signal<Artist[]>([]);
  artistsCurrentPage = signal(1);
  artistsTotalPages = signal(0);
  artistsPageSize = 10;

  private leaderboardService = inject(LeaderboardService);
  ngOnInit(): void {
    this.loadPlayers();
    this.loadArtists();
  }

  // Loading players
  loadPlayers(): void { this.leaderboardService
    .getPlayersLeaderboard(this.playersCurrentPage(), this.playersPageSize)
    .subscribe({
      next: (response) => {        
        if (response.status === 'success') {
          this.players.set(response.data.items);
          this.playersCurrentPage.set(response.data.page);
          this.playersTotalPages.set(response.data.totalPages);
        }
      },
      error: (error) => { console.error('Error loading players leaderboard:', error); }
    });
  }

  // Loading artists
  loadArtists(): void { this.leaderboardService
    .getArtistsLeaderboard(this.artistsCurrentPage(), this.artistsPageSize)
    .subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.artists.set(response.data.items);
          this.artistsCurrentPage.set(response.data.page);
          this.artistsTotalPages.set(response.data.totalPages);
        }
      },
      error: (error) => { console.error('Error loading artists leaderboard:', error); }
    });
  }

  // Players leaderboard pages navigation
  nextPlayersPage(): void {
    this.playersCurrentPage.update(page => page + 1);
    this.loadPlayers();
  }

  previousPlayersPage(): void {
    this.playersCurrentPage.update(page => page - 1);
    this.loadPlayers();
  }

  // Artists leaderboard pages navigation
  nextArtistsPage(): void {
    this.artistsCurrentPage.update(page => page + 1);
    this.loadArtists();
  }

  previousArtistsPage(): void {
    this.artistsCurrentPage.update(page => page + 1);
    this.loadArtists();
  }
}
