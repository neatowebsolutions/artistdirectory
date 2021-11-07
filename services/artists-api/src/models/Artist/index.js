const mongoose = require('mongoose');
const mongodbClient = require('../mongodbClient');

let Artist = null;

const schemaOptions = {
  timestamps: true
};
const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    social: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
      }
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
      }
    ],
    photoUrls: [{ type: String, required: true }],
    subscribedToNewsletter: { type: Boolean, required: true }
  },
  schemaOptions
);

Artist = mongodbClient.connection.model('Artist', schema);

module.exports = Artist;
