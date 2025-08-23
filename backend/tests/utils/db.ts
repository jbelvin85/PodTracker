import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function clearDatabase() {
  await prisma.deck.deleteMany({});
  await prisma.pod.deleteMany({});
  await prisma.user.deleteMany({});
}
