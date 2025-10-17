import {Router} from 'express';
import { createMovie, findMovie, findMovies, deleteMovie, updateMovie } from '../services/movie.services.js';
import { verifyToken } from '../services/verify.token.js';
import { verifyRole } from '../services/verify.role.js';

const router = Router();

router.get('/movies', findMovies)
router.get('/movies/:id', findMovie)
router.post('/movies', verifyToken, verifyRole([1, 2]), createMovie)
router.put('/movies/:id', verifyToken, verifyRole([1, 2]), updateMovie)
router.delete('/movies/:id', verifyToken, verifyRole([1, 2]), deleteMovie)

export default router;