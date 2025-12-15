import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/auth";

interface Props {
  onRegister: (token: { accessToken: string }) => void;
}

export default function RegisterPage({ onRegister }: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    age: 21,
    gender: "MALE" as "MALE" | "FEMALE",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await registerUser(form);
      onRegister(token);
      navigate("/");
    } catch {
      setError("Ошибка регистрации");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <form onSubmit={handleRegister} className="d-flex flex-column gap-3 w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Регистрация</h2>
        <input name="email" type="email" placeholder="Email" className="form-control" onChange={handleChange} />
        <input name="password" type="password" placeholder="Пароль" className="form-control" onChange={handleChange} />
        <input name="firstName" placeholder="Имя" className="form-control" onChange={handleChange} />
        <input name="lastName" placeholder="Фамилия" className="form-control" onChange={handleChange} />
        <input name="age" type="number" placeholder="Возраст" className="form-control" onChange={handleChange} />
        <select name="gender" className="form-select" onChange={handleChange}>
          <option value="MALE">Мужской</option>
          <option value="FEMALE">Женский</option>
        </select>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-success">Зарегистрироваться</button>
      </form>
    </div>
  );
}
