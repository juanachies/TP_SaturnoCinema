import {Router} from 'express';
import { registerUser } from '../services/register.services.js';
import { loginUser } from '../services/login.services.js';

const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;