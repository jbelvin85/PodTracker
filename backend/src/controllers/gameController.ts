import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateGameInput, UpdateGameInput } from '../schemas/gameSchema';

const prisma = new PrismaClient();

export const createGame = async (req: AuthRequest, res: Response) => {
  try {
    const { podId, playerIds, startTime } = req.body as CreateGameInput;
    const userId = req.user!.id;

    // Verify that the user is a member of the pod
    const pod = await prisma.pod.findFirst({
      where: {
        id: podId,
        OR: [
          { ownerId: userId },
          { members: { some: { id: userId } } },
        ],
      },
    });

    if (!pod) {
      return res.status(403).json({ message: 'User is not authorized to create a game in this pod' });
    }

    const game = await prisma.game.create({
      data: {
        podId,
        startTime: startTime ? new Date(startTime) : new Date(),
        players: {
          connect: playerIds.map((id) => ({ id })),
        },
      },
    });

    res.status(201).json(game);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getGames = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const games = await prisma.game.findMany({
      where: {
        players: { some: { id: userId } },
      },
      include: {
        pod: true,
        players: true,
      },
    });

    res.status(200).json(games);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getGameById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const game = await prisma.game.findFirst({
      where: {
        id,
        players: { some: { id: userId } },
      },
      include: {
        pod: true,
        players: true,
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found or user not authorized' });
    }

    res.status(200).json(game);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateGame = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { podId, playerIds, endTime, winnerId } = req.body as UpdateGameInput;

    const game = await prisma.game.findFirst({
      where: {
        id,
        players: { some: { id: userId } },
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found or user not authorized' });
    }

    const updatedGame = await prisma.game.update({
      where: { id },
      data: {
        podId,
        endTime: endTime ? new Date(endTime) : undefined,
        winnerId,
        players: {
          set: playerIds ? playerIds.map((id) => ({ id })) : undefined,
        },
      },
    });

    res.status(200).json(updatedGame);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteGame = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const game = await prisma.game.findFirst({
      where: {
        id,
        players: { some: { id: userId } },
      },
    });

    if (!game) {
      return res.status(404).json({ message: 'Game not found or user not authorized' });
    }

    await prisma.game.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
