import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import healthRoutes from './routes/health';
import userRoutes from './routes/userRoutes';
import deckRoutes from './routes/deckRoutes';
import podRoutes from './routes/podRoutes';
import gameRoutes from './routes/gameRoutes';
import errorHandler from './middleware/errorHandler';
import { loginUser } from './controllers/userController';
import validate from './middleware/validate';
import { loginUserSchema } from './schemas/userSchema';
import envSchema from './schemas/envSchema'; // Import the new envSchema

// Validate environment variables at startup
try {
  envSchema.parse(process.env);
  console.log('Environment variables validated successfully.');
} catch (error) {
  console.error('❌ Invalid environment variables:');
  if (error instanceof z.ZodError) {
    error.errors.forEach(err => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
  } else {
    console.error(error);
  }
  process.exit(1); // Exit the process if environment variables are invalid
}

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; // Use validated PORT

app.use(express.json());
app.use(cors());

app.use('/api', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/login', validate(loginUserSchema), loginUser);
app.use('/api/decks', deckRoutes);
app.use('/api/pods', podRoutes);
app.use('/api/games', gameRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
