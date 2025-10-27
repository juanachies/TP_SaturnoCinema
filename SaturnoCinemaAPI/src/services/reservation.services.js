import Reservation from '../models/Reservation.js'
import User from '../models/User.js'
import Movie from '../models/Movie.js'


export const findReservations = async (req, res) => {
    const reservations = await Reservation.findAll({
        include: [
            { model: User, attributes: ['name', 'surname'] },
            { model: Movie, attributes: ['title'] }
        ]
    });
    res.json(reservations)
}


export const findUserReservations = async (req, res) => {
    const userId = req.user.id;

    const reservations = await Reservation.findAll({
        where: { userId },
        include: [
            { model: Movie, attributes: ['title'] },
            { model: User, attributes: ['name', 'surname'] }
        ]
    });

    res.json(reservations);
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


export const updateReservation = async (req, res) => {
    const {id} = req.params;
    const { userId, movieId, date, hour} = req.body;

    const reservation = await Reservation.findByPk(id);

    if (!reservation)
        return res.status(404).send({message: 'Reservation not found'})

    await reservation.update({
        userId, 
        movieId, 
        date, 
        hour
    })

    await reservation.save()

    res.json(reservation)
}


export const deleteReservation = async (req, res) => {
    const {id} = req.params;
    const reservation = await Reservation.findByPk(id);

    if (!reservation)
        return res.status(404).send({message: 'Reservation not found'})

    await reservation.destroy()

    res.send(`Reservation with id: ${id} deleted`)
}