import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

// New schema for updating user profile
export const updateUserProfileSchema = z.object({
  body: z.object({
    displayName: z.string().min(1, 'Display name cannot be empty').optional(),
    bio: z.string().max(255, 'Bio cannot exceed 255 characters').optional(),
    avatarUrl: z.string().url('Invalid URL for avatar').optional(),
  }).partial(), // .partial() makes all fields optional for update
});


export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>['body'];
