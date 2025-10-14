import {Router} from 'express';
import { createMovie, findMovie, findMovies, deleteMovie, updateMovie } from '../services/movie.services.js';
import { verifyToken } from '../services/verify.token.js';

const router = Router();

router.get('/movies', findMovies)
router.get('/movies/:id', findMovie)
router.post('/movies', verifyToken, createMovie)
router.put('/movies/:id', verifyToken, updateMovie)
router.delete('/movies/:id', verifyToken, deleteMovie)

export default router;