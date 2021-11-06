const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');
const exampleMethod = require('./exampleMethod');

let Artist = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true }
  },
  schemaOptions
);

schema.methods.exampleMethod = function () {
  return exampleMethod(this);
};

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
