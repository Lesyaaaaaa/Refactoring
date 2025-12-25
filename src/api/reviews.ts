import { apiClient, authHeaders } from "./http";

export interface ReviewPayload {
  rating: number;
  text: string;
}

export const addFilmReview = (
  filmId: number,
  review: ReviewPayload,
  token: string
) => {
  return apiClient.post(
    `/films/${filmId}/reviews`,
    { rating: review.rating, text: review.text },
    { headers: authHeaders(token) }
  );
};