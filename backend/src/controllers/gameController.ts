import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateGameInput, UpdateGameInput } from '../schemas/gameSchema';
import { NotFoundError } from '../utils/ApiError';

const prisma = new PrismaClient();

export const createGame = async (req: Request<{}, {}, CreateGameInput>, res: Response, next: NextFunction) => {
  try {
    const { podId, playerIds, startTime } = req.body;

    const game = await prisma.game.create({
      data: {
        pod: { connect: { id: podId } },
        players: { connect: playerIds.map(id => ({ id })) },
        startTime: startTime ? new Date(startTime) : new Date(),
      },
    });
    res.status(201).json(game);
  } catch (error: any) {
    next(error);
  }
};

export const getGameById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const game = await prisma.game.findUnique({
      where: { id },
      include: { pod: true, players: true },
    });

    if (!game) {
      return next(new NotFoundError('Game not found'));
    }
    res.status(200).json(game);
  } catch (error: any) {
    next(error);
  }
};

export const updateGame = async (req: Request<{ id: string }, {}, UpdateGameInput>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { podId, playerIds, endTime, winnerId } = req.body;

    const game = await prisma.game.update({
      where: { id },
      data: {
        pod: podId ? { connect: { id: podId } } : undefined,
        players: playerIds ? { set: playerIds.map(playerId => ({ id: playerId })) } : undefined,
        endTime: endTime ? new Date(endTime) : undefined,
        winner: winnerId ? { connect: { id: winnerId } } : undefined,
      },
    });
    res.status(200).json(game);
  } catch (error: any) {
    next(error);
  }
};

export const deleteGame = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.game.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await prisma.game.findMany({
      include: { pod: true, players: true, winner: true },
    });
    res.status(200).json(games);
  } catch (error: any) {
    next(error);
  }
};