const { getProduct, getStyles } = require('../db/utils');

const app = require('./server');

app.get('/product/:productId', async (req, res) => {
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

  res.status(200).send(styles);
});

app.listen(3000, () => {
    console.log(`Express Server is running on port 3000`); // eslint-disable-line
});
