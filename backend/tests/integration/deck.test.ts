import request from 'supertest';
import app from '../../src/index'; // Assuming your Express app is exported from index.ts
import { PrismaClient } from '@prisma/client';
import { clearDatabase } from '../utils/db';

const prisma = new PrismaClient();

describe('Deck API Integration', () => {
  let userId: string;

  beforeAll(async () => {
    // Create a user to be the owner of the decks
    const user = await prisma.user.create({
      data: {
        email: 'deckowner@example.com',
        username: 'deckowner',
        password: 'hashedpassword',
      },
    });
    userId = user.id;
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a new deck', async () => {
    const deckData = {
      name: 'Test Deck',
      commander: 'Test Commander',
      ownerId: userId,
    };

    const res = await request(app)
      .post('/api/decks')
      .send(deckData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(deckData.name);
    expect(res.body.commander).toEqual(deckData.commander);
    expect(res.body.ownerId).toEqual(deckData.ownerId);
  });

  test('should retrieve a deck by ID', async () => {
    const createdDeck = await prisma.deck.create({
      data: {
        name: 'Retrieve Deck',
        commander: 'Retrieve Commander',
        ownerId: userId,
      },
    });

    const res = await request(app)
      .get(`/api/decks/${createdDeck.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdDeck.id);
    expect(res.body.name).toEqual(createdDeck.name);
  });

  test('should update a deck', async () => {
    const createdDeck = await prisma.deck.create({
      data: {
        name: 'Update Deck',
        commander: 'Update Commander',
        ownerId: userId,
      },
    });

    const updatedName = 'Updated Deck Name';
    const res = await request(app)
      .put(`/api/decks/${createdDeck.id}`)
      .send({ name: updatedName });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', updatedName);
  });

  test('should delete a deck', async () => {
    const createdDeck = await prisma.deck.create({
      data: {
        name: 'Delete Deck',
        commander: 'Delete Commander',
        ownerId: userId,
      },
    });

    const res = await request(app)
      .delete(`/api/decks/${createdDeck.id}`);

    expect(res.statusCode).toEqual(204);

    const deletedDeck = await prisma.deck.findUnique({
      where: { id: createdDeck.id },
    });
    expect(deletedDeck).toBeNull();
  });
});
