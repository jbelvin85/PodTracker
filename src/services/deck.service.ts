import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDeck = async (deckData: any) => {
  return prisma.deck.create({
    data: deckData,
  });
};

export const getDeckById = async (id: string) => {
  return prisma.deck.findUnique({
    where: { id },
  });
};

export const updateDeck = async (id: string, deckData: any) => {
  return prisma.deck.update({
    where: { id },
    data: deckData,
  });
};

export const deleteDeck = async (id: string) => {
  return prisma.deck.delete({
    where: { id },
  });
};

export const getAllDecks = async () => {
  return prisma.deck.findMany();
};
