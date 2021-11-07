const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Profile = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: true
    }
  },
  schemaOptions
);

Profile = mongodbClient.connection.model('Profile', schema);

module.exports = Profile;
