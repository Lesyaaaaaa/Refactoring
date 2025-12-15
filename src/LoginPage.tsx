import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api/auth";

interface Props {
  onLogin: (token: { accessToken: string }) => void;
}

export default function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await loginUser({ email, password });
      onLogin(token);
      navigate("/profile");
    } catch {
      setError("Неверные данные");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Вход</h2>
        <input
          type="email"
          placeholder="Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Войти</button>
      </form>
    </div>
  );
}
