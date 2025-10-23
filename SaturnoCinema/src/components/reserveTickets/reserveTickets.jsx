import { useState } from "react";
import "./ReserveTickets.css";
import Notification from "../notifications/Notifications"; 

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const ReserveTickets = ({ showModal, onCloseModal, movieDetails }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [tickets, setTickets] = useState(1);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const pricePerTicket = 100;
  const total = pricePerTicket * tickets;

  if (!showModal) return null;

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleCancel = () => {
    setSelectedTime("");
    setTickets(1);
    onCloseModal();
  };

  const handleReserve = async () => {
    if (!selectedTime) {
      showNotification("Selecciona un horario", "error");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      showNotification("Debes iniciar sesión para reservar", "error");
      return;
    }

    const reserva = {
      userId: user.id,
      movieId: movieDetails.id,
      date: new Date().toISOString().split("T")[0],
      hour: selectedTime,
      tickets
    };

    try {
      const res = await fetch(`${baseUrl}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reserva),
      });

      if (!res.ok) throw new Error("Error en la reserva");

      showNotification("Reserva completa", "success");
      handleCancel();
    } catch (err) {
      console.error(err);
      showNotification("Error al reservar, intenta nuevamente", "error");
    }
  };

  return (
    <>
      <div className="reserve-overlay">
        <div className="reserve-card">
          <h2>Reservar Tickets</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Selecciona horario:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Selecciona un horario</option>
              {movieDetails.hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>

            <label>Cantidad de tickets:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
            />

            <p>Total ${total}</p>

            <div className="button-group">
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="btn-danger" onClick={handleReserve}>
                Confirmar reserva
              </button>
            </div>
          </form>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </>
  );
};

export default ReserveTickets;
