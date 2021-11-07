const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Category = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true }
  },
  schemaOptions
);

Category = mongodbClient.connection.model('Category', schema);

module.exports = Category;
