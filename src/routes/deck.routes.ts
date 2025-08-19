import { Router } from 'express';
import * as deckController from '../controllers/deck.controller';

const router = Router();

router.post('/', deckController.createDeck);
router.get('/:id', deckController.getDeckById);
router.put('/:id', deckController.updateDeck);
router.delete('/:id', deckController.deleteDeck);
router.get('/', deckController.getAllDecks);

export default router;
