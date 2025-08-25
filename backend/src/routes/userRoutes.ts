import { Router } from 'express';
import { createUser, getCurrentUser } from '../controllers/userController';
import validate from '../middleware/validate';
import { createUserSchema } from '../schemas/userSchema';
import auth from '../middleware/auth';

const router = Router();

router.post('/', validate(createUserSchema), createUser);
router.get('/me', auth, getCurrentUser);

export default router;
