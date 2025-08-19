import request from 'supertest';
import app from '../src/index';

describe('POST /api/spells', () => {
  it('should return 201 Created when given a valid spell', async () => {
    const spell = { name: 'Fireball', level: 3 };
    const res = await request(app).post('/api/spells').send(spell);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      message: 'Spell created successfully',
      spell: spell,
    });
  });

  it('should return 400 Bad Request if name is missing', async () => {
    const spell = { level: 1 };
    const res = await request(app).post('/api/spells').send(spell);
    expect(res.statusCode).toEqual(400);
  });

  it('should return 400 Bad Request if level is not a number', async () => {
    const spell = { name: 'Wish', level: 'nine' };
    const res = await request(app).post('/api/spells').send(spell);
    expect(res.statusCode).toEqual(400);
  });
});