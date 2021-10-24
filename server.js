const express = require('express');
const cors = require('cors');
const { getDB } = require('./db/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/products', async (req, res) => {
  const indexOfProductId = req.params['0'].indexOf('/');
  const productId = req.params['0'].slice(indexOfProductId + 1);
  // get product data from database
  getDB.products.findOne({ id: productId })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => console.error(err)); // eslint-disable-line
});

app.get('/styles', async (req, res) => {
  const indexOfProductId = req.params['0'].indexOf('/');
  const productId = req.params['0'].slice(indexOfProductId + 1);
  // get style data from database
  getDB.product_styles.find({ id: productId })
    .then((results) => {
      res.send(results);
    })
  .catch((err) => console.error(err)); // eslint-disable-line
});

app.listen(3000, () => {
  console.log(`Express Server is running on port ${port}`); // eslint-disable-line
});
