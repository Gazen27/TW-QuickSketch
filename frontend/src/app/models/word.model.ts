// categories
export interface Categories {
  data: string[];
}

// words
export interface SingleWord {
  id: string;
  text: string;
}

export interface Words {
  data: SingleWord[];
}