import {Router} from 'express';
import { contactMessage } from '../services/contact.service.js';

const router = Router()

router.post('/contact', contactMessage);

export default router;