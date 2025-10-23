import './reservationItem.css'

const ReservationItem = ({reservation}) => {
    return (
        <div className='reservation-item'>
            <h3>{reservation.movie?.title}</h3>
            <p><strong>Usuario:</strong> {reservation.user?.name} {reservation.user?.surname}</p>
            <p><strong>Día:</strong> {new Date(reservation.date).toLocaleDateString()}</p>
            <p><strong>Horario:</strong> {reservation.hour}</p>
            <button>MODIFICAR</button>
            <button>ELIMINAR</button>
        </div>
    )
}

export default ReservationItem