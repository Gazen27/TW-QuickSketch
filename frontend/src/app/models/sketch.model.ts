export interface CreateSketch {
  wordId: string;
  drawing: string;
}

export interface Sketch {
  id: string;
  authorId: string;
  wordId: string;
  drawing: string;
}

export interface ExploreSketch extends Sketch {
  createdAt: string;
  guessCount: number;
  author: {
    username: string;
  };
}

export interface ExploreSketches {
  items: ExploreSketch[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}