import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
  JWT_SECRET: z.string().min(10, { message: "JWT_SECRET must be at least 10 characters long" }),
  PORT: z.string().transform(Number).pipe(z.number().min(1024).max(65535)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof envSchema>;

export default envSchema;
