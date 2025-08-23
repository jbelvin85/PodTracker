import { z } from 'zod';

export const createGameSchema = z.object({
  podId: z.string().uuid(),
  playerIds: z.array(z.string().uuid()).min(1),
  startTime: z.string().datetime().optional(),
});

export const updateGameSchema = z.object({
  podId: z.string().uuid().optional(),
  playerIds: z.array(z.string().uuid()).min(1).optional(),
  endTime: z.string().datetime().optional(),
  winnerId: z.string().uuid().optional(),
  // Add more fields as needed for game state updates (e.g., life totals, turn, etc.)
});

export type CreateGameInput = z.infer<typeof createGameSchema>;
export type UpdateGameInput = z.infer<typeof updateGameSchema>;
