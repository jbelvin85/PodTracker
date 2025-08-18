import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth.routes';
import { PrismaClient } from '@prisma/client';

// Set up a test Express application
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Auth Endpoints', () => {
  // Before any tests run, clear the user table
  beforeAll(async () => {
    await prisma.user.deleteMany({});
  });

  // After all tests are done, disconnect from the database
  afterAll(async () => {
    await prisma.$disconnect();
  });

  // Test case 1: Successful user registration
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  // Test case 2: Attempt to register a user with a duplicate email
  it('should fail to register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser2',
      });
    expect(res.statusCode).toEqual(400);
  });

  // Test case 3: Successful user login
  it('should log in an existing user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test case 5: Attempt to log in with a non-existent email
  it('should fail to log in with a non-existent email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(401);
  });

  // Test case 6: Attempt to register with invalid input (missing email)
  it('should fail to register with missing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        password: 'password123',
        username: 'invaliduser',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors'); // Assuming Zod validation returns an errors array
  });
});