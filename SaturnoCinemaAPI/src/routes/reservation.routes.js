import { findReservations, createReservation } from "../services/reservation.services.js";
import { Router } from "express";
import { verifyToken } from "../services/verify.token.js";

const router = Router()

router.get('/reservations', verifyToken, findReservations)
router.post('/reservations', verifyToken, createReservation)

export default router;