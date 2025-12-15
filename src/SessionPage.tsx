import React, { useEffect, useState } from "react";
import { getSessionById, getHallPlan } from "./api/session";

interface Props {
  sessionId: string;
  onBack: () => void;
}

export interface Seat {
  id: string;
  row: number;
  number: number;
  categoryId: string;
  status: string;
}

export interface Category {
  id: string;
  name: string;
  priceCents: number;
}

export interface HallPlan {
  hallId: string;
  rows: number;
  seats: Seat[];
  categories: Category[];
}

const SessionPage: React.FC<Props> = ({ sessionId, onBack }) => {
  const [plan, setPlan] = useState<HallPlan | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSessionById(sessionId);
        const planData = await getHallPlan(session.hallId);
        setPlan(planData);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sessionId]);

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  if (loading) {
    return (
      <div className="text-center text-light py-5">
        <h3>Загрузка данных...</h3>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center text-light py-5">
        <h3>План зала не найден</h3>
      </div>
    );
  }

  const rows = Array.from(new Set(plan.seats.map((s) => s.row))).sort((a, b) => a - b);
  const getCategory = (catId: string) => plan.categories.find((c) => c.id === catId);

  const totalPrice = selectedSeats.reduce((sum, id) => {
    const seat = plan.seats.find((s) => s.id === id);
    if (!seat) return sum;
    const cat = getCategory(seat.categoryId);
    return sum + (cat ? cat.priceCents / 100 : 0);
  }, 0);

  return (
    <div className="app-container min-vh-100 d-flex flex-column bg-dark text-light">
      <div className="container py-5">
        <button className="btn btn-outline-light mb-4" onClick={onBack}>
          ← Назад
        </button>

        <h2 className="text-center text-primary mb-4">Схема зала — Зал {plan.hallId}</h2>

        <div className="d-flex flex-column align-items-center mb-4" style={{ gap: "10px" }}>
          {rows.map((rowNum) => {
            const rowSeats = plan.seats
              .filter((s) => s.row === rowNum)
              .sort((a, b) => a.number - b.number);

            return (
              <div
                key={rowNum}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${rowSeats.length}, 50px)`,
                  gap: "5px",
                }}
              >
                {rowSeats.map((seat) => {
                  const category = getCategory(seat.categoryId);
                  const isSelected = selectedSeats.includes(seat.id);
                  const isTaken = seat.status !== "AVAILABLE";

                  const color = isTaken
                    ? "btn-secondary"
                    : isSelected
                    ? "btn-success"
                    : category?.name?.toLowerCase().includes("vip")
                    ? "btn-primary"
                    : "btn-outline-light";

                  return (
                    <button
                      key={seat.id}
                      className={`btn ${color}`}
                      style={{ width: "50px", height: "50px" }}
                      disabled={isTaken}
                      onClick={() => handleSeatClick(seat.id)}
                      title={`${category?.name || "Место"} — ${
                        category ? category.priceCents / 100 : 0
                      } ₽`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="text-center mb-3">
          <p>
            <strong>Выбрано мест:</strong> {selectedSeats.length}
          </p>
          <p>
            <strong>Итого:</strong> {totalPrice} ₽
          </p>
          <button
            className="btn btn-primary px-5"
            disabled={selectedSeats.length === 0}
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
