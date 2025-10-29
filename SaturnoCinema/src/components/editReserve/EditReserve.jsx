import React, { useState, useEffect } from 'react';

function EditReserve({ showModal, onCloseModal, reservationData, movies, onUpdateSuccess }) {
  
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [tickets, setTickets] = useState(1);
  
  useEffect(() => {
    if (reservationData) {
      
      setSelectedMovieId(reservationData?.movie?.id?.toString() || "");
      setSelectedTime(reservationData.hour || "");
      setTickets(reservationData.tickets || 1);
    } else {
      setSelectedMovieId("");
      setSelectedTime("");
      setTickets(1);
    }
  }, [reservationData]); 

  const handleMovieChange = (e) => {
    setSelectedMovieId(e.target.value);
    setSelectedTime("");
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleTicketsChange = (e) => {
    setTickets(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMovieId || !selectedTime) {
      alert("Por favor, selecciona una película y un horario.");
      return;
    }
    
    const numericMovieId = parseInt(selectedMovieId, 10);
   
    const updatedMovie = (movies || []).find(m => m.id === numericMovieId);

    onUpdateSuccess({
      ...reservationData,
      hour: selectedTime,
      tickets: tickets,
      movieId: numericMovieId,
      movie: updatedMovie,
    });
  };

  if (!showModal) {
    return null;
  }

  
  const movieArray = movies || [];
  const selectedMovieDetails = movieArray.find(m => m.id.toString() === selectedMovieId);
  const availableTimes = selectedMovieDetails?.hours || [];
  
  const timeOptions = new Set(availableTimes);
  
 
  if (reservationData?.hour && reservationData?.movie?.id?.toString() === selectedMovieId) {
    timeOptions.add(reservationData.hour);
  }
  const sortedTimes = Array.from(timeOptions).sort();

  return (
    <div className="reserve-overlay" onClick={onCloseModal}> 
      <div className="reserve-card" onClick={(e) => e.stopPropagation()}> 
        
        <h2>Editar Reserva</h2>
        
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="movie-select">Película:</label>
          <select
            id="movie-select"
            value={selectedMovieId}
            onChange={handleMovieChange}
            required
          >
            <option value="" disabled>Selecciona una película</option>
            {movieArray.map(movie => (
              <option key={movie.id} value={movie.id.toString()}>
                {movie.title}
              </option>
            ))}
          </select>

          <label htmlFor="time-select">Horario:</label>
          <select
            id="time-select"
            value={selectedTime}
            onChange={handleTimeChange}
            required
            disabled={!selectedMovieId} 
          >
            <option value="" disabled>
              {availableTimes.length > 0 ? "Selecciona un horario" : (selectedMovieId ? "No hay horarios" : "Elige una película")}
            </option>
            
            {sortedTimes.map(time => (
              <option key={time} value={time}>
                {time}
               
                {reservationData?.hour === time && 
                 reservationData?.movie?.id?.toString() === selectedMovieId &&
                 !availableTimes.includes(time) && 
                 " (horario original)"}
              </option>
            ))}
          </select>
          
          <label htmlFor="tickets-input">Entradas:</label>
          <input
            id="tickets-input"
            type="number"
            value={tickets}
            onChange={handleTicketsChange}
            min="1"
            max="10"
            required
          />

          <div className="button-group">
            <button type="button" onClick={onCloseModal} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-danger" disabled={!selectedTime || !selectedMovieId}>
              Actualizar Reserva
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default EditReserve;