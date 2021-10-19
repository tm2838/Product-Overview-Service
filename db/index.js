/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const sampleProduct = require('./sampleProduct.json');

mongoose.connect('mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //eslint-disable-line
db.once('open', () => console.log('db connected!')); //eslint-disable-line

const { Schema } = mongoose;
const productSchema = new Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String,
    },
  ],
  styles: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String || null,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: {
        type: Map,
        of: new Schema({
          quantity: Number,
          size: String,
        }),
      },
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

Product.createCollection().then(() => {
  console.log('collection created'); //eslint-disable-line
});

const save = (products) => Product.create(products);

module.exports.save = save;
