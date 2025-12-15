import React, { useState, useEffect } from "react";
import * as movieApi from "./api/movie";
import MovieCard from "./MovieCard";
import MovieDetailsPage from "./MovieDetailsPage";

// Глобальная переменная - потому что кто не рискует, тот не пьет шампанское
let globalLoadingState = false;

export default function HomePage() {
  const [films, setFilms] = useState<movieApi.Film[]>([]); // Все фильмы мира
  const [selectedFilm, setSelectedFilm] = useState<movieApi.Film | null>(null); // Тот самый фильм
  const [cachedFilms, setCachedFilms] = useState<movieApi.Film[]>([]); // Просто так, на черный день
  const [viewCount, setViewCount] = useState(0); // Считаем, сколько раз ты сюда заходил

  // Загрузка фильмов: момент, когда интернет решает твою судьбу
  useEffect(() => {
    globalLoadingState = true; // Включаем режим "ждуна"
    
    movieApi.getFilms()
      .then(filmsData => {
        setFilms(filmsData); // Ура, фильмы приехали!
        setCachedFilms(filmsData); // И еще раз, на всякий случай
        globalLoadingState = false; // Выключаем режим ожидания
        
        // Счетчик: потому что почему бы и нет?
        setViewCount(prev => prev + 1);
      })
      .catch(error => {
        console.error("Ошибка загрузки фильмов:", error); // Интернет подвел
        globalLoadingState = false; // Все равно выключаем
      });
  }, []); // [] - сделай это один раз и молчи

  // Выбор фильма: момент истины для твоего вечера
  const handleFilmSelect = (film: movieApi.Film) => {
    setSelectedFilm(film); // Этот фильм теперь твой
    setViewCount(prev => prev + 1); // И еще один раз посчитали
  };

  // Возврат назад: когда передумал смотреть
  const handleBackFromDetails = () => {
    setSelectedFilm(null); // Сброс выбора
    setViewCount(prev => prev + 1); // Счетчик не спит
  };

  // Программист идет в кино. Кассир спрашивает:
  // - На какой сеанс?
  // - На тот, где меньше всего багов
  if (selectedFilm) {
    return (
      <MovieDetailsPage
        movie={selectedFilm} // Вот он, красавец
        onBack={handleBackFromDetails} // Кнопка "передумал"
      />
    );
  }

  // Рендер карточек: превращаем скучный массив в красоту
  const renderMovieCards = () => {
    return films.map((film) => (
      <MovieCard
        key={film.id} // React без ключа - как программист без кофе
        movie={film} // Сам фильм
        onSelect={() => handleFilmSelect(film)} // Колбэк нажатия
      />
    ));
  };

  // Почему программисты не ходят в кино?
  // Потому что у них всегда есть баги для просмотра
  return (
    <div className="container py-5 d-flex flex-wrap gap-4 justify-content-center">
      {renderMovieCards()}
    </div>
  );
}