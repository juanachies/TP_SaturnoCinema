import { findReservations, findUserReservations, createReservation, updateReservation, deleteReservation } from "../services/reservation.services.js";
import { Router } from "express";
import { verifyToken } from "../services/verify.token.js";

const router = Router()

router.get('/reservations', verifyToken, findReservations)
router.get('/user-reservations', verifyToken, findUserReservations)
router.post('/reservations', verifyToken, createReservation)
router.put('/reservations/:id', verifyToken, updateReservation)
router.delete('/reservations/:id', verifyToken, deleteReservation)


export default router;