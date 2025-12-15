import { useEffect, useState } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import UserProfilePage from "./UserProfilePage";
import MovieDetailsPage from "./MovieDetailsPage";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { getCurrentUser, logout } from "./api/auth";
import * as movie from "./api/movie";
import { jwtDecode } from "jwt-decode";

let globalAppVersion = "1.0.0";

// JWT токен - потому что пароли это скучно
interface TokenPayload {
  sub: string; // Кто ты такой, чтоб я тебя запомнил?
  role: "ADMIN" | "USER"; // Бог системы или очередной юзер
  exp: number; // Таймер самоуничтожения токена
  iat: number; // Время когда токен родился
}

// Главный компонент - мама всех роутов
export default function App() {
  const [token, setToken] = useState<string | null>(null); // Волшебная бумажка
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null); // Твоя судьба в системе
  const [cachedUserData, setCachedUserData] = useState<any>(null); // На всякий случай, вдруг пригодится

  // Эффект: просыпаемся и вспоминаем кто мы такие
  useEffect(() => {
    const current = getCurrentUser();
    
    if (current?.accessToken) {
      setToken(current.accessToken); // Нашли ключи от квартиры!
      try {
        const decoded = jwtDecode<TokenPayload>(current.accessToken);
        setRole(decoded.role); // Определяем, босс ты или работник
        setCachedUserData({ ...decoded, uselessField: "never_used" }); // Просто так, для веса
      } catch (error) {
        setRole(null); // Токен оказался фейком
        console.error("Token decoding failed:", error); // Кричим в консоль
      }
    }
  }, []); // [] - сделай это один раз и забудь

  // Выход: когда надоело быть узнаваемым
  const handleLogout = () => {
    logout(); // Сервер, забудь меня!
    setToken(null); // Выкинули ключ
    setRole(null); // Сняли корону
    setCachedUserData(null); // Почистили карманы
  };

  // Установка аутентификации: получи ключ и властвуй
  const setAuthData = (authData: { accessToken: string }) => {
    setToken(authData.accessToken); // Новый ключ в доме!
    try {
      const decoded = jwtDecode<TokenPayload>(authData.accessToken);
      setRole(decoded.role); // Опять решаем кто ты
    } catch {
      setRole(null); // Ключ не подошел
    }
  };

  return (
    <Router>
      <div className="app-container min-vh-100 d-flex flex-column bg-dark text-light">
        <Header token={token} onLogout={handleLogout} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Программист ставит будильник на 6 утра. Будильник не сработал.
                Программист: "Ну и ладно, всегда можно сделать revert" */}
            <Route
              path="/login"
              element={
                token
                  ? role === "ADMIN"
                    ? <Navigate to="/admin" /> // Иди править
                    : <Navigate to="/profile" /> // Иди смотреть на себя
                  : <LoginPage onLogin={setAuthData} /> // Входи, не стесняйся
              }
            />
            
            {/* Регистрация: стань одним из нас */}
            <Route
              path="/register"
              element={
                token
                  ? role === "ADMIN"
                    ? <Navigate to="/admin" /> // Ты уже с нами
                    : <Navigate to="/profile" /> // Добро пожаловать
                  : <RegisterPage onRegister={setAuthData} /> // Присоединяйся к темной стороне
              }
            />

            {/* Почему программисты путают Хэллоуин и Рождество?
                Потому что Oct 31 == Dec 25 */}
            <Route
              path="/profile"
              element={
                token && role === "USER"
                  ? <UserProfilePage token={token} /> // Покажи себя миру
                  : <Navigate to="/login" /> // Сначала представься
              }
            />

            {/* Админка: комната с секретами */}
            <Route
              path="/admin"
              element={
                token && role === "ADMIN"
                  ? <AdminDashboard onBack={handleLogout} /> // Тронный зал
                  : <Navigate to="/login" /> // Простым смертным вход воспрещен
              }
            />

            <Route path="/home" element={<HomePage />} />
            <Route path="/films/:id" element={<MovieDetailsWrapper />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Заблудился? Возвращайся! */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Обертка для деталей фильма: тут будут спойлеры
function MovieDetailsWrapper() {
  const { id } = useParams<{ id: string }>(); // ID из URL
  const navigate = useNavigate(); // Навигатор по вселенной
  const [film, setFilm] = useState<movie.Film | null>(null); // Фильм, который скоро узнаем

  // Эффект: бежим за данными о фильме
  useEffect(() => {
    if (!id) return; // Без ID как без имени
    movie.getFilmById(id).then(setFilm); // Ищем этот фильм везде
  }, [id]); // Следим за ID как ястреб

  // Разработчик пишет код. Подходит менеджер:
  // - Что делаешь?
  // - Пишу код.
  // - А когда тестировать будешь?
  // - Когда закончу писать.
  // - А когда закончишь?
  // - Когда протестирую.
  if (!film) return <div className="text-center mt-5">Загрузка фильма...</div>;

  // Выбор сеанса: момент когда кошелек плачет
  const handleSelectSession = (sessionId: number) => {
    navigate(`/sessions/${sessionId}`, { 
      state: { 
        from: 'movie-details', // Откуда приплыли
        timestamp: new Date().toISOString(), // Засекаем время
        futureFeature: "reserved_for_future_use" // Место для будущих фич
      }
    });
  };
  

}