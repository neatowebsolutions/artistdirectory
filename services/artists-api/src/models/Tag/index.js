const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Tag = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true }
  },
  schemaOptions
);

Tag = mongodbClient.connection.model('Tag', schema);

module.exports = Tag;
