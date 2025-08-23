import request from 'supertest';
import app from '../../src/index'; // Assuming your Express app is exported from index.ts
import { PrismaClient } from '@prisma/client';
import { clearDatabase } from '../utils/db';

const prisma = new PrismaClient();

describe('Game API Integration', () => {
  let userId: string;
  let podId: string;

  beforeAll(async () => {
    // Create a user and a pod to associate with games
    const user = await prisma.user.create({
      data: {
        email: 'gameuser@example.com',
        username: 'gameuser',
        password: 'hashedpassword',
      },
    });
    userId = user.id;

    const pod = await prisma.pod.create({
      data: {
        name: 'Game Test Pod',
        ownerId: userId,
        members: { connect: { id: userId } },
      },
    });
    podId = pod.id;
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a new game', async () => {
    const gameData = {
      podId: podId,
      playerIds: [userId],
    };

    const res = await request(app)
      .post('/api/games')
      .send(gameData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.podId).toEqual(gameData.podId);
    expect(res.body.playerIds).toEqual(expect.arrayContaining(gameData.playerIds));
  });

  test('should retrieve a game by ID', async () => {
    const createdGame = await prisma.game.create({
      data: {
        podId: podId,
        players: { connect: { id: userId } },
      },
    });

    const res = await request(app)
      .get(`/api/games/${createdGame.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdGame.id);
    expect(res.body.pod.id).toEqual(podId);
    expect(res.body.players[0].id).toEqual(userId);
  });

  test('should update a game', async () => {
    const createdGame = await prisma.game.create({
      data: {
        podId: podId,
        players: { connect: { id: userId } },
      },
    });

    const newWinner = await prisma.user.create({
      data: {
        email: 'newwinner@example.com',
        username: 'newwinner',
        password: 'hashedpassword',
      },
    });

    const updatedGameData = {
      endTime: new Date().toISOString(),
      winnerId: newWinner.id,
    };

    const res = await request(app)
      .put(`/api/games/${createdGame.id}`)
      .send(updatedGameData);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('winnerId', newWinner.id);
    expect(res.body).toHaveProperty('endTime');
  });

  test('should delete a game', async () => {
    const createdGame = await prisma.game.create({
      data: {
        podId: podId,
        players: { connect: { id: userId } },
      },
    });

    const res = await request(app)
      .delete(`/api/games/${createdGame.id}`);

    expect(res.statusCode).toEqual(204);

    const deletedGame = await prisma.game.findUnique({
      where: { id: createdGame.id },
    });
    expect(deletedGame).toBeNull();
  });
});
