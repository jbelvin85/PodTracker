import { Router } from 'express';
import { createGame, getGames, getGameById, updateGame, deleteGame } from '../controllers/gameController';
import auth from '../middleware/auth';
import validate from '../middleware/validate';
import { createGameSchema, updateGameSchema } from '../schemas/gameSchema';

const router = Router();

router.use(auth);

router.post('/', validate(createGameSchema), createGame);
router.get('/', getGames);
router.get('/:id', getGameById);
router.put('/:id', validate(updateGameSchema), updateGame);
router.delete('/:id', deleteGame);

export default router;
