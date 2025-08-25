import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];

// New schema for updating user profile
export const updateUserProfileSchema = z.object({
  body: z.object({
    displayName: z.string().min(1, 'Display name cannot be empty').optional(),
    bio: z.string().max(255, 'Bio cannot exceed 255 characters').optional(),
    avatarUrl: z.string().url('Invalid URL for avatar').optional(),
  }).partial(), // .partial() makes all fields optional for update
});


export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>['body'];
