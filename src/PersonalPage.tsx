import React from "react";

interface PersonalPageProps {
  onBack: () => void;
}

const PersonalPage: React.FC<PersonalPageProps> = ({ onBack }) => {
  return (
    <div className="min-vh-100 bg-dark text-light d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-primary mb-4">Личная страница</h2>

      <div className="bg-secondary p-4 rounded w-50">
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input type="text" className="form-control" placeholder="Введите имя" />
        </div>

        <div className="mb-3">
          <label className="form-label">Фамилия:</label>
          <input type="text" className="form-control" placeholder="Введите фамилию" />
        </div>

        <button className="btn btn-primary mt-3" onClick={onBack}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default PersonalPage;
