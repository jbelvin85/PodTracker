import { Router } from 'express';
import { createSpell } from '../controllers/spellController';
import { validate } from '../middleware/validate';
import { createSpellSchema } from '../schemas/spellSchema';

const router = Router();

router.post('/spells', validate(createSpellSchema), createSpell);

export default router;