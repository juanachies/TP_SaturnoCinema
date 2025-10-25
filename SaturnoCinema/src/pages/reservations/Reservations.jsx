import { useEffect, useState } from "react"
import './reservations.css'
import ReservationItem from "../../components/reservationItem/ReservationItem";

const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const Reservations = () => {
    const token = localStorage.getItem("token");
    const userType = JSON.parse(localStorage.getItem("user"))?.type

    const [reservations, setReservations] = useState([])

    useEffect(() => {
        if (token && userType == 0){
            fetch(`${baseUrl}/user-reservations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener las reservas');
                }
                return res.json();
            })
            .then((data) => {
                setReservations(data);
            })
            .catch((err) => console.log(err));
        } else {
            fetch(`${baseUrl}/reservations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Error al obtener las reservas');
                }
                return res.json();
            })
            .then((data) => {
                setReservations(data);
            })
            .catch((err) => console.log(err));
        }
    }, [token, userType])
        

    return (
        <div className="reservations">
            <h1>RESERVAS</h1>
            <div>
                {
                    reservations.map((reservation) => (
                        <ReservationItem
                            key={reservation.id}
                            reservation={reservation}
                        />
                    ))
                }
            </div>
            
        </div>
    )
}

export default Reservations