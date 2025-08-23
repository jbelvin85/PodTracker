import express, { Request, Response, NextFunction } from 'express';
import healthRoutes from './routes/health';
import userRoutes from './routes/userRoutes';
import deckRoutes from './routes/deckRoutes';
import podRoutes from './routes/podRoutes';
import gameRoutes from './routes/gameRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/pods', podRoutes);
app.use('/api/games', gameRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});