const express = require('express');
const cors = require('cors');
const { connectToDatabase, getProduct, getStyles } = require('./db/index');

connectToDatabase().then(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  app.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    // get product data from database
    getProduct(productId, 'products')
      .then((results) => {
        res.send(results);
      })
      .catch((error) => console.error(error)); // eslint-disable-line
  });

  app.get('/product/:productId/styles', async (req, res) => {
    const { productId } = req.params;
    // get style data from database
    getStyles(productId, 'styles', 'skus')
      .then((results) => {
        res.send(results);
      })
    .catch((err) => console.error(err)); // eslint-disable-line
  });

  app.listen(3000, () => {
    console.log(`Express Server is running on port 3000`); // eslint-disable-line
  });
});
