import { z } from 'zod';

export const createSpellSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    level: z.number().min(0),
  }),
});