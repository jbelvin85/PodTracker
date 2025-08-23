import { z } from 'zod';

export const createPodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Pod name is required'),
    memberIds: z.array(z.string()).optional(),
    deckIds: z.array(z.string()).optional(),
  }),
});

export const updatePodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Pod name is required').optional(),
    memberIds: z.array(z.string()).optional(),
    deckIds: z.array(z.string()).optional(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export type CreatePodInput = z.infer<typeof createPodSchema>['body'];
export type UpdatePodInput = z.infer<typeof updatePodSchema>;
