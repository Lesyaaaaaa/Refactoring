import React from "react";

interface Props {
  genre: string;
  ageRating: string;
  date: string;
  onGenreChange: (g: string) => void;
  onAgeChange: (a: string) => void;
  onDateChange: (d: string) => void;
  genres: string[];
  ageRatings: string[];
  dates: string[]; 
}

const MovieFilter: React.FC<Props> = ({
  genre,
  ageRating,
  date,
  onGenreChange,
  onAgeChange,
  onDateChange,
  genres,
  ageRatings,
  dates,
}) => {
  return (
    <div className="d-flex gap-3 mb-4 flex-wrap justify-content-center">
      <select
        className="form-select w-auto"
        value={genre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="all">Все жанры</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        className="form-select w-auto"
        value={ageRating}
        onChange={(e) => onAgeChange(e.target.value)}
      >
        <option value="all">Все возрастные рейтинги</option>
        {ageRatings.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <select
        className="form-select w-auto"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
      >
        <option value="all">Все даты</option>
        {dates.map((d) => (
          <option key={d} value={d}>
            {new Date(d).toLocaleDateString("ru-RU")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MovieFilter;
