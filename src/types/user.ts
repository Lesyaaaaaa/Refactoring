import * as movie from "./movie";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
   password?: string;
  role?: "admin" | "client";
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
}

export interface Purchase {
  id: number;
  movie: movie.Movie;
  session: movie.Session;
  seats: movie.Seat[];
  totalPrice: number;
}

export interface Review {
  movieId: number;
  rating: number; 
  text: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  password?: string;
  purchases: Purchase[];
  reviews: Review[];
}