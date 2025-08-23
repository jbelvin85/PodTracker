import { z } from 'zod';

export const createDeckSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Deck name is required'),
    commander: z.string().min(1, 'Commander is required'),
    description: z.string().optional(),
  }),
});

export const updateDeckSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Deck name is required').optional(),
    commander: z.string().min(1, 'Commander is required').optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export type CreateDeckInput = z.infer<typeof createDeckSchema>['body'];
export type UpdateDeckInput = z.infer<typeof updateDeckSchema>;
