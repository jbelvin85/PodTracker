import dotenv from 'dotenv';

// Load environment variables from .env.test
dotenv.config({ path: '.env.test' });

console.log('DATABASE_URL in setup.ts:', process.env.DATABASE_URL);