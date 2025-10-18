import { useState } from "react";
import "./ReserveTickets.css";

const ReserveTickets = ({ showModal, onCloseModal, movieDetails }) => {
  const [selectedTime, setSelectedTime] = useState("");

  const [tickets, setTickets] = useState(1);


  const pricePerTicket = 100;



  const total = pricePerTicket * tickets;

  if (!showModal) return null;

  const handleCancel = () => {
      setSelectedTime("");
      setTickets(1);
      onCloseModal(); 
  };

  const handleReserve = () => {
    if (!selectedTime) {
      alert("Selecciona un horario  ");
      return;
    }
const reserva = {
      movieId: movieDetails.id,           
      movieTitle: movieDetails.title,     
      movieHours: movieDetails.hours,      
      selectedTime: selectedTime,
      tickets,
      total,
    };


    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reserva),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Reserva  completa");
        handleCancel();
      })
      .catch(() => {
        alert("Error ");
      });
  };

  return (
    <div className="reserve-overlay">
      <div className="reserve-card">
        <h2>Reservar Tickets</h2>

        <form onSubmit={(e) => e.preventDefault()}>


          <label>Seleccionas horario:</label>
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
  <button
    type="button"
    className="btn-secondary"
    onClick={handleCancel}
  >
    Cancelar
  </button>
  <button
    type="button"
    className="btn-danger"
    onClick={handleReserve}>
    Confirmar reserva
  </button>
</div>
        </form>
      </div>
    </div>
  );
};

export default ReserveTickets;
