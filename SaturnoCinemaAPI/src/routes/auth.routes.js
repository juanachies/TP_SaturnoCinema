import {Router} from 'express';
import { registerUser, loginUser, findUsers, updateUser, deleteUser } from '../services/auth.services.js';
import { verifyToken } from '../services/verify.token.js';

const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, findUsers);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;