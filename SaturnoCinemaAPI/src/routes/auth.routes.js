import {Router} from 'express';
import { registerUser, loginUser, findUsers, updateUser, deleteUser } from '../services/auth.services.js';
import { verifyToken } from '../services/verify.token.js';
import { verifyRole } from '../services/verify.role.js';

const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', verifyToken, verifyRole([2]), findUsers);
router.put('/users/:id', verifyToken, verifyRole([2]), updateUser);
router.delete('/users/:id', verifyToken, verifyRole([2]), deleteUser);

export default router;