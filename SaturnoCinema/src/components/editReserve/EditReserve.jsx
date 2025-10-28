
import { useState, useEffect } from "react";
import "./ReserveTickets.css"; 
import Notification from "../notifications/Notifications";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const EditReserve = ({ showModal, onCloseModal, reservationData, movieDetails, onUpdateSuccess }) => {
  

  const [selectedTime, setSelectedTime] = useState("");
  const [tickets, setTickets] = useState(1);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const pricePerTicket = 100; 
  const total = pricePerTicket * tickets;

  
  useEffect(() => {
    if (reservationData) {
      setSelectedTime(reservationData.hour);
      setTickets(reservationData.tickets);
    }
  }, [reservationData]); 

  if (!showModal) return null; 

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleCancel = () => {
    onCloseModal(); 
  };

  const handleUpdate = async () => {
    if (!selectedTime) {
      showNotification("Selecciona un horario", "error");
      return;
    }

    const updatedReservation = {
     
      ...reservationData, 
      
      hour: selectedTime,
      tickets: tickets
    };

    try {
      const res = await fetch(`${baseUrl}/reservations/${reservationData.id}`, { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedReservation),
      });

      if (!res.ok) throw new Error("Error en la actualización");

      const data = await res.json();
      showNotification("Reserva actualizada", "success");
      
    
      onUpdateSuccess(data); 
      
    } catch (err) {
      console.error(err);
      showNotification("Error al actualizar, intenta nuevamente", "error");
    }
  };

  return (
    <>
      <div className="reserve-overlay">
        <div className="reserve-card">
          <h2>Editar Reserva</h2>
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
              <button type="button" className="btn-danger" onClick={handleUpdate}>
                Confirmar cambios
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

export default EditReserve;