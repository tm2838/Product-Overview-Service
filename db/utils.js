const { Product, Styles } = require('./schemas');

const getProduct = (
  productId,
) => Product.findOne({ id: parseInt(productId, 10) });

const getStyles = (productId) => Styles.aggregate([
  {
    $match: {
      productId: parseInt(productId, 10), // ADD INDEX FOR PRODUCTID
    },
  },
  {
    $lookup: {
      from: 'skus',
      localField: 'style_id', // ADD INDEX FOR STYLE_ID
      foreignField: 'styleId', // ADD INDEX FOR STYLEID
      as: 'tempskus',
    },
  },
  {
    $project: {
      skus: {
        $arrayToObject: {
          $map: {
            input: '$tempskus',
            as: 'sku',
            in: {
              k: { $toString: '$$sku.id' },
              v: {
                size: '$$sku.size',
                quantity: '$$sku.quantity',
              },
            },
          },
        },
      },
      productId: 1,
      style_id: 1,
      name: 1,
      sale_price: 1,
      original_price: 1,
      'default?': 1,
      photos: 1,
    },
  },
]);

const getRelatedProducts = (
  productId,
) => Product.findOne({ id: parseInt(productId, 10) });

module.exports = {
  getProduct,
  getStyles,
  getRelatedProducts,
};
