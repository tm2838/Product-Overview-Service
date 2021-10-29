const supertest = require('supertest');
const app = require('../server/server');

describe('server routes', () => {
  it('GET /product/:productId', async () => {
    supertest(app).get('http://localhost:3000/product/12345')
      .expect(200);
  });

  it('GET /product/:productId/styles', async () => {
    supertest(app).get('http://localhost:3000/product/12345/styles')
      .expect(200);
  });
});
