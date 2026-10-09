// players
export interface Player {
  id: string;
  username: string;
  guessedScore: number;
}

export interface PlayersLeaderboard {
  items: Player[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// artists
export interface Artist {
  id: string;
  username: string;
  drawingScore: number;
}

export interface ArtistsLeaderboard {
  items: Artist[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}