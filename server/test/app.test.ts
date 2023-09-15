import request from 'supertest';
import app from '../src/app';

describe('Get', ()=>{
  it('should work',  async ()=>{
    const res = await request(app).get('/');

    expect(res.statusCode).toBe(200);
  });
});