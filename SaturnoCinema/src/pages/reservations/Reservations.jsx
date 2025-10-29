import { useEffect, useState } from "react";
import "./reservations.css";
import ReservationItem from "../../components/reservationItem/ReservationItem";
import EditReserve from "../../components/editReserve/EditReserve"; 
import Notification from "../../components/notifications/Notifications"; 

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Reservations = () => {
  const token = localStorage.getItem("token");
  const userType = JSON.parse(localStorage.getItem("user"))?.type;

  const [reservations, setReservations] = useState([]);
  const [movies, setMovies] = useState([]); 
  const [editingReservation, setEditingReservation] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const endpoint = userType === 0 ? "/user-reservations" : "/reservations";
    if (!token) return;

    fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener las reservas");
        return res.json();
      })
      .then(data => setReservations(data))
      .catch(err => {
        console.error(err);
        showNotification("No se pudieron cargar las reservas", "error");
      });
  }, [token, userType]);

  useEffect(() => {
    if (!token) return;
    fetch(`${baseUrl}/movies`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => {
        console.error("Error fetching movies:", err);
        showNotification("No se pudieron cargar las películas", "error");
      });
  }, [token]);

  const handleEditClick = (reservation) => {
    setEditingReservation(reservation);
  };

  const handleCloseEditModal = () => {
    setEditingReservation(null);
  };

  const handleUpdateSuccess = (updatedReservation) => {
    setReservations(prev =>
      prev.map(res => (res.id === updatedReservation.id ? updatedReservation : res))
    );
    handleCloseEditModal(); 
    showNotification("Reserva actualizada con éxito");
  };

  const handleReservationDeleted = (deletedReservationId) => {
    setReservations(prev => prev.filter(res => res.id !== deletedReservationId));
    showNotification("Reserva eliminada con éxito");
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  return (
    <div className="reservations">
      <h1>RESERVAS</h1>

      <div>
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onEdit={handleEditClick}
              onReservationDeleted={() => handleReservationDeleted(reservation.id)}
            />
          ))
        ) : (
          <p>No tiene reservas todavía</p>
        )}
      </div>

      <EditReserve
        showModal={!!editingReservation}
        onCloseModal={handleCloseEditModal}
        reservationData={editingReservation}
        movies={movies} 
        onUpdateSuccess={handleUpdateSuccess}
      />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
    </div>
  );
};

export default Reservations;
