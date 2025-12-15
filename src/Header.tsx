import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  token: string | null;
  onLogout: () => void;
}

export default function Header({ token, onLogout }: HeaderProps) {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-light">
      <h2>🎞 My Cinema</h2>
      <nav>
        <Link to="/home" className="text-light me-3">
          Главная
        </Link>
        {token ? (
          <>
            <Link to="/profile" className="text-light me-3">
              Профиль
            </Link>
            <button
              onClick={onLogout}
              className="btn btn-outline-light btn-sm"
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-light me-3">
              Вход
            </Link>
            <Link to="/register" className="text-light">
              Регистрация
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
