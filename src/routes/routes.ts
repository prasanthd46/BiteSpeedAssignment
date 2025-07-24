import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';

const router = Router();

router.post('/identify', contactController);

export default router;