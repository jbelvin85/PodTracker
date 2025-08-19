import request from 'supertest';
import express from 'express';
import podRoutes from '../routes/pod.routes';
import userRoutes from '../routes/user.routes'; // To create a user for pod admin
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use('/api/pods', podRoutes);
app.use('/api/users', userRoutes); // Needed for user creation

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.TEST_DATABASE_URL,
    },
  },
});

describe('Pod Endpoints', () => {
  let userId: string;
  let podId: string;

  beforeAll(async () => {
    await prisma.pod.deleteMany({});
    await prisma.user.deleteMany({});

    // Create a user to be the admin of the pod
    const userRes = await request(app)
      .post('/api/users')
      .send({
        email: 'podadmin@example.com',
        username: 'podadmin',
        passwordHash: 'hashedpassword',
      });
    userId = userRes.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new pod', async () => {
    const res = await request(app)
      .post('/api/pods')
      .send({
        name: 'My Test Pod',
        adminId: userId,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toEqual('My Test Pod');
    podId = res.body.id;
  });

  it('should get a pod by ID', async () => {
    const res = await request(app).get(`/api/pods/${podId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', podId);
    expect(res.body.name).toEqual('My Test Pod');
  });

  it('should get all pods', async () => {
    const res = await request(app).get('/api/pods');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
  });

  it('should update a pod', async () => {
    const res = await request(app)
      .put(`/api/pods/${podId}`)
      .send({
        name: 'Updated Test Pod',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Pod');
  });

  it('should delete a pod', async () => {
    const res = await request(app).delete(`/api/pods/${podId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/api/pods/${podId}`);
    expect(getRes.statusCode).toEqual(404);
  });
});
