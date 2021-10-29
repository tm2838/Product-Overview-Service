const supertest = require('supertest');
const app = require('../server/server');

describe('server routes', () => {
  it('GET /product/:productId', async () => {
    supertest(app).get('http://localhost:3000/product/1')
      .expect(200)
      .then((response) => {
        expect(typeof response).toBe('object');

        expect(response.id).toBe(1);
        expect(response.name).toBe('Camo Onesi');
        expect(response.features).toHaveLength(2);
      });
  });

  it('GET /product/:productId/styles', async () => {
    supertest(app).get('http://localhost:3000/product/1/styles')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response)).toBe(true);

        expect(response).toHaveLength(6);
        expect(response[0].style_id).toBe(2);
        expect(response[0].name).toBe('Desert Brown & Tan');
        expect(response[0]['default?']).toBe(false);
        expect(response[0].photos).toHaveLength(6);

        expect(response[0].skus).toBeTruthy();
      });
  });
});
