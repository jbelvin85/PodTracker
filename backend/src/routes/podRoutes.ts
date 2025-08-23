import { Router } from 'express';
import { createPod, getPods, getPodById, updatePod, deletePod } from '../controllers/podController';
import auth from '../middleware/auth';
import validate from '../middleware/validate';
import { createPodSchema, updatePodSchema } from '../schemas/podSchema';

const router = Router();

router.use(auth);

router.post('/', validate(createPodSchema), createPod);
router.get('/', getPods);
router.get('/:id', getPodById);
router.put('/:id', validate(updatePodSchema), updatePod);
router.delete('/:id', deletePod);

export default router;
