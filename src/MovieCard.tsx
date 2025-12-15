import React from "react";
import * as movie from "./api/movie";

interface Props {
  movie: movie.Film;
  onSelect: () => void;
}

const MovieCard: React.FC<Props> = ({ movie, onSelect }) => (
  <div className="card" style={{ width: "18rem", cursor: "pointer" }} onClick={onSelect}>
    <img src={movie.imageUrl || "https://placehold.co/300x450"} className="card-img-top" alt={movie.title} />
    <div className="card-body">
      <h5 className="card-title">{movie.title}</h5>
      <p className="card-text">{movie.description.slice(0, 50)}...</p>
      <p className="card-text">
        <small>{movie.genre || "Жанр"} • {movie.durationMinutes} мин • {movie.ageRating}</small>
      </p>
    </div>
  </div>
);

export default MovieCard;
