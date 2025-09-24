import request from 'supertest';
import { createApp } from './main';

/**
 * Demo 2: TDD Red phase — failing test first for /profile contract
 */
describe('GET /profile (e2e)', () => {
  it('returns full profile with audit fields', async () => {
    const app = createApp();
    const server = app.listen();
    try {
      const res = await request(server).get('/profile').expect(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.stringMatching(/@/),
          createdAt: expect.any(String),
          lastLoginAt: expect.any(String),
        }),
      );
    } finally {
      server.close();
    }
  });
});
