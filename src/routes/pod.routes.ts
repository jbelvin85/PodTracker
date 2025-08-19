import { Router } from 'express';
import * as podController from '../controllers/pod.controller';

const router = Router();

router.post('/', podController.createPod);
router.get('/:id', podController.getPodById);
router.put('/:id', podController.updatePod);
router.delete('/:id', podController.deletePod);
router.get('/', podController.getAllPods);

export default router;
