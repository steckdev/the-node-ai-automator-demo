import request from 'supertest';
import { createApp } from './main';

/**
 * Demo 2: TDD Red phase — failing test for GET /users/:id/posts endpoint
 * This test should FAIL initially to demonstrate the Red-Green-Refactor cycle
 *
 * GitHub Issue: #2 - Add GET /users/:id/posts endpoint
 */
describe('GET /users/:id/posts (e2e)', () => {
  it('returns user posts with user information', async () => {
    const app = createApp();
    const server = app.listen();
    try {
      const res = await request(server).get('/users/user-123/posts').expect(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            email: expect.stringMatching(/@/),
          }),
          posts: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              title: expect.any(String),
              content: expect.any(String),
              createdAt: expect.any(String),
            }),
          ]),
          totalPosts: expect.any(Number),
        }),
      );
    } finally {
      server.close();
    }
  });

  it('returns 404 for non-existent user', async () => {
    const app = createApp();
    const server = app.listen();
    try {
      await request(server).get('/users/non-existent/posts').expect(404);
    } finally {
      server.close();
    }
  });

  it('returns 400 for invalid user ID format', async () => {
    const app = createApp();
    const server = app.listen();
    try {
      await request(server).get('/users//posts').expect(400);
    } finally {
      server.close();
    }
  });
});
