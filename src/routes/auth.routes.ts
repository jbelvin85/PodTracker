import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../../auth.schema';

const router = Router();

// Define authentication routes with validation
router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;