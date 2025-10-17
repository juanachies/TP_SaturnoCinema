import Reservation from '../models/Reservation.js'

export const findReservations = async (req, res) => {
    const reservations = await Reservation.findAll();
    res.json(reservations)
}

export const createReservation = async(req, res) => {
    const {userId, movieId, date, hour} = req.body;

    if (!userId || !movieId || !date || !hour)
        return res.status(400).send({message: 'userId, movieId, date, hour fields are required'})

    const newReservation = await Reservation.create({
        userId, 
        movieId, 
        date, 
        hour
    })

    res.json(newReservation)
} 