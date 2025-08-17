import { User } from '@prisma/client';

// Create a new type that is the User model but without the 'password' field.
export type AuthenticatedUser = Omit<User, 'password'>;

declare global {
  namespace Express {
    export interface Request {
      user?: AuthenticatedUser;
    }
  }
}