import request from 'supertest';
import express from 'express';
import userRoutes from '../routes/user.routes';
import { PrismaClient } from '@prisma/client';

// Set up a test Express application
const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('User Endpoints', () => {
  let userId: string;

  // Before any tests run, clear the user table
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  // After all tests are done, disconnect from the database
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'testuser@example.com',
        username: 'testuser',
        passwordHash: 'hashedpassword',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toEqual('testuser@example.com');
    userId = res.body.id;
  });

  it('should get a user by ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body.username).toEqual('testuser');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        username: 'updateduser',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/api/users/${userId}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
