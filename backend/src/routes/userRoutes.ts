import { Router } from 'express';
import { createUser, loginUser, getCurrentUser } from '../controllers/userController';
import validate from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/userSchema';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', validate(createUserSchema), createUser);
router.post('/login', validate(loginUserSchema), loginUser);
router.get('/me', auth, getCurrentUser);

export default router;
