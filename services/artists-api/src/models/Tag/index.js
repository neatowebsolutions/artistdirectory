const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');
const exampleMethod = require('./exampleMethod');

let Tag = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  schemaOptions
);

schema.methods.exampleMethod = function () {
  return exampleMethod(this);
};

Tag = mongodbClient.connection.model('Tag', schema);

module.exports = Tag;
