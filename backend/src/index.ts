import express from 'express';
import healthRoutes from './routes/health';
import spellRoutes from './routes/spell';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// API Routes
app.use('/api', healthRoutes);
app.use('/api', spellRoutes);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;