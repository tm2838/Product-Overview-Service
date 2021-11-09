use test

db.base_products.createIndex({ id: 1});
db.features.createIndex({product_id: 1});

db.base_products.aggregate([
  {
    $lookup: {
      from: 'features',
      localField: 'id',
      foreignField: 'product_id',
      as: 'tempfeatures',
    },
  },
  {
    $project:
  {
    features: {
      $map: {
        input: '$tempfeatures',
        as: 'feature',
        in: {
          feature: '$$feature.feature',
          value: '$$feature.value',
        },
      },
    },
    id: 1,
    name: 1,
    slogan: 1,
    description: 1,
    category: 1,
    default_price: 1,
  },
  },
  { $out: 'products' },
]);

db.products.createIndex({ id: 1});

db.photos.createIndex({ styleId: 1});
db.init_styles.createIndex({ id: 1});

db.init_styles.aggregate([
  {
    $lookup: {
      from: 'photos',
      localField: 'id',
      foreignField: 'styleId',
      as: 'tempphotos',
    },
  },
  {
    $project: {
      photos: {
        $map: {
          input: '$tempphotos',
          as: 'photo',
          in: {
            thumbnail_url: '$$photo.thumbnail_url',
            url: '$$photo.url',
          },
        },
      },
      productId: 1,
      style_id: '$id',
      name: 1,
      sale_price: 1,
      original_price: 1,
      'default?': {
        $cond: [{ $eq: ['$default_style', 1] }, true, false],
      },
    },
  },
  { $out: 'styles' },
]);

db.styles.createIndex({productId: 1});
db.styles.createIndex({style_id: 1});
db.skus.createIndex({styleId: 1});

