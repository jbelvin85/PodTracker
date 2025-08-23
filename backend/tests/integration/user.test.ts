import { PrismaClient } from '@prisma/client';
import { clearDatabase } from '../utils/db';

const prisma = new PrismaClient();

describe('User Database Operations', () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a new user in the database', async () => {
    const userData = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedpassword',
    };

    const user = await prisma.user.create({
      data: userData,
    });

    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.username).toBe(userData.username);

    const foundUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });
    expect(foundUser).toEqual(expect.objectContaining(userData));
  });

  test('should retrieve a user from the database', async () => {
    const userData = {
      email: 'retrieve@example.com',
      username: 'retrieveuser',
      password: 'hashedpassword',
    };
    await prisma.user.create({ data: userData });

    const foundUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.username).toBe(userData.username);
  });
});
