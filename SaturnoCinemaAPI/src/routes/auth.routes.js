import {Router} from 'express';
import { registerUser, loginUser, findUsers, updateUser, deleteUser } from '../services/auth.services.js';

const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', findUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;