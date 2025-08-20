import express from 'express';
import healthRoutes from './routes/health';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON body parsing

app.use('/api', healthRoutes); // Use the health routes under /api

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
