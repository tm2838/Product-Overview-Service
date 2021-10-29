/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { productSchema, styleSchema, skuSchema } = require('../db/schemas');

const sampleProduct = require('../db/sampleProduct.json');
const sampleStyles = require('../db/sampleStyles.json');
const sampleSkus = require('../db/sampleSkus.json');

const { getProduct, getStyles } = require('../db/utils');

const url = 'mongodb://127.0.0.1:27017';

describe('database utils', () => {
  beforeAll((done) => {
    mongoose.createConnection(`${url}/JestDB`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

  afterAll((done) => {
    mongoose.connection.close(() => done());
  });

  // unit tests for database methods

  describe('getProduct', () => {
    it('should get the requested product based on a valid product id', async () => {
      const testProduct = mongoose.model('testProduct', productSchema);
      const mockproduct = await testProduct.create(sampleProduct);
      const product = await testProduct.findOne({ productId: 12345 });

      expect(product.name).toBe('test product name');
      expect(product.slogan).toBe('this is a fake slogan');
    });

    it('should return null if the provided product id is invalid', async () => {
      const testProduct2 = mongoose.model('testProduct2', productSchema);
      const product = await testProduct2.findOne({ productId: 12345 });

      expect(product).toBe(null);
    });
  });

  describe('getStyles', () => {
    xit('should get the requested styles based on product id', async () => {
      getStyles(12345)
        .then((styles) => {
          expect(styles[0]['default?']).toBe(true);
          expect(styles[0].name).toBe('style1');
          expect(styles[0].skus).toEqual({
            4: {
              size: 'L',
              quantity: 10,
            },
            5: {
              size: 'S',
              quantity: 6,
            },
          });

          expect(styles[1]['default?']).toBe(false);
          expect(styles[1].name).toBe('style2');
          expect(styles[1].skus).toEqual({
            2: {
              size: '7',
              quantity: 14,
            },
            1: {
              size: '8.5',
              quantity: 7,
            },
          });
        });
    });

    xit('should return an empty array if the provided product id is invalid', async () => {
      getStyles(1)
        .then((styles) => {
          expect(styles).toEqual([]);
        });
    });
  });
});
