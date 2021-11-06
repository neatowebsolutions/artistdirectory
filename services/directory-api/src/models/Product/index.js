const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');
const exampleMethod = require('./exampleMethod');
const toString = require('./toString');

let Product = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  schemaOptions
);

schema.methods.exampleMethod = function () {
  return exampleMethod(this);
};

schema.methods.toString = function () {
  return toString(this);
};

schema.index({ createdAt: -1 });

Product = mongodbClient.connection.model('Product', schema);

module.exports = Product;
