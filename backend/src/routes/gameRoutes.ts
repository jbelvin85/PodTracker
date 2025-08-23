import { Router } from 'express';
import { createGame, getGameById, updateGame, deleteGame, getAllGames } from '../controllers/gameController';
import validate from '../middleware/validate';
import { createGameSchema, updateGameSchema } from '../schemas/gameSchema';

const router = Router();

router.post('/games', validate(createGameSchema), createGame);
router.get('/games', getAllGames);
router.get('/games/:id', getGameById);
router.put('/games/:id', validate(updateGameSchema), updateGame);
router.delete('/games/:id', deleteGame);

export default router;