const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

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

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
