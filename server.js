const express = require('express');
const cors = require('cors');
const { getProduct, getStyles } = require('./db/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/products', async (req, res) => {
  const indexOfProductId = req.params['0'].indexOf('/');
  const productId = req.params['0'].slice(indexOfProductId + 1);
  // get product data from database
  getProduct(productId)
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.error(err)); // eslint-disable-line
});

app.get('/styles', async (req, res) => {
  const indexOfProductId = req.params['0'].indexOf('/');
  const productId = req.params['0'].slice(indexOfProductId + 1);
  // get style data from database
  getStyles(productId)
    .then((results) => {
      res.send(results);
    })
  .catch((err) => console.error(err)); // eslint-disable-line
});

app.listen(3000, () => {
  console.log(`Express Server is running on port 3000`); // eslint-disable-line
});
