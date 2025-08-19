import request from 'supertest';
import express from 'express';
import deckRoutes from '../routes/deck.routes';
import userRoutes from '../routes/user.routes'; // To create a user for deck ownership
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use('/api/decks', deckRoutes);
app.use('/api/users', userRoutes); // Needed for user creation

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Deck Endpoints', () => {
  let userId: string;
  let deckId: string;

  beforeAll(async () => {
    await prisma.deck.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a user to own the decks
    const userRes = await request(app)
      .post('/api/users')
      .send({
        email: 'deckowner@example.com',
        username: 'deckowner',
        passwordHash: 'hashedpassword',
      });
    userId = userRes.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new deck', async () => {
    const res = await request(app)
      .post('/api/decks')
      .send({
        name: 'My Commander Deck',
        commanderId: 'someScryfallId',
        ownerId: userId,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('My Commander Deck');
    deckId = res.body.id;
  });

  it('should get a deck by ID', async () => {
    const res = await request(app).get(`/api/decks/${deckId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', deckId);
    expect(res.body.name).toEqual('My Commander Deck');
  });

  it('should get all decks', async () => {
    const res = await request(app).get('/api/decks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('should update a deck', async () => {
    const res = await request(app)
      .put(`/api/decks/${deckId}`)
      .send({
        name: 'Updated Commander Deck',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Commander Deck');
  });

  it('should delete a deck', async () => {
    const res = await request(app).delete(`/api/decks/${deckId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/api/decks/${deckId}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
