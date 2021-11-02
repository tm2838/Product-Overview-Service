// const mongoose = require('mongoose');
const { getProduct, getStyles } = require('../db/utils');

const app = require('./server');

// mongoose.connect('mongodb://localhost:27017/test');
// mongoose.connect(`mongodb://${process.env.MONGO_URI}`);

app.get('/product/:productId', async (req, res) => {
  console.log('Got a request!'); //eslint-disable-line
  const { productId } = req.params;
  // get product data from database
  let product;
  try {
    product = await getProduct(productId);
  } catch (error) {
    res.status(500).send(error);
  }

  res.status(200).send(product);
});

app.get('/product/:productId/styles', async (req, res) => {
  const { productId } = req.params;
  // get style data from database
  let styles;
  try {
    styles = await getStyles(productId);
  } catch (error) {
    res.status(500).send(error);
  }

  res.status(200).send({ results: styles });
});

app.listen(5000, () => {
    console.log(`Express Server is running on port 5000`); // eslint-disable-line
});
