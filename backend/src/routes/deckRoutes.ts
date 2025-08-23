import { Router } from 'express';
import { createDeck, getDecks, getDeckById, updateDeck, deleteDeck } from '../controllers/deckController';
import auth from '../middleware/auth';
import validate from '../middleware/validate';
import { createDeckSchema, updateDeckSchema } from '../schemas/deckSchema';

const router = Router();

router.use(auth);

router.post('/', validate(createDeckSchema), createDeck);
router.get('/', getDecks);
router.get('/:id', getDeckById);
router.put('/:id', validate(updateDeckSchema), updateDeck);
router.delete('/:id', deleteDeck);

export default router;
