import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { CreateDeckInput, UpdateDeckInput } from '../schemas/deckSchema';
import { NotFoundError } from '../utils/ApiError';

const prisma = new PrismaClient();

export const createDeck = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, commander, description } = req.body as CreateDeckInput;
    const userId = req.user!.id;

    const deck = await prisma.deck.create({
      data: {
        name,
        commander,
        description,
        ownerId: userId,
      },
    });

    res.status(201).json(deck);
  } catch (error: any) {
    next(error);
  }
};

export const getDecks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const decks = await prisma.deck.findMany({
      where: { ownerId: userId },
    });

    res.status(200).json(decks);
  } catch (error: any) {
    next(error);
  }
};

export const getDeckById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const deck = await prisma.deck.findFirst({
      where: { id, ownerId: userId },
    });

    if (!deck) {
      return next(new NotFoundError('Deck not found'));
    }

    res.status(200).json(deck);
  } catch (error: any) {
    next(error);
  }
};

export const updateDeck = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const { name, commander, description } = req.body as UpdateDeckInput['body'];

    const deck = await prisma.deck.findFirst({
      where: { id, ownerId: userId },
    });

    if (!deck) {
      return next(new NotFoundError('Deck not found'));
    }

    const updatedDeck = await prisma.deck.update({
      where: { id },
      data: {
        name,
        commander,
        description,
      },
    });

    res.status(200).json(updatedDeck);
  } catch (error: any) {
    next(error);
  }
};

export const deleteDeck = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const deck = await prisma.deck.findFirst({
      where: { id, ownerId: userId },
    });

    if (!deck) {
      return next(new NotFoundError('Deck not found'));
    }

    await prisma.deck.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};
