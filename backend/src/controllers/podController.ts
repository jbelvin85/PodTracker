import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreatePodInput, UpdatePodInput } from '../schemas/podSchema';
import ApiError, { BadRequestError, NotFoundError } from '../utils/ApiError';

const prisma = new PrismaClient();

export const createPod = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, memberIds = [], deckIds = [] } = req.body as CreatePodInput;
    const userId = req.user!.id;

    const pod = await prisma.pod.create({
      data: {
        name,
        ownerId: userId,
        members: {
          connect: [...memberIds, userId].map((id) => ({ id })),
        },
        decks: {
          connect: deckIds.map((id) => ({ id })),
        },
      },
    });

    res.status(201).json(pod);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return next(new BadRequestError('Pod with that name already exists'));
    }
    next(error);
  }
};

export const getPods = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const pods = await prisma.pod.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
      include: {
        owner: true,
        members: true,
        decks: true,
      },
    });

    res.status(200).json(pods);
  } catch (error: any) {
    next(error);
  }
};

export const getPodById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const pod = await prisma.pod.findFirst({
      where: {
        id,
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
      include: {
        owner: true,
        members: true,
        decks: true,
      },
    });

    if (!pod) {
      return next(new NotFoundError('Pod not found'));
    }

    res.status(200).json(pod);
  } catch (error: any) {
    next(error);
  }
};

export const updatePod = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { name, memberIds, deckIds } = req.body as UpdatePodInput['body'];

    const pod = await prisma.pod.findFirst({
      where: { id, ownerId: userId },
    });

    if (!pod) {
      return next(new NotFoundError('Pod not found or you are not the owner'));
    }

    const updatedPod = await prisma.pod.update({
      where: { id },
      data: {
        name,
        members: {
          set: memberIds ? [...memberIds, userId].map((id) => ({ id })) : undefined,
        },
        decks: {
          set: deckIds ? deckIds.map((id) => ({ id })) : undefined,
        },
      },
    });

    res.status(200).json(updatedPod);
  } catch (error: any) {
    next(error);
  }
};

export const deletePod = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const pod = await prisma.pod.findFirst({
      where: { id, ownerId: userId },
    });

    if (!pod) {
      return next(new NotFoundError('Pod not found or you are not the owner'));
    }

    await prisma.pod.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};
