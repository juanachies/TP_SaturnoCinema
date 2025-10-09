import {Router} from 'express';
import { registerUser } from '../services/register.services';
import { loginUser } from '../services/login.services';

const router = Router()

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;