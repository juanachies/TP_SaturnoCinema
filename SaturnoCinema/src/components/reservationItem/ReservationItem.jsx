import './reservationItem.css';
import { useState } from 'react';
import ConfirmModal from '../confirmModal/ConfirmModal'; 

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const ReservationItem = ({ reservation, onEdit, onReservationDeleted }) => {
  const token = localStorage.getItem("token");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = async () => {
    console.log("Intentando eliminar reserva:", reservation.id);
    try {
      const res = await fetch(`${baseUrl}/reservations/${reservation.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      
      console.log("Respuesta del servidor:", res.status);
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al eliminar la reserva");
      }

      // Llamar al callback para actualizar la lista en el componente padre
      onReservationDeleted(reservation.id);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error al eliminar:", error.message);
      alert("No se pudo eliminar la reserva: " + error.message);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className='reservation-item'>
      <h3>{reservation.movie?.title}</h3>
      <p>Usuario: {reservation.user?.name} {reservation.user?.surname}</p>
      <p>Día: {new Date(reservation.date).toLocaleDateString()}</p>
      <p>Horario: {reservation.hour}</p>
      <button onClick={() => onEdit(reservation)}>
        MODIFICAR
      </button>
      <button onClick={() => setShowConfirmModal(true)}>
        ELIMINAR
      </button>
      
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ReservationItem;