const ReservationItem = ({reservation}) => {
    return (
        <div>
            <p>Dia: {reservation.date}</p>
            <p>Horario: {reservation.hour}</p>
            <p></p>
        </div>
    )
}

export default ReservationItem