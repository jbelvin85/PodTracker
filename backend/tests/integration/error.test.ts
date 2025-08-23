import request from 'supertest';
import app from '../../src/index';
import { PrismaClient } from '@prisma/client';
import { clearDatabase } from '../utils/db';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Error Handling Integration', () => {
  let validToken: string;
  let userId: string;

  beforeAll(async () => {
    await clearDatabase();
    // Create a user and generate a valid token for authenticated tests
    const user = await prisma.user.create({
      data: {
        email: 'erroruser@example.com',
        username: 'erroruser',
        password: 'hashedpassword',
      },
    });
    userId = user.id;
    validToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should return 400 for invalid input (Zod validation error)', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ email: 'invalid-email', username: 'short', password: '123' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Invalid email address');
    expect(res.body.message).toContain('Username must be at least 3 characters long');
    expect(res.body.message).toContain('Password must be at least 6 characters long');
  });

  test('should return 404 for a non-existent resource', async () => {
    const nonExistentId = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa'; // A valid UUID format, but unlikely to exist
    const res = await request(app)
      .get(`/api/users/${nonExistentId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  test('should return 401 for unauthorized access to a protected route', async () => {
    // Assuming /api/users is protected and requires authentication
    const res = await request(app)
      .get('/api/users/current'); // Example of a protected route

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Authentication failed');
  });

  test('should return 401 for invalid token on a protected route', async () => {
    const res = await request(app)
      .get('/api/users/current')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Authentication failed');
  });

  test('should return 404 for a non-existent API endpoint', async () => {
    const res = await request(app)
      .get('/api/nonexistent-endpoint');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'Not Found');
  });
});
