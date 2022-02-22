const frisby = require('frisby');
const sampleProduct = require('../db/sampleData/sampleProduct.json');

const dbhelpers = require('../db/utils');

describe('server routes', () => {
  beforeEach(() => {
    jest.spyOn(dbhelpers, 'getProduct');
    dbhelpers.getProduct = jest.fn(() => Promise.resolve(sampleProduct));
  });

  it('GET /product/:productId', async () => {
    frisby.get('http://localhost:3000/product/12345')
      .expect('status', 200);
  });

  it('GET /product/:productId/styles', async () => {
    frisby.get('http://localhost:3000/product/12345/styles')
      .expect('status', 200);
  });
});
