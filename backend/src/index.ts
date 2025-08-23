import express, { Request, Response, NextFunction } from 'express';
import healthRoutes from './routes/health';
import userRoutes from './routes/userRoutes';
import deckRoutes from './routes/deckRoutes';
import podRoutes from './routes/podRoutes';
import gameRoutes from './routes/gameRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/pods', podRoutes);
app.use('/api/games', gameRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});