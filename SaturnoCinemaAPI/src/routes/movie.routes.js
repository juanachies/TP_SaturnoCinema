import {Router} from 'express';
import { createMovie, findMovie, findMovies, deleteMovie, updateMovie } from '../services/movie.services';

const router = Router();

router.get('/movies', findMovies)
router.get('/movies/:id', findMovie)
router.post('/movies', createMovie)
router.put('/movies/:id', updateMovie)
router.delete('/movies/:id', deleteMovie)

export default router;