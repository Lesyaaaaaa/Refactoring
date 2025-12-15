export interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  ageRating: string;
  genre?: string;
  imageUrl?: string;
  rating?: number;
}


export interface Session {
  id: number;
  movieId: number;
  hallId: number;
  date: string;
  time: string;
}

export interface Seat {
  id: number;
  row: number;
  number: number;
  category: "VIP" | "Standard";
  price: number;
  isTaken: boolean;
}
  
