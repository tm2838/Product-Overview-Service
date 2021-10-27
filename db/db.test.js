/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');

const sampleProduct = require('./sampleProduct.json');
const sampleStyles = require('./sampleStyles.json');
const sampleSkus = require('./sampleSkus.json');

const { connectToDatabase, getProduct, getStyles } = require('./index');

const url = 'mongodb://127.0.0.1:27017/';

describe('database utils', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(url, { useNewUrlParser: true });
    db = await connection.db('test');

    if (db) {
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map((c) => c.name);
      if (!collectionNames.includes('mockproducts')) {
        await db.createCollection('mockproducts', (productCollectionError, productCollectionRes) => {
          if (productCollectionError) {
                console.error(productCollectionError); // eslint-disable-line
          }
              console.log('mock products created'); // eslint-disable-line
        });

        await db.collection('mockproducts').insertOne(sampleProduct);
      }

      if (!collectionNames.includes('mockstyles')) {
        await db.createCollection('mockstyles', (stylesCollectionError, stylesCollectionRes) => {
          if (stylesCollectionError) {
                console.error(stylesCollectionError); // eslint-disable-line
          }
              console.log('mock styles created'); // eslint-disable-line
        });

        await db.collection('mockstyles').insertMany(sampleStyles);
      }

      if (!collectionNames.includes('mockskus')) {
        await db.createCollection('mockskus', (skusCollectionError, skusCollectionRes) => {
          if (skusCollectionError) {
                console.error(skusCollectionError); // eslint-disable-line
          }
              console.log('mock skus created'); // eslint-disable-line
        });

        await db.collection('mockskus').insertMany(sampleSkus);
      }

      await connection.close();
    }
  });

  // unit tests for database methods

  describe('getProduct', () => {
    it('should get the requested product based on a valid product id', async () => {
      connectToDatabase().then(() => {
        getProduct(12345, 'mockproducts')
          .then((product) => {
            expect(product.name).toBe('test product name');
            expect(product.slogan).toBe('this is a fake slogan');
          });
      });
    });

    it('should return null if the provided product id is invalid', async () => {
      connectToDatabase().then(() => {
        getProduct(1, 'mockproducts')
          .then((product) => {
            expect(product).toBe(null);
          });
      });
    });
  });

  describe('getStyles', () => {
    it('should get the requested styles based on product id', async () => {
      connectToDatabase().then(() => {
        getStyles(12345, 'mockstyles', 'mockskus')
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
    });

    it('should return an empty array if the provided product id is invalid', async () => {
      connectToDatabase().then(() => {
        getStyles(1, 'mockstyles', 'mockskus')
          .then((styles) => {
            expect(styles).toEqual([]);
          });
      });
    });
  });
});
