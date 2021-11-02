/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { productSchema, styleSchema, skuSchema } = require('../db/schemas');

const sampleProduct = require('../db/sampleProduct.json');
const sampleStyles = require('../db/sampleStyles.json');
const sampleSkus = require('../db/sampleSkus.json');

const { getProduct, getStyles } = require('../db/utils');

const url = 'mongodb://db:27017/test';

describe('database utils', () => {
  // unit tests for database methods

  describe('getProduct', () => {
    xit('should get the requested product based on a valid product id', async () => {
      const connection = await MongoClient.connect(url);
      getProduct(1)
        .then((response) => {
          expect(typeof response).toBe('object');

          expect(response.id).toBe(1);
          expect(response.name).toBe('Camo Onesie');
        })
        .then(() => {
          connection.close();
        });
    });

    xit('should return null if the provided product id is invalid', async () => {
      const connection = await MongoClient.connect(url);
      getProduct(0)
        .then((response) => {
          expect(response).toBe(null);
        })
        .then(() => {
          connection.close();
        });
    });
  });

  describe('getStyles', () => {
    xit('should get the requested styles based on product id', async () => {
      const connection = await MongoClient.connect(url);
      getStyles(1)
        .then((styles) => {
          expect(styles[0]['default?']).toBe(false);
          expect(styles[0].name).toBe('Desert Brown & Tan');
          expect(styles[0].style_id).toBe(2);
          expect(styles[0].photos).toBeTruthy();
          expect(styles[0].skus).toBeTruthy();
        })
        .then(() => {
          connection.close();
        });
    });

    xit('should return an empty array if the provided product id is invalid', async () => {
      const connection = await MongoClient.connect(url);
      getStyles(0)
        .then((styles) => {
          expect(styles).toEqual([]);
        })
        .then(() => {
          connection.close();
        });
    });
  });
});
