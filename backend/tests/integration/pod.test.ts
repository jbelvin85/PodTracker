import request from 'supertest';
import app from '../../src/index'; // Assuming your Express app is exported from index.ts
import { PrismaClient } from '@prisma/client';
import { clearDatabase } from '../utils/db';

const prisma = new PrismaClient();

describe('Pod API Integration', () => {
  let userId: string;

  beforeAll(async () => {
    // Create a user to be the owner of the pods
    const user = await prisma.user.create({
      data: {
        email: 'podowner@example.com',
        username: 'podowner',
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

  test('should create a new pod', async () => {
    const podData = {
      name: 'Test Pod',
      ownerId: userId,
    };

    const res = await request(app)
      .post('/api/pods')
      .send(podData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual(podData.name);
    expect(res.body.ownerId).toEqual(podData.ownerId);
  });

  test('should retrieve a pod by ID', async () => {
    const createdPod = await prisma.pod.create({
      data: {
        name: 'Retrieve Pod',
        ownerId: userId,
      },
    });

    const res = await request(app)
      .get(`/api/pods/${createdPod.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', createdPod.id);
    expect(res.body.name).toEqual(createdPod.name);
  });

  test('should update a pod', async () => {
    const createdPod = await prisma.pod.create({
      data: {
        name: 'Update Pod',
        ownerId: userId,
      },
    });

    const updatedName = 'Updated Pod Name';
    const res = await request(app)
      .put(`/api/pods/${createdPod.id}`)
      .send({ name: updatedName });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', updatedName);
  });

  test('should delete a pod', async () => {
    const createdPod = await prisma.pod.create({
      data: {
        name: 'Delete Pod',
        ownerId: userId,
      },
    });

    const res = await request(app)
      .delete(`/api/pods/${createdPod.id}`);

    expect(res.statusCode).toEqual(204);

    const deletedPod = await prisma.pod.findUnique({
      where: { id: createdPod.id },
    });
    expect(deletedPod).toBeNull();
  });
});
