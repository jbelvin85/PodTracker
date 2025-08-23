import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CreateUserInput, LoginUserInput } from '../schemas/userSchema';
import { AuthRequest } from '../middleware/auth';
import ApiError, { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/ApiError';

const prisma = new PrismaClient();

export const createUser = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return next(new BadRequestError('User with that email or username already exists'));
    }
    next(error);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new UnauthorizedError('User not authenticated'));
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, username: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      return next(new NotFoundError('User not found'));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new UnauthorizedError('Invalid credentials'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new UnauthorizedError('Invalid credentials'));
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (error: any) {
    next(error);
  }
};
